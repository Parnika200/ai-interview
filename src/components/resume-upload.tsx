"use client";

import { useState } from "react";

export default function ResumeUpload() {

  const [file,
    setFile] =
    useState<File | null>(null);

  const [loading,
    setLoading] =
    useState(false);

  const handleUpload =
    async () => {

      if (!file) return;

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "resume",
          file
        );

        const response =
          await fetch(
            "/api/resume",
            {
              method: "POST",
              body: formData,
            }
          );

        const data =
          await response.json();

        console.log(data);

        if (data.success) {

          localStorage.setItem(
            "questions",
            JSON.stringify(
              data.questions
            )
          );

          window.location.href =
            `/interview/${data.interviewId}`;
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-5">

      <div>

        <h2 className="text-2xl font-bold">

          Upload Resume

        </h2>

        <p className="text-gray-600">

          Generate AI interview questions from your resume

        </p>

      </div>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {

          const selected =
            e.target.files?.[0];

          if (selected) {

            setFile(selected);
          }
        }}
      />

      <button
        onClick={handleUpload}
        className="rounded-lg bg-black px-5 py-2 text-white"
      >
        {loading
          ? "Analyzing Resume..."
          : "Upload Resume"}
      </button>

    </div>
  );
}