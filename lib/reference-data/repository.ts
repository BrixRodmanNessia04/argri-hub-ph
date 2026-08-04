import { ApplicationMode } from "../ApplicationContext";
import { DemoReferenceDataRepository } from "./demo-repository";
import { ProductionReferenceDataRepository } from "./production-repository";
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

export class ReferenceDataRepository {
  static getRepository(mode: ApplicationMode = "production") {
    return mode === "demo" ? DemoReferenceDataRepository : ProductionReferenceDataRepository;
  }

  static getRegions(mode: ApplicationMode = "production"): RegionRef[] {
    return this.getRepository(mode).getRegions();
  }

  static getProvinces(regionCode?: string, mode: ApplicationMode = "production"): ProvinceRef[] {
    return this.getRepository(mode).getProvinces(regionCode);
  }

  static getCitiesMunicipalities(provinceCode?: string, mode: ApplicationMode = "production"): CityMunicipalityRef[] {
    return this.getRepository(mode).getCitiesMunicipalities(provinceCode);
  }

  static getBarangays(cityMunicipalityCode?: string, mode: ApplicationMode = "production"): BarangayRef[] {
    return this.getRepository(mode).getBarangays(cityMunicipalityCode);
  }

  static getLivelihoods(mode: ApplicationMode = "production"): LivelihoodOption[] {
    return this.getRepository(mode).getLivelihoods();
  }

  static getTenureOptions(mode: ApplicationMode = "production"): TenureOption[] {
    return this.getRepository(mode).getTenureOptions();
  }

  static getCroppingSchedules(mode: ApplicationMode = "production"): CroppingScheduleOption[] {
    return this.getRepository(mode).getCroppingSchedules();
  }

  static getCommodities(query: string = "", sector: string = "all", mode: ApplicationMode = "production"): CommodityItemRef[] {
    return this.getRepository(mode).getCommodities(query, sector);
  }

  static getFishingTypes(mode: ApplicationMode = "production"): FishingTypeOption[] {
    return this.getRepository(mode).getFishingTypes();
  }

  static getFishingAreaTypes(mode: ApplicationMode = "production"): FishingAreaTypeOption[] {
    return this.getRepository(mode).getFishingAreaTypes();
  }

  static getIdentityDocTypes(mode: ApplicationMode = "production"): IdentityDocTypeOption[] {
    return this.getRepository(mode).getIdentityDocTypes();
  }

  static getSupportedLanguages(mode: ApplicationMode = "production"): LanguageOption[] {
    return this.getRepository(mode).getSupportedLanguages();
  }
}
