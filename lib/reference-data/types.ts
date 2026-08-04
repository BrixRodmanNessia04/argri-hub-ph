// Reference Data Types for AgriHub PH

export interface RegionRef {
  code: string;
  name: string;
  designation?: string;
}

export interface ProvinceRef {
  code: string;
  regionCode: string;
  name: string;
}

export interface CityMunicipalityRef {
  code: string;
  provinceCode: string;
  name: string;
  isCity: boolean;
}

export interface BarangayRef {
  code: string;
  cityMunicipalityCode: string;
  name: string;
}

export interface LivelihoodOption {
  key: "farmer" | "farm_worker" | "fisher" | "agri_youth";
  label: string;
  description: string;
  iconName: string;
}

export interface TenureOption {
  key: string;
  label: string;
  description?: string;
}

export interface CroppingScheduleOption {
  key: string;
  label: string;
}

export interface CommodityCategoryOption {
  key: string;
  label: string;
}

export interface CommodityItemRef {
  code: string;
  name: string;
  localName?: string;
  categoryKey: string;
  isPopular?: boolean;
  defaultUnit?: string;
  sector: "crop" | "fisheries" | "livestock" | "poultry" | "other";
}

export interface FishingTypeOption {
  key: string;
  label: string;
  category: "capture" | "aquaculture" | "seaweed" | "shellfish" | "other";
  description: string;
}

export interface FishingAreaTypeOption {
  key: string;
  label: string;
}

export interface IdentityDocTypeOption {
  key: string;
  label: string;
}

export interface LanguageOption {
  code: string;
  label: string;
  isFullySupported: boolean;
}
