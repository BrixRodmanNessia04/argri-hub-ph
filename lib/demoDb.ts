import Dexie, { type EntityTable } from 'dexie';

export interface DemoFarm {
  localId: string;
  name: string;
  location: string;
  areaHectares: number;
  primaryCrop: string;
  status: string;
}

export interface DemoPlot {
  localId: string;
  farmId: string;
  name: string;
  areaSqMeters: number;
  crop: string;
  status: string;
}

export interface DemoCropCycle {
  localId: string;
  farmId: string;
  plotName: string;
  crop: string;
  variety: string;
  plantedAt: string;
  estimatedHarvestAt: string;
  status: 'PLANTED' | 'GROWING' | 'HARVESTING' | 'COMPLETED';
}

export interface DemoActivity {
  localId: string;
  cropCycleId: string;
  activityType: string;
  description: string;
  cost: number;
  loggedAt: string;
}

export interface DemoHarvest {
  localId: string;
  crop: string;
  variety?: string;
  weightKg: number;
  qualityGrade: string;
  harvestedAt: string;
  status: 'STORAGE' | 'SUBMITTED_TO_COOP' | 'SOLD';
}

export interface DemoSale {
  localId: string;
  crop: string;
  weightKg: number;
  pricePerKg: number;
  totalRevenue: number;
  buyerName: string;
  soldAt: string;
}

export interface DemoExpense {
  localId: string;
  category: string;
  description: string;
  amount: number;
  date: string;
}

export interface DemoInventoryItem {
  localId: string;
  name: string;
  type: 'SEED' | 'FERTILIZER' | 'PESTICIDE' | 'FUEL' | 'FISH' | 'PACKAGING' | 'OTHER';
  quantity: number;
  unit: string;
  unitCost: number;
}

export interface DemoFishingTrip {
  localId: string;
  vesselName: string;
  departurePort: string;
  fishingGround: string;
  crewCount: number;
  fuelUsedLiters: number;
  departedAt: string;
  status: 'DEPARTED' | 'RETURNED' | 'UNLOADED';
  vesselRegistrationNumber?: string;
  arrivalPort?: string;
  returnedAt?: string;
}

export interface DemoCatch {
  localId: string;
  tripId: string;
  vesselName: string;
  speciesName: string;
  weightKg: number;
  qualityGrade: string;
  preservationMethod: string;
  caughtAtDate: string;
  forSaleKg?: number;
  homeUseKg?: number;
}

export interface DemoFisheriesDocument {
  localId: string;
  title: string;
  documentType: string;
  fileName?: string;
  verificationStatus: 'PENDING' | 'VERIFIED';
}

export interface DemoCoopSubmission {
  localId: string;
  farmerName: string;
  commodity: string;
  weightKg: number;
  qualityGrade: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
}

export interface DemoListing {
  localId: string;
  title: string;
  coopName: string;
  commodityCategory: string;
  availableKg: number;
  pricePerKg: number;
  grade: string;
  originProvince: string;
  verifiedStatus: string;
  reservedKg?: number;
}

export interface DemoOrder {
  localId: string;
  listingTitle: string;
  coopName: string;
  weightKg: number;
  totalPrice: number;
  status: 'DRAFT_NEGOTIATED' | 'CONFIRMED' | 'ESCROW_PAID' | 'DISPATCHED' | 'DELIVERED';
  orderedAt: string;
  negotiationId?: string;
  unitPrice?: number;
  deliveryDate?: string;
  deliveryLocation?: string;
  paymentTerms?: string;
  qualityGrade?: string;
}

export type DemoNegotiationStatus =
  | 'submitted'
  | 'under_review'
  | 'countered'
  | 'accepted'
  | 'rejected'
  | 'withdrawn'
  | 'expired'
  | 'converted_to_order';

export interface DemoNegotiation {
  localId: string;
  buyerOrganizationId: string;
  buyerOrganizationName: string;
  cooperativeOrganizationId: string;
  cooperativeOrganizationName: string;
  listingId?: string;
  commodityId: string;
  commodityName: string;
  productSector: 'agriculture' | 'fisheries';
  status: DemoNegotiationStatus;
  currentOfferId: string;
  acceptedOfferId?: string;
  resultingOrderId?: string;
  initiatedByRole: 'buyer' | 'coop';
  reservationRule: 'on_accept' | 'on_confirmation' | 'none';
  expiresAt: string;
  lastActivityAt: string;
  version: number;
  createdAt: string;
}

