"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WarehouseItemsIndexPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/farmer/warehouse");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center text-xs text-slate-500">
      Redirecting to Farm Inventory &amp; Storage...
    </div>
  );
}
