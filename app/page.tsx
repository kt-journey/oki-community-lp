import { LandingPage } from "@/components/landing-page";
import { getLandingContent, getSitePhase } from "@/content/site";

export default function Home() {
  const phase = getSitePhase();
  const content = getLandingContent(phase);
  const ctaUrl = process.env.NEXT_PUBLIC_LINE_URL ?? "https://lin.ee/TJIOxNu";

  return (
    <div className="min-h-screen">
      <LandingPage content={content} ctaUrl={ctaUrl} />
      <footer className="border-t border-slate-200 bg-white px-5 py-8 text-sm text-muted md:px-10">
        <div className="mx-auto flex max-w-[460px] flex-col gap-2 md:max-w-5xl md:flex-row md:items-center md:justify-between">
          <p className="font-serif tracking-wide text-foreground">Okey-Dokey</p>
          <div className="flex flex-wrap gap-4">
            <a href="/privacy" className="transition-colors hover:text-foreground">
              プライバシーポリシー
            </a>
            <a href="/legal" className="transition-colors hover:text-foreground">
              特定商取引法表記
            </a>
            <a href="/about" className="transition-colors hover:text-foreground">
              運営者情報
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
