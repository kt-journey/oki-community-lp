-- Code issuance and expiry handling. Manual approval/removal is a separate phase.

create or replace function public.issue_openchat_code(
  p_member_id uuid, p_code_hash bytea, p_expires_at timestamptz)
returns void
language plpgsql security definer set search_path = ''
as $$
declare v_member public.members%rowtype;
begin
  if p_code_hash is null or octet_length(p_code_hash) <> 32
    or p_expires_at <= now()
    or p_expires_at > now() + interval '24 hours 5 minutes' then
    raise exception 'OPENCHAT_CODE_INVALID';
  end if;
  select * into v_member from public.members where id = p_member_id for update;
  if not found or v_member.access_paid_until is null
    or v_member.access_paid_until <= now()
    or exists (select 1 from public.membership_holds
      where member_id = p_member_id and closed_at is null) then
    raise exception 'OPENCHAT_MEMBER_INELIGIBLE';
  end if;
  if exists (select 1 from public.openchat_memberships
    where member_id = p_member_id and status in ('pending', 'approved', 'removal_due')) then
    raise exception 'OPENCHAT_ALREADY_PENDING';
  end if;
  if (select count(*) from public.openchat_codes
      where member_id = p_member_id and created_at > now() - interval '1 hour') >= 3 then
    raise exception 'OPENCHAT_CODE_LIMIT';
  end if;
  update public.openchat_codes set revoked_at = now()
    where member_id = p_member_id and used_at is null and revoked_at is null;
  insert into public.openchat_codes(member_id, code_hash, expires_at)
    values (p_member_id, p_code_hash, p_expires_at);
  insert into public.audit_logs(actor_kind, actor_id, action, target_member_id)
    values ('member', p_member_id::text, 'openchat_code_issued', p_member_id);
end;
$$;

create or replace function public.sweep_expired_openchat_access()
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare v_codes integer; v_removals integer; v_rejections integer;
begin
  update public.openchat_codes c set revoked_at = now()
    where c.used_at is null and c.revoked_at is null
      and (c.expires_at <= now() or exists (
        select 1 from public.members m where m.id = c.member_id
          and (m.access_paid_until is null or m.access_paid_until <= now()
            or exists (select 1 from public.membership_holds h
              where h.member_id = m.id and h.closed_at is null))));
  get diagnostics v_codes = row_count;

  with moved as (
    update public.openchat_memberships oc set status = 'removal_due',
      removal_due_at = now(), updated_at = now()
      where oc.status = 'approved' and exists (
        select 1 from public.members m where m.id = oc.member_id
          and (m.access_paid_until is null or m.access_paid_until <= now()
            or exists (select 1 from public.membership_holds h
              where h.member_id = m.id and h.closed_at is null)))
      returning oc.member_id
  )
  insert into public.audit_logs(actor_kind, action, target_member_id, reason)
    select 'system', 'openchat_removal_due', member_id, 'access_inactive' from moved;
  get diagnostics v_removals = row_count;

  with moved as (
    update public.openchat_memberships oc set status = 'rejected', updated_at = now()
      where oc.status = 'pending' and exists (
        select 1 from public.members m where m.id = oc.member_id
          and (m.access_paid_until is null or m.access_paid_until <= now()
            or exists (select 1 from public.membership_holds h
              where h.member_id = m.id and h.closed_at is null)))
      returning oc.member_id
  )
  insert into public.audit_logs(actor_kind, action, target_member_id, reason)
    select 'system', 'openchat_request_rejected', member_id, 'access_inactive' from moved;
  get diagnostics v_rejections = row_count;

  return jsonb_build_object('codes_revoked', v_codes,
    'removal_due', v_removals, 'pending_rejected', v_rejections);
end;
$$;

revoke all on function public.issue_openchat_code(uuid, bytea, timestamptz)
  from public, anon, authenticated;
revoke all on function public.sweep_expired_openchat_access()
  from public, anon, authenticated;
grant execute on function public.issue_openchat_code(uuid, bytea, timestamptz)
  to service_role;
grant execute on function public.sweep_expired_openchat_access()
  to service_role;
