-- Keep the current offer state consistent when an action discovers an expired thread.

create or replace function public.expire_current_negotiation_offer()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status = 'expired' and old.status <> 'expired' and new.current_offer_id is not null then
    update public.negotiation_offers
    set status = 'expired'
    where id = new.current_offer_id and status = 'pending';
  end if;
  return new;
end;
$$;

drop trigger if exists expire_current_negotiation_offer on public.negotiations;
create trigger expire_current_negotiation_offer
  after update of status on public.negotiations
  for each row execute function public.expire_current_negotiation_offer();
