-- Draft schema for the future Supabase implementation.
-- This is intentionally a starting point, not a production-final migration.

create schema if not exists shared;
create schema if not exists vs;
create schema if not exists co;

create extension if not exists pgcrypto;

create table if not exists shared.organizations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  slug text not null unique,
  niche text,
  status text not null default 'active'
);

create table if not exists shared.users (
  id uuid primary key,
  created_at timestamptz not null default now(),
  email text not null unique,
  full_name text,
  status text not null default 'active'
);

create table if not exists shared.memberships (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  organization_id uuid not null references shared.organizations(id) on delete cascade,
  user_id uuid not null references shared.users(id) on delete cascade,
  role text not null default 'operator',
  unique (organization_id, user_id)
);

create table if not exists shared.agent_runs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  organization_id uuid not null references shared.organizations(id) on delete cascade,
  module text not null,
  run_type text not null,
  status text not null,
  started_at timestamptz,
  completed_at timestamptz,
  summary text,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists shared.job_queue (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  organization_id uuid not null references shared.organizations(id) on delete cascade,
  job_type text not null,
  status text not null default 'queued',
  idempotency_key text,
  attempt_count integer not null default 0,
  max_attempts integer not null default 3,
  scheduled_for timestamptz default now(),
  started_at timestamptz,
  completed_at timestamptz,
  error_message text,
  payload jsonb not null default '{}'::jsonb
);

create table if not exists shared.notifications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  organization_id uuid not null references shared.organizations(id) on delete cascade,
  severity text not null default 'info',
  title text not null,
  body text,
  is_read boolean not null default false,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists shared.audit_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  organization_id uuid not null references shared.organizations(id) on delete cascade,
  actor_type text not null,
  actor_id text,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb not null default '{}'::jsonb
);

create table if not exists vs.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  organization_id uuid not null references shared.organizations(id) on delete cascade,
  company_name text not null,
  website text not null,
  region text,
  category text,
  source text,
  status text not null default 'discovered',
  owner text,
  notes text
);

create table if not exists vs.company_profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid not null references vs.leads(id) on delete cascade,
  headquarters text,
  partner_type text,
  services jsonb not null default '[]'::jsonb,
  capabilities jsonb not null default '{}'::jsonb,
  pricing_model text,
  quote_range text
);

create table if not exists vs.source_pages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid not null references vs.leads(id) on delete cascade,
  page_url text not null,
  page_type text,
  crawl_method text,
  title text,
  content_excerpt text,
  confidence numeric(5,2),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists vs.dossiers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid not null unique references vs.leads(id) on delete cascade,
  fit_summary text,
  strengths jsonb not null default '[]'::jsonb,
  weaknesses jsonb not null default '[]'::jsonb,
  risk_flags jsonb not null default '[]'::jsonb,
  next_action text,
  status text not null default 'analyzed',
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists vs.scorecards (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  dossier_id uuid not null references vs.dossiers(id) on delete cascade,
  automation_score numeric(4,1),
  ecommerce_score numeric(4,1),
  api_readiness_score numeric(4,1),
  startup_friendliness_score numeric(4,1),
  overall_fit_score numeric(4,1),
  rubric_version text default 'v1'
);

create table if not exists vs.contacts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  dossier_id uuid not null references vs.dossiers(id) on delete cascade,
  full_name text not null,
  title text,
  email text,
  phone text,
  linkedin_url text,
  source text,
  priority text,
  status text not null default 'new'
);

create table if not exists vs.calls (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  dossier_id uuid not null references vs.dossiers(id) on delete cascade,
  contact_id uuid references vs.contacts(id) on delete set null,
  provider text,
  call_status text not null,
  occurred_at timestamptz,
  summary text,
  next_action text,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists vs.call_transcripts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  call_id uuid not null references vs.calls(id) on delete cascade,
  transcript_text text,
  summary text,
  extracted_data jsonb not null default '{}'::jsonb
);

create table if not exists vs.followups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  dossier_id uuid not null references vs.dossiers(id) on delete cascade,
  title text not null,
  owner text,
  status text not null default 'open',
  due_at timestamptz,
  notes text
);

create table if not exists vs.shortlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  dossier_id uuid not null unique references vs.dossiers(id) on delete cascade,
  rank integer,
  rationale text,
  decision_status text not null default 'candidate'
);
