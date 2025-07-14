import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
    const { id: teamId, taskId } = params;
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

        // Check that the task exists and belongs to the team
        const task = await prisma.task.findFirst({
            where: { id: taskId, teamId: teamId },
        });
        if (!task) {
            return NextResponse.json({ error: "Task not found or does not belong to this team" }, { status: 404 });
        }

        const { title, status } = await request.json();

        if (!title || !status) {
            return NextResponse.json({ error: "Title and status are required" }, { status: 400 });
        }

        // Update the task
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: {
                title,
                status,
                // teamId, // Only include if you want to allow moving tasks between teams
            },
        });

        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id: teamId, taskId } = params;
    try {
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
        // Check that the task exists and belongs to the team
        const task = await prisma.task.findFirst({
            where: { id: taskId, teamId: teamId },
        });
        if (!task) {
            return NextResponse.json({ error: "Task not found or does not belong to this team" }, { status: 404 });
        }
        await prisma.task.delete({ where: { id: taskId } });
        return NextResponse.json({ message: "Task deleted" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}