export type Lang = "zh" | "en";

export interface VocabItem {
  word: string;
  kana: string;
  zh: string;
  en: string;
  level: string;
}

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

export interface SummaryTable {
  title: string;
  titleEn: string;
  subtitle?: string;
  subtitleEn?: string;
  headers: string[];
  headersEn: string[];
  rows: {
    label: string;
    labelEn: string;
    cells: string[];
  }[];
}

export interface LessonConfig {
  n: number;
  slug: string;
  code: string;
  badge: string;
  badgeEn: string;
  title: string;
  titleEn: string;
  focus: string;
  focusEn: string;
  ankiFile: string;
  ankiSizeKb: number;
  ankiSentenceCount: number;
  points: GrammarPoint[];
  summaryTable?: SummaryTable;
  examples: ExampleItem[];
  quiz: QuizQuestion[];
  vocab: VocabItem[];
}
