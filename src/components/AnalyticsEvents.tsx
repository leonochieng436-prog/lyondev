"use client";

import { useEffect } from "react";

export default function AnalyticsEvents() {
  useEffect(() => {
    const trackContactClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      const eventName = link.dataset.analyticsEvent;
      if (eventName) {
        window.gtag?.("event", eventName, { page_path: window.location.pathname });
      }

      if (link.protocol === "mailto:") {
        window.gtag?.("event", "contact_click", { contact_method: "email" });
      } else if (link.hostname === "wa.me") {
        window.gtag?.("event", "contact_click", { contact_method: "whatsapp" });
      } else if (link.protocol === "tel:") {
        window.gtag?.("event", "contact_click", { contact_method: "phone" });
      }
    };

    const trackFormSubmit = (event: Event) => {
      if (!(event.target instanceof HTMLFormElement)) return;
      const eventName = event.target.dataset.analyticsEvent;
      if (eventName) {
        window.gtag?.("event", eventName, { page_path: window.location.pathname });
      }
    };

    document.addEventListener("click", trackContactClick);
    document.addEventListener("submit", trackFormSubmit);
    return () => {
      document.removeEventListener("click", trackContactClick);
      document.removeEventListener("submit", trackFormSubmit);
    };
  }, []);

  return null;
}
