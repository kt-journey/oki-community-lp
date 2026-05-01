export type SitePhase = "waitlist" | "apply";

export type LandingContent = {
  heroTitle: string;
  heroSubTitle: string;
  heroCta: string;
  footerTitle: string;
  footerCta: string;
};

const waitlistContent: LandingContent = {
  heroTitle: "隠岐へ移住した同世代で、\n最高にオモシロイ島暮らしを！",
  heroSubTitle:
    "ここは隠岐の島へ移住してきた20〜30代のための、ゼロからつくる新しいコミュニティ。まずは一緒に遊ぶところから始めない？",
  heroCta: "まずはLINEで先行情報を受け取る",
  footerTitle: "【完全無料】最初の100人！隠岐を遊び尽くす初期メンバーを募集中",
  footerCta: "公式LINEを追加して案内を受け取る",
};

const applyContent: LandingContent = {
  heroTitle: "隠岐での挑戦を、孤独なまま終わらせない。",
  heroSubTitle:
    "移住者同士が信頼でつながるコミュニティ。いま、この場から申し込みができます。",
  heroCta: "サービスに申し込む",
  footerTitle: "仲間と動き出す準備はできていますか？",
  footerCta: "今すぐ申し込む",
};

export const getSitePhase = (): SitePhase => {
  const phase = process.env.NEXT_PUBLIC_SITE_PHASE;
  return phase === "apply" ? "apply" : "waitlist";
};

export const getLandingContent = (phase: SitePhase): LandingContent => {
  return phase === "apply" ? applyContent : waitlistContent;
};
