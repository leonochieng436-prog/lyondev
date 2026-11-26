"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { COOKIE_POLICY_VERSION } from "@/lib/legal";

type CookiePreferences = {
  version: string;
  updatedAt: string;
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

type ConsentContextValue = {
  preferences: CookiePreferences | null;
  ready: boolean;
};

const STORAGE_KEY = "lyondev-cookie-consent";
const ConsentContext = createContext<ConsentContextValue>({ preferences: null, ready: false });

function readPreferences(value: string | null): CookiePreferences | null {
  if (!value) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object") return null;
    const candidate = parsed as Record<string, unknown>;
    if (
      candidate.version !== COOKIE_POLICY_VERSION ||
      typeof candidate.updatedAt !== "string" ||
      typeof candidate.functional !== "boolean" ||
      typeof candidate.analytics !== "boolean" ||
      typeof candidate.marketing !== "boolean"
    ) {
      return null;
    }
    return {
      version: COOKIE_POLICY_VERSION,
      updatedAt: candidate.updatedAt,
      necessary: true,
      functional: candidate.functional,
      analytics: candidate.analytics,
      marketing: candidate.marketing,
    };
  } catch {
    return null;
  }
}

function clearAnalyticsCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (name?.startsWith("_ga")) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    }
  });
}

export function useCookieConsent() {
  return useContext(ConsentContext);
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("lyondev:cookie-settings"))}
    >
      Cookie settings
    </button>
  );
}

