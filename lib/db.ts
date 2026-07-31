import Dexie, { type EntityTable } from 'dexie';

export type SyncStatus = 'local' | 'pending' | 'syncing' | 'synced' | 'failed' | 'conflict';

export interface OfflineBaseEntity {
  localId: string;
  serverId?: string | null;
  userId: string;
  cooperativeId?: string | null;
  deviceId: string;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
  syncAttempts: number;
  lastSyncAttemptAt?: string | null;
  syncError?: string | null;
  version: number;
  isDeleted: boolean;
}

export interface FarmEntity extends OfflineBaseEntity {
  name: string;
  location: string;
  areaHectares: number;
  primaryCrop?: string;
  notes?: string;
}

export interface PlotEntity extends OfflineBaseEntity {
  farmId: string;
  name: string;
  areaSqMeters: number;
  soilType?: string;
  status: 'ACTIVE' | 'FALLOW' | 'PREPARATION';
}

export interface CropCycleEntity extends OfflineBaseEntity {
  plotId: string;
  farmId?: string;
  crop: string;
  variety?: string;
  plantedAt: string;
  estimatedHarvestAt: string;
  status: 'PLANTED' | 'GROWING' | 'HARVESTING' | 'COMPLETED' | 'CANCELLED';
  stage?: string;
  targetYieldKg?: number;
  expectedYieldKg?: number;
}

export interface FieldActivityEntity extends OfflineBaseEntity {
  cropCycleId: string;
  plotId?: string;
  farmId?: string;
  activityType:
    | 'PLANTING'
    | 'TRANSPLANTING'
    | 'IRRIGATION'
    | 'FERTILIZING'
    | 'PEST_CONTROL'
    | 'WEEDING'
    | 'PRUNING'
    | 'MULCHING'
    | 'TRELLISING'
    | 'INSPECTION'
    | 'LAND_PREPARATION'
    | 'HARVEST_PREPARATION'
    | 'CLEANING'
    | 'PACKING'
    | 'TRANSPORTATION'
    | 'OTHER';
  description: string;
  cost: number;
  inputsUsed?: { name: string; quantity: number; unit: string }[];
  workerCount?: number;
  durationHours?: number;
  applicationRate?: string;
  safetyIntervalDays?: number;
  reEntryDate?: string;
  preHarvestIntervalDays?: number;
  loggedAt: string;
}

export interface HarvestEntity extends OfflineBaseEntity {
  farmId?: string;
  plotId?: string;
  cropCycleId?: string;
  crop: string;
  variety?: string;
  harvestType?: 'PARTIAL' | 'FINAL';
  weightKg: number;
  qualityGrade: 'Class A' | 'Class B' | 'Class C' | 'Premium';
  rejectedKg?: number;
  damagedKg?: number;
  homeUseKg?: number;
  forSaleKg?: number;
  coopSubmissionKg?: number;
  storageLocation?: string;
  expectedPricePerKg?: number;
  harvestedAt: string;
  notes?: string;
  coopApprovalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ADJUSTED';
  rejectionReason?: string;
}

export interface SaleEntity extends OfflineBaseEntity {
  farmId?: string;
  cropCycleId?: string;
  harvestId?: string;
  buyerName: string;
  buyerType?: 'COOPERATIVE' | 'TRADER' | 'PUBLIC_MARKET' | 'RESTAURANT' | 'RETAILER' | 'WHOLESALER' | 'DIRECT_CONSUMER' | 'OTHER';
  crop: string;
  variety?: string;
  weightKg: number;
  pricePerKg: number;
  grossAmount: number;
  discounts?: number;
  transportationCost?: number;
  otherDeductions?: number;
  totalAmount: number;
  paymentStatus?: 'UNPAID' | 'PARTIALLY_PAID' | 'PAID' | 'CANCELLED';
  paymentMethod?: string;
  soldAt: string;
  deliveryDate?: string;
  invoiceNumber?: string;
  notes?: string;
}

export interface ExpenseEntity extends OfflineBaseEntity {
  farmId?: string;
  plotId?: string;
  cropCycleId?: string;
  category: 'SEEDS' | 'SEEDLINGS' | 'FERTILIZER' | 'COMPOST' | 'PESTICIDE' | 'HERBICIDE' | 'LABOR' | 'EQUIPMENT_RENTAL' | 'EQUIPMENT_REPAIR' | 'FUEL' | 'TRANSPORTATION' | 'PACKAGING' | 'IRRIGATION' | 'ELECTRICITY' | 'WATER' | 'LAND_RENT' | 'STORAGE' | 'COOP_FEES' | 'OTHER';
  description: string;
  amount: number;
  quantity?: number;
  unitPrice?: number;
  unit?: string;
  supplier?: string;
  paymentMethod?: string;
  date: string;
  notes?: string;
}

export interface InventoryItemEntity extends OfflineBaseEntity {
  farmId?: string;
  crop: string;
  type: 'SEED' | 'SEEDLING' | 'FERTILIZER' | 'COMPOST' | 'PESTICIDE' | 'HERBICIDE' | 'ANIMAL_FEED' | 'PACKAGING' | 'FUEL' | 'HARVESTED' | 'TOOL' | 'SPARE_PART' | 'OTHER';
  quantityInKg: number;
  unit?: string;
  grade?: string;
  storageLocation?: string;
  unitCost?: number;
  reorderThreshold?: number;
  minStockLevel?: number;
  expiryDate?: string;
  fisheriesUse?: boolean;
}

