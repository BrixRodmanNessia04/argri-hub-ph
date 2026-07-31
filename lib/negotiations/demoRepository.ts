import {
  demoDb,
  type DemoNegotiation,
  type DemoNegotiationOffer,
} from "@/lib/demoDb";

export type NegotiationActorRole = "buyer" | "coop";

export interface OfferInput {
  quantity: number;
  unit: string;
  unitPrice: number;
  deliveryDate: string;
  deliveryLocation: string;
  paymentTerms: string;
  qualityGrade: string;
  qualityNotes?: string;
  notes?: string;
}

export interface CreateDemoNegotiationInput extends OfferInput {
  buyerOrganizationId: string;
  cooperativeOrganizationId: string;
  cooperativeOrganizationName: string;
  listingId?: string;
  commodityId: string;
  commodityName: string;
  productSector: "agriculture" | "fisheries";
  expiresAt: string;
  reservationRule: "on_accept" | "on_confirmation" | "none";
}

const id = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

export async function getDemoNegotiationWorkspace(threadId?: string) {
  const negotiations = await demoDb.demoNegotiations
    .orderBy("lastActivityAt")
    .reverse()
    .toArray();
  if (!threadId) return { negotiations };

  const negotiation = await demoDb.demoNegotiations.get(threadId);
  if (!negotiation) throw new Error("Negotiation thread was not found.");
  const [offers, messages, events, order] = await Promise.all([
    demoDb.demoNegotiationOffers.where("negotiationId").equals(threadId).sortBy("offerNumber"),
    demoDb.demoNegotiationMessages.where("negotiationId").equals(threadId).sortBy("createdAt"),
    demoDb.demoNegotiationEvents.where("negotiationId").equals(threadId).sortBy("createdAt"),
    negotiation.resultingOrderId
      ? demoDb.demoOrders.get(negotiation.resultingOrderId)
      : Promise.resolve(undefined),
  ]);
  return { negotiation, offers, messages, events, order };
}

export async function createDemoNegotiation(input: CreateDemoNegotiationInput) {
  const now = new Date().toISOString();
  const negotiationId = id("demo-neg");
  const offerId = id("demo-offer");
  await demoDb.transaction(
    "rw",
    [
      demoDb.demoNegotiations,
      demoDb.demoNegotiationOffers,
      demoDb.demoNegotiationMessages,
      demoDb.demoNegotiationEvents,
    ],
    async () => {
      await demoDb.demoNegotiations.add({
        localId: negotiationId,
        buyerOrganizationId: input.buyerOrganizationId,
        buyerOrganizationName: "Metro Supermarkets Procurement",
        cooperativeOrganizationId: input.cooperativeOrganizationId,
        cooperativeOrganizationName: input.cooperativeOrganizationName,
        listingId: input.listingId,
        commodityId: input.commodityId,
        commodityName: input.commodityName,
        productSector: input.productSector,
        status: "submitted",
        currentOfferId: offerId,
        initiatedByRole: "buyer",
        reservationRule: input.reservationRule,
        expiresAt: input.expiresAt,
        lastActivityAt: now,
        version: 1,
        createdAt: now,
      });
      await demoDb.demoNegotiationOffers.add({
        localId: offerId,
        negotiationId,
        offerNumber: 1,
        createdByRole: "buyer",
        ...input,
        status: "pending",
        createdAt: now,
      });
      if (input.notes?.trim()) {
        await demoDb.demoNegotiationMessages.add({
          localId: id("demo-message"),
          negotiationId,
          senderRole: "buyer",
          message: input.notes.trim(),
          relatedOfferId: offerId,
          createdAt: now,
        });
      }
      await demoDb.demoNegotiationEvents.add({
        localId: id("demo-event"),
        negotiationId,
        actorRole: "buyer",
        eventType: "negotiation_submitted",
        offerId,
        createdAt: now,
      });
    },
  );
  return negotiationId;
}

export async function counterDemoNegotiation(
  negotiationId: string,
  actorRole: NegotiationActorRole,
  input: OfferInput,
) {
  const negotiation = await demoDb.demoNegotiations.get(negotiationId);
  if (!negotiation) throw new Error("Negotiation thread was not found.");
  const current = await demoDb.demoNegotiationOffers.get(negotiation.currentOfferId);
  if (!current || current.createdByRole === actorRole) {
    throw new Error("The receiving party must respond before another counteroffer.");
  }
  const now = new Date().toISOString();
  const offerId = id("demo-offer");
  await demoDb.transaction(
    "rw",
    [
      demoDb.demoNegotiations,
      demoDb.demoNegotiationOffers,
      demoDb.demoNegotiationMessages,
      demoDb.demoNegotiationEvents,
    ],
    async () => {
      await demoDb.demoNegotiationOffers.update(current.localId, { status: "superseded" });
      const offer: DemoNegotiationOffer = {
        localId: offerId,
        negotiationId,
        offerNumber: current.offerNumber + 1,
        createdByRole: actorRole,
        ...input,
        status: "pending",
        createdAt: now,
      };
      await demoDb.demoNegotiationOffers.add(offer);
      await demoDb.demoNegotiations.update(negotiationId, {
        currentOfferId: offerId,
        status: "countered",
        lastActivityAt: now,
        version: negotiation.version + 1,
      });
      if (input.notes?.trim()) {
        await demoDb.demoNegotiationMessages.add({
          localId: id("demo-message"),
          negotiationId,
          senderRole: actorRole,
          message: input.notes.trim(),
          relatedOfferId: offerId,
          createdAt: now,
        });
      }
      await demoDb.demoNegotiationEvents.add({
        localId: id("demo-event"),
        negotiationId,
        actorRole,
        eventType: "counteroffer_sent",
        offerId,
        createdAt: now,
      });
    },
  );
  return offerId;
}

