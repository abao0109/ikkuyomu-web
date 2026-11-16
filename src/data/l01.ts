export interface PracticeQ {
  q: string;
  qEn?: string;
  opts: string[];
  optsEn?: string[];
  ans: number;
  why: string;
  whyEn?: string;
}

export interface ExampleItem {
  clip: string;
  source: string;
  sourceEn: string;
  episode?: string;
  episodeEn?: string;
  ja: string;
  kana: string;
  zh: string;
  en: string;
  pattern: string;
  practice: PracticeQ;
}

export interface QuizQuestion {
  id: string;
  label: string;
  labelEn?: string;
  level?: "n4";
  q: string;
  qEn?: string;
  audioClip?: string;
  opts: string[];
  optsEn?: string[];
  ans: number;
  why: string;
  whyEn?: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  titleEn: string;
  frame: string;
  frameEn: string;
  summary: string;
  summaryEn: string;
  mistake: string;
  fix: string;
}

export const L01_POINTS: GrammarPoint[] = [
  {
    id: "wa",
    title: "は（念作 wa）",
    titleEn: "は (pronounced wa)",
    frame: "A は B だ",
    frameEn: "A は B だ",
    summary: "把 A 當成今天要講的主題（A 是 B）。念作 wa，但寫作假名「は」。",
    summaryEn: "Marks A as the topic ('A is B'). Pronounced 'wa', but always written with the kana は.",
    mistake: "ここわ魔界だ。",
    fix: "ここは魔界だ。",
  },
  {
    id: "da-desu",
    title: "だ ／ です",
    titleEn: "だ / です",
    frame: "普通：だ ｜ 禮貌：です",
    frameEn: "Casual: だ | Polite: です",
    summary: "放在句尾把話說定。對朋友/自言自語用「だ」，對長輩/不熟的人用「です」，兩個不能同時放。",
    summaryEn: "Ends a noun sentence. Use だ with friends or inner monologue, and です for politeness—never both.",
    mistake: "私は学生だです。",
    fix: "私は学生です。",
  },
  {
    id: "dewa-nai",
    title: "ではない ／ じゃない",
    titleEn: "ではない / じゃない",
    frame: "不是 B → ではない（書面）／ じゃない（口語）",
    frameEn: "is not B → ではない (formal) / じゃない (casual)",
    summary: "直接把句尾的「だ」換成「ではない」或「じゃない」，不是接在「だ」後面。",
    summaryEn: "Replace だ at the end with ではない or じゃない; do not attach it after だ.",
    mistake: "私は学生だではない。",
    fix: "私は学生ではない。",
  },
  {
    id: "ka",
    title: "か（問句）",
    titleEn: "か (question particle)",
    frame: "普通：把 だ 拿掉 + か ｜ 禮貌：です + か",
    frameEn: "Casual: drop だ + か | Polite: です + か",
    summary: "句尾加上「か」就變成問句。普通說法要把「だ」拿掉；禮貌說法保留「です」直接加「か」。",
    summaryEn: "Add か at the end to form a question. Drop だ in casual speech, but keep です before か in polite speech.",
    mistake: "それは君だか？",
    fix: "それは君か？",
  },
  {
    id: "mo",
    title: "も（也）",
    titleEn: "も (also / too)",
    frame: "C も B だ / です",
    frameEn: "C も B だ / です",
    summary: "前面已經有同類的人事物時，把「は」換成「も」表示「也」。不能寫成「はも」。",
    summaryEn: "Replace は with も to say 'also / too'. Never combine them as はも.",
    mistake: "俺はも同じだ。",
    fix: "俺も同じだ。",
  },
];

