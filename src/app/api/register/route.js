import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 },
            );
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existing = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });
        if (existing) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 400 },
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email: normalizedEmail,
                password: hashedPassword,
            },
            select: {
                id: true,
                // name: true,
                email: true,
            },
        });

        return NextResponse.json(
            { message: "User registered", user },
            { status: 201 },
        );
    } catch (err) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
