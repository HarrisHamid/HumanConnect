-- ============================================================
-- HumanConnect AI — Multi-vertical schema
-- Run this in the Supabase SQL Editor (or via supabase db push)
-- ============================================================

-- ------------------------------------------------------------
-- Tables
-- ------------------------------------------------------------

create table if not exists verticals (
  id           text primary key,            -- 'dental', 'mechanic'
  display_name text not null
);

create table if not exists businesses (
  id          uuid primary key default gen_random_uuid(),
  vertical_id text not null references verticals(id),
  name        text not null,
  created_at  timestamptz not null default now()
);

create table if not exists locations (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id),
  slug        text not null unique,         -- used in URLs: /dental/bright-smile-boston
  name        text not null,                -- 'Boston'
  city        text,
  phone       text,
  created_at  timestamptz not null default now()
);

create table if not exists calls (
  id                 uuid primary key default gen_random_uuid(),
  location_id        uuid not null references locations(id),
  caller_name        text,
  caller_phone       text,
  started_at         timestamptz not null default now(),
  duration_seconds   int check (duration_seconds >= 0),
  outcome            text not null,
  -- valid outcomes are enforced in the app layer (config/verticals.ts):
  --   dental:   booked | rescheduled | inquiry | no_booking
  --   mechanic: estimate_sent | checked_in | inquiry | no_action
  is_new_customer    boolean,
  sentiment          text check (sentiment in ('positive', 'neutral', 'negative')),
  transcript_summary text,
  vapi_call_id       text unique,           -- idempotency key for the future webhook
  created_at         timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------

create index if not exists calls_location_started_idx
  on calls (location_id, started_at desc);

create index if not exists locations_business_idx
  on locations (business_id);

-- ------------------------------------------------------------
-- Row Level Security
-- Public demo: anon may READ everything, write NOTHING.
-- Inserts happen only via service-role contexts (seed script,
-- future Vapi webhook -> Edge Function).
-- ------------------------------------------------------------

alter table verticals  enable row level security;
alter table businesses enable row level security;
alter table locations  enable row level security;
alter table calls      enable row level security;

drop policy if exists "public read verticals"  on verticals;
drop policy if exists "public read businesses" on businesses;
drop policy if exists "public read locations"  on locations;
drop policy if exists "public read calls"      on calls;

create policy "public read verticals"  on verticals
  for select to anon, authenticated using (true);

create policy "public read businesses" on businesses
  for select to anon, authenticated using (true);

create policy "public read locations"  on locations
  for select to anon, authenticated using (true);

create policy "public read calls"      on calls
  for select to anon, authenticated using (true);

-- No insert/update/delete policies are created on purpose.
-- With RLS enabled and no write policies, anon writes are denied.

-- ------------------------------------------------------------
-- Realtime
-- Adds `calls` to the realtime publication so the dashboard can
-- subscribe to postgres_changes (INSERT) filtered by location_id.
-- NOTE: this errors if the table is already in the publication —
-- the DO block swallows that so the migration stays re-runnable.
-- ------------------------------------------------------------

do $$
begin
  alter publication supabase_realtime add table calls;
exception
  when duplicate_object then null;
end $$;
