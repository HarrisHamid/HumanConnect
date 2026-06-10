-- ============================================================
-- HumanConnect AI — Demo seed data
-- Run AFTER 01_schema.sql, in the Supabase SQL Editor.
-- Re-runnable: deletes previously seeded calls (vapi_call_id
-- prefixed 'seed_') before regenerating.
--
-- Generates per location:
--   ~200 calls over the last 30 days (business hours, no Sundays,
--   lighter Saturdays) + 6 calls within the last few hours so the
--   dashboard looks live the moment it loads.
-- ============================================================

-- ------------------------------------------------------------
-- Reference data (fixed UUIDs so re-runs are stable and the
-- frontend config can hardcode them if ever needed)
-- ------------------------------------------------------------

insert into verticals (id, display_name) values
  ('dental',   'Dental Clinic'),
  ('mechanic', 'Auto Mechanic Shop')
on conflict (id) do nothing;

insert into businesses (id, vertical_id, name) values
  ('a1000000-0000-0000-0000-000000000001', 'dental',   'Bright Smile Dental'),
  ('a1000000-0000-0000-0000-000000000002', 'dental',   'Charles River Dental'),
  ('a1000000-0000-0000-0000-000000000003', 'mechanic', 'Route 9 Auto'),
  ('a1000000-0000-0000-0000-000000000004', 'mechanic', 'Beacon Garage')
on conflict (id) do nothing;

insert into locations (id, business_id, slug, name, city, phone) values
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'bright-smile-boston',    'Boston',     'Boston, MA',     '(617) 555-0134'),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'bright-smile-cambridge', 'Cambridge',  'Cambridge, MA',  '(617) 555-0188'),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'charles-river-brookline','Brookline',  'Brookline, MA',  '(617) 555-0142'),
  ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', 'route-9-newton',         'Newton',     'Newton, MA',     '(617) 555-0167'),
  ('b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000003', 'route-9-framingham',     'Framingham', 'Framingham, MA', '(508) 555-0121'),
  ('b1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000004', 'beacon-garage-somerville','Somerville','Somerville, MA', '(617) 555-0195')
on conflict (id) do nothing;

-- ------------------------------------------------------------
-- Call generation
-- ------------------------------------------------------------

-- wipe previously seeded calls so the script is idempotent
delete from calls where vapi_call_id like 'seed_%';

do $$
declare
  loc record;
  i int;
  d date;
  dow int;
  ts timestamptz;
  r numeric;
  outc text;
  dur int;
  sent text;
  summ text;
  fname text;
  lname text;

  first_names text[] := array[
    'James','Maria','David','Sarah','Michael','Jennifer','Robert','Linda',
    'Kevin','Emily','Brian','Jessica','Daniel','Ashley','Mark','Amanda',
    'Carlos','Priya','Tom','Rachel','Sean','Nicole','Derek','Hannah',
    'Luis','Megan','Frank','Olivia','Greg','Dana'
  ];
  last_names text[] := array[
    'Smith','Johnson','Garcia','Chen','Patel','Murphy','Sullivan','Nguyen',
    'Brown','Davis','Rodriguez','Kim','Walsh','OBrien','Santos','Lee',
    'Martin','Russo','Kelly','Tran','Costa','Doyle','Ferreira','Burke'
  ];

  dental_booked text[] := array[
    'Booked a cleaning for next week',
    'Scheduled a new patient exam',
    'Booked a filling appointment',
    'Scheduled a whitening consultation',
    'Booked a 6-month checkup'
  ];
  dental_resched text[] := array[
    'Moved Thursday appointment to Friday',
    'Rescheduled cleaning to next month',
    'Pushed appointment back one week'
  ];
  dental_inquiry text[] := array[
    'Asked about insurance coverage',
    'Asked about office hours',
    'Question about Invisalign pricing',
    'Asked whether the practice accepts new patients'
  ];
  dental_nobook text[] := array[
    'Caller will call back later',
    'Asked for pricing, did not book',
    'Wrong number',
    'Caller hung up before booking'
  ];

  mech_estimate text[] := array[
    'Sent estimate for brake pad replacement',
    'Quoted oil change and tire rotation',
    'Estimate for check engine diagnostic',
    'Quoted timing belt replacement',
    'Sent estimate for AC repair'
  ];
  mech_checkin text[] := array[
    'Checked in vehicle for inspection',
    'Scheduled drop-off for tomorrow morning',
    'Checked in for scheduled oil change',
    'Arranged tow-in and check-in'
  ];
  mech_inquiry text[] := array[
    'Asked if shop services diesel engines',
    'Asked about loaner car availability',
    'Question about state inspection hours',
    'Asked about warranty on repairs'
  ];
  mech_noact text[] := array[
    'Caller comparing prices, will call back',
    'Wrong number',
    'Asked for a service the shop does not offer',
    'Caller hung up during hold'
  ];
