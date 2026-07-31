-- AgriHub PH authenticated platform foundation.
-- Apply through the Supabase CLI only; do not make unmatched dashboard changes.

create extension if not exists pgcrypto;

do $$ begin
  create type public.app_role as enum (
    'farmer', 'fisher', 'coop', 'buyer', 'processor', 'transport',
    'government', 'finance', 'admin'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.organization_type as enum (
    'cooperative', 'buyer', 'processor', 'transport', 'government', 'finance', 'other'
  );
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text,
  phone text,
  province text,
  city_municipality text,
  primary_commodity text,
  avatar_url text,
  preferred_language text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

create unique index if not exists user_roles_one_primary
  on public.user_roles (user_id) where is_primary;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete restrict,
  name text not null,
  type public.organization_type not null default 'other',
  registration_number text,
  contact_email text,
  contact_phone text,
  address text,
  province text,
  city_municipality text,
  verification_status text not null default 'PENDING'
    check (verification_status in ('PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_memberships (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role_in_organization text not null default 'member',
  status text not null default 'ACTIVE'
    check (status in ('ACTIVE', 'PENDING', 'REJECTED', 'REVOKED')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table if not exists public.production_sites (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  local_id text not null,
  name text not null,
  site_type text not null,
  location text not null,
  province text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  primary_commodity text,
  version integer not null default 1 check (version > 0),
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

create table if not exists public.fishing_vessels (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  local_id text not null,
  name text not null,
  registration_number text,
  home_port text,
  vessel_type text,
  capacity_kg numeric(12, 2) check (capacity_kg is null or capacity_kg >= 0),
  status text not null default 'ACTIVE'
    check (status in ('ACTIVE', 'MAINTENANCE', 'INACTIVE')),
  version integer not null default 1 check (version > 0),
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

create table if not exists public.fishing_trips (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  vessel_id uuid references public.fishing_vessels(id) on delete set null,
  local_id text not null,
  vessel_name text not null,
  vessel_registration_number text,
  departure_port text not null,
  arrival_port text,
  departed_at timestamptz not null,
  returned_at timestamptz,
  fishing_ground text not null,
  fuel_used_liters numeric(12, 2) not null default 0 check (fuel_used_liters >= 0),
  crew_count integer not null default 1 check (crew_count > 0),
  status text not null default 'DEPARTED'
    check (status in ('DEPARTED', 'FISHING', 'RETURNED', 'CANCELLED')),
  version integer not null default 1 check (version > 0),
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

create table if not exists public.catch_logs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  trip_id uuid references public.fishing_trips(id) on delete cascade,
  trip_local_id text not null,
  local_id text not null,
  species_name text not null,
  weight_kg numeric(12, 2) not null check (weight_kg > 0),
  quality_grade text not null,
  preservation_method text not null
    check (preservation_method in ('chilled_ice', 'frozen', 'live', 'ambient')),
  caught_at_coordinates text,
  caught_at_date date not null,
  for_sale_kg numeric(12, 2) not null default 0 check (for_sale_kg >= 0),
  home_use_kg numeric(12, 2) not null default 0 check (home_use_kg >= 0),
  version integer not null default 1 check (version > 0),
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id),
  check (for_sale_kg + home_use_kg <= weight_kg)
);

create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  local_id text not null,
  name text not null,
  item_type text not null,
  quantity numeric(14, 3) not null default 0 check (quantity >= 0),
  unit text not null,
  unit_cost numeric(14, 2) not null default 0 check (unit_cost >= 0),
  fisheries_use boolean not null default false,
  version integer not null default 1 check (version > 0),
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  inventory_item_id uuid references public.inventory_items(id) on delete set null,
  inventory_item_local_id text not null,
  local_id text not null,
  movement_type text not null
    check (movement_type in ('purchase', 'usage', 'adjustment', 'transfer', 'sale')),
  quantity numeric(14, 3) not null check (quantity > 0),
  unit text not null,
  reason text,
  occurred_at timestamptz not null default now(),
  version integer not null default 1 check (version > 0),
  created_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  local_id text not null,
  title text not null,
  document_type text not null,
  entity_type text not null,
  entity_local_id text not null,
  storage_path text,
  file_name text,
  file_size_bytes bigint check (file_size_bytes is null or file_size_bytes >= 0),
  mime_type text,
  verification_status text not null default 'PENDING'
    check (verification_status in ('PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED')),
  expires_at date,
  version integer not null default 1 check (version > 0),
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

create table if not exists public.sync_operations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  device_id text not null,
  idempotency_key text not null,
  entity_type text not null,
  entity_local_id text not null,
  operation text not null check (operation in ('CREATE', 'UPDATE', 'DELETE')),
  client_version integer not null default 1,
  status text not null default 'APPLIED'
    check (status in ('APPLIED', 'CONFLICT', 'REJECTED')),
  error_message text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (owner_id, idempotency_key)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'profiles', 'organizations', 'production_sites', 'fishing_vessels',
    'fishing_trips', 'catch_logs', 'inventory_items', 'documents'
  ]
  loop
    execute format('drop trigger if exists set_updated_at on public.%I', table_name);
    execute format(
      'create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name
    );
  end loop;
end $$;

create or replace function public.has_role(requested_role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = requested_role
  );
$$;

create or replace function public.is_org_member(requested_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.organization_memberships
    where organization_id = requested_organization_id
      and user_id = (select auth.uid())
      and status = 'ACTIVE'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_role public.app_role;
  created_organization_id uuid;
  requested_org_name text;
begin
  requested_role := case
    when new.raw_user_meta_data ->> 'primary_role' in (
      'farmer', 'fisher', 'coop', 'buyer', 'processor', 'transport',
      'government', 'finance', 'admin'
    ) then (new.raw_user_meta_data ->> 'primary_role')::public.app_role
    else 'farmer'::public.app_role
  end;

  insert into public.profiles (
    id, full_name, email, phone, province, city_municipality, primary_commodity
  ) values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'province',
    new.raw_user_meta_data ->> 'city_municipality',
    new.raw_user_meta_data ->> 'primary_commodity'
  ) on conflict (id) do nothing;

  insert into public.user_roles (user_id, role, is_primary)
  values (new.id, requested_role, true)
  on conflict (user_id, role) do update set is_primary = true;

  requested_org_name := nullif(trim(new.raw_user_meta_data ->> 'organization_name'), '');
  if requested_org_name is not null then
    insert into public.organizations (owner_id, name, type, contact_email)
    values (
      new.id,
      requested_org_name,
      case
        when requested_role = 'coop' then 'cooperative'::public.organization_type
        when requested_role::text in ('buyer', 'processor', 'transport', 'government', 'finance')
          then requested_role::text::public.organization_type
        else 'other'::public.organization_type
      end,
      new.email
    )
    returning id into created_organization_id;

    insert into public.organization_memberships (
      organization_id, user_id, role_in_organization, status
    ) values (created_organization_id, new.id, 'owner', 'ACTIVE');
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into public.profiles (
  id, full_name, email, phone, province, city_municipality, primary_commodity
)
select
  id,
  coalesce(raw_user_meta_data ->> 'full_name', ''),
  email,
  raw_user_meta_data ->> 'phone',
  raw_user_meta_data ->> 'province',
  raw_user_meta_data ->> 'city_municipality',
  raw_user_meta_data ->> 'primary_commodity'
from auth.users
on conflict (id) do nothing;

insert into public.user_roles (user_id, role, is_primary)
select
  id,
  case
    when raw_user_meta_data ->> 'primary_role' in (
      'farmer', 'fisher', 'coop', 'buyer', 'processor', 'transport',
      'government', 'finance', 'admin'
    ) then (raw_user_meta_data ->> 'primary_role')::public.app_role
    else 'farmer'::public.app_role
  end,
  true
from auth.users
on conflict (user_id, role) do nothing;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.production_sites enable row level security;
alter table public.fishing_vessels enable row level security;
alter table public.fishing_trips enable row level security;
alter table public.catch_logs enable row level security;
alter table public.inventory_items enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.documents enable row level security;
alter table public.sync_operations enable row level security;

create policy profiles_self_select on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy profiles_self_update on public.profiles
  for update to authenticated using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy user_roles_self_select on public.user_roles
  for select to authenticated using ((select auth.uid()) = user_id);

create policy organizations_member_select on public.organizations
  for select to authenticated
  using (
    owner_id = (select auth.uid())
    or public.is_org_member(id)
    or public.has_role('admin')
  );
create policy organizations_owner_insert on public.organizations
  for insert to authenticated with check (owner_id = (select auth.uid()));
create policy organizations_owner_update on public.organizations
  for update to authenticated using (owner_id = (select auth.uid()) or public.has_role('admin'))
  with check (owner_id = (select auth.uid()) or public.has_role('admin'));
create policy organizations_owner_delete on public.organizations
  for delete to authenticated using (owner_id = (select auth.uid()) or public.has_role('admin'));

create policy memberships_org_select on public.organization_memberships
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or public.is_org_member(organization_id)
    or public.has_role('admin')
  );
create policy memberships_owner_insert on public.organization_memberships
  for insert to authenticated
  with check (
    exists (
      select 1 from public.organizations
      where id = organization_id and owner_id = (select auth.uid())
    )
    or public.has_role('admin')
  );
create policy memberships_owner_update on public.organization_memberships
  for update to authenticated
  using (
    exists (
      select 1 from public.organizations
      where id = organization_id and owner_id = (select auth.uid())
    )
    or public.has_role('admin')
  )
  with check (
    exists (
      select 1 from public.organizations
      where id = organization_id and owner_id = (select auth.uid())
    )
    or public.has_role('admin')
  );
create policy memberships_owner_delete on public.organization_memberships
  for delete to authenticated
  using (
    exists (
      select 1 from public.organizations
      where id = organization_id and owner_id = (select auth.uid())
    )
    or public.has_role('admin')
  );

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'production_sites', 'fishing_vessels', 'fishing_trips', 'catch_logs',
    'inventory_items', 'inventory_movements', 'documents'
  ]
  loop
    execute format(
      'create policy %I on public.%I for select to authenticated using (
        owner_id = (select auth.uid())
        or (organization_id is not null and public.is_org_member(organization_id))
        or public.has_role(''admin'')
      )',
      table_name || '_select', table_name
    );
    execute format(
      'create policy %I on public.%I for insert to authenticated with check (
        owner_id = (select auth.uid())
        and (organization_id is null or public.is_org_member(organization_id))
      )',
      table_name || '_insert', table_name
    );
    execute format(
      'create policy %I on public.%I for update to authenticated using (
        owner_id = (select auth.uid())
        or (organization_id is not null and public.is_org_member(organization_id))
        or public.has_role(''admin'')
      ) with check (
        owner_id = (select auth.uid())
        and (organization_id is null or public.is_org_member(organization_id))
      )',
      table_name || '_update', table_name
    );
    execute format(
      'create policy %I on public.%I for delete to authenticated using (
        owner_id = (select auth.uid()) or public.has_role(''admin'')
      )',
      table_name || '_delete', table_name
    );
  end loop;
