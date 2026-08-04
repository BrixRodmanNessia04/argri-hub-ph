import {
  RegionRef,
  ProvinceRef,
  CityMunicipalityRef,
  BarangayRef,
  LivelihoodOption,
  TenureOption,
  CroppingScheduleOption,
  CommodityCategoryOption,
  CommodityItemRef,
  FishingTypeOption,
  FishingAreaTypeOption,
  IdentityDocTypeOption,
  LanguageOption,
} from "./types";

export const REGIONS: RegionRef[] = [
  { code: "CAR", name: "Cordillera Administrative Region", designation: "CAR" },
  { code: "REGION_1", name: "Ilocos Region", designation: "Region I" },
  { code: "REGION_3", name: "Central Luzon", designation: "Region III" },
  { code: "REGION_4A", name: "CALABARZON", designation: "Region IV-A" },
  { code: "REGION_6", name: "Western Visayas", designation: "Region VI" },
  { code: "REGION_7", name: "Central Visayas", designation: "Region VII" },
  { code: "NCR", name: "National Capital Region", designation: "NCR" },
];

export const PROVINCES: ProvinceRef[] = [
  // CAR
  { code: "BENGUET", regionCode: "CAR", name: "Benguet" },
  { code: "MOUNTAIN_PROVINCE", regionCode: "CAR", name: "Mountain Province" },
  // Region I
  { code: "PANGASINAN", regionCode: "REGION_1", name: "Pangasinan" },
  { code: "ILOCOS_NORTE", regionCode: "REGION_1", name: "Ilocos Norte" },
  { code: "ILOCOS_SUR", regionCode: "REGION_1", name: "Ilocos Sur" },
  { code: "LA_UNION", regionCode: "REGION_1", name: "La Union" },
  // Region III
  { code: "NUEVA_ECIJA", regionCode: "REGION_3", name: "Nueva Ecija" },
  { code: "PAMPANGA", regionCode: "REGION_3", name: "Pampanga" },
  { code: "TARLAC", regionCode: "REGION_3", name: "Tarlac" },
  { code: "BULACAN", regionCode: "REGION_3", name: "Bulacan" },
  // Region IV-A
  { code: "BATANGAS", regionCode: "REGION_4A", name: "Batangas" },
  { code: "LAGUNA", regionCode: "REGION_4A", name: "Laguna" },
  // Visayas
  { code: "CEBU", regionCode: "REGION_7", name: "Cebu" },
  { code: "ILOILO", regionCode: "REGION_6", name: "Iloilo" },
  // NCR
  { code: "NCR_FIRST_DISTRICT", regionCode: "NCR", name: "Metro Manila" },
];

export const CITIES_MUNICIPALITIES: CityMunicipalityRef[] = [
  // Benguet
  { code: "ATOK", provinceCode: "BENGUET", name: "Atok", isCity: false },
  { code: "LA_TRINIDAD", provinceCode: "BENGUET", name: "La Trinidad", isCity: false },
  { code: "TUBLAY", provinceCode: "BENGUET", name: "Tublay", isCity: false },
  { code: "BUGUIAS", provinceCode: "BENGUET", name: "Buguias", isCity: false },
  { code: "MANKAYAN", provinceCode: "BENGUET", name: "Mankayan", isCity: false },
  { code: "BAGUIO", provinceCode: "BENGUET", name: "Baguio City", isCity: true },
  // Pangasinan
  { code: "BOLINAO", provinceCode: "PANGASINAN", name: "Bolinao", isCity: false },
  { code: "DAGUPAN", provinceCode: "PANGASINAN", name: "Dagupan City", isCity: true },
  { code: "ALAMINOS", provinceCode: "PANGASINAN", name: "Alaminos City", isCity: true },
  { code: "SUAL", provinceCode: "PANGASINAN", name: "Sual", isCity: false },
  { code: "LINGAYEN", provinceCode: "PANGASINAN", name: "Lingayen", isCity: false },
  // Ilocos Norte
  { code: "LAOAG", provinceCode: "ILOCOS_NORTE", name: "Laoag City", isCity: true },
  { code: "CURRIMAO", provinceCode: "ILOCOS_NORTE", name: "Currimao", isCity: false },
  // Nueva Ecija
  { code: "CABANATUAN", provinceCode: "NUEVA_ECIJA", name: "Cabanatuan City", isCity: true },
  { code: "SAN_JOSE_NE", provinceCode: "NUEVA_ECIJA", name: "San Jose City", isCity: true },
  // Batangas
  { code: "NASUGBU", provinceCode: "BATANGAS", name: "Nasugbu", isCity: false },
  { code: "CALATAGAN", provinceCode: "BATANGAS", name: "Calatagan", isCity: false },
  // NCR
  { code: "QUEZON_CITY", provinceCode: "NCR_FIRST_DISTRICT", name: "Quezon City", isCity: true },
  { code: "MANILA", provinceCode: "NCR_FIRST_DISTRICT", name: "City of Manila", isCity: true },
];

