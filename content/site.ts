export type SitePhase = "waitlist" | "apply";

export type HeroH1Copy = {
  line1: string;
  line2Before: string;
  line2Highlight: string;
  line3Before: string;
  line3Highlight: string;
  line3After: string;
};

export type ActivityCopy = {
  title: string;
  body: string;
};

export type LandingContent = {
  heroH1: HeroH1Copy;
  heroBadge: string;
  heroCommunityLabel: string;
  heroRecruitBadge: string;
  heroSubcopyLines: [string, string, string];
  heroCta: string;
  heroLineCounterSuffix: string;
  heroCircleBadge: string;
  heroBenefitsHeading: string;
  heroBenefits: [string, string, string, string];
  introLabel: string;
  introTitle: string;
  introBody: string;
  crisisBadge: string;
  crisisTitle: string;
  crisisStatLead: string;
  crisisCause: string;
  crisisSourceNote: string;
  recommendedLabel: string;
  recommendedBubble: string;
  recommendedTitle: string;
  recommendedLead: string;
  recommendedCards: [
    { title: string; body: string },
    { title: string; body: string },
    { title: string; body: string },
  ];
  recommendedClosing: string;
  conceptLabel: string;
  conceptTitle: string;
  conceptLead: string;
  conceptBody: string;
  conceptImageCaption: string;
  activitiesLabel: string;
  activitiesTitle: string;
  activitiesLead: string;
  activities: ActivityCopy[];
  roadmapLabel: string;
  roadmapTitle: string;
  roadmapLead: string;
  roadmapSteps: [
    { step: string; title: string; body: string },
    { step: string; title: string; body: string },
    { step: string; title: string; body: string },
  ];
  cocreationLabel: string;
  cocreationTitle: string;
  cocreationBody: string;
  cocreationBadge: string;
  footerTitle: string;
  footerCta: string;
};

const waitlistActivities: ActivityCopy[] = [
  {
    title: "魚突き・漁船体験",
    body: "海の人と一緒に体験し、隠岐ならではの暮らしのリズムに触れる。",
  },
  {
    title: "BBQ・キャンプ",
    body: "備品をシェアして週末を過ごす。自然と会話が生まれ、仲間づくりの入口になる。",
  },
  {
    title: "送迎シャトル",
    body: "帰り道を一緒に探す小さな仕組み。移動のついでに、信頼が積み重なる。",
  },
  {
    title: "空き家・暮らし相談",
    body: "島のリアルを知る仲間と情報を交換し、住まい探しの不安をひとつずつほどく。",
  },
];