export type InventoryTransactionType =
  | 'initial_stock'
  | 'purchase'
  | 'stock_in'
  | 'harvest_in'
  | 'usage'
  | 'sale_out'
  | 'transfer_out'
  | 'transfer_in'
  | 'damage'
  | 'loss'
  | 'expired'
  | 'return_in'
  | 'return_out'
  | 'correction_increase'
  | 'correction_decrease';

export interface InventoryTransactionEntity extends OfflineBaseEntity {
  inventoryItemId: string;
  inventoryItemLocalId?: string;
  inventoryItemServerId?: string | null;

  transactionType?: InventoryTransactionType;
  changeType?: 'ADD' | 'USE' | 'TRANSFER' | 'DAMAGE' | 'EXPIRY' | 'LOSS' | 'CORRECTION'; // legacy alias

  quantity?: number;
  quantityKg: number;
  unit?: string;

  unitCost?: number | null;
  totalCost?: number | null;

  farmId?: string;
  farmLocalId?: string | null;
  plotId?: string;
  plotLocalId?: string | null;
  cropCycleId?: string;
  cropCycleLocalId?: string | null;
  activityLocalId?: string | null;
  expenseLocalId?: string | null;
  harvestLocalId?: string | null;
  saleLocalId?: string | null;

  sourceLocation?: string | null;
  destinationLocation?: string | null;

  reason: string;
  notes?: string | null;
  date: string;
  transactionDate?: string;

  idempotencyKey?: string;
}

export interface PestDiseaseEntity extends OfflineBaseEntity {
  farmId: string;
  plotId?: string;
  cropCycleId?: string;
  observationType: 'PEST' | 'DISEASE' | 'WEED' | 'NUTRIENT_DEFICIENCY' | 'UNKNOWN';
  name: string;
  observedAt: string;
  severity: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  affectedAreaSqM?: number;
  symptoms: string;
  actionTaken?: string;
  productApplied?: string;
  followUpDate?: string;
  status: 'OBSERVED' | 'MONITORING' | 'TREATMENT_APPLIED' | 'IMPROVING' | 'RESOLVED' | 'ESCALATED';
  notes?: string;
}

export interface LaborLogEntity extends OfflineBaseEntity {
  farmId: string;
  plotId?: string;
  cropCycleId?: string;
  workType: 'LAND_PREPARATION' | 'PLANTING' | 'WEEDING' | 'FERTILIZING' | 'SPRAYING' | 'IRRIGATION' | 'HARVESTING' | 'SORTING' | 'PACKING' | 'TRANSPORTATION' | 'MAINTENANCE' | 'OTHER';
  workerGroup: string;
  workerCount: number;
  date: string;
  hoursWorked: number;
  rateType: 'PER_DAY' | 'PER_HOUR' | 'PER_TASK' | 'FIXED';
  ratePerUnit: number;
  totalCost: number;
  paymentStatus: 'UNPAID' | 'PAID';
  notes?: string;
}

export interface EquipmentEntity extends OfflineBaseEntity {
  name: string;
  type: 'TRACTOR' | 'SPRAYER' | 'IRRIGATION_PUMP' | 'HARVESTER' | 'HAND_TOOL' | 'VEHICLE' | 'OTHER';
  brand?: string;
  model?: string;
  ownership: 'OWNED' | 'RENTED' | 'BORROWED' | 'COOPERATIVE_SHARED';
  acquisitionDate?: string;
  condition: 'EXCELLENT' | 'GOOD' | 'NEEDS_REPAIR' | 'OUT_OF_SERVICE';
  storageLocation?: string;
  notes?: string;
}

export interface EquipmentLogEntity extends OfflineBaseEntity {
  equipmentId: string;
  farmId?: string;
  plotId?: string;
  cropCycleId?: string;
  logType: 'USAGE' | 'MAINTENANCE' | 'REPAIR' | 'FUEL' | 'RENTAL';
  date: string;
  usageHours?: number;
  fuelUsedLiters?: number;
  cost: number;
  operatorName?: string;
  activityDescription: string;
  notes?: string;
}

export interface TaskEntity extends OfflineBaseEntity {
  title: string;
  farmId?: string;
  plotId?: string;
  cropCycleId?: string;
  dueDate: string;
  dueTime?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  repeatRule?: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'OVERDUE';
  notes?: string;
}

export interface GeneralLogEntity extends OfflineBaseEntity {
  farmId?: string;
  plotId?: string;
  cropCycleId?: string;
  logType: 'FARM_OBSERVATION' | 'WEATHER' | 'CROP_CONDITION' | 'SOIL_CONDITION' | 'IRRIGATION' | 'MAINTENANCE' | 'DELIVERY' | 'PICKUP' | 'COOP_VISIT' | 'BUYER_INQUIRY' | 'GENERAL_NOTE' | 'OTHER';
  title: string;
  notes: string;
  quantity?: number;
  unit?: string;
  cost?: number;
  tags?: string[];
  date: string;
}

export interface FormDraftEntity {
  key: string; // e.g. "draft_farm_new", "draft_harvest_new"
  formId: string;
  payload: Record<string, unknown>;
  updatedAt: string;
}

export interface NotificationEntity {
  localId: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'SYNC' | 'HARVEST_UPDATE';
  read: boolean;
  createdAt: string;
}

