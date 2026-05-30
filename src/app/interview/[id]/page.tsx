"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VoiceControls from "@/components/voice-controls";
import Navbar from "@/components/navbar";

type QuestionType = {
  question: string;
  answer: string;
};

export default function InterviewPage() {
  const params = useParams();
  const router = useRouter();

  const interviewId = params.id as string;

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await fetch(`/api/interview/${interviewId}`);
        const data = await response.json();
        if (data.success) setQuestions(data.interview.questions);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (interviewId) fetchInterview();
  }, [interviewId]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const current = questions[currentQuestion];

  const handleTextChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      const userAns = answers[index]?.toLowerCase() || "";
      const correctAns = q.answer?.toLowerCase() || "";
      const matchCount = userAns.split(" ").filter((w) => correctAns.includes(w)).length;
      if (matchCount > 2) score += 1;
    });
    return score;
  };

  const score = calculateScore();
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const timerWarning = timeLeft <= 15;
  const timerCritical = timeLeft <= 5;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(60);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setTimeLeft(60);
    }
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Mulish:wght@300;400;500;600&display=swap');

    :root {
      --bg-base:       #f7f5f1;
      --bg-card:       #ffffff;
      --border:        rgba(0,0,0,0.08);
      --border-accent: rgba(59,99,210,0.2);
      --ink:           #1a1a2e;
      --ink-secondary: #5c5c72;
      --ink-muted:     #a5a5bb;
      --blue:          #3b63d2;
      --blue-light:    #5b7ee8;
      --blue-dim:      rgba(59,99,210,0.09);
      --amber:         #d97f2f;
      --green:         #228b4a;
      --green-dim:     rgba(34,139,74,0.09);
      --red:           #dc3535;
      --red-dim:       rgba(220,53,53,0.09);
      --shadow-sm:     0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      --shadow-md:     0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
      --shadow-lg:     0 12px 40px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05);
      --font-display:  'Playfair Display', Georgia, serif;
      --font-body:     'Mulish', sans-serif;
    }

    body {
      background-color: var(--bg-base);
      color: var(--ink);
      font-family: var(--font-body);
      min-height: 100vh;
    }

    /* ── Background ── */
    .iv-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
    .iv-bg-c1 {
      position: absolute; top: -160px; right: -120px;
      width: 560px; height: 560px; border-radius: 50%;
      background: radial-gradient(circle, rgba(59,99,210,0.07) 0%, transparent 70%);
    }
    .iv-bg-c2 {
      position: absolute; bottom: -100px; left: -80px;
      width: 420px; height: 420px; border-radius: 50%;
      background: radial-gradient(circle, rgba(217,127,47,0.06) 0%, transparent 70%);
    }
    .iv-bg-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(59,99,210,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59,99,210,0.03) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
    }

    /* ── Layout ── */
    .iv-wrapper { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; }
    .iv-content {
      max-width: 780px; margin: 0 auto;
      padding: 48px 32px 80px; width: 100%;
      display: flex; flex-direction: column; gap: 24px;
      animation: ivUp 0.65s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes ivUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Loading ── */
    .iv-loading {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: 18px; min-height: 60vh;
      animation: ivUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    .iv-spinner {
      width: 40px; height: 40px; border-radius: 50%;
      border: 3px solid var(--border);
      border-top-color: var(--blue);
      animation: ivSpin 0.8s linear infinite;
    }
    @keyframes ivSpin { to { transform: rotate(360deg); } }
    .iv-loading-text {
      font-family: var(--font-display); font-size: 1.1rem;
      font-style: italic; color: var(--ink-secondary);
    }

    /* ── Session header ── */
    .iv-header { display: flex; flex-direction: column; gap: 14px; }
    .iv-header-top {
      display: flex; align-items: flex-start;
      justify-content: space-between; flex-wrap: wrap; gap: 12px;
    }
    .iv-header-left { display: flex; flex-direction: column; gap: 6px; }
    .iv-eyebrow-pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 12px 4px 8px;
      background: var(--blue-dim); border: 1px solid var(--border-accent);
      border-radius: 100px; font-size: 11px; font-weight: 600;
      letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue);
      width: fit-content;
    }
    .iv-eyebrow-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--blue);
      animation: ivPulse 2.2s ease-in-out infinite;
    }
    @keyframes ivPulse {
      0%,100% { opacity:1; transform:scale(1); }
      50%      { opacity:0.4; transform:scale(0.75); }
    }
    .iv-title {
      font-family: var(--font-display);
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-weight: 500; color: var(--ink); line-height: 1.15;
    }
    .iv-title em { font-style: italic; color: var(--blue); }

    /* ── Timer pill ── */
    .iv-timer {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 16px; border-radius: 12px;
      border: 1px solid var(--border);
      background: var(--bg-card);
      box-shadow: var(--shadow-sm);
      font-size: 13px; font-weight: 600;
      color: var(--ink-secondary);
      transition: background 0.3s, border-color 0.3s, color 0.3s;
      white-space: nowrap; align-self: flex-start;
    }
    .iv-timer.warn  { background: rgba(217,127,47,0.09); border-color: rgba(217,127,47,0.3); color: var(--amber); }
    .iv-timer.crit  { background: var(--red-dim); border-color: rgba(220,53,53,0.3); color: var(--red); }
    .iv-timer svg   { flex-shrink: 0; }

    /* ── Progress bar ── */
    .iv-progress-wrap { display: flex; flex-direction: column; gap: 6px; }
    .iv-progress-meta {
      display: flex; justify-content: space-between;
      font-size: 12px; font-weight: 500; color: var(--ink-muted);
    }
    .iv-progress-track {
      height: 5px; background: var(--border); border-radius: 100px; overflow: hidden;
    }
    .iv-progress-fill {
      height: 100%; border-radius: 100px;
      background: linear-gradient(90deg, var(--blue), var(--blue-light));
      transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
    }

    /* ── Question card ── */
    .iv-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 18px; box-shadow: var(--shadow-lg);
      overflow: hidden; position: relative;
    }
    .iv-card-stripe {
      height: 4px;
      background: linear-gradient(90deg, var(--blue), var(--blue-light), var(--amber));
    }
    .iv-card-body { padding: 32px 36px 36px; display: flex; flex-direction: column; gap: 20px; }
    .iv-q-label {
      font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--ink-muted);
    }
    .iv-question {
      font-family: var(--font-display);
      font-size: 1.25rem; font-weight: 500;
      color: var(--ink); line-height: 1.5;
    }
    .iv-divider { height: 1px; background: var(--border); }

    /* ── Textarea ── */
    .iv-textarea {
      width: 100%; border-radius: 12px;
      border: 1px solid var(--border);
      background: #faf9f7;
      padding: 14px 16px;
      font-family: var(--font-body); font-size: 14px; font-weight: 400;
      color: var(--ink); line-height: 1.6; resize: vertical;
      min-height: 130px;
      transition: border-color 0.18s, box-shadow 0.18s;
      outline: none;
      box-sizing: border-box;
    }
    .iv-textarea::placeholder { color: var(--ink-muted); }
    .iv-textarea:focus {
      border-color: var(--blue-light);
      box-shadow: 0 0 0 3px rgba(59,99,210,0.1);
    }

    /* ── Nav buttons ── */
    .iv-btn-row { display: flex; gap: 10px; }
    .iv-btn-prev {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--bg-card); color: var(--ink-secondary);
      border: 1px solid var(--border); border-radius: 10px;
      padding: 9px 18px; font-family: var(--font-body);
      font-size: 13px; font-weight: 600; cursor: pointer;
      transition: background 0.18s, border-color 0.18s, transform 0.18s;
    }
    .iv-btn-prev:hover:not(:disabled) {
      background: var(--bg-base); border-color: rgba(0,0,0,0.14); transform: translateY(-1px);
    }
    .iv-btn-prev:disabled { opacity: 0.4; cursor: not-allowed; }
    .iv-btn-next {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--blue); color: #fff;
      border: none; border-radius: 10px;
      padding: 9px 20px; font-family: var(--font-body);
      font-size: 13px; font-weight: 600; cursor: pointer;
      box-shadow: 0 2px 8px rgba(59,99,210,0.25);
      transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
    }
    .iv-btn-next:hover {
      background: var(--blue-light);
      box-shadow: 0 4px 14px rgba(59,99,210,0.35);
      transform: translateY(-1px);
    }

    /* ── Score strip ── */
    .iv-score-strip {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 14px; padding: 16px 24px;
      display: flex; align-items: center; justify-content: space-between;
      box-shadow: var(--shadow-sm); flex-wrap: wrap; gap: 10px;
    }
    .iv-score-label {
      font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--ink-muted);
    }
    .iv-score-val {
      font-family: var(--font-display); font-size: 1.3rem;
      font-weight: 500; color: var(--ink);
    }
    .iv-score-val em { font-style: italic; color: var(--blue); }

    /* ── Dots nav ── */
    .iv-dots { display: flex; gap: 6px; flex-wrap: wrap; }
    .iv-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--border); border: 1px solid rgba(0,0,0,0.1);
      cursor: pointer; transition: background 0.2s, transform 0.2s;
    }
    .iv-dot.answered  { background: rgba(59,99,210,0.3); }
    .iv-dot.current   { background: var(--blue); transform: scale(1.3); }

    /* ── Completed screen ── */
    .iv-done-content {
      max-width: 600px; margin: 0 auto;
      padding: 52px 32px 80px; width: 100%;
      display: flex; flex-direction: column; align-items: center;
      gap: 28px; text-align: center;
      animation: ivUp 0.65s cubic-bezier(0.22,1,0.36,1) both;
    }
    .iv-done-icon {
      width: 72px; height: 72px; border-radius: 50%;
      background: var(--green-dim); border: 1px solid rgba(34,139,74,0.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 2rem;
    }
    .iv-done-title {
      font-family: var(--font-display);
      font-size: clamp(2rem, 5vw, 2.8rem);
      font-weight: 500; color: var(--ink); line-height: 1.15;
    }
    .iv-done-title em { font-style: italic; color: var(--green); }
    .iv-done-subtitle { font-size: 15px; font-weight: 300; color: var(--ink-secondary); }
    .iv-done-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 18px; box-shadow: var(--shadow-lg);
      overflow: hidden; width: 100%;
    }
    .iv-done-card-stripe {
      height: 4px;
      background: linear-gradient(90deg, var(--green), #34c76a, var(--blue-light));
    }
    .iv-done-card-body { padding: 32px; display: flex; flex-direction: column; gap: 6px; align-items: center; }
    .iv-done-score-label {
      font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--ink-muted);
    }
    .iv-done-score {
      font-family: var(--font-display); font-size: 3.5rem;
      font-weight: 500; color: var(--ink); line-height: 1;
    }
    .iv-done-score em { color: var(--green); font-style: normal; }
    .iv-done-score-sub { font-size: 13px; color: var(--ink-muted); }
    .iv-done-btns { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
    .iv-done-btn-primary {
      display: inline-flex; align-items: center; gap: 7px;
      background: var(--blue); color: #fff; border: none;
      border-radius: 10px; padding: 11px 22px;
      font-family: var(--font-body); font-size: 14px; font-weight: 600;
      cursor: pointer; box-shadow: 0 2px 8px rgba(59,99,210,0.25);
      transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
    }
    .iv-done-btn-primary:hover {
      background: var(--blue-light);
      box-shadow: 0 4px 14px rgba(59,99,210,0.35);
      transform: translateY(-1px);
    }
    .iv-done-btn-secondary {
      display: inline-flex; align-items: center; gap: 7px;
      background: var(--bg-card); color: var(--ink-secondary);
      border: 1px solid var(--border); border-radius: 10px;
      padding: 11px 22px; font-family: var(--font-body);
      font-size: 14px; font-weight: 600; cursor: pointer;
      transition: background 0.18s, transform 0.18s;
    }
    .iv-done-btn-secondary:hover {
      background: var(--bg-base); transform: translateY(-1px);
    }

    @media (max-width: 640px) {
      .iv-content     { padding: 32px 18px 64px; }
      .iv-card-body   { padding: 22px 20px 24px; }
      .iv-done-content { padding: 36px 18px 64px; }
    }
  `;

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="iv-bg" aria-hidden="true">
          <div className="iv-bg-c1" /><div className="iv-bg-c2" /><div className="iv-bg-grid" />
        </div>
        <div className="iv-wrapper">
          <Navbar />
          <div className="iv-loading">
            <div className="iv-spinner" />
            <p className="iv-loading-text">Preparing your interview session…</p>
          </div>
        </div>
      </>
    );
  }

  if (completed) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <>
        <style>{styles}</style>
        <div className="iv-bg" aria-hidden="true">
          <div className="iv-bg-c1" /><div className="iv-bg-c2" /><div className="iv-bg-grid" />
        </div>
        <div className="iv-wrapper">
          <Navbar />
          <div className="iv-done-content">
            <div className="iv-done-icon">🎉</div>
            <div>
              <h1 className="iv-done-title">Interview <em>Complete!</em></h1>
              <p className="iv-done-subtitle" style={{ marginTop: 8 }}>
                Well done — you answered all {questions.length} questions.
              </p>
            </div>

            <div className="iv-done-card">
              <div className="iv-done-card-stripe" />
              <div className="iv-done-card-body">
                <div className="iv-done-score-label">Your Score</div>
                <div className="iv-done-score">
                  <em>{score}</em> / {questions.length}
                </div>
                <div className="iv-done-score-sub">{pct}% keyword match accuracy</div>
              </div>
            </div>

            <div className="iv-done-btns">
              <button className="iv-done-btn-primary" onClick={() => router.push("/dashboard")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Back to Dashboard
              </button>
              <button className="iv-done-btn-secondary" onClick={() => { setCompleted(false); setCurrentQuestion(0); setAnswers({}); setTimeLeft(60); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
                </svg>
                Restart
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="iv-bg" aria-hidden="true">
        <div className="iv-bg-c1" /><div className="iv-bg-c2" /><div className="iv-bg-grid" />
      </div>

      <div className="iv-wrapper">
        <Navbar />

        <main className="iv-content">

          {/* Header */}
          <div className="iv-header">
            <div className="iv-header-top">
              <div className="iv-header-left">
                <div className="iv-eyebrow-pill">
                  <span className="iv-eyebrow-dot" />
                  Live Session
                </div>
                <h1 className="iv-title">AI <em>Interview</em> Session</h1>
              </div>
              <div className={`iv-timer${timerCritical ? " crit" : timerWarning ? " warn" : ""}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {timeLeft}s remaining
              </div>
            </div>

            {/* Progress */}
            <div className="iv-progress-wrap">
              <div className="iv-progress-meta">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="iv-progress-track">
                <div className="iv-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Dot nav */}
            <div className="iv-dots">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`iv-dot${i === currentQuestion ? " current" : answers[i] ? " answered" : ""}`}
                  title={`Question ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Question card */}
          <div className="iv-card">
            <div className="iv-card-stripe" />
            <div className="iv-card-body">
              <div className="iv-q-label">Question {currentQuestion + 1}</div>
              <h2 className="iv-question">{current?.question}</h2>
              <div className="iv-divider" />

              <VoiceControls question={current?.question || ""} />

              <textarea
                className="iv-textarea"
                placeholder="Type your answer here…"
                rows={5}
                value={answers[currentQuestion] || ""}
                onChange={(e) => handleTextChange(e.target.value)}
              />

              <div className="iv-btn-row">
                <button className="iv-btn-prev" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Previous
                </button>
                <button className="iv-btn-next" onClick={handleNext}>
                  {currentQuestion < questions.length - 1 ? (
                    <>
                      Next
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </>
                  ) : (
                    <>
                      Finish
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Live score */}
          <div className="iv-score-strip">
            <span className="iv-score-label">Estimated Score</span>
            <span className="iv-score-val">
              <em>{score}</em> / {questions.length}
            </span>
          </div>

        </main>
      </div>
    </>
  );
}