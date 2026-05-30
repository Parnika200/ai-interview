import { NextResponse } from "next/server";

import Groq from "groq-sdk";

import { prisma } from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(
  req: Request
) {

  try {

    // LOAD PDF PARSER
    const pdfParse =
      require("pdf-parse-fork");

    const { userId } =
      await auth();

    const formData =
      await req.formData();

    const file =
      formData.get(
        "resume"
      ) as File;

    if (!file) {

      return NextResponse.json(
        {
          success: false,
          error:
            "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    // FILE BUFFER
    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    // PDF TEXT EXTRACTION
    const pdfData =
      await pdfParse(buffer);

    const resumeText =
      pdfData.text;

    // AI PROMPT
    const prompt = `
You are an AI interviewer.

Read this resume:

${resumeText}

Generate 10 personalized interview questions and answers.

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

        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
      });

    const responseText =
      completion.choices[0]
        ?.message?.content || "[]";

    const questions =
      JSON.parse(responseText);

    // SAVE TO DATABASE
    const interview =
      await prisma.interview.create({

        data: {

          userId:
            userId || "unknown",

          role:
            "Resume Interview",

          experience:
            "Resume Based",

          techstack:
            "AI Generated",

          questions,
        },
      });

    return NextResponse.json({

      success: true,

      questions,

      interviewId:
        interview.id,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to process resume",
      },
      {
        status: 500,
      }
    );
  }
}