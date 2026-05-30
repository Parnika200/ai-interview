import { NextResponse } from "next/server";

import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      question,
      userAnswer,
    } = body;

    const prompt = `
You are an AI interviewer.

Evaluate the candidate answer.

Interview Question:
${question}

Candidate Answer:
${userAnswer}

Give response in this JSON format only:

{
  "score": "8/10",
  "technical": "...",
  "communication": "...",
  "improvement": "..."
}
`;

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

        temperature: 0.5,
      });

    const responseText =
      completion.choices[0]
        ?.message?.content || "{}";

    const feedback =
      JSON.parse(responseText);

    return NextResponse.json({

      success: true,

      feedback,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to generate feedback",
      },
      {
        status: 500,
      }
    );
  }
}