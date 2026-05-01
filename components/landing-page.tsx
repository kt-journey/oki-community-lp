"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { LandingContent } from "@/content/site";
import { trackCtaClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

type LandingPageProps = {
  content: LandingContent;
  ctaUrl: string;
};

const activities = [
  {
    title: "魚突き・漁船体験",
    body: "海の作法と楽しさを共有し、隠岐での暮らし方を実地でつなげる。",
    image: "/images/oki/230511_DSC03037.jpg"
  },
  {
    title: "BBQ・キャンプ",
    body: "共通備品をシェアし、週末を最大化。仲間づくりのハードルを下げる。",
    image: "/images/oki/DSC01083.jpg"
  },
  {
    title: "送迎相談シャトル",
    body: "車社会ゆえの交流制限をゆるめ、安心して会える導線を確保する。",
    image: "/images/oki/DSC04974-2.jpg"
  },
  {
    title: "身元保証",
    body: "信頼を蓄積し、空き家流通の壁を越えるための下地を育てる。",
    image: "/images/oki/20240610-DSC09821.jpg"
  },
];

function Counter({ target, duration = 2000, isVisible }: { target: number; duration?: number; isVisible: boolean }) {
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
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
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
    <main className="w-full">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100vh] flex items-center justify-start overflow-hidden bg-white">
        {/* Lighter, brighter background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/oki/mainVisual.png"
            alt="隠岐の美しい風景"
            fill
            priority
            className="object-cover object-center scale-110 lg:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent lg:from-white/40" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-20 lg:pt-0">
          <div className="max-w-3xl">
            {/* Hand-drawn style lead */}
            <div className="relative inline-block mb-4 md:mb-6 animate-float">
              <span className="text-slate-700 text-lg md:text-3xl font-medium tracking-wider flex items-center gap-3 md:gap-4" style={{ textShadow: '0 0 20px white, 0 0 15px white, 0 0 10px white, 0 0 5px white' }}>
                <span className="opacity-40 font-serif italic text-2xl md:text-4xl">\\</span>
                ひとりじゃない、島ぐらし。
                <span className="opacity-40 font-serif italic text-2xl md:text-4xl">/</span>
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-bold text-slate-800 mb-6 md:mb-8 leading-[1.4] md:leading-[1.3]" style={{ fontFamily: 'var(--font-handwriting)', textShadow: '0 0 30px white, 0 0 20px white, 0 0 15px white, 0 0 10px white, 0 0 5px white' }}>
              隠岐での暮らしを<br />
              もっと楽しく、<br />
              もっと豊かに。
            </h1>
            
            <div className="mb-10 md:mb-12">
              <p className="text-xl md:text-3xl text-slate-800 font-bold tracking-[0.1em] md:tracking-[0.2em] mb-4 md:mb-6" style={{ textShadow: '0 0 20px white, 0 0 15px white, 0 0 10px white, 0 0 5px white' }}>
                隠岐移住者コミュニティ
              </p>
              <div className="text-base md:text-xl text-slate-700 leading-relaxed max-w-xl font-bold space-y-1" style={{ textShadow: '0 0 20px white, 0 0 15px white, 0 0 10px white, 0 0 5px white' }}>
                <p className="md:whitespace-nowrap">隠岐に移住した人、これから移住を考えている人、</p>
                <p className="md:whitespace-nowrap">島での暮らしをもっと楽しみたい人のための</p>
                <p>つながり・情報交換の場です。</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 items-center pb-20 md:pb-0">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-orange-500 px-8 py-4 md:px-10 md:py-5 font-bold text-white transition-all hover:bg-orange-400 hover:scale-105 shadow-lg shadow-orange-200 z-30"
              >
                <span className="text-lg">LINEで先行情報を受け取る</span>
                <svg className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Floating Circle Badge */}
          <div className="hidden lg:flex absolute top-1/4 right-24 w-72 h-72 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl items-center justify-center text-center border-4 border-white animate-float-slow">
            <div className="relative">
              <p className="text-slate-700 font-bold text-3xl leading-[1.6] tracking-wider" style={{ fontFamily: 'var(--font-handwriting)' }}>
                隠岐がもっと<br />好きになる<br />つながりを。
              </p>
              
              {/* Overlapping Bird Illustration */}
              <div className="absolute -bottom-16 -right-12 pointer-events-none">
                <svg className="w-24 h-24 text-sky-300 transform -rotate-12 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M2 12s4-2 7-2 7 2 7 2 4-2 4-2" strokeLinecap="round" />
                  <path d="M5 14s3-1 5-1 5 1 5 1 3-1 3-1" strokeLinecap="round" opacity="0.6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Wavy Bottom Transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126,211.9,113.15,270.21,101.62,298.51,60.67,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Intro Section */}
      <section 
        id="intro" 
        data-observe="section"
        className={`bg-white py-32 px-6 lg:py-48 reveal ${isVisible('intro') ? 'is-visible' : ''}`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <div>
              <p className="font-bold text-xl text-orange-500 mb-4 tracking-widest">ISLAND RHYTHM</p>
              <h2 className="font-serif text-4xl font-black text-slate-900 md:text-5xl leading-tight mb-8 break-keep">
                都会の「お金」より、<br className="hidden md:block" />島の「信頼」で遊ぼう。
              </h2>
              <div className="h-2 w-20 bg-blue-500 mb-8 rounded-full" />
              <p className="text-lg leading-relaxed text-slate-700 font-medium break-keep">
                都会の流儀は「お金で解決」。<br className="md:hidden" />隠岐の流儀は「信頼が通貨」。<br /><br />
                私たちは、気兼ねなく笑い合える「ヨコの繋がり」を再構築します。島の暮らしを、もっとオモシロク、仲間とともに広げていくために。
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/images/oki/移住者交流会の様子.jpg"
                  alt="笑い合う移住者の仲間たち"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-orange-200/50 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-blue-200/50 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Section */}
      <section 
        id="crisis" 
        data-observe="section"
        className={`relative py-32 px-6 lg:py-48 reveal overflow-hidden ${isVisible('crisis') ? 'is-visible' : ''}`}
      >
        {/* Full-width Background Image with Sophisticated Overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/oki/20240427-DSC06774.jpg"
            alt="隠岐の集いの風景"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[3px]" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-32 items-center mb-24 lg:mb-32 text-white">
            {/* Left: Heading with Decorative Badge */}
            <div className="relative text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sky-300 text-sm font-black tracking-widest mb-6 backdrop-blur-md border border-white/10">SURVEY RESULTS</span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black mb-0 leading-[1.1] tracking-tighter">
                島の暮らし、<br />
                <span className="text-white/40">実はちょっと</span><br />
                孤独？
              </h2>
            </div>

            {/* Right: Giant 50% Stat with Cinematic Glow */}
            <div className="relative text-center lg:text-left px-4 lg:px-0">
              <div className="space-y-2 mb-8 lg:mb-10">
                <p className="text-lg md:text-2xl text-slate-300 font-medium leading-relaxed">
                  隠岐には年間 約450人が転入。<br />
                  しかし、新しい生活を始めた人たちの<br />
                  3年以内の定着率は、わずか...
                </p>
              </div>
              <div className="relative inline-block font-sans">
                <span 
                  className="text-8xl md:text-[12rem] lg:text-[14rem] font-black leading-none flex items-baseline justify-center lg:justify-start text-orange-500 drop-shadow-[0_0_100px_rgba(249,115,22,0.4)]"
                  style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '0.02em' }}
                >
                  <Counter target={50} isVisible={isVisible('crisis')} />
                  <span className="text-5xl md:text-8xl lg:text-[9rem] ml-2 text-orange-200/50 font-black">%</span>
                </span>
                {/* Extra ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 lg:w-64 h-48 lg:h-64 bg-orange-600 rounded-full blur-[100px] lg:blur-[150px] opacity-20 -z-10" />
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto text-center px-6">
            <p className="text-2xl md:text-5xl text-white leading-tight font-black mb-12">
              一番の原因は、仕事でも家でもなく<br />
              <span className={`relative inline-block mt-4 px-2 group ${isVisible('crisis') ? 'animate-marker' : ''}`}>
                <span className="relative z-10">「移住者同士の繋がり不足」</span>
                <span className="absolute bottom-1 lg:bottom-2 left-0 w-full h-[60%] bg-orange-500/60 -z-0 origin-left transition-transform duration-[1.5s] ease-out scale-x-0 group-[.animate-marker]:scale-x-100" />
              </span>
              <br className="lg:hidden" /><span className="inline-block mt-2 lg:mt-0">だった。</span>
            </p>
            <p className="text-xs text-white/40 font-bold tracking-widest mt-8">※数値は独自調査に基づく</p>
          </div>
        </div>
      </section>

      {/* Recommended For Section */}
      <section 
        id="recommended" 
        data-observe="section"
        className={`relative bg-slate-50 py-32 px-6 reveal overflow-hidden ${isVisible('recommended') ? 'is-visible' : ''}`}
      >
        {/* Subtle Background Image */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <Image
            src="/images/oki/230516_DJI_0468.jpg"
            alt="隠岐の風景背景"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white -z-10" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="max-w-4xl mb-24">
            <p className="text-lg font-bold text-orange-500 mb-8 tracking-widest">THIS COMMUNITY IS FOR...</p>
            <div className="relative inline-block mb-8">
              <div className="bg-orange-500 text-white px-8 py-3 rounded-full text-xl md:text-2xl font-bold shadow-lg shadow-orange-200">
                このコミュニティは、
              </div>
              {/* Triangle for Bubble */}
              <div className="absolute -bottom-2 left-10 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-orange-500" />
            </div>
            <h2 className="font-serif text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
              こんな想いを抱える、<br />
              <span className="text-orange-500">あなたのための</span>場所です。
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
              隠岐での暮らしを、ただの「日常」で終わらせたくない。<br className="hidden md:block" />
              そんな方々に、新しい繋がりを提案します。
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Card 01 */}
            <div className="group relative bg-white p-12 pt-16 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-slate-100">
              {/* Overlapping Checkmark */}
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-xl shadow-orange-200 z-30 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 p-8 text-8xl font-black text-slate-50 transition-colors group-hover:text-orange-50 select-none z-10">01</div>
              <div className="relative z-20">
                <div className="w-12 h-1.5 bg-orange-500 mb-10 rounded-full" />
                <h3 className="text-3xl font-black text-slate-900 mb-6">繋がりの再構築</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  職場やご近所以外に、気兼ねなく本音で話せる友達や、週末を一緒に過ごす仲間が欲しい方。
                </p>
              </div>
            </div>

            {/* Card 02 */}
            <div className="group relative bg-white p-12 pt-16 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-slate-100">
              {/* Overlapping Checkmark */}
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-xl shadow-blue-200 z-30 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 p-8 text-8xl font-black text-slate-50 transition-colors group-hover:text-blue-50 select-none z-10">02</div>
              <div className="relative z-20">
                <div className="w-12 h-1.5 bg-blue-500 mb-10 rounded-full" />
                <h3 className="text-3xl font-black text-slate-900 mb-6">遊びの最大化</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  隠岐の豊かな海や山を、一人ではなく誰かと共有し、新しい体験へと広げていきたい方。
                </p>
              </div>
            </div>

            {/* Card 03 */}
            <div className="group relative bg-white p-12 pt-16 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-slate-100">
              {/* Overlapping Checkmark */}
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-xl shadow-sky-200 z-30 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 p-8 text-8xl font-black text-slate-50 transition-colors group-hover:text-sky-50 select-none z-10">03</div>
              <div className="relative z-20">
                <div className="w-12 h-1.5 bg-sky-500 mb-10 rounded-full" />
                <h3 className="text-3xl font-black text-slate-900 mb-6">情報の共有</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  ガイドブックには載っていない、島でのリアルな生活の知恵や情報を交換し合いたい方。
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <p className="text-lg font-bold text-slate-500 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-slate-200" />
              ひとつでも当てはまるなら、ぜひご参加ください
              <span className="w-8 h-px bg-slate-200" />
            </p>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section 
        id="concept" 
        data-observe="section"
        className={`relative py-32 px-6 lg:py-48 reveal overflow-hidden ${isVisible('concept') ? 'is-visible' : ''}`}
      >
        {/* Organic Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-100 rounded-full blur-[100px] -z-10 opacity-60" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-50 rounded-full blur-[80px] -z-10 opacity-40" />

        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Content Card */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-4 mb-8">
                <span className="w-12 h-0.5 bg-orange-500" />
                <p className="font-bold text-xl tracking-[0.2em] text-orange-500 uppercase">Our Concept</p>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 leading-[1.2] tracking-tight" style={{ fontFamily: 'var(--font-handwriting)' }}>
                ゆるく繋がる、<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">本気で遊ぶ。</span>
              </h2>
              
              <div className="space-y-8 max-w-xl">
                <p className="text-2xl md:text-3xl text-slate-800 leading-relaxed font-bold tracking-tight">
                  シークレット感は「排他的な暗さ」ではなく、内側に温かさがあること。
                </p>
                <div className="h-px w-full bg-gradient-to-r from-slate-200 to-transparent" />
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                  まずは一緒に遊ぶ。そこから、ガイドブックには載っていない島のリアルな縁を育てていこう。都会の流儀とは違う、隠岐ならではの「信頼という通貨」で繋がる場所。
                </p>
              </div>
            </div>

            {/* Right: Asymmetrical Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="space-y-4 md:space-y-8 mt-12">
                  <div className="relative aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
                    <Image
                      src="/images/oki/230516_DJI_0468.jpg"
                      alt="隠岐の絶景"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-orange-500 p-8 flex items-end">
                    <p className="text-white font-serif text-2xl font-bold leading-tight">遊びが、<br />縁になる。</p>
                  </div>
                </div>
                <div className="space-y-4 md:space-y-8">
                  <div className="relative aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700 border-8 border-white">
                    <Image
                      src="/images/oki/移住者交流会の様子.jpg"
                      alt="集う仲間たち"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
                    <Image
                      src="/images/oki/oki-sozai/oki-marugoto-38.jpg"
                      alt="隠岐の文化"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section 
        id="activities" 
        data-observe="section"
        className={`bg-gradient-premium py-32 px-6 lg:py-48 reveal ${isVisible('activities') ? 'is-visible' : ''}`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <p className="font-bold tracking-widest text-orange-600 mb-6 text-xl">ACTIVITIES</p>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-slate-900">
              体験と仕組みで、距離を縮める。
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((item, index) => (
              <div 
                key={item.title} 
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-4 border-white"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section 
        id="roadmap" 
        data-observe="section"
        className={`bg-white py-32 px-6 lg:py-48 reveal ${isVisible('roadmap') ? 'is-visible' : ''}`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="font-bold tracking-widest text-orange-500 mb-4 text-xl">ROADMAP</p>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-slate-900 mb-6">
              正式オープンまでの流れ
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              いきなり完成したコミュニティに入るのではなく、ルールづくりから一緒に参加できるのが醍醐味です。まずはLINEに登録して、みんなで作戦会議を始めましょう！
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Vertical Timeline */}
            <div className="relative pl-4 lg:pl-0">
              {/* Step 1 */}
              <div className="flex gap-6 relative group">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 shadow-sm z-10 transition-transform group-hover:scale-110">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="w-1.5 h-full bg-blue-50 my-2 rounded-full transition-colors group-hover:bg-orange-100" />
                </div>
                <div className="pb-12 pt-2">
                  <span className="text-sm font-bold tracking-widest text-orange-500 mb-1 block">STEP 01</span>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">公式LINEで先行登録</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">まずはLINEを友だち追加（完全無料）。ここから、コミュニティ立ち上げの裏側や限定情報が届き始めます。</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 relative group">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 shadow-sm z-10 transition-transform group-hover:scale-110">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div className="w-1.5 h-full bg-blue-50 my-2 rounded-full transition-colors group-hover:bg-blue-100" />
                </div>
                <div className="pb-12 pt-2">
                  <span className="text-sm font-bold tracking-widest text-blue-500 mb-1 block">STEP 02</span>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">みんなで作戦会議</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">LINE上でアンケートを取ったり、小規模なオフラインのプレイベントを実施。みんなでやりたい事やルールを考えていきます。</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 relative group">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center text-sky-500 shadow-sm z-10 transition-transform group-hover:scale-110">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  {/* No line after the last step */}
                </div>
                <div className="pb-2 pt-2">
                  <span className="text-sm font-bold tracking-widest text-sky-500 mb-1 block">STEP 03</span>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">初期メンバー正式募集</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">意見をもとに形を作ったら、いよいよ正式ローンチ。LINE登録者には一番に優先案内をお送りします！</p>
                </div>
              </div>
            </div>

            {/* Right: Oki Life Image */}
            <div className="relative w-full max-w-sm mx-auto lg:max-w-md hidden md:block">
              <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/oki/230224-9.jpg"
                  alt="隠岐での島暮らしの様子"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative Blur */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-200/40 to-blue-300/40 blur-2xl -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Co-Creation Section */}
      <section 
        id="cocreation" 
        data-observe="section"
        className={`relative py-32 px-6 lg:py-48 reveal overflow-hidden ${isVisible('cocreation') ? 'is-visible' : ''}`}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/oki/20241112-DSC09331_隠岐旅工舎.jpg"
            alt="隠岐の風景"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]" />
        </div>

        <div className="mx-auto max-w-4xl text-center text-white relative z-10">
          <p className="font-bold tracking-widest text-orange-400 mb-6 text-xl">CO-CREATION</p>
          <h2 className="font-serif text-4xl md:text-6xl font-black mb-10 leading-tight">
            まだ決まっていないから、<br />一緒に決められる。
          </h2>
          <p className="text-xl text-sky-100 leading-relaxed mb-16 max-w-2xl mx-auto font-bold">
            名前も、ルールも、これからみんなで決めていきます。<br />
            まずはLINEに追加して、コミュニティが立ち上がる過程を一緒に楽しみませんか？（※登録・参加は無料です）
          </p>

          <div className="glass-dark rounded-3xl p-12 max-w-2xl mx-auto border border-white/30 relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <p className="text-3xl font-black mb-10">{content.footerTitle}</p>
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCtaClick("footer")}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-orange-500 px-12 py-6 text-xl font-black text-white transition-all hover:scale-105 hover:bg-orange-400 hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]"
              >
                <span>{content.footerCta}</span>
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
