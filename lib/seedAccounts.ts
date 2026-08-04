import { db, createBaseEntity } from "./db";
import { demoDb } from "./demoDb";

export interface SampleAccount {
  role: "coop" | "farmer" | "buyer";
  email: string;
  passwordText: string;
  fullName: string;
  organizationName?: string;
  registrationNo?: string;
  userId: string;
}

export const SAMPLE_ACCOUNTS: SampleAccount[] = [
  {
    role: "coop",
    email: "coop.admin@agrihub.ph",
    passwordText: "CoopManager2026!",
    fullName: "Benguet Coop Manager",
    organizationName: "Benguet Highland Farmers Agricultural Cooperative",
    registrationNo: "CDA-9520-10023451",
    userId: "11111111-1111-4111-a111-111111111111",
  },
  {
    role: "farmer",
    email: "juan.farmer@agrihub.ph",
    passwordText: "FarmerJuan2026!",
    fullName: "Juanito Dela Cruz",
    organizationName: "Benguet Highland Farmers Agricultural Cooperative",
    userId: "22222222-2222-4222-a222-222222222222",
  },
  {
    role: "buyer",
    email: "buyer.santos@agrihub.ph",
    passwordText: "ManilaBuyer2026!",
    fullName: "Maria Santos",
    organizationName: "Metro Manila Fresh Harvest Wholesalers Inc.",
    registrationNo: "TIN-102-345-678-000",
    userId: "33333333-3333-4333-a333-333333333333",
  },
];

export async function seedSampleAccountsIntoDexie(): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const farmerUserId = "22222222-2222-4222-a222-222222222222";
    const coopOrgId = "c0000000-0000-4000-a000-000000000001";

    // 1. Seed RSBSA Profile for Farmer Juanito connected to Coop BHFAC
    const existingFarmerRsbsa = await db.rsbsaProfiles.filter((p) => p.userId === farmerUserId).first();
    if (!existingFarmerRsbsa) {
      await db.rsbsaProfiles.add({
        ...createBaseEntity(farmerUserId, coopOrgId),
        localId: "rsbsa-juanito-001",
        transactionCode: "TX-2026-BHFAC-001",
        philIdPcn: "1234-5678-9012-3456",
        rsbsaNumber: "RSBSA-14-11-02-004-001289",
        surname: "Dela Cruz",
        firstName: "Juanito",
        middleName: "Bautista",
        hasNoMiddleName: false,
        extensionName: "",
        hasNoExtensionName: true,
        sex: "male",
        dateOfBirth: "1985-06-15",
        civilStatus: "married",
        highestFormalEducation: "High School (non K-12)",
        religion: "Christianity",
        isIccIp: false,
        isPwd: false,
        is4psBeneficiary: false,
        livelihoodFarmer: true,
        livelihoodFarmWorker: false,
        livelihoodFisher: false,
        livelihoodAgriYouth: false,
        registrationStatus: "verified",
        profileCompletionPercentage: 100,
      });

      // Address
      await db.profileAddresses.add({
        ...createBaseEntity(farmerUserId, coopOrgId),
        localId: "addr-juanito-001",
        addressType: "permanent",
        houseLotBldgPurok: "Purok 3",
        streetSitioSubdivision: "Sitio Sayangan",
        barangay: "Sayangan",
        cityMunicipality: "Atok",
        province: "Benguet",
        region: "CAR",
      });

      // Mobile
      await db.profileMobileContacts.add({
        ...createBaseEntity(farmerUserId, coopOrgId),
        localId: "mobile-juanito-001",
        mobileNumber: "0917-555-0202",
        isOwned: true,
      });

      // Membership linking Farmer to Coop
      await db.profileMemberships.add({
        ...createBaseEntity(farmerUserId, coopOrgId),
        localId: "mem-juanito-001",
        organizationName: "Benguet Highland Farmers Agricultural Cooperative",
        organizationType: "fca_ia_coop",
      });

      // Farm Entity
      await db.farms.add({
        ...createBaseEntity(farmerUserId, coopOrgId),
        localId: "farm-juanito-atok-1",
        name: "Atok Highland Terrace Farm",
        location: "Sayangan, Atok, Benguet",
        areaHectares: 1.8,
        primaryCrop: "Benguet Cabbage",
        notes: "Connected to Benguet Highland Farmers Agricultural Cooperative (BHFAC)",
      });
    }

    // 2. Seed Demo Profiles in demoDb for instant demo mode parity
    const existingDemoProfile = await demoDb.demoRsbsaProfiles.filter((p) => p.userId === farmerUserId).first();
    if (!existingDemoProfile) {
      await demoDb.demoRsbsaProfiles.add({
        localId: "demo-rsbsa-juanito",
        userId: farmerUserId,
        role: "farmer",
        rsbsaNumber: "RSBSA-14-11-02-004-001289",
        surname: "Dela Cruz",
        firstName: "Juanito",
        middleName: "Bautista",
        mobileNumber: "0917-555-0202",
        region: "CAR",
        province: "Benguet",
        cityMunicipality: "Atok",
        barangay: "Sayangan",
        livelihoodFarmer: true,
        livelihoodFisher: false,
        preferredLanguage: "Filipino",
        primaryFarmName: "Atok Highland Terrace Farm",
        mainCommodity: "Benguet Cabbage",
        registrationStatus: "verified",
        profileCompletionPercentage: 100,
      });
    }
  } catch (err) {
    console.warn("Dexie account auto-seed warning:", err);
  }
}
