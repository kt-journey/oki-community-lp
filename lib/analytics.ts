"use client";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackCtaClick(location: "hero" | "footer", destination: string) {
  window.dataLayer?.push({
    event: "cta_click",
    location,
    destination,
  });

  window.gtag?.("event", "cta_click", {
    location,
    destination,
  });

  window.fbq?.("trackCustom", "cta_click", {
    location,
    destination,
  });
}
