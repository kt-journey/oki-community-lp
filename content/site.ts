export type SitePhase = "waitlist" | "apply";

export type ActivityCopy = {
  title: string;
  category: string;
  body: string;
  image: string;
};

export type RuleItemCopy = {
  num: string;
  title: string;
  body: string;
};

export type FaqItemCopy = {
  question: string;
  answer: string;
};

export type LandingContent = {
  heroTag: string;
  heroTitle: string;
  heroSub: string;
  heroCta: string;
  introHeading: string;
  introTitle: string;
  introBody: string;
  introImage: string;
  issueHeading: string;
  issueTitle: string;
  issueStatNumber: string;
  issueStatLabel: string;
  issueLead: string;
  issueBody: string;
  philosophyHeading: string;
  philosophyTitle: string;
  philosophyBody1: string;
  philosophyBody2: string;
  activitiesHeading: string;
  activitiesTitle: string;
  activitiesLead: string;
  activities: ActivityCopy[];
  rulesHeading: string;
  rulesTitle: string;
  rulesLead: string;
  rules: [RuleItemCopy, RuleItemCopy, RuleItemCopy];
  planHeading: string;
  planTitle: string;
  planFeeAmount: string;
  planFeeUnit: string;
  planBadge: string;
  planNote: string;
  planReasons: [
    { title: string; body: string },
    { title: string; body: string },
  ];
  stepHeading: string;
  stepTitle: string;
  stepLead: string;
  steps: [
    { num: string; title: string; desc: string; note: string },
    { num: string; title: string; desc: string; note: string },
    { num: string; title: string; desc: string; note: string },
  ];
  stepCta: string;
  stepCtaNote: string;
  faqHeading: string;
  faqTitle: string;
  faqItems: FaqItemCopy[];
  closingHeading: string;
  closingTitle: string;
  closingBody: string;
  closingImage: string;
  closingCta: string;
  closingCtaNote: string;
};

const defaultActivities: ActivityCopy[] = [
  {
    title: "海遊び・魚突き・漁船体験",
    category: "SEA & OUTDOOR",
    body: "海に詳しいメンバーと一緒に潜ったり船に乗ったり。ひとりでは踏み出しにくい隠岐の海を、安全に楽しく体験します。",
    image: "/images/oki/island-activity-community.jpg",
  },
  {
    title: "週末のBBQ・焚き火キャンプ",
    category: "TABLE & CAMP",
    body: "道具や食材を持ち寄って、浜辺や広場でゆるやかに集まる時間。おひとりでも、ご家族連れでも自然に馴染めます。",
    image: "/images/oki/bbq.jpg",
  },
  {
    title: "帰り道の送迎・相乗り相談",
    category: "RIDE SHARE",
    body: "集まりの帰り道やちょっとした移動を、ご近所同士で相談し合える小さな仕組み。移動のついでに信頼が生まれます。",
    image: "/images/oki/bus.png",
  },
  {
    title: "空き家・暮らしの知恵袋",
    category: "HOUSING & LIFE",
    body: "ネットには出ない住まい情報や冬の暮らし方など、島のリアルを一足先に経験した先輩たちに気兼ねなく相談できます。",
    image: "/images/oki/akiya.png",
  },
];

