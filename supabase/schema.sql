create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  location text,
  year integer,
  status text,
  cover_image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  storage_path text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new',
  ip_address text,
  user_agent text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

drop index if exists idx_project_images_storage_path_unique;
create unique index if not exists idx_project_images_storage_path_unique
  on public.project_images(storage_path);

create index if not exists idx_projects_sort_order on public.projects(sort_order);
create index if not exists idx_project_images_project_id_sort_order on public.project_images(project_id, sort_order);
create index if not exists idx_contact_messages_created_at on public.contact_messages(created_at desc);
create index if not exists idx_contact_messages_status on public.contact_messages(status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists trg_projects_set_updated_at on public.projects;
create trigger trg_projects_set_updated_at
before update on public.projects
for each row execute procedure public.set_updated_at();

insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Public read projects" on public.projects;
create policy "Public read projects"
on public.projects
for select
using (true);

drop policy if exists "Public read project images" on public.project_images;
create policy "Public read project images"
on public.project_images
for select
using (true);

drop policy if exists "Authenticated write projects" on public.projects;
create policy "Authenticated write projects"
on public.projects
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated write project images" on public.project_images;
create policy "Authenticated write project images"
on public.project_images
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public create contact messages" on public.contact_messages;
create policy "Public create contact messages"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated read contact messages" on public.contact_messages;
create policy "Authenticated read contact messages"
on public.contact_messages
for select
to authenticated
using (true);

drop policy if exists "Authenticated update contact messages" on public.contact_messages;
create policy "Authenticated update contact messages"
on public.contact_messages
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated delete contact messages" on public.contact_messages;
create policy "Authenticated delete contact messages"
on public.contact_messages
for delete
to authenticated
using (true);

drop policy if exists "Public read project-images bucket" on storage.objects;
create policy "Public read project-images bucket"
on storage.objects
for select
using (bucket_id = 'project-images');

drop policy if exists "Authenticated write project-images bucket" on storage.objects;
create policy "Authenticated write project-images bucket"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-images' and public.is_admin_email());

drop policy if exists "Authenticated update project-images bucket" on storage.objects;
create policy "Authenticated update project-images bucket"
on storage.objects
for update
to authenticated
using (bucket_id = 'project-images' and public.is_admin_email())
with check (bucket_id = 'project-images' and public.is_admin_email());

drop policy if exists "Authenticated delete project-images bucket" on storage.objects;
create policy "Authenticated delete project-images bucket"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-images' and public.is_admin_email());
