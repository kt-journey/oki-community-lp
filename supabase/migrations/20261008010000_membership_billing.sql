-- Billing writes are atomic and callable only by the server-side service role.
alter table public.stripe_events add column processing_started_at timestamptz;
alter table public.stripe_events add column processing_claim_id uuid;
alter table public.checkout_attempts add column expires_at timestamptz;

create unique index checkout_one_open_attempt_per_member
  on public.checkout_attempts(member_id)
  where status in ('creating', 'open');
create unique index membership_one_open_payment_hold
  on public.membership_holds(member_id, reason, stripe_object_id)
  where closed_at is null and stripe_object_id is not null;

create table public.member_action_windows (
  member_id uuid not null references public.members(id) on delete cascade,
  action text not null check (action in ('checkout', 'portal')),
  window_started_at timestamptz not null,
  request_count integer not null check (request_count > 0),
  primary key (member_id, action)
);
alter table public.member_action_windows enable row level security;
revoke all on public.member_action_windows from anon, authenticated;
grant select, insert, update, delete on public.member_action_windows to service_role;

create or replace function public.claim_member_action(
  p_member_id uuid, p_action text, p_limit integer, p_window_seconds integer)
returns boolean
language plpgsql security definer set search_path = ''
as $$
declare v_count integer;
begin
  if p_action not in ('checkout', 'portal') or p_limit < 1
    or p_window_seconds < 60 or p_window_seconds > 86400 then
    raise exception 'invalid rate limit';
  end if;
  insert into public.member_action_windows(member_id, action, window_started_at, request_count)
    values (p_member_id, p_action, now(), 1)
    on conflict (member_id, action) do update
      set request_count = case
        when member_action_windows.window_started_at < now() - make_interval(secs => p_window_seconds)
          then 1 else member_action_windows.request_count + 1 end,
        window_started_at = case
        when member_action_windows.window_started_at < now() - make_interval(secs => p_window_seconds)
          then now() else member_action_windows.window_started_at end
    returning request_count into v_count;
  return v_count <= p_limit;
end;
$$;

create or replace function public.claim_stripe_event(p_event_id text, p_claim_id uuid)
returns text
language plpgsql security definer set search_path = ''
as $$
declare v_event public.stripe_events%rowtype;
begin
  if p_claim_id is null then raise exception 'claim id missing'; end if;
  select * into v_event from public.stripe_events
    where stripe_event_id = p_event_id for update;
  if not found then return 'missing'; end if;
  if v_event.processing_status in ('done', 'ignored') then return 'complete'; end if;
  if v_event.processing_status = 'processing'
    and v_event.processing_started_at > now() - interval '5 minutes' then
    return 'busy';
  end if;
  update public.stripe_events set processing_status = 'processing',
    processing_started_at = now(), processing_claim_id = p_claim_id,
    attempts = attempts + 1,
    last_error = null where stripe_event_id = p_event_id;
  return 'claimed';
end;
$$;

create or replace function public.finish_stripe_event(
  p_event_id text, p_claim_id uuid, p_status text, p_error text default null)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if p_status not in ('done', 'failed', 'ignored') then
    raise exception 'invalid event status';
  end if;
  update public.stripe_events set processing_status = p_status,
    processed_at = case when p_status in ('done', 'ignored') then now() else null end,
    processing_started_at = null, processing_claim_id = null,
    last_error = left(p_error, 500)
    where stripe_event_id = p_event_id and processing_status = 'processing'
      and processing_claim_id = p_claim_id;
  if not found then raise exception 'event claim missing'; end if;
end;
$$;

create or replace function public.bind_member_subscription(
  p_member_id uuid, p_customer_id text, p_subscription_id text,
  p_plan_code text, p_price_id text, p_status text,
  p_cancel_at_period_end boolean, p_current_period_end timestamptz)
returns void
language plpgsql security definer set search_path = ''
as $$
declare v_member public.members%rowtype;
begin
  if p_customer_id is null or p_subscription_id is null
    or p_plan_code is null or p_plan_code not in ('monthly', 'yearly')
    or p_price_id is null or p_status is null then
    raise exception 'invalid subscription binding';
  end if;
  select * into v_member from public.members where id = p_member_id for update;
  if not found then raise exception 'member not found'; end if;
  if v_member.stripe_customer_id is not null
    and v_member.stripe_customer_id <> p_customer_id then
    raise exception 'customer mismatch';
  end if;
  if v_member.stripe_subscription_id is not null
    and v_member.stripe_subscription_id <> p_subscription_id
    and (coalesce(v_member.stripe_subscription_status, '') not in ('canceled', 'incomplete_expired')
      or coalesce(v_member.access_paid_until, '-infinity'::timestamptz) > now()) then
    raise exception 'another subscription is current';
  end if;
  update public.members set stripe_customer_id = p_customer_id,
    stripe_subscription_id = p_subscription_id, plan_code = p_plan_code,
    stripe_price_id = p_price_id, stripe_subscription_status = p_status,
    cancel_at_period_end = p_cancel_at_period_end,
    current_period_end = p_current_period_end, updated_at = now()
    where id = p_member_id;
end;
$$;

