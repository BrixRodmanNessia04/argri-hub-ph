"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Clock3,
  Handshake,
  History,
  MessageSquare,
  PackageCheck,
  Plus,
  RefreshCw,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { useApplicationContext } from "@/lib/ApplicationContext";
import { useAppRoute } from "@/lib/navigation";
import { seedDemoDatabase } from "@/lib/demoDb";
import {
  acceptDemoNegotiation,
  addDemoNegotiationMessage,
  confirmDemoNegotiatedOrder,
  counterDemoNegotiation,
  createDemoNegotiation,
  getDemoNegotiationWorkspace,
  respondToDemoNegotiation,
  type NegotiationActorRole,
  type OfferInput,
} from "@/lib/negotiations/demoRepository";

type AnyRecord = Record<string, any>;
const tomorrowDate = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
const defaultExpirationDate = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);

interface WorkspaceProps {
  actorRole: NegotiationActorRole;
  threadId?: string;
}

const activeStatuses = new Set(["submitted", "under_review", "countered"]);
const statusStyles: Record<string, string> = {
  submitted: "bg-blue-50 text-blue-700 border-blue-200",
  under_review: "bg-amber-50 text-amber-700 border-amber-200",
  countered: "bg-violet-50 text-violet-700 border-violet-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  converted_to_order: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  withdrawn: "bg-slate-100 text-slate-600 border-slate-200",
  expired: "bg-slate-100 text-slate-600 border-slate-200",
};

function value(record: AnyRecord | undefined | null, snake: string, camel: string) {
  return record?.[snake] ?? record?.[camel];
}

function recordId(record: AnyRecord) {
  return record.id ?? record.localId;
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(date?: string) {
  if (!date) return "Not set";
  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: date.includes("T") ? "short" : undefined,
  }).format(new Date(date));
}

function peso(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

function offerInput(form: HTMLFormElement): OfferInput {
  const data = new FormData(form);
  return {
    quantity: Number(data.get("quantity")),
    unit: String(data.get("unit") || "kg"),
    unitPrice: Number(data.get("unitPrice")),
    deliveryDate: String(data.get("deliveryDate")),
    deliveryLocation: String(data.get("deliveryLocation")),
    paymentTerms: String(data.get("paymentTerms")),
    qualityGrade: String(data.get("qualityGrade")),
    qualityNotes: String(data.get("qualityNotes") || ""),
    notes: String(data.get("notes") || ""),
  };
}

async function apiGet(path: string) {
  const response = await fetch(path, { cache: "no-store" });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Unable to load negotiations.");
  return payload;
}

async function apiAction(body: AnyRecord) {
  const response = await fetch("/api/negotiations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Negotiation action failed.");
  return payload.data;
}

function OfferFields({ offer }: { offer?: AnyRecord }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label className="text-xs font-bold text-[#385747]">
        Quantity
        <input name="quantity" type="number" min="1" step="0.01" required defaultValue={value(offer, "quantity", "quantity") ?? 100} className="field" />
      </label>
      <label className="text-xs font-bold text-[#385747]">
        Unit
        <select name="unit" defaultValue={value(offer, "unit", "unit") ?? "kg"} className="field">
          <option value="kg">kg</option>
          <option value="metric ton">metric ton</option>
          <option value="crate">crate</option>
        </select>
      </label>
      <label className="text-xs font-bold text-[#385747]">
        Unit price (PHP)
        <input name="unitPrice" type="number" min="0.01" step="0.01" required defaultValue={value(offer, "unit_price", "unitPrice") ?? 40} className="field" />
      </label>
      <label className="text-xs font-bold text-[#385747]">
        Delivery date
        <input name="deliveryDate" type="date" required defaultValue={value(offer, "delivery_date", "deliveryDate") ?? tomorrowDate} className="field" />
      </label>
      <label className="text-xs font-bold text-[#385747] sm:col-span-2">
        Delivery location
        <input name="deliveryLocation" required defaultValue={value(offer, "delivery_location", "deliveryLocation") ?? "Metro Manila receiving hub"} className="field" />
      </label>
      <label className="text-xs font-bold text-[#385747] sm:col-span-2">
        Payment terms
        <input name="paymentTerms" required defaultValue={value(offer, "payment_terms", "paymentTerms") ?? "Net 15 days after accepted delivery"} className="field" />
      </label>
      <label className="text-xs font-bold text-[#385747]">
        Quality grade
        <input name="qualityGrade" required defaultValue={value(offer, "quality_grade", "qualityGrade") ?? "Class A"} className="field" />
      </label>
      <label className="text-xs font-bold text-[#385747]">
        Quality requirements
        <input name="qualityNotes" defaultValue={value(offer, "quality_notes", "qualityNotes") ?? ""} placeholder="Size, temperature, packaging…" className="field" />
      </label>
      <label className="text-xs font-bold text-[#385747] sm:col-span-2">
        Commercial notes
        <textarea name="notes" rows={3} defaultValue="" placeholder="Add context for the other party" className="field resize-none" />
      </label>
    </div>
  );
}

