-- Commercial negotiation threads for B2B buyers and cooperative managers.
-- Extends the existing marketplace listings and orders rather than replacing them.

alter table public.marketplace_listings
  add column if not exists cooperative_organization_id uuid
    references public.organizations(id) on delete set null,
  add column if not exists inventory_item_id uuid
    references public.inventory_items(id) on delete set null,
  add column if not exists commodity_id text,
  add column if not exists quality_grade text,
  add column if not exists product_sector text
    check (product_sector is null or product_sector in ('agriculture', 'fisheries')),
  add column if not exists reserved_weight_kg numeric(12, 2) not null default 0
    check (reserved_weight_kg >= 0),
  add column if not exists listing_status text not null default 'ACTIVE'
    check (listing_status in ('DRAFT', 'ACTIVE', 'PAUSED', 'SOLD_OUT', 'CLOSED')),
  add column if not exists updated_at timestamptz not null default now();

alter table public.inventory_items
  add column if not exists reserved_quantity numeric(14, 3) not null default 0
    check (reserved_quantity >= 0 and reserved_quantity <= quantity);

alter table public.orders
  alter column buyer_id drop not null,
  alter column listing_id drop not null,
  add column if not exists buyer_organization_id uuid
    references public.organizations(id) on delete restrict,
  add column if not exists cooperative_organization_id uuid
    references public.organizations(id) on delete restrict,
  add column if not exists negotiation_id uuid,
  add column if not exists accepted_offer_id uuid,
  add column if not exists commodity_id text,
  add column if not exists commodity_name text,
  add column if not exists quantity numeric(14, 3),
  add column if not exists unit text not null default 'kg',
  add column if not exists unit_price numeric(14, 2),
  add column if not exists quality_grade text,
  add column if not exists quality_notes text,
  add column if not exists delivery_date date,
  add column if not exists delivery_location text,
  add column if not exists payment_terms text,
  add column if not exists commercial_notes text,
  add column if not exists total_amount numeric(16, 2),
  add column if not exists order_source text not null default 'DIRECT'
    check (order_source in ('DIRECT', 'NEGOTIATED')),
  add column if not exists reservation_rule text not null default 'on_confirmation'
    check (reservation_rule in ('on_accept', 'on_confirmation', 'none')),
  add column if not exists stock_reserved_quantity numeric(14, 3) not null default 0,
  add column if not exists stock_reserved_at timestamptz,
  add column if not exists updated_at timestamptz not null default now();

alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders
  add constraint orders_status_check check (
    status in (
      'PENDING', 'DRAFT_NEGOTIATED', 'CONFIRMED', 'PACKING',
      'DISPATCHED', 'DELIVERED', 'CANCELLED'
    )
  );

