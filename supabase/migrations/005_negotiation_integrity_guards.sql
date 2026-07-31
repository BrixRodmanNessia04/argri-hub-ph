-- Integrity guards for negotiation references and status transitions.
-- Kept separate because 004 was already applied to the linked project.

create or replace function public.validate_negotiation_integrity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  buyer_type text;
  cooperative_type text;
  cooperative_verification text;
  listing_cooperative_id uuid;
  inventory_cooperative_id uuid;
  referenced_negotiation_id uuid;
begin
  select type into buyer_type
  from public.organizations where id = new.buyer_organization_id;
  select type, verification_status
    into cooperative_type, cooperative_verification
  from public.organizations where id = new.cooperative_organization_id;

  if buyer_type <> 'buyer' then
    raise exception 'Buyer organization must have buyer type';
  end if;
  if cooperative_type <> 'cooperative' or cooperative_verification <> 'VERIFIED' then
    raise exception 'Cooperative organization must be verified';
  end if;

  if new.listing_id is not null then
    select cooperative_organization_id into listing_cooperative_id
    from public.marketplace_listings where id = new.listing_id;
    if listing_cooperative_id is null
       or listing_cooperative_id <> new.cooperative_organization_id then
      raise exception 'Listing does not belong to the selected cooperative';
    end if;
  end if;

  if new.inventory_item_id is not null then
    select organization_id into inventory_cooperative_id
    from public.inventory_items where id = new.inventory_item_id and deleted_at is null;
    if inventory_cooperative_id is null
       or inventory_cooperative_id <> new.cooperative_organization_id then
      raise exception 'Inventory item does not belong to the selected cooperative';
    end if;
  end if;

  if new.current_offer_id is not null then
    select negotiation_id into referenced_negotiation_id
    from public.negotiation_offers where id = new.current_offer_id;
    if referenced_negotiation_id is null or referenced_negotiation_id <> new.id then
      raise exception 'Current offer must belong to its negotiation';
    end if;
  end if;

  if new.accepted_offer_id is not null then
    select negotiation_id into referenced_negotiation_id
    from public.negotiation_offers where id = new.accepted_offer_id;
    if referenced_negotiation_id is null or referenced_negotiation_id <> new.id then
      raise exception 'Accepted offer must belong to its negotiation';
    end if;
  end if;

  if tg_op = 'UPDATE'
     and old.status in ('rejected', 'withdrawn', 'expired', 'converted_to_order', 'cancelled')
     and new.status <> old.status then
    raise exception 'A terminal negotiation cannot change status';
  end if;
  if tg_op = 'UPDATE'
     and old.status = 'accepted'
     and new.status not in ('accepted', 'converted_to_order') then
    raise exception 'An accepted negotiation can only convert to an order';
  end if;

  return new;
end;
$$;

drop trigger if exists validate_negotiation_integrity on public.negotiations;
create trigger validate_negotiation_integrity
  before insert or update on public.negotiations
  for each row execute function public.validate_negotiation_integrity();
