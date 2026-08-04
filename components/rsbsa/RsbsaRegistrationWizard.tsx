"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import Step1Account from "./Step1Account";
import Step2Livelihood from "./Step2Livelihood";
import Step3PersonalInfo from "./Step3PersonalInfo";
import Step4AddressContact from "./Step4AddressContact";
import Step5IdentityBackground from "./Step5IdentityBackground";
import Step6Memberships from "./Step6Memberships";
import Step7FarmerProduction from "./Step7FarmerProduction";
import Step7FisheriesProduction from "./Step7FisheriesProduction";
import Step8Documents from "./Step8Documents";
import Step9Consent from "./Step9Consent";
import Step10Review from "./Step10Review";
import { saveRsbsaDraft, loadRsbsaDraft, saveRsbsaProfile, RsbsaFullProfileData } from "@/lib/rsbsaRepository";
import { useApplicationContext } from "@/lib/ApplicationContext";
import { useAppRoute } from "@/lib/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function RsbsaRegistrationWizard({
  initialStep = 1,
}: {
  initialStep?: number;
}) {
  const router = useRouter();
  const buildRoute = useAppRoute();
  const { mode, userId, setRole } = useApplicationContext();

  const [step, setStep] = useState(initialStep);
  const [loading, setLoading] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [farmer, setFarmer] = useState(true);
  const [farmWorker, setFarmWorker] = useState(false);
  const [fisher, setFisher] = useState(false);
  const [agriYouth, setAgriYouth] = useState(false);

  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [hasNoMiddleName, setHasNoMiddleName] = useState(false);
  const [extensionName, setExtensionName] = useState("");
  const [hasNoExtensionName, setHasNoExtensionName] = useState(true);
  const [sex, setSex] = useState<"male" | "female" | "other">("male");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [civilStatus, setCivilStatus] = useState<"single" | "married" | "widow_widower" | "legally_separated">("single");
  const [spouseFirstName, setSpouseFirstName] = useState("");
  const [spouseMiddleName, setSpouseMiddleName] = useState("");
  const [spouseSurname, setSpouseSurname] = useState("");

  const [region, setRegion] = useState("CAR");
  const [province, setProvince] = useState("Benguet");
  const [cityMunicipality, setCityMunicipality] = useState("Atok");
  const [barangay, setBarangay] = useState("Sayangan");
  const [houseLotBldgPurok, setHouseLotBldgPurok] = useState("");
  const [streetSitioSubdivision, setStreetSitioSubdivision] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isOwnedMobile, setIsOwnedMobile] = useState(true);
  const [preferredLanguage, setPreferredLanguage] = useState("Filipino");

  const [idType, setIdType] = useState("PhilID / ePhilID");
  const [idNumber, setIdNumber] = useState("");
  const [philIdPcn, setPhilIdPcn] = useState("");
  const [transactionReferenceNumber, setTransactionReferenceNumber] = useState("");
  const [highestFormalEducation, setHighestFormalEducation] = useState("High School (non K-12)");
  const [religion, setReligion] = useState("Christianity");
  const [isIccIp, setIsIccIp] = useState(false);
  const [iccIpName, setIccIpName] = useState("");
  const [isPwd, setIsPwd] = useState(false);
  const [is4psBeneficiary, setIs4psBeneficiary] = useState(false);

  const [memberships, setMemberships] = useState<string[]>(["Benguet Farmers Agriculture Cooperative"]);

  const [farmName, setFarmName] = useState("My Farm");
  const [farmAreaHa, setFarmAreaHa] = useState(1.0);
  const [tenureType, setTenureType] = useState("Registered Owner");
  const [mainCommodity, setMainCommodity] = useState("Benguet Cabbage");
  const [croppingSchedule, setCroppingSchedule] = useState("Whole year");

  const [fishingType, setFishingType] = useState("Municipal Capture Fishing");
  const [primaryFishingArea, setPrimaryFishingArea] = useState("Coastal Waters");
  const [fishingAreaType, setFishingAreaType] = useState("municipal_waters");
  const [mainSpecies, setMainSpecies] = useState("Yellowfin Tuna");
  const [usesVessel, setUsesVessel] = useState(false);
  const [vesselName, setVesselName] = useState("");

  const [documentImageUrl, setDocumentImageUrl] = useState("");
  const [printedName, setPrintedName] = useState("");
  const [privacyPolicyAcknowledged, setPrivacyPolicyAcknowledged] = useState(true);
  const [daDisclaimerAcknowledged, setDaDisclaimerAcknowledged] = useState(true);

  useEffect(() => {
    void loadRsbsaDraft(userId).then((draft) => {
      if (draft) {
        if (draft.firstName) setFirstName(draft.firstName);
        if (draft.surname) setSurname(draft.surname);
        if (draft.middleName) setMiddleName(draft.middleName);
        if (draft.region) setRegion(draft.region);
        if (draft.province) setProvince(draft.province);
        if (draft.cityMunicipality) setCityMunicipality(draft.cityMunicipality);
        if (draft.barangay) setBarangay(draft.barangay);
        if (draft.mobileNumber) setMobileNumber(draft.mobileNumber);
        if (typeof draft.livelihoodFarmer === "boolean") setFarmer(draft.livelihoodFarmer);
        if (typeof draft.livelihoodFisher === "boolean") setFisher(draft.livelihoodFisher);
      }
    });
  }, [userId]);

  const stepTitles: Record<number, string> = {
    1: "Account Credentials",
    2: "Livelihood Profile",
    3: "Personal Information",
    4: "Address & Mobile Contact",
    5: "Identity & Demographics",
    6: "Organization Memberships",
    7: fisher && !farmer ? "Fisheries Production Setup" : "Farm Parcel Setup",
    8: "Supporting Documents",
    9: "Consent Declaration",
    10: "Review & Submit",
  };

  const handleNextStep = async () => {
    const currentData: Partial<RsbsaFullProfileData> = {
      firstName,
      surname,
      middleName,
      hasNoMiddleName,
      extensionName,
      hasNoExtensionName,
      sex,
      dateOfBirth,
      civilStatus,
      spouseFirstName,
      spouseMiddleName,
      spouseSurname,
      region,
      province,
      cityMunicipality,
      barangay,
      houseLotBldgPurok,
      streetSitioSubdivision,
      mobileNumber,
      isOwnedMobile,
      preferredLanguage,
      idType,
      idNumber,
      philIdPcn,
      transactionReferenceNumber,
      highestFormalEducation,
      religion,
      isIccIp,
      iccIpName,
      isPwd,
      is4psBeneficiary,
      livelihoodFarmer: farmer,
      livelihoodFarmWorker: farmWorker,
      livelihoodFisher: fisher,
      livelihoodAgriYouth: agriYouth,
      memberships,
      farmName,
      farmAreaHa,
      tenureType,
      mainCommodity,
      croppingSchedule,
      fishingType,
      primaryFishingArea,
      fishingAreaType,
      mainSpecies,
      usesVessel,
      vesselName,
      documentImageUrl,
      printedName,
      privacyPolicyAcknowledged,
      daDisclaimerAcknowledged,
    };

    await saveRsbsaDraft(userId, currentData);

    if (step < 10) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmitProfile = async () => {
    setLoading(true);
    const fullData: RsbsaFullProfileData = {
      surname: surname || "dela Cruz",
      firstName: firstName || "Juan",
      middleName,
      hasNoMiddleName,
      extensionName,
      hasNoExtensionName,
      sex,
      dateOfBirth,
      civilStatus,
      spouseFirstName,
      spouseMiddleName,
      spouseSurname,
      region: region || "CAR",
      province: province || "Benguet",
      cityMunicipality: cityMunicipality || "Atok",
      barangay: barangay || "Sayangan",
      houseLotBldgPurok,
      streetSitioSubdivision,
      mobileNumber: mobileNumber || "0917-123-4567",
      isOwnedMobile,
      preferredLanguage,
      idType,
      idNumber,
      philIdPcn,
      transactionReferenceNumber,
      highestFormalEducation,
      religion,
      isIccIp,
      iccIpName,
      isPwd,
      is4psBeneficiary,
      livelihoodFarmer: farmer,
      livelihoodFarmWorker: farmWorker,
      livelihoodFisher: fisher,
      livelihoodAgriYouth: agriYouth,
      memberships,
      farmName,
      farmAreaHa,
      tenureType,
      mainCommodity,
      croppingSchedule,
      fishingType,
      primaryFishingArea,
      fishingAreaType,
      mainSpecies,
      usesVessel,
      vesselName,
      documentImageUrl,
      printedName: printedName || `${firstName} ${surname}`,
      privacyPolicyAcknowledged,
      daDisclaimerAcknowledged,
    };

    await saveRsbsaProfile(userId, fullData, mode);

    if (fisher && !farmer) {
      setRole("fisher");
    } else {
      setRole("farmer");
    }

    setLoading(false);
    const targetPath = fisher && !farmer ? "/fisher" : "/farmer";
    router.replace(buildRoute(targetPath));
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <OnboardingHeader
        currentStep={step}
        totalSteps={10}
        title={stepTitles[step] || "RSBSA Digital Registration"}
        subtitle="Official January 2024 RSBSA Enrollment Form Workflow"
        onBack={step > 1 ? handlePrevStep : undefined}
      />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-white border border-[#dce9df] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {step === 1 && (
            <Step1Account
              fullName={fullName}
              email={email}
              phone={phone}
              onChange={(u) => {
                if (u.fullName) setFullName(u.fullName);
                if (u.email) setEmail(u.email);
                if (u.phone) setPhone(u.phone);
              }}
            />
          )}

          {step === 2 && (
            <Step2Livelihood
              farmer={farmer}
              farmWorker={farmWorker}
              fisher={fisher}
              agriYouth={agriYouth}
              onChange={(u) => {
                if (typeof u.farmer === "boolean") setFarmer(u.farmer);
                if (typeof u.fisher === "boolean") setFisher(u.fisher);
                if (typeof u.farmWorker === "boolean") setFarmWorker(u.farmWorker);
                if (typeof u.agriYouth === "boolean") setAgriYouth(u.agriYouth);
              }}
            />
          )}

          {step === 3 && (
            <Step3PersonalInfo
              surname={surname}
              firstName={firstName}
              middleName={middleName}
              hasNoMiddleName={hasNoMiddleName}
              extensionName={extensionName}
              hasNoExtensionName={hasNoExtensionName}
              sex={sex}
              dateOfBirth={dateOfBirth}
              civilStatus={civilStatus}
              spouseFirstName={spouseFirstName}
              spouseMiddleName={spouseMiddleName}
              spouseSurname={spouseSurname}
              onChange={(u) => {
                if (typeof u.surname === "string") setSurname(u.surname);
                if (typeof u.firstName === "string") setFirstName(u.firstName);
                if (typeof u.middleName === "string") setMiddleName(u.middleName);
                if (typeof u.hasNoMiddleName === "boolean") setHasNoMiddleName(u.hasNoMiddleName);
                if (typeof u.extensionName === "string") setExtensionName(u.extensionName);
                if (typeof u.hasNoExtensionName === "boolean") setHasNoExtensionName(u.hasNoExtensionName);
                if (u.sex) setSex(u.sex);
                if (u.dateOfBirth) setDateOfBirth(u.dateOfBirth);
                if (u.civilStatus) setCivilStatus(u.civilStatus);
                if (typeof u.spouseFirstName === "string") setSpouseFirstName(u.spouseFirstName);
                if (typeof u.spouseMiddleName === "string") setSpouseMiddleName(u.spouseMiddleName);
                if (typeof u.spouseSurname === "string") setSpouseSurname(u.spouseSurname);
              }}
            />
          )}

          {step === 4 && (
            <Step4AddressContact
              region={region}
              province={province}
              cityMunicipality={cityMunicipality}
              barangay={barangay}
              houseLotBldgPurok={houseLotBldgPurok}
              streetSitioSubdivision={streetSitioSubdivision}
              mobileNumber={mobileNumber}
              isOwnedMobile={isOwnedMobile}
              preferredLanguage={preferredLanguage}
              onChange={(u) => {
                if (u.region) setRegion(u.region);
                if (u.province) setProvince(u.province);
                if (u.cityMunicipality) setCityMunicipality(u.cityMunicipality);
                if (u.barangay) setBarangay(u.barangay);
                if (typeof u.houseLotBldgPurok === "string") setHouseLotBldgPurok(u.houseLotBldgPurok);
                if (typeof u.streetSitioSubdivision === "string") setStreetSitioSubdivision(u.streetSitioSubdivision);
                if (u.mobileNumber) setMobileNumber(u.mobileNumber);
                if (typeof u.isOwnedMobile === "boolean") setIsOwnedMobile(u.isOwnedMobile);
                if (u.preferredLanguage) setPreferredLanguage(u.preferredLanguage);
              }}
              mode={mode}
            />
          )}

          {step === 5 && (
            <Step5IdentityBackground
              idType={idType}
              idNumber={idNumber}
              philIdPcn={philIdPcn}
              transactionReferenceNumber={transactionReferenceNumber}
              highestFormalEducation={highestFormalEducation}
              religion={religion}
              isIccIp={isIccIp}
              iccIpName={iccIpName}
              isPwd={isPwd}
              is4psBeneficiary={is4psBeneficiary}
              onChange={(u) => {
                if (u.idType) setIdType(u.idType);
                if (typeof u.idNumber === "string") setIdNumber(u.idNumber);
                if (typeof u.philIdPcn === "string") setPhilIdPcn(u.philIdPcn);
                if (typeof u.transactionReferenceNumber === "string") setTransactionReferenceNumber(u.transactionReferenceNumber);
                if (u.highestFormalEducation) setHighestFormalEducation(u.highestFormalEducation);
                if (u.religion) setReligion(u.religion);
                if (typeof u.isIccIp === "boolean") setIsIccIp(u.isIccIp);
                if (typeof u.iccIpName === "string") setIccIpName(u.iccIpName);
                if (typeof u.isPwd === "boolean") setIsPwd(u.isPwd);
                if (typeof u.is4psBeneficiary === "boolean") setIs4psBeneficiary(u.is4psBeneficiary);
              }}
            />
          )}

          {step === 6 && (
            <Step6Memberships
              memberships={memberships}
              onChange={(list) => setMemberships(list)}
            />
          )}

          {step === 7 && (
            <div className="space-y-6">
              {farmer && (
                <Step7FarmerProduction
                  farmName={farmName}
                  farmAreaHa={farmAreaHa}
                  tenureType={tenureType}
                  mainCommodity={mainCommodity}
                  croppingSchedule={croppingSchedule}
                  onChange={(u) => {
                    if (u.farmName) setFarmName(u.farmName);
                    if (u.farmAreaHa) setFarmAreaHa(u.farmAreaHa);
                    if (u.tenureType) setTenureType(u.tenureType);
                    if (u.mainCommodity) setMainCommodity(u.mainCommodity);
                    if (u.croppingSchedule) setCroppingSchedule(u.croppingSchedule);
                  }}
                  mode={mode}
                />
              )}

              {fisher && (
                <Step7FisheriesProduction
                  fishingType={fishingType}
                  primaryFishingArea={primaryFishingArea}
                  fishingAreaType={fishingAreaType}
                  mainSpecies={mainSpecies}
                  usesVessel={usesVessel}
                  vesselName={vesselName}
                  onChange={(u) => {
                    if (u.fishingType) setFishingType(u.fishingType);
                    if (u.primaryFishingArea) setPrimaryFishingArea(u.primaryFishingArea);
                    if (u.fishingAreaType) setFishingAreaType(u.fishingAreaType);
                    if (u.mainSpecies) setMainSpecies(u.mainSpecies);
                    if (typeof u.usesVessel === "boolean") setUsesVessel(u.usesVessel);
                    if (typeof u.vesselName === "string") setVesselName(u.vesselName);
                  }}
                  mode={mode}
                />
              )}
            </div>
          )}

          {step === 8 && (
            <Step8Documents
              documentImageUrl={documentImageUrl}
              onChange={(url) => setDocumentImageUrl(url)}
            />
          )}

          {step === 9 && (
            <Step9Consent
              printedName={printedName || `${firstName} ${surname}`}
              privacyPolicyAcknowledged={privacyPolicyAcknowledged}
              daDisclaimerAcknowledged={daDisclaimerAcknowledged}
              onChange={(u) => {
                if (typeof u.printedName === "string") setPrintedName(u.printedName);
                if (typeof u.privacyPolicyAcknowledged === "boolean") setPrivacyPolicyAcknowledged(u.privacyPolicyAcknowledged);
                if (typeof u.daDisclaimerAcknowledged === "boolean") setDaDisclaimerAcknowledged(u.daDisclaimerAcknowledged);
              }}
            />
          )}

          {step === 10 && (
            <Step10Review
              data={{
                firstName,
                surname,
                middleName,
                mobileNumber,
                sex,
                civilStatus,
                region,
                province,
                cityMunicipality,
                barangay,
                livelihoodFarmer: farmer,
                livelihoodFisher: fisher,
                farmName,
                farmAreaHa,
                mainCommodity,
                tenureType,
                fishingType,
                primaryFishingArea,
                mainSpecies,
                usesVessel,
                vesselName,
              }}
              onEditStep={(s) => setStep(s)}
              onSubmit={handleSubmitProfile}
              loading={loading}
            />
          )}

          {/* Navigation Controls */}
          {step < 10 && (
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full sm:flex-1 py-3 rounded-2xl bg-white border border-[#dce9df] text-[#163025] font-bold text-xs hover:bg-[#f4f9f5] transition-all flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full sm:flex-1 py-3.5 rounded-2xl bg-[#059669] text-white font-extrabold text-xs sm:text-sm hover:bg-[#047857] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
