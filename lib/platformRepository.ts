import {
  db,
  createBaseEntity,
  UserProfileEntity,
  ProducerProfileEntity,
  OrganizationEntity,
  OrganizationMembershipEntity,
  ProductionSiteEntity,
  CommodityItemEntity,
  DocumentEntity,
  CertificationEntity,
  AuditLogEntity,
} from './db';
import { queueSyncOperation } from './farmerRepository';
import { UserRole, OrganizationType, ProducerType, SiteType, CommodityCategory, VerificationStatus } from '@/types/roles';

// 1. User Profile & Multi-Role Governance
export async function createOrUpdateUserProfile(params: {
  userId: string;
  email: string;
  fullName: string;
  phone?: string;
  primaryRole: UserRole;
  roles?: UserRole[];
  preferredLanguage?: string;
}): Promise<UserProfileEntity> {
  const existing = await db.userProfiles.filter((u) => u.userId === params.userId).first();

  const now = new Date().toISOString();
  if (existing) {
    const updatedRoles = Array.from(new Set([...existing.roles, ...(params.roles || []), params.primaryRole]));
    await db.userProfiles.update(existing.localId, {
      fullName: params.fullName,
      phone: params.phone || existing.phone,
      primaryRole: params.primaryRole,
      roles: updatedRoles,
      updatedAt: now,
    });
    const updated = await db.userProfiles.get(existing.localId);
    return updated!;
  }

  const newProfile: UserProfileEntity = {
    ...createBaseEntity(params.userId),
    email: params.email,
    fullName: params.fullName,
    phone: params.phone,
    roles: params.roles || [params.primaryRole],
    primaryRole: params.primaryRole,
    verificationStatus: 'verified',
    preferredLanguage: params.preferredLanguage || 'Tagalog',
    mfaEnabled: false,
  };

  await db.userProfiles.add(newProfile);
  await queueSyncOperation('user_profiles', newProfile.localId, 'CREATE', newProfile as unknown as Record<string, unknown>);
  return newProfile;
}

// 2. Shared Producer Profile Service
export async function createProducerProfile(params: {
  userId: string;
  producerType: ProducerType;
  localReference?: string;
  governmentReference?: string;
  preferredLanguage?: string;
}): Promise<ProducerProfileEntity> {
  const profile: ProducerProfileEntity = {
    ...createBaseEntity(params.userId),
    producerType: params.producerType,
    localReference: params.localReference,
    governmentReference: params.governmentReference,
    preferredLanguage: params.preferredLanguage || 'Tagalog',
    verificationStatus: 'under_review',
    profileCompletionStatus: '85%',
  };

  await db.producerProfiles.add(profile);
  await queueSyncOperation('producer_profiles', profile.localId, 'CREATE', profile as unknown as Record<string, unknown>);
  return profile;
}

// 3. Organization Management (No self-verification allowed)
export async function createOrganization(params: {
  name: string;
  type: OrganizationType;
  address: string;
  region: string;
  province: string;
  cityMunicipality: string;
  authorizedRepresentative: string;
  registrationNumber?: string;
  contactEmail?: string;
  contactPhone?: string;
}): Promise<OrganizationEntity> {
  const org: OrganizationEntity = {
    ...createBaseEntity(),
    name: params.name,
    type: params.type,
    address: params.address,
    region: params.region,
    province: params.province,
    cityMunicipality: params.cityMunicipality,
    authorizedRepresentative: params.authorizedRepresentative,
    registrationNumber: params.registrationNumber,
    contactEmail: params.contactEmail,
    contactPhone: params.contactPhone,
    verificationStatus: 'under_review',
    isVerified: false,
    operationalStatus: 'ACTIVE',
  };

  await db.organizations.add(org);
  await queueSyncOperation('organizations', org.localId, 'CREATE', org as unknown as Record<string, unknown>);
  return org;
}

// 4. Production Sites Service (Farms, Ponds, Cages, Vessels, Warehouses)
export async function createProductionSite(params: {
  name: string;
  siteType: SiteType;
  location: string;
  region?: string;
  province?: string;
  areaHectares?: number;
  waterVolumeCubicMeters?: number;
  capacity?: number;
  unitOfCapacity?: string;
  primaryCommodity?: string;
}): Promise<ProductionSiteEntity> {
  const site: ProductionSiteEntity = {
    ...createBaseEntity(),
    name: params.name,
    siteType: params.siteType,
    location: params.location,
    region: params.region,
    province: params.province,
    areaHectares: params.areaHectares,
    waterVolumeCubicMeters: params.waterVolumeCubicMeters,
    capacity: params.capacity,
    unitOfCapacity: params.unitOfCapacity,
    primaryCommodity: params.primaryCommodity,
  };

  await db.productionSites.add(site);
  await queueSyncOperation('production_sites', site.localId, 'CREATE', site as unknown as Record<string, unknown>);
  return site;
}

