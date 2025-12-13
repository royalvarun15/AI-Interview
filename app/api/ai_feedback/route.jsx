export const runtime = "nodejs";

import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );

    console.log("FINAL_PROMPT:", FINAL_PROMPT);

  
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: FINAL_PROMPT,
    });

    const text = response.output_text;

    console.log("GEMINI OUTPUT:", text);

    return NextResponse.json({ feedback: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