export const BARANGAYS: BarangayRef[] = [
  // Atok
  { code: "POBLACION_ATOK", cityMunicipalityCode: "ATOK", name: "Poblacion" },
  { code: "SAYANGAN", cityMunicipalityCode: "ATOK", name: "Sayangan" },
  { code: "PATOOK", cityMunicipalityCode: "ATOK", name: "Pattoc" },
  { code: "CATMANG", cityMunicipalityCode: "ATOK", name: "Cattubo" },
  { code: "CALASIPAN", cityMunicipalityCode: "ATOK", name: "Calasipan" },
  // La Trinidad
  { code: "BALILI", cityMunicipalityCode: "LA_TRINIDAD", name: "Balili" },
  { code: "PUCUGAN", cityMunicipalityCode: "LA_TRINIDAD", name: "Puguis" },
  { code: "BETAG", cityMunicipalityCode: "LA_TRINIDAD", name: "Betag" },
  { code: "PICO", cityMunicipalityCode: "LA_TRINIDAD", name: "Pico" },
  { code: "POBLACION_LT", cityMunicipalityCode: "LA_TRINIDAD", name: "Poblacion" },
  // Bolinao
  { code: "POBLACION_BOLINAO", cityMunicipalityCode: "BOLINAO", name: "Poblacion" },
  { code: "LUCIENTE_1ST", cityMunicipalityCode: "BOLINAO", name: "Luciente 1st" },
  { code: "LUCIENTE_2ND", cityMunicipalityCode: "BOLINAO", name: "Luciente 2nd" },
  { code: "SANTIAGO_BOLINAO", cityMunicipalityCode: "BOLINAO", name: "Santiago" },
  { code: "ARNEDO", cityMunicipalityCode: "BOLINAO", name: "Arnedo" },
  // Dagupan
  { code: "BONUAN_GUESET", cityMunicipalityCode: "DAGUPAN", name: "Bonuan Gueset" },
  { code: "POBLACION_OESTE", cityMunicipalityCode: "DAGUPAN", name: "Poblacion Oeste" },
];

export const LIVELIHOOD_OPTIONS: LivelihoodOption[] = [
  {
    key: "farmer",
    label: "Farmer (Magsasaka)",
    description: "I manage, own, lease, or cultivate a farm parcel or agricultural crop land.",
    iconName: "Sprout",
  },
  {
    key: "farm_worker",
    label: "Farm Worker (Manggagawa sa Sakahan)",
    description: "I render land preparation, planting, harvesting, or field labor services.",
    iconName: "UserCheck",
  },
  {
    key: "fisher",
    label: "Fisherfolk (Mangingisda)",
    description: "I work in capture fishing, aquaculture, fishpond, seaweed, or shellfish farming.",
    iconName: "Waves",
  },
  {
    key: "agri_youth",
    label: "Agri-Youth",
    description: "I am a youth (18–30) engaged in agricultural production or agri-enterprise.",
    iconName: "GraduationCap",
  },
];

export const TENURE_OPTIONS: TenureOption[] = [
  { key: "Registered Owner", label: "Registered Owner (May-ari)" },
  { key: "Tenant", label: "Tenant (Kasama / Mamasaka)" },
  { key: "Lessee", label: "Lessee (Nangungupahan / Umuupa)" },
  { key: "Shared or family-managed", label: "Shared / Family-Managed (Kasosyo / Pamilya)" },
  { key: "Others", label: "Others (Iba pa)" },
];

export const CROPPING_SCHEDULE_OPTIONS: CroppingScheduleOption[] = [
  { key: "Whole year", label: "Whole Year (Buong Taon)" },
  { key: "January to March", label: "January – March (Q1)" },
  { key: "April to June", label: "April – June (Q2)" },
  { key: "July to September", label: "July – September (Q3)" },
  { key: "October to December", label: "October – December (Q4)" },
  { key: "Wet season", label: "Wet Season (Tag-ulan)" },
  { key: "Dry season", label: "Dry Season (Tag-araw)" },
  { key: "Custom", label: "Custom Schedule" },
];

