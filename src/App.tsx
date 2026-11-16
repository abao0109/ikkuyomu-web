import { useEffect, useMemo, useRef, useState } from "react";
import syllabusRaw from "./data/syllabus.json";
import vocabRaw from "./data/l01-vocab.json";
import { L01_EXAMPLES, L01_POINTS, L01_QUIZ, PracticeQ } from "./data/l01";

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
  level: string;
}

const syllabus = syllabusRaw as SyllabusItem[];
const vocab = vocabRaw as VocabItem[];
const LIVE_LESSONS = new Set([1]);

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
  selected,
  onPick,
}: {
  q: PracticeQ;
  selected: number | undefined;
  onPick: (idx: number) => void;
}) {
  const answered = selected !== undefined;
  return (
    <div>
      <div className="ja" style={{ fontWeight: 600 }}>
        {q.q}
      </div>
      <div className="opts">
        {q.opts.map((opt, i) => {
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
          {selected === q.ans ? "✅ 答對！" : "❌ 再看一次："}
          {q.why}
        </div>
      )}
    </div>
  );
}

function HomePage({ onOpenLesson }: { onOpenLesson: (n: number) => void }) {
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

  return (
    <div>
      <section className="hero">
        <span className="hero-tag">免費動漫 JLPT N5 → N4 課程</span>
        <h1>
          <span className="hl">挑一句動漫台詞</span>，學會一個考點
        </h1>
        <p>
          不背無聊的文法術語。每一課先聽動漫原聲、拆解句型與常見錯誤，再搭配即時互動練習、課後小考與
          Anki 原聲卡組，學完就能去考 JLPT N4。
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => onOpenLesson(1)}>
            開始第 1 天：自我介紹 →
          </button>
          <a className="btn" href="/downloads/ikku-l01.apkg" download>
            下載 L01 Anki 卡組 (.apkg)
          </a>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>已上線課程</h2>
          <span className="pill pill-accent">共 {liveItems.length} 課</span>
        </div>
        {units.map(([unit, items]) => (
          <div key={unit} className="unit-group">
            <div className="unit-label">{unit}</div>
            <div className="lesson-grid">
              {items.map((item) => (
                <div
                  key={item.n}
                  className="lesson-card active"
                  onClick={() => onOpenLesson(item.n)}
                >
                  <div className="lesson-top">
                    <span>第 {item.n} 天</span>
                    <span className="pill pill-live">已上線・可練習</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{item.title}</div>
                  {item.ids.length > 0 && (
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>
                      {item.ids.length} 個句型
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

function Lesson1Page({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<"practice" | "quiz" | "vocab" | "anki">("practice");
  const [exAns, setExAns] = useState<Record<string, number>>({});
  const [quizAns, setQuizAns] = useState<Record<string, number>>({});
  const [hideMeaning, setHideMeaning] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const quizDone = Object.keys(quizAns).length;
  const quizScore = L01_QUIZ.filter((q) => quizAns[q.id] === q.ans).length;

  return (
    <div style={{ paddingTop: 24 }}>
      <button className="btn btn-sm" onClick={onBack} style={{ marginBottom: 16 }}>
        ← 回課程總覽
      </button>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="pill pill-live" style={{ marginBottom: 8 }}>
              第 1 天｜N5 基礎
            </span>
            <h1 style={{ margin: "6px 0 4px", fontSize: 26 }}>自我介紹：「我是…」「我不是…」</h1>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
              本課重點：は・だ／です・ではない／じゃない・か・も（共 5 個句型 + 26 個單字）
            </p>
          </div>
          <a className="btn btn-primary" href="/downloads/ikku-l01.apkg" download style={{ alignSelf: "center" }}>
            下載 L01 Anki (.apkg)
          </a>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "practice" ? "active" : ""}`} onClick={() => setTab("practice")}>
          動漫例句＋練習 ({L01_EXAMPLES.length})
        </button>
        <button className={`tab ${tab === "quiz" ? "active" : ""}`} onClick={() => setTab("quiz")}>
          課後小考 ({L01_QUIZ.length} 題)
        </button>
        <button className={`tab ${tab === "vocab" ? "active" : ""}`} onClick={() => setTab("vocab")}>
          本課單字 ({vocab.length})
        </button>
        <button className={`tab ${tab === "anki" ? "active" : ""}`} onClick={() => setTab("anki")}>
          句型總表與 Anki
        </button>
      </div>

      {tab === "practice" && (
        <div>
          {L01_EXAMPLES.map((ex, idx) => (
            <div key={ex.clip} className="card example-card">
              <div className="example-head">
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span className="pill pill-accent">例句 {idx + 1}</span>
                  <span className="pill pill-apricot">{ex.source}</span>
                  <span className="pill">{ex.pattern}</span>
                </div>
                <button className="btn btn-sm" onClick={() => playClip(audioRef, ex.clip)}>
                  🔊 聽原聲
                </button>
              </div>
              <div>
                <div className="example-ja ja">{ex.ja}</div>
                <div className="example-kana ja">{ex.kana}</div>
                <div style={{ fontWeight: 600, marginTop: 4 }}>{ex.zh}</div>
              </div>
              <div className="practice-box">
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 6 }}>
                  馬上練一題
                </div>
                <QuizBlock
                  q={ex.practice}
                  selected={exAns[ex.clip]}
                  onPick={(i) => setExAns((prev) => ({ ...prev, [ex.clip]: i }))}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "quiz" && (
        <div>
          <div className="card" style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <strong>小考進度：</strong>
              {quizDone} / {L01_QUIZ.length} 題（目前答對 {quizScore} 題）
            </div>
            {quizDone > 0 && (
              <button className="btn btn-sm" onClick={() => setQuizAns({})}>
                全部重做
              </button>
            )}
          </div>

          {L01_QUIZ.map((q) => (
            <div key={q.id} className="card" style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span className="pill pill-accent">{q.label}</span>
                {q.audioClip && (
                  <button className="btn btn-sm" onClick={() => playClip(audioRef, q.audioClip!)}>
                    🔊 播放聽解原聲
                  </button>
                )}
              </div>
              <QuizBlock
                q={q}
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
            <h2>第 1 課單字表（N5 / N4）</h2>
            <button className="btn btn-sm" onClick={() => setHideMeaning((v) => !v)}>
              {hideMeaning ? "顯示中文" : "遮住中文自我測驗"}
            </button>
          </div>
          <table className="vocab-table">
            <thead>
              <tr>
                <th>單字</th>
                <th>假名</th>
                <th>中文意思</th>
                <th>等級</th>
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
                  <td>{hideMeaning ? "••••••" : v.zh}</td>
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
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{p.title}</div>
                <div className="pill pill-accent ja" style={{ marginBottom: 8 }}>
                  {p.frame}
                </div>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>{p.summary}</div>
                <div className="mistake-box ja">
                  <div>❌ {p.mistake}</div>
                  <div>✅ {p.fix}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h2 style={{ marginTop: 0 }}>下載 L01 Anki 原聲卡組</h2>
            <p style={{ color: "var(--muted)" }}>
              內含 <strong>15 句動漫原聲例句卡</strong>（附日語配音檔）＋{" "}
              <strong>26 張 N5/N4 單字卡</strong>。下載後在電腦或手機 Anki 點兩下 `.apkg` 即可直接匯入複習。
            </p>
            <a className="btn btn-primary" href="/downloads/ikku-l01.apkg" download>
              下載 ikku-l01.apkg (480 KB)
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [lesson, setLesson] = useState<number | null>(() => {
    const m = window.location.pathname.match(/\/lesson\/(\d+)/);
    return m ? Number(m[1]) : null;
  });

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
    window.history.pushState({}, "", target);
    setLesson(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <header className="nav">
        <div className="container nav-inner">
          <div className="brand" onClick={() => navigate(null)}>
            <span className="brand-badge">ikku.yomu</span>
            <span>讀一句日文</span>
          </div>
          <nav className="nav-links">
            <button className="btn btn-sm" onClick={() => navigate(null)}>
              課程總覽
            </button>
            <button className="btn btn-sm btn-primary" onClick={() => navigate(1)}>
              L01 練習＆小考
            </button>
          </nav>
        </div>
      </header>

      <main className="container">
        {lesson === 1 ? (
          <Lesson1Page onBack={() => navigate(null)} />
        ) : (
          <HomePage onOpenLesson={(n) => navigate(n)} />
        )}
      </main>

      <footer className="container footer">
        <span>讀一句日文 ikku.yomu · 免費動漫 JLPT N5→N4 課程</span>
        <span>YouTube @ikkuyomu · ikkuyomu.com</span>
      </footer>
    </div>
  );
}
