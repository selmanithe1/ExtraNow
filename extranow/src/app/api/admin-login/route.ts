import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = "admin@extranow.fr";
const ADMIN_PASSWORD = "admin123";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            return NextResponse.json({
                success: true,
                admin: { email: ADMIN_EMAIL, name: "Administrateur ExtraNow", role: "ADMIN" }
            });
        }
        return NextResponse.json({ success: false, error: "Identifiants incorrects." });
    } catch {
        return NextResponse.json({ success: false, error: "Erreur serveur." }, { status: 500 });
    }
}