export const COMMODITY_CATEGORIES: CommodityCategoryOption[] = [
  { key: "vegetables", label: "Vegetables (Gulay)" },
  { key: "fruits", label: "Fruits (Prutas)" },
  { key: "grains", label: "Grains & Cereals (Palay / Mais)" },
  { key: "root_crops", label: "Root Crops (Ugat-Tanom)" },
  { key: "legumes", label: "Legumes & Beans (Butil)" },
  { key: "herbs_spices", label: "Herbs & Spices (Halaman at Bawang)" },
  { key: "industrial", label: "Industrial Crops (Kape / Cacao / Niyog)" },
  { key: "fisheries", label: "Capture & Aquaculture Fish (Isda)" },
  { key: "shellfish_seaweed", label: "Shellfish & Seaweed (Tahong / Guso)" },
  { key: "livestock", label: "Livestock (Baka / Baboy / Kambing)" },
  { key: "poultry", label: "Poultry (Manok / Pato)" },
];

export const COMMODITIES_CATALOG: CommodityItemRef[] = [
  // Crops - Vegetables
  { code: "CABBAGE", name: "Cabbage", localName: "Repolyo", categoryKey: "vegetables", isPopular: true, defaultUnit: "kg", sector: "crop" },
  { code: "TOMATO", name: "Tomato", localName: "Kamatis", categoryKey: "vegetables", isPopular: true, defaultUnit: "kg", sector: "crop" },
  { code: "CARROT", name: "Carrot", localName: "Karot", categoryKey: "vegetables", isPopular: true, defaultUnit: "kg", sector: "crop" },
  { code: "ONION", name: "Onion (Red/Yellow)", localName: "Sibuyas", categoryKey: "vegetables", isPopular: true, defaultUnit: "kg", sector: "crop" },
  { code: "GARLIC", name: "Garlic", localName: "Bawang", categoryKey: "vegetables", isPopular: true, defaultUnit: "kg", sector: "crop" },
  { code: "EGGPLANT", name: "Eggplant", localName: "Talong", categoryKey: "vegetables", isPopular: true, defaultUnit: "kg", sector: "crop" },
  { code: "PECHAY", name: "Pechay", localName: "Pechay", categoryKey: "vegetables", isPopular: true, defaultUnit: "kg", sector: "crop" },
  { code: "AMPALAYA", name: "Bitter Gourd", localName: "Ampalaya", categoryKey: "vegetables", isPopular: false, defaultUnit: "kg", sector: "crop" },
  { code: "SQUASH", name: "Squash", localName: "Kalabasa", categoryKey: "vegetables", isPopular: false, defaultUnit: "kg", sector: "crop" },

  // Grains
  { code: "RICE_PALAY", name: "Rice (Palay)", localName: "Palay", categoryKey: "grains", isPopular: true, defaultUnit: "sacks", sector: "crop" },
  { code: "CORN_YELLOW", name: "Yellow Corn", localName: "Mais (Dilaw)", categoryKey: "grains", isPopular: true, defaultUnit: "kg", sector: "crop" },
  { code: "CORN_WHITE", name: "White Corn", localName: "Mais (Puti)", categoryKey: "grains", isPopular: false, defaultUnit: "kg", sector: "crop" },

  // Fruits
  { code: "BANANA", name: "Banana (Lakatan/Saba)", localName: "Saging", categoryKey: "fruits", isPopular: true, defaultUnit: "kg", sector: "crop" },
  { code: "MANGO", name: "Carabao Mango", localName: "Mangga", categoryKey: "fruits", isPopular: true, defaultUnit: "kg", sector: "crop" },
  { code: "PINEAPPLE", name: "Pineapple", localName: "Pinya", categoryKey: "fruits", isPopular: false, defaultUnit: "pcs", sector: "crop" },

  // Industrial
  { code: "COCONUT", name: "Coconut / Copra", localName: "Niyog", categoryKey: "industrial", isPopular: true, defaultUnit: "pcs", sector: "crop" },
  { code: "COFFEE", name: "Coffee Beans", localName: "Kape", categoryKey: "industrial", isPopular: true, defaultUnit: "kg", sector: "crop" },
  { code: "CACAO", name: "Cacao Beans", localName: "Kakaw", categoryKey: "industrial", isPopular: true, defaultUnit: "kg", sector: "crop" },

  // Fisheries
  { code: "TILAPIA", name: "Nile Tilapia", localName: "Tilapia", categoryKey: "fisheries", isPopular: true, defaultUnit: "kg", sector: "fisheries" },
  { code: "BANGUS", name: "Milkfish", localName: "Bangus", categoryKey: "fisheries", isPopular: true, defaultUnit: "kg", sector: "fisheries" },
  { code: "GALUNGGONG", name: "Round Scad", localName: "Galunggong", categoryKey: "fisheries", isPopular: true, defaultUnit: "kg", sector: "fisheries" },
  { code: "TUNA", name: "Yellowfin Tuna", localName: "Tambakol / Tuna", categoryKey: "fisheries", isPopular: true, defaultUnit: "kg", sector: "fisheries" },
  { code: "SARDINES", name: "Sardines", localName: "Tamban", categoryKey: "fisheries", isPopular: true, defaultUnit: "kg", sector: "fisheries" },

  // Shellfish & Seaweed
  { code: "SHRIMP", name: "Tiger Prawn / Shrimp", localName: "Sugpo / Hipon", categoryKey: "shellfish_seaweed", isPopular: true, defaultUnit: "kg", sector: "fisheries" },
  { code: "CRAB", name: "Mud Crab", localName: "Alimango", categoryKey: "shellfish_seaweed", isPopular: false, defaultUnit: "kg", sector: "fisheries" },
  { code: "MUSSELS", name: "Green Mussels", localName: "Tahong", categoryKey: "shellfish_seaweed", isPopular: true, defaultUnit: "kg", sector: "fisheries" },
  { code: "OYSTERS", name: "Oysters", localName: "Talaba", categoryKey: "shellfish_seaweed", isPopular: false, defaultUnit: "kg", sector: "fisheries" },
  { code: "SEAWEED", name: "Seaweed (Kappaphycus)", localName: "Guso / Agar-agar", categoryKey: "shellfish_seaweed", isPopular: true, defaultUnit: "kg", sector: "fisheries" },
];

