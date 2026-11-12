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
      {/* 00: Full-Bleed Photo Hero */}
      <section id="hero" className="relative min-h-[92dvh] flex flex-col justify-between overflow-hidden">
        {/* Full-screen background photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/oki/mainVisual.png"
            alt="隠岐の島町の風景"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
        </div>

        {/* Minimal Top Masthead over photo */}
        <header className="relative z-10 w-full border-b border-white/20 px-6 py-5 md:px-12">
          <div className="mx-auto flex max-w-6xl items-center justify-between text-white">
            <span className="text-base md:text-lg font-bold tracking-wider">Okey-Dokey</span>
            <span className="text-xs md:text-sm text-white/85">{content.heroKicker}</span>
          </div>
        </header>

        {/* Bottom-aligned Editorial Hero Copy */}
        <div className="relative z-10 w-full px-6 pb-14 pt-24 md:px-12 md:pb-20 lg:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl space-y-6 text-white">
              <p className="text-xs sm:text-sm font-bold tracking-widest text-white/85">
                {content.heroKicker}
              </p>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.28] tracking-tight text-white">
                {renderLines(content.heroTitle)}
              </h1>

              <p className="max-w-xl text-sm sm:text-base md:text-lg leading-[1.9] text-white/90">
                {content.heroLead}
              </p>

              <div className="pt-2 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <a
                    href={ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onCtaClick("hero")}
                    className="cta-line cta-line--lg"
                  >
                    <span>{content.heroCta}</span>
                    <span aria-hidden>→</span>
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-white/80">
                  {content.heroMeta}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01: Issue Section (Pure Typography & Proportion, No Boxes) */}
      <section id="issue" className="bg-[#F4F8F6] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-bold tracking-widest text-[#0D9488]">
                {content.issueKicker}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.4] text-[#1E2D28]">
                {renderLines(content.issueTitle)}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-8 lg:pt-6">
              <p className="text-base sm:text-lg leading-[1.95] text-[#1E2D28]">
                {content.issueLead}
              </p>

              <div className="border-t border-b border-[#CBDAD3] py-8 flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-10">
                <div className="flex items-baseline gap-3 shrink-0">
                  <span className="text-5xl sm:text-6xl font-bold tracking-tight text-[#0D9488]">
                    {content.issueStatNumber}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#4B635B]">
                    {content.issueStatLabel}
                  </span>
                </div>
                <p className="text-xs text-[#4B635B]">{content.issueSourceNote}</p>
              </div>

              <p className="text-base sm:text-lg leading-[1.95] text-[#1E2D28]">
                {content.issueBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02: Philosophy Section (Editorial Spread with Photography) */}
      <section id="philosophy" className="bg-white px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl space-y-16 md:space-y-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-bold tracking-widest text-[#0D9488]">
                {content.philosophyKicker}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.4] text-[#1E2D28]">
                {renderLines(content.philosophyTitle)}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 lg:pt-6 text-base sm:text-lg leading-[1.95] text-[#334740]">
              <p>{content.philosophyBody1}</p>
              <p>{content.philosophyBody2}</p>
            </div>
          </div>

          {/* Unboxed Asymmetric Photo Spread */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="md:col-span-7">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/oki/island-rhythm-community.jpg"
                  alt="港沿いを歩きながら話す島の仲間たち"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/oki/230516_DJI_0468.jpg"
                  alt="隠岐の海と島並み"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03: Recommended For Section (Clean Top-Border Columns, No Cards) */}
      <section id="recommended" className="bg-[#F4F8F6] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl space-y-14">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-bold tracking-widest text-[#0D9488]">
              {content.recommendedKicker}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.4] text-[#1E2D28]">
              {renderLines(content.recommendedTitle)}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {content.recommendedItems.map((item) => (
              <div key={item.title} className="border-t border-[#1E2D28] pt-6 space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2D28] leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base leading-[1.9] text-[#4B635B]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04: Activities Section (Photo + Text Only, Zero Box Borders) */}
      <section id="activities" className="bg-white px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs font-bold tracking-widest text-[#0D9488]">
                {content.activitiesKicker}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.4] text-[#1E2D28]">
                {renderLines(content.activitiesTitle)}
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-sm sm:text-base leading-[1.9] text-[#4B635B]">
                {content.activitiesLead}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14">
            {content.activities.map((item) => (
              <article key={item.title} className="space-y-4">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F4F8F6]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2D28] pt-1">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base leading-[1.85] text-[#4B635B]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05: Membership & Roadmap Section (Editorial Essay + Simple List) */}
      <section id="membership" className="bg-[#F4F8F6] px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20 items-start">
            {/* Left: Fee & Philosophy of ¥500 */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-widest text-[#0D9488]">
                  {content.membershipKicker}
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.4] text-[#1E2D28]">
                  {renderLines(content.membershipTitle)}
                </h2>
              </div>

              <div className="border-t border-b border-[#CBDAD3] py-6 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <span className="text-sm font-bold text-[#4B635B]">正式オープン後の会費</span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#1E2D28]">
                    {content.membershipFeeText}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4B635B]">
                  {content.membershipFeeSub}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2D28]">
                  {content.membershipWhyTitle}
                </h3>
                <p className="text-sm sm:text-base leading-[1.95] text-[#334740]">
                  {content.membershipWhyBody1}
                </p>
                <p className="text-sm sm:text-base leading-[1.95] text-[#334740]">
                  {content.membershipWhyBody2}
                </p>
              </div>
            </div>

            {/* Right: Clean 3-Step Flow */}
            <div className="lg:col-span-5 lg:pt-10 space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#1E2D28] border-b border-[#1E2D28] pb-4">
                {content.roadmapTitle}
              </h3>

              <div className="divide-y divide-[#CBDAD3]">
                {content.roadmapSteps.map((step) => (
                  <div key={step.num} className="py-6 first:pt-2 last:pb-0 flex gap-5">
                    <span className="text-lg font-bold text-[#0D9488] shrink-0 pt-0.5">
                      {step.num}.
                    </span>
                    <div className="space-y-2">
                      <h4 className="text-base sm:text-lg font-bold text-[#1E2D28]">
                        {step.title}
                      </h4>
                      <p className="text-sm leading-[1.85] text-[#4B635B]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06: FAQ Section */}
      <section id="faq" className="bg-white px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-xs font-bold tracking-widest text-[#0D9488]">
                {content.faqKicker}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold leading-[1.4] text-[#1E2D28]">
                {content.faqTitle}
              </h2>
            </div>

            <div className="lg:col-span-8 divide-y divide-[#D1E5DD] border-t border-b border-[#D1E5DD]">
              {content.faqItems.map((item) => (
                <div key={item.question} className="py-7 space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-[#1E2D28]">
                    {item.question}
                  </h3>
                  <p className="text-sm sm:text-base leading-[1.9] text-[#4B635B]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 07: Full-Bleed Photo Epilogue CTA */}
      <section id="cta" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/oki/20241112-DSC09331.jpg"
            alt="隠岐の風景"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-white space-y-6">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.35]">
            {renderLines(content.footerTitle)}
          </h2>
          <p className="max-w-xl text-sm sm:text-base md:text-lg leading-[1.9] text-white/90">
            {renderLines(content.footerBody)}
          </p>
          <div className="pt-2 space-y-3">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onCtaClick("footer")}
              className="cta-line cta-line--lg"
            >
              <span>{content.footerCta}</span>
              <span aria-hidden>→</span>
            </a>
            <p className="text-xs sm:text-sm text-white/80">{content.footerNote}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
