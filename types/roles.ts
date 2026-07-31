// Shared Platform Role, Organization, and Permission Models for AgriHub PH

// 1. Expanded User Roles
export type ProducerRoleType =
  | 'farmer'
  | 'fisher'
  | 'aquaculture_producer'
  | 'livestock_producer'
  | 'poultry_producer';

export type ProducerOrgRoleType =
  | 'coop_staff'
  | 'coop_manager'
  | 'coop_admin'
  | 'association_staff'
  | 'collection_center_operator';

export type CommercialRoleType =
  | 'buyer'
  | 'trader'
  | 'wholesaler'
  | 'retailer'
  | 'restaurant_buyer'
  | 'institutional_buyer'
  | 'processor'
  | 'packaging_provider'
  | 'cold_storage_operator';

export type LogisticsRoleType =
  | 'transport_provider'
  | 'fleet_manager'
  | 'driver'
  | 'dispatcher';

export type GovernmentRoleType =
  | 'lgu_officer'
  | 'regional_agri_officer'
  | 'fisheries_officer'
  | 'program_officer'
  | 'inspector'
  | 'government_admin';

export type FinancialRoleType =
  | 'financial_institution_staff'
  | 'loan_officer'
  | 'insurance_provider'
  | 'subsidy_program_partner';

export type PlatformRoleType =
  | 'platform_support'
  | 'platform_auditor'
  | 'platform_admin'
  | 'super_admin';

export type UserRole =
  | ProducerRoleType
  | ProducerOrgRoleType
  | CommercialRoleType
  | LogisticsRoleType
  | GovernmentRoleType
  | FinancialRoleType
  | PlatformRoleType;

// 2. Organization Types
export type OrganizationType =
  | 'cooperative'
  | 'farmers_association'
  | 'fisherfolk_association'
  | 'buyer_company'
  | 'trader_company'
  | 'retailer'
  | 'restaurant_group'
  | 'food_service_operator'
  | 'processor'
  | 'packaging_facility'
  | 'warehouse'
  | 'cold_storage_facility'
  | 'transport_company'
  | 'government_agency'
  | 'local_government_unit'
  | 'financial_institution'
  | 'insurance_provider'
  | 'certification_body'
  | 'laboratory'
  | 'platform_operator';

// 3. Producer Types
export type ProducerType =
  | 'farmer'
  | 'fisher'
  | 'aquaculture'
  | 'livestock'
  | 'poultry'
  | 'mixed';

// 4. Production Site Types
export type SiteType =
  | 'farm'
  | 'plot'
  | 'pond'
  | 'cage'
  | 'fish_pen'
  | 'fishpond'
  | 'vessel'
  | 'pasture'
  | 'barn'
  | 'coop'
  | 'greenhouse'
  | 'warehouse'
  | 'processing_facility';

// 5. Commodity Categories
export type CommodityCategory =
  | 'crops'
  | 'vegetables'
  | 'fruits'
  | 'fisheries'
  | 'aquaculture'
  | 'livestock'
  | 'poultry'
  | 'processed_agri'
  | 'processed_fish'
  | 'farm_inputs'
  | 'equipment';

// 6. Verification Statuses
export type VerificationStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'rejected'
  | 'suspended';

// 7. Organization Model
export interface OrganizationModel {
  id: string;
  name: string;
  type: OrganizationType;
  registrationNumber?: string | null;
  taxId?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  address: string;
  region: string;
  province: string;
  cityMunicipality: string;
  coverageArea?: string | null;
  authorizedRepresentative: string;
  verificationStatus: VerificationStatus;
  isVerified: boolean;
  operationalStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  description?: string | null;
  logoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

// 8. User Profile & Multi-Role Membership Model
export interface UserProfileModel {
  id: string;
  userId: string;
  email: string;
  fullName: string;
  phone?: string | null;
  avatarUrl?: string | null;
  roles: UserRole[];
  primaryRole: UserRole;
  verificationStatus: VerificationStatus;
  preferredLanguage: string;
  mfaEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

// 9. Organization Membership
export interface OrganizationMembershipModel {
  id: string;
  userId: string;
  organizationId: string;
  roleInOrganization: string;
  permissions: string[];
  status: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'REVOKED';
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}