create or replace function public.record_paid_membership_invoice(
  p_member_id uuid, p_customer_id text, p_subscription_id text,
  p_plan_code text, p_price_id text, p_subscription_status text,
  p_cancel_at_period_end boolean, p_current_period_end timestamptz,
  p_invoice_id text, p_currency text, p_amount_paid_yen integer,
  p_period_start timestamptz, p_period_end timestamptz, p_paid_at timestamptz)
returns text
language plpgsql security definer set search_path = ''
as $$
declare v_existing public.paid_invoices%rowtype;
begin
  if p_currency is null or p_currency <> 'jpy'
    or p_plan_code is null or p_amount_paid_yen is null
    or p_amount_paid_yen not in (300, 3000)
    or (p_plan_code = 'monthly' and p_amount_paid_yen <> 300)
    or (p_plan_code = 'yearly' and p_amount_paid_yen <> 3000)
    or p_period_start >= p_period_end or p_paid_at is null then
    raise exception 'invalid paid invoice';
  end if;
  select * into v_existing from public.paid_invoices where stripe_invoice_id = p_invoice_id;
  if found then
    if v_existing.member_id <> p_member_id
      or v_existing.stripe_subscription_id <> p_subscription_id
      or v_existing.stripe_price_id <> p_price_id
      or v_existing.service_period_end <> p_period_end then
      raise exception 'invoice replay mismatch';
    end if;
    return 'duplicate';
  end if;
  perform public.bind_member_subscription(p_member_id, p_customer_id,
    p_subscription_id, p_plan_code, p_price_id, p_subscription_status,
    p_cancel_at_period_end, p_current_period_end);
  insert into public.paid_invoices (stripe_invoice_id, member_id,
    stripe_subscription_id, stripe_price_id, currency, amount_paid_yen,
    service_period_start, service_period_end, paid_at)
  values (p_invoice_id, p_member_id, p_subscription_id, p_price_id,
    p_currency, p_amount_paid_yen, p_period_start, p_period_end, p_paid_at)
  on conflict (stripe_invoice_id) do nothing;
  if not found then
    select * into v_existing from public.paid_invoices where stripe_invoice_id = p_invoice_id;
    if v_existing.member_id <> p_member_id
      or v_existing.stripe_subscription_id <> p_subscription_id
      or v_existing.stripe_price_id <> p_price_id
      or v_existing.service_period_end <> p_period_end then
      raise exception 'invoice replay mismatch';
    end if;
    return 'duplicate';
  end if;
  update public.members set access_paid_until = greatest(
    coalesce(access_paid_until, '-infinity'::timestamptz), p_period_end),
    updated_at = now() where id = p_member_id;
  return 'applied';
end;
$$;

create or replace function public.hold_membership_for_payment(
  p_member_id uuid, p_reason text, p_stripe_object_id text)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if p_reason not in ('full_refund', 'partial_refund_review', 'dispute', 'operator_stop')
    or p_stripe_object_id is null then
    raise exception 'invalid payment hold';
  end if;
  perform 1 from public.members where id = p_member_id for update;
  if not found then raise exception 'member not found'; end if;
  insert into public.membership_holds(member_id, reason, stripe_object_id)
    values (p_member_id, p_reason, p_stripe_object_id)
    on conflict do nothing;
  update public.openchat_codes set revoked_at = now()
    where member_id = p_member_id and used_at is null and revoked_at is null;
  update public.openchat_memberships set status = 'removal_due',
    removal_due_at = now(), updated_at = now()
    where member_id = p_member_id and status = 'approved';
  update public.openchat_memberships set status = 'rejected', updated_at = now()
    where member_id = p_member_id and status = 'pending';
  insert into public.audit_logs(actor_kind, action, target_member_id, reason, details)
    values ('system', 'payment_hold', p_member_id, p_reason,
      jsonb_build_object('stripe_object_id', p_stripe_object_id));
end;
$$;

revoke all on function public.claim_stripe_event(text, uuid) from public, anon, authenticated;
revoke all on function public.claim_member_action(uuid, text, integer, integer)
  from public, anon, authenticated;
revoke all on function public.finish_stripe_event(text, uuid, text, text) from public, anon, authenticated;
revoke all on function public.bind_member_subscription(uuid, text, text, text, text, text, boolean, timestamptz)
  from public, anon, authenticated;
revoke all on function public.record_paid_membership_invoice(uuid, text, text, text, text, text, boolean,
  timestamptz, text, text, integer, timestamptz, timestamptz, timestamptz)
  from public, anon, authenticated;
revoke all on function public.hold_membership_for_payment(uuid, text, text)
  from public, anon, authenticated;
grant execute on function public.claim_stripe_event(text, uuid) to service_role;
grant execute on function public.claim_member_action(uuid, text, integer, integer)
  to service_role;
grant execute on function public.finish_stripe_event(text, uuid, text, text) to service_role;
grant execute on function public.bind_member_subscription(uuid, text, text, text, text, text, boolean, timestamptz)
  to service_role;
grant execute on function public.record_paid_membership_invoice(uuid, text, text, text, text, text, boolean,
  timestamptz, text, text, integer, timestamptz, timestamptz, timestamptz)
  to service_role;
grant execute on function public.hold_membership_for_payment(uuid, text, text)
  to service_role;
