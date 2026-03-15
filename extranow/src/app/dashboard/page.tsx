import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardRouter() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const role = (session.user as any).role;

    if (role === "ADMIN") {
        redirect("/admin");
    } else if (role === "CLIENT") {
        redirect("/entreprises/dashboard");
    } else if (role === "EXTRA") {
        redirect("/extras/dashboard");
    } else {
        // Fallback
        redirect("/login");
    }
}
