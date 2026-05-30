import ResumeUpload from "@/components/resume-upload";
import Navbar from "@/components/navbar";

export default function ResumePage() {
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
          --shadow-sm:     0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
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
        .rp-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .rp-bg-c1 {
          position: absolute; top: -160px; right: -120px;
          width: 560px; height: 560px; border-radius: 50%;
          background: radial-gradient(circle, rgba(59,99,210,0.07) 0%, transparent 70%);
        }
        .rp-bg-c2 {
          position: absolute; bottom: -100px; left: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(217,127,47,0.06) 0%, transparent 70%);
        }
        .rp-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(59,99,210,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,99,210,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }

        /* ── Layout ── */
        .rp-wrapper { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; }
        .rp-content {
          max-width: 860px; margin: 0 auto;
          padding: 52px 32px 88px; width: 100%;
          display: flex; flex-direction: column; gap: 44px;
          animation: rpUp 0.65s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes rpUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Hero ── */
        .rp-hero {
          display: flex; flex-direction: column; gap: 18px;
          animation: rpUp 0.6s 0.08s cubic-bezier(0.22,1,0.36,1) both;
        }
        .rp-eyebrow-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px 4px 8px;
          background: var(--blue-dim); border: 1px solid var(--border-accent);
          border-radius: 100px; font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue);
          width: fit-content;
        }
        .rp-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--blue);
          animation: rpPulse 2.2s ease-in-out infinite;
        }
        @keyframes rpPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.75); }
        }
        .rp-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 500; line-height: 1.12;
          color: var(--ink); letter-spacing: -0.01em;
        }
        .rp-title em { font-style: italic; color: var(--blue); }
        .rp-rule {
          display: flex; align-items: center; gap: 14px;
        }
        .rp-rule-line {
          height: 1px; width: 48px;
          background: linear-gradient(to right, var(--blue), transparent); opacity: 0.45;
        }
        .rp-rule-text {
          font-size: 11px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--ink-muted);
        }
        .rp-subtitle {
          max-width: 500px; font-size: 15.5px; font-weight: 300;
          line-height: 1.7; color: var(--ink-secondary);
        }

        /* ── How it works ── */
        .rp-steps {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
          animation: rpUp 0.6s 0.18s cubic-bezier(0.22,1,0.36,1) both;
        }
        .rp-step {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 14px; padding: 20px 22px;
          box-shadow: var(--shadow-sm);
          display: flex; flex-direction: column; gap: 10px;
          transition: box-shadow 0.2s, transform 0.2s;
          position: relative; overflow: hidden;
        }
        .rp-step::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 3px; height: 100%; background: var(--blue); opacity: 0;
          transition: opacity 0.2s;
        }
        .rp-step:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); transform: translateY(-2px); }
        .rp-step:hover::before { opacity: 1; }
        .rp-step-num {
          width: 28px; height: 28px; border-radius: 8px;
          background: var(--blue-dim); border: 1px solid var(--border-accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: var(--blue);
        }
        .rp-step-title {
          font-family: var(--font-display); font-size: 1rem;
          font-weight: 500; color: var(--ink);
        }
        .rp-step-desc {
          font-size: 13px; font-weight: 300; color: var(--ink-secondary); line-height: 1.6;
        }

        /* ── Upload card ── */
        .rp-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 18px; box-shadow: var(--shadow-lg);
          overflow: hidden;
          animation: rpUp 0.6s 0.28s cubic-bezier(0.22,1,0.36,1) both;
        }
        .rp-card-stripe {
          height: 4px;
          background: linear-gradient(90deg, var(--blue), var(--blue-light), var(--amber));
        }
        .rp-card-header {
          padding: 26px 36px 22px; border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .rp-card-heading-wrap { display: flex; flex-direction: column; gap: 3px; }
        .rp-card-heading {
          font-family: var(--font-display); font-size: 1.3rem;
          font-weight: 500; color: var(--ink);
        }
        .rp-card-subheading {
          font-size: 13px; font-weight: 400; color: var(--ink-muted);
        }
        .rp-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px;
          background: rgba(217,127,47,0.09); border: 1px solid rgba(217,127,47,0.28);
          border-radius: 100px; font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--amber);
        }
        .rp-card-body { padding: 32px 36px 40px; }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .rp-content     { padding: 32px 18px 64px; gap: 32px; }
          .rp-steps       { grid-template-columns: 1fr; }
          .rp-card-header { padding: 20px 22px 16px; }
          .rp-card-body   { padding: 24px 22px 32px; }
        }
      `}</style>

      {/* Background */}
      <div className="rp-bg" aria-hidden="true">
        <div className="rp-bg-c1" />
        <div className="rp-bg-c2" />
        <div className="rp-bg-grid" />
      </div>

      <div className="rp-wrapper">
        <Navbar />

        <main className="rp-content">

          {/* Hero */}
          <header className="rp-hero">
            <div className="rp-eyebrow-pill">
              <span className="rp-eyebrow-dot" />
              Resume Analysis
            </div>
            <h1 className="rp-title">
              Resume-Tailored <em>Interview</em>
            </h1>
            <div className="rp-rule">
              <span className="rp-rule-line" />
              <span className="rp-rule-text">Personalised · AI-Generated · Precise</span>
            </div>
            <p className="rp-subtitle">
              Upload your resume and our AI will analyse your experience, skills, and background to generate interview questions crafted specifically for you.
            </p>
          </header>

          {/* How it works */}
          <div className="rp-steps">
            <div className="rp-step">
              <div className="rp-step-num">1</div>
              <div className="rp-step-title">Upload Resume</div>
              <p className="rp-step-desc">Drop your PDF or Word resume — we'll extract your skills and experience automatically.</p>
            </div>
            <div className="rp-step">
              <div className="rp-step-num">2</div>
              <div className="rp-step-title">AI Analysis</div>
              <p className="rp-step-desc">Our model reads your background and crafts targeted questions matched to your profile.</p>
            </div>
            <div className="rp-step">
              <div className="rp-step-num">3</div>
              <div className="rp-step-title">Start Practicing</div>
              <p className="rp-step-desc">Answer in your own words or with voice, then get instant feedback on your responses.</p>
            </div>
          </div>

          {/* Upload card */}
          <section className="rp-card">
            <div className="rp-card-stripe" />
            <div className="rp-card-header">
              <div className="rp-card-heading-wrap">
                <h2 className="rp-card-heading">Upload Your Resume</h2>
                <p className="rp-card-subheading">PDF or DOCX · Max 10MB</p>
              </div>
              <div className="rp-badge">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Ready to Upload
              </div>
            </div>
            <div className="rp-card-body">
              <ResumeUpload />
            </div>
          </section>

        </main>
      </div>
    </>
  );
}