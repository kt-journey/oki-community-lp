"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { LandingContent } from "@/content/site";
import { trackCtaClick } from "@/lib/analytics";

type LandingPageProps = {
  content: LandingContent;
  ctaUrl: string;
};

const activityImages = [
  "/images/oki/DSC04974-2.jpg",
  "/images/oki/bbq.jpg",
  "/images/oki/bus.png",
  "/images/oki/akiya.png",
];

function renderLines(text: string) {
  return text.split("\n").map((line, index, lines) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

function Counter({
  target,
  duration = 2000,
  isVisible,
}: {
  target: number;
  duration?: number;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return <>{count}</>;
}

export function LandingPage({ content, ctaUrl }: LandingPageProps) {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll("[data-observe='section']").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  const onCtaClick = (location: "hero" | "footer") => {
    trackCtaClick(location, ctaUrl);
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero — brand, one headline, one line, one CTA */}
      <section
        id="hero"
        data-observe="section"
        className="relative flex min-h-[100dvh] items-end overflow-hidden bg-slate-900"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/oki/ijusyakoryukai.jpg"
            alt="隠岐で集う移住者たちの様子"
            fill
            priority
            className="hero-image object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-slate-950/25" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-16 pt-24 sm:px-8 sm:pb-20 md:px-12 md:pb-24">
          <p
            className={`mb-8 font-serif text-2xl tracking-[0.08em] text-white sm:text-3xl md:text-4xl ${isVisible("hero") ? "animate-[fade-in_1.1s_ease-out_forwards]" : "opacity-0"}`}
          >
            Okey-Dokey
          </p>

          <h1 className="mb-5 max-w-3xl font-serif text-[2rem] leading-[1.35] font-medium tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.3]">
            {content.heroH1.line1}
            <br />
            {content.heroH1.line2Before}
            {content.heroH1.line2Highlight}
            {content.heroH1.line2Before || content.heroH1.line2Highlight ? "、" : ""}
            <br />
            {content.heroH1.line3Before}
            {content.heroH1.line3Highlight}
            {content.heroH1.line3After}
          </h1>

          <p className="mb-10 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {content.heroSubcopyLines[0]}
          </p>

          <div className="flex flex-col items-start gap-4">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <p className="text-sm text-white/65">
              {content.heroCommunityLabel}
              <span className="mx-2 text-white/35">·</span>
              {content.heroRecruitBadge}
            </p>
          </div>
        </div>

        <p className="scroll-hint absolute right-5 bottom-10 z-10 hidden sm:block md:right-10">
          SCROLL
        </p>
      </section>

      {/* Benefits — moved out of hero */}
      <section
        id="benefits"
        data-observe="section"
        className={`border-b border-slate-100 bg-white section-pad reveal ${isVisible("benefits") ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-5xl">
          <p className="section-label mb-10">{content.heroBenefitsHeading}</p>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.heroBenefits.map((title, i) => (
              <li key={title} className="min-w-0">
                <span className="mb-3 block font-mono text-xs tracking-widest text-accent/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg font-medium leading-snug text-foreground">{title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Intro */}
      <section
        id="intro"
        data-observe="section"
        className={`bg-white section-pad reveal overflow-x-hidden ${isVisible("intro") ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-6xl min-w-0">
          <div className="grid min-w-0 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="min-w-0">
              <p className="section-label mb-6">{content.introLabel}</p>
              <h2 className="mb-8 font-serif text-3xl font-medium leading-tight text-foreground md:text-4xl lg:text-[2.75rem]">
                {renderLines(content.introTitle)}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
                {renderLines(content.introBody)}
              </p>
            </div>

            <div className="relative min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/oki/island-rhythm-community.jpg"
                  alt="港沿いを歩きながら話す島の仲間たち"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis */}
      <section
        id="crisis"
        data-observe="section"
        className={`relative section-pad reveal overflow-hidden ${isVisible("crisis") ? "is-visible" : ""}`}
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/oki/20240427-DSC06774.jpg"
            alt="隠岐の集いの風景"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/88" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-20 grid items-end gap-12 text-white lg:mb-28 lg:grid-cols-2 lg:gap-24">
            <div className="text-center lg:text-left">
              <p className="mb-6 text-sm font-medium tracking-[0.18em] text-white/50">
                {content.crisisBadge}
              </p>
              <h2 className="font-serif text-4xl font-medium leading-[1.2] tracking-tight md:text-5xl lg:text-6xl">
                {renderLines(content.crisisTitle)}
              </h2>
            </div>

            <div className="text-center lg:text-left">
              <p className="mb-8 text-base leading-relaxed text-white/75 md:text-lg">
                {renderLines(content.crisisStatLead)}
              </p>
              <p className="font-stat flex items-baseline justify-center text-7xl font-bold leading-none text-accent md:text-8xl lg:justify-start lg:text-[9rem]">
                <Counter target={50} isVisible={isVisible("crisis")} />
                <span className="ml-1 text-4xl text-accent/50 md:text-5xl lg:text-6xl">%</span>
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-4xl px-2 text-center">
            <p className="font-serif text-2xl leading-snug font-medium text-white md:text-4xl">
              一番の原因は、仕事でも家でもなく
              <br />
              <span className="relative mt-3 inline-block px-1">
                <span className="relative z-10">{content.crisisCause}</span>
                <span
                  className={`absolute bottom-1 left-0 -z-0 h-[45%] w-full origin-left bg-accent/60 transition-transform duration-[1.4s] ease-out lg:bottom-2 ${isVisible("crisis") ? "scale-x-100" : "scale-x-0"}`}
                />
              </span>
              <span className="mt-2 inline-block">だった。</span>
            </p>
            <p className="mt-10 text-xs tracking-wider text-white/45">{content.crisisSourceNote}</p>
          </div>
        </div>
      </section>

      {/* Recommended — numbered list, no cards */}
      <section
        id="recommended"
        data-observe="section"
        className={`bg-surface-alt section-pad reveal ${isVisible("recommended") ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-4xl">
          <p className="section-label mb-6">{content.recommendedLabel}</p>
          <h2 className="mb-6 font-serif text-3xl font-medium leading-tight text-foreground md:text-5xl">
            {renderLines(content.recommendedTitle)}
          </h2>
          <p className="mb-16 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {renderLines(content.recommendedLead)}
          </p>

          <ol className="divide-y divide-slate-200 border-y border-slate-200">
            {content.recommendedCards.map((card, i) => (
              <li key={card.title} className="grid gap-4 py-10 sm:grid-cols-[4rem_1fr] sm:gap-8">
                <span className="font-mono text-sm tracking-widest text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-3 font-serif text-2xl font-medium text-foreground md:text-3xl">
                    {card.title}
                  </h3>
                  <p className="max-w-2xl text-base leading-relaxed text-muted">{card.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-14 text-center text-sm tracking-wide text-muted">
            {content.recommendedClosing}
          </p>
        </div>
      </section>

      {/* Concept */}
      <section
        id="concept"
        data-observe="section"
        className={`bg-white section-pad reveal overflow-hidden ${isVisible("concept") ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="section-label mb-6">{content.conceptLabel}</p>
              <h2 className="mb-8 font-serif text-3xl font-medium leading-tight text-foreground md:text-5xl">
                {renderLines(content.conceptTitle)}
              </h2>
              <p className="mb-6 max-w-xl font-serif text-xl leading-relaxed text-foreground md:text-2xl">
                {content.conceptLead}
              </p>
              <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
                {content.conceptBody}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative mt-8 aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/oki/island-activity-community.jpg"
                  alt="海辺で島の時間を分かち合う仲間たち"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/oki/island-culture-detail.jpg"
                    alt="隠岐の文化に触れる様子"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p className="bg-accent px-5 py-6 font-serif text-lg leading-snug font-medium text-white sm:text-xl">
                  {renderLines(content.conceptImageCaption)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities — list, not card grid */}
      <section
        id="activities"
        data-observe="section"
        className={`bg-surface-alt section-pad reveal ${isVisible("activities") ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-5xl">
          <p className="section-label mb-6">{content.activitiesLabel}</p>
          <h2 className="mb-6 font-serif text-3xl font-medium text-foreground md:text-5xl">
            {content.activitiesTitle}
          </h2>
          <p className="mb-16 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {renderLines(content.activitiesLead)}
          </p>

          <ul className="space-y-0 divide-y divide-slate-200 border-y border-slate-200">
            {content.activities.map((item, index) => (
              <li
                key={item.title}
                className="grid items-center gap-6 py-8 sm:grid-cols-[7.5rem_1fr] md:grid-cols-[9rem_1fr] md:gap-10"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-square">
                  <Image
                    src={activityImages[index]}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
                <div>
                  <h3 className="mb-2 font-serif text-xl font-medium text-foreground md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="max-w-2xl text-base leading-relaxed text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Roadmap */}
      <section
        id="roadmap"
        data-observe="section"
        className={`bg-white section-pad reveal ${isVisible("roadmap") ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 max-w-2xl">
            <p className="section-label mb-6">{content.roadmapLabel}</p>
            <h2 className="mb-6 font-serif text-3xl font-medium text-foreground md:text-5xl">
              {content.roadmapTitle}
            </h2>
            <p className="text-base leading-relaxed text-muted md:text-lg">{content.roadmapLead}</p>
          </div>

          <ol className="space-y-12 border-l border-slate-200 pl-8 md:pl-10">
            {content.roadmapSteps.map((step) => (
              <li key={step.step} className="relative">
                <span className="absolute top-1.5 -left-[2.35rem] h-2.5 w-2.5 rounded-full bg-accent md:-left-[2.85rem]" />
                <p className="mb-2 font-mono text-xs tracking-widest text-accent">{step.step}</p>
                <h3 className="mb-3 font-serif text-2xl font-medium text-foreground">{step.title}</h3>
                <p className="max-w-xl text-base leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Co-creation / final CTA */}
      <section
        id="cocreation"
        data-observe="section"
        className={`relative section-pad reveal overflow-hidden ${isVisible("cocreation") ? "is-visible" : ""}`}
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/oki/20241112-DSC09331.jpg"
            alt="隠岐の風景"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/78" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <p className="mb-6 text-sm font-medium tracking-[0.18em] text-white/50">
            {content.cocreationLabel}
          </p>
          <h2 className="mb-8 font-serif text-3xl font-medium leading-tight md:text-5xl">
            {renderLines(content.cocreationTitle)}
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {renderLines(content.cocreationBody)}
          </p>

          <div className="border border-white/15 bg-white/5 px-8 py-12 backdrop-blur-sm md:px-14 md:py-16">
            <p className="mb-3 text-xs font-medium tracking-widest text-accent">
              {content.cocreationBadge}
            </p>
            <p className="mb-10 font-serif text-2xl font-medium leading-snug md:text-3xl">
              {renderLines(content.footerTitle)}
            </p>
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onCtaClick("footer")}
              className="cta-line cta-line--footer group"
            >
              <span>{content.footerCta}</span>
              <svg
                className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
