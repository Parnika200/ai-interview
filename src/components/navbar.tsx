"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();

  const navStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Mulish:wght@400;500;600&display=swap');

    .nb-nav {
      position: sticky; top: 0; z-index: 100;
      background: rgba(219, 218, 217, 0.85);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(0,0,0,0.07);
      font-family: 'Mulish', sans-serif;
    }
    .nb-inner {
      max-width: 1200px; margin: 0 auto;
      padding: 0 32px;
      height: 64px;
      display: flex; align-items: center; justify-content: space-between; gap: 24px;
    }

    /* ── Logo ── */
    .nb-logo {
      display: flex; align-items: center; gap: 9px;
      text-decoration: none; flex-shrink: 0;
    }
    .nb-logo-icon {
      width: 32px; height: 32px; border-radius: 9px;
      background: linear-gradient(135deg, #3b63d2, #5b7ee8);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 8px rgba(59,99,210,0.3);
      flex-shrink: 0;
    }
    .nb-logo-icon svg { color: #fff; }
    .nb-logo-text {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.2rem; font-weight: 500;
      color: #1a1a2e; letter-spacing: -0.01em; line-height: 1;
    }
    .nb-logo-text em { font-style: italic; color: #3b63d2; }

    /* ── Links ── */
    .nb-links {
      display: flex; align-items: center; gap: 4px;
    }
    .nb-link {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 7px 14px; border-radius: 10px;
      font-size: 13.5px; font-weight: 500; color: #5c5c72;
      text-decoration: none;
      transition: background 0.18s, color 0.18s;
      position: relative;
    }
    .nb-link:hover { background: rgba(59,99,210,0.07); color: #3b63d2; }
    .nb-link.active { color: #3b63d2; background: rgba(59,99,210,0.09); }
    .nb-link.active::after {
      content: '';
      position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%);
      width: 16px; height: 2px; border-radius: 2px;
      background: #3b63d2;
    }

    /* ── CTA link ── */
    .nb-link-cta {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 10px;
      font-size: 13.5px; font-weight: 600;
      color: #fff; text-decoration: none;
      background: #3b63d2;
      box-shadow: 0 2px 8px rgba(59,99,210,0.25);
      transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
      margin-left: 4px;
    }
    .nb-link-cta:hover {
      background: #5b7ee8;
      box-shadow: 0 4px 14px rgba(59,99,210,0.35);
      transform: translateY(-1px);
    }
    .nb-link-cta.active {
      background: #2a4fbb;
      box-shadow: 0 2px 6px rgba(59,99,210,0.3);
    }

    /* ── Divider ── */
    .nb-divider {
      width: 1px; height: 20px; background: rgba(0,0,0,0.09); margin: 0 6px;
    }

    /* ── Right slot ── */
    .nb-right { display: flex; align-items: center; gap: 12px; }

    /* ── Mobile ── */
    @media (max-width: 640px) {
      .nb-inner   { padding: 0 18px; }
      .nb-link span { display: none; }
      .nb-link    { padding: 7px 10px; }
      .nb-link-cta span { display: none; }
      .nb-link-cta { padding: 8px 12px; }
      .nb-logo-text { display: none; }
    }
  `;

  return (
    <nav className="nb-nav">
      <style>{navStyles}</style>

      <div className="nb-inner">

        {/* Logo */}
        <Link href="/dashboard" className="nb-logo">
          <div className="nb-logo-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
              <path d="M8 12h8M12 8v8"/>
            </svg>
          </div>
          <span className="nb-logo-text">AI <em>Interview</em></span>
        </Link>

        {/* Nav links */}
        <div className="nb-links">
          <Link
            href="/dashboard"
            className={`nb-link${pathname === "/dashboard" ? " active" : ""}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/history"
            className={`nb-link${pathname === "/history" ? " active" : ""}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>History</span>
          </Link>

          <div className="nb-divider" />

          <Link
            href="/resume"
            className={`nb-link-cta${pathname === "/resume" ? " active" : ""}`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
            <span>Resume Interview</span>
          </Link>
        </div>

        {/* Right: user */}
        <div className="nb-right">
          <UserButton />
        </div>

      </div>
    </nav>
  );
}