export interface SmsQueueEntity {
  localId: string;
  userId: string;
  recipientPhone: string;
  message: string;
  messageType: 'HARVEST_CONFIRMATION' | 'HARVEST_APPROVAL' | 'ANNOUNCEMENT' | 'PRICE_UPDATE' | 'PICKUP_SCHEDULE' | 'ORDER_CONFIRMATION' | 'PAYMENT_NOTIFICATION' | 'SYNC_FAILURE';
  idempotencyKey: string;
  syncStatus: SyncStatus;
  syncAttempts: number;
  lastSyncAttemptAt?: string | null;
  syncError?: string | null;
  providerMsgId?: string | null;
  providerStatus?: 'QUEUED' | 'SUBMITTED' | 'DELIVERED' | 'FAILED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface MediaQueueEntity {
  localId: string;
  entityType: 'HARVEST' | 'ACTIVITY' | 'FARM' | 'PEST_DISEASE' | 'DOCUMENT';
  entityLocalId: string;
  fileName: string;
  fileType: string;
  fileBlob: Blob | ArrayBuffer;
  syncStatus: SyncStatus;
  createdAt: string;
}

export interface SyncQueueEntity {
  localId: string;
  entityType: string;
  entityLocalId: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  payload: Record<string, unknown>;
  createdAt: string;
  attempts: number;
}

export interface SyncConflictEntity {
  localId: string;
  entityType: string;
  entityLocalId: string;
  localRecord: Record<string, unknown>;
  serverRecord: Record<string, unknown>;
  status: 'PENDING_RESOLUTION' | 'RESOLVED_LOCAL' | 'RESOLVED_SERVER';
  detectedAt: string;
}

export interface CachedReferenceDataEntity {
  key: string;
  payload: Record<string, unknown>;
  cachedAt: string;
  expiresAt?: string;
}

export interface LocalSessionEntity {
  key: string;
  userId: string;
  role: 'FARMER' | 'COOP_LEADER' | 'BUYER' | 'ADMIN';
  cooperativeId?: string;
  name: string;
  phone: string;
  token?: string;
  lastActiveAt: string;
}

// Backwards compatibility legacy interfaces
export interface HarvestRecord {
  id?: number;
  farmerId: string;
  coopId: string;
  crop: string;
  weightKg: number;
  syncStatus: 'pending' | 'synced';
  createdAt: string;
}
export type Harvest = HarvestRecord;

export interface LogRecord {
  id?: number;
  farmerId: string;
  coopId: string;
  crop: string;
  weightKg: number;
  syncStatus: 'pending' | 'synced';
  actionType?: 'PLANTING' | 'WATERING' | 'HARVEST' | 'COST' | 'SALE';
  createdAt: string;
}

export interface InventoryRecord {
  id?: number;
  crop: string;
  type: 'SEED' | 'HARVESTED';
  quantityInKg: number;
  updatedAt: string;
}

import {
  UserRole,
  OrganizationType,
  ProducerType,
  SiteType,
  CommodityCategory,
  VerificationStatus,
} from '@/types/roles';

export interface UserProfileEntity extends OfflineBaseEntity {
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  roles: UserRole[];
  primaryRole: UserRole;
  verificationStatus: VerificationStatus;
  preferredLanguage: string;
  mfaEnabled: boolean;
}

export interface ProducerProfileEntity extends OfflineBaseEntity {
  producerType: ProducerType;
  localReference?: string;
  governmentReference?: string;
  preferredLanguage: string;
  primaryLocationId?: string;
  verificationStatus: VerificationStatus;
  profileCompletionStatus: string;
}

export interface OrganizationEntity extends OfflineBaseEntity {
  name: string;
  type: OrganizationType;
  registrationNumber?: string;
  contactEmail?: string;
  contactPhone?: string;
  address: string;
  region: string;
  province: string;
  cityMunicipality: string;
  authorizedRepresentative: string;
  verificationStatus: VerificationStatus;
  isVerified: boolean;
  operationalStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  description?: string;
  logoUrl?: string;
}

export interface OrganizationMembershipEntity extends OfflineBaseEntity {
  organizationId: string;
  roleInOrganization: string;
  permissions: string[];
  status: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'REVOKED';
  joinedAt: string;
}

export interface ProductionSiteEntity extends OfflineBaseEntity {
  name: string;
  siteType: SiteType;
  location: string;
  region?: string;
  province?: string;
  latitude?: number;
  longitude?: number;
  areaHectares?: number;
  waterVolumeCubicMeters?: number;
  capacity?: number;
  unitOfCapacity?: string;
  primaryCommodity?: string;
  notes?: string;
}

export interface CommodityItemEntity extends OfflineBaseEntity {
  code: string;
  name: string;
  tagalogName?: string;
  category: CommodityCategory;
  subcategory?: string;
  hsCode?: string;
  standardUnit: string;
  allowedGrades: string[];
  shelfLifeDays?: number;
  storageTempCelsius?: string;
  isSeasonal: boolean;
  peakMonths?: string[];
}

export interface DocumentEntity extends OfflineBaseEntity {
  title: string;
  documentType: 'GOVT_ID' | 'LAND_TITLE' | 'VESSEL_PERMIT' | 'COOP_REGISTRATION' | 'SANITARY_PERMIT' | 'ORGANIC_CERT' | 'OTHER';
  entityType: 'USER' | 'PRODUCER' | 'ORGANIZATION' | 'SITE' | 'COMMODITY';
  entityLocalId: string;
  fileUrl?: string;
  fileName?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  verificationStatus: VerificationStatus;
  verifiedByUserId?: string;
  verifiedAt?: string;
  notes?: string;
}

