import {
  RegionRef,
  ProvinceRef,
  CityMunicipalityRef,
  BarangayRef,
  CommodityItemRef,
} from "./types";
import {
  REGIONS,
  PROVINCES,
  CITIES_MUNICIPALITIES,
  BARANGAYS,
  COMMODITIES_CATALOG,
} from "./constants";

export class ReferenceDataCache {
  private static regionMap = new Map<string, RegionRef>();
  private static provinceMap = new Map<string, ProvinceRef>();
  private static cityMap = new Map<string, CityMunicipalityRef>();
  private static barangayMap = new Map<string, BarangayRef>();
  private static commodityMap = new Map<string, CommodityItemRef>();

  static initialize() {
    if (this.regionMap.size > 0) return;

    REGIONS.forEach((r) => this.regionMap.set(r.code, r));
    PROVINCES.forEach((p) => this.provinceMap.set(p.code, p));
    CITIES_MUNICIPALITIES.forEach((c) => this.cityMap.set(c.code, c));
    BARANGAYS.forEach((b) => this.barangayMap.set(b.code, b));
    COMMODITIES_CATALOG.forEach((item) => this.commodityMap.set(item.code, item));
  }

  static getRegions(): RegionRef[] {
    this.initialize();
    return REGIONS;
  }

  static getProvinces(regionCode?: string): ProvinceRef[] {
    this.initialize();
    if (!regionCode) return PROVINCES;
    return PROVINCES.filter((p) => p.regionCode === regionCode);
  }

  static getCitiesMunicipalities(provinceCode?: string): CityMunicipalityRef[] {
    this.initialize();
    if (!provinceCode) return CITIES_MUNICIPALITIES;
    return CITIES_MUNICIPALITIES.filter((c) => c.provinceCode === provinceCode);
  }

  static getBarangays(cityMunicipalityCode?: string): BarangayRef[] {
    this.initialize();
    if (!cityMunicipalityCode) return BARANGAYS;
    return BARANGAYS.filter((b) => b.cityMunicipalityCode === cityMunicipalityCode);
  }

  static searchCommodities(query: string, sector?: string): CommodityItemRef[] {
    this.initialize();
    const q = query.trim().toLowerCase();
    return COMMODITIES_CATALOG.filter((item) => {
      if (sector && item.sector !== sector && sector !== "all") return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        (item.localName && item.localName.toLowerCase().includes(q)) ||
        item.code.toLowerCase().includes(q)
      );
    });
  }
}
