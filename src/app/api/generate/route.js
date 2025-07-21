import { NextResponse } from "next/server";
import { generateSummary } from "@/lib/gemini-helper";

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        const summary = await generateSummary(prompt);

        return NextResponse.json({ summary });
    } catch (err) {
        console.error("AI Route Error:", err);
        return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
    }
}
