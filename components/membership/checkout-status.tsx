"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function CheckoutStatus() {
  const router = useRouter();
  useEffect(() => {
    const timer = window.setInterval(() => router.refresh(), 5000);
    const stop = window.setTimeout(() => window.clearInterval(timer), 90000);
    return () => { window.clearInterval(timer); window.clearTimeout(stop); };
  }, [router]);
  return null;
}
