"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Download, MonitorDown, MoreVertical, Share, Smartphone, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface Navigator {
    standalone?: boolean;
  }
}

const workspacePrefixes = [
  "/admin",
  "/buyer",
  "/coop",
  "/farmer",
  "/fisher",
  "/producer",
  "/processor",
  "/logistics",
  "/gov",
  "/finance",
  "/select-workspace",
];

function isWorkspacePath(pathname: string) {
  return workspacePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function InstallAgriHub() {
  const pathname = usePathname();
  const isDemo = pathname === "/demo" || pathname.startsWith("/demo/");
  const [authenticated, setAuthenticated] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      navigator.standalone === true;
    const userAgent = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    queueMicrotask(() => {
      setInstalled(standalone);
      setIsIos(ios);
      setIsSafari(/^((?!chrome|android|crios|fxios).)*safari/i.test(userAgent));
    });

    const onBeforeInstall = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
      setOpen(false);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    if (isDemo || !isWorkspacePath(pathname) || !isSupabaseConfigured()) {
      return;
    }
    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => setAuthenticated(Boolean(data.user)));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(Boolean(session?.user));
    });
    return () => subscription.subscription.unsubscribe();
  }, [isDemo, pathname]);

  const visible = !installed && (isDemo || (authenticated && isWorkspacePath(pathname)));
  if (!visible) return null;

  const requestInstall = async () => {
    if (!installPrompt) {
      setOpen(true);
      return;
    }
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setInstalled(true);
    }
    setInstallPrompt(null);
  };

  const canPrompt = Boolean(installPrompt);
  const actionLabel = isDemo
    ? "Demo install guide"
    : canPrompt
      ? "Install AgriHub"
      : isIos
        ? "Add AgriHub to Home Screen"
        : "Installation help";

  return (
    <>
      <button
        type="button"
        onClick={() => void requestInstall()}
        className="fixed z-30 right-3 sm:right-5 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:bottom-5 min-h-11 max-w-[calc(100vw-1.5rem)] rounded-full bg-[#059669] hover:bg-[#047857] text-white pl-4 pr-5 py-2.5 shadow-xl border border-white/50 flex items-center gap-2 text-xs sm:text-sm font-extrabold"
        aria-haspopup={canPrompt ? undefined : "dialog"}
      >
        {isDemo ? <Smartphone className="w-4 h-4 shrink-0" /> : <Download className="w-4 h-4 shrink-0" />}
        <span className="truncate">{actionLabel}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] bg-[#163025]/65 backdrop-blur-sm p-3 sm:p-6 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="install-title">
          <section className="w-full max-w-lg max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white border border-[#dce9df] shadow-2xl p-5 sm:p-7 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-black text-[#059669]">
                  {isDemo ? "Demo Mode guidance" : "Install AgriHub PH"}
                </p>
                <h2 id="install-title" className="text-xl font-extrabold text-[#163025] mt-1">
                  {isIos ? "Add AgriHub to your Home Screen" : "Install from your browser"}
                </h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="min-w-11 min-h-11 rounded-full bg-[#f6fbf7] text-[#5f7469] flex items-center justify-center" aria-label="Close install guidance">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isDemo && (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-800">
                Installing while viewing Demo Mode does not create a production account. Demo records remain isolated in this browser. Sign in to use a real organization workspace.
              </div>
            )}

            {isIos ? (
              <ol className="mt-5 space-y-4 text-sm text-[#385747]">
                <li className="flex gap-3"><span className="step">1</span><span>Open this page in Safari{!isSafari ? " first." : "."}</span></li>
                <li className="flex gap-3"><span className="step">2</span><span>Tap the <Share className="inline w-4 h-4 mx-1 text-[#059669]" /> Share button in the Safari toolbar.</span></li>
                <li className="flex gap-3"><span className="step">3</span><span>Scroll and choose <strong>Add to Home Screen</strong>, then tap <strong>Add</strong>.</span></li>
              </ol>
            ) : (
              <div className="mt-5 space-y-4 text-sm text-[#385747]">
                <div className="flex gap-3"><MonitorDown className="w-5 h-5 text-[#059669] shrink-0" /><p>Use Chrome, Edge, or another compatible browser on Android, Windows, macOS, or ChromeOS.</p></div>
                <div className="flex gap-3"><MoreVertical className="w-5 h-5 text-[#059669] shrink-0" /><p>Open the browser menu and choose <strong>Install AgriHub PH</strong> or <strong>Install app</strong>. Some desktop browsers show an install icon in the address bar.</p></div>
                <p className="rounded-xl bg-[#f6fbf7] border border-[#dce9df] p-3 text-xs leading-5">
                  If no install option appears, confirm the site is opened over HTTPS and reload once. Private browsing and managed-device policies can disable installation.
                </p>
              </div>
            )}

            <p className="mt-5 text-xs leading-5 text-[#5f7469]">
              Installation does not sign you out or clear Farmer and Fisher offline records stored on this device.
            </p>
            <button type="button" onClick={() => setOpen(false)} className="mt-5 w-full min-h-11 rounded-xl bg-[#059669] text-white text-sm font-extrabold">
              Done
            </button>
          </section>
          <style jsx>{`
            .step { display:flex; width:1.75rem; height:1.75rem; flex:none; align-items:center; justify-content:center; border-radius:9999px; background:#ecfdf5; color:#047857; font-weight:800; }
          `}</style>
        </div>
      )}
    </>
  );
}
