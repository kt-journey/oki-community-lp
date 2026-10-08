-- Membership foundation. Apply only after reviewing the linked Vault specification.
-- The public waitlist remains unchanged; this migration does not enable billing.

create extension if not exists pgcrypto;

create table public.members (
  id uuid primary key default gen_random_uuid(),
  line_user_id text not null unique,
  line_display_name text,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  plan_code text check (plan_code in ('monthly','yearly')),
  stripe_price_id text,
  stripe_subscription_status text,
  access_paid_until timestamptz,
  cancel_at_period_end boolean not null default false,
  current_period_end timestamptz,
  oa_friend_status text not null default 'unknown'
    check (oa_friend_status in ('unknown','friend','not_friend','blocked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.member_sessions (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete cascade,
  token_hash bytea not null unique,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.checkout_attempts (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id),
  plan_code text not null check (plan_code in ('monthly','yearly')),
  stripe_checkout_session_id text unique,
  idempotency_key text not null unique,
  status text not null default 'creating'
    check (status in ('creating','open','completed','expired','failed')),
  created_at timestamptz not null default now()
);

create table public.stripe_events (
  stripe_event_id text primary key,
  event_type text not null,
  stripe_object_id text,
  payload jsonb not null,
  processing_status text not null default 'pending'
    check (processing_status in ('pending','processing','done','failed','ignored')),
  attempts integer not null default 0,
  next_attempt_at timestamptz,
  last_error text,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);
create index stripe_events_work_idx on public.stripe_events
  (processing_status, next_attempt_at, received_at);

create table public.paid_invoices (
  stripe_invoice_id text primary key,
  member_id uuid not null references public.members(id),
  stripe_subscription_id text not null,
  stripe_price_id text not null,
  currency text not null check (currency = 'jpy'),
  amount_paid_yen integer not null check (amount_paid_yen > 0),
  service_period_start timestamptz not null,
  service_period_end timestamptz not null,
  paid_at timestamptz not null,
  check (service_period_start < service_period_end)
);

create table public.membership_holds (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id),
  reason text not null check (reason in
    ('full_refund','partial_refund_review','dispute','fraud_review','operator_stop')),
  stripe_object_id text,
  opened_at timestamptz not null default now(),
  closed_at timestamptz,
  note text
);
create index membership_holds_open_idx on public.membership_holds(member_id)
  where closed_at is null;

create table public.openchat_codes (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id),
  code_hash bytea not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);
create unique index openchat_one_live_code_per_member on public.openchat_codes(member_id)
  where used_at is null and revoked_at is null;

create table public.openchat_memberships (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id),
  code_id uuid references public.openchat_codes(id),
  nickname_at_approval text,
  status text not null check (status in
    ('pending','approved','removal_due','removed','left','rejected')),
  requested_at timestamptz,
  approved_at timestamptz,
  removal_due_at timestamptz,
  removed_at timestamptz,
  operator_note text,
  updated_at timestamptz not null default now()
);
create unique index openchat_one_current_membership on public.openchat_memberships(member_id)
  where status in ('pending','approved','removal_due');

create table public.admin_users (
  auth_user_id uuid primary key references auth.users(id),
  role text not null check (role in ('reviewer','owner')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_kind text not null check (actor_kind in ('member','admin','system')),
  actor_id text,
  action text not null,
  target_member_id uuid,
  reason text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;
alter table public.member_sessions enable row level security;
alter table public.checkout_attempts enable row level security;
alter table public.stripe_events enable row level security;
alter table public.paid_invoices enable row level security;
alter table public.membership_holds enable row level security;
alter table public.openchat_codes enable row level security;
alter table public.openchat_memberships enable row level security;
alter table public.admin_users enable row level security;
alter table public.audit_logs enable row level security;

revoke all on public.members, public.member_sessions, public.checkout_attempts,
  public.stripe_events, public.paid_invoices, public.membership_holds,
  public.openchat_codes, public.openchat_memberships, public.admin_users,
  public.audit_logs from anon, authenticated;
revoke all on sequence public.audit_logs_id_seq from anon, authenticated;
grant select, insert, update, delete on public.members, public.member_sessions,
  public.checkout_attempts, public.stripe_events, public.paid_invoices,
  public.membership_holds, public.openchat_codes, public.openchat_memberships,
  public.admin_users, public.audit_logs to service_role;
grant usage, select on sequence public.audit_logs_id_seq to service_role;
