import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request, { params }) {
    const { id } = await params;

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
            where: { id, userId: user.id },
            include: { tasks: true },
        });

        if (!team) {
            return NextResponse.json(
                { error: "Team not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(team, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch team" },
            { status: 500 },
        );
    }
}

export async function DELETE(request, { params }) {
    const { id } = await params;

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
            where: { id, userId: user.id },
        });

        if (!team) {
            return NextResponse.json(
                { error: "Team not found" },
                { status: 404 },
            );
        }

        // Delete all tasks belonging to this team first (cascade)
        await prisma.task.deleteMany({ where: { teamId: id } });
        await prisma.team.delete({ where: { id } });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to delete team" },
            { status: 500 },
        );
    }
}