export const FISHING_TYPES: FishingTypeOption[] = [
  {
    key: "municipal_capture",
    label: "Municipal Capture Fishing",
    category: "capture",
    description: "Coastal or nearshore fishing within municipal waters (using boats under 3 gross tons or shoreline gear).",
  },
  {
    key: "commercial_capture",
    label: "Commercial Capture Fishing",
    category: "capture",
    description: "Offshore fishing operations utilizing commercial vessels (over 3 gross tons).",
  },
  {
    key: "aquaculture_pond",
    label: "Aquaculture (Fishpond / Fish Cage)",
    category: "aquaculture",
    description: "Raising fish in inland freshwater or brackish ponds, cages, pens, or tanks.",
  },
  {
    key: "seaweed_farming",
    label: "Seaweed Farming",
    category: "seaweed",
    description: "Cultivation of guso, Eucheuma, or seaweed lines in coastal waters.",
  },
  {
    key: "shellfish_farming",
    label: "Shellfish Farming",
    category: "shellfish",
    description: "Cultivating mussels (tahong), oysters (talaba), or clams.",
  },
  {
    key: "inland_fishing",
    label: "Inland Fishing",
    category: "capture",
    description: "Fishing in rivers, lakes, reservoirs, or marshlands.",
  },
  {
    key: "mixed_fisheries",
    label: "Mixed Fisheries",
    category: "other",
    description: "Combining capture fishing with aquaculture or shellfish activities.",
  },
];

export const FISHING_AREA_TYPES: FishingAreaTypeOption[] = [
  { key: "municipal_waters", label: "Municipal Waters (Coastal)" },
  { key: "offshore", label: "Offshore / Deep Sea" },
  { key: "river_lake", label: "River or Lake (Inland)" },
  { key: "fishpond", label: "Brackish / Freshwater Fishpond" },
  { key: "fish_cage", label: "Marine or Freshwater Fish Cage / Pen" },
  { key: "marine_aquaculture", label: "Marine Coastal Plot (Seaweed / Shellfish)" },
];

export const IDENTITY_DOC_TYPES: IdentityDocTypeOption[] = [
  { key: "PhilID / ePhilID", label: "PhilID / ePhilID (Philippine Identification System)" },
  { key: "Voter's ID", label: "Voter's ID / Certification" },
  { key: "Driver's License", label: "Driver's License" },
  { key: "Passport", label: "Philippine Passport" },
  { key: "SSS / GSIS UMID", label: "UMID / SSS / GSIS Card" },
  { key: "PRC ID", label: "PRC ID" },
  { key: "Barangay Certification", label: "Barangay Certification with Photo" },
  { key: "Postal ID", label: "Postal ID" },
  { key: "Senior Citizen ID", label: "Senior Citizen ID" },
  { key: "PWD ID", label: "PWD ID" },
  { key: "4Ps ID", label: "4Ps Beneficiary Card" },
];

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "English", label: "English", isFullySupported: true },
  { code: "Filipino", label: "Filipino / Tagalog", isFullySupported: true },
  { code: "Cebuano", label: "Cebuano (Bisaya)", isFullySupported: true },
  { code: "Ilocano", label: "Ilocano", isFullySupported: true },
  { code: "Hiligaynon", label: "Hiligaynon (Ilonggo)", isFullySupported: true },
];
