"use client";

import FishingOperationsPage from "@/app/producer/fishing/page";
import { ApplicationContextProvider } from "@/lib/ApplicationContext";

export default function FisheriesWorkspacePage() {
  return (
    <ApplicationContextProvider
      initialMode="production"
      initialRole="fisher"
      seedLocalData={false}
    >
      <FishingOperationsPage />
    </ApplicationContextProvider>
  );
}
