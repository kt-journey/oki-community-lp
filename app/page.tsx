import { LandingPage } from "@/components/landing-page";
import { getLandingContent, getSitePhase } from "@/content/site";

export default function Home() {
  const phase = getSitePhase();
  const content = getLandingContent(phase);
  const ctaUrl = process.env.NEXT_PUBLIC_LINE_URL ?? "https://lin.ee/TJIOxNu";

  return (
    <div className="min-h-screen bg-white text-[#1E2D28]">
      <LandingPage content={content} ctaUrl={ctaUrl} />
      <footer className="border-t border-[#D1E5DD] bg-white px-5 py-8 text-xs sm:text-sm text-[#4B635B] md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-bold tracking-wide text-[#1E2D28]">Okey-Dokey｜隠岐の島町 UIターン者コミュニティ</p>
          <div className="flex flex-wrap gap-5">
            <a href="/privacy" className="transition-colors hover:text-[#0D9488]">
              プライバシーポリシー
            </a>
            <a href="/legal" className="transition-colors hover:text-[#0D9488]">
              特定商取引法表記
            </a>
            <a href="/about" className="transition-colors hover:text-[#0D9488]">
              運営者情報
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
