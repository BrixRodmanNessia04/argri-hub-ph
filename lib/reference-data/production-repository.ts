import {
  RegionRef,
  ProvinceRef,
  CityMunicipalityRef,
  BarangayRef,
  CommodityItemRef,
  LivelihoodOption,
  TenureOption,
  CroppingScheduleOption,
  FishingTypeOption,
  FishingAreaTypeOption,
  IdentityDocTypeOption,
  LanguageOption,
} from "./types";
import {
  REGIONS,
  PROVINCES,
  CITIES_MUNICIPALITIES,
  BARANGAYS,
  LIVELIHOOD_OPTIONS,
  TENURE_OPTIONS,
  CROPPING_SCHEDULE_OPTIONS,
  COMMODITIES_CATALOG,
  FISHING_TYPES,
  FISHING_AREA_TYPES,
  IDENTITY_DOC_TYPES,
  SUPPORTED_LANGUAGES,
} from "./constants";
import { ReferenceDataCache } from "./cache";

export class ProductionReferenceDataRepository {
  static getRegions(): RegionRef[] {
    return ReferenceDataCache.getRegions();
  }

  static getProvinces(regionCode?: string): ProvinceRef[] {
    return ReferenceDataCache.getProvinces(regionCode);
  }

  static getCitiesMunicipalities(provinceCode?: string): CityMunicipalityRef[] {
    return ReferenceDataCache.getCitiesMunicipalities(provinceCode);
  }

  static getBarangays(cityMunicipalityCode?: string): BarangayRef[] {
    return ReferenceDataCache.getBarangays(cityMunicipalityCode);
  }

  static getLivelihoods(): LivelihoodOption[] {
    return LIVELIHOOD_OPTIONS;
  }

  static getTenureOptions(): TenureOption[] {
    return TENURE_OPTIONS;
  }

  static getCroppingSchedules(): CroppingScheduleOption[] {
    return CROPPING_SCHEDULE_OPTIONS;
  }

  static getCommodities(query: string = "", sector: string = "all"): CommodityItemRef[] {
    return ReferenceDataCache.searchCommodities(query, sector);
  }

  static getFishingTypes(): FishingTypeOption[] {
    return FISHING_TYPES;
  }

  static getFishingAreaTypes(): FishingAreaTypeOption[] {
    return FISHING_AREA_TYPES;
  }

  static getIdentityDocTypes(): IdentityDocTypeOption[] {
    return IDENTITY_DOC_TYPES;
  }

  static getSupportedLanguages(): LanguageOption[] {
    return SUPPORTED_LANGUAGES;
  }
}
