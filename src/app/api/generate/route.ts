import { NextResponse } from "next/server";

import Groq from "groq-sdk";

import { prisma } from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {

  try {

    // GET CURRENT USER
    const { userId } = await auth();

    const body = await req.json();

    const {
      role,
      experience,
      techstack,
    } = body;

    const prompt = `
Generate 10 interview questions and answers.

Role: ${role}

Experience: ${experience}

Tech Stack: ${techstack}

Return ONLY valid JSON array.

Format:

[
  {
    "question":"...",
    "answer":"..."
  }
]
`;

    // AI GENERATION
    const completion =
      await client.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
      });

    // AI RESPONSE
    const responseText =
      completion.choices[0]?.message?.content || "[]";

    // PARSE JSON
    const questions =
      JSON.parse(responseText);

    // SAVE TO DATABASE
    const interview =
      await prisma.interview.create({

        data: {

          userId: userId || "unknown",

          role,

          experience,

          techstack,

          questions,
        },
      });

    // RETURN RESPONSE
    return NextResponse.json({

      success: true,

      data: questions,

      interviewId: interview.id,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate",
      },
      {
        status: 500,
      }
    );
  }
}