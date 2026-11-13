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
  const onCtaClick = (location: "hero" | "step" | "closing") => {
    trackCtaClick(location, ctaUrl);
  };

  return (
    <main className="w-full relative z-10">
      {/* Header Bar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0e6496]/40 border-b border-white/20 px-5 py-4 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="font-en text-xl md:text-2xl font-black tracking-wider">Okey-Dokey</span>
            <span className="hidden sm:inline-block text-xs text-white/80 border-l border-white/30 pl-3">
              隠岐の島町 UIターン者コミュニティ
            </span>
          </div>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onCtaClick("hero")}
            className="text-xs md:text-sm font-bold bg-white text-[#0082c4] border-2 border-white px-4 py-2 rounded-xl hover:bg-transparent hover:text-white transition duration-300"
          >
            LINE先行登録
          </a>
        </div>
      </header>

      {/* 00: Hero Section */}
      <section id="hero" className="min-h-[85dvh] flex flex-col justify-between items-center text-center px-6 pt-16 pb-10 max-w-5xl mx-auto">
        <div className="space-y-6 pt-8 md:pt-14">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/60 text-xs md:text-sm font-bold text-white tracking-widest bg-white/10 backdrop-blur-sm">
            {content.heroTag}
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.3] tracking-tight text-white drop-shadow-md">
            {renderLines(content.heroTitle)}
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/95 leading-relaxed font-medium">
            {content.heroSub}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onCtaClick("hero")}
              className="cta-amanowa"
            >
              <span>{content.heroCta}</span>
              <span aria-hidden>→</span>
            </a>
          </div>
          <p className="text-xs text-white/80">※LINEへ遷移します（登録・参加は完全無料）</p>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 text-white/80 text-xs font-en tracking-widest pt-12 pb-2">
          <span>SCROLL</span>
          <span className="text-sm animate-bounce">↓</span>
        </div>
      </section>

      {/* 01: Introduction (はじめに) */}
      <section id="intro" className="section-pad max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src={content.introImage}
                alt="隠岐の仲間たち"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <span className="font-en text-xs font-bold tracking-widest uppercase border-b-2 border-white pb-1">
              {content.introHeading}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.4] text-white">
              {content.introTitle}
            </h2>
            <div className="text-sm sm:text-base leading-[1.9] text-white/90 space-y-4">
              {renderLines(content.introBody)}
            </div>
          </div>
        </div>
      </section>

      {/* 02: The Issue (背景にあること) */}
      <section id="issue" className="section-pad max-w-6xl mx-auto">
        <div className="glassmorphism p-6 sm:p-10 md:p-12 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-white pb-4">
            <span className="font-en text-xs font-bold tracking-widest uppercase text-white/85">
              {content.issueHeading}
            </span>
            <span className="text-xs text-white/70">独自調査データ</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.35] text-white">
                {content.issueTitle}
              </h2>
              <p className="text-base sm:text-lg leading-[1.85] text-white/90">
                {content.issueLead}
              </p>
              <p className="text-sm sm:text-base leading-[1.85] text-white/85 pt-2">
                {content.issueBody}
              </p>
            </div>

            <div className="lg:col-span-4 card-white p-6 sm:p-8 text-center space-y-2">
              <p className="text-xs font-bold tracking-wider text-[#0082c4]">{content.issueStatLabel}</p>
              <div className="text-6xl sm:text-7xl font-en font-black text-[#0082c4] leading-none">
                {content.issueStatNumber}
              </div>
              <p className="text-xs text-slate-500 pt-2">※転入者の約半数が3年以内に離島</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03: Philosophy (私たちの流儀) */}
      <section id="philosophy" className="section-pad max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-en text-xs font-bold tracking-widest uppercase border-b-2 border-white pb-1">
              {content.philosophyHeading}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.4] text-white">
              {content.philosophyTitle}
            </h2>
            <div className="space-y-4 text-base sm:text-lg leading-[1.9] text-white/90">
              <p className="font-bold">{content.philosophyBody1}</p>
              <p>{content.philosophyBody2}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src="/images/oki/230516_DJI_0468.jpg"
                alt="隠岐の豊かな海と島並み"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 04: Activities (活動の風景) */}
      <section id="activities" className="section-pad max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="font-en text-xs font-bold tracking-widest uppercase border-b-2 border-white pb-1">
            {content.activitiesHeading}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {content.activitiesTitle}
          </h2>
          <p className="text-sm sm:text-base text-white/85">
            {content.activitiesLead}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.activities.map((item) => (
            <div
              key={item.title}
              className="glassmorphism p-3 flex flex-col space-y-3 hover:bg-white/30 transition duration-300"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-white">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-2 space-y-2 flex-1">
                <span className="font-en text-[11px] font-bold text-white/75 tracking-wider block">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
                <p className="text-xs leading-relaxed text-white/85">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05: Rules (３箇条 / 海士町スタイル) */}
      <section id="rules" className="section-pad max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="font-en text-xs font-bold tracking-widest uppercase border-b-2 border-white pb-1">
            {content.rulesHeading}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {content.rulesTitle}
          </h2>
          <p className="text-sm sm:text-base text-white/85">{content.rulesLead}</p>
        </div>

        {/* 3箇条の白枠すりガラスボード */}
        <div className="glassmorphism divide-y-2 divide-white overflow-hidden shadow-2xl">
          {content.rules.map((rule) => (
            <div key={rule.num} className="p-6 sm:p-8 flex items-start gap-5 sm:gap-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full border-4 border-white flex items-center justify-center font-en text-xl sm:text-2xl font-black text-white bg-white/20">
                {rule.num}
              </div>
              <div className="space-y-2 pt-1">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {rule.title}
                </h3>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  {rule.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 06: Plan & Fee (プランと会費) */}
      <section id="plan" className="section-pad max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="font-en text-xs font-bold tracking-widest uppercase border-b-2 border-white pb-1">
            {content.planHeading}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {content.planTitle}
          </h2>
        </div>

        <div className="glassmorphism p-6 sm:p-10 space-y-8">
          <div className="card-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-[#0082c4] text-white text-xs font-bold">
                {content.planBadge}
              </span>
              <p className="text-xl sm:text-2xl font-bold text-slate-800">正式オープン後の月額会費</p>
              <p className="text-xs text-slate-500">{content.planNote}</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-en text-5xl sm:text-6xl font-black text-[#0082c4] leading-none">
                {content.planFeeAmount}
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-600">
                {content.planFeeUnit}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {content.planReasons.map((reason, i) => (
              <div key={i} className="bg-white/10 border-2 border-white rounded-2xl p-6 space-y-2.5">
                <span className="font-en text-xs font-bold text-white/80 block">REASON 0{i + 1}</span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  {reason.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07: Membership Process (入会方法 / 海士町スタイル) */}
      <section id="step" className="section-pad max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="font-en text-xs font-bold tracking-widest uppercase border-b-2 border-white pb-1">
            {content.stepHeading}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {content.stepTitle}
          </h2>
          <p className="text-sm sm:text-base text-white/85">{content.stepLead}</p>
        </div>

        {/* 1枚の大きな白枠すりガラスボード内に STEP 1〜3 を並べる */}
        <div className="w-full flex flex-col xl:flex-row rounded-3xl border-4 border-white glassmorphism overflow-hidden shadow-2xl">
          {content.steps.map((step, idx) => (
            <div
              key={step.num}
              className={`flex-1 p-6 sm:p-8 flex flex-col justify-between items-center text-center space-y-6 ${
                idx === 1
                  ? "border-y-4 xl:border-y-0 xl:border-x-4 border-white"
                  : ""
              }`}
            >
              {/* Top: STEP + 丸囲み数字 */}
              <div className="w-full space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="font-en text-base sm:text-lg font-bold tracking-widest text-white">
                    STEP
                  </span>
                  <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center font-en text-lg font-bold text-white bg-white/20">
                    {step.num}
                  </div>
                </div>
                <div className="w-full border-t border-white/60" />
              </div>

              {/* Middle: スマホ画面モックアップ風グラフィック */}
              <div className="w-full max-w-[210px] aspect-[9/14] rounded-[26px] border-4 border-white bg-white/20 p-4 flex flex-col justify-between shadow-inner">
                <div className="w-10 h-1.5 bg-white/60 rounded-full mx-auto" />
                <div className="my-auto space-y-3">
                  {idx === 0 && (
                    <div className="space-y-2">
                      <div className="w-16 h-16 mx-auto bg-white rounded-lg flex items-center justify-center text-[#0082c4] font-bold text-xs p-1">
                        LINE QR
                      </div>
                      <span className="inline-block px-3 py-1 bg-white text-[#0082c4] text-xs font-bold rounded-full">
                        友だち追加
                      </span>
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="space-y-2 text-left bg-white/85 text-[#0082c4] p-2.5 rounded-xl text-xs">
                      <p className="font-bold">トーク画面</p>
                      <p className="text-[10px] text-slate-600">アンケート・作戦会議のご案内</p>
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="space-y-2">
                      <span className="inline-block px-3 py-1 bg-white text-[#0082c4] text-xs font-bold rounded-lg shadow-sm">
                        月額500円
                      </span>
                      <p className="text-[11px] font-bold text-white">初期メンバー本登録</p>
                    </div>
                  )}
                </div>
                <div className="w-7 h-7 rounded-full border border-white/60 mx-auto" />
              </div>

              {/* Bottom: テキスト説明 */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  {step.desc}
                </p>
                <p className="text-xs text-white/70 font-bold">{step.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button under steps */}
        <div className="text-center pt-2 space-y-3">
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onCtaClick("step")}
            className="cta-amanowa"
          >
            <span>{content.stepCta}</span>
            <span aria-hidden>→</span>
          </a>
          <p className="text-xs text-white/80">{content.stepCtaNote}</p>
        </div>
      </section>

      {/* 08: FAQ (よくある質問) */}
      <section id="faq" className="section-pad max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="font-en text-xs font-bold tracking-widest uppercase border-b-2 border-white pb-1">
            {content.faqHeading}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {content.faqTitle}
          </h2>
        </div>

        <div className="glassmorphism divide-y-2 divide-white overflow-hidden shadow-2xl">
          {content.faqItems.map((item, idx) => (
            <div key={idx} className="p-6 sm:p-8 space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-start gap-3">
                <span className="font-en text-xl font-black text-white shrink-0">Q.</span>
                <span>{item.question}</span>
              </h3>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed pl-8">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 09: Closing (最後に / 海士町スタイル) */}
      <section id="closing" className="section-pad max-w-6xl mx-auto">
        <div className="glassmorphism p-6 sm:p-10 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src={content.closingImage}
                alt="隠岐の集い"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="font-en text-xs font-bold tracking-widest uppercase border-b-2 border-white pb-1">
              {content.closingHeading}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.35] text-white">
              {renderLines(content.closingTitle)}
            </h2>
            <div className="text-sm sm:text-base leading-[1.9] text-white/90 space-y-3">
              {renderLines(content.closingBody)}
            </div>
            <div className="pt-2 space-y-2">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCtaClick("closing")}
                className="cta-amanowa"
              >
                <span>{content.closingCta}</span>
                <span aria-hidden>→</span>
              </a>
              <p className="text-xs text-white/80">{content.closingCtaNote}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
