export interface PracticeQ {
  q: string;
  opts: string[];
  ans: number;
  why: string;
}

export interface ExampleItem {
  clip: string;
  source: string;
  ja: string;
  kana: string;
  zh: string;
  pattern: string;
  practice: PracticeQ;
}

export interface QuizQuestion {
  id: string;
  label: string;
  q: string;
  audioClip?: string;
  opts: string[];
  ans: number;
  why: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  frame: string;
  summary: string;
  mistake: string;
  fix: string;
}

export const L01_POINTS: GrammarPoint[] = [
  {
    id: "wa",
    title: "は（念作 wa）",
    frame: "A は B だ",
    summary: "把 A 當成今天要講的主題（A 是 B）。念作 wa，但寫作假名「は」。",
    mistake: "ここわ魔界だ。",
    fix: "ここは魔界だ。",
  },
  {
    id: "da-desu",
    title: "だ ／ です",
    frame: "普通：だ ｜ 禮貌：です",
    summary: "放在句尾把話說定。對朋友/自言自語用「だ」，對長輩/不熟的人用「です」，兩個不能同時放。",
    mistake: "私は学生だです。",
    fix: "私は学生です。",
  },
  {
    id: "dewa-nai",
    title: "ではない ／ じゃない",
    frame: "不是 B → ではない（書面）／ じゃない（口語）",
    summary: "直接把句尾的「だ」換成「ではない」或「じゃない」，不是接在「だ」後面。",
    mistake: "私は学生だではない。",
    fix: "私は学生ではない。",
  },
  {
    id: "ka",
    title: "か（問句）",
    frame: "普通：把 だ 拿掉 + か ｜ 禮貌：です + か",
    summary: "句尾加上「か」就變成問句。普通說法要把「だ」拿掉；禮貌說法保留「です」直接加「か」。",
    mistake: "それは君だか？",
    fix: "それは君か？",
  },
  {
    id: "mo",
    title: "も（也）",
    frame: "C も B だ / です",
    summary: "前面已經有同類的人事物時，把「は」換成「も」表示「也」。不能寫成「はも」。",
    mistake: "俺はも同じだ。",
    fix: "俺も同じだ。",
  },
];

export const L01_EXAMPLES: ExampleItem[] = [
  {
    clip: "iruma",
    source: "入間同學入魔了",
    ja: "ここは魔界だ",
    kana: "ここは まかい だ",
    zh: "這裡是魔界",
    pattern: "は・だ",
    practice: {
      q: "這裡是學校。　ここ（　）学校だ。",
      opts: ["は", "わ", "も", "か"],
      ans: 0,
      why: "念 wa，但主題助詞固定寫作「は」。",
    },
  },
  {
    clip: "eren",
    source: "進擊的巨人",
    ja: "エレンは味方だ",
    kana: "エレン は みかた だ",
    zh: "艾連是同伴",
    pattern: "は・だ",
    practice: {
      q: "田中是老師。（普通說法）",
      opts: ["田中は先生だ", "田中先生は", "田中だ先生は", "田中わ先生だ"],
      ans: 0,
      why: "套進框「A は B だ」→ 田中は先生だ。",
    },
  },
  {
    clip: "k8b",
    source: "怪獸8號",
    ja: "俺は日比野カフカだ",
    kana: "おれ は ひびの カフカ だ",
    zh: "我是日比野卡夫卡",
    pattern: "は・だ",
    practice: {
      q: "改成禮貌的說法：俺は日比野カフカだ。",
      opts: ["…カフカです", "…カフカだです", "…カフカではない", "…カフカか"],
      ans: 0,
      why: "把句尾「だ」換成「です」，不能兩個一起留。",
    },
  },
  {
    clip: "maseki",
    source: "無職轉生",
    ja: "それは魔石です",
    kana: "それ は ませき です",
    zh: "那是魔石",
    pattern: "です",
    practice: {
      q: "這是我公司的號碼。（禮貌）　これは会社の番号（　）。",
      opts: ["です", "だです", "ではない", "か"],
      ans: 0,
      why: "禮貌說法句尾用「です」。",
    },
  },
  {
    clip: "joudan",
    source: "無職轉生",
    ja: "これは冗談です",
    kana: "これ は じょうだん です",
    zh: "這是開玩笑的",
    pattern: "です",
    practice: {
      q: "改成普通的說法：これは冗談です。",
      opts: ["これは冗談だ", "これは冗談ですだ", "これは冗談か", "これは冗談も"],
      ans: 0,
      why: "禮貌「です」改普通說法 → 換成「だ」。",
    },
  },
  {
    clip: "k8a",
    source: "怪獸8號",
    ja: "俺は怪獣8号じゃない",
    kana: "おれ は かいじゅう8ごう じゃない",
    zh: "我不是怪獸8號",
    pattern: "じゃない",
    practice: {
      q: "我不是老師。（較正式）　私は先生（　）。",
      opts: ["ではない", "だではない", "か", "も"],
      ans: 0,
      why: "把「だ」換成「ではない」，不是加在「だ」後面。",
    },
  },
  {
    clip: "e",
    source: "進擊的巨人",
    ja: "これは絵ではない",
    kana: "これ は え ではない",
    zh: "這不是畫",
    pattern: "ではない",
    practice: {
      q: "這不是畫。（口語）　これは絵（　）。",
      opts: ["じゃない", "だ", "か", "も"],
      ans: 0,
      why: "口語的「不是」用「じゃない」。",
    },
  },
  {
    clip: "akutou",
    source: "無職轉生",
    ja: "やはり悪党か",
    kana: "やはり あくとう か",
    zh: "果然是壞人嗎",
    pattern: "か",
    practice: {
      q: "你是學生嗎？（普通問句）　君は学生（　）。",
      opts: ["か", "だか", "ですか", "も"],
      ans: 0,
      why: "普通問句要把「だ」拿掉，直接加「か」。",
    },
  },
  {
    clip: "dare",
    source: "Re:從零開始",
    ja: "あなたは誰ですか",
    kana: "あなた は だれ です か",
    zh: "你是誰？",
    pattern: "ですか",
    practice: {
      q: "那個人是老師嗎？（禮貌）　あの人は先生（　）。",
      opts: ["ですか", "だか", "ではない", "も"],
      ans: 0,
      why: "禮貌問句保留「です」直接加「か」→ ですか。",
    },
  },
  {
    clip: "douiken",
    source: "歡迎來到實力至上主義的教室",
    ja: "僕も同意見です",
    kana: "ぼく も どういけん です",
    zh: "我也是同樣的意見",
    pattern: "も",
    practice: {
      q: "田中是學生。我也是學生。　田中さんは学生です。私（　）学生です。",
      opts: ["も", "は", "はも", "か"],
      ans: 0,
      why: "前面已有同類，把「は」換成「も」（不可寫成はも）。",
    },
  },
];

