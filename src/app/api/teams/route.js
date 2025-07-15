// app/api/teams/route.js
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        const teams = await prisma.team.findMany({
            where: { userId: user.id },
            include: { tasks: true },
        });

        return new Response(JSON.stringify(teams || []), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to fetch teams" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        const body = await request.json();
        const { name, tasks } = body;

        if (!name) {
            return new Response(JSON.stringify({ error: "Missing team name" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Create the team for the current user
        const team = await prisma.team.create({
            data: { name, userId: user.id },
        });

        // If tasks are provided, create them and link to the team
        if (Array.isArray(tasks) && tasks.length > 0) {
            for (const task of tasks) {
                await prisma.task.create({
                    data: {
                        title: task.title,
                        description: task.description || "",
                        status: task.status || "todo",
                        dueDate: task.dueDate ? new Date(task.dueDate) : null,
                        assigneeId: task.assigneeId || null,
                        teamId: team.id,
                    },
                });
            }
        }

        // Fetch the team with its tasks
        const teamWithTasks = await prisma.team.findUnique({
            where: { id: team.id },
            include: { tasks: true },
        });

        return new Response(JSON.stringify(teamWithTasks), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to add team" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}