export interface DemoNegotiationOffer {
  localId: string;
  negotiationId: string;
  offerNumber: number;
  createdByRole: 'buyer' | 'coop';
  quantity: number;
  unit: string;
  unitPrice: number;
  deliveryDate: string;
  deliveryLocation: string;
  paymentTerms: string;
  qualityGrade: string;
  qualityNotes?: string;
  notes?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'superseded' | 'withdrawn' | 'expired';
  createdAt: string;
}

export interface DemoNegotiationMessage {
  localId: string;
  negotiationId: string;
  senderRole: 'buyer' | 'coop';
  message: string;
  relatedOfferId?: string;
  createdAt: string;
}

export interface DemoNegotiationEvent {
  localId: string;
  negotiationId: string;
  actorRole?: 'buyer' | 'coop';
  eventType: string;
  offerId?: string;
  orderId?: string;
  createdAt: string;
}

export interface DemoRsbsaProfile {
  localId: string;
  userId: string;
  role: 'farmer' | 'fisher' | 'farmer_and_fisher';
  rsbsaNumber?: string;
  surname: string;
  firstName: string;
  middleName?: string;
  mobileNumber: string;
  region: string;
  province: string;
  cityMunicipality: string;
  barangay: string;
  livelihoodFarmer: boolean;
  livelihoodFisher: boolean;
  primaryFarmName?: string;
  mainCommodity?: string;
  farmAreaHa?: number;
  tenureType?: string;
  primaryFishingArea?: string;
  fishingType?: string;
  mainSpecies?: string;
  usesVessel?: boolean;
  vesselName?: string;
  preferredLanguage: string;
  registrationStatus: 'draft' | 'submitted' | 'verified';
  profileCompletionPercentage: number;
}

const demoDb = new Dexie('agrihub-demo') as Dexie & {
  demoFarms: EntityTable<DemoFarm, 'localId'>;
  demoPlots: EntityTable<DemoPlot, 'localId'>;
  demoCropCycles: EntityTable<DemoCropCycle, 'localId'>;
  demoActivities: EntityTable<DemoActivity, 'localId'>;
  demoHarvests: EntityTable<DemoHarvest, 'localId'>;
  demoSales: EntityTable<DemoSale, 'localId'>;
  demoExpenses: EntityTable<DemoExpense, 'localId'>;
  demoInventoryItems: EntityTable<DemoInventoryItem, 'localId'>;
  demoFishingTrips: EntityTable<DemoFishingTrip, 'localId'>;
  demoCatches: EntityTable<DemoCatch, 'localId'>;
  demoFisheriesDocuments: EntityTable<DemoFisheriesDocument, 'localId'>;
  demoCoopSubmissions: EntityTable<DemoCoopSubmission, 'localId'>;
  demoListings: EntityTable<DemoListing, 'localId'>;
  demoOrders: EntityTable<DemoOrder, 'localId'>;
  demoNegotiations: EntityTable<DemoNegotiation, 'localId'>;
  demoNegotiationOffers: EntityTable<DemoNegotiationOffer, 'localId'>;
  demoNegotiationMessages: EntityTable<DemoNegotiationMessage, 'localId'>;
  demoNegotiationEvents: EntityTable<DemoNegotiationEvent, 'localId'>;
  demoRsbsaProfiles: EntityTable<DemoRsbsaProfile, 'localId'>;
};

demoDb.version(2).stores({
  demoFarms: 'localId, name, primaryCrop',
  demoPlots: 'localId, farmId, name',
  demoCropCycles: 'localId, farmId, crop, status',
  demoActivities: 'localId, cropCycleId, activityType, loggedAt',
  demoHarvests: 'localId, crop, harvestedAt, status',
  demoSales: 'localId, crop, soldAt',
  demoExpenses: 'localId, category, date',
  demoInventoryItems: 'localId, name, type',
  demoFishingTrips: 'localId, vesselName, status',
  demoCatches: 'localId, tripId, speciesName',
  demoCoopSubmissions: 'localId, farmerName, status',
  demoListings: 'localId, title, coopName, commodityCategory',
  demoOrders: 'localId, listingTitle, status',
});

demoDb.version(3).stores({
  demoFisheriesDocuments: 'localId, documentType, verificationStatus',
});