export interface CertificationEntity extends OfflineBaseEntity {
  title: string;
  certificationType: 'GAP' | 'GAQP' | 'ORGANIC' | 'HALAL' | 'HACCP' | 'LGU_PERMIT' | 'BFAR_LICENSE' | 'DA_ACCREDITATION';
  issuingAuthority: string;
  certificateNumber: string;
  entityType: 'PRODUCER' | 'ORGANIZATION' | 'SITE' | 'COMMODITY';
  entityLocalId: string;
  issuedAt: string;
  expiresAt?: string;
  verificationStatus: VerificationStatus;
  certificateFileUrl?: string;
}

export interface AuditLogEntity extends OfflineBaseEntity {
  actorUserId: string;
  actorRole: string;
  action: string;
  targetEntity: string;
  targetEntityId: string;
  details?: string;
  ipAddress?: string;
  timestamp: string;
}

export type ProductionCycleType =
  | 'crop'
  | 'capture_fishing'
  | 'aquaculture'
  | 'livestock'
  | 'poultry';

export interface ProductionCycleEntity extends OfflineBaseEntity {
  cycleType: ProductionCycleType;
  siteId?: string;
  commodityName: string;
  commodityCategory?: string;
  startDate: string;
  estimatedHarvestDate: string;
  status: 'PLANTED' | 'GROWING' | 'HARVESTING' | 'COMPLETED' | 'CANCELLED';
  targetYieldKg?: number;
  actualYieldKg?: number;
  mortalityRate?: number;
  vesselId?: string;
  notes?: string;
}

export interface FishingTripEntity extends OfflineBaseEntity {
  vesselName: string;
  vesselRegistrationNumber?: string;
  departurePort: string;
  arrivalPort?: string;
  departedAt: string;
  returnedAt?: string;
  fishingGround: string;
  fuelUsedLiters?: number;
  crewCount: number;
  status: 'DEPARTED' | 'FISHING' | 'RETURNED' | 'CANCELLED';
}

export interface CatchLogEntity extends OfflineBaseEntity {
  tripId: string;
  speciesName: string;
  weightKg: number;
  qualityGrade: string;
  preservationMethod: 'chilled_ice' | 'frozen' | 'live' | 'ambient';
  caughtAtCoordinates?: string;
  caughtAtDate: string;
  forSaleKg?: number;
  homeUseKg?: number;
}

export interface AquacultureCycleEntity extends OfflineBaseEntity {
  siteId: string;
  speciesName: string;
  stockingDensityPerSqM?: number;
  totalStockCount: number;
  stockingDate: string;
  expectedHarvestDate: string;
  waterSalinityPpt?: number;
  waterTempCelsius?: number;
  phLevel?: number;
  dissolvedOxygen?: number;
  status: 'STOCKING' | 'GROWING' | 'HARVESTING' | 'COMPLETED';
}

export interface LivestockPoultryBatchEntity extends OfflineBaseEntity {
  siteId: string;
  animalType: 'cattle' | 'swine' | 'broiler' | 'layer' | 'duck' | 'goat' | 'sheep';
  batchName: string;
  breed?: string;
  headCount: number;
  housingType?: string;
  startDate: string;
  expectedMarketDate: string;
  vaccinationStatus?: string;
  status: 'ACTIVE' | 'MARKET_READY' | 'COMPLETED';
}

export interface HealthObservationEntity extends OfflineBaseEntity {
  sector: 'crops' | 'fisheries' | 'aquaculture' | 'livestock' | 'poultry';
  siteId?: string;
  cycleId?: string;
  observationType: 'PEST' | 'DISEASE' | 'AQUATIC_MORTALITY' | 'WATER_ANOMALY' | 'ANIMAL_ILLNESS' | 'WEED';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  symptoms: string;
  treatmentApplied?: string;
  inputUsedId?: string;
  observedAt: string;
}

export interface ProductionForecastEntity extends OfflineBaseEntity {
  cooperativeId: string;
  producerUserId: string;
  producerName?: string;
  commodityName: string;
  sector: 'crop' | 'capture_fishing' | 'aquaculture' | 'livestock' | 'poultry';
  expectedYieldKg: number;
  forecastWindowStart: string;
  forecastWindowEnd: string;
  confidenceScore: number;
}

