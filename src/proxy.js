import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function proxy(req) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
    });
    const { pathname } = req.nextUrl;

    if (token && pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/teams", req.url));
    }

    if (!token && pathname.startsWith("/teams")) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth/:path*", "/teams/:path*"],
};