demoDb.version(4).stores({
  demoNegotiations: 'localId, buyerOrganizationId, cooperativeOrganizationId, listingId, status, lastActivityAt',
  demoNegotiationOffers: 'localId, negotiationId, offerNumber, status, createdAt',
  demoNegotiationMessages: 'localId, negotiationId, createdAt',
  demoNegotiationEvents: 'localId, negotiationId, createdAt',
});

demoDb.version(5).stores({
  demoRsbsaProfiles: 'localId, userId, role, registrationStatus',
});

export async function seedDemoDatabase() {
  const count = await demoDb.demoFarms.count();
  const negotiationCount = await demoDb.demoNegotiations.count();
  const profileCount = await demoDb.demoRsbsaProfiles.count();
  if (count > 0 && negotiationCount > 0 && profileCount > 0) return;

  const today = new Date().toISOString().split('T')[0];

  // 0. RSBSA Profiles Seed Data
  await demoDb.demoRsbsaProfiles.bulkPut([
    {
      localId: 'demo-rsbsa-farmer-1',
      userId: 'demo-user-farmer',
      role: 'farmer',
      rsbsaNumber: '14-11-01-001-000123',
      surname: 'dela Cruz',
      firstName: 'Juan',
      middleName: 'Ramos',
      mobileNumber: '0917-123-4567',
      region: 'CAR',
      province: 'Benguet',
      cityMunicipality: 'Atok',
      barangay: 'Sayangan',
      livelihoodFarmer: true,
      livelihoodFisher: false,
      primaryFarmName: 'Atok Highland Terrace',
      mainCommodity: 'Benguet Cabbage',
      farmAreaHa: 2.5,
      tenureType: 'Registered Owner',
      preferredLanguage: 'Filipino',
      registrationStatus: 'verified',
      profileCompletionPercentage: 100,
    },
    {
      localId: 'demo-rsbsa-fisher-1',
      userId: 'demo-user-fisher',
      role: 'fisher',
      rsbsaNumber: '01-55-08-002-000456',
      surname: 'Penduko',
      firstName: 'Pedro',
      middleName: 'Santos',
      mobileNumber: '0918-987-6543',
      region: 'REGION_1',
      province: 'Pangasinan',
      cityMunicipality: 'Bolinao',
      barangay: 'Luciente 1st',
      livelihoodFarmer: false,
      livelihoodFisher: true,
      primaryFishingArea: 'Lingayen Gulf',
      fishingType: 'Municipal Capture Fishing',
      mainSpecies: 'Yellowfin Tuna',
      usesVessel: true,
      vesselName: 'FB San Jose Marine Vessel',
      preferredLanguage: 'English',
      registrationStatus: 'verified',
      profileCompletionPercentage: 100,
    },
    {
      localId: 'demo-rsbsa-dual-1',
      userId: 'demo-user-dual',
      role: 'farmer_and_fisher',
      rsbsaNumber: '01-28-04-003-000789',
      surname: 'Santos',
      firstName: 'Maria',
      middleName: 'Cruz',
      mobileNumber: '0920-555-8899',
      region: 'REGION_1',
      province: 'Ilocos Norte',
      cityMunicipality: 'Currimao',
      barangay: 'Poblacion',
      livelihoodFarmer: true,
      livelihoodFisher: true,
      primaryFarmName: 'Ilocos Garlic & Corn Plot',
      mainCommodity: 'Garlic',
      farmAreaHa: 1.2,
      tenureType: 'Registered Owner',
      primaryFishingArea: 'Currimao Coastal Waters',
      fishingType: 'Seaweed Farming',
      mainSpecies: 'Seaweed (Kappaphycus)',
      usesVessel: false,
      preferredLanguage: 'Ilocano',
      registrationStatus: 'verified',
      profileCompletionPercentage: 100,
    },
  ]);

  // 1. Farms & Plots
  await demoDb.demoFarms.bulkPut([
    { localId: 'farm-1', name: 'Atok Strawberry & Cabbage Farm', location: 'Atok, Benguet', areaHectares: 2.5, primaryCrop: 'Benguet Cabbage', status: 'Active' },
    { localId: 'farm-2', name: 'La Trinidad Highland Valley Plot', location: 'La Trinidad, Benguet', areaHectares: 1.8, primaryCrop: 'Carrots', status: 'Active' },
  ]);

  await demoDb.demoPlots.bulkPut([
    { localId: 'plot-1', farmId: 'farm-1', name: 'Upper Terrace Plot A', areaSqMeters: 5000, crop: 'Benguet Cabbage', status: 'ACTIVE' },
    { localId: 'plot-2', farmId: 'farm-1', name: 'Lower Valley Plot B', areaSqMeters: 3500, crop: 'Wongbok (Napa Cabbage)', status: 'ACTIVE' },
  ]);

  // 2. Crop Cycles & Activities
  await demoDb.demoCropCycles.bulkPut([
    { localId: 'cycle-1', farmId: 'farm-1', plotName: 'Upper Terrace Plot A', crop: 'Benguet Cabbage', variety: 'Scorpio F1', plantedAt: '2026-06-01', estimatedHarvestAt: '2026-08-15', status: 'GROWING' },
    { localId: 'cycle-2', farmId: 'farm-1', plotName: 'Lower Valley Plot B', crop: 'Wongbok Cabbage', variety: 'Tropical Queen', plantedAt: '2026-05-10', estimatedHarvestAt: '2026-07-25', status: 'HARVESTING' },
  ]);

  await demoDb.demoActivities.bulkPut([
    { localId: 'act-1', cropCycleId: 'cycle-1', activityType: 'FERTILIZING', description: 'Applied 14-14-14 Complete Fertilizer (25kg)', cost: 1450, loggedAt: today },
    { localId: 'act-2', cropCycleId: 'cycle-1', activityType: 'IRRIGATION', description: 'Morning drip irrigation cycle (2 hours)', cost: 180, loggedAt: today },
  ]);

  // 3. Harvests, Sales & Expenses
  await demoDb.demoHarvests.bulkPut([
    { localId: 'harv-1', crop: 'Benguet Highland Cabbage', variety: 'Scorpio F1', weightKg: 1250, qualityGrade: 'Class A', harvestedAt: today, status: 'STORAGE' },
    { localId: 'harv-2', crop: 'Atok Sweet Carrots', variety: 'Chantenay', weightKg: 820, qualityGrade: 'Class A', harvestedAt: today, status: 'SUBMITTED_TO_COOP' },
  ]);

  await demoDb.demoSales.bulkPut([
    { localId: 'sale-1', crop: 'Benguet Highland Cabbage', weightKg: 500, pricePerKg: 45, totalRevenue: 22500, buyerName: 'Benguet Agriculture Cooperative', soldAt: today },
  ]);

  await demoDb.demoExpenses.bulkPut([
    { localId: 'exp-1', category: 'Inputs', description: 'Complete Fertilizer 14-14-14 (2 Bags)', amount: 2900, date: today },
    { localId: 'exp-2', category: 'Labor', description: 'Plot Weeding & Land Prep Labor', amount: 1500, date: today },
  ]);

  // 4. Warehouse Inventory Items
  await demoDb.demoInventoryItems.bulkPut([
    { localId: 'inv-1', name: 'Complete Fertilizer 14-14-14', type: 'FERTILIZER', quantity: 18, unit: 'bags', unitCost: 1450 },
    { localId: 'inv-2', name: 'Scorpio F1 Cabbage Seeds', type: 'SEED', quantity: 25, unit: 'packs', unitCost: 320 },
    { localId: 'inv-3', name: 'Diesel Fuel (Tractor & Pump)', type: 'FUEL', quantity: 120, unit: 'liters', unitCost: 62 },
    { localId: 'inv-4', name: 'Ventilated Produce Crates', type: 'PACKAGING', quantity: 85, unit: 'crates', unitCost: 210 },
  ]);

  // 5. Capture Fishing Trips & Catches
  await demoDb.demoFishingTrips.bulkPut([
    { localId: 'trip-1', vesselName: 'FB San Jose Marine Vessel', departurePort: 'Bolinao Municipal Port', fishingGround: 'Lingayen Gulf', crewCount: 4, fuelUsedLiters: 85, departedAt: today, status: 'DEPARTED' },
  ]);

  await demoDb.demoCatches.bulkPut([
    { localId: 'catch-1', tripId: 'trip-1', vesselName: 'FB San Jose Marine Vessel', speciesName: 'Yellowfin Tuna (Tambakol)', weightKg: 450, qualityGrade: 'Class A', preservationMethod: 'Chilled Ice', caughtAtDate: today },
    { localId: 'catch-2', tripId: 'trip-1', vesselName: 'FB San Jose Marine Vessel', speciesName: 'Round Scad (Galunggong)', weightKg: 320, qualityGrade: 'Class A', preservationMethod: 'Chilled Ice', caughtAtDate: today },
  ]);
  await demoDb.demoFisheriesDocuments.bulkPut([
    { localId: 'fish-doc-1', title: 'BFAR Vessel Registration', documentType: 'VESSEL_PERMIT', fileName: 'bfar-registration.pdf', verificationStatus: 'VERIFIED' },
    { localId: 'fish-doc-2', title: 'Municipal Fishing Permit', documentType: 'LGU_PERMIT', fileName: 'municipal-permit.pdf', verificationStatus: 'PENDING' },
  ]);

  // 6. Coop Submissions & Listings
  await demoDb.demoCoopSubmissions.bulkPut([
    { localId: 'sub-1', farmerName: 'Juan Dela Cruz (Atok Plot #1)', commodity: 'Benguet Cabbage', weightKg: 1250, qualityGrade: 'Class A', status: 'PENDING', submittedAt: today },
    { localId: 'sub-2', farmerName: 'Maria Santos (La Trinidad Plot #3)', commodity: 'Highland Carrots', weightKg: 820, qualityGrade: 'Class A', status: 'APPROVED', submittedAt: today },
  ]);

  await demoDb.demoListings.bulkPut([
    { localId: 'list-1', title: 'Fresh Benguet Highland Cabbage (Class A)', coopName: 'Benguet Agriculture Cooperative', commodityCategory: 'Highland Vegetables', availableKg: 3500, pricePerKg: 45, grade: 'Class A', originProvince: 'Benguet', verifiedStatus: 'Verified Coop' },
    { localId: 'list-2', title: 'Dagupan Milkfish (Bangus - Fresh Catch)', coopName: 'Dagupan Aquaculturists Cooperative', commodityCategory: 'Aquaculture', availableKg: 1200, pricePerKg: 160, grade: 'Class A', originProvince: 'Pangasinan', verifiedStatus: 'Verified Coop' },
  ]);

  // 7. Orders
  await demoDb.demoOrders.bulkPut([
    { localId: 'ord-1', listingTitle: 'Fresh Benguet Highland Cabbage (Class A)', coopName: 'Benguet Agriculture Cooperative', weightKg: 500, totalPrice: 22500, status: 'ESCROW_PAID', orderedAt: today },
  ]);

  const agricultureNegotiationId = 'demo-neg-agri-1';
  const fisheriesNegotiationId = 'demo-neg-fish-1';
  await demoDb.demoNegotiations.bulkPut([
    {
      localId: agricultureNegotiationId,
      buyerOrganizationId: 'demo-org-buyer',
      buyerOrganizationName: 'Metro Supermarkets Procurement',
      cooperativeOrganizationId: 'demo-org-coop',
      cooperativeOrganizationName: 'Benguet Agriculture Cooperative',
      listingId: 'list-1',
      commodityId: 'VEG-CAB-01',
      commodityName: 'Fresh Benguet Highland Cabbage',
      productSector: 'agriculture',
      status: 'countered',
      currentOfferId: 'demo-offer-agri-2',
      initiatedByRole: 'buyer',
      reservationRule: 'on_confirmation',
      expiresAt: new Date(Date.now() + 5 * 86400000).toISOString(),
      lastActivityAt: new Date().toISOString(),
      version: 2,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      localId: fisheriesNegotiationId,
      buyerOrganizationId: 'demo-org-buyer',
      buyerOrganizationName: 'Metro Supermarkets Procurement',
      cooperativeOrganizationId: 'demo-org-coop',
      cooperativeOrganizationName: 'Dagupan Aquaculturists Cooperative',
      listingId: 'list-2',
      commodityId: 'FISH-BANGUS-01',
      commodityName: 'Dagupan Milkfish (Bangus)',
      productSector: 'fisheries',
      status: 'submitted',
      currentOfferId: 'demo-offer-fish-1',
      initiatedByRole: 'buyer',
      reservationRule: 'on_confirmation',
      expiresAt: new Date(Date.now() + 6 * 86400000).toISOString(),
      lastActivityAt: new Date(Date.now() - 3600000).toISOString(),
      version: 1,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ]);
  await demoDb.demoNegotiationOffers.bulkPut([
    {
      localId: 'demo-offer-agri-1',
      negotiationId: agricultureNegotiationId,
      offerNumber: 1,
      createdByRole: 'buyer',
      quantity: 500,
      unit: 'kg',
      unitPrice: 42,
      deliveryDate: '2026-08-08',
      deliveryLocation: 'Quezon City Cold Storage Hub',
      paymentTerms: 'Net 15 days after accepted delivery',
      qualityGrade: 'Class A',
      qualityNotes: 'Uniform heads, maximum 2% trimming loss',
      notes: 'Weekly supply trial for three branches.',
      status: 'superseded',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      localId: 'demo-offer-agri-2',
      negotiationId: agricultureNegotiationId,
      offerNumber: 2,
      createdByRole: 'coop',
      quantity: 450,
      unit: 'kg',
      unitPrice: 44,
      deliveryDate: '2026-08-09',
      deliveryLocation: 'Quezon City Cold Storage Hub',
      paymentTerms: '50% on confirmation, balance Net 7 after delivery',
      qualityGrade: 'Class A',
      qualityNotes: 'Pre-cooled and packed in ventilated crates',
      notes: 'Available volume after existing reservations is 450 kg.',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
    {
      localId: 'demo-offer-fish-1',
      negotiationId: fisheriesNegotiationId,
      offerNumber: 1,
      createdByRole: 'buyer',
      quantity: 300,
      unit: 'kg',
      unitPrice: 155,
      deliveryDate: '2026-08-07',
      deliveryLocation: 'Navotas Seafood Consolidation Hub',
      paymentTerms: 'Payment on verified cold-chain receipt',
      qualityGrade: 'Class A',
      qualityNotes: '400–600 g per fish, chilled at 0–4°C',
      notes: 'Please confirm harvest and icing schedule.',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ]);
  await demoDb.demoNegotiationMessages.bulkPut([
    {
      localId: 'demo-message-agri-1',
      negotiationId: agricultureNegotiationId,
      senderRole: 'buyer',
      message: 'Can the cooperative include reusable ventilated crates?',
      relatedOfferId: 'demo-offer-agri-1',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      localId: 'demo-message-agri-2',
      negotiationId: agricultureNegotiationId,
      senderRole: 'coop',
      message: 'Crates are included in the counteroffer and collected on the next delivery.',
      relatedOfferId: 'demo-offer-agri-2',
      createdAt: new Date().toISOString(),
    },
  ]);
  await demoDb.demoNegotiationEvents.bulkPut([
    {
      localId: 'demo-event-agri-1',
      negotiationId: agricultureNegotiationId,
      actorRole: 'buyer',
      eventType: 'negotiation_submitted',
      offerId: 'demo-offer-agri-1',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      localId: 'demo-event-agri-2',
      negotiationId: agricultureNegotiationId,
      actorRole: 'coop',
      eventType: 'counteroffer_sent',
      offerId: 'demo-offer-agri-2',
      createdAt: new Date().toISOString(),
    },
    {
      localId: 'demo-event-fish-1',
      negotiationId: fisheriesNegotiationId,
      actorRole: 'buyer',
      eventType: 'negotiation_submitted',
      offerId: 'demo-offer-fish-1',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ]);
}

export async function resetDemoDatabase() {
  await demoDb.demoFarms.clear();
  await demoDb.demoPlots.clear();
  await demoDb.demoCropCycles.clear();
  await demoDb.demoActivities.clear();
  await demoDb.demoHarvests.clear();
  await demoDb.demoSales.clear();
  await demoDb.demoExpenses.clear();
  await demoDb.demoInventoryItems.clear();
  await demoDb.demoFishingTrips.clear();
  await demoDb.demoCatches.clear();
  await demoDb.demoFisheriesDocuments.clear();
  await demoDb.demoCoopSubmissions.clear();
  await demoDb.demoListings.clear();
  await demoDb.demoOrders.clear();
  await demoDb.demoNegotiations.clear();
  await demoDb.demoNegotiationOffers.clear();
  await demoDb.demoNegotiationMessages.clear();
  await demoDb.demoNegotiationEvents.clear();
  await seedDemoDatabase();
}

export { demoDb };
