export const runtime = "nodejs";

import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replaceAll("{{jobTitle}}", jobPosition)
      .replaceAll("{{jobDescription}}", jobDescription)
      .replaceAll("{{duration}}", duration)
      .replaceAll("{{type}}", type);

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: FINAL_PROMPT,
    });

    console.log("GEMINI RAW RESPONSE:", response);

    
    let text =
      response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    console.log("OUTPUT TEXT:", text);

    if (!text) {
      console.log("EMPTY GEMINI RESPONSE");
      return NextResponse.json(
        { error: "Empty response from Gemini" },
        { status: 500 }
      );
    }


    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch (e) {
      console.log("FAILED TO PARSE JSON:", text);
      return NextResponse.json({ raw: text });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
