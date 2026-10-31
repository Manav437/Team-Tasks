import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { parseDueDate } from "@/utils/due-date.mjs";

export async function POST(request, { params }) {
    const { id: teamId } = await params;
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }

        const team = await prisma.team.findFirst({
            where: { id: teamId, userId: user.id },
        });
        if (!team) {
            return NextResponse.json(
                { error: "Team not found or not owned by user" },
                { status: 404 },
            );
        }

        const { title, status, description, dueDate } = await request.json();
        let parsedDueDate;
        try {
            parsedDueDate = dueDate === undefined ? undefined : parseDueDate(dueDate);
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        if (!title || !status) {
            return NextResponse.json(
                { error: "Title and status are required" },
                { status: 400 },
            );
        }

        const newTask = await prisma.task.create({
            data: {
                title,
                status,
                teamId,
                description,
                dueDate: parsedDueDate,
            },
        });

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to add task" },
            { status: 500 },
        );
    }
}
