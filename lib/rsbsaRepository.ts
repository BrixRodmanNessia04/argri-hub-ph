import { db, createBaseEntity, RsbsaProfileEntity, ProfileAddressEntity, ProfileFarmParcelEntity, ProfileFisheriesEntity, ProfileConsentEntity } from "./db";
import { demoDb } from "./demoDb";
import { createClient } from "./supabase/client";
import { isSupabaseConfigured } from "./supabase/config";
import { saveFormDraft, loadFormDraft, clearFormDraft } from "./formDraftService";
import { ApplicationMode } from "./ApplicationContext";

export interface RsbsaFullProfileData {
  surname: string;
  firstName: string;
  middleName?: string;
  hasNoMiddleName?: boolean;
  extensionName?: string;
  hasNoExtensionName?: boolean;
  sex?: "male" | "female" | "other";
  dateOfBirth?: string;
  placeOfBirthMunicipality?: string;
  placeOfBirthProvinceStateCountry?: string;
  mothersMaidenFirstName?: string;
  mothersMaidenMiddleName?: string;
  mothersMaidenSurname?: string;
  mothersMaidenExtensionName?: string;
  civilStatus?: "single" | "married" | "widow_widower" | "legally_separated";
  spouseFirstName?: string;
  spouseMiddleName?: string;
  spouseSurname?: string;
  spouseExtensionName?: string;
  highestFormalEducation?: string;
  religion?: string;
  isIccIp?: boolean;
  iccIpName?: string;
  isPwd?: boolean;
  is4psBeneficiary?: boolean;
  
  livelihoodFarmer?: boolean;
  livelihoodFarmWorker?: boolean;
  livelihoodFisher?: boolean;
  livelihoodAgriYouth?: boolean;

  // Address
  region: string;
  province: string;
  cityMunicipality: string;
  barangay: string;
  houseLotBldgPurok?: string;
  streetSitioSubdivision?: string;

  // Mobile
  mobileNumber: string;
  isOwnedMobile?: boolean;
  mobileOwnerFullName?: string;
  mobileOwnerRelationship?: string;
  preferredLanguage?: string;

  // Memberships
  memberships?: string[];

  // Identity Doc
  idType?: string;
  idNumber?: string;
  philIdPcn?: string;
  transactionReferenceNumber?: string;
  documentImageUrl?: string;

  // Farmer Details
  farmName?: string;
  farmAreaHa?: number;
  tenureType?: string;
  mainCommodity?: string;
  croppingSchedule?: string;

  // Fisheries Details
  fishingType?: string;
  primaryFishingArea?: string;
  fishingAreaType?: string;
  mainSpecies?: string;
  usesVessel?: boolean;
  vesselName?: string;
  vesselType?: string;
  vesselOwnership?: string;
  vesselRegistrationNumber?: string;
  vesselCrewCapacity?: number;
  aquacultureSiteType?: string;

  // Consent
  printedName?: string;
  registrantPrintedName?: string;
  signatureMetadata?: string;
  privacyPolicyAcknowledged?: boolean;
  daDisclaimerAcknowledged?: boolean;
}

export async function saveRsbsaDraft(userId: string, data: Partial<RsbsaFullProfileData>): Promise<void> {
  const formId = `rsbsa_profile_${userId}`;
  await saveFormDraft(formId, data as Record<string, unknown>);
}

export async function loadRsbsaDraft(userId: string): Promise<Partial<RsbsaFullProfileData> | null> {
  const formId = `rsbsa_profile_${userId}`;
  return await loadFormDraft<Record<string, unknown>>(formId) as Partial<RsbsaFullProfileData> | null;
}

export async function clearRsbsaDraft(userId: string): Promise<void> {
  const formId = `rsbsa_profile_${userId}`;
  await clearFormDraft(formId);
}

