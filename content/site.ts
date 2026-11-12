export type SitePhase = "waitlist" | "apply";

export type ActivityCopy = {
  title: string;
  body: string;
  image: string;
};

export type FaqItemCopy = {
  question: string;
  answer: string;
};

export type LandingContent = {
  heroKicker: string;
  heroTitle: string;
  heroLead: string;
  heroMeta: string;
  heroCta: string;
  issueKicker: string;
  issueTitle: string;
  issueLead: string;
  issueStatNumber: string;
  issueStatLabel: string;
  issueBody: string;
  issueSourceNote: string;
  philosophyKicker: string;
  philosophyTitle: string;
  philosophyBody1: string;
  philosophyBody2: string;
  recommendedKicker: string;
  recommendedTitle: string;
  recommendedItems: [
    { title: string; body: string },
    { title: string; body: string },
    { title: string; body: string },
  ];
  activitiesKicker: string;
  activitiesTitle: string;
  activitiesLead: string;
  activities: ActivityCopy[];
  membershipKicker: string;
  membershipTitle: string;
  membershipFeeText: string;
  membershipFeeSub: string;
  membershipWhyTitle: string;
  membershipWhyBody1: string;
  membershipWhyBody2: string;
  roadmapTitle: string;
  roadmapSteps: [
    { num: string; title: string; body: string },
    { num: string; title: string; body: string },
    { num: string; title: string; body: string },
  ];
  faqKicker: string;
  faqTitle: string;
  faqItems: FaqItemCopy[];
  footerTitle: string;
  footerBody: string;
  footerCta: string;
  footerNote: string;
};

const defaultActivities: ActivityCopy[] = [
  {
    title: "魚突き・漁船体験",
    body: "海に詳しいメンバーと一緒に潜ったり船に乗ったり。ひとりでは踏み出しにくい隠岐の海を、安全に楽しく体験します。",
    image: "/images/oki/island-activity-community.jpg",
  },
  {
    title: "週末のBBQ・キャンプ",
    body: "道具や食材を持ち寄って、浜辺や広場でゆるやかに集まる時間。おひとりでも、ご家族連れでも自然に馴染める場所です。",
    image: "/images/oki/bbq.jpg",
  },
  {
    title: "帰り道の送迎・相乗り相談",
    body: "集まりの帰り道やちょっとした移動を、ご近所同士で相談し合える小さな仕組み。移動のついでに会話と信頼が生まれます。",
    image: "/images/oki/bus.png",
  },
  {
    title: "空き家・暮らしの知恵袋",
    body: "ネットには出ない住まいの情報や冬の暮らし方など、島のリアルを一足先に経験したUIターンの先輩たちに相談できます。",
    image: "/images/oki/akiya.png",
  },
];