export const L01_EXAMPLES: ExampleItem[] = [
  {
    clip: "iruma",
    source: "入間同學入魔了",
    sourceEn: "Welcome to Demon School! Iruma-kun",
    episode: "第1話",
    episodeEn: "Ep. 1",
    ja: "ここは魔界だ",
    kana: "ここは まかい だ",
    zh: "這裡是魔界",
    en: "This is the Demon World",
    pattern: "は・だ",
    practice: {
      q: "這裡是學校。　ここ（　）学校だ。",
      qEn: "This is a school.  ここ（　）学校だ。",
      opts: ["は", "わ", "も", "か"],
      ans: 0,
      why: "念 wa，但主題助詞固定寫作「は」。",
      whyEn: "Pronounced 'wa', but the topic particle is always written は.",
    },
  },
  {
    clip: "eren",
    source: "進擊的巨人",
    sourceEn: "Attack on Titan",
    episode: "第80話",
    episodeEn: "Ep. 80",
    ja: "エレンは味方だ",
    kana: "エレン は みかた だ",
    zh: "艾連是同伴",
    en: "Eren is on our side",
    pattern: "は・だ",
    practice: {
      q: "田中是老師。（普通說法）",
      qEn: "Tanaka is a teacher. (casual)",
      opts: ["田中は先生だ", "田中先生は", "田中だ先生は", "田中わ先生だ"],
      ans: 0,
      why: "套進框「A は B だ」→ 田中は先生だ。",
      whyEn: "Follow the pattern 'A は B だ' → 田中は先生だ.",
    },
  },
  {
    clip: "k8b",
    source: "怪獸8號",
    sourceEn: "Kaiju No. 8",
    ja: "俺は日比野カフカだ",
    kana: "おれ は ひびの カフカ だ",
    zh: "我是日比野卡夫卡",
    en: "I'm Kafka Hibino",
    pattern: "は・だ",
    practice: {
      q: "改成禮貌的說法：俺は日比野カフカだ。",
      qEn: "Make it polite: 俺は日比野カフカだ。",
      opts: ["…カフカです", "…カフカだです", "…カフカではない", "…カフカか"],
      ans: 0,
      why: "把句尾「だ」換成「です」，不能兩個一起留。",
      whyEn: "Replace だ with です; never keep both.",
    },
  },
  {
    clip: "maseki",
    source: "無職轉生",
    sourceEn: "Mushoku Tensei",
    episode: "第2話",
    episodeEn: "Ep. 2",
    ja: "それは魔石です",
    kana: "それ は ませき です",
    zh: "那是魔石",
    en: "That is a magic stone",
    pattern: "です",
    practice: {
      q: "這是我公司的號碼。（禮貌）　これは会社の番号（　）。",
      qEn: "This is my company's number. (polite)  これは会社の番号（　）。",
      opts: ["です", "だです", "ではない", "か"],
      ans: 0,
      why: "禮貌說法句尾用「です」。",
      whyEn: "Polite noun sentences end with です.",
    },
  },
  {
    clip: "joudan",
    source: "無職轉生",
    sourceEn: "Mushoku Tensei",
    episode: "第5話",
    episodeEn: "Ep. 5",
    ja: "これは冗談です",
    kana: "これ は じょうだん です",
    zh: "這是開玩笑的",
    en: "This is a joke",
    pattern: "です",
    practice: {
      q: "改成普通的說法：これは冗談です。",
      qEn: "Make it casual: これは冗談です。",
      opts: ["これは冗談だ", "これは冗談ですだ", "これは冗談か", "これは冗談も"],
      ans: 0,
      why: "禮貌「です」改普通說法 → 換成「だ」。",
      whyEn: "Swap polite です for casual だ.",
    },
  },
  {
    clip: "k8a",
    source: "怪獸8號",
    sourceEn: "Kaiju No. 8",
    ja: "俺は怪獣8号じゃない",
    kana: "おれ は かいじゅう8ごう じゃない",
    zh: "我不是怪獸8號",
    en: "I'm not Kaiju No. 8",
    pattern: "じゃない",
    practice: {
      q: "我不是老師。（較正式）　私は先生（　）。",
      qEn: "I am not a teacher. (formal)  私は先生（　）。",
      opts: ["ではない", "だではない", "か", "も"],
      ans: 0,
      why: "把「だ」換成「ではない」，不是加在「だ」後面。",
      whyEn: "Replace だ with ではない; don't put it after だ.",
    },
  },
  {
    clip: "e",
    source: "進擊的巨人",
    sourceEn: "Attack on Titan",
    episode: "第56話",
    episodeEn: "Ep. 56",
    ja: "これは絵ではない",
    kana: "これ は え ではない",
    zh: "這不是畫",
    en: "This is not a painting",
    pattern: "ではない",
    practice: {
      q: "這不是畫。（口語）　これは絵（　）。",
      qEn: "This isn't a painting. (casual)  これは絵（　）。",
      opts: ["じゃない", "だ", "か", "も"],
      ans: 0,
      why: "口語的「不是」用「じゃない」。",
      whyEn: "In casual speech, 'is not' is じゃない.",
    },
  },
  {
    clip: "akutou",
    source: "無職轉生",
    sourceEn: "Mushoku Tensei",
    episode: "第10話",
    episodeEn: "Ep. 10",
    ja: "やはり悪党か",
    kana: "やはり あくとう か",
    zh: "果然是壞人嗎",
    en: "A villain after all, huh?",
    pattern: "か",
    practice: {
      q: "你是學生嗎？（普通問句）　君は学生（　）。",
      qEn: "Are you a student? (casual)  君は学生（　）。",
      opts: ["か", "だか", "ですか", "も"],
      ans: 0,
      why: "普通問句要把「だ」拿掉，直接加「か」。",
      whyEn: "In casual questions, drop だ and just add か.",
    },
  },
  {
    clip: "dare",
    source: "Re:從零開始",
    sourceEn: "Re:ZERO",
    episode: "第4期 第19話",
    episodeEn: "S4 Ep. 19",
    ja: "あなたは誰ですか",
    kana: "あなた は だれ です か",
    zh: "你是誰？",
    en: "Who are you?",
    pattern: "ですか",
    practice: {
      q: "那個人是老師嗎？（禮貌）　あの人は先生（　）。",
      qEn: "Is that person a teacher? (polite)  あの人は先生（　）。",
      opts: ["ですか", "だか", "ではない", "も"],
      ans: 0,
      why: "禮貌問句保留「です」直接加「か」→ ですか。",
      whyEn: "Polite questions keep です and add か → ですか.",
    },
  },
  {
    clip: "douiken",
    source: "歡迎來到實力至上主義的教室",
    sourceEn: "Classroom of the Elite",
    episode: "2期 第1話",
    episodeEn: "S2 Ep. 1",
    ja: "僕も同意見です",
    kana: "ぼく も どういけん です",
    zh: "我也是同樣的意見",
    en: "I'm of the same opinion, too",
    pattern: "も",
    practice: {
      q: "田中是學生。我也是學生。　田中さんは学生です。私（　）学生です。",
      qEn: "Tanaka is a student. I am also a student.  田中さんは学生です。私（　）学生です。",
      opts: ["も", "は", "はも", "か"],
      ans: 0,
      why: "前面已有同類，把「は」換成「も」（不可寫成はも）。",
      whyEn: "Swap は for も when adding 'also' (never はも).",
    },
  },
];

