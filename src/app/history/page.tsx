import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import DeleteInterviewButton from "@/components/delete-interview-button";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default async function HistoryPage() {
  const { userId } = await auth();

  const interviews = await prisma.interview.findMany({
    where: { userId: userId || "unknown" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <style>{`
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
          --red-dim:       rgba(220,53,53,0.08);
          --red:           #dc3535;
          --shadow-sm:     0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          --shadow-md:     0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
          --shadow-lg:     0 12px 40px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05);
          --font-display:  'Playfair Display', Georgia, serif;
          --font-body:     'Mulish', sans-serif;
          --radius:        14px;
        }

        body {
          background-color: var(--bg-base);
          color: var(--ink);
          font-family: var(--font-body);
          min-height: 100vh;
        }

        /* ── Background ── */
        .hy-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
        }
        .hy-bg-circle1 {
          position: absolute; top: -160px; right: -120px;
          width: 560px; height: 560px; border-radius: 50%;
          background: radial-gradient(circle, rgba(59,99,210,0.07) 0%, transparent 70%);
        }
        .hy-bg-circle2 {
          position: absolute; bottom: -100px; left: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(217,127,47,0.06) 0%, transparent 70%);
        }
        .hy-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(59,99,210,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,99,210,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }

        /* ── Layout ── */
        .hy-wrapper {
          position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column;
        }
        .hy-content {
          max-width: 920px; margin: 0 auto;
          padding: 52px 32px 88px; width: 100%;
          display: flex; flex-direction: column; gap: 40px;
          animation: hyFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes hyFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Hero ── */
        .hy-hero {
          display: flex; flex-direction: column; gap: 16px;
          animation: hyFadeUp 0.6s 0.08s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hy-eyebrow-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px 4px 8px;
          background: var(--blue-dim); border: 1px solid var(--border-accent);
          border-radius: 100px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--blue); width: fit-content;
        }
        .hy-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--blue);
          animation: hyPulse 2.2s ease-in-out infinite;
        }
        @keyframes hyPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.75); }
        }
        .hy-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5vw, 3.5rem);
          font-weight: 500; line-height: 1.12;
          color: var(--ink); letter-spacing: -0.01em;
        }
        .hy-title em { font-style: italic; color: var(--blue); }
        .hy-rule {
          display: flex; align-items: center; gap: 14px;
        }
        .hy-rule-line {
          height: 1px; width: 48px;
          background: linear-gradient(to right, var(--blue), transparent); opacity: 0.45;
        }
        .hy-rule-text {
          font-size: 11px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--ink-muted);
        }
        .hy-subtitle {
          max-width: 460px; font-size: 15px; font-weight: 300;
          line-height: 1.7; color: var(--ink-secondary);
        }

        /* ── Count badge ── */
        .hy-count-row {
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
          animation: hyFadeUp 0.6s 0.16s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hy-count-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 100px; padding: 6px 14px;
          font-size: 13px; font-weight: 500; color: var(--ink-secondary);
          box-shadow: var(--shadow-sm);
        }
        .hy-count-badge strong { color: var(--ink); font-weight: 600; }

        /* ── Interview list ── */
        .hy-list {
          display: flex; flex-direction: column; gap: 16px;
          animation: hyFadeUp 0.6s 0.22s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* ── Interview card ── */
        .hy-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          transition: box-shadow 0.22s, transform 0.22s;
          position: relative;
        }
        .hy-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .hy-card-stripe {
          height: 3px;
          background: linear-gradient(90deg, var(--blue), var(--blue-light), var(--amber));
        }
        .hy-card-body {
          padding: 22px 28px 24px;
          display: flex; align-items: flex-start; justify-content: space-between; gap: 20px;
          flex-wrap: wrap;
        }
        .hy-card-left { display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 0; }
        .hy-card-role {
          font-family: var(--font-display);
          font-size: 1.25rem; font-weight: 500;
          color: var(--ink); line-height: 1.2;
        }
        .hy-card-tech {
          display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
        }
        .hy-tech-tag {
          display: inline-block;
          background: var(--blue-dim); color: var(--blue);
          border: 1px solid var(--border-accent);
          border-radius: 6px; padding: 2px 9px;
          font-size: 12px; font-weight: 500;
        }
        .hy-card-date {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 400; color: var(--ink-muted); margin-top: 2px;
        }
        .hy-card-date svg { opacity: 0.5; flex-shrink: 0; }

        /* ── Card actions ── */
        .hy-card-actions {
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
          align-self: center;
        }
        .hy-btn-view {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--blue); color: #fff;
          border: none; border-radius: 10px;
          padding: 9px 18px;
          font-family: var(--font-body); font-size: 13px; font-weight: 600;
          text-decoration: none; cursor: pointer;
          box-shadow: 0 2px 8px rgba(59,99,210,0.25);
          transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
        }
        .hy-btn-view:hover {
          background: var(--blue-light);
          box-shadow: 0 4px 14px rgba(59,99,210,0.35);
          transform: translateY(-1px);
        }
        .hy-btn-view svg { flex-shrink: 0; }

        /* ── Empty state ── */
        .hy-empty {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 16px; padding: 72px 24px;
          background: var(--bg-card); border: 1px dashed rgba(59,99,210,0.2);
          border-radius: 18px; text-align: center;
          animation: hyFadeUp 0.6s 0.2s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hy-empty-icon {
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--blue-dim); display: flex; align-items: center; justify-content: center;
        }
        .hy-empty-icon svg { color: var(--blue); opacity: 0.7; }
        .hy-empty-title {
          font-family: var(--font-display); font-size: 1.4rem; font-weight: 500; color: var(--ink);
        }
        .hy-empty-text { font-size: 14px; color: var(--ink-muted); max-width: 300px; line-height: 1.6; }
        .hy-empty-link {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--blue); color: #fff; text-decoration: none;
          padding: 10px 22px; border-radius: 10px;
          font-size: 13px; font-weight: 600;
          box-shadow: 0 2px 8px rgba(59,99,210,0.25);
          transition: background 0.18s, transform 0.18s;
        }
        .hy-empty-link:hover { background: var(--blue-light); transform: translateY(-1px); }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .hy-content    { padding: 32px 18px 64px; gap: 28px; }
          .hy-card-body  { padding: 18px 20px 20px; flex-direction: column; }
          .hy-card-actions { align-self: flex-start; }
        }
      `}</style>

      {/* Background */}
      <div className="hy-bg" aria-hidden="true">
        <div className="hy-bg-circle1" />
        <div className="hy-bg-circle2" />
        <div className="hy-bg-grid" />
      </div>

      <div className="hy-wrapper">
        <Navbar />

        <main className="hy-content">

          {/* Hero */}
          <header className="hy-hero">
            <div className="hy-eyebrow-pill">
              <span className="hy-eyebrow-dot" />
              Session History
            </div>
            <h1 className="hy-title">
              Your <em>Interview</em> History
            </h1>
            <div className="hy-rule">
              <span className="hy-rule-line" />
              <span className="hy-rule-text">All past sessions · Sorted by latest</span>
            </div>
            <p className="hy-subtitle">
              Review your previous interviews, revisit your answers, and track how your confidence has grown over time.
            </p>
          </header>

          {/* Count row */}
          {interviews.length > 0 && (
            <div className="hy-count-row">
              <div className="hy-count-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <strong>{interviews.length}</strong> interview{interviews.length !== 1 ? "s" : ""} found
              </div>
            </div>
          )}

          {/* List or Empty */}
          {interviews.length === 0 ? (
            <div className="hy-empty">
              <div className="hy-empty-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div className="hy-empty-title">No interviews yet</div>
              <p className="hy-empty-text">You haven't completed any interviews. Start your first session to see it here.</p>
              <Link href="/" className="hy-empty-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Start an Interview
              </Link>
            </div>
          ) : (
            <div className="hy-list">
              {interviews.map((interview, i) => {
                const tags = interview.techstack
                  ? interview.techstack.split(",").map((t: string) => t.trim()).filter(Boolean).slice(0, 4)
                  : [];

                return (
                  <div
                    key={interview.id}
                    className="hy-card"
                    style={{ animationDelay: `${0.22 + i * 0.06}s` }}
                  >
                    <div className="hy-card-stripe" />
                    <div className="hy-card-body">
                      <div className="hy-card-left">
                        <div className="hy-card-role">{interview.role}</div>
                        {tags.length > 0 && (
                          <div className="hy-card-tech">
                            {tags.map((tag: string) => (
                              <span key={tag} className="hy-tech-tag">{tag}</span>
                            ))}
                          </div>
                        )}
                        <div className="hy-card-date">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                          </svg>
                          {new Date(interview.createdAt).toLocaleString(undefined, {
                            year: "numeric", month: "short", day: "numeric",
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </div>
                      </div>

                      <div className="hy-card-actions">
                        <Link href={`/interview/${interview.id}`} className="hy-btn-view">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                          </svg>
                          View
                        </Link>
                        <DeleteInterviewButton interviewId={interview.id} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>
    </>
  );
}