const waitlistContent: LandingContent = {
  heroTag: "隠岐の島町｜20〜50代のIターン・Uターン者コミュニティ",
  heroTitle: "隠岐の暮らしに、\n職場でもご近所でもない\n「第3の居場所」を。",
  heroSub: "ひとりじゃない、島ぐらし。気兼ねなく笑い合えるヨコのつながりを、ここから。",
  heroCta: "公式LINEで先行案内を受け取る",
  introHeading: "はじめに",
  introTitle: "小さな離島からはじまる、新しいヨコのつながり",
  introBody:
    "Okey-Dokey（オキードーキー）は、隠岐の島町に暮らすIターン・Uターン者がつながり、島の暮らしをひとりで抱え込まずに面白がるためのコミュニティです。\n関わり方の深さや幅は、どっぷりでも、あっさり（見るだけ）でも、人それぞれ。職場やご近所以外に、本音で話せる仲間と出会える安心のサードプレイスを目指しています。",
  introImage: "/images/oki/island-rhythm-community.jpg",
  issueHeading: "背景にあること",
  issueTitle: "島の暮らし、実はすこし孤独ではありませんか？",
  issueStatNumber: "50%",
  issueStatLabel: "3年以内離島率（独自調査）",
  issueLead:
    "隠岐の島町には年間およそ450人が転入しています。しかし、新しい生活を始めた人の約半数が、3年以内に島を離れてしまう現実があります。",
  issueBody:
    "離れてしまう一番の理由は、仕事や家ではなく「職場と家の往復以外に、本音で話せるヨコのつながりがないこと」でした。それは島外から来たIターン者だけでなく、島へ戻ってきたUターン者にとっても同じです。",
  philosophyHeading: "私たちの流儀",
  philosophyTitle: "都会の「お金」より、島の「信頼」でつながる。",
  philosophyBody1:
    "都会の流儀は「お金でサービスを買うこと」。けれど隠岐の流儀は「信頼が通貨になること」です。",
  philosophyBody2:
    "どこで働いているか、何歳か、いつ島に来たかは関係ありません。まずは一緒に海へ出て、火を囲み、言葉を交わすこと。そこからガイドブックには載らない島の縁と、困ったときに頼れる関係性を少しずつ育てていきます。",
  activitiesHeading: "活動の風景",
  activitiesTitle: "体験と小さな仕組みで、日常の距離を縮める",
  activitiesLead:
    "大げさなイベントではなく、日々の暮らしがすこし楽しく、便利になる企画をメンバー同士で持ち寄ります。",
  activities: defaultActivities,
  rulesHeading: "３箇条",
  rulesTitle: "Okey-Dokey メンバーの３箇条",
  rulesLead: "誰もが心地よく、安心して関わり続けるための大切なお約束です。",
  rules: [
    {
      num: "1",
      title: "関わり方は人それぞれ。どっぷりでも、あっさり（見るだけ）でも大歓迎",
      body: "毎回イベントに参加しなくても大丈夫。情報交換を覗くだけ、数ヶ月に一度ふらっと顔を出すだけでも構いません。",
    },
    {
      num: "2",
      title: "職場や年齢、Iターン・Uターンの垣根を外してフラットに楽しむ",
      body: "島での肩書きや年数は関係ありません。お互いの価値観を尊重し、対等な立場で自然体のつながりを楽しみます。",
    },
    {
      num: "3",
      title: "コーヒー1杯分（月500円）を出し合い、安心できる場の質をみんなで守る",
      body: "無料の匿名空間ではなく小さなコミットメントを共有することで、冷やかしや勧誘のない心地よい居場所を維持します。",
    },
  ],
  planHeading: "プランと会費",
  planTitle: "コーヒー1杯分の会費で、安心できる「場の質」を守る",
  planFeeAmount: "500",
  planFeeUnit: "円 / 月（税込）",
  planBadge: "LINE先行登録・作戦会議は完全無料",
  planNote: "※正式オープン後の月額会費です。現在の公式LINE先行登録で費用が発生することはありません。",
  planReasons: [
    {
      title: "冷やかしや勧誘のない安心・安全な場を守るため",
      body: "誰でも入れる無料の掲示板ではなく、月500円のコミットメントを共有することで、誠実な大人だけが安心して関われる居場所を守ります。",
    },
    {
      title: "誰かひとりに負担を偏らせず、長く続けるため",
      body: "共有備品の手入れや場の運営費をみんなで少しずつ支え合い、「お客さん」ではなく「一緒につくる仲間」として気持ちよく継続します。",
    },
  ],
  stepHeading: "入会方法",
  stepTitle: "公式LINEから3ステップで参加",
  stepLead: "正式オープンまでは完全無料で立ち上げの裏側やプレ企画に参加できます。",
  steps: [
    {
      num: "1",
      title: "公式LINEを友だち追加",
      desc: "スマホからQRコードまたは下のボタンをタップして、Okey-Dokey公式LINEを友だち追加します（無料）。",
      note: "※完全無料・いつでもブロック可能",
    },
    {
      num: "2",
      title: "作戦会議やアンケートに参加",
      desc: "LINEトークに届く案内から、やりたい企画のアンケートに回答したり、少人数プレ交流会（任意）に参加できます。",
      note: "※見るだけの参加でもOK",
    },
    {
      num: "3",
      title: "初期メンバー正式募集のご案内",
      desc: "コミュニティが形になったら正式ローンチ。LINE先行登録者に最優先で月額500円の本登録案内が届きます。",
      note: "※納得した方のみ本登録へ",
    },
  ],
  stepCta: "公式LINEで先行案内を受け取る",
  stepCtaNote: "※LINEへ遷移します（登録・参加は完全無料）",
  faqHeading: "よくあるご質問",
  faqTitle: "参加前のよくあるご質問",
  faqItems: [
    {
      question: "Iターン（島外出身）ではなく、Uターン（隠岐出身）でも参加できますか？",
      answer:
        "もちろんです。「進学や就職で一度島を出て戻ってきたけれど、同世代のフラットな仲間が欲しい」というUターンの方も大歓迎です。",
    },
    {
      question: "40代・50代や、家族連れ・人見知りでも馴染めますか？",
      answer:
        "ご安心ください。若者だけの飲み会サークルではなく、20代から50代までが心地よい距離感で関われる場として設計しています。ご家族連れでの参加も大歓迎です。",
    },
    {
      question: "毎回イベントに参加しないといけませんか？",
      answer:
        "いいえ。暮らしの情報交換用として見るだけの方や、数ヶ月に一度気が向いた企画だけ顔を出すスタイルでも全く問題ありません。",
    },
    {
      question: "今LINEに登録すると、すぐに月額500円がかかりますか？",
      answer:
        "いいえ、現在のLINE先行登録および立ち上げ準備期間の参加はすべて無料です。勝手に課金されることはありませんので、安心してお気軽にご登録ください。",
    },
  ],
  closingHeading: "最後に",
  closingTitle: "最初の100人と、\n隠岐の新しい日常をつくる。",
  closingBody:
    "完成されたサービスを待つのではなく、どんな場所にしていくかを一緒に話すところから始めませんか。\n職場でもご近所でもない、気兼ねなく笑い合える仲間を、隠岐の島町で一緒につくりましょう。",
  closingImage: "/images/oki/20241112-DSC09331.jpg",
  closingCta: "公式LINEで先行案内を受け取る",
  closingCtaNote: "※LINEへ遷移します（登録・参加は完全無料）",
};

const applyContent: LandingContent = {
  ...waitlistContent,
  heroTag: "隠岐の島町｜20〜50代のIターン・Uターン者コミュニティ",
  heroTitle: "隠岐の暮らしを、\nひとりで抱えず\n仲間と面白がる。",
  heroCta: "メンバーシップに申し込む（月額500円）",
  planBadge: "第1期メンバー受付中（月額500円）",
  stepCta: "メンバーシップに申し込む",
  closingCta: "メンバーシップに申し込む",
};

export const getSitePhase = (): SitePhase => {
  const phase = process.env.NEXT_PUBLIC_SITE_PHASE;
  return phase === "apply" ? "apply" : "waitlist";
};

export const getLandingContent = (phase: SitePhase): LandingContent => {
  return phase === "apply" ? applyContent : waitlistContent;
};
