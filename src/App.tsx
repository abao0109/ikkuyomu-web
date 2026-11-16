import { useEffect, useMemo, useRef, useState } from "react";
import syllabusRaw from "./data/syllabus.json";
import vocabRaw from "./data/l01-vocab.json";
import { L01_EXAMPLES, L01_POINTS, L01_QUIZ, PracticeQ } from "./data/l01";

type Lang = "zh" | "en";

interface SyllabusItem {
  n: number;
  unit: string;
  title: string;
  ids: string[];
  core: string | null;
}

interface VocabItem {
  word: string;
  kana: string;
  zh: string;
  en: string;
  level: string;
}

const syllabus = syllabusRaw as SyllabusItem[];
const vocab = vocabRaw as VocabItem[];
const LIVE_LESSONS = new Set([1]);

const UNIT_EN: Record<string, string> = {
  "不用變化就能說": "Say It Without Conjugation",
};

const TITLE_EN: Record<number, string> = {
  1: 'Self-Introduction: "I am..." / "I am not..."',
};

function getInitialLang(): Lang {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("lang");
  if (q === "en" || q === "zh") return q;
  const saved = localStorage.getItem("ikku-lang");
  if (saved === "en" || saved === "zh") return saved;
  return "zh";
}

function playClip(audioRef: React.MutableRefObject<HTMLAudioElement | null>, clip: string) {
  if (audioRef.current) {
    audioRef.current.pause();
  }
  const a = new Audio(`/audio/l01/${clip}.mp3`);
  audioRef.current = a;
  a.play().catch(() => {});
}

