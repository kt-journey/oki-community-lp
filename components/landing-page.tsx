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
      <section className="relative h-screen min-h-[800px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/oki/230516_DJI_0468.jpg"
            alt="隠岐の美しい海と仲間たち"
            fill
            priority
            className="hero-image object-cover"
          />
          {/* Lighter, brighter overlay for young vibe */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-500/30 via-transparent to-blue-900/60" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <div className="reveal is-visible max-w-4xl pt-20">
            <p className="mb-6 inline-block rounded-full bg-white/20 px-6 py-2 font-bold tracking-widest backdrop-blur-md">OKEY-DOKEY / 隠岐移住者限定コミュニティ</p>
            <h1 className="mb-8 font-serif text-5xl font-black leading-tight tracking-tight md:text-7xl lg:text-8xl drop-shadow-2xl whitespace-pre-line">
              {content.heroTitle}
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white md:text-2xl font-bold drop-shadow-md">
              {content.heroSubTitle}
            </p>

            <div className="reveal is-visible delay-500">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCtaClick("hero")}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-orange-500 px-10 py-5 font-bold text-white transition-all hover:bg-orange-400 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]"
              >
                <span className="relative z-10 text-lg">{content.heroCta}</span>
                <svg className="relative z-10 h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <span className="font-bold text-xs tracking-[0.3em] text-white">SCROLL DOWN</span>
          <div className="h-12 w-1 bg-white rounded-full" />
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
              <h2 className="font-serif text-4xl font-black text-slate-900 md:text-5xl leading-tight mb-8">
                都会の「お金」より、<br />島の「信頼」で遊ぼう。
              </h2>
              <div className="h-2 w-20 bg-blue-500 mb-8 rounded-full" />
              <p className="text-lg leading-relaxed text-slate-700 font-medium">
                都会の流儀は「お金で解決」。隠岐の流儀は「信頼が通貨」。<br /><br />
                私たちは、気兼ねなく笑い合える「ヨコの繋がり」を再構築します。島の暮らしを、もっとオモシロク、同世代と広げていくために。
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/images/oki/移住者交流会の様子.jpg"
                  alt="笑い合う同世代"
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
        className={`bg-blue-50 py-32 px-6 lg:py-48 reveal ${isVisible('crisis') ? 'is-visible' : ''}`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-serif text-4xl md:text-5xl font-black mb-8 leading-tight text-slate-900">
              島の暮らし、<br />実はちょっと孤独？
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed mb-8 font-medium">
              隠岐には年間 約450人が転入しているのに、<br />
              定着率の壁はなんと <span className="text-5xl font-black text-transparent text-gradient mx-2">50%</span>。<br />
              一番の原因は、仕事でも家でもなく「同世代との繋がり不足」だった。
            </p>
            <p className="text-sm text-slate-500 font-bold">※数値は独自調査に基づく</p>
          </div>

          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl shadow-2xl border border-white/50 group">
            <Image
              src="/images/oki/20240427-DSC06774.jpg"
              alt="集まる人々"
              fill
              className="object-cover transition-transform duration-[20s] group-hover:scale-110"
            />
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section 
        id="concept" 
        data-observe="section"
        className={`bg-white py-32 px-6 lg:py-48 reveal ${isVisible('concept') ? 'is-visible' : ''}`}
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-bold text-xl tracking-widest text-orange-500 mb-6">CONCEPT</p>
          <h2 className="font-serif text-5xl md:text-6xl font-black text-slate-900 mb-10 leading-tight">
            ゆるく繋がる、<br />本気で遊ぶ。
          </h2>
          <p className="text-2xl text-slate-700 leading-relaxed font-bold">
            シークレット感は「排他的な暗さ」ではなく、内側に温かさがあること。<br />
            まずは一緒に遊ぶ。そこから、島のリアルな縁を育てていこう。
          </p>
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

            {/* Right: Phone Image */}
            <div className="relative w-full max-w-sm mx-auto lg:max-w-md hidden md:block">
              <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80"
                  alt="スマホでチャットをする様子"
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

      {/* Co-Creation Section */}      <section 
        id="cocreation" 
        data-observe="section"
        className={`bg-gradient-dark text-white py-32 px-6 lg:py-48 reveal ${isVisible('cocreation') ? 'is-visible' : ''}`}
      >
        <div className="mx-auto max-w-4xl text-center">
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
