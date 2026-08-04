"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import LivelihoodStep, { LivelihoodData } from "./LivelihoodStep";
import BasicProfileStep, { BasicProfileData } from "./BasicProfileStep";
import AddressStep, { AddressData } from "./AddressStep";
import FarmerQuickSetupStep, { FarmerQuickSetupData } from "./FarmerQuickSetupStep";
import FisherQuickSetupStep, { FisherQuickSetupData } from "./FisherQuickSetupStep";
import RsbsaProfileReview from "@/components/rsbsa/RsbsaProfileReview";
import RsbsaDisclaimerBanner from "@/components/rsbsa/RsbsaDisclaimerBanner";
import { resolveOnboardingPrefill } from "@/lib/onboarding/prefillService";
import { saveOnboardingDraft, loadOnboardingDraft, clearOnboardingDraft } from "@/lib/onboarding/draftService";
import { saveRsbsaProfile } from "@/lib/rsbsaRepository";
import { useProducerWorkspace } from "@/lib/producerContext";
import { Sprout, Fish, ShieldCheck, Zap, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

interface ProducerOnboardingFlowProps {
  initialStep?: number;
}

export default function ProducerOnboardingFlow({
  initialStep = 1,
}: ProducerOnboardingFlowProps) {
  const router = useRouter();
  const { mode, role, userId, buildPath } = useProducerWorkspace();

  const [step, setStep] = useState(initialStep);
  const [loading, setLoading] = useState(false);
  const [sourceLabel, setSourceLabel] = useState<string | null>(null);

  // Form State
  const [livelihood, setLivelihood] = useState<LivelihoodData>({
    livelihoodFarmer: role === "farmer",
    livelihoodFisher: role === "fisher",
    livelihoodFarmWorker: false,
    livelihoodAgriYouth: false,
  });

  const [basicProfile, setBasicProfile] = useState<BasicProfileData>({
    firstName: "",
    middleName: "",
    surname: "",
    extensionName: "",
    hasNoMiddleName: false,
    hasNoExtensionName: true,
    sex: "male",
    dateOfBirth: "",
    civilStatus: "single",
    mobileNumber: "",
    isOwnedMobile: true,
    preferredLanguage: "Filipino",
  });

  const [address, setAddress] = useState<AddressData>({
    region: "CAR",
    province: "Benguet",
    cityMunicipality: "Atok",
    barangay: "Sayangan",
    houseLotBldgPurok: "",
    streetSitioSubdivision: "",
  });

  const [farmerSetup, setFarmerSetup] = useState<FarmerQuickSetupData>({
    farmName: "Atok Highland Terrace",
    mainCommodity: "Benguet Cabbage",
    farmAreaHa: 1.5,
    tenureType: "Registered Owner",
    croppingSchedule: "Whole year",
  });

  const [fisherSetup, setFisherSetup] = useState<FisherQuickSetupData>({
    fishingType: "Municipal Capture Fishing",
    primaryFishingArea: "Bolinao Coastal Waters",
    fishingAreaType: "municipal_waters",
    mainSpecies: "Yellowfin Tuna",
    usesVessel: true,
    vesselName: "M/B St. Peter",
    vesselType: "Motorized Banka",
  });

  useEffect(() => {
    void resolveOnboardingPrefill(userId, mode).then((prefill) => {
      setBasicProfile((prev) => ({
        ...prev,
        firstName: prefill.firstName.value || prev.firstName,
        middleName: prefill.middleName.value || prev.middleName,
        surname: prefill.lastName.value || prev.surname,
        mobileNumber: prefill.mobileNumber.value || prev.mobileNumber,
        preferredLanguage: prefill.preferredLanguage.value || prev.preferredLanguage,
      }));

      setAddress((prev) => ({
        ...prev,
        region: prefill.region.value || prev.region,
        province: prefill.province.value || prev.province,
        cityMunicipality: prefill.cityMunicipality.value || prev.cityMunicipality,
        barangay: prefill.barangay.value || prev.barangay,
      }));

      setFarmerSetup((prev) => ({
        ...prev,
        farmName: prefill.farmName?.value || prev.farmName,
        mainCommodity: prefill.mainCommodity?.value || prev.mainCommodity,
      }));

      setFisherSetup((prev) => ({
        ...prev,
        fishingType: prefill.fishingType?.value || prev.fishingType,
        primaryFishingArea: prefill.primaryFishingArea?.value || prev.primaryFishingArea,
        mainSpecies: prefill.mainSpecies?.value || prev.mainSpecies,
      }));

      setSourceLabel(prefill.firstName.sourceLabel || null);
    });

    void loadOnboardingDraft(userId).then((draft) => {
      if (draft) {
        if (typeof draft.livelihoodFarmer === "boolean") {
          setLivelihood((prev) => ({
            ...prev,
            livelihoodFarmer: !!draft.livelihoodFarmer,
            livelihoodFisher: !!draft.livelihoodFisher,
          }));
        }
        if (draft.firstName) {
          setBasicProfile((prev) => ({
            ...prev,
            firstName: draft.firstName || "",
            middleName: draft.middleName || "",
            surname: draft.surname || "",
            mobileNumber: draft.mobileNumber || "",
            preferredLanguage: draft.preferredLanguage || "Filipino",
          }));
        }
        if (draft.region) {
          setAddress((prev) => ({
            ...prev,
            region: draft.region || "CAR",
            province: draft.province || "Benguet",
            cityMunicipality: draft.cityMunicipality || "Atok",
            barangay: draft.barangay || "Sayangan",
          }));
        }
      }
    });
  }, [userId, mode]);

  const handleCompleteLater = () => {
    const dashboardRoute = role === "fisher" ? "/fisher" : "/farmer";
    router.push(buildPath(dashboardRoute));
  };

  const handleNext = async () => {
    // Auto-save draft
    await saveOnboardingDraft(userId, {
      step: step + 1,
      firstName: basicProfile.firstName,
      middleName: basicProfile.middleName,
      surname: basicProfile.surname,
      mobileNumber: basicProfile.mobileNumber,
      preferredLanguage: basicProfile.preferredLanguage,
      livelihoodFarmer: livelihood.livelihoodFarmer,
      livelihoodFisher: livelihood.livelihoodFisher,
      region: address.region,
      province: address.province,
      cityMunicipality: address.cityMunicipality,
      barangay: address.barangay,
      farmName: farmerSetup.farmName,
      mainCommodity: farmerSetup.mainCommodity,
      farmAreaHa: farmerSetup.farmAreaHa,
      fishingType: fisherSetup.fishingType,
      primaryFishingArea: fisherSetup.primaryFishingArea,
      mainSpecies: fisherSetup.mainSpecies,
    });

    if (step < 6) {
      setStep(step + 1);
    } else {
      // Final Submit / Finish
      setLoading(true);
      const res = await saveRsbsaProfile(
        userId,
        {
          firstName: basicProfile.firstName,
          middleName: basicProfile.middleName,
          surname: basicProfile.surname,
          extensionName: basicProfile.extensionName,
          hasNoMiddleName: basicProfile.hasNoMiddleName,
          hasNoExtensionName: basicProfile.hasNoExtensionName,
          sex: basicProfile.sex,
          dateOfBirth: basicProfile.dateOfBirth,
          civilStatus: basicProfile.civilStatus,
          mobileNumber: basicProfile.mobileNumber,
          isOwnedMobile: basicProfile.isOwnedMobile,
          preferredLanguage: basicProfile.preferredLanguage,
          livelihoodFarmer: livelihood.livelihoodFarmer,
          livelihoodFisher: livelihood.livelihoodFisher,
          livelihoodFarmWorker: livelihood.livelihoodFarmWorker,
          livelihoodAgriYouth: livelihood.livelihoodAgriYouth,
          region: address.region,
          province: address.province,
          cityMunicipality: address.cityMunicipality,
          barangay: address.barangay,
          houseLotBldgPurok: address.houseLotBldgPurok,
          streetSitioSubdivision: address.streetSitioSubdivision,
          farmName: farmerSetup.farmName,
          farmAreaHa: farmerSetup.farmAreaHa,
          tenureType: farmerSetup.tenureType,
          mainCommodity: farmerSetup.mainCommodity,
          croppingSchedule: farmerSetup.croppingSchedule,
          fishingType: fisherSetup.fishingType,
          primaryFishingArea: fisherSetup.primaryFishingArea,
          fishingAreaType: fisherSetup.fishingAreaType,
          mainSpecies: fisherSetup.mainSpecies,
          usesVessel: fisherSetup.usesVessel,
          vesselName: fisherSetup.vesselName,
          vesselType: fisherSetup.vesselType,
          printedName: `${basicProfile.firstName} ${basicProfile.surname}`,
          privacyPolicyAcknowledged: true,
          daDisclaimerAcknowledged: true,
        },
        mode
      );

      setLoading(false);
      if (res.success) {
        await clearOnboardingDraft(userId);
        const targetDash = role === "fisher" ? "/fisher" : "/farmer";
        router.push(buildPath(targetDash));
      } else {
        alert(`Failed to save onboarding setup: ${res.error || "Unknown error"}`);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Welcome to AgriHub PH";
      case 2:
        return "Livelihood Selection";
      case 3:
        return "Personal Information";
      case 4:
        return "Permanent Location";
      case 5:
        return role === "fisher" ? "Fisheries Production Setup" : "Farm & Crop Setup";
      case 6:
        return "Review & Confirm Onboarding";
      default:
        return "AgriHub Onboarding";
    }
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <OnboardingHeader
        currentStep={step}
        totalSteps={6}
        title={getStepTitle()}
        subtitle={`Operational setup (${mode === "demo" ? "Public Demo Mode" : "Production Account"})`}
        onBack={step > 1 ? handleBack : undefined}
      />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl bg-white border border-[#dce9df] rounded-3xl p-5 sm:p-8 shadow-xl space-y-6">
          {/* STEP 1: WELCOME */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[#059669] text-white mx-auto flex items-center justify-center shadow-md">
                  {role === "fisher" ? <Fish className="w-8 h-8" /> : <Sprout className="w-8 h-8" />}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-[#163025] leading-snug">
                  Let&apos;s set up your {role === "fisher" ? "Fisherfolk" : "Farmer"} Workspace
                </h1>
                <p className="text-xs sm:text-sm text-[#52796f] leading-relaxed">
                  We&apos;ll help you get operational in just a few quick steps.
                </p>
              </div>

              <div className="bg-[#f4f9f5] border border-[#dce9df] rounded-2xl p-4 space-y-3 text-xs text-[#163025]">
                <div className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span><strong>Takes only 2–3 minutes:</strong> Minimum operational setup required to start using workspace tools.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span><strong>Smart Prefills:</strong> We populated known details from your account &amp; location metadata.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span><strong>Complete Profile Later:</strong> Full RSBSA alignment sections can be filled in anytime from your profile.</span>
                </div>
              </div>

              <RsbsaDisclaimerBanner compact />
            </div>
          )}

          {/* STEP 2: LIVELIHOOD */}
          {step === 2 && (
            <LivelihoodStep
              data={livelihood}
              onChange={(updated) => setLivelihood((prev) => ({ ...prev, ...updated }))}
              mode={mode}
            />
          )}

          {/* STEP 3: PERSONAL INFO */}
          {step === 3 && (
            <BasicProfileStep
              data={basicProfile}
              onChange={(updated) => setBasicProfile((prev) => ({ ...prev, ...updated }))}
              sourceLabel={sourceLabel}
              mode={mode}
            />
          )}

          {/* STEP 4: LOCATION */}
          {step === 4 && (
            <AddressStep
              data={address}
              onChange={(updated) => setAddress((prev) => ({ ...prev, ...updated }))}
              mode={mode}
            />
          )}

          {/* STEP 5: PRODUCTION QUICK SETUP */}
          {step === 5 && (
            role === "fisher" ? (
              <FisherQuickSetupStep
                data={fisherSetup}
                onChange={(updated) => setFisherSetup((prev) => ({ ...prev, ...updated }))}
                mode={mode}
              />
            ) : (
              <FarmerQuickSetupStep
                data={farmerSetup}
                onChange={(updated) => setFarmerSetup((prev) => ({ ...prev, ...updated }))}
                mode={mode}
              />
            )
          )}

          {/* STEP 6: REVIEW */}
          {step === 6 && (
            <RsbsaProfileReview
              data={{
                firstName: basicProfile.firstName,
                middleName: basicProfile.middleName,
                surname: basicProfile.surname,
                mobileNumber: basicProfile.mobileNumber,
                preferredLanguage: basicProfile.preferredLanguage,
                sex: basicProfile.sex,
                dateOfBirth: basicProfile.dateOfBirth,
                civilStatus: basicProfile.civilStatus,
                region: address.region,
                province: address.province,
                cityMunicipality: address.cityMunicipality,
                barangay: address.barangay,
                livelihoodFarmer: livelihood.livelihoodFarmer,
                livelihoodFisher: livelihood.livelihoodFisher,
                farmName: farmerSetup.farmName,
                farmAreaHa: farmerSetup.farmAreaHa,
                tenureType: farmerSetup.tenureType,
                mainCommodity: farmerSetup.mainCommodity,
                fishingType: fisherSetup.fishingType,
                primaryFishingArea: fisherSetup.primaryFishingArea,
                mainSpecies: fisherSetup.mainSpecies,
                usesVessel: fisherSetup.usesVessel,
                vesselName: fisherSetup.vesselName,
                printedName: `${basicProfile.firstName} ${basicProfile.surname}`,
              }}
              onEditSection={(sectionKey) => {
                if (sectionKey === "personal") setStep(3);
                else if (sectionKey === "address") setStep(4);
                else if (sectionKey === "farm-parcels") setStep(5);
              }}
              isWizardMode={true}
            />
          )}

          {/* ACTION BUTTONS */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              disabled={loading}
              onClick={handleNext}
              className="w-full py-3.5 rounded-2xl bg-[#059669] text-white font-extrabold text-sm hover:bg-[#047857] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{step === 6 ? (loading ? "Saving Setup..." : "Complete Setup & Launch Workspace") : "Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleCompleteLater}
              className="w-full py-3 rounded-2xl bg-white border border-[#dce9df] text-[#52796f] font-bold text-xs hover:bg-[#f4f9f5] transition-all text-center"
            >
              Complete Later (Go to Workspace)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