export function CookieConsentProvider({
  children,
  gaId,
}: {
  children: ReactNode;
  gaId: string | null;
}) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ functional: false, analytics: false, marketing: false });
  const [storageError, setStorageError] = useState("");
  const dialogRef = useRef<HTMLElement>(null);
  const preferencesRef = useRef(preferences);
  preferencesRef.current = preferences;

  useEffect(() => {
    try {
      const saved = readPreferences(window.localStorage.getItem(STORAGE_KEY));
      setPreferences(saved);
      if (!saved) window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      setStorageError("Cookie preferences could not be read from this browser.");
    }
    setReady(true);

    const showSettings = () => {
      const current = preferencesRef.current;
      setDraft({
        functional: current?.functional ?? false,
        analytics: current?.analytics ?? false,
        marketing: current?.marketing ?? false,
      });
      setOpen(true);
    };
    window.addEventListener("lyondev:cookie-settings", showSettings);
    return () => window.removeEventListener("lyondev:cookie-settings", showSettings);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const firstControl = dialog?.querySelector<HTMLElement>("button, input, select, textarea");
    firstControl?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>("button, input, select, textarea"))
        .filter((element) => !element.hasAttribute("disabled"));
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!gaId) return;
    const disabledKey = `ga-disable-${gaId}`;
    if (preferences?.analytics) {
      Object.assign(window, { [disabledKey]: false });
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
      window.gtag("js", new Date());
      window.gtag("config", gaId);

      if (!document.getElementById("lyondev-google-analytics")) {
        const script = document.createElement("script");
        script.id = "lyondev-google-analytics";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
        script.onerror = () => console.error("Google Analytics could not be loaded.");
        document.head.appendChild(script);
      }
      return;
    }

    Object.assign(window, { [disabledKey]: true });
    if (document.getElementById("lyondev-google-analytics")) {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      document.getElementById("lyondev-google-analytics")?.remove();
      clearAnalyticsCookies();
    }
  }, [gaId, preferences]);

  const save = useCallback(
    (choices: { functional: boolean; analytics: boolean; marketing: boolean }) => {
      const next: CookiePreferences = {
        version: COOKIE_POLICY_VERSION,
        updatedAt: new Date().toISOString(),
        necessary: true,
        ...choices,
      };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setPreferences(next);
        setStorageError("");
        setOpen(false);
      } catch {
        setStorageError("Your choices could not be saved. Enable browser storage and try again.");
      }
    },
    [],
  );

  const openSettings = useCallback(() => {
    setDraft({
      functional: preferences?.functional ?? false,
      analytics: preferences?.analytics ?? false,
      marketing: preferences?.marketing ?? false,
    });
    setOpen(true);
  }, [preferences]);

  const value = useMemo(() => ({ preferences, ready }), [preferences, ready]);
  const acceptAll = () => save({ functional: true, analytics: true, marketing: true });
  const rejectOptional = () => save({ functional: false, analytics: false, marketing: false });

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {ready && !preferences && !open && (
        <section
          aria-label="Cookie choices"
          className="fixed inset-x-3 bottom-24 z-[70] mx-auto max-w-4xl border border-white/20 bg-[#111] p-5 text-white shadow-2xl sm:inset-x-6 sm:bottom-24"
        >
          <h2 className="text-lg font-bold">Your privacy choices</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Necessary storage keeps the site working. Optional functional, analytics, and marketing
            storage stays off unless you choose it. Read our{" "}
            <Link className="text-brand underline" href="/legal/cookie-policy">cookie policy</Link>.
          </p>
          {storageError && <p role="alert" className="mt-2 text-sm text-rose-300">{storageError}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={acceptAll} className="min-h-11 flex-1 border border-brand bg-brand px-4 py-2 font-semibold text-black">
              Accept all
            </button>
            <button type="button" onClick={rejectOptional} className="min-h-11 flex-1 border border-white/50 px-4 py-2 font-semibold text-white">
              Reject optional
            </button>
            <button type="button" onClick={openSettings} className="min-h-11 flex-1 border border-white/50 px-4 py-2 font-semibold text-white">
              Customize
            </button>
          </div>
        </section>
      )}
      {ready && open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4" role="presentation">
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            tabIndex={-1}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto border border-white/20 bg-[#111] p-6 text-white shadow-2xl"
          >
            <h2 id="cookie-preferences-title" className="text-xl font-bold">Cookie preferences</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Choose which optional categories may be used. Necessary storage is always active.
            </p>
            <div className="mt-5 space-y-4">
              <p className="border-b border-white/10 pb-3 text-sm">
                <strong>Necessary</strong> <span className="text-slate-400">Always on</span>
                <span className="mt-1 block text-slate-400">Required for core site and admin-session functions.</span>
              </p>
              {([
                ["functional", "Functional", "Enables optional features such as the embedded map."],
                ["analytics", "Analytics", "Allows Google Analytics to measure site usage."],
                ["marketing", "Marketing", "Reserved for marketing technologies; none were identified in the reviewed code."],
              ] as const).map(([key, title, description]) => (
                <label key={key} className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 text-sm">
                  <span><strong>{title}</strong><span className="mt-1 block text-slate-400">{description}</span></span>
                  <input
                    type="checkbox"
                    checked={draft[key]}
                    onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.checked }))}
                    aria-label={`${title} cookies`}
                    className="mt-1 h-5 w-5 accent-yellow-400"
                  />
                </label>
              ))}
            </div>
            {storageError && <p role="alert" className="mt-3 text-sm text-rose-300">{storageError}</p>}
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={() => save(draft)} className="min-h-11 flex-1 border border-brand bg-brand px-4 py-2 font-semibold text-black">
                Save choices
              </button>
              <button type="button" onClick={acceptAll} className="min-h-11 flex-1 border border-white/50 px-4 py-2 font-semibold">
                Accept all
              </button>
              <button type="button" onClick={rejectOptional} className="min-h-11 flex-1 border border-white/50 px-4 py-2 font-semibold">
                Reject optional
              </button>
              <button type="button" onClick={() => setOpen(false)} className="min-h-11 flex-1 border border-white/50 px-4 py-2">
                Cancel
              </button>
            </div>
          </section>
        </div>
      )}
    </ConsentContext.Provider>
  );
}