export const L01_QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    label: "Q1",
    q: "私は台湾人です。リンさん（　）台湾人です。",
    qEn: "I am Taiwanese. Lin is also Taiwanese.  私は台湾人です。リンさん（　）台湾人です。",
    opts: ["は", "も", "か", "だ"],
    ans: 1,
    why: "前面已經有「私は台湾人です」，第二個人也是 → 把「は」換成「も」。",
    whyEn: "Since the first person already is, replace は with も for 'also'.",
  },
  {
    id: "q2",
    label: "Q2",
    q: "那個人不是老師。　あの人は先生（　）。",
    qEn: "That person is not a teacher.  あの人は先生（　）。",
    opts: ["だ", "ではない", "か", "です"],
    ans: 1,
    why: "表示「不是」→ 把句尾換成「ではない」。",
    whyEn: "To say 'is not', replace the ending with ではない.",
  },
  {
    id: "q3",
    label: "Q3",
    q: "林同學是學生嗎？（禮貌）　リンさんは学生（　）。",
    qEn: "Is Lin a student? (polite)  リンさんは学生（　）。",
    opts: ["だ", "ですか", "ではない", "だか"],
    ans: 1,
    why: "禮貌問句保留「です」再加「か」→「ですか」。",
    whyEn: "Polite questions keep です and add か → ですか.",
  },
  {
    id: "q4",
    label: "Q4",
    q: "下面哪一句是對的？",
    qEn: "Which of the following sentences is correct?",
    opts: ["私はも学生です", "学生だです", "これは本ですか", "君だか"],
    ans: 2,
    why: "「はも」「だです」「だか」都是常見重複錯誤；只有「これは本ですか」正確。",
    whyEn: "はも, だです, and だか are common doubling mistakes; only これは本ですか is correct.",
  },
  {
    id: "q5",
    label: "Q5 聽解",
    labelEn: "Q5 Listening",
    q: "聽這段動漫台詞，說話的人在做什麼？",
    qEn: "Listen to this anime line. What is the speaker doing?",
    audioClip: "fr10",
    opts: ["自我介紹", "確認對方是誰", "否認", "打招呼"],
    optsEn: ["Introducing themselves", "Confirming who the other person is", "Denying something", "Greeting"],
    ans: 1,
    why: "台詞是「それは君か？」，句尾加「か」表示確認疑問。",
    whyEn: "The line is 「それは君か？」— か at the end asks to confirm.",
  },
  {
    id: "q6",
    label: "Q6 聽解",
    labelEn: "Q6 Listening",
    q: "聽這段動漫台詞（お前は奴隷…），正確意思是？",
    qEn: "Listen to this anime line (お前は奴隷…). What does it mean?",
    audioClip: "dorei",
    opts: ["你是奴隸", "你不是奴隸", "你是奴隸嗎", "你也是奴隸"],
    optsEn: ["You are a slave", "You are not a slave", "Are you a slave?", "You are also a slave"],
    ans: 1,
    why: "句尾是「じゃない」→ 你不是奴隸。",
    whyEn: "It ends with じゃない → 'You are not a slave.'",
  },
  {
    id: "q7",
    level: "n4",
    label: "Q7 挑戰｜N4 文法",
    labelEn: "Q7 Challenge | N4 Grammar",
    q: "A：「あの新聞社の男性は、鈴木さんのご兄弟ですか。」\nB：「いいえ、鈴木さんの兄弟（　）。会社の先輩です。」",
    qEn: "A: 「あの新聞社の男性は、鈴木さんのご兄弟ですか。」\nB: 「いいえ、鈴木さんの兄弟（　）。会社の先輩です。」",
    opts: ["ではあります", "ではありません", "だではない", "じゃですか"],
    ans: 1,
    why: "對話是禮貌語氣，否定要用「ではありません」（比「ではない」更禮貌，也不能寫成「ではあります」或「だではない」）。",
    whyEn: "In polite conversation, use ではありません for 'is not' (never ではあります or だではない).",
  },
  {
    id: "q8",
    level: "n4",
    label: "Q8 挑戰｜N4 ★ 排序",
    labelEn: "Q8 Challenge | N4 ★ Scramble",
    q: "選出填入 ★ 的詞，使句子通順：\n鈴木さんは　＿＿＿　＿＿＿　＿★＿　＿＿＿　ありません。",
    qEn: "Choose the word that goes into ★:\n鈴木さんは　＿＿＿　＿＿＿　＿★＿　＿＿＿　ありません。",
    opts: ["高校", "の", "先生", "では"],
    ans: 2,
    why: "正確語序為「鈴木さんは 高校 の ★先生 では ありません。」（鈴木先生不是高中老師），★ 處是「先生」。",
    whyEn: "Correct order: 鈴木さんは 高校 の ★先生 では ありません ('Suzuki is not a high school teacher'). ★ is 先生.",
  },
  {
    id: "q9",
    level: "n4",
    label: "Q9 挑戰｜N4 文法辨析",
    labelEn: "Q9 Challenge | N4 Grammar Check",
    q: "下列哪一句在文法與助詞搭配上完全正確？",
    qEn: "Which of the following sentences is completely grammatical?",
    opts: [
      "田中さんは高校の先生ではあります。",
      "あの男性は留学生じゃありませんか。",
      "私の両親はも会社員です。",
      "この番号は会社の番号だですか。",
    ],
    ans: 1,
    why: "「じゃありませんか」（不是…嗎？）完全正確；「ではあります」不能用於肯定、「はも」與「だです」皆為助詞／結尾重複錯誤。",
    whyEn: "「じゃありませんか」 ('Isn't ...?') is grammatical; ではあります cannot be used affirmatively, and はも / だです are doubling errors.",
  },
  {
    id: "q10",
    level: "n4",
    label: "Q10 挑戰｜N4 助詞陷阱",
    labelEn: "Q10 Challenge | N4 Particle Trap",
    q: "A：「山本さんは新聞社の人ですか。」\nB：「いいえ、新聞社の人ではありません。弟（　）新聞社の人ではありません。」",
    qEn: "A: 「山本さんは新聞社の人ですか。」\nB: 「いいえ、新聞社の人ではありません。弟（　）新聞社の人ではありません。」",
    opts: ["は", "も", "か", "だ"],
    ans: 1,
    why: "前面說「山本不是報社的人」，後面說「弟弟『也』不是」，否定句中表示「也」一樣要把「は」換成「も」。",
    whyEn: "Even in negative sentences, 'also (not)' replaces は with も.",
  },
  {
    id: "q11",
    level: "n4",
    label: "Q11 挑戰｜N4 短文",
    labelEn: "Q11 Challenge | N4 Reading",
    q: "「田中さんは高校生です。佐藤さんは高校生ではありません。鈴木さん（　）高校生ではありません。」",
    qEn: "「田中さんは高校生です。佐藤さんは高校生ではありません。鈴木さん（　）高校生ではありません。」",
    opts: ["は", "も", "か", "じゃ"],
    ans: 1,
    why: "前一句說「佐藤不是高中生」，下一句承接「鈴木『也』不是高中生」，因此用「も」。",
    whyEn: "Following 'Sato is not a high schooler', 'Suzuki is ALSO not a high schooler' takes も.",
  },
  {
    id: "q12",
    level: "n4",
    label: "Q12 挑戰｜N4 聽解",
    labelEn: "Q12 Challenge | N4 Listening",
    q: "不看字幕直接聽原聲：說話的人想表達什麼？",
    qEn: "Listen without subtitles: what is the speaker saying?",
    audioClip: "douzai",
    opts: ["那個男人不是共犯", "那個男人也一樣有罪", "那個男人是誰？", "只有那個男人有罪"],
    optsEn: ["That man is innocent", "That man is guilty too", "Who is that man?", "Only that man is guilty"],
    ans: 1,
    why: "原聲台詞是「あの男も同罪だ」，聽到關鍵助詞「も」（也）與句尾斷定「だ」。",
    whyEn: "The line is 「あの男も同罪だ」— notice も ('too') and だ.",
  },
];
