import { saveFormDraft, loadFormDraft, clearFormDraft } from "../formDraftService";

export interface OnboardingDraftPayload {
  step: number;
  firstName: string;
  middleName?: string;
  surname: string;
  extensionName?: string;
  hasNoMiddleName: boolean;
  hasNoExtensionName: boolean;
  mobileNumber: string;
  isOwnedMobile: boolean;
  preferredLanguage: string;
  
  livelihoodFarmer: boolean;
  livelihoodFisher: boolean;
  livelihoodFarmWorker: boolean;
  livelihoodAgriYouth: boolean;

  region: string;
  province: string;
  cityMunicipality: string;
  barangay: string;
  houseLotBldgPurok?: string;
  streetSitioSubdivision?: string;

  farmName?: string;
  farmAreaHa?: number;
  tenureType?: string;
  mainCommodity?: string;
  croppingSchedule?: string;

  fishingType?: string;
  primaryFishingArea?: string;
  fishingAreaType?: string;
  mainSpecies?: string;
  usesVessel?: boolean;
  vesselName?: string;
  vesselType?: string;
  vesselOwnership?: string;
  
  updatedAt: string;
}

export async function saveOnboardingDraft(userId: string, payload: Partial<OnboardingDraftPayload>): Promise<void> {
  const key = `onboarding_draft_${userId}`;
  await saveFormDraft(key, { ...payload, updatedAt: new Date().toISOString() } as Record<string, unknown>);
}

export async function loadOnboardingDraft(userId: string): Promise<Partial<OnboardingDraftPayload> | null> {
  const key = `onboarding_draft_${userId}`;
  return await loadFormDraft<Record<string, unknown>>(key) as Partial<OnboardingDraftPayload> | null;
}

export async function clearOnboardingDraft(userId: string): Promise<void> {
  const key = `onboarding_draft_${userId}`;
  await clearFormDraft(key);
}