const db = new Dexie('AgriAppDB') as Dexie & {
  harvestsLegacy: EntityTable<HarvestRecord, 'id'>;
  logsLegacy: EntityTable<LogRecord, 'id'>;
  inventoryLegacy: EntityTable<InventoryRecord, 'id'>;

  farms: EntityTable<FarmEntity, 'localId'>;
  plots: EntityTable<PlotEntity, 'localId'>;
  cropCycles: EntityTable<CropCycleEntity, 'localId'>;
  fieldActivities: EntityTable<FieldActivityEntity, 'localId'>;
  harvests: EntityTable<HarvestEntity, 'localId'>;
  sales: EntityTable<SaleEntity, 'localId'>;
  expenses: EntityTable<ExpenseEntity, 'localId'>;
  inventoryItems: EntityTable<InventoryItemEntity, 'localId'>;
  inventoryTransactions: EntityTable<InventoryTransactionEntity, 'localId'>;
  pestsDiseases: EntityTable<PestDiseaseEntity, 'localId'>;
  laborLogs: EntityTable<LaborLogEntity, 'localId'>;
  equipment: EntityTable<EquipmentEntity, 'localId'>;
  equipmentLogs: EntityTable<EquipmentLogEntity, 'localId'>;
  tasks: EntityTable<TaskEntity, 'localId'>;
  generalLogs: EntityTable<GeneralLogEntity, 'localId'>;
  formDrafts: EntityTable<FormDraftEntity, 'key'>;
  notifications: EntityTable<NotificationEntity, 'localId'>;
  smsQueue: EntityTable<SmsQueueEntity, 'localId'>;
  mediaQueue: EntityTable<MediaQueueEntity, 'localId'>;
  syncQueue: EntityTable<SyncQueueEntity, 'localId'>;
  syncConflicts: EntityTable<SyncConflictEntity, 'localId'>;
  cachedReferenceData: EntityTable<CachedReferenceDataEntity, 'key'>;
  localSession: EntityTable<LocalSessionEntity, 'key'>;

  // Phase A Multi-Domain Entities
  userProfiles: EntityTable<UserProfileEntity, 'localId'>;
  producerProfiles: EntityTable<ProducerProfileEntity, 'localId'>;
  organizations: EntityTable<OrganizationEntity, 'localId'>;
  organizationMemberships: EntityTable<OrganizationMembershipEntity, 'localId'>;
  productionSites: EntityTable<ProductionSiteEntity, 'localId'>;
  commodityCatalog: EntityTable<CommodityItemEntity, 'localId'>;
  documents: EntityTable<DocumentEntity, 'localId'>;
  certifications: EntityTable<CertificationEntity, 'localId'>;
  auditLogs: EntityTable<AuditLogEntity, 'localId'>;

  // Phase B Production Management Entities
  productionCycles: EntityTable<ProductionCycleEntity, 'localId'>;
  fishingTrips: EntityTable<FishingTripEntity, 'localId'>;
  catchLogs: EntityTable<CatchLogEntity, 'localId'>;
  aquacultureCycles: EntityTable<AquacultureCycleEntity, 'localId'>;
  livestockPoultryBatches: EntityTable<LivestockPoultryBatchEntity, 'localId'>;
  healthObservations: EntityTable<HealthObservationEntity, 'localId'>;
  productionForecasts: EntityTable<ProductionForecastEntity, 'localId'>;
};

db.version(1).stores({
  harvests: '++id, crop, syncStatus',
});

db.version(2).stores({
  harvests: '++id, farmerId, coopId, crop, syncStatus',
});

db.version(3).stores({
  harvests: '++id, farmerId, coopId, crop, syncStatus',
  logs: '++id, farmerId, coopId, crop, syncStatus, actionType',
  inventory: '++id, crop, type, updatedAt',
});

db.version(4).stores({
  harvestsLegacy: '++id, farmerId, coopId, crop, syncStatus',
  logsLegacy: '++id, farmerId, coopId, crop, syncStatus, actionType',
  inventoryLegacy: '++id, crop, type, updatedAt',

  farms: 'localId, serverId, userId, cooperativeId, syncStatus, updatedAt',
  plots: 'localId, serverId, farmId, userId, syncStatus, updatedAt',
  cropCycles: 'localId, serverId, plotId, crop, status, syncStatus, updatedAt',
  fieldActivities: 'localId, serverId, cropCycleId, activityType, syncStatus, loggedAt',
  harvests: 'localId, serverId, cropCycleId, plotId, crop, syncStatus, harvestedAt',
  sales: 'localId, serverId, harvestId, crop, syncStatus, soldAt',
  expenses: 'localId, serverId, category, syncStatus, date',
  inventoryItems: 'localId, serverId, crop, type, syncStatus, updatedAt',
  inventoryTransactions: 'localId, serverId, inventoryItemId, changeType, syncStatus, date',
  notifications: 'localId, userId, read, createdAt',
  smsQueue: 'localId, userId, messageType, syncStatus, idempotencyKey, createdAt',
  mediaQueue: 'localId, entityLocalId, syncStatus, createdAt',
  syncQueue: 'localId, entityType, entityLocalId, operation, createdAt',
  syncConflicts: 'localId, entityType, entityLocalId, status, detectedAt',
  cachedReferenceData: 'key, cachedAt, expiresAt',
  localSession: 'key, userId, role, lastActiveAt',
});