function QuizBlock({
  q,
  lang,
  selected,
  onPick,
}: {
  q: PracticeQ;
  lang: Lang;
  selected: number | undefined;
  onPick: (idx: number) => void;
}) {
  const answered = selected !== undefined;
  const questionText = lang === "en" && q.qEn ? q.qEn : q.q;
  const options = lang === "en" && q.optsEn ? q.optsEn : q.opts;
  const whyText = lang === "en" && q.whyEn ? q.whyEn : q.why;

  return (
    <div>
      <div className="ja" style={{ fontWeight: 600 }}>
        {questionText}
      </div>
      <div className="opts">
        {options.map((opt, i) => {
          let cls = "opt-btn ja";
          if (answered) {
            if (i === q.ans) cls += " correct";
            else if (i === selected) cls += " wrong";
          }
          return (
            <button key={i} className={cls} disabled={answered} onClick={() => onPick(i)}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="why">
          {selected === q.ans
            ? lang === "en"
              ? "✅ Correct! "
              : "✅ 答對！"
            : lang === "en"
              ? "❌ Look again: "
              : "❌ 再看一次："}
          {whyText}
        </div>
      )}
    </div>
  );
}

function HomePage({ lang, onOpenLesson }: { lang: Lang; onOpenLesson: (n: number) => void }) {
  const liveItems = useMemo(() => syllabus.filter((item) => LIVE_LESSONS.has(item.n)), []);
  const units = useMemo(() => {
    const map = new Map<string, SyllabusItem[]>();
    for (const item of liveItems) {
      const list = map.get(item.unit) ?? [];
      list.push(item);
      map.set(item.unit, list);
    }
    return Array.from(map.entries());
  }, [liveItems]);

  const isEn = lang === "en";

  return (
    <div>
      <section className="hero">
        <span className="hero-tag">
          {isEn ? "Free Anime JLPT N5 → N4 Course" : "免費動漫 JLPT N5 → N4 課程"}
        </span>
        <h1>
          {isEn ? (
            <>
              <span className="hl">Pick one anime line</span>, master one grammar point
            </>
          ) : (
            <>
              <span className="hl">挑一句動漫台詞</span>，學會一個考點
            </>
          )}
        </h1>
        <p>
          {isEn
            ? "No boring textbook jargon. Listen to real anime lines, break down each pattern and common mistake, practice interactively, and review with Anki audio decks to get ready for JLPT N4."
            : "不背無聊的文法術語。每一課先聽動漫原聲、拆解句型與常見錯誤，再搭配即時互動練習、課後小考與 Anki 原聲卡組，學完就能去考 JLPT N4。"}
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => onOpenLesson(1)}>
            {isEn ? "Start Day 1: Self-Introduction →" : "開始第 1 天：自我介紹 →"}
          </button>
          <a className="btn" href="/downloads/ikku-l01.apkg" download>
            {isEn ? "Download L01 Anki Deck (.apkg)" : "下載 L01 Anki 卡組 (.apkg)"}
          </a>
        </div>
        <div className="social-links">
          <a
            className="btn btn-sm"
            href={isEn ? "https://www.youtube.com/@ikkuyomuen" : "https://www.youtube.com/@ikkuyomu"}
            target="_blank"
            rel="noreferrer"
          >
            {isEn ? "YouTube @ikkuyomuen" : "YouTube @ikkuyomu"}
          </a>
          <a
            className="btn btn-sm"
            href="https://www.instagram.com/ikku.yomu/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram @ikku.yomu
          </a>
          <a
            className="btn btn-sm"
            href="https://www.threads.net/@ikku.yomu"
            target="_blank"
            rel="noreferrer"
          >
            Threads @ikku.yomu
          </a>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>{isEn ? "Available Lessons" : "已上線課程"}</h2>
          <span className="pill pill-accent">
            {isEn ? `${liveItems.length} lesson` : `共 ${liveItems.length} 課`}
          </span>
        </div>
        {units.map(([unit, items]) => (
          <div key={unit} className="unit-group">
            <div className="unit-label">{isEn ? (UNIT_EN[unit] ?? unit) : unit}</div>
            <div className="lesson-grid">
              {items.map((item) => (
                <div
                  key={item.n}
                  className="lesson-card active"
                  onClick={() => onOpenLesson(item.n)}
                >
                  <div className="lesson-top">
                    <span>{isEn ? `Day ${item.n}` : `第 ${item.n} 天`}</span>
                    <span className="pill pill-live">{isEn ? "Live · Practice" : "已上線・可練習"}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>
                    {isEn ? (TITLE_EN[item.n] ?? item.title) : item.title}
                  </div>
                  {item.ids.length > 0 && (
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>
                      {isEn ? `${item.ids.length} patterns` : `${item.ids.length} 個句型`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function Lesson1Page({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  const [tab, setTab] = useState<"practice" | "quiz" | "vocab" | "anki">("practice");
  const [exAns, setExAns] = useState<Record<string, number>>({});
  const [quizAns, setQuizAns] = useState<Record<string, number>>({});
  const [hideMeaning, setHideMeaning] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isEn = lang === "en";
  const quizDone = Object.keys(quizAns).length;
  const quizScore = L01_QUIZ.filter((q) => quizAns[q.id] === q.ans).length;

  return (
    <div style={{ paddingTop: 24 }}>
      <button className="btn btn-sm" onClick={onBack} style={{ marginBottom: 16 }}>
        {isEn ? "← Back to Lessons" : "← 回課程總覽"}
      </button>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="pill pill-live" style={{ marginBottom: 8 }}>
              {isEn ? "Day 1 | N5 Basics" : "第 1 天｜N5 基礎"}
            </span>
            <h1 style={{ margin: "6px 0 4px", fontSize: 26 }}>
              {isEn ? 'Self-Introduction: "I am..." / "I am not..."' : "自我介紹：「我是…」「我不是…」"}
            </h1>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
              {isEn
                ? "Focus: は · だ / です · ではない / じゃない · か · も (5 patterns + 26 words)"
                : "本課重點：は・だ／です・ではない／じゃない・か・も（共 5 個句型 + 26 個單字）"}
            </p>
          </div>
          <a className="btn btn-primary" href="/downloads/ikku-l01.apkg" download style={{ alignSelf: "center" }}>
            {isEn ? "Download L01 Anki (.apkg)" : "下載 L01 Anki (.apkg)"}
          </a>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "practice" ? "active" : ""}`} onClick={() => setTab("practice")}>
          {isEn ? `Anime Examples & Practice (${L01_EXAMPLES.length})` : `動漫例句＋練習 (${L01_EXAMPLES.length})`}
        </button>
        <button className={`tab ${tab === "quiz" ? "active" : ""}`} onClick={() => setTab("quiz")}>
          {isEn ? `Lesson Quiz (${L01_QUIZ.length})` : `課後小考 (${L01_QUIZ.length} 題)`}
        </button>
        <button className={`tab ${tab === "vocab" ? "active" : ""}`} onClick={() => setTab("vocab")}>
          {isEn ? `Vocabulary (${vocab.length})` : `本課單字 (${vocab.length})`}
        </button>
        <button className={`tab ${tab === "anki" ? "active" : ""}`} onClick={() => setTab("anki")}>
          {isEn ? "Grammar & Anki" : "句型總表與 Anki"}
        </button>
      </div>

      {tab === "practice" && (
        <div>
          {L01_EXAMPLES.map((ex, idx) => {
            const sourceLabel = isEn ? ex.sourceEn : ex.source;
            const episodeLabel = isEn ? ex.episodeEn : ex.episode;
            return (
              <div key={ex.clip} className="card example-card">
                <div className="example-head">
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span className="pill pill-accent">
                      {isEn ? `Example ${idx + 1}` : `例句 ${idx + 1}`}
                    </span>
                    <span className="pill pill-apricot">
                      {sourceLabel}
                      {episodeLabel ? ` · ${episodeLabel}` : ""}
                    </span>
                    <span className="pill">{ex.pattern}</span>
                  </div>
                </div>
                <div className="example-body">
                  <div>
                    <div className="example-ja ja">{ex.ja}</div>
                    <div className="example-kana ja">{ex.kana}</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>{isEn ? ex.en : ex.zh}</div>
                  </div>
                  <div className="example-clip">
                    <video src={`/video/l01/${ex.clip}.mp4`} controls playsInline preload="metadata" />
                    <div className="example-clip-cap">
                      {sourceLabel}
                      {episodeLabel ? ` ${episodeLabel}` : ""}
                    </div>
                  </div>
                </div>
                <div className="practice-box">
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 6 }}>
                    {isEn ? "Quick Practice" : "馬上練一題"}
                  </div>
                  <QuizBlock
                    q={ex.practice}
                    lang={lang}
                    selected={exAns[ex.clip]}
                    onPick={(i) => setExAns((prev) => ({ ...prev, [ex.clip]: i }))}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "quiz" && (
        <div>
          <div className="card" style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <strong>{isEn ? "Quiz Progress: " : "小考進度："}</strong>
              {isEn
                ? `${quizDone} / ${L01_QUIZ.length} answered (${quizScore} correct)`
                : `${quizDone} / ${L01_QUIZ.length} 題（目前答對 ${quizScore} 題）`}
            </div>
            {quizDone > 0 && (
              <button className="btn btn-sm" onClick={() => setQuizAns({})}>
                {isEn ? "Reset Quiz" : "全部重做"}
              </button>
            )}
          </div>

          {L01_QUIZ.map((q) => (
            <div key={q.id} className="card" style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span className="pill pill-accent">{isEn && q.labelEn ? q.labelEn : q.label}</span>
                {q.audioClip && (
                  <button className="btn btn-sm" onClick={() => playClip(audioRef, q.audioClip!)}>
                    {isEn ? "🔊 Play Audio" : "🔊 播放聽解原聲"}
                  </button>
                )}
              </div>
              <QuizBlock
                q={q}
                lang={lang}
                selected={quizAns[q.id]}
                onPick={(i) => setQuizAns((prev) => ({ ...prev, [q.id]: i }))}
              />
            </div>
          ))}
        </div>
      )}

      {tab === "vocab" && (
        <div className="card">
          <div className="section-title" style={{ marginBottom: 12 }}>
            <h2>{isEn ? "Lesson 1 Vocabulary (N5 / N4)" : "第 1 課單字表（N5 / N4）"}</h2>
            <button className="btn btn-sm" onClick={() => setHideMeaning((v) => !v)}>
              {isEn
                ? hideMeaning
                  ? "Show Meaning"
                  : "Hide Meaning (Self-Test)"
                : hideMeaning
                  ? "顯示中文"
                  : "遮住中文自我測驗"}
            </button>
          </div>
          <table className="vocab-table">
            <thead>
              <tr>
                <th>{isEn ? "Word" : "單字"}</th>
                <th>{isEn ? "Kana" : "假名"}</th>
                <th>{isEn ? "Meaning" : "中文意思"}</th>
                <th>{isEn ? "Level" : "等級"}</th>
              </tr>
            </thead>
            <tbody>
              {vocab.map((v) => (
                <tr key={v.word + v.kana}>
                  <td className="ja" style={{ fontWeight: 700, fontSize: 17 }}>
                    {v.word}
                  </td>
                  <td className="ja" style={{ color: "var(--muted)" }}>
                    {v.kana}
                  </td>
                  <td>{hideMeaning ? "••••••" : isEn ? v.en : v.zh}</td>
                  <td>
                    <span className="pill">{v.level}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "anki" && (
        <div>
          <div className="point-grid" style={{ marginBottom: 20 }}>
            {L01_POINTS.map((p) => (
              <div key={p.id} className="card">
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>
                  {isEn ? p.titleEn : p.title}
                </div>
                <div className="pill pill-accent ja" style={{ marginBottom: 8 }}>
                  {isEn ? p.frameEn : p.frame}
                </div>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>
                  {isEn ? p.summaryEn : p.summary}
                </div>
                <div className="mistake-box ja">
                  <div>❌ {p.mistake}</div>
                  <div>✅ {p.fix}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h2 style={{ marginTop: 0 }}>
              {isEn ? "Download L01 Anki Audio Deck" : "下載 L01 Anki 原聲卡組"}
            </h2>
            <p style={{ color: "var(--muted)" }}>
              {isEn ? (
                <>
                  Includes <strong>15 anime sentence cards</strong> (with original Japanese audio) +{" "}
                  <strong>26 N5/N4 vocabulary cards</strong>. Double-click the <code>.apkg</code> file in Anki on desktop or mobile to import.
                </>
              ) : (
                <>
                  內含 <strong>15 句動漫原聲例句卡</strong>（附日語配音檔）＋{" "}
                  <strong>26 張 N5/N4 單字卡</strong>。下載後在電腦或手機 Anki 點兩下 `.apkg` 即可直接匯入複習。
                </>
              )}
            </p>
            <a className="btn btn-primary" href="/downloads/ikku-l01.apkg" download>
              {isEn ? "Download ikku-l01.apkg (480 KB)" : "下載 ikku-l01.apkg (480 KB)"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [lesson, setLesson] = useState<number | null>(() => {
    const m = window.location.pathname.match(/\/lesson\/(\d+)/);
    return m ? Number(m[1]) : null;
  });

  useEffect(() => {
    localStorage.setItem("ikku-lang", lang);
    document.documentElement.lang = lang === "en" ? "en" : "zh-Hant";
    document.title =
      lang === "en"
        ? "ikku.yomu｜Learn JLPT N5→N4 from Anime"
        : "讀一句日文 ikku.yomu｜看動漫學 JLPT N5→N4";
  }, [lang]);

  useEffect(() => {
    const onPop = () => {
      const m = window.location.pathname.match(/\/lesson\/(\d+)/);
      setLesson(m ? Number(m[1]) : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (n: number | null) => {
    const target = n ? `/lesson/${n}` : "/";
    const search = lang === "en" ? "?lang=en" : "";
    window.history.pushState({}, "", target + search);
    setLesson(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleLang = () => {
    const next: Lang = lang === "zh" ? "en" : "zh";
    setLang(next);
    const search = next === "en" ? "?lang=en" : "";
    window.history.replaceState({}, "", window.location.pathname + search);
  };

  const isEn = lang === "en";

  return (
    <div>
      <header className="nav">
        <div className="container nav-inner">
          <div className="brand" onClick={() => navigate(null)}>
            <span className="brand-badge">ikku.yomu</span>
            <span>{isEn ? "Learn Japanese from Anime" : "讀一句日文"}</span>
          </div>
          <nav className="nav-links">
            <button className="btn btn-sm" onClick={() => navigate(null)}>
              {isEn ? "Lessons" : "課程總覽"}
            </button>
            <button className="btn btn-sm btn-primary" onClick={() => navigate(1)}>
              {isEn ? "L01 Practice & Quiz" : "L01 練習＆小考"}
            </button>
            <button className="btn btn-sm" onClick={toggleLang} aria-label="Switch language">
              {isEn ? "中文" : "EN"}
            </button>
          </nav>
        </div>
      </header>

      <main className="container">
        {lesson === 1 ? (
          <Lesson1Page lang={lang} onBack={() => navigate(null)} />
        ) : (
          <HomePage lang={lang} onOpenLesson={(n) => navigate(n)} />
        )}
      </main>

      <footer className="container footer">
        <span>
          {isEn
            ? "ikku.yomu · Free Anime JLPT N5→N4 Course"
            : "讀一句日文 ikku.yomu · 免費動漫 JLPT N5→N4 課程"}
        </span>
        <span>
          {isEn ? "YouTube @ikkuyomuen · ikkuyomu.com" : "YouTube @ikkuyomu · ikkuyomu.com"}
        </span>
      </footer>
    </div>
  );
}
