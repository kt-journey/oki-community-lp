import { LandingPage } from "@/components/landing-page";
import { getLandingContent, getSitePhase } from "@/content/site";

export default function Home() {
  const phase = getSitePhase();
  const content = getLandingContent(phase);
  const ctaUrl = process.env.NEXT_PUBLIC_LINE_URL ?? "https://lin.ee/TJIOxNu";

  return (
    <div className="min-h-screen relative">
      <LandingPage content={content} ctaUrl={ctaUrl} />
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 bg-[#0e6496]/70 backdrop-blur-md px-6 py-10 text-xs sm:text-sm text-white/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between text-center md:text-left">
          <p className="font-bold tracking-wide text-white">
            Okey-Dokey｜隠岐の島町 UIターン者コミュニティ
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="/privacy" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              プライバシーポリシー
            </a>
            <a href="/legal" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              特定商取引法表記
            </a>
            <a href="/about" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              運営者情報
            </a>
          </div>
        </div>
        <p className="mx-auto max-w-6xl text-center text-xs text-white/60 pt-6">
          © Okey-Dokey All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
