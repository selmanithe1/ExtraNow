"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateMissionStatus(id: string, status: string) {
    try {
        const updatedMission = await prisma.mission.update({
            where: { id },
            data: { status },
        });
        revalidatePath("/admin");
        return { success: true, mission: updatedMission };
    } catch (error) {
        console.error("Failed to update mission status:", error);
        return { success: false, error: "Database error" };
    }
}

export async function getStats() {
    try {
        const totalExtras = await prisma.extra.count();
        const activeMissions = await prisma.mission.count({
            where: { status: "CONFIRME" },
        });

        // Simulations pour les démos si la DB est vide
        return {
            totalExtras: totalExtras || 5248,
            activeMissions: activeMissions || 1,
            revenue: "42,850 €",
            satisfaction: "4.8/5"
        };
    } catch (error) {
        return { totalExtras: 0, activeMissions: 0, revenue: "0 €", satisfaction: "0/5" };
    }
}

export async function registerExtra(data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    birthDate: string;
    skills: string;
    experience: string;
    bio: string;
    cvUrl?: string;
    avatarUrl?: string;
    password?: string;
}) {
    try {
        const { birthDate, ...rest } = data;
        const newExtra = await prisma.extra.create({
            data: {
                ...rest,
                birthDate: birthDate ? new Date(birthDate) : null,
                status: "VERIFICATION"
            }
        });
        revalidatePath("/admin");
        return { success: true, extra: newExtra };
    } catch (error: any) {
        console.error("Registration error details:", error);

        // Detailed error for debugging
        const errorMessage = error.code === 'P2002'
            ? "Cet email est déjà utilisé. Veuillez en choisir un autre."
            : `Erreur technique lors de l'inscription : ${error.message || "Erreur inconnue"}`;

        return { success: false, error: errorMessage };
    }
}

export async function getLatestExtra() {
    try {
        const latestExtra = await prisma.extra.findFirst({
            orderBy: { createdAt: 'desc' }
        });
        return latestExtra;
    } catch (error) {
        console.error("Failed to fetch latest extra:", error);
        return null;
    }
}

export async function getAdminData() {
    try {
        const extras = await prisma.extra.findMany({
            orderBy: { createdAt: 'desc' }
        });
        const missions = await prisma.mission.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return { extras, missions };
    } catch (error) {
        console.error("Failed to fetch admin data:", error);
        return { extras: [], missions: [] };
    }
}

export async function createMission(data: {
    company: string;
    type: string;
    location: string;
    date: string;
    amount: number;
}) {
    try {
        const mission = await prisma.mission.create({
            data: {
                ...data,
                date: new Date(data.date),
                status: "EN_ATTENTE"
            }
        });
        revalidatePath("/admin");
        return { success: true, mission };
    } catch (error) {
        console.error("Failed to create mission:", error);
        return { success: false, error: "Database error" };
    }
}

export async function getAvailableMissions() {
    try {
        const missions = await prisma.mission.findMany({
            where: {
                status: "EN_ATTENTE"
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return missions;
    } catch (error) {
        console.error("Failed to fetch available missions:", error);
        return [];
    }
}
