import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { nextUrl, auth: session } = req;
    const isLoggedIn = !!session?.user;
    const role = (session?.user as any)?.role;
    const pathname = nextUrl.pathname;

    // Redirection si admin tente d'accéder à /admin sans être authentifié en tant qu'ADMIN
    if (pathname.startsWith("/admin")) {
        if (!session || role !== "ADMIN") {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }
    }

    // ── Protection Extra (pages privées seulement) ─────────────────
    const privateExtraRoutes = [
        "/extras/dashboard",
        "/extras/missions",
        "/extras/skills",
        "/extras/messages",
        "/extras/settings",
        "/extras/partners",
        "/extras/defi",
    ];

    const isPrivateExtra = privateExtraRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isPrivateExtra) {
        if (!isLoggedIn || role !== "EXTRA") {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }
    }

    // ── Protection Entreprise (Dashboard) ──────────────────────────
    if (pathname.startsWith("/entreprises/dashboard")) {
        if (!isLoggedIn || role !== "CLIENT") {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/admin/:path*",
        "/extras/dashboard/:path*",
        "/extras/missions/:path*",
        "/extras/skills/:path*",
        "/extras/messages/:path*",
        "/extras/settings/:path*",
        "/extras/partners/:path*",
        "/extras/defi/:path*",
        "/entreprises/dashboard/:path*",
    ],
};
