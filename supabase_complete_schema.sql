-- Golani SDA website starter schema for Supabase.
-- Run in Supabase Dashboard > SQL Editor > New query.
-- Supabase Auth identities are used by RLS; Django JWTs are not interchangeable.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, phone text,
  created_at timestamptz not null default now()
);
create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','member')),
  primary key (user_id, role)
);
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = 'admin');
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- CMS content
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(), title text not null,
  category text not null default 'General', priority text not null default 'normal',
  announcement_date date, content text, pdf_file_url text,
  is_pinned boolean not null default false, is_published boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(), title text not null, subtitle text,
  category text, start_date timestamptz, end_date timestamptz,
  start_time time, end_time time, location text, description text, image_url text,
  speaker_name text, bible_verse text, is_featured boolean not null default false,
  registration_required boolean not null default false,
  is_published boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists public.sermons (
  id uuid primary key default gen_random_uuid(), title text not null, speaker text,
  sermon_date date, duration text, topic text, scripture text, description text,
  thumbnail_url text, audio_url text, video_url text, tags text[] not null default '{}',
  is_featured boolean not null default false, is_published boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.ministries (
  id uuid primary key default gen_random_uuid(), name text not null,
  slug text not null unique, description text, type text,
  parent_id uuid references public.ministries(id) on delete set null,
  image_url text, is_published boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.leadership (
  id uuid primary key default gen_random_uuid(), full_name text not null,
  role text, display_role text, role_title text, bio text, email text, photo_url text,
  is_published boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(), title text not null, description text,
  image_url text, goal_amount numeric(14,2), currency text not null default 'TZS',
  is_active boolean not null default true, is_published boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.donation_campaigns (
  id uuid primary key default gen_random_uuid(), title text not null, description text,
  goal_amount numeric(14,2), raised_amount numeric(14,2) not null default 0,
  currency text not null default 'TZS', image_url text,
  is_active boolean not null default true, is_published boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.gallery_albums (
  id uuid primary key default gen_random_uuid(), title text not null, album_date date,
  description text, cover_image_url text, is_published boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.gallery_albums(id) on delete cascade,
  image_url text not null, caption text, sort_order integer not null default 0
);
create table if not exists public.service_times (
  id uuid primary key default gen_random_uuid(), name text not null, day text not null,
  time text not null, sort_order integer not null default 0,
  is_published boolean not null default true
);
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(), name text not null, role text,
  quote text not null, photo_url text, is_published boolean not null default false
);
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(), question text not null, answer text not null,
  sort_order integer not null default 0, is_published boolean not null default true
);

-- Forms and member activity
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null,
  phone text, subject text, message text not null, is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.event_rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  attendee_name text not null, email text not null, phone text,
  attendee_count integer not null default 1 check (attendee_count > 0),
  created_at timestamptz not null default now()
);
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(), email text not null unique,
  is_subscribed boolean not null default true, created_at timestamptz not null default now()
);
-- Payment records must only be written by a trusted server after payment verification.
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.donation_campaigns(id) on delete set null,
  donor_user_id uuid references auth.users(id) on delete set null,
  donor_name text, donor_email text,
  amount numeric(14,2) not null check (amount > 0), currency text not null default 'TZS',
  payment_provider text, provider_reference text unique,
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded')),
  created_at timestamptz not null default now()
);

-- Enable RLS on every exposed table.
do $$ declare t text; begin
  foreach t in array array[
    'profiles','user_roles','announcements','events','sermons','ministries','leadership',
    'projects','donation_campaigns','gallery_albums','gallery_photos','service_times',
    'testimonials','faqs','contact_messages','event_rsvps','newsletter_subscribers','donations'
  ] loop execute format('alter table public.%I enable row level security', t); end loop;
end $$;