export const L01_QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    label: "Q1",
    q: "私は台湾人です。リンさん（　）台湾人です。",
    opts: ["は", "も", "か", "だ"],
    ans: 1,
    why: "前面已經有「私は台湾人です」，第二個人也是 → 把「は」換成「も」。",
  },
  {
    id: "q2",
    label: "Q2",
    q: "那個人不是老師。　あの人は先生（　）。",
    opts: ["だ", "ではない", "か", "です"],
    ans: 1,
    why: "表示「不是」→ 把句尾換成「ではない」。",
  },
  {
    id: "q3",
    label: "Q3",
    q: "林同學是學生嗎？（禮貌）　リンさんは学生（　）。",
    opts: ["だ", "ですか", "ではない", "だか"],
    ans: 1,
    why: "禮貌問句保留「です」再加「か」→「ですか」。",
  },
  {
    id: "q4",
    label: "Q4",
    q: "下面哪一句是對的？",
    opts: ["私はも学生です", "学生だです", "これは本ですか", "君だか"],
    ans: 2,
    why: "「はも」「だです」「だか」都是常見重複錯誤；只有「これは本ですか」正確。",
  },
  {
    id: "q5",
    label: "Q5 聽解",
    q: "聽這段動漫台詞，說話的人在做什麼？",
    audioClip: "fr10",
    opts: ["自我介紹", "確認對方是誰", "否認", "打招呼"],
    ans: 1,
    why: "台詞是「それは君か？」，句尾加「か」表示確認疑問。",
  },
  {
    id: "q6",
    label: "Q6 聽解",
    q: "聽這段動漫台詞（お前は奴隷…），正確意思是？",
    audioClip: "dorei",
    opts: ["你是奴隸", "你不是奴隸", "你是奴隸嗎", "你也是奴隸"],
    ans: 1,
    why: "句尾是「じゃない」→ 你不是奴隸。",
  },
  {
    id: "bonus",
    label: "★ 挑戰題（句子重組）",
    q: "那個人也是學生嗎？　＿＿　＿＿　★　＿＿。（選出 ★ 的位置）",
    opts: ["学生", "も", "あの人", "ですか"],
    ans: 0,
    why: "正確語序：あの人 → も → ★学生 → ですか。",
  },
];