// 5. Shared Commodity Catalog Service
export async function seedCommodityCatalog(): Promise<CommodityItemEntity[]> {
  const count = await db.commodityCatalog.count();
  if (count > 0) return db.commodityCatalog.toArray();

  const defaultItems: Partial<CommodityItemEntity>[] = [
    { code: 'CROP-CAB-01', name: 'Benguet Highland Cabbage', tagalogName: 'Repolyo', category: 'crops', standardUnit: 'kg', allowedGrades: ['Class A', 'Class B', 'Class C'], isSeasonal: false },
    { code: 'CROP-CAR-02', name: 'Atok Sweet Carrots', tagalogName: 'Karot', category: 'vegetables', standardUnit: 'kg', allowedGrades: ['Class A', 'Class B'], isSeasonal: false },
    { code: 'FISH-TIL-01', name: 'Freshwater Tilapia', tagalogName: 'Tilapia', category: 'fisheries', standardUnit: 'kg', allowedGrades: ['Large', 'Medium', 'Small'], isSeasonal: false },
    { code: 'FISH-BANG-02', name: 'Dagupan Milkfish', tagalogName: 'Bangus', category: 'aquaculture', standardUnit: 'kg', allowedGrades: ['Class A', 'Class B'], isSeasonal: false },
    { code: 'LIVE-SWI-01', name: 'Hog / Swine Market Liveweight', tagalogName: 'Baboy', category: 'livestock', standardUnit: 'kg', allowedGrades: ['Grade 1', 'Grade 2'], isSeasonal: false },
    { code: 'POUL-EGG-01', name: 'Fresh Layer Chicken Eggs', tagalogName: 'Itlog', category: 'poultry', standardUnit: 'tray', allowedGrades: ['XL', 'Large', 'Medium'], isSeasonal: false },
  ];

  const createdItems: CommodityItemEntity[] = [];
  for (const item of defaultItems) {
    const entity: CommodityItemEntity = {
      ...createBaseEntity(),
      code: item.code!,
      name: item.name!,
      tagalogName: item.tagalogName,
      category: item.category!,
      standardUnit: item.standardUnit!,
      allowedGrades: item.allowedGrades!,
      isSeasonal: item.isSeasonal || false,
    };
    await db.commodityCatalog.add(entity);
    createdItems.push(entity);
  }

  return createdItems;
}

// 6. Shared Document & Certification Service
export async function createDocumentRecord(params: {
  title: string;
  documentType: DocumentEntity['documentType'];
  entityType: DocumentEntity['entityType'];
  entityLocalId: string;
  fileUrl?: string;
  fileName?: string;
}): Promise<DocumentEntity> {
  const doc: DocumentEntity = {
    ...createBaseEntity(),
    title: params.title,
    documentType: params.documentType,
    entityType: params.entityType,
    entityLocalId: params.entityLocalId,
    fileUrl: params.fileUrl,
    fileName: params.fileName,
    verificationStatus: 'under_review',
  };

  await db.documents.add(doc);
  await queueSyncOperation('documents', doc.localId, 'CREATE', doc as unknown as Record<string, unknown>);
  return doc;
}

export async function createCertificationRecord(params: {
  title: string;
  certificationType: CertificationEntity['certificationType'];
  issuingAuthority: string;
  certificateNumber: string;
  entityType: CertificationEntity['entityType'];
  entityLocalId: string;
  issuedAt: string;
  expiresAt?: string;
}): Promise<CertificationEntity> {
  const cert: CertificationEntity = {
    ...createBaseEntity(),
    title: params.title,
    certificationType: params.certificationType,
    issuingAuthority: params.issuingAuthority,
    certificateNumber: params.certificateNumber,
    entityType: params.entityType,
    entityLocalId: params.entityLocalId,
    issuedAt: params.issuedAt,
    expiresAt: params.expiresAt,
    verificationStatus: 'verified',
  };

  await db.certifications.add(cert);
  await queueSyncOperation('certifications', cert.localId, 'CREATE', cert as unknown as Record<string, unknown>);
  return cert;
}

// 7. Compliance Audit Log Service
export async function recordAuditEntry(params: {
  actorUserId: string;
  actorRole: string;
  action: string;
  targetEntity: string;
  targetEntityId: string;
  details?: string;
}): Promise<AuditLogEntity> {
  const entry: AuditLogEntity = {
    ...createBaseEntity(params.actorUserId),
    actorUserId: params.actorUserId,
    actorRole: params.actorRole,
    action: params.action,
    targetEntity: params.targetEntity,
    targetEntityId: params.targetEntityId,
    details: params.details,
    timestamp: new Date().toISOString(),
  };

  await db.auditLogs.add(entry);
  await queueSyncOperation('audit_logs', entry.localId, 'CREATE', entry as unknown as Record<string, unknown>);
  return entry;
}