db.version(5).stores({
  harvestsLegacy: '++id, farmerId, coopId, crop, syncStatus',
  logsLegacy: '++id, farmerId, coopId, crop, syncStatus, actionType',
  inventoryLegacy: '++id, crop, type, updatedAt',

  farms: 'localId, serverId, userId, cooperativeId, syncStatus, updatedAt',
  plots: 'localId, serverId, farmId, userId, syncStatus, updatedAt',
  cropCycles: 'localId, serverId, plotId, crop, status, syncStatus, updatedAt',
  fieldActivities: 'localId, serverId, cropCycleId, plotId, farmId, activityType, syncStatus, loggedAt',
  harvests: 'localId, serverId, cropCycleId, plotId, farmId, crop, syncStatus, harvestedAt',
  sales: 'localId, serverId, harvestId, farmId, cropCycleId, crop, syncStatus, soldAt',
  expenses: 'localId, serverId, category, farmId, plotId, cropCycleId, syncStatus, date',
  inventoryItems: 'localId, serverId, crop, type, farmId, syncStatus, updatedAt',
  inventoryTransactions: 'localId, serverId, inventoryItemId, farmId, cropCycleId, changeType, syncStatus, date',
  pestsDiseases: 'localId, serverId, farmId, plotId, cropCycleId, observationType, severity, status, syncStatus, updatedAt',
  laborLogs: 'localId, serverId, farmId, plotId, cropCycleId, workType, paymentStatus, syncStatus, date',
  equipment: 'localId, serverId, ownership, condition, syncStatus, updatedAt',
  equipmentLogs: 'localId, serverId, equipmentId, farmId, plotId, cropCycleId, logType, syncStatus, date',
  tasks: 'localId, serverId, farmId, plotId, cropCycleId, status, priority, dueDate, syncStatus, updatedAt',
  generalLogs: 'localId, serverId, farmId, plotId, cropCycleId, logType, syncStatus, date',
  formDrafts: 'key, formId, updatedAt',
  notifications: 'localId, userId, read, createdAt',
  smsQueue: 'localId, userId, messageType, syncStatus, idempotencyKey, createdAt',
  mediaQueue: 'localId, entityLocalId, syncStatus, createdAt',
  syncQueue: 'localId, entityType, entityLocalId, operation, createdAt',
  syncConflicts: 'localId, entityType, entityLocalId, status, detectedAt',
  cachedReferenceData: 'key, cachedAt, expiresAt',
  localSession: 'key, userId, role, lastActiveAt',
});

// Version 6: Full Platform Foundation
db.version(6).stores({
  harvestsLegacy: '++id, farmerId, coopId, crop, syncStatus',
  logsLegacy: '++id, farmerId, coopId, crop, syncStatus, actionType',
  inventoryLegacy: '++id, crop, type, updatedAt',

  farms: 'localId, serverId, userId, cooperativeId, syncStatus, updatedAt',
  plots: 'localId, serverId, farmId, userId, syncStatus, updatedAt',
  cropCycles: 'localId, serverId, plotId, crop, status, syncStatus, updatedAt',
  fieldActivities: 'localId, serverId, cropCycleId, plotId, farmId, activityType, syncStatus, loggedAt',
  harvests: 'localId, serverId, cropCycleId, plotId, farmId, crop, syncStatus, harvestedAt',
  sales: 'localId, serverId, harvestId, farmId, cropCycleId, crop, syncStatus, soldAt',
  expenses: 'localId, serverId, category, farmId, plotId, cropCycleId, syncStatus, date',
  inventoryItems: 'localId, serverId, crop, type, farmId, syncStatus, updatedAt',
  inventoryTransactions: 'localId, serverId, inventoryItemId, farmId, cropCycleId, changeType, syncStatus, date',
  pestsDiseases: 'localId, serverId, farmId, plotId, cropCycleId, observationType, severity, status, syncStatus, updatedAt',
  laborLogs: 'localId, serverId, farmId, plotId, cropCycleId, workType, paymentStatus, syncStatus, date',
  equipment: 'localId, serverId, ownership, condition, syncStatus, updatedAt',
  equipmentLogs: 'localId, serverId, equipmentId, farmId, plotId, cropCycleId, logType, syncStatus, date',
  tasks: 'localId, serverId, farmId, plotId, cropCycleId, status, priority, dueDate, syncStatus, updatedAt',
  generalLogs: 'localId, serverId, farmId, plotId, cropCycleId, logType, syncStatus, date',
  formDrafts: 'key, formId, updatedAt',
  notifications: 'localId, userId, read, createdAt',
  smsQueue: 'localId, userId, messageType, syncStatus, idempotencyKey, createdAt',
  mediaQueue: 'localId, entityLocalId, syncStatus, createdAt',
  syncQueue: 'localId, entityType, entityLocalId, operation, createdAt',
  syncConflicts: 'localId, entityType, entityLocalId, status, detectedAt',
  cachedReferenceData: 'key, cachedAt, expiresAt',
  localSession: 'key, userId, role, lastActiveAt',

  userProfiles: 'localId, serverId, userId, email, primaryRole, syncStatus, updatedAt',
  producerProfiles: 'localId, serverId, userId, producerType, verificationStatus, syncStatus, updatedAt',
  organizations: 'localId, serverId, type, verificationStatus, isVerified, operationalStatus, syncStatus, updatedAt',
  organizationMemberships: 'localId, serverId, organizationId, userId, status, syncStatus, updatedAt',
  productionSites: 'localId, serverId, siteType, primaryCommodity, syncStatus, updatedAt',
  commodityCatalog: 'localId, code, category, isSeasonal, syncStatus, updatedAt',
  documents: 'localId, serverId, documentType, entityType, entityLocalId, verificationStatus, syncStatus, updatedAt',
  certifications: 'localId, serverId, certificationType, entityType, entityLocalId, verificationStatus, syncStatus, updatedAt',
  auditLogs: 'localId, actorUserId, actorRole, action, targetEntity, timestamp, syncStatus',
});