export async function saveRsbsaProfile(
  userId: string,
  data: RsbsaFullProfileData,
  mode: ApplicationMode = "production"
): Promise<{ success: boolean; error?: string }> {
  if (mode === "demo") {
    try {
      const existing = await demoDb.demoRsbsaProfiles.filter((p) => p.userId === userId).first();
      const userRole: "farmer" | "fisher" | "farmer_and_fisher" = 
        (data.livelihoodFarmer && data.livelihoodFisher)
          ? "farmer_and_fisher"
          : data.livelihoodFisher
          ? "fisher"
          : "farmer";

      const payload = {
        localId: existing?.localId || `demo-profile-${Date.now()}`,
        userId,
        role: userRole,
        surname: data.surname,
        firstName: data.firstName,
        middleName: data.middleName || "",
        mobileNumber: data.mobileNumber,
        region: data.region,
        province: data.province,
        cityMunicipality: data.cityMunicipality,
        barangay: data.barangay,
        livelihoodFarmer: !!data.livelihoodFarmer,
        livelihoodFisher: !!data.livelihoodFisher,
        primaryFarmName: data.farmName,
        mainCommodity: data.mainCommodity,
        farmAreaHa: data.farmAreaHa,
        tenureType: data.tenureType,
        primaryFishingArea: data.primaryFishingArea,
        fishingType: data.fishingType,
        mainSpecies: data.mainSpecies,
        usesVessel: data.usesVessel,
        vesselName: data.vesselName,
        preferredLanguage: data.preferredLanguage || "English",
        registrationStatus: "verified" as const,
        profileCompletionPercentage: 100,
      };
      await demoDb.demoRsbsaProfiles.put(payload);
      await clearRsbsaDraft(userId);
      return { success: true };
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  }

  // Dexie local save first
  try {
    const base = createBaseEntity(userId);
    const rsbsaEntity: RsbsaProfileEntity = {
      ...base,
      surname: data.surname,
      firstName: data.firstName,
      middleName: data.middleName,
      hasNoMiddleName: !!data.hasNoMiddleName,
      extensionName: data.extensionName,
      hasNoExtensionName: data.hasNoExtensionName ?? true,
      sex: data.sex || null,
      dateOfBirth: data.dateOfBirth || null,
      placeOfBirthMunicipality: data.placeOfBirthMunicipality || null,
      placeOfBirthProvinceStateCountry: data.placeOfBirthProvinceStateCountry || null,
      mothersMaidenFirstName: data.mothersMaidenFirstName || null,
      mothersMaidenMiddleName: data.mothersMaidenMiddleName || null,
      mothersMaidenSurname: data.mothersMaidenSurname || null,
      mothersMaidenExtensionName: data.mothersMaidenExtensionName || null,
      civilStatus: data.civilStatus || null,
      spouseFirstName: data.spouseFirstName || null,
      spouseMiddleName: data.spouseMiddleName || null,
      spouseSurname: data.spouseSurname || null,
      spouseExtensionName: data.spouseExtensionName || null,
      highestFormalEducation: data.highestFormalEducation || null,
      religion: data.religion || null,
      isIccIp: !!data.isIccIp,
      iccIpName: data.iccIpName || null,
      isPwd: !!data.isPwd,
      is4psBeneficiary: !!data.is4psBeneficiary,
      livelihoodFarmer: !!data.livelihoodFarmer,
      livelihoodFarmWorker: !!data.livelihoodFarmWorker,
      livelihoodFisher: !!data.livelihoodFisher,
      livelihoodAgriYouth: !!data.livelihoodAgriYouth,
      registrationStatus: "submitted",
      profileCompletionPercentage: 100,
    };
    await db.rsbsaProfiles.put(rsbsaEntity);

    // Save address
    const addressEntity: ProfileAddressEntity = {
      ...base,
      addressType: "permanent",
      region: data.region,
      province: data.province,
      cityMunicipality: data.cityMunicipality,
      barangay: data.barangay,
      houseLotBldgPurok: data.houseLotBldgPurok,
      streetSitioSubdivision: data.streetSitioSubdivision,
    };
    await db.profileAddresses.put(addressEntity);

    if (data.livelihoodFarmer && data.mainCommodity) {
      const parcelEntity: ProfileFarmParcelEntity = {
        ...base,
        parcelNumber: 1,
        province: data.province,
        cityMunicipality: data.cityMunicipality,
        barangay: data.barangay,
        totalAreaHa: data.farmAreaHa || 1,
        withinAncestralDomain: false,
        isArbBeneficiary: false,
        tenureType: data.tenureType || "Registered Owner",
        mainCommodity: data.mainCommodity,
        croppingSchedule: data.croppingSchedule || "Whole year",
        isOrganic: false,
      };
      await db.profileFarmParcels.put(parcelEntity);
    }

    if (data.livelihoodFisher && data.mainSpecies) {
      const fisheriesEntity: ProfileFisheriesEntity = {
        ...base,
        fishingType: data.fishingType || "Municipal Capture Fishing",
        primaryFishingArea: data.primaryFishingArea || `${data.cityMunicipality} Waters`,
        mainSpecies: data.mainSpecies,
        usesVessel: !!data.usesVessel,
        vesselName: data.vesselName,
        vesselType: data.vesselType,
      };
      await db.profileFisheries.put(fisheriesEntity);
    }

    // Push to Supabase if available
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from("profiles").upsert({
        id: userId,
        full_name: `${data.firstName} ${data.surname}`,
        phone: data.mobileNumber,
        updated_at: new Date().toISOString(),
      });
    }

    await clearRsbsaDraft(userId);
    return { success: true };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}