end $$;

create policy sync_operations_self_select on public.sync_operations
  for select to authenticated using (owner_id = (select auth.uid()));
create policy sync_operations_self_insert on public.sync_operations
  for insert to authenticated with check (owner_id = (select auth.uid()));

create index if not exists fishing_trips_owner_departed_idx
  on public.fishing_trips (owner_id, departed_at desc) where deleted_at is null;
create index if not exists catch_logs_owner_caught_idx
  on public.catch_logs (owner_id, caught_at_date desc) where deleted_at is null;
create index if not exists catch_logs_trip_local_idx
  on public.catch_logs (owner_id, trip_local_id);
create index if not exists inventory_items_owner_type_idx
  on public.inventory_items (owner_id, item_type) where deleted_at is null;
create index if not exists documents_owner_type_idx
  on public.documents (owner_id, document_type) where deleted_at is null;

insert into storage.buckets (id, name, public)
values ('agrihub-documents', 'agrihub-documents', false)
on conflict (id) do update set public = false;

create policy documents_storage_select on storage.objects
  for select to authenticated
  using (
    bucket_id = 'agrihub-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy documents_storage_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'agrihub-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy documents_storage_update on storage.objects
  for update to authenticated
  using (
    bucket_id = 'agrihub-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'agrihub-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy documents_storage_delete on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'agrihub-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
