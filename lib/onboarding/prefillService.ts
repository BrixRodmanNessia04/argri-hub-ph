import { ApplicationMode } from "../ApplicationContext";
import { db } from "../db";
import { demoDb } from "../demoDb";
import { createClient } from "../supabase/client";
import { isSupabaseConfigured } from "../supabase/config";
import { loadRsbsaDraft } from "../rsbsaRepository";

export interface PrefilledField<T> {
  value: T;
  sourceLabel?: "From your account" | "From your saved profile" | "From your previous session" | null;
  isVerified?: boolean;
}

export interface OnboardingPrefillData {
  firstName: PrefilledField<string>;
  middleName: PrefilledField<string>;
  lastName: PrefilledField<string>;
  suffix: PrefilledField<string>;
  mobileNumber: PrefilledField<string>;
  email: PrefilledField<string>;
  preferredLanguage: PrefilledField<string>;
  
  region: PrefilledField<string>;
  province: PrefilledField<string>;
  cityMunicipality: PrefilledField<string>;
  barangay: PrefilledField<string>;

  livelihoodFarmer: PrefilledField<boolean>;
  livelihoodFisher: PrefilledField<boolean>;

  farmName: PrefilledField<string>;
  mainCommodity: PrefilledField<string>;

  fishingType: PrefilledField<string>;
  primaryFishingArea: PrefilledField<string>;
  mainSpecies: PrefilledField<string>;
}

