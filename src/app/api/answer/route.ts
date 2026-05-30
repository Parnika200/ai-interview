import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,

  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { question } = body;

    const completion =
      await client.chat.completions.create({

        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "user",

            content: `
Give a professional interview answer for:

"${question}"

Rules:
- Keep answer concise
- Beginner friendly
- Technical but simple
- Around 100-150 words
`,
          },
        ],
      });

    const answer =
      completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      answer,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        answer: "",
      },
      {
        status: 500,
      }
    );
  }
}