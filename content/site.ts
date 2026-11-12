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
  fig: string;
  category: string;
  title: string;
  body: string;
  image: string;
};

export type FeeReasonCopy = {
  num: string;
  title: string;
  body: string;
};

export type FaqItemCopy = {
  question: string;
  answer: string;
};

export type LandingContent = {
  mastheadTitle: string;
  mastheadTarget: string;
  heroTag: string;
  heroStatusDot: string;
  heroH1: HeroH1Copy;
  heroLead: string;
  heroSpecFeeLabel: string;
  heroSpecFeeValue: string;
  heroSpecFeeNote: string;
  heroSpecStatusLabel: string;
  heroSpecStatusValue: string;
  heroCta: string;
  heroCtaSub: string;
  heroBenefits: [string, string, string, string];
  issueLabel: string;
  issueTitle: string;
  issueStatLead: string;
  issueStatNumber: number;
  issueStatUnit: string;
  issueStatCaption: string;
  issueCauseTitle: string;
  issueCauseBody: string;
  issueSourceNote: string;
  philosophyLabel: string;
  philosophyTitle: string;
  philosophyLead: string;
  philosophyBody: string;
  recommendedLabel: string;
  recommendedTitle: string;
  recommendedLead: string;
  recommendedCards: [
    { num: string; title: string; body: string },
    { num: string; title: string; body: string },
    { num: string; title: string; body: string },
  ];
  activitiesLabel: string;
  activitiesTitle: string;
  activitiesLead: string;
  activities: ActivityCopy[];
  membershipLabel: string;
  membershipTitle: string;
  membershipLead: string;
  membershipFeeHeading: string;
  membershipFeeAmount: string;
  membershipFeeTax: string;
  membershipFeeBadge: string;
  membershipFeeNotice: string;
  membershipReasons: [FeeReasonCopy, FeeReasonCopy];
  roadmapHeading: string;
  roadmapSteps: [
    { step: string; title: string; body: string },
    { step: string; title: string; body: string },
    { step: string; title: string; body: string },
  ];
  faqLabel: string;
  faqTitle: string;
  faqItems: FaqItemCopy[];
  footerLabel: string;
  footerTitle: string;
  footerBody: string;
  footerCta: string;
  footerNote: string;
};

const defaultActivities: ActivityCopy[] = [
  {
    fig: "Fig. 01",
    category: "SEA & BOAT",
    title: "魚突き・漁船体験",
    body: "海に詳しいメンバーと一緒に潜ったり船に乗ったり。ひとりでは踏み出しにくい隠岐の海を、安全に楽しく体験します。",
    image: "/images/oki/island-activity-community.jpg",
  },
  {
    fig: "Fig. 02",
    category: "TABLE & CAMP",
    title: "週末のBBQ・キャンプ",
    body: "道具や食材を持ち寄って、浜辺や広場でゆるやかに集まる時間。おひとりでも、ご家族連れでも自然に馴染める場所です。",
    image: "/images/oki/bbq.jpg",
  },
  {
    fig: "Fig. 03",
    category: "RIDE SHARE",
    title: "帰り道の送迎・相乗り相談",
    body: "集まりの帰り道やちょっとした移動を、ご近所同士で相談し合える小さな仕組み。移動のついでに会話と信頼が生まれます。",
    image: "/images/oki/bus.png",
  },
  {
    fig: "Fig. 04",
    category: "HOUSING & LIFE",
    title: "空き家・暮らしの知恵袋",
    body: "ネットには出ない住まいの情報や冬の暮らし方など、島のリアルを一足先に経験したUIターンの先輩たちに相談できます。",
    image: "/images/oki/akiya.png",
  },
];