// Version 7: Phase B Multi-Sector Production Management
db.version(7).stores({
  harvestsLegacy: '++id, farmerId, coopId, crop, syncStatus',
  logsLegacy: '++id, farmerId, coopId, crop, syncStatus, actionType',
  inventoryLegacy: '++id, crop, type, updatedAt',

  farms: 'localId, serverId, userId, cooperativeId, syncStatus, updatedAt',
  plots: 'localId, serverId, farmId, userId, syncStatus, updatedAt',
  cropCycles: 'localId, serverId, plotId, crop, status, syncStatus, updatedAt',
  fieldActivities: 'localId, serverId, cropCycleId, plotId, farmId, activityType, syncStatus, loggedAt',
  harvests: 'localId, serverId, cropCycleId, plotId, farmId, crop, syncStatus, harvestedAt',
  sales: 'localId, serverId, harvestId, farmId, cropCycleId, crop, syncStatus, soldAt',
  expenses: 'localId, serverId, category, farmId, plotId, cropCycleId, syncStatus, date',
  inventoryItems: 'localId, serverId, crop, type, farmId, syncStatus, updatedAt',
  inventoryTransactions: 'localId, serverId, inventoryItemId, farmId, cropCycleId, changeType, syncStatus, date',
  pestsDiseases: 'localId, serverId, farmId, plotId, cropCycleId, observationType, severity, status, syncStatus, updatedAt',
  laborLogs: 'localId, serverId, farmId, plotId, cropCycleId, workType, paymentStatus, syncStatus, date',
  equipment: 'localId, serverId, ownership, condition, syncStatus, updatedAt',
  equipmentLogs: 'localId, serverId, equipmentId, farmId, plotId, cropCycleId, logType, syncStatus, date',
  tasks: 'localId, serverId, farmId, plotId, cropCycleId, status, priority, dueDate, syncStatus, updatedAt',
  generalLogs: 'localId, serverId, farmId, plotId, cropCycleId, logType, syncStatus, date',
  formDrafts: 'key, formId, updatedAt',
  notifications: 'localId, userId, read, createdAt',
  smsQueue: 'localId, userId, messageType, syncStatus, idempotencyKey, createdAt',
  mediaQueue: 'localId, entityLocalId, syncStatus, createdAt',
  syncQueue: 'localId, entityType, entityLocalId, operation, createdAt',
  syncConflicts: 'localId, entityType, entityLocalId, status, detectedAt',
  cachedReferenceData: 'key, cachedAt, expiresAt',
  localSession: 'key, userId, role, lastActiveAt',

  userProfiles: 'localId, serverId, userId, email, primaryRole, syncStatus, updatedAt',
  producerProfiles: 'localId, serverId, userId, producerType, verificationStatus, syncStatus, updatedAt',
  organizations: 'localId, serverId, type, verificationStatus, isVerified, operationalStatus, syncStatus, updatedAt',
  organizationMemberships: 'localId, serverId, organizationId, userId, status, syncStatus, updatedAt',
  productionSites: 'localId, serverId, siteType, primaryCommodity, syncStatus, updatedAt',
  commodityCatalog: 'localId, code, category, isSeasonal, syncStatus, updatedAt',
  documents: 'localId, serverId, documentType, entityType, entityLocalId, verificationStatus, syncStatus, updatedAt',
  certifications: 'localId, serverId, certificationType, entityType, entityLocalId, verificationStatus, syncStatus, updatedAt',
  auditLogs: 'localId, actorUserId, actorRole, action, targetEntity, timestamp, syncStatus',

  // Phase B Tables
  productionCycles: 'localId, serverId, cycleType, commodityName, status, syncStatus, updatedAt',
  fishingTrips: 'localId, serverId, vesselName, fishingGround, status, syncStatus, departedAt',
  catchLogs: 'localId, serverId, tripId, speciesName, syncStatus, caughtAtDate',
  aquacultureCycles: 'localId, serverId, siteId, speciesName, status, syncStatus, stockingDate',
  livestockPoultryBatches: 'localId, serverId, siteId, animalType, status, syncStatus, startDate',
  healthObservations: 'localId, serverId, sector, observationType, severity, syncStatus, observedAt',
  productionForecasts: 'localId, cooperativeId, producerUserId, commodityName, sector, forecastWindowStart',
});

