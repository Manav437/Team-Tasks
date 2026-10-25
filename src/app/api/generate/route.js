import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generateSummary } from "@/lib/gemini-helper";
import { checkAiRateLimit } from "@/lib/ai-rate-limit";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const rateLimit = await checkAiRateLimit(session.user.email.toLowerCase());
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: "Too many summaries. Please try again in a minute." },
                { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } },
            );
        }

        let body;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const prompt = body?.prompt;
        if (typeof prompt !== "string" || !prompt.trim() || prompt.length > 20_000) {
            return NextResponse.json(
                { error: "Prompt must contain between 1 and 20,000 characters." },
                { status: 400 },
            );
        }

        const summary = await generateSummary(prompt.trim());
        return NextResponse.json({ summary });
    } catch (err) {
        console.error("AI Route Error:", err);
        return NextResponse.json(
            { error: "Failed to generate summary" },
            { status: 500 },
        );
    }
}
