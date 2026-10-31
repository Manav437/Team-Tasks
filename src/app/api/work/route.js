import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { buildWorkOverview, getWorkWindow } from "@/utils/work-overview.mjs";

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const today = new URL(request.url).searchParams.get("today");
        let window;
        try {
            window = getWorkWindow(today);
        } catch {
            return NextResponse.json({ error: "A valid local date in YYYY-MM-DD format is required" }, { status: 400 });
        }
        const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const where = { status: { not: "Completed" }, team: { is: { userId: user.id } } };
        const [activeTasks, tasks] = await Promise.all([
            prisma.task.count({ where }),
            prisma.task.findMany({
                where: { ...where, dueDate: { not: null, lt: window.before } },
                select: { id: true, title: true, status: true, dueDate: true, team: { select: { id: true, name: true } } },
            }),
        ]);
        return NextResponse.json({ activeTasks, ...buildWorkOverview(tasks, today) }, { headers: { "Cache-Control": "private, no-store" } });
    } catch (error) {
        console.error("Work overview error:", error);
        return NextResponse.json({ error: "Couldn’t load your tasks. Please try again." }, { status: 500 });
    }
}
