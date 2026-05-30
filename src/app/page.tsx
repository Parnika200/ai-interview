"use client";

import Link from "next/link";
import {
  Brain,
  Mic,
  FileText,
  Trophy,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* GLOBAL THEME STYLE */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Mulish:wght@300;400;500;600&display=swap');

        :root {
          --bg-base: #f7f5f1;
          --bg-card: #ffffff;
          --bg-accent: #eef3ff;
          --border: rgba(0,0,0,0.08);
          --ink: #1a1a2e;
          --ink-secondary: #5c5c72;
          --blue: #3b63d2;
          --blue-dim: rgba(59,99,210,0.09);
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
          --shadow-md: 0 6px 20px rgba(0,0,0,0.08);
          --radius: 16px;
          --font-display: 'Playfair Display', serif;
          --font-body: 'Mulish', sans-serif;
        }

        body {
          background: var(--bg-base);
          font-family: var(--font-body);
          color: var(--ink);
        }
      `}</style>

      <main className="min-h-screen">

        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold">
              AI Interview
            </h1>

            <div className="flex items-center gap-4">
              <Link href="/sign-in" className="text-gray-700 hover:text-black">
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl bg-black px-5 py-2 text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="mx-auto max-w-7xl px-6 py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2 text-sm shadow-sm">
            🚀 AI Powered Interview Practice
          </div>

          <h1 className="mt-10 text-6xl font-bold leading-tight font-serif">
            Crack Your Next
            <span className="block text-blue-600">
              Tech Interview
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Generate personalized interviews, upload resumes,
            practice with voice, and receive AI feedback instantly.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/sign-up"
              className="rounded-xl bg-black px-6 py-4 text-white shadow-md"
            >
              Start Free
            </Link>

            <Link
              href="/sign-in"
              className="rounded-xl border bg-white px-6 py-4 shadow-sm"
            >
              Watch Demo
            </Link>
          </div>
        </section>

        {/* STATS */}
        <section className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
          {[
            ["5000+", "Interviews"],
            ["1000+", "Users"],
            ["95%", "Success Rate"],
            ["24/7", "AI Available"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-3xl font-bold text-blue-600">
                {value}
              </h2>
              <p className="text-gray-600">{label}</p>
            </div>
          ))}
        </section>

        {/* FEATURES */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="mb-12 text-center text-5xl font-bold font-serif">
            Powerful Features
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              [Brain, "AI Questions", "Personalized interview questions based on your role."],
              [Mic, "Voice Interviews", "Answer like a real interview environment."],
              [FileText, "Resume Analysis", "Generate tailored interview questions."],
              [BarChart3, "Analytics", "Track your interview progress."],
              [Trophy, "AI Evaluation", "Get scoring and feedback instantly."],
              [Sparkles, "Difficulty Levels", "Easy, Medium, Hard interviews."],
            ].map(([Icon, title, desc]: any) => (
              <div
                key={title}
                className="rounded-3xl border bg-white p-8 shadow-sm hover:shadow-md transition"
              >
                <Icon size={38} className="text-blue-600" />
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-16 text-center text-5xl font-bold font-serif">
              How It Works
            </h2>

            <div className="grid gap-8 md:grid-cols-4">
              {[
                "Choose Role",
                "Generate Questions",
                "Take Interview",
                "Get Feedback",
              ].map((step, i) => (
                <div
                  key={step}
                  className="rounded-2xl border bg-white p-8 text-center shadow-sm hover:shadow-md"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-medium">{step}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="mb-12 text-center text-5xl font-bold font-serif">
            Loved By Developers
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              "Helped me crack my React interview.",
              "Resume interview feature is amazing.",
              "Feels like a real interview.",
            ].map((text) => (
              <div
                key={text}
                className="rounded-3xl border bg-white p-8 shadow-sm hover:shadow-md"
              >
                ⭐⭐⭐⭐⭐
                <p className="mt-4 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black py-28 text-center text-white">
          <h2 className="text-5xl font-bold font-serif">
            Ready To Get Hired?
          </h2>

          <p className="mt-6 text-gray-300">
            Start practicing interviews today.
          </p>

          <Link
            href="/sign-up"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 text-black"
          >
            Start Free
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="border-t py-8 text-center text-gray-500">
          © 2026 AI Interview Platform
        </footer>
      </main>
    </>
  );
}