begin
  for loc in
    select l.id as location_id, b.vertical_id as vertical
    from locations l
    join businesses b on b.id = l.business_id
  loop
    for i in 1..206 loop

      -- ---- timestamp ----
      if i <= 6 then
        -- a handful of very recent calls so "today" never looks empty
        ts := now() - make_interval(mins => (floor(random() * 240))::int);
      else
        -- pick a day in the last 30: never Sunday, Saturday at ~50% rate
        loop
          d := current_date - (floor(random() * 30))::int;
          dow := extract(dow from d)::int;
          exit when dow <> 0 and (dow <> 6 or random() < 0.5);
        end loop;
        ts := d::timestamptz + make_interval(
          hours => 8 + (floor(random() * 10))::int,   -- 8am–5pm
          mins  => (floor(random() * 60))::int,
          secs  => (floor(random() * 60))::int
        );
      end if;

      -- ---- outcome (weighted per vertical) ----
      r := random();
      if loc.vertical = 'dental' then
        outc := case
          when r < 0.45 then 'booked'
          when r < 0.55 then 'rescheduled'
          when r < 0.80 then 'inquiry'
          else 'no_booking'
        end;
      else
        outc := case
          when r < 0.35 then 'estimate_sent'
          when r < 0.60 then 'checked_in'
          when r < 0.85 then 'inquiry'
          else 'no_action'
        end;
      end if;

      -- ---- duration correlated with outcome ----
      dur := case outc
        when 'booked'        then 120 + (floor(random() * 300))::int
        when 'rescheduled'   then  90 + (floor(random() * 180))::int
        when 'estimate_sent' then 150 + (floor(random() * 330))::int
        when 'checked_in'    then  90 + (floor(random() * 210))::int
        when 'inquiry'       then  60 + (floor(random() * 180))::int
        else                       30 + (floor(random() * 120))::int
      end;

      -- ---- sentiment correlated with outcome ----
      r := random();
      if outc in ('booked', 'rescheduled', 'estimate_sent', 'checked_in') then
        sent := case when r < 0.70 then 'positive'
                     when r < 0.95 then 'neutral'
                     else 'negative' end;
      elsif outc = 'inquiry' then
        sent := case when r < 0.40 then 'positive'
                     when r < 0.90 then 'neutral'
                     else 'negative' end;
      else
        sent := case when r < 0.10 then 'positive'
                     when r < 0.65 then 'neutral'
                     else 'negative' end;
      end if;

      -- ---- transcript summary ----
      summ := case outc
        when 'booked'        then dental_booked[1 + floor(random() * array_length(dental_booked, 1))::int]
        when 'rescheduled'   then dental_resched[1 + floor(random() * array_length(dental_resched, 1))::int]
        when 'no_booking'    then dental_nobook[1 + floor(random() * array_length(dental_nobook, 1))::int]
        when 'estimate_sent' then mech_estimate[1 + floor(random() * array_length(mech_estimate, 1))::int]
        when 'checked_in'    then mech_checkin[1 + floor(random() * array_length(mech_checkin, 1))::int]
        when 'no_action'     then mech_noact[1 + floor(random() * array_length(mech_noact, 1))::int]
        else case when loc.vertical = 'dental'
               then dental_inquiry[1 + floor(random() * array_length(dental_inquiry, 1))::int]
               else mech_inquiry[1 + floor(random() * array_length(mech_inquiry, 1))::int]
             end
      end;

      -- ---- caller identity ----
      fname := first_names[1 + floor(random() * array_length(first_names, 1))::int];
      lname := last_names[1 + floor(random() * array_length(last_names, 1))::int];

      insert into calls (
        location_id, caller_name, caller_phone, started_at,
        duration_seconds, outcome, is_new_customer, sentiment,
        transcript_summary, vapi_call_id
      ) values (
        loc.location_id,
        fname || ' ' || lname,
        '(617) 555-' || lpad((floor(random() * 10000))::int::text, 4, '0'),
        ts,
        dur,
        outc,
        random() < 0.40,
        sent,
        summ,
        'seed_' || gen_random_uuid()
      );

    end loop;
  end loop;
end $$;

-- ------------------------------------------------------------
-- Sanity check — run after seeding
-- ------------------------------------------------------------

select
  b.name as business,
  l.name as location,
  v.id as vertical,
  count(c.id) as calls,
  count(*) filter (where c.outcome in ('booked', 'estimate_sent')) as primary_conversions,
  round(avg(c.duration_seconds)) as avg_duration_s
from locations l
join businesses b on b.id = l.business_id
join verticals v on v.id = b.vertical_id
left join calls c on c.location_id = l.id
group by b.name, l.name, v.id
order by v.id, b.name, l.name;
