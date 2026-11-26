"use client";

import { useCookieConsent } from "./CookieConsent";

export default function ConsentMap({ address }: { address: string }) {
  const { preferences, ready } = useCookieConsent();

  if (preferences?.functional) {
    return (
      <iframe
        title="Map showing the office location"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
        loading="lazy"
        tabIndex={-1}
        className="contact-map-iframe"
      />
    );
  }

  return (
    <div className="contact-map-pattern flex items-center justify-center">
      {ready && (
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("lyondev:cookie-settings"))}
          className="border border-brand bg-ink/90 px-4 py-2 text-sm font-semibold text-brand"
        >
          Review cookie settings to load the map
        </button>
      )}
    </div>
  );
}