do $$ begin
  create type public.negotiation_status as enum (
    'draft', 'submitted', 'under_review', 'countered', 'accepted',
    'rejected', 'withdrawn', 'expired', 'converted_to_order', 'cancelled'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.negotiation_offer_status as enum (
    'pending', 'accepted', 'rejected', 'superseded', 'withdrawn', 'expired'
  );
exception when duplicate_object then null;
end $$;

create table if not exists public.negotiations (
  id uuid primary key default gen_random_uuid(),
  buyer_organization_id uuid not null
    references public.organizations(id) on delete restrict,
  cooperative_organization_id uuid not null
    references public.organizations(id) on delete restrict,
  listing_id text references public.marketplace_listings(id) on delete set null,
  buyer_request_id text,
  commodity_id text not null,
  commodity_name text not null,
  product_sector text not null default 'agriculture'
    check (product_sector in ('agriculture', 'fisheries')),
  inventory_item_id uuid references public.inventory_items(id) on delete set null,
  status public.negotiation_status not null default 'draft',
  current_offer_id uuid,
  initiated_by_user_id uuid not null references auth.users(id) on delete restrict,
  accepted_offer_id uuid,
  resulting_order_id text references public.orders(id) on delete set null,
  reservation_rule text not null default 'on_confirmation'
    check (reservation_rule in ('on_accept', 'on_confirmation', 'none')),
  expires_at timestamptz,
  last_activity_at timestamptz not null default now(),
  version integer not null default 1 check (version > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  check (buyer_organization_id <> cooperative_organization_id)
);

create table if not exists public.negotiation_participants (
  id uuid primary key default gen_random_uuid(),
  negotiation_id uuid not null references public.negotiations(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  participant_role text not null check (participant_role in ('buyer', 'cooperative')),
  can_make_offer boolean not null default true,
  can_accept_offer boolean not null default true,
  created_at timestamptz not null default now(),
  unique (negotiation_id, organization_id)
);

create table if not exists public.negotiation_offers (
  id uuid primary key default gen_random_uuid(),
  negotiation_id uuid not null references public.negotiations(id) on delete cascade,
  offer_number integer not null check (offer_number > 0),
  created_by_user_id uuid not null references auth.users(id) on delete restrict,
  created_by_organization_id uuid not null
    references public.organizations(id) on delete restrict,
  quantity numeric(14, 3) not null check (quantity > 0),
  unit text not null default 'kg',
  unit_price numeric(14, 2) not null check (unit_price > 0),
  delivery_date date not null,
  delivery_location text not null,
  payment_terms text not null,
  quality_grade text not null,
  quality_notes text,
  notes text,
  status public.negotiation_offer_status not null default 'pending',
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  unique (negotiation_id, offer_number)
);

create table if not exists public.negotiation_messages (
  id uuid primary key default gen_random_uuid(),
  negotiation_id uuid not null references public.negotiations(id) on delete cascade,
  sender_user_id uuid not null references auth.users(id) on delete restrict,
  sender_organization_id uuid not null
    references public.organizations(id) on delete restrict,
  message text not null check (length(trim(message)) between 1 and 4000),
  related_offer_id uuid references public.negotiation_offers(id) on delete set null,
  created_at timestamptz not null default now(),
  edited_at timestamptz,
  deleted_at timestamptz
);

create table if not exists public.negotiation_events (
  id uuid primary key default gen_random_uuid(),
  negotiation_id uuid not null references public.negotiations(id) on delete cascade,
  actor_user_id uuid references auth.users(id) on delete set null,
  actor_organization_id uuid references public.organizations(id) on delete set null,
  event_type text not null,
  offer_id uuid references public.negotiation_offers(id) on delete set null,
  order_id text references public.orders(id) on delete set null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  notification_type text not null,
  title text not null,
  message text not null,
  action_url text,
  metadata jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.negotiations
  add constraint negotiations_current_offer_fkey
    foreign key (current_offer_id) references public.negotiation_offers(id) on delete set null,
  add constraint negotiations_accepted_offer_fkey
    foreign key (accepted_offer_id) references public.negotiation_offers(id) on delete set null;

alter table public.orders
  add constraint orders_negotiation_id_fkey
    foreign key (negotiation_id) references public.negotiations(id) on delete set null,
  add constraint orders_accepted_offer_id_fkey
    foreign key (accepted_offer_id) references public.negotiation_offers(id) on delete set null;

create index if not exists negotiations_buyer_activity_idx
  on public.negotiations (buyer_organization_id, last_activity_at desc)
  where deleted_at is null;
create index if not exists negotiations_coop_activity_idx
  on public.negotiations (cooperative_organization_id, last_activity_at desc)
  where deleted_at is null;
create index if not exists negotiation_offers_thread_idx
  on public.negotiation_offers (negotiation_id, offer_number);
create index if not exists negotiation_messages_thread_idx
  on public.negotiation_messages (negotiation_id, created_at);
create index if not exists negotiation_events_thread_idx
  on public.negotiation_events (negotiation_id, created_at);
create index if not exists notifications_user_unread_idx
  on public.notifications (user_id, created_at desc) where read_at is null;

drop trigger if exists set_updated_at on public.negotiations;
create trigger set_updated_at
  before update on public.negotiations
  for each row execute function public.set_updated_at();
drop trigger if exists set_updated_at on public.orders;
create trigger set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();
drop trigger if exists set_updated_at on public.marketplace_listings;
create trigger set_updated_at
  before update on public.marketplace_listings
  for each row execute function public.set_updated_at();

create or replace function public.can_access_negotiation(requested_negotiation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.negotiations n
    where n.id = requested_negotiation_id
      and (
        n.initiated_by_user_id = (select auth.uid())
        or public.is_org_member(n.buyer_organization_id)
        or public.is_org_member(n.cooperative_organization_id)
        or public.has_role('admin')
      )
  );
$$;

create or replace function public.negotiation_actor_organization(
  requested_negotiation_id uuid
)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select case
    when public.is_org_member(n.buyer_organization_id)
      then n.buyer_organization_id
    when public.is_org_member(n.cooperative_organization_id)
      then n.cooperative_organization_id
    else null
  end
  from public.negotiations n
  where n.id = requested_negotiation_id;
$$;

create or replace function public.notify_negotiation_party(
  requested_negotiation_id uuid,
  excluded_organization_id uuid,
  requested_type text,
  requested_title text,
  requested_message text
)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.notifications (
    user_id, organization_id, notification_type, title, message, action_url, metadata
  )
  select
    membership.user_id,
    membership.organization_id,
    requested_type,
    requested_title,
    requested_message,
    case
      when membership.organization_id = negotiation.buyer_organization_id
        then '/buyer/negotiations/' || negotiation.id::text
      else '/coop/negotiations/' || negotiation.id::text
    end,
    jsonb_build_object('negotiation_id', negotiation.id)
  from public.negotiations negotiation
  join public.organization_memberships membership
    on membership.organization_id in (
      negotiation.buyer_organization_id,
      negotiation.cooperative_organization_id
    )
  where negotiation.id = requested_negotiation_id
    and membership.organization_id <> excluded_organization_id
    and membership.status = 'ACTIVE';
$$;

create or replace function public.create_negotiation(
  p_buyer_organization_id uuid,
  p_cooperative_organization_id uuid,
  p_listing_id text,
  p_commodity_id text,
  p_commodity_name text,
  p_product_sector text,
  p_inventory_item_id uuid,
  p_quantity numeric,
  p_unit text,
  p_unit_price numeric,
  p_delivery_date date,
  p_delivery_location text,
  p_payment_terms text,
  p_quality_grade text,
  p_quality_notes text default null,
  p_notes text default null,
  p_expires_at timestamptz default null,
  p_reservation_rule text default 'on_confirmation'
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  created_negotiation_id uuid;
  created_offer_id uuid;
begin
  if (select auth.uid()) is null then
    raise exception 'Authentication required';
  end if;
  if not public.is_org_member(p_buyer_organization_id)
     or not public.has_role('buyer') then
    raise exception 'Only an authorized buyer organization member can initiate a negotiation';
  end if;
  if not exists (
    select 1 from public.organizations
    where id = p_cooperative_organization_id and type = 'cooperative'
  ) then
    raise exception 'A valid cooperative organization is required';
  end if;
  if p_product_sector not in ('agriculture', 'fisheries')
     or p_reservation_rule not in ('on_accept', 'on_confirmation', 'none')
     or p_quantity <= 0 or p_unit_price <= 0 then
    raise exception 'Invalid commercial offer terms';
  end if;

  insert into public.negotiations (
    buyer_organization_id,
    cooperative_organization_id,
    listing_id,
    commodity_id,
    commodity_name,
    product_sector,
    inventory_item_id,
    status,
    initiated_by_user_id,
    reservation_rule,
    expires_at
  ) values (
    p_buyer_organization_id,
    p_cooperative_organization_id,
    nullif(p_listing_id, ''),
    p_commodity_id,
    p_commodity_name,
    p_product_sector,
    p_inventory_item_id,
    'submitted',
    (select auth.uid()),
    p_reservation_rule,
    coalesce(p_expires_at, now() + interval '7 days')
  )
  returning id into created_negotiation_id;

  insert into public.negotiation_participants (
    negotiation_id, organization_id, user_id, participant_role
  ) values
    (created_negotiation_id, p_buyer_organization_id, (select auth.uid()), 'buyer'),
    (created_negotiation_id, p_cooperative_organization_id, null, 'cooperative');

  insert into public.negotiation_offers (
    negotiation_id,
    offer_number,
    created_by_user_id,
    created_by_organization_id,
    quantity,
    unit,
    unit_price,
    delivery_date,
    delivery_location,
    payment_terms,
    quality_grade,
    quality_notes,
    notes,
    valid_until
  ) values (
    created_negotiation_id,
    1,
    (select auth.uid()),
    p_buyer_organization_id,
    p_quantity,
    coalesce(nullif(trim(p_unit), ''), 'kg'),
    p_unit_price,
    p_delivery_date,
    p_delivery_location,
    p_payment_terms,
    p_quality_grade,
    p_quality_notes,
    p_notes,
    coalesce(p_expires_at, now() + interval '7 days')
  )
  returning id into created_offer_id;

  update public.negotiations
  set current_offer_id = created_offer_id
  where id = created_negotiation_id;

  if nullif(trim(coalesce(p_notes, '')), '') is not null then
    insert into public.negotiation_messages (
      negotiation_id, sender_user_id, sender_organization_id, message, related_offer_id
    ) values (
      created_negotiation_id,
      (select auth.uid()),
      p_buyer_organization_id,
      p_notes,
      created_offer_id
    );
  end if;

  insert into public.negotiation_events (
    negotiation_id, actor_user_id, actor_organization_id, event_type, offer_id, payload
  ) values (
    created_negotiation_id,
    (select auth.uid()),
    p_buyer_organization_id,
    'negotiation_submitted',
    created_offer_id,
    jsonb_build_object('quantity', p_quantity, 'unit_price', p_unit_price)
  );

  perform public.notify_negotiation_party(
    created_negotiation_id,
    p_buyer_organization_id,
    'NEGOTIATION_SUBMITTED',
    'New commercial negotiation',
    p_commodity_name || ': ' || p_quantity || ' ' || p_unit || ' at PHP ' || p_unit_price
  );
  return created_negotiation_id;
end;
$$;

create or replace function public.counter_negotiation(
  p_negotiation_id uuid,
  p_quantity numeric,
  p_unit text,
  p_unit_price numeric,
  p_delivery_date date,
  p_delivery_location text,
  p_payment_terms text,
  p_quality_grade text,
  p_quality_notes text default null,
  p_notes text default null,
  p_valid_until timestamptz default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  negotiation_row public.negotiations%rowtype;
  current_offer_row public.negotiation_offers%rowtype;
  actor_organization_id uuid;
  created_offer_id uuid;
  next_offer_number integer;
begin
  select * into negotiation_row
  from public.negotiations where id = p_negotiation_id for update;
  if negotiation_row.id is null or not public.can_access_negotiation(p_negotiation_id) then
    raise exception 'Negotiation not found or access denied';
  end if;
  if negotiation_row.status not in ('submitted', 'under_review', 'countered') then
    raise exception 'Negotiation is not open for a counteroffer';
  end if;
  if negotiation_row.expires_at is not null and negotiation_row.expires_at <= now() then
    update public.negotiations set status = 'expired' where id = p_negotiation_id;
    insert into public.negotiation_events (negotiation_id, event_type)
      values (p_negotiation_id, 'negotiation_expired');
    return null;
  end if;

  actor_organization_id := public.negotiation_actor_organization(p_negotiation_id);
  select * into current_offer_row
  from public.negotiation_offers where id = negotiation_row.current_offer_id for update;
  if actor_organization_id is null
     or current_offer_row.created_by_organization_id = actor_organization_id then
    raise exception 'The receiving party must respond before another counteroffer';
  end if;
  if p_quantity <= 0 or p_unit_price <= 0 then
    raise exception 'Quantity and unit price must be positive';
  end if;

  update public.negotiation_offers
  set status = 'superseded'
  where id = current_offer_row.id and status = 'pending';

  select coalesce(max(offer_number), 0) + 1 into next_offer_number
  from public.negotiation_offers where negotiation_id = p_negotiation_id;

  insert into public.negotiation_offers (
    negotiation_id, offer_number, created_by_user_id, created_by_organization_id,
    quantity, unit, unit_price, delivery_date, delivery_location, payment_terms,
    quality_grade, quality_notes, notes, valid_until
  ) values (
    p_negotiation_id, next_offer_number, (select auth.uid()), actor_organization_id,
    p_quantity, coalesce(nullif(trim(p_unit), ''), 'kg'), p_unit_price,
    p_delivery_date, p_delivery_location, p_payment_terms,
    p_quality_grade, p_quality_notes, p_notes,
    coalesce(p_valid_until, negotiation_row.expires_at)
  )
  returning id into created_offer_id;

  update public.negotiations
  set
    current_offer_id = created_offer_id,
    status = 'countered',
    last_activity_at = now(),
    version = version + 1
  where id = p_negotiation_id;

  if nullif(trim(coalesce(p_notes, '')), '') is not null then
    insert into public.negotiation_messages (
      negotiation_id, sender_user_id, sender_organization_id, message, related_offer_id
    ) values (
      p_negotiation_id, (select auth.uid()), actor_organization_id, p_notes, created_offer_id
    );
  end if;

  insert into public.negotiation_events (
    negotiation_id, actor_user_id, actor_organization_id, event_type, offer_id, payload
  ) values (
    p_negotiation_id, (select auth.uid()), actor_organization_id,
    'counteroffer_sent', created_offer_id,
    jsonb_build_object('offer_number', next_offer_number, 'quantity', p_quantity, 'unit_price', p_unit_price)
  );
  perform public.notify_negotiation_party(
    p_negotiation_id, actor_organization_id, 'NEGOTIATION_COUNTERED',
    'Counteroffer received', negotiation_row.commodity_name || ' commercial terms were updated'
  );
  return created_offer_id;
end;
$$;

create or replace function public.accept_negotiation(p_negotiation_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  negotiation_row public.negotiations%rowtype;
  offer_row public.negotiation_offers%rowtype;
  actor_organization_id uuid;
  available_quantity numeric;
  created_order_id text;
begin
  select * into negotiation_row
  from public.negotiations where id = p_negotiation_id for update;
  if negotiation_row.id is null or not public.can_access_negotiation(p_negotiation_id) then
    raise exception 'Negotiation not found or access denied';
  end if;
  if negotiation_row.status not in ('submitted', 'under_review', 'countered') then
    raise exception 'Negotiation is not open for acceptance';
  end if;
  if negotiation_row.expires_at is not null and negotiation_row.expires_at <= now() then
    update public.negotiations set status = 'expired' where id = p_negotiation_id;
    insert into public.negotiation_events (negotiation_id, event_type)
      values (p_negotiation_id, 'negotiation_expired');
    return null;
  end if;

  actor_organization_id := public.negotiation_actor_organization(p_negotiation_id);
  select * into offer_row
  from public.negotiation_offers where id = negotiation_row.current_offer_id for update;
  if actor_organization_id is null
     or offer_row.created_by_organization_id = actor_organization_id then
    raise exception 'Only the receiving party can accept the current offer';
  end if;

  if negotiation_row.inventory_item_id is not null then
    select quantity - reserved_quantity into available_quantity
    from public.inventory_items
    where id = negotiation_row.inventory_item_id
      and organization_id = negotiation_row.cooperative_organization_id
      and deleted_at is null
    for update;
    if available_quantity is null or available_quantity < offer_row.quantity then
      raise exception 'Insufficient available inventory for the accepted offer';
    end if;
  elsif negotiation_row.listing_id is not null then
    select total_weight_kg - reserved_weight_kg into available_quantity
    from public.marketplace_listings
    where id = negotiation_row.listing_id
      and listing_status = 'ACTIVE'
    for update;
    if available_quantity is null or available_quantity < offer_row.quantity then
      raise exception 'Insufficient available listing quantity for the accepted offer';
    end if;
  end if;

  update public.negotiation_offers set status = 'accepted' where id = offer_row.id;
  update public.negotiations
  set status = 'accepted', accepted_offer_id = offer_row.id,
      last_activity_at = now(), version = version + 1
  where id = p_negotiation_id;

  insert into public.orders (
    buyer_id, listing_id, status, buyer_organization_id,
    cooperative_organization_id, negotiation_id, accepted_offer_id,
    commodity_id, commodity_name, quantity, unit, unit_price,
    quality_grade, quality_notes, delivery_date, delivery_location,
    payment_terms, commercial_notes, total_amount, order_source, reservation_rule
  ) values (
    null, negotiation_row.listing_id, 'DRAFT_NEGOTIATED',
    negotiation_row.buyer_organization_id, negotiation_row.cooperative_organization_id,
    p_negotiation_id, offer_row.id, negotiation_row.commodity_id,
    negotiation_row.commodity_name, offer_row.quantity, offer_row.unit,
    offer_row.unit_price, offer_row.quality_grade, offer_row.quality_notes,
    offer_row.delivery_date, offer_row.delivery_location, offer_row.payment_terms,
    offer_row.notes, round(offer_row.quantity * offer_row.unit_price, 2),
    'NEGOTIATED', negotiation_row.reservation_rule
  )
  returning id into created_order_id;

  if negotiation_row.reservation_rule = 'on_accept' then
    if negotiation_row.inventory_item_id is not null then
      update public.inventory_items
      set reserved_quantity = reserved_quantity + offer_row.quantity
      where id = negotiation_row.inventory_item_id;
    elsif negotiation_row.listing_id is not null then
      update public.marketplace_listings
      set reserved_weight_kg = reserved_weight_kg + offer_row.quantity
      where id = negotiation_row.listing_id;
    end if;
    update public.orders
    set stock_reserved_quantity = offer_row.quantity, stock_reserved_at = now()
    where id = created_order_id;
  end if;

  update public.negotiations
  set status = 'converted_to_order', resulting_order_id = created_order_id
  where id = p_negotiation_id;

  insert into public.negotiation_events (
    negotiation_id, actor_user_id, actor_organization_id,
    event_type, offer_id, order_id, payload
  ) values (
    p_negotiation_id, (select auth.uid()), actor_organization_id,
    'offer_accepted_order_drafted', offer_row.id, created_order_id,
    jsonb_build_object('reservation_rule', negotiation_row.reservation_rule)
  );
  perform public.notify_negotiation_party(
    p_negotiation_id, actor_organization_id, 'NEGOTIATION_ACCEPTED',
    'Offer accepted', 'A draft negotiated order was created for ' || negotiation_row.commodity_name
  );
  return created_order_id;
end;
$$;

create or replace function public.respond_to_negotiation(
  p_negotiation_id uuid,
  p_action text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  negotiation_row public.negotiations%rowtype;
  offer_row public.negotiation_offers%rowtype;
  actor_organization_id uuid;
begin
  select * into negotiation_row
  from public.negotiations where id = p_negotiation_id for update;
  if negotiation_row.id is null or not public.can_access_negotiation(p_negotiation_id) then
    raise exception 'Negotiation not found or access denied';
  end if;
  actor_organization_id := public.negotiation_actor_organization(p_negotiation_id);
  select * into offer_row from public.negotiation_offers
    where id = negotiation_row.current_offer_id for update;

  if p_action = 'reject' then
    if offer_row.created_by_organization_id = actor_organization_id then
      raise exception 'Only the receiving party can reject the current offer';
    end if;
    update public.negotiation_offers set status = 'rejected' where id = offer_row.id;
    update public.negotiations
      set status = 'rejected', last_activity_at = now(), version = version + 1
      where id = p_negotiation_id;
  elsif p_action = 'withdraw' then
    if negotiation_row.initiated_by_user_id <> (select auth.uid()) then
      raise exception 'Only the initiating user can withdraw this negotiation';
    end if;
    update public.negotiation_offers set status = 'withdrawn'
      where id = offer_row.id and status = 'pending';
    update public.negotiations
      set status = 'withdrawn', last_activity_at = now(), version = version + 1
      where id = p_negotiation_id;
  else
    raise exception 'Unsupported negotiation response';
  end if;

  insert into public.negotiation_events (
    negotiation_id, actor_user_id, actor_organization_id, event_type, offer_id
  ) values (
    p_negotiation_id, (select auth.uid()), actor_organization_id,
    case when p_action = 'reject' then 'offer_rejected' else 'negotiation_withdrawn' end,
    offer_row.id
  );
  perform public.notify_negotiation_party(
    p_negotiation_id, actor_organization_id,
    case when p_action = 'reject' then 'NEGOTIATION_REJECTED' else 'NEGOTIATION_WITHDRAWN' end,
    case when p_action = 'reject' then 'Offer rejected' else 'Negotiation withdrawn' end,
    negotiation_row.commodity_name || ' negotiation was ' ||
      case when p_action = 'reject' then 'rejected' else 'withdrawn' end
  );
  return true;
end;
$$;

create or replace function public.add_negotiation_message(
  p_negotiation_id uuid,
  p_message text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_organization_id uuid;
  created_message_id uuid;
begin
  if not public.can_access_negotiation(p_negotiation_id)
     or length(trim(p_message)) not between 1 and 4000 then
    raise exception 'Invalid message or access denied';
  end if;
  actor_organization_id := public.negotiation_actor_organization(p_negotiation_id);
  if actor_organization_id is null then
    raise exception 'Active organization membership required';
  end if;
  insert into public.negotiation_messages (
    negotiation_id, sender_user_id, sender_organization_id, message
  ) values (
    p_negotiation_id, (select auth.uid()), actor_organization_id, trim(p_message)
  )
  returning id into created_message_id;
  update public.negotiations
    set last_activity_at = now(), version = version + 1
    where id = p_negotiation_id;
  insert into public.negotiation_events (
    negotiation_id, actor_user_id, actor_organization_id, event_type,
    payload
  ) values (
    p_negotiation_id, (select auth.uid()), actor_organization_id,
    'message_sent', jsonb_build_object('message_id', created_message_id)
  );
  perform public.notify_negotiation_party(
    p_negotiation_id, actor_organization_id, 'NEGOTIATION_MESSAGE',
    'New negotiation message', left(trim(p_message), 160)
  );
  return created_message_id;
end;
$$;

create or replace function public.confirm_negotiated_order(p_order_id text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  order_row public.orders%rowtype;
  negotiation_row public.negotiations%rowtype;
  available_quantity numeric;
begin
  select * into order_row from public.orders where id = p_order_id for update;
  if order_row.id is null or order_row.order_source <> 'NEGOTIATED'
     or order_row.status <> 'DRAFT_NEGOTIATED' then
    raise exception 'Draft negotiated order not found';
  end if;
  if not public.is_org_member(order_row.buyer_organization_id)
     and not public.is_org_member(order_row.cooperative_organization_id)
     and not public.has_role('admin') then
    raise exception 'Order access denied';
  end if;
  select * into negotiation_row
    from public.negotiations where id = order_row.negotiation_id for update;

  if negotiation_row.inventory_item_id is not null then
    select quantity - reserved_quantity into available_quantity
    from public.inventory_items where id = negotiation_row.inventory_item_id for update;
  elsif negotiation_row.listing_id is not null then
    select total_weight_kg - reserved_weight_kg into available_quantity
    from public.marketplace_listings where id = negotiation_row.listing_id for update;
  else
    available_quantity := order_row.quantity;
  end if;

  if order_row.reservation_rule <> 'on_accept'
     and (available_quantity is null or available_quantity < order_row.quantity) then
    raise exception 'Inventory changed and no longer covers the negotiated quantity';
  end if;

  if order_row.reservation_rule = 'on_confirmation' then
    if negotiation_row.inventory_item_id is not null then
      update public.inventory_items
        set reserved_quantity = reserved_quantity + order_row.quantity
        where id = negotiation_row.inventory_item_id;
    elsif negotiation_row.listing_id is not null then
      update public.marketplace_listings
        set reserved_weight_kg = reserved_weight_kg + order_row.quantity
        where id = negotiation_row.listing_id;
    end if;
    update public.orders
      set stock_reserved_quantity = quantity, stock_reserved_at = now()
      where id = p_order_id;
  end if;

  update public.orders set status = 'CONFIRMED' where id = p_order_id;
  insert into public.negotiation_events (
    negotiation_id, actor_user_id, actor_organization_id,
    event_type, offer_id, order_id, payload
  ) values (
    order_row.negotiation_id, (select auth.uid()),
    public.negotiation_actor_organization(order_row.negotiation_id),
    'negotiated_order_confirmed', order_row.accepted_offer_id, p_order_id,
    jsonb_build_object('reserved_quantity', order_row.quantity)
  );
  return true;
end;
$$;

alter table public.negotiations enable row level security;
alter table public.negotiation_participants enable row level security;
alter table public.negotiation_offers enable row level security;
alter table public.negotiation_messages enable row level security;
alter table public.negotiation_events enable row level security;
alter table public.notifications enable row level security;

create policy negotiations_participant_select on public.negotiations
  for select to authenticated using (public.can_access_negotiation(id));
create policy negotiation_participants_thread_select on public.negotiation_participants
  for select to authenticated using (public.can_access_negotiation(negotiation_id));
create policy negotiation_offers_thread_select on public.negotiation_offers
  for select to authenticated using (public.can_access_negotiation(negotiation_id));
create policy negotiation_messages_thread_select on public.negotiation_messages
  for select to authenticated using (public.can_access_negotiation(negotiation_id));
create policy negotiation_events_thread_select on public.negotiation_events
  for select to authenticated using (public.can_access_negotiation(negotiation_id));
create policy notifications_self_select on public.notifications
  for select to authenticated using (user_id = (select auth.uid()));
create policy notifications_self_update on public.notifications
  for update to authenticated using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy verified_cooperatives_authenticated_select on public.organizations
  for select to authenticated
  using (type = 'cooperative' and verification_status = 'VERIFIED');

create policy marketplace_listing_coop_insert on public.marketplace_listings
  for insert to authenticated
  with check (
    cooperative_organization_id is not null
    and public.is_org_member(cooperative_organization_id)
  );
create policy marketplace_listing_coop_update on public.marketplace_listings
  for update to authenticated
  using (
    cooperative_organization_id is not null
    and public.is_org_member(cooperative_organization_id)
  )
  with check (
    cooperative_organization_id is not null
    and public.is_org_member(cooperative_organization_id)
  );

create policy negotiated_orders_participant_select on public.orders
  for select to authenticated
  using (
    (buyer_organization_id is not null and public.is_org_member(buyer_organization_id))
    or (
      cooperative_organization_id is not null
      and public.is_org_member(cooperative_organization_id)
    )
    or public.has_role('admin')
  );

grant execute on function public.create_negotiation(
  uuid, uuid, text, text, text, text, uuid, numeric, text, numeric,
  date, text, text, text, text, text, timestamptz, text
) to authenticated;
grant execute on function public.counter_negotiation(
  uuid, numeric, text, numeric, date, text, text, text, text, text, timestamptz
) to authenticated;
grant execute on function public.accept_negotiation(uuid) to authenticated;
grant execute on function public.respond_to_negotiation(uuid, text) to authenticated;
grant execute on function public.add_negotiation_message(uuid, text) to authenticated;
grant execute on function public.confirm_negotiated_order(text) to authenticated;

