import { LandingPage } from "@/components/landing-page";
import { getLandingContent, getSitePhase } from "@/content/site";

export default function Home() {
  const phase = getSitePhase();
  const content = getLandingContent(phase);
  const ctaUrl = process.env.NEXT_PUBLIC_LINE_URL ?? "https://lin.ee/TJIOxNu";

  return (
    <div className="min-h-screen">
      <LandingPage content={content} ctaUrl={ctaUrl} />
      <footer className="border-t border-white/10 bg-[#161d2e] px-5 py-8 text-sm text-white/65 md:px-10">
        <div className="mx-auto flex max-w-[460px] flex-col gap-2 md:max-w-5xl md:flex-row md:items-center md:justify-between">
          <p className="tracking-wide text-white/80">Okey-Dokey</p>
          <div className="flex flex-wrap gap-4">
            <a href="/privacy" className="transition-colors hover:text-white">
              プライバシーポリシー
            </a>
            <a href="/legal" className="transition-colors hover:text-white">
              特定商取引法表記
            </a>
            <a href="/about" className="transition-colors hover:text-white">
              運営者情報
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