const waitlistContent: LandingContent = {
  heroH1: {
    line1: "隠岐の暮らし、",
    line2Before: "もっと",
    line2Highlight: "楽しく",
    line3Before: "もっと",
    line3Highlight: "豊かに",
    line3After: "。",
  },
  heroBadge: "立ち上げ準備中",
  heroCommunityLabel: "隠岐移住者コミュニティ",
  heroRecruitBadge: "初期メンバー募集中",
  heroSubcopyLines: [
    "移住者同士が、気兼ねなく笑い合える居場所を——",
    "ルールづくりから一緒に動いてくれる",
    "最初の仲間を、いま募集しています。",
  ],
  heroCta: "LINEで先行情報を受け取る",
  heroLineCounterSuffix: "がLINEで作戦会議中！",
  heroCircleBadge: "ヨコのつながりで、\n隠岐がもっと\n好きになる。",
  heroBenefitsHeading: "このコミュニティでできること",
  heroBenefits: [
    "仲間ができる",
    "暮らしの知恵が集まる",
    "週末が豊かになる",
    "挑戦を応援する",
  ],
  introLabel: "ISLAND RHYTHM",
  introTitle: "都会の「お金」より、\n島の「信頼」でつながる。",
  introBody:
    "都会の流儀は「お金で解決」。隠岐の流儀は「信頼が通貨」。\n\n私たちは、職場やご近所以外に、気兼ねなく本音で話せる「ヨコのつながり」を育てます。島の暮らしを、ひとりで抱え込まず、仲間と広げていくために。",
  crisisBadge: "SURVEY RESULTS",
  crisisTitle: "島の暮らし、\n実はちょっと\n孤独？",
  crisisStatLead:
    "隠岐には年間 約450人が転入。\nしかし、新しい生活を始めた人の\n3年以内の定着率は、わずか——",
  crisisCause: "「移住者同士のつながり不足」",
  crisisSourceNote: "※数値は独自調査に基づく",
  recommendedLabel: "THIS COMMUNITY IS FOR...",
  recommendedBubble: "このコミュニティは、",
  recommendedTitle: "こんな想いを抱える、\nあなたのための場所です。",
  recommendedLead:
    "隠岐での暮らしを、ただの「日常」で終わらせたくない。\nそんな方に、新しいつながりの入り口を用意します。",
  recommendedCards: [
    {
      title: "ヨコのつながりが欲しい",
      body: "職場やご近所以外に、気兼ねなく本音で話せる友達や、週末を一緒に過ごす仲間が欲しい方。",
    },
    {
      title: "島の遊びを共有したい",
      body: "海や山の豊かさを、ひとりではなく誰かと分かち合い、暮らしの幅を広げていきたい方。",
    },
    {
      title: "島のリアルを知りたい",
      body: "ガイドブックには載っていない、暮らしの知恵や情報を、信頼できる仲間と交換したい方。",
    },
  ],
  recommendedClosing: "ひとつでも当てはまるなら、ぜひご参加ください",
  conceptLabel: "Our Concept",
  conceptTitle: "ゆるくつながる、\n本気で遊ぶ。",
  conceptLead:
    "「秘密」は排他ではなく、仲間の中にだけ広がる温かさのこと。",
  conceptBody:
    "まずは一緒に遊ぶ。そこから、ガイドブックには載らない島の縁を育てていく。都会とは違う、隠岐ならではの「信頼」でつながる場所です。",
  conceptImageCaption: "遊びが、\n縁になる。",
  activitiesLabel: "ACTIVITIES",
  activitiesTitle: "体験と仕組みで、距離を縮める。",
  activitiesLead:
    "コミュニティでは、例えば以下のような企画を検討しています。\nみんなの「やりたい」を持ち寄って、隠岐をもっと楽しくしていきましょう。",
  activities: waitlistActivities,
  roadmapLabel: "ROADMAP",
  roadmapTitle: "正式オープンまでの流れ",
  roadmapLead:
    "完成品を待つのではなく、ルールづくりから一緒に参加できるのがこのプロジェクトの醍醐味です。まずはLINEに登録して、作戦会議から始めましょう。",
  roadmapSteps: [
    {
      step: "STEP 01",
      title: "公式LINEで先行登録",
      body: "LINEを友だち追加（完全無料）。立ち上げの裏側や限定情報が届き始めます。",
    },
    {
      step: "STEP 02",
      title: "みんなで作戦会議",
      body: "LINE上でアンケートや小規模なオフラインイベントを通じ、やりたいことやルールを一緒に考えます。",
    },
    {
      step: "STEP 03",
      title: "初期メンバー正式募集",
      body: "みんなの声を形にしたら正式ローンチ。LINE登録者には、いち早く優先案内をお送りします。",
    },
  ],
  cocreationLabel: "CO-CREATION",
  cocreationTitle: "まだ決まっていないから、\n一緒に決められる。",
  cocreationBody:
    "名前も、会費も、ルールも——これからみんなで決めていきます。\nまずはLINEに追加して、コミュニティが立ち上がる過程を一緒に楽しみませんか？（登録・参加は無料です）",
  cocreationBadge: "完全無料",
  footerTitle: "最初の100人。\n隠岐を一緒に遊び尽くす\n初期メンバーを募集中",
  footerCta: "LINEで先行情報を受け取る",
};

const applyContent: LandingContent = {
  ...waitlistContent,
  heroH1: {
    line1: "隠岐での挑戦を、",
    line2Before: "",
    line2Highlight: "孤独なまま",
    line3Before: "",
    line3Highlight: "終わらせない",
    line3After: "。",
  },
  heroSubcopyLines: [
    "移住者同士が信頼でつながるコミュニティ。",
    "いま、この場から申し込みができます。",
    "仲間と、島の暮らしを前に進めましょう。",
  ],
  heroCta: "サービスに申し込む",
  heroRecruitBadge: "受付中",
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
