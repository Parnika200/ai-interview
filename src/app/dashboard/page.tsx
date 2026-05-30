import InterviewForm from "@/components/interview-form";
import Navbar from "@/components/navbar";

export default async function DashboardPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Mulish:wght@300;400;500;600&display=swap');

        :root {
          --bg-base:        #f7f5f1;
          --bg-card:        #ffffff;
          --bg-surface:     #f0ede7;
          --bg-accent:      #eef3ff;
          --border:         rgba(0,0,0,0.08);
          --border-accent:  rgba(59,99,210,0.2);
          --ink:            #1a1a2e;
          --ink-secondary:  #5c5c72;
          --ink-muted:      #a5a5bb;
          --blue:           #3b63d2;
          --blue-light:     #5b7ee8;
          --blue-dim:       rgba(59,99,210,0.09);
          --amber:          #d97f2f;
          --shadow-sm:      0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          --shadow-md:      0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
          --shadow-lg:      0 12px 40px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05);
          --font-display:   'Playfair Display', Georgia, serif;
          --font-body:      'Mulish', sans-serif;
          --radius:         14px;
        }

        body {
          background-color: var(--bg-base);
          color: var(--ink);
          font-family: var(--font-body);
          min-height: 100vh;
        }

        /* ── Background geometry ── */
        .db-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .db-bg-circle1 {
          position: absolute;
          top: -160px;
          right: -120px;
          width: 560px;
          height: 560px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,99,210,0.07) 0%, transparent 70%);
        }
        .db-bg-circle2 {
          position: absolute;
          bottom: -100px;
          left: -80px;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(217,127,47,0.06) 0%, transparent 70%);
        }
        .db-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(59,99,210,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,99,210,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }

        /* ── Page wrapper ── */
        .db-wrapper {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .db-content {
          max-width: 920px;
          margin: 0 auto;
          padding: 52px 32px 88px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 44px;
          animation: dbFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes dbFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Hero ── */
        .db-hero {
          display: flex;
          flex-direction: column;
          gap: 18px;
          animation: dbFadeUp 0.6s 0.08s cubic-bezier(0.22,1,0.36,1) both;
        }
        .db-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .db-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px 4px 8px;
          background: var(--blue-dim);
          border: 1px solid var(--border-accent);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--blue);
        }
        .db-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--blue);
          animation: dbPulse 2.2s ease-in-out infinite;
        }
        @keyframes dbPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.75); }
        }
        .db-title {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 5.5vw, 3.8rem);
          font-weight: 500;
          line-height: 1.12;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .db-title em {
          font-style: italic;
          color: var(--blue);
        }
        .db-subtitle {
          max-width: 500px;
          font-size: 15.5px;
          font-weight: 300;
          line-height: 1.7;
          color: var(--ink-secondary);
        }
        .db-rule {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 4px;
        }
        .db-rule-line {
          height: 1px;
          width: 48px;
          background: linear-gradient(to right, var(--blue), transparent);
          opacity: 0.45;
        }
        .db-rule-text {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }

        /* ── Stats ── */
        .db-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          animation: dbFadeUp 0.6s 0.18s cubic-bezier(0.22,1,0.36,1) both;
        }
        .db-stat {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 22px 24px;
          box-shadow: var(--shadow-sm);
          transition: box-shadow 0.2s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }
        .db-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px;
          height: 100%;
          background: var(--blue);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .db-stat:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .db-stat:hover::before { opacity: 1; }
        .db-stat-value {
          font-family: var(--font-display);
          font-size: 2.1rem;
          font-weight: 500;
          color: var(--ink);
          line-height: 1;
          margin-bottom: 6px;
        }
        .db-stat-value sup {
          font-size: 1rem;
          color: var(--blue);
          font-style: italic;
        }
        .db-stat-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }

        /* ── Form card ── */
        .db-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          animation: dbFadeUp 0.6s 0.28s cubic-bezier(0.22,1,0.36,1) both;
          position: relative;
        }
        .db-card-stripe {
          height: 4px;
          background: linear-gradient(90deg, var(--blue), var(--blue-light), var(--amber));
        }
        .db-card-header {
          padding: 28px 36px 22px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .db-card-heading-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .db-card-heading {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--ink);
        }
        .db-card-subheading {
          font-size: 13px;
          font-weight: 400;
          color: var(--ink-muted);
        }
        .db-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 13px;
          background: #eef6f0;
          border: 1px solid rgba(34,139,74,0.25);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #228b4a;
        }
        .db-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #34c76a;
          animation: dbPulse 2s ease-in-out infinite;
        }
        .db-card-body {
          padding: 32px 36px 40px;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .db-content      { padding: 32px 18px 64px; gap: 32px; }
          .db-stats        { grid-template-columns: 1fr 1fr; }
          .db-stats .db-stat:last-child { grid-column: 1 / -1; }
          .db-card-header  { padding: 20px 22px 16px; }
          .db-card-body    { padding: 24px 22px 32px; }
        }
      `}</style>

      {/* Background */}
      <div className="db-bg" aria-hidden="true">
        <div className="db-bg-circle1" />
        <div className="db-bg-circle2" />
        <div className="db-bg-grid" />
      </div>

      <div className="db-wrapper">
        <Navbar />

        <main className="db-content">

          {/* Hero */}
          <header className="db-hero">
            <div className="db-eyebrow">
              <div className="db-eyebrow-pill">
                <span className="db-eyebrow-dot" />
                AI Powered
              </div>
            </div>

            <h1 className="db-title">
              Your <em>Interview</em><br />Practice Platform
            </h1>

            <div className="db-rule">
              <span className="db-rule-line" />
              <span className="db-rule-text">Adaptive · Intelligent · Precise</span>
            </div>

            <p className="db-subtitle">
              Generate role-specific interviews with real-time AI feedback. Sharpen your answers, track your progress, and walk into every interview with confidence.
            </p>
          </header>

          {/* Form Card */}
          <section className="db-card">
            <div className="db-card-stripe" />
            <div className="db-card-header">
              <div className="db-card-heading-wrap">
                <h2 className="db-card-heading">Configure Your Session</h2>
                <p className="db-card-subheading">Set your role, level, and focus area to begin</p>
              </div>
              <div className="db-badge">
                <span className="db-badge-dot" />
                AI Ready
              </div>
            </div>
            <div className="db-card-body">
              <InterviewForm />
            </div>
          </section>

        </main>
      </div>
    </>
  );
}