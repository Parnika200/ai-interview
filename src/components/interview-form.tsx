"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InterviewForm() {

  const router = useRouter();

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [techstack, setTechstack] = useState("");

  const [difficulty, setDifficulty] =
    useState("Medium");

  const [loading, setLoading] =
    useState(false);

  const handleGenerate = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "/api/generate",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            role,
            experience,
            techstack,
            difficulty,
          }),
        }
      );

      const data =
        await response.json();

      localStorage.setItem(
        "questions",
        JSON.stringify(data.data)
      );

      const interviewId =
        data.interviewId;

      router.push(
        `/interview/${interviewId}`
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div className="grid gap-4">

        <input
          type="text"
          placeholder="Frontend Developer"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="rounded-xl border p-3"
        />

        <input
          type="text"
          placeholder="2 Years Experience"
          value={experience}
          onChange={(e) =>
            setExperience(
              e.target.value
            )
          }
          className="rounded-xl border p-3"
        />

        <input
          type="text"
          placeholder="React, Next.js, TypeScript"
          value={techstack}
          onChange={(e) =>
            setTechstack(
              e.target.value
            )
          }
          className="rounded-xl border p-3"
        />

        {/* Difficulty */}

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(
              e.target.value
            )
          }
          className="rounded-xl border p-3"
        >
          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>
        </select>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-xl bg-black p-3 text-white"
        >
          {loading
            ? "Generating..."
            : "Start Interview"}
        </button>

      </div>

    </div>
  );
}