export async function resolveOnboardingPrefill(
  userId: string,
  mode: ApplicationMode = "production"
): Promise<OnboardingPrefillData> {
  // Safe Defaults
  const result: OnboardingPrefillData = {
    firstName: { value: "", sourceLabel: null },
    middleName: { value: "", sourceLabel: null },
    lastName: { value: "", sourceLabel: null },
    suffix: { value: "", sourceLabel: null },
    mobileNumber: { value: "", sourceLabel: null },
    email: { value: "", sourceLabel: null },
    preferredLanguage: { value: "Filipino", sourceLabel: null },
    region: { value: "CAR", sourceLabel: null },
    province: { value: "Benguet", sourceLabel: null },
    cityMunicipality: { value: "Atok", sourceLabel: null },
    barangay: { value: "Sayangan", sourceLabel: null },
    livelihoodFarmer: { value: true, sourceLabel: null },
    livelihoodFisher: { value: false, sourceLabel: null },
    farmName: { value: "My Farm", sourceLabel: null },
    mainCommodity: { value: "Benguet Cabbage", sourceLabel: null },
    fishingType: { value: "Municipal Capture Fishing", sourceLabel: null },
    primaryFishingArea: { value: "Coastal Waters", sourceLabel: null },
    mainSpecies: { value: "Yellowfin Tuna", sourceLabel: null },
  };

  // DEMO MODE PREFILL
  if (mode === "demo") {
    const demoProfile = await demoDb.demoRsbsaProfiles.filter((p) => p.userId === userId).first();
    if (demoProfile) {
      result.firstName = { value: demoProfile.firstName, sourceLabel: "From your saved profile", isVerified: true };
      result.middleName = { value: demoProfile.middleName || "", sourceLabel: "From your saved profile" };
      result.lastName = { value: demoProfile.surname, sourceLabel: "From your saved profile", isVerified: true };
      result.mobileNumber = { value: demoProfile.mobileNumber, sourceLabel: "From your saved profile" };
      result.region = { value: demoProfile.region, sourceLabel: "From your saved profile" };
      result.province = { value: demoProfile.province, sourceLabel: "From your saved profile" };
      result.cityMunicipality = { value: demoProfile.cityMunicipality, sourceLabel: "From your saved profile" };
      result.barangay = { value: demoProfile.barangay, sourceLabel: "From your saved profile" };
      result.livelihoodFarmer = { value: demoProfile.livelihoodFarmer, sourceLabel: "From your saved profile" };
      result.livelihoodFisher = { value: demoProfile.livelihoodFisher, sourceLabel: "From your saved profile" };
      result.preferredLanguage = { value: demoProfile.preferredLanguage, sourceLabel: "From your saved profile" };
      if (demoProfile.primaryFarmName) result.farmName = { value: demoProfile.primaryFarmName, sourceLabel: "From your saved profile" };
      if (demoProfile.mainCommodity) result.mainCommodity = { value: demoProfile.mainCommodity, sourceLabel: "From your saved profile" };
      if (demoProfile.fishingType) result.fishingType = { value: demoProfile.fishingType, sourceLabel: "From your saved profile" };
      if (demoProfile.primaryFishingArea) result.primaryFishingArea = { value: demoProfile.primaryFishingArea, sourceLabel: "From your saved profile" };
      if (demoProfile.mainSpecies) result.mainSpecies = { value: demoProfile.mainSpecies, sourceLabel: "From your saved profile" };
      return result;
    }
  }

  // PRODUCTION MODE PREFILL
  // 1. Existing verified profile record from Dexie
  const existingRsbsa = await db.rsbsaProfiles.filter((p) => p.userId === userId).first();
  if (existingRsbsa) {
    result.firstName = { value: existingRsbsa.firstName, sourceLabel: "From your saved profile", isVerified: true };
    result.lastName = { value: existingRsbsa.surname, sourceLabel: "From your saved profile", isVerified: true };
    result.middleName = { value: existingRsbsa.middleName || "", sourceLabel: "From your saved profile" };
    result.suffix = { value: existingRsbsa.extensionName || "", sourceLabel: "From your saved profile" };
    result.livelihoodFarmer = { value: existingRsbsa.livelihoodFarmer, sourceLabel: "From your saved profile" };
    result.livelihoodFisher = { value: existingRsbsa.livelihoodFisher, sourceLabel: "From your saved profile" };
  }

  const existingAddress = await db.profileAddresses.filter((a) => a.userId === userId).first();
  if (existingAddress) {
    result.region = { value: existingAddress.region, sourceLabel: "From your saved profile" };
    result.province = { value: existingAddress.province, sourceLabel: "From your saved profile" };
    result.cityMunicipality = { value: existingAddress.cityMunicipality, sourceLabel: "From your saved profile" };
    result.barangay = { value: existingAddress.barangay, sourceLabel: "From your saved profile" };
  }

  const existingContact = await db.profileMobileContacts.filter((c) => c.userId === userId).first();
  if (existingContact) {
    result.mobileNumber = { value: existingContact.mobileNumber, sourceLabel: "From your saved profile" };
  }

  // 2. Auth User Metadata
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        result.email = { value: data.user.email || "", sourceLabel: "From your account" };
        const meta = data.user.user_metadata || {};
        if (meta.full_name && !result.firstName.value) {
          const parts = meta.full_name.split(" ");
          result.firstName = { value: parts[0] || "", sourceLabel: "From your account" };
          result.lastName = { value: parts.slice(1).join(" ") || "", sourceLabel: "From your account" };
        }
        if (meta.phone && !result.mobileNumber.value) {
          result.mobileNumber = { value: meta.phone, sourceLabel: "From your account" };
        }
        if (meta.province && !result.province.value) {
          result.province = { value: meta.province, sourceLabel: "From your account" };
        }
        if (meta.city_municipality && !result.cityMunicipality.value) {
          result.cityMunicipality = { value: meta.city_municipality, sourceLabel: "From your account" };
        }
      }
    } catch {
      // Fallback gracefully if auth request fails
    }
  }

  // 3. Saved Local Onboarding Draft
  const draft = await loadRsbsaDraft(userId);
  if (draft) {
    if (draft.firstName && !result.firstName.isVerified) {
      result.firstName = { value: draft.firstName, sourceLabel: "From your previous session" };
    }
    if (draft.surname && !result.lastName.isVerified) {
      result.lastName = { value: draft.surname, sourceLabel: "From your previous session" };
    }
    if (draft.mobileNumber) {
      result.mobileNumber = { value: draft.mobileNumber, sourceLabel: "From your previous session" };
    }
    if (draft.region) result.region = { value: draft.region, sourceLabel: "From your previous session" };
    if (draft.province) result.province = { value: draft.province, sourceLabel: "From your previous session" };
    if (draft.cityMunicipality) result.cityMunicipality = { value: draft.cityMunicipality, sourceLabel: "From your previous session" };
    if (draft.barangay) result.barangay = { value: draft.barangay, sourceLabel: "From your previous session" };
    if (typeof draft.livelihoodFarmer === "boolean") result.livelihoodFarmer = { value: draft.livelihoodFarmer, sourceLabel: "From your previous session" };
    if (typeof draft.livelihoodFisher === "boolean") result.livelihoodFisher = { value: draft.livelihoodFisher, sourceLabel: "From your previous session" };
  }

  return result;
}
