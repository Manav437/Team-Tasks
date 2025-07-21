import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request, { params }) {
    const { id: teamId } = await params;
    try {
        // Get the current session and user
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check that the team exists and belongs to the user
        const team = await prisma.team.findFirst({
            where: { id: teamId, userId: user.id },
        });
        if (!team) {
            return NextResponse.json({ error: "Team not found or not owned by user" }, { status: 404 });
        }

        const { title, status, description } = await request.json();

        if (!title || !status || !description) {
            return NextResponse.json({ error: "Title, status, description are required" }, { status: 400 });
        }

        // Create the new task and link to the team
        const newTask = await prisma.task.create({
            data: {
                title,
                status,
                teamId,
                description
            },
        });

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
    }
}