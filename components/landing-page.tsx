"use client";

import Image from "next/image";
import type { LandingContent } from "@/content/site";
import { trackCtaClick } from "@/lib/analytics";

type LandingPageProps = {
  content: LandingContent;
  ctaUrl: string;
};

function renderLines(text: string) {
  return text.split("\n").map((line, index, lines) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

export function LandingPage({ content, ctaUrl }: LandingPageProps) {
  const onCtaClick = (location: "hero" | "footer") => {
    trackCtaClick(location, ctaUrl);
  };

  return (
    <main className="w-full overflow-x-hidden bg-white text-[#1E2D28]">
      {/* Editorial Masthead Bar */}
      <header className="border-b border-[#D1E5DD] bg-white px-5 py-3.5 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="rounded-sm bg-[#0D9488] px-2 py-0.5 font-mono-editorial text-xs font-bold tracking-wider text-white">
              Okey-Dokey
            </span>
            <span className="font-bold text-[#1E2D28]">{content.mastheadTitle}</span>
          </div>
          <span className="font-medium text-[#4B635B]">{content.mastheadTarget}</span>
        </div>
      </header>

      {/* 00: Hero Section */}
      <section id="hero" className="border-b border-[#D1E5DD] bg-white px-5 py-10 md:px-8 md:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Editorial Copy & Spec Box */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className=" rounded-full bg-[#CCFBF1] px-3.5 py-1 text-xs font-bold text-[#0D9488]">
                  {content.heroTag}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F97316]">
                  <span className="h-2 w-2 rounded-full bg-[#F97316]" aria-hidden />
                  {content.heroStatusDot}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.32] tracking-tight text-[#1E2D28]">
                {content.heroH1.line1}
                <br />
                {content.heroH1.line2Before}
                <span className="text-[#0D9488]">{content.heroH1.line2Highlight}</span>
                {content.heroH1.line2Before ? "、" : ""}
                <br />
                {content.heroH1.line3Before}
                <span className="text-[#F97316]">{content.heroH1.line3Highlight}</span>
                {content.heroH1.line3After}
              </h1>

              <p className="max-w-xl text-base md:text-lg leading-[1.85] text-[#4B635B] font-medium">
                {content.heroLead}
              </p>

              {/* Editorial Membership Spec Box */}
              <div className="max-w-xl rounded-lg border border-[#D1E5DD] bg-[#F0FDF4] p-4 sm:p-5 space-y-3 text-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#D1E5DD] pb-3">
                  <span className="font-bold text-[#4B635B]">{content.heroSpecFeeLabel}</span>
                  <div>
                    <span className="text-lg sm:text-xl font-black text-[#1E2D28]">{content.heroSpecFeeValue}</span>
                    <span className="ml-1 text-xs text-[#4B635B]">{content.heroSpecFeeNote}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 pt-0.5">
                  <span className="font-bold text-[#4B635B]">{content.heroSpecStatusLabel}</span>
                  <span className="font-bold text-[#0D9488]">{content.heroSpecStatusValue}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-2.5 pt-1">
                <a
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onCtaClick("hero")}
                  className="cta-line cta-line--lg group"
                >
                  <span>{content.heroCta}</span>
                  <svg
                    className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <p className="text-xs text-[#4B635B]">{content.heroCtaSub}</p>
              </div>
            </div>

            {/* Right Column: Framed Oki Photography */}
            <div className="lg:col-span-5">
              <div className="rounded-lg border border-[#D1E5DD] bg-[#F8FAF9] p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-editorial text-[#4B635B]">
                  <span>OKI-NO-SHIMA ISLAND</span>
                  <span>36°12&apos;N 133°19&apos;E</span>
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-[#D1E5DD]">
                  <Image
                    src="/images/oki/mainVisual.png"
                    alt="隠岐の海と暮らしの風景"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-xs leading-relaxed text-[#4B635B]">
                  職場やご近所とは違う、利害関係のない「ヨコのつながり」を隠岐の島町につくります。
                </p>
              </div>
            </div>
          </div>

          {/* 4 Editorial Benefit Strip */}
          <div className="mt-10 md:mt-14 grid grid-cols-2 lg:grid-cols-4 border border-[#D1E5DD] divide-y lg:divide-y-0 sm:divide-x divide-[#D1E5DD] rounded-lg bg-[#F8FAF9] overflow-hidden">
            {content.heroBenefits.map((benefit, index) => (
              <div key={benefit} className="p-4 sm:p-5 flex items-start gap-3">
                <span className="font-mono-editorial text-xs font-bold text-[#0D9488] mt-0.5">
                  0{index + 1}
                </span>
                <p className="text-xs sm:text-sm font-bold text-[#1E2D28] leading-snug">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 01: The Issue Section (Bright Mint Editorial, No Dark Background) */}
      <section id="issue" className="border-b border-[#D1E5DD] bg-[#F0FDF4] section-pad">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 border-b border-[#D1E5DD] pb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono-editorial text-xs font-bold tracking-wider text-[#0D9488]">
              {content.issueLabel}
            </span>
            <span className="text-xs text-[#4B635B]">{content.issueSourceNote}</span>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-[1.35] text-[#1E2D28]">
                {renderLines(content.issueTitle)}
              </h2>
              <p className="text-sm sm:text-base leading-[1.85] text-[#4B635B]">
                {content.issueStatLead}
              </p>
            </div>

            <div className="lg:col-span-3 rounded-lg border border-[#D1E5DD] bg-white p-6 text-center lg:text-left">
              <p className="text-xs font-bold text-[#4B635B] mb-2">{content.issueStatCaption}</p>
              <div className="flex items-baseline justify-center lg:justify-start gap-1">
                <span className="font-mono-editorial text-6xl sm:text-7xl font-bold text-[#F97316] leading-none">
                  {content.issueStatNumber}
                </span>
                <span className="font-mono-editorial text-2xl font-bold text-[#1E2D28]">
                  {content.issueStatUnit}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 border-l-4 border-[#0D9488] bg-white p-5 sm:p-6 rounded-r-lg space-y-2.5">
              <p className="text-base sm:text-lg font-bold leading-snug text-[#1E2D28]">
                {content.issueCauseTitle}
              </p>
              <p className="text-xs sm:text-sm leading-[1.8] text-[#4B635B]">
                {content.issueCauseBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02: Philosophy Section */}
      <section id="philosophy" className="border-b border-[#D1E5DD] bg-white section-pad">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 border-b border-[#D1E5DD] pb-3">
            <span className="font-mono-editorial text-xs font-bold tracking-wider text-[#0D9488]">
              {content.philosophyLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-[1.35] text-[#1E2D28]">
                {renderLines(content.philosophyTitle)}
              </h2>
              <p className="text-base sm:text-lg font-bold leading-[1.75] text-[#0D9488]">
                {content.philosophyLead}
              </p>
              <p className="text-sm sm:text-base leading-[1.9] text-[#4B635B]">
                {content.philosophyBody}
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-[#D1E5DD] bg-[#F8FAF9] p-2.5">
                <div className="relative aspect-[4/3] overflow-hidden rounded">
                  <Image
                    src="/images/oki/island-rhythm-community.jpg"
                    alt="港沿いを歩きながら話す島の仲間たち"
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-xs text-[#4B635B]">肩書きや年齢を外して、同じ目線で話す時間</p>
              </div>
              <div className="rounded-lg border border-[#D1E5DD] bg-[#F8FAF9] p-2.5">
                <div className="relative aspect-[4/3] overflow-hidden rounded">
                  <Image
                    src="/images/oki/230516_DJI_0468.jpg"
                    alt="隠岐の豊かな海と風景"
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-xs text-[#4B635B]">ひとりでは味わいきれない島の自然をシェアする</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03: For Whom Section (1px Hairline Grid) */}
      <section id="recommended" className="border-b border-[#D1E5DD] bg-[#F8FAF9] section-pad">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 border-b border-[#D1E5DD] pb-3">
            <span className="font-mono-editorial text-xs font-bold tracking-wider text-[#0D9488]">
              {content.recommendedLabel}
            </span>
          </div>

          <div className="max-w-3xl mb-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-[1.35] text-[#1E2D28]">
              {renderLines(content.recommendedTitle)}
            </h2>
            <p className="text-sm sm:text-base leading-[1.85] text-[#4B635B]">
              {content.recommendedLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#D1E5DD] divide-y md:divide-y-0 md:divide-x divide-[#D1E5DD] rounded-lg bg-white overflow-hidden">
            {content.recommendedCards.map((card) => (
              <div key={card.num} className="p-6 sm:p-8 space-y-3">
                <span className="inline-block font-mono-editorial text-sm font-bold text-[#F97316]">
                  {card.num}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2D28] leading-snug">
                  {card.title}
                </h3>
                <p className="text-sm leading-[1.85] text-[#4B635B]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04: Activities Section (4 Editorial Figure Cards) */}
      <section id="activities" className="border-b border-[#D1E5DD] bg-white section-pad">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 border-b border-[#D1E5DD] pb-3">
            <span className="font-mono-editorial text-xs font-bold tracking-wider text-[#0D9488]">
              {content.activitiesLabel}
            </span>
          </div>

          <div className="max-w-3xl mb-10 space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-[1.35] text-[#1E2D28]">
              {content.activitiesTitle}
            </h2>
            <p className="text-sm sm:text-base leading-[1.85] text-[#4B635B]">
              {content.activitiesLead}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.activities.map((item) => (
              <article
                key={item.fig}
                className="flex flex-col rounded-lg border border-[#D1E5DD] bg-[#F8FAF9] overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-[#D1E5DD] px-4 py-2 text-xs font-mono-editorial text-[#4B635B] bg-white">
                  <span className="font-bold text-[#0D9488]">{item.fig}</span>
                  <span>{item.category}</span>
                </div>
                <div className="relative aspect-[4/3] w-full border-b border-[#D1E5DD]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 space-y-2 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#1E2D28]">{item.title}</h3>
                  <p className="text-xs sm:text-sm leading-[1.8] text-[#4B635B]">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05: Membership Fee (¥500) & Roadmap Section */}
      <section id="membership" className="border-b border-[#D1E5DD] bg-[#F0FDF4] section-pad">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 border-b border-[#D1E5DD] pb-3">
            <span className="font-mono-editorial text-xs font-bold tracking-wider text-[#0D9488]">
              {content.membershipLabel}
            </span>
          </div>

          <div className="max-w-3xl mb-10 space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-[1.35] text-[#1E2D28]">
              {renderLines(content.membershipTitle)}
            </h2>
            <p className="text-sm sm:text-base leading-[1.85] text-[#4B635B]">
              {content.membershipLead}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Left: ¥500 Fee Card & 2 Reasons */}
            <div className="lg:col-span-7 rounded-lg border border-[#0D9488] bg-white p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D1E5DD] pb-4">
                <span className="text-base sm:text-lg font-bold text-[#1E2D28]">
                  {content.membershipFeeHeading}
                </span>
                <span className="rounded bg-[#CCFBF1] px-3 py-1 text-xs font-bold text-[#0D9488]">
                  {content.membershipFeeBadge}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-[#4B635B]">月額</span>
                <span className="font-mono-editorial text-5xl sm:text-6xl font-bold text-[#1E2D28]">
                  {content.membershipFeeAmount}
                </span>
                <span className="text-sm font-bold text-[#4B635B]">{content.membershipFeeTax}</span>
              </div>

              <div className="grid grid-cols-1 gap-4 border-t border-[#D1E5DD] pt-5">
                {content.membershipReasons.map((reason) => (
                  <div key={reason.num} className="rounded border border-[#D1E5DD] bg-[#F8FAF9] p-4 space-y-1.5">
                    <span className="font-mono-editorial text-xs font-bold text-[#F97316]">
                      {reason.num}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#1E2D28]">{reason.title}</h3>
                    <p className="text-xs sm:text-sm leading-[1.8] text-[#4B635B]">{reason.body}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs leading-relaxed text-[#4B635B]">{content.membershipFeeNotice}</p>
            </div>

            {/* Right: 3-Step Roadmap */}
            <div className="lg:col-span-5 rounded-lg border border-[#D1E5DD] bg-white p-6 sm:p-8 space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#1E2D28] border-b border-[#D1E5DD] pb-3">
                {content.roadmapHeading}
              </h3>

              <div className="divide-y divide-[#D1E5DD]">
                {content.roadmapSteps.map((step) => (
                  <div key={step.step} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                    <span className="font-mono-editorial text-xs font-bold text-[#0D9488]">
                      {step.step}
                    </span>
                    <h4 className="text-base font-bold text-[#1E2D28]">{step.title}</h4>
                    <p className="text-xs sm:text-sm leading-[1.8] text-[#4B635B]">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06: FAQ Section */}
      <section id="faq" className="border-b border-[#D1E5DD] bg-white section-pad">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 border-b border-[#D1E5DD] pb-3">
            <span className="font-mono-editorial text-xs font-bold tracking-wider text-[#0D9488]">
              {content.faqLabel}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#1E2D28] mb-8">
            {content.faqTitle}
          </h2>

          <div className="divide-y divide-[#D1E5DD] border-t border-b border-[#D1E5DD]">
            {content.faqItems.map((item, idx) => (
              <div key={idx} className="py-6 space-y-2.5">
                <h3 className="text-base sm:text-lg font-bold text-[#1E2D28] flex items-start gap-3">
                  <span className="font-mono-editorial text-[#0D9488] font-bold shrink-0">Q.</span>
                  <span>{item.question}</span>
                </h3>
                <p className="text-sm sm:text-base leading-[1.85] text-[#4B635B] pl-7">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07: Epilogue / Footer CTA Section */}
      <section id="cta" className="bg-[#F0FDF4] section-pad">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-[#D1E5DD] bg-white p-8 sm:p-12 text-center space-y-6">
            <span className="inline-block font-mono-editorial text-xs font-bold tracking-wider text-[#0D9488]">
              {content.footerLabel}
            </span>

            <h2 className="text-2xl sm:text-4xl font-black leading-[1.35] text-[#1E2D28]">
              {renderLines(content.footerTitle)}
            </h2>

            <p className="max-w-xl mx-auto text-sm sm:text-base leading-[1.85] text-[#4B635B]">
              {renderLines(content.footerBody)}
            </p>

            <div className="pt-2 space-y-3">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCtaClick("footer")}
                className="cta-line cta-line--lg group"
              >
                <span>{content.footerCta}</span>
                <svg
                  className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <p className="text-xs text-[#4B635B]">{content.footerNote}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