-- Published CMS rows are public-read; admins can manage them.
do $$ declare t text; begin
  foreach t in array array[
    'announcements','events','sermons','ministries','leadership','projects',
    'donation_campaigns','gallery_albums','service_times','testimonials','faqs'
  ] loop
    execute format('drop policy if exists read_published on public.%I', t);
    execute format('create policy read_published on public.%I for select to anon, authenticated using (is_published)', t);
    execute format('drop policy if exists admin_manage on public.%I', t);
    execute format('create policy admin_manage on public.%I for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))', t);
  end loop;
end $$;
drop policy if exists gallery_photos_public_read on public.gallery_photos;
create policy gallery_photos_public_read on public.gallery_photos for select to anon, authenticated
  using (exists (select 1 from public.gallery_albums a where a.id = album_id and a.is_published));
drop policy if exists gallery_photos_admin_manage on public.gallery_photos;
create policy gallery_photos_admin_manage on public.gallery_photos for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists profiles_read_own on public.profiles;
create policy profiles_read_own on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));
drop policy if exists profiles_admin_manage on public.profiles;
create policy profiles_admin_manage on public.profiles for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists roles_read_own on public.user_roles;
create policy roles_read_own on public.user_roles for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_admin()));
drop policy if exists roles_admin_manage on public.user_roles;
create policy roles_admin_manage on public.user_roles for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists contact_public_insert on public.contact_messages;
create policy contact_public_insert on public.contact_messages for insert to anon, authenticated with check (true);
drop policy if exists contact_admin_manage on public.contact_messages;
create policy contact_admin_manage on public.contact_messages for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists rsvp_public_insert on public.event_rsvps;
create policy rsvp_public_insert on public.event_rsvps for insert to anon, authenticated
  with check (exists (select 1 from public.events e where e.id = event_id and e.is_published));
drop policy if exists rsvp_admin_manage on public.event_rsvps;
create policy rsvp_admin_manage on public.event_rsvps for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists newsletter_public_insert on public.newsletter_subscribers;
create policy newsletter_public_insert on public.newsletter_subscribers for insert to anon, authenticated with check (true);
drop policy if exists newsletter_admin_manage on public.newsletter_subscribers;
create policy newsletter_admin_manage on public.newsletter_subscribers for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists donations_admin_manage on public.donations;
create policy donations_admin_manage on public.donations for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

grant usage on schema public to anon, authenticated;
grant select on public.announcements, public.events, public.sermons, public.ministries,
  public.leadership, public.projects, public.donation_campaigns, public.gallery_albums,
  public.gallery_photos, public.service_times, public.testimonials, public.faqs to anon, authenticated;
grant insert on public.contact_messages, public.event_rsvps, public.newsletter_subscribers to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;

create index if not exists events_start_date_idx on public.events(start_date);
create index if not exists sermons_date_idx on public.sermons(sermon_date desc);
create index if not exists announcements_date_idx on public.announcements(announcement_date desc);
create index if not exists gallery_photos_album_order_idx on public.gallery_photos(album_id, sort_order);
create index if not exists rsvps_event_idx on public.event_rsvps(event_id);
create index if not exists donations_campaign_idx on public.donations(campaign_id);

-- Public read bucket for site media; only admins can upload/update/delete.
insert into storage.buckets (id, name, public) values ('church-media','church-media',true)
on conflict (id) do nothing;
drop policy if exists church_media_public_read on storage.objects;
create policy church_media_public_read on storage.objects for select to anon, authenticated
  using (bucket_id = 'church-media');
drop policy if exists church_media_admin_insert on storage.objects;
create policy church_media_admin_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'church-media' and (select public.is_admin()));
drop policy if exists church_media_admin_update on storage.objects;
create policy church_media_admin_update on storage.objects for update to authenticated
  using (bucket_id = 'church-media' and (select public.is_admin()))
  with check (bucket_id = 'church-media' and (select public.is_admin()));
drop policy if exists church_media_admin_delete on storage.objects;
create policy church_media_admin_delete on storage.objects for delete to authenticated
  using (bucket_id = 'church-media' and (select public.is_admin()));

-- To grant the first admin, create the user in Supabase Auth, then run:
-- insert into public.user_roles(user_id, role)
-- values ('AUTH_USER_UUID_HERE', 'admin');