const waitlistContent: LandingContent = {
  mastheadTitle: "Okey-Dokey｜隠岐の島町 UIターン者コミュニティ",
  mastheadTarget: "対象：隠岐の島町に暮らす20〜50代のIターン・Uターン者",
  heroTag: "ひとりじゃない、島ぐらし。",
  heroStatusDot: "第1期・初期メンバー先行案内中（100名まで）",
  heroH1: {
    line1: "隠岐の暮らしを、",
    line2Before: "もっと",
    line2Highlight: "楽しく",
    line3Before: "もっと",
    line3Highlight: "気楽に",
    line3After: "。",
  },
  heroLead:
    "外から越してきたIターンの方も、島へ戻ってきたUターンの方も。職場やご近所の垣根を外して、休日にふらっと遊び、暮らしの知恵をシェアできる「第3の居場所」を立ち上げます。",
  heroSpecFeeLabel: "正式オープン後の会費",
  heroSpecFeeValue: "月額 500円",
  heroSpecFeeNote: "（税込・コーヒー1杯分）",
  heroSpecStatusLabel: "現在のステップ",
  heroSpecStatusValue: "公式LINEでの先行登録・作戦会議は無料",
  heroCta: "公式LINEで先行案内を受け取る（無料）",
  heroCtaSub: "※先行登録は無料です。正式オープン時に優先案内をお送りします。",
  heroBenefits: [
    "世代や職場を超えた仲間づくり",
    "海遊び・週末BBQのシェア",
    "空き家・暮らしのリアルな知恵",
    "月額500円で守る安心な場",
  ],
  issueLabel: "01 / WHY WE START",
  issueTitle: "島の暮らし、\n実はすこし孤独ではありませんか。",
  issueStatLead:
    "隠岐の島町には年間およそ450人が転入しています。しかし、新しい生活を始めた人のうち、3年以内に島を離れてしまう人は約半分にのぼります。",
  issueStatNumber: 50,
  issueStatUnit: "%",
  issueStatCaption: "転入者の3年以内離島率",
  issueCauseTitle: "原因は仕事や住まいではなく、「職場と家のあいだに、気兼ねなく話せるヨコのつながりがないこと」でした。",
  issueCauseBody:
    "職場と家の往復だけでは、せっかくの島の暮らしも窮屈になってしまいます。それは島外から来たIターン者だけでなく、一度島を出て戻ってきたUターン者にとっても同じです。",
  issueSourceNote: "※数値は独自調査に基づく",
  philosophyLabel: "02 / OUR PHILOSOPHY",
  philosophyTitle: "都会の「お金」より、\n島の「信頼」でつながる。",
  philosophyLead: "都会の流儀は「お金でサービスを買うこと」。けれど隠岐の流儀は「信頼が通貨になること」です。",
  philosophyBody:
    "どこで働いているか、何歳か、いつ島に来たかは関係ありません。まずは一緒に海へ出て、火を囲み、言葉を交わすこと。そこからガイドブックには載らない島の縁と、困ったときに気兼ねなく頼れる「ヨコのつながり」を育てていきます。",
  recommendedLabel: "03 / FOR WHOM",
  recommendedTitle: "こんな想いを抱える、\n20〜50代のUIターン者のために。",
  recommendedLead:
    "隠岐での暮らしを、ただの「職場と家の往復」で終わらせたくない方へ。新しいつながりの入り口を用意します。",
  recommendedCards: [
    {
      num: "01",
      title: "職場の外に、フラットな仲間が欲しい",
      body: "仕事の関係や昔からのしがらみを離れて、週末にふらっと誘い合える友人や、同じ目線で話せる仲間をつくりたい方。",
    },
    {
      num: "02",
      title: "せっかくの島の自然を、誰かと遊びたい",
      body: "釣りや魚突き、BBQやキャンプなど、ひとりでは始めにくい島の遊びを仲間と一緒に気楽に体験したい方。",
    },
    {
      num: "03",
      title: "島のリアルな暮らしの知恵を交換したい",
      body: "住まい探し（空き家）、冬の暮らし方、おすすめのお店や送り迎えなど、生きた情報を信頼できる仲間とシェアしたい方。",
    },
  ],
  activitiesLabel: "04 / ACTIVITIES & SCENES",
  activitiesTitle: "体験と小さな仕組みで、日常の距離を縮める。",
  activitiesLead:
    "大げさなイベントではなく、日々の暮らしがすこし楽しく、心強くなる企画をメンバー同士で持ち寄ります。",
  activities: defaultActivities,
  membershipLabel: "05 / MEMBERSHIP & ROADMAP",
  membershipTitle: "コーヒー1杯分の会費で、\n安心できる「場の質」を守る。",
  membershipLead:
    "Okey-Dokeyは、正式オープン後「月額500円」のメンバーシップ制コミュニティとして運営します。",
  membershipFeeHeading: "正式オープン後のメンバー会費",
  membershipFeeAmount: "500",
  membershipFeeTax: "円 / 月（税込）",
  membershipFeeBadge: "LINE先行登録・立ち上げ期間は無料",
  membershipFeeNotice:
    "※現在のLINE登録や立ち上げ作戦会議で料金が発生することは一切ありません。正式オープン時に改めてご案内し、ご希望の方のみ本登録へ進めます。",
  membershipReasons: [
    {
      num: "REASON 01",
      title: "冷やかしや勧誘のない、安心・安全な場を守るため",
      body: "誰でも入れる完全無料の匿名掲示板では、マウントや営業目的の参加を防ぎきれません。月500円という小さなコミットメントを共有することで、誠実な大人だけが安心して関われる空気を守ります。",
    },
    {
      num: "REASON 02",
      title: "誰かひとりに負担を偏らせず、気持ちよく続けるため",
      body: "共有のBBQ・キャンプ道具の手入れや、集まる場の運営費をみんなで少しずつ出し合うことで、「お客さん」ではなく「一緒につくる仲間」として長く続く仕組みにします。",
    },
  ],
  roadmapHeading: "正式オープンまでの3ステップ",
  roadmapSteps: [
    {
      step: "STEP 01",
      title: "公式LINEで先行登録（無料）",
      body: "まずはLINEを友だち追加。コミュニティ立ち上げの裏側や、プレ企画の案内が届き始めます。",
    },
    {
      step: "STEP 02",
      title: "作戦会議・プレ交流会に参加",
      body: "LINE上のアンケートで「やりたいこと」を投票したり、少人数のオフライン交流会（任意参加）で雰囲気を体験できます。",
    },
    {
      step: "STEP 03",
      title: "初期メンバー正式募集（月額500円）",
      body: "みんなの声を反映して正式ローンチ。LINE先行登録者へいち早く優先案内をお送りします（いつでも退会可能です）。",
    },
  ],
  faqLabel: "06 / FAQ",
  faqTitle: "参加前のよくあるご質問",
  faqItems: [
    {
      question: "Iターン（島外出身）ではなく、Uターン（隠岐出身）でも参加できますか？",
      answer:
        "もちろんです。「進学や就職で一度島を出て戻ってきたけれど、今の感覚でフラットに話せる同世代や新しい仲間が欲しい」というUターンの方も大歓迎です。",
    },
    {
      question: "40代・50代や、家族連れ・人見知りでも浮きませんか？",
      answer:
        "ご安心ください。若者だけの飲み会サークルではなく、20代から50代までが心地よい距離感で関われる場として設計しています。ご家族での参加や、少人数で落ち着いて話す企画も大切にしています。",
    },
    {
      question: "毎回イベントに参加しないといけませんか？",
      answer:
        "いいえ。暮らしの情報交換として覗くだけの方や、数ヶ月に一度、気が向いた企画だけ顔を出すスタイルでも全く問題ありません。",
    },
    {
      question: "今LINEに登録すると、すぐに月額500円がかかりますか？",
      answer:
        "いいえ、現在の公式LINE登録および立ち上げ準備期間の参加はすべて無料です。勝手に課金されることはありませんので、まずはお気軽に覗いてみてください。",
    },
  ],
  footerLabel: "07 / JOIN THE FIRST 100",
  footerTitle: "最初の100人と、\n隠岐の新しい日常をつくる。",
  footerBody:
    "完成されたサービスを待つのではなく、どんな場所にしていくかを一緒に話すところから始めませんか。\nまずは公式LINEにて、立ち上げの裏側をお届けします。",
  footerCta: "公式LINEで先行案内を受け取る（無料）",
  footerNote: "※LINE登録は無料です。いつでもブロック・解除が可能です。",
};

const applyContent: LandingContent = {
  ...waitlistContent,
  heroStatusDot: "第1期メンバー受付中（月額500円）",
  heroH1: {
    line1: "隠岐の暮らしを、",
    line2Before: "ひとりで抱えず",
    line2Highlight: "仲間と",
    line3Before: "もっと",
    line3Highlight: "面白がる",
    line3After: "。",
  },
  heroSpecStatusLabel: "募集状況",
  heroSpecStatusValue: "第1期メンバー入会受付中（いつでも退会可能）",
  heroCta: "メンバーシップに申し込む（月額500円）",
  heroCtaSub: "※月額500円（税込）。オンラインで簡単に手続きできます。",
  footerTitle: "隠岐の暮らしを広げる準備はできていますか？",
  footerCta: "今すぐメンバーシップに申し込む",
  footerNote: "※月額500円（税込）。いつでも退会可能です。",
};

export const getSitePhase = (): SitePhase => {
  const phase = process.env.NEXT_PUBLIC_SITE_PHASE;
  return phase === "apply" ? "apply" : "waitlist";
};

export const getLandingContent = (phase: SitePhase): LandingContent => {
  return phase === "apply" ? applyContent : waitlistContent;
};
