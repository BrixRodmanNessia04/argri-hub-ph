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
}

export interface DemoOrder {
  localId: string;
  listingTitle: string;
  coopName: string;
  weightKg: number;
  totalPrice: number;
  status: 'ESCROW_PAID' | 'DISPATCHED' | 'DELIVERED';
  orderedAt: string;
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

export async function seedDemoDatabase() {
  const count = await demoDb.demoFarms.count();
  if (count > 0) return;

  const today = new Date().toISOString().split('T')[0];

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
  await seedDemoDatabase();
}

export { demoDb };