export default function NegotiationWorkspace({ actorRole, threadId }: WorkspaceProps) {
  const { mode, organizationId } = useApplicationContext();
  const route = useAppRoute();
  const search = useSearchParams();
  const [data, setData] = useState<AnyRecord>({});
  const [context, setContext] = useState<AnyRecord>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showCounter, setShowCounter] = useState(false);
  const [showCreate, setShowCreate] = useState(Boolean(search.get("listingId")));

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      if (mode === "demo") {
        await seedDemoDatabase();
        setData(await getDemoNegotiationWorkspace(threadId));
        if (!threadId) {
          const listings = await (await import("@/lib/demoDb")).demoDb.demoListings.toArray();
          setContext({ listings });
        }
      } else {
        setData(await apiGet(threadId ? `/api/negotiations?id=${threadId}` : "/api/negotiations"));
        if (!threadId && actorRole === "buyer") {
          setContext(await apiGet("/api/negotiations?context=1"));
        }
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load negotiation data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Data is loaded from either the authenticated API or the isolated Dexie store.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, threadId]);

  const negotiation = data.negotiation as AnyRecord | undefined;
  const offers = (data.offers ?? []) as AnyRecord[];
  const messages = (data.messages ?? []) as AnyRecord[];
  const events = (data.events ?? []) as AnyRecord[];
  const order = data.order as AnyRecord | undefined;
  const currentOfferId = value(negotiation, "current_offer_id", "currentOfferId");
  const currentOffer = offers.find((offer) => recordId(offer) === currentOfferId);
  const actorOrganizationId =
    mode === "demo"
      ? actorRole === "buyer"
        ? "demo-org-buyer"
        : "demo-org-coop"
      : actorRole === "buyer"
        ? value(negotiation, "buyer_organization_id", "buyerOrganizationId") ?? organizationId
        : value(negotiation, "cooperative_organization_id", "cooperativeOrganizationId") ?? organizationId;
  const createdByCurrentActor = currentOffer
    ? mode === "demo"
      ? currentOffer.createdByRole === actorRole
      : currentOffer.created_by_organization_id === actorOrganizationId
    : false;
  const status = value(negotiation, "status", "status") ?? "";
  const canRespond = activeStatuses.has(status) && !createdByCurrentActor;

  const run = async (action: () => Promise<unknown>, success: string) => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
      setNotice(success);
      setShowCounter(false);
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Negotiation action failed.");
    } finally {
      setBusy(false);
    }
  };

  const createNegotiation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = offerInput(form);
    const raw = new FormData(form);
    const listingId = String(raw.get("listingId") || "");
    const selectedDemoListing = context.listings?.find((item: AnyRecord) => item.localId === listingId);
    const expiresAt = new Date(String(raw.get("expiresAt")) + "T23:59:59").toISOString();
    await run(async () => {
      let createdId: string;
      if (mode === "demo") {
        createdId = await createDemoNegotiation({
          ...input,
          buyerOrganizationId: "demo-org-buyer",
          cooperativeOrganizationId: "demo-org-coop",
          cooperativeOrganizationName:
            selectedDemoListing?.coopName ?? "Benguet Agriculture Cooperative",
          listingId: listingId || undefined,
          commodityId: String(raw.get("commodityId")),
          commodityName: String(raw.get("commodityName")),
          productSector: String(raw.get("productSector")) as "agriculture" | "fisheries",
          expiresAt,
          reservationRule: String(raw.get("reservationRule")) as "on_accept" | "on_confirmation" | "none",
        });
      } else {
        createdId = await apiAction({
          action: "create",
          ...input,
          buyerOrganizationId: String(raw.get("buyerOrganizationId")),
          cooperativeOrganizationId: String(raw.get("cooperativeOrganizationId")),
          listingId,
          commodityId: String(raw.get("commodityId")),
          commodityName: String(raw.get("commodityName")),
          productSector: String(raw.get("productSector")),
          expiresAt,
          reservationRule: String(raw.get("reservationRule")),
        });
      }
      window.location.assign(route(`/buyer/negotiations/${createdId}`));
    }, "Negotiation submitted.");
  };

  const submitCounter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = offerInput(event.currentTarget);
    await run(
      () =>
        mode === "demo"
          ? counterDemoNegotiation(recordId(negotiation!), actorRole, input)
          : apiAction({ action: "counter", negotiationId: recordId(negotiation!), ...input }),
      "Counteroffer sent and recorded in the audit history.",
    );
  };

  const respond = (action: "accept" | "reject" | "withdraw") =>
    run(async () => {
      if (mode === "demo") {
        if (action === "accept") await acceptDemoNegotiation(recordId(negotiation!), actorRole);
        else await respondToDemoNegotiation(recordId(negotiation!), actorRole, action);
      } else {
        await apiAction({ action, negotiationId: recordId(negotiation!) });
      }
    }, action === "accept" ? "Offer accepted. A draft negotiated order was created." : `Negotiation ${action}ed.`);

  if (loading) {
    return <div className="p-10 text-sm text-[#5f7469] flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Loading negotiations…</div>;
  }

  return (
    <div className="space-y-6">
      <style jsx global>{`
        .field { margin-top: .4rem; width: 100%; border-radius: .75rem; border: 1px solid #cfe0d4; background: white; padding: .7rem .8rem; color: #163025; outline: none; }
        .field:focus { border-color: #059669; box-shadow: 0 0 0 3px rgba(5,150,105,.1); }
      `}</style>
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-[#059669]">
            <Handshake className="w-4 h-4" /> Commercial negotiations
          </div>
          <h1 className="text-2xl font-extrabold text-[#163025] mt-1">
            {threadId ? value(negotiation, "commodity_name", "commodityName") : actorRole === "buyer" ? "Buyer negotiation threads" : "Cooperative negotiation inbox"}
          </h1>
          <p className="text-sm text-[#5f7469] mt-1">
            Price, quantity, delivery, payment, and quality terms remain attached to one auditable thread.
          </p>
        </div>
        {!threadId && actorRole === "buyer" && (
          <button onClick={() => setShowCreate((open) => !open)} className="rounded-xl bg-[#059669] text-white px-4 py-2.5 text-xs font-extrabold flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> New negotiation
          </button>
        )}
      </header>

      {mode === "demo" && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-800">
          Demo Mode is isolated: these actions are stored only in this browser’s Dexie database and never reach Supabase.
        </div>
      )}
      {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}
      {notice && <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{notice}</div>}

      {!threadId ? (
        <>
          {showCreate && actorRole === "buyer" && (
            <form onSubmit={createNegotiation} className="rounded-2xl border border-[#dce9df] bg-white p-5 sm:p-6 shadow-sm space-y-5">
              <div>
                <h2 className="font-extrabold text-[#163025]">Propose commercial terms</h2>
                <p className="text-xs text-[#5f7469] mt-1">No stock is reserved when a request is merely submitted.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mode === "production" && (
                  <>
                    <label className="text-xs font-bold text-[#385747]">
                      Buyer organization
                      <select name="buyerOrganizationId" required defaultValue={organizationId ?? ""} className="field">
                        <option value="">Select buyer organization</option>
                        {(context.memberships ?? []).map((membership: AnyRecord) => (
                          <option key={membership.organization_id} value={membership.organization_id}>
                            {membership.organizations?.name ?? membership.organization_id}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs font-bold text-[#385747]">
                      Cooperative
                      <select name="cooperativeOrganizationId" required className="field">
                        <option value="">Select cooperative</option>
                        {(context.cooperatives ?? []).map((coop: AnyRecord) => <option key={coop.id} value={coop.id}>{coop.name}</option>)}
                      </select>
                    </label>
                  </>
                )}
                {mode === "demo" && (
                  <label className="text-xs font-bold text-[#385747] sm:col-span-2">
                    Marketplace listing
                    <select name="listingId" defaultValue={search.get("listingId") ?? "list-1"} className="field">
                      {(context.listings ?? []).map((listing: AnyRecord) => <option key={listing.localId} value={listing.localId}>{listing.title} — {listing.coopName}</option>)}
                    </select>
                  </label>
                )}
                {mode === "production" && <input type="hidden" name="listingId" value={search.get("listingId") ?? ""} />}
                <label className="text-xs font-bold text-[#385747]">
                  Commodity code
                  <input name="commodityId" required defaultValue={search.get("commodityId") ?? "COMMERCIAL-PRODUCT"} className="field" />
                </label>
                <label className="text-xs font-bold text-[#385747]">
                  Product
                  <input name="commodityName" required defaultValue={search.get("commodityName") ?? ""} className="field" />
                </label>
                <label className="text-xs font-bold text-[#385747]">
                  Sector
                  <select name="productSector" defaultValue={search.get("sector") ?? "agriculture"} className="field">
                    <option value="agriculture">Agriculture</option>
                    <option value="fisheries">Fisheries</option>
                  </select>
                </label>
                <label className="text-xs font-bold text-[#385747]">
                  Negotiation expires
                  <input name="expiresAt" type="date" required defaultValue={defaultExpirationDate} className="field" />
                </label>
              </div>
              <OfferFields />
              <label className="text-xs font-bold text-[#385747] block">
                Stock reservation rule
                <select name="reservationRule" defaultValue="on_confirmation" className="field">
                  <option value="on_confirmation">Reserve at final order confirmation</option>
                  <option value="on_accept">Reserve when offer is accepted</option>
                  <option value="none">Do not reserve automatically</option>
                </select>
              </label>
              <button disabled={busy} className="rounded-xl bg-[#059669] text-white px-5 py-3 text-sm font-extrabold disabled:opacity-50">
                Submit negotiation request
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 gap-3">
            {(data.negotiations ?? []).map((item: AnyRecord) => {
              const id = recordId(item);
              return (
                <Link key={id} href={route(`/${actorRole === "buyer" ? "buyer" : "coop"}/negotiations/${id}`)} className="rounded-2xl border border-[#dce9df] bg-white p-5 shadow-sm hover:border-[#059669] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-extrabold text-[#163025]">{value(item, "commodity_name", "commodityName")}</h2>
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${statusStyles[item.status] ?? statusStyles.withdrawn}`}>{formatStatus(item.status)}</span>
                        <span className="rounded-full bg-[#ecfdf5] px-2 py-0.5 text-[10px] font-bold text-[#047857]">{value(item, "product_sector", "productSector")}</span>
                      </div>
                      <p className="text-xs text-[#5f7469] mt-1">
                        {actorRole === "buyer"
                          ? value(item, "cooperative", "cooperativeOrganizationName")?.name ?? value(item, "cooperative_organization_name", "cooperativeOrganizationName")
                          : value(item, "buyer", "buyerOrganizationName")?.name ?? value(item, "buyer_organization_name", "buyerOrganizationName")}
                      </p>
                    </div>
                    <div className="text-xs text-[#5f7469] flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" /> {formatDate(value(item, "last_activity_at", "lastActivityAt"))}</div>
                  </div>
                </Link>
              );
            })}
            {(data.negotiations ?? []).length === 0 && <div className="rounded-2xl border border-dashed border-[#cfe0d4] p-10 text-center text-sm text-[#5f7469]">No negotiation threads yet.</div>}
          </div>
        </>
      ) : negotiation ? (
        <>
          <Link href={route(`/${actorRole === "buyer" ? "buyer" : "coop"}/negotiations`)} className="inline-flex items-center gap-1 text-xs font-bold text-[#047857]"><ArrowLeft className="w-4 h-4" /> All negotiations</Link>
          <section className="rounded-2xl border border-[#dce9df] bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full border px-3 py-1 text-xs font-extrabold ${statusStyles[status] ?? statusStyles.withdrawn}`}>{formatStatus(status)}</span>
                <span className="rounded-full bg-[#ecfdf5] px-3 py-1 text-xs font-bold text-[#047857]">{value(negotiation, "product_sector", "productSector")}</span>
              </div>
              <span className="text-xs text-[#5f7469]">Expires {formatDate(value(negotiation, "expires_at", "expiresAt"))}</span>
            </div>
            {currentOffer && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div><p className="text-[11px] text-[#5f7469]">Current offer</p><p className="font-extrabold">#{value(currentOffer, "offer_number", "offerNumber")}</p></div>
                <div><p className="text-[11px] text-[#5f7469]">Quantity</p><p className="font-extrabold">{currentOffer.quantity} {currentOffer.unit}</p></div>
                <div><p className="text-[11px] text-[#5f7469]">Unit price</p><p className="font-extrabold text-[#059669]">{peso(Number(value(currentOffer, "unit_price", "unitPrice")))}</p></div>
                <div><p className="text-[11px] text-[#5f7469]">Offer total</p><p className="font-extrabold">{peso(Number(currentOffer.quantity) * Number(value(currentOffer, "unit_price", "unitPrice")))}</p></div>
              </div>
            )}
            {activeStatuses.has(status) && (
              <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#e3eee6]">
                {canRespond && <>
                  <button disabled={busy} onClick={() => void respond("accept")} className="action-primary"><Check className="w-4 h-4" /> Accept offer</button>
                  <button disabled={busy} onClick={() => setShowCounter((open) => !open)} className="action-secondary"><RefreshCw className="w-4 h-4" /> Counteroffer</button>
                  <button disabled={busy} onClick={() => void respond("reject")} className="action-danger"><X className="w-4 h-4" /> Reject</button>
                </>}
                {actorRole === "buyer" && <button disabled={busy} onClick={() => void respond("withdraw")} className="action-secondary">Withdraw negotiation</button>}
                {createdByCurrentActor && <p className="text-xs font-semibold text-amber-700 self-center">Waiting for the other party to respond to the current offer.</p>}
              </div>
            )}
          </section>

          {showCounter && currentOffer && (
            <form onSubmit={submitCounter} className="rounded-2xl border-2 border-[#a7f3d0] bg-[#f7fff9] p-5 sm:p-6 space-y-5">
              <h2 className="font-extrabold">Send counteroffer</h2>
              <OfferFields offer={currentOffer} />
              <button disabled={busy} className="action-primary">Send counteroffer</button>
            </form>
          )}

          {order && (
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-800"><PackageCheck className="w-5 h-5" /> Draft negotiated order</div>
                  <p className="text-xs text-emerald-700 mt-1">Order {recordId(order)} · {value(order, "status", "status")} · {peso(Number(value(order, "total_amount", "totalPrice")))}</p>
                </div>
                {value(order, "status", "status") === "DRAFT_NEGOTIATED" && (
                  <button disabled={busy} onClick={() => void run(
                    () => mode === "demo" ? confirmDemoNegotiatedOrder(recordId(order)) : apiAction({ action: "confirm_order", orderId: recordId(order) }),
                    "Inventory was revalidated and the negotiated order is confirmed.",
                  )} className="action-primary"><ShieldCheck className="w-4 h-4" /> Confirm order &amp; revalidate stock</button>
                )}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <section className="rounded-2xl border border-[#dce9df] bg-white p-5 shadow-sm">
              <h2 className="font-extrabold flex items-center gap-2"><History className="w-4 h-4 text-[#059669]" /> Complete offer history</h2>
              <div className="space-y-3 mt-4">
                {offers.map((offer) => (
                  <article key={recordId(offer)} className="rounded-xl border border-[#e3eee6] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold">Offer #{value(offer, "offer_number", "offerNumber")} · {mode === "demo" ? offer.createdByRole : offer.created_by_organization_id === value(negotiation, "buyer_organization_id", "buyerOrganizationId") ? "buyer" : "cooperative"}</span>
                      <span className="text-[10px] font-bold uppercase text-[#5f7469]">{offer.status}</span>
                    </div>
                    <p className="text-sm font-bold mt-2">{offer.quantity} {offer.unit} at {peso(Number(value(offer, "unit_price", "unitPrice")))}</p>
                    <dl className="text-xs text-[#5f7469] mt-2 space-y-1">
                      <div>Delivery: {formatDate(value(offer, "delivery_date", "deliveryDate"))} · {value(offer, "delivery_location", "deliveryLocation")}</div>
                      <div>Payment: {value(offer, "payment_terms", "paymentTerms")}</div>
                      <div>Quality: {value(offer, "quality_grade", "qualityGrade")} {value(offer, "quality_notes", "qualityNotes") ? `— ${value(offer, "quality_notes", "qualityNotes")}` : ""}</div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>

            <div className="space-y-5">
              <section className="rounded-2xl border border-[#dce9df] bg-white p-5 shadow-sm">
                <h2 className="font-extrabold flex items-center gap-2"><MessageSquare className="w-4 h-4 text-[#059669]" /> Discussion</h2>
                <div className="space-y-2 mt-4 max-h-64 overflow-y-auto">
                  {messages.map((message) => (
                    <div key={recordId(message)} className="rounded-xl bg-[#f6fbf7] p-3 text-xs">
                      <p className="font-bold text-[#047857]">{mode === "demo" ? message.senderRole : message.sender_organization?.name ?? "Participant"}</p>
                      <p className="mt-1 text-[#385747]">{message.message}</p>
                      <p className="text-[10px] text-[#7b9185] mt-1">{formatDate(value(message, "created_at", "createdAt"))}</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={(event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  const message = String(new FormData(form).get("message") || "");
                  void run(async () => {
                    if (mode === "demo") await addDemoNegotiationMessage(recordId(negotiation), actorRole, message);
                    else await apiAction({ action: "message", negotiationId: recordId(negotiation), message });
                    form.reset();
                  }, "Message added to the negotiation.");
                }} className="flex gap-2 mt-4">
                  <input name="message" required placeholder="Discuss delivery, payment, or quality…" className="field !mt-0" />
                  <button disabled={busy} aria-label="Send message" className="rounded-xl bg-[#059669] p-3 text-white"><Send className="w-4 h-4" /></button>
                </form>
              </section>
              <section className="rounded-2xl border border-[#dce9df] bg-white p-5 shadow-sm">
                <h2 className="font-extrabold text-sm">Audit trail</h2>
                <div className="mt-3 space-y-2">
                  {events.map((event) => <div key={recordId(event)} className="text-xs text-[#5f7469] border-l-2 border-[#a7f3d0] pl-3"><span className="font-bold text-[#385747]">{formatStatus(value(event, "event_type", "eventType"))}</span><br />{formatDate(value(event, "created_at", "createdAt"))}</div>)}
                </div>
              </section>
            </div>
          </div>
        </>
      ) : null}
      <style jsx global>{`
        .action-primary,.action-secondary,.action-danger{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;border-radius:.75rem;padding:.65rem .9rem;font-size:.75rem;font-weight:800}
        .action-primary{background:#059669;color:white}.action-secondary{border:1px solid #cfe0d4;background:white;color:#385747}.action-danger{border:1px solid #fecaca;background:#fff1f2;color:#b91c1c}
        .action-primary:disabled,.action-secondary:disabled,.action-danger:disabled{opacity:.5}
      `}</style>
    </div>
  );
}