export function generateLocalId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `local_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function getDeviceId(): string {
  if (typeof window === 'undefined') return 'server_device';
  let devId = localStorage.getItem('agrihub_device_id');
  if (!devId) {
    devId = `dev_${generateLocalId()}`;
    localStorage.setItem('agrihub_device_id', devId);
  }
  return devId;
}

export function createBaseEntity(
  userId: string = 'farmer-123',
  coopId: string | null = 'coop-456',
): OfflineBaseEntity {
  const now = new Date().toISOString();
  return {
    localId: generateLocalId(),
    serverId: null,
    userId,
    cooperativeId: coopId,
    deviceId: getDeviceId(),
    createdAt: now,
    updatedAt: now,
    syncStatus: 'local',
    syncAttempts: 0,
    lastSyncAttemptAt: null,
    syncError: null,
    version: 1,
    isDeleted: false,
  };
}

export async function seedProductionDatabase() {
  if (typeof window === 'undefined') return;
  const count = await db.farms.count();
  if (count > 0) return;

  const base = createBaseEntity('farmer-juan-123', 'coop-benguet-456');
  const today = new Date().toISOString().split('T')[0];

  // 1. Farms & Plots
  const farm1Id = 'farm-atok-1';
  const farm2Id = 'farm-[#latrinidad]-2';
  await db.farms.bulkPut([
    { ...base, localId: farm1Id, name: 'Atok Strawberry & Cabbage Farm', location: 'Atok, Benguet', areaHectares: 2.5, primaryCrop: 'Benguet Cabbage' },
    { ...base, localId: farm2Id, name: 'La Trinidad Highland Valley Plot', location: 'La Trinidad, Benguet', areaHectares: 1.8, primaryCrop: 'Carrots' },
  ]);

  const plot1Id = 'plot-atok-a';
  const plot2Id = 'plot-atok-b';
  await db.plots.bulkPut([
    { ...base, localId: plot1Id, farmId: farm1Id, name: 'Upper Terrace Plot A', areaSqMeters: 5000, soilType: 'Volcanic Loam', status: 'ACTIVE' },
    { ...base, localId: plot2Id, farmId: farm1Id, name: 'Lower Valley Plot B', areaSqMeters: 3500, soilType: 'Highland Clay', status: 'ACTIVE' },
  ]);

  // 2. Crop Cycles & Activities
  const cycle1Id = 'cycle-cabbage-1';
  await db.cropCycles.bulkPut([
    { ...base, localId: cycle1Id, plotId: plot1Id, farmId: farm1Id, crop: 'Benguet Cabbage', variety: 'Scorpio F1', plantedAt: '2026-06-01', estimatedHarvestAt: '2026-08-15', status: 'GROWING', stage: 'Vegetative Head Formation', targetYieldKg: 3000 },
  ]);

  await db.fieldActivities.bulkPut([
    { ...base, localId: 'act-1', cropCycleId: cycle1Id, plotId: plot1Id, farmId: farm1Id, activityType: 'FERTILIZING', description: 'Applied Complete 14-14-14 Fertilizer (25kg)', cost: 1450, loggedAt: today },
    { ...base, localId: 'act-2', cropCycleId: cycle1Id, plotId: plot1Id, farmId: farm1Id, activityType: 'IRRIGATION', description: 'Morning drip irrigation cycle (2 hours)', cost: 180, loggedAt: today },
  ]);

  // 3. Harvests & Sales & Expenses
  const harv1Id = 'harv-cabbage-1';
  await db.harvests.bulkPut([
    { ...base, localId: harv1Id, cropCycleId: cycle1Id, plotId: plot1Id, farmId: farm1Id, crop: 'Benguet Highland Cabbage', variety: 'Scorpio F1', weightKg: 1250, qualityGrade: 'Class A', harvestedAt: today, forSaleKg: 1250, expectedPricePerKg: 45 },
  ]);

  await db.sales.bulkPut([
    { ...base, localId: 'sale-1', harvestId: harv1Id, farmId: farm1Id, cropCycleId: cycle1Id, crop: 'Benguet Highland Cabbage', weightKg: 500, pricePerKg: 45, grossAmount: 22500, totalAmount: 22500, buyerName: 'Benguet Agriculture Cooperative', soldAt: today },
  ]);

  await db.expenses.bulkPut([
    { ...base, localId: 'exp-1', farmId: farm1Id, category: 'FERTILIZER', description: 'Complete Fertilizer 14-14-14 (2 Bags)', amount: 2900, date: today },
    { ...base, localId: 'exp-2', farmId: farm1Id, category: 'LABOR', description: 'Plot Weeding & Land Prep Labor', amount: 1500, date: today },
  ]);

  // 4. Warehouse Inventory Items
  await db.inventoryItems.bulkPut([
    { ...base, localId: 'inv-1', crop: 'Complete Fertilizer 14-14-14', type: 'FERTILIZER', farmId: farm1Id, quantityInKg: 18, unit: 'bags', unitCost: 1450 },
    { ...base, localId: 'inv-2', crop: 'Scorpio F1 Cabbage Seeds', type: 'SEED', farmId: farm1Id, quantityInKg: 25, unit: 'packs', unitCost: 320 },
    { ...base, localId: 'inv-3', crop: 'Diesel Fuel (Tractor & Pump)', type: 'FUEL', farmId: farm1Id, quantityInKg: 120, unit: 'liters', unitCost: 62 },
  ]);

  // 5. Fisheries Trips & Catches
  const trip1Id = 'trip-bolinao-1';
  await db.fishingTrips.bulkPut([
    { ...base, localId: trip1Id, vesselName: 'FB San Jose Marine Vessel', departurePort: 'Bolinao Municipal Port', fishingGround: 'Lingayen Gulf', crewCount: 4, fuelUsedLiters: 85, departedAt: today, status: 'DEPARTED' },
  ]);

  await db.catchLogs.bulkPut([
    { ...base, localId: 'catch-1', tripId: trip1Id, speciesName: 'Yellowfin Tuna (Tambakol)', weightKg: 450, qualityGrade: 'Class A', preservationMethod: 'chilled_ice', caughtAtDate: today, forSaleKg: 450 },
    { ...base, localId: 'catch-2', tripId: trip1Id, speciesName: 'Round Scad (Galunggong)', weightKg: 320, qualityGrade: 'Class A', preservationMethod: 'chilled_ice', caughtAtDate: today, forSaleKg: 320 },
  ]);
}

export async function resetProductionDatabase() {
  if (typeof window === 'undefined') return;
  await db.farms.clear();
  await db.plots.clear();
  await db.cropCycles.clear();
  await db.fieldActivities.clear();
  await db.harvests.clear();
  await db.sales.clear();
  await db.expenses.clear();
  await db.inventoryItems.clear();
  await db.inventoryTransactions.clear();
  await db.fishingTrips.clear();
  await db.catchLogs.clear();
  await seedProductionDatabase();
}

export { db };