async function validateDemoStock(negotiation: DemoNegotiation, quantity: number) {
  if (!negotiation.listingId) return;
  const listing = await demoDb.demoListings.get(negotiation.listingId);
  if (!listing || listing.availableKg - (listing.reservedKg ?? 0) < quantity) {
    throw new Error("Insufficient available listing quantity for this offer.");
  }
}

export async function acceptDemoNegotiation(
  negotiationId: string,
  actorRole: NegotiationActorRole,
) {
  const negotiation = await demoDb.demoNegotiations.get(negotiationId);
  if (!negotiation) throw new Error("Negotiation thread was not found.");
  const offer = await demoDb.demoNegotiationOffers.get(negotiation.currentOfferId);
  if (!offer || offer.createdByRole === actorRole) {
    throw new Error("Only the receiving party can accept the current offer.");
  }
  await validateDemoStock(negotiation, offer.quantity);

  const now = new Date().toISOString();
  const orderId = id("demo-order");
  await demoDb.transaction(
    "rw",
    [
      demoDb.demoNegotiations,
      demoDb.demoNegotiationOffers,
      demoDb.demoNegotiationEvents,
      demoDb.demoOrders,
      demoDb.demoListings,
    ],
    async () => {
      if (negotiation.reservationRule === "on_accept" && negotiation.listingId) {
        const listing = await demoDb.demoListings.get(negotiation.listingId);
        if (listing) {
          await demoDb.demoListings.update(listing.localId, {
            reservedKg: (listing.reservedKg ?? 0) + offer.quantity,
          });
        }
      }
      await demoDb.demoNegotiationOffers.update(offer.localId, { status: "accepted" });
      await demoDb.demoOrders.add({
        localId: orderId,
        listingTitle: negotiation.commodityName,
        coopName: negotiation.cooperativeOrganizationName,
        weightKg: offer.quantity,
        totalPrice: offer.quantity * offer.unitPrice,
        status: "DRAFT_NEGOTIATED",
        orderedAt: now.slice(0, 10),
        negotiationId,
        unitPrice: offer.unitPrice,
        deliveryDate: offer.deliveryDate,
        deliveryLocation: offer.deliveryLocation,
        paymentTerms: offer.paymentTerms,
        qualityGrade: offer.qualityGrade,
      });
      await demoDb.demoNegotiations.update(negotiationId, {
        status: "converted_to_order",
        acceptedOfferId: offer.localId,
        resultingOrderId: orderId,
        lastActivityAt: now,
        version: negotiation.version + 1,
      });
      await demoDb.demoNegotiationEvents.add({
        localId: id("demo-event"),
        negotiationId,
        actorRole,
        eventType: "offer_accepted_and_order_created",
        offerId: offer.localId,
        orderId,
        createdAt: now,
      });
    },
  );
  return orderId;
}

export async function respondToDemoNegotiation(
  negotiationId: string,
  actorRole: NegotiationActorRole,
  action: "reject" | "withdraw",
) {
  const negotiation = await demoDb.demoNegotiations.get(negotiationId);
  if (!negotiation) throw new Error("Negotiation thread was not found.");
  const now = new Date().toISOString();
  await demoDb.demoNegotiations.update(negotiationId, {
    status: action === "reject" ? "rejected" : "withdrawn",
    lastActivityAt: now,
    version: negotiation.version + 1,
  });
  await demoDb.demoNegotiationEvents.add({
    localId: id("demo-event"),
    negotiationId,
    actorRole,
    eventType: action === "reject" ? "offer_rejected" : "negotiation_withdrawn",
    offerId: negotiation.currentOfferId,
    createdAt: now,
  });
}

export async function addDemoNegotiationMessage(
  negotiationId: string,
  actorRole: NegotiationActorRole,
  message: string,
) {
  const now = new Date().toISOString();
  await demoDb.demoNegotiationMessages.add({
    localId: id("demo-message"),
    negotiationId,
    senderRole: actorRole,
    message: message.trim(),
    createdAt: now,
  });
  await demoDb.demoNegotiationEvents.add({
    localId: id("demo-event"),
    negotiationId,
    actorRole,
    eventType: "message_sent",
    createdAt: now,
  });
  await demoDb.demoNegotiations.update(negotiationId, { lastActivityAt: now });
}

export async function confirmDemoNegotiatedOrder(orderId: string) {
  const order = await demoDb.demoOrders.get(orderId);
  if (!order?.negotiationId) throw new Error("Negotiated order was not found.");
  const negotiation = await demoDb.demoNegotiations.get(order.negotiationId);
  if (!negotiation) throw new Error("Negotiation thread was not found.");
  if (negotiation.reservationRule !== "on_accept") {
    await validateDemoStock(negotiation, order.weightKg);
  }

  const now = new Date().toISOString();
  await demoDb.transaction(
    "rw",
    [demoDb.demoOrders, demoDb.demoListings, demoDb.demoNegotiationEvents],
    async () => {
      if (negotiation.reservationRule === "on_confirmation" && negotiation.listingId) {
        const listing = await demoDb.demoListings.get(negotiation.listingId);
        if (listing) {
          await demoDb.demoListings.update(listing.localId, {
            reservedKg: (listing.reservedKg ?? 0) + order.weightKg,
          });
        }
      }
      await demoDb.demoOrders.update(orderId, { status: "CONFIRMED" });
      await demoDb.demoNegotiationEvents.add({
        localId: id("demo-event"),
        negotiationId: negotiation.localId,
        eventType: "negotiated_order_confirmed",
        orderId,
        createdAt: now,
      });
    },
  );
}