const waitlistContent: LandingContent = {
  heroKicker: "隠岐の島町｜20〜50代のIターン・Uターン者コミュニティ",
  heroTitle: "隠岐の暮らしに、\n職場でもご近所でもない\n「第3の居場所」を。",
  heroLead:
    "外から越してきた人も、島へ戻ってきた人も。年齢や職場の垣根を外して、休日にふらっと遊び、暮らしの知恵を分け合えるメンバーシップ「Okey-Dokey」を立ち上げます。",
  heroMeta: "正式オープン後は月額500円（税込） ／ 現在のLINE先行登録・立ち上げ会議は無料",
  heroCta: "公式LINEで先行案内を受け取る",
  issueKicker: "背景にあること",
  issueTitle: "島の暮らし、実はすこし\n孤独ではありませんか。",
  issueLead:
    "隠岐の島町には年間およそ450人が転入しています。しかし、新しい生活を始めた人のうち、3年以内に島を離れてしまう人は約半分にのぼります。",
  issueStatNumber: "50%",
  issueStatLabel: "転入者の3年以内離島率",
  issueBody:
    "離れてしまう一番の理由は、仕事や住まいそのものではなく「職場と家の往復以外に、気兼ねなく本音で話せるヨコのつながりがないこと」でした。それは島外から来たIターン者だけでなく、一度島を出て戻ってきたUターン者にとっても同じです。",
  issueSourceNote: "※数値は独自調査に基づく",
  philosophyKicker: "私たちの考え方",
  philosophyTitle: "都会の「お金」より、\n島の「信頼」でつながる。",
  philosophyBody1:
    "都会の流儀は「お金でサービスを買うこと」。けれど隠岐の流儀は「信頼が通貨になること」です。",
  philosophyBody2:
    "どこで働いているか、何歳か、いつ島に来たかは関係ありません。まずは一緒に海へ出て、火を囲み、言葉を交わすこと。そこからガイドブックには載らない島の縁と、困ったときに頼れる関係性を少しずつ育てていきます。",
  recommendedKicker: "こんな方のために",
  recommendedTitle: "職場と家の往復だけで、\n島の暮らしを終わらせたくない人へ。",
  recommendedItems: [
    {
      title: "職場の外に、フラットな仲間が欲しい",
      body: "仕事の関係や昔からのしがらみを離れて、週末にふらっと誘い合える友人や、同じ目線で話せる仲間をつくりたい方。",
    },
    {
      title: "せっかくの島の自然を、誰かと遊びたい",
      body: "釣りや魚突き、BBQやキャンプなど、ひとりでは始めにくい島の遊びを仲間と一緒に気楽に体験したい方。",
    },
    {
      title: "島のリアルな暮らしの知恵を交換したい",
      body: "住まい探し（空き家）、冬の暮らし方、おすすめのお店や送り迎えなど、生きた情報を信頼できる仲間とシェアしたい方。",
    },
  ],
  activitiesKicker: "日々の風景",
  activitiesTitle: "体験と小さな仕組みで、\n日常の距離を縮める。",
  activitiesLead:
    "大げさなイベントではなく、日々の暮らしがすこし楽しく、心強くなる企画をメンバー同士で持ち寄ります。",
  activities: defaultActivities,
  membershipKicker: "会費と参加の流れ",
  membershipTitle: "コーヒー1杯分の会費で、\n安心できる「場の質」を守る。",
  membershipFeeText: "月額 500円（税込）",
  membershipFeeSub: "※正式オープン後の会費です。現在の公式LINE先行登録および立ち上げ準備期間の参加は無料です。",
  membershipWhyTitle: "なぜ「完全無料」ではなく「月額500円」にするのか",
  membershipWhyBody1:
    "ひとつは、冷やかしや営業目的の参加を防ぎ、誠実な大人だけが安心して関われる空気を守るためです。誰でも入れる無料の匿名掲示板ではなく、小さなコミットメントを共有することで、狭い島の中でも信頼して話せる場所をつくります。",
  membershipWhyBody2:
    "もうひとつは、誰かひとりに負担を偏らせないためです。共有のキャンプ道具の手入れや集まる場の運営費をみんなで少しずつ出し合うことで、「お客さん」ではなく「一緒につくる仲間」として長く続く仕組みにします。",
  roadmapTitle: "正式オープンまでの流れ",
  roadmapSteps: [
    {
      num: "1",
      title: "公式LINEで先行登録（無料）",
      body: "まずはLINEを友だち追加。コミュニティ立ち上げの裏側や、プレ企画の案内が届き始めます。",
    },
    {
      num: "2",
      title: "作戦会議・プレ交流会",
      body: "LINE上のアンケートでやりたい企画を話したり、少人数のオフライン交流会（任意参加）で雰囲気を体験できます。",
    },
    {
      num: "3",
      title: "初期メンバー正式募集（月額500円）",
      body: "準備が整い次第、LINE先行登録者へ優先案内をお送りします。内容に納得した方のみ本登録へ進めます。",
    },
  ],
  faqKicker: "よくある質問",
  faqTitle: "参加前の疑問にお答えします",
  faqItems: [
    {
      question: "Iターン（島外出身）ではなく、Uターン（隠岐出身）でも参加できますか？",
      answer:
        "もちろんです。「進学や就職で一度島を出て戻ってきたけれど、今の感覚でフラットに話せる同世代や新しい仲間が欲しい」というUターンの方も大歓迎です。",
    },
    {
      question: "40代・50代や、家族連れ・人見知りでも馴染めますか？",
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
  footerTitle: "最初の100人と、\n隠岐の新しい日常をつくる。",
  footerBody:
    "完成されたサービスを待つのではなく、どんな場所にしていくかを一緒に話すところから始めませんか。\nまずは公式LINEにて、立ち上げの裏側をお届けします。",
  footerCta: "公式LINEで先行案内を受け取る",
  footerNote: "先行登録は無料です。正式オープン時にご案内をお送りします。",
};

const applyContent: LandingContent = {
  ...waitlistContent,
  heroMeta: "月額500円（税込・いつでも退会可能） ／ 第1期メンバー受付中",
  heroCta: "メンバーシップに申し込む",
  footerTitle: "隠岐の暮らしを広げる準備はできていますか？",
  footerCta: "メンバーシップに申し込む",
  footerNote: "月額500円（税込）。いつでも退会可能です。",
};

export const getSitePhase = (): SitePhase => {
  const phase = process.env.NEXT_PUBLIC_SITE_PHASE;
  return phase === "apply" ? "apply" : "waitlist";
};

export const getLandingContent = (phase: SitePhase): LandingContent => {
  return phase === "apply" ? applyContent : waitlistContent;
};
