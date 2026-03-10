"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Admin credentials (in production, use a proper secrets manager)
const ADMIN_EMAIL = "admin@extranow.fr";
const ADMIN_PASSWORD = "admin123";

export async function adminLogin(email: string, password: string) {
    try {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Ensure admin exists in DB
            const admin = await prisma.user.upsert({
                where: { email: ADMIN_EMAIL },
                update: {},
                create: {
                    email: ADMIN_EMAIL,
                    name: "Administrateur ExtraNow",
                    role: "ADMIN",
                },
            });
            return { success: true, admin };
        }
        return { success: false, error: "Identifiants incorrects. Utilisez admin@extranow.fr / admin123" };
    } catch (error) {
        console.error("Admin login error:", error);
        return { success: false, error: "Erreur technique lors de la connexion." };
    }
}


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
        const pendingMissions = await prisma.mission.count({
            where: { status: "EN_ATTENTE" },
        });

        // Simulations dynamiques (mix de réel et demo)
        return {
            totalExtras: (totalExtras || 0) + 5248,
            activeMissions: activeMissions || 1,
            pendingMissions: pendingMissions || 4,
            revenue: `${(activeMissions * 150 + 42850).toLocaleString()} €`,
            satisfaction: "4.9/5"
        };
    } catch (error) {
        return { totalExtras: 5248, activeMissions: 1, pendingMissions: 4, revenue: "42,850 €", satisfaction: "4.8/5" };
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

export async function loginExtra(email: string, password?: string) {
    try {
        // Find extra by email
        const extra = await prisma.extra.findUnique({
            where: { email }
        });

        if (!extra) {
            return { success: false, error: "Aucun compte trouvé avec cet email." };
        }

        // Check password if it exists (in a real app, use bcrypt)
        if (extra.password && extra.password !== password) {
            return { success: false, error: "Mot de passe incorrect." };
        }

        return { success: true, extra };
    } catch (error: any) {
        console.error("Login error:", error);
        return { success: false, error: "Erreur technique lors de la connexion." };
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

export async function applyToMission(missionId: string) {
    try {
        const extra = await getLatestExtra();
        if (!extra) return { success: false, error: "No extra found" };

        const application = await prisma.application.create({
            data: {
                missionId,
                extraId: extra.id,
                status: "PENDING"
            }
        });

        revalidatePath("/admin");
        return { success: true, application };
    } catch (error) {
        console.error("Failed to apply to mission:", error);
        return { success: false, error: "Database error" };
    }
}

export async function getSkillsTests() {
    try {
        const tests = await prisma.skillTest.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // Data de démo si vide
        if (!tests || tests.length === 0) {
            return [
                {
                    id: "demo-1",
                    title: "Service en Salle (Niveau 1)",
                    category: "Service",
                    description: "Testez vos connaissances sur l'accueil client, la mise en place et le service des boissons.",
                    questions: JSON.stringify([
                        { q: "De quel côté doit-on servir les boissons à un client ?", a: ["À gauche", "À droite", "Peu importe"], c: 1 },
                        { q: "Où se place le couteau de table lors de la mise en place ?", a: ["À gauche de l'assiette", "À droite, tranchant vers l'extérieur", "À droite, tranchant vers l'assiette"], c: 2 },
                        { q: "Quel est l'ordre de service traditionnel ?", a: ["Hôte en premier", "Femmes, personnes âgées, hommes, puis l'hôte", "Par ordre d'arrivée"], c: 1 },
                        { q: "Où se place l'assiette à pain ?", a: ["À gauche de la fourchette", "À droite du couteau", "En haut de l'assiette"], c: 0 },
                        { q: "Que signifie 'carafer' un vin ?", a: ["Le mettre au frais", "Le transvaser pour l'aérer", "Le servir très vite"], c: 1 },
                        { q: "Comment réagir face à un client mécontent ?", a: ["L'ignorer", "Argumenter", "Écouter calmement et proposer une solution"], c: 2 },
                        { q: "Quel verre est placé le plus à droite ?", a: ["Le verre à eau", "Le verre à vin blanc", "La flûte à champagne"], c: 1 },
                        { q: "De quel côté débarrasse-t-on les assiettes ?", a: ["À droite", "À gauche", "De n'importe quel côté"], c: 0 },
                        { q: "Comment porte-t-on un plateau chargé ?", a: ["À deux mains", "Sur la paume de la main, bras plié", "Contre la hanche"], c: 1 },
                        { q: "Que doit-on faire si on casse un verre en salle ?", a: ["Le ramasser à la main", "Sécuriser la zone, balayer et passer la serpillière", "Attendre la fin du service"], c: 1 }
                    ])
                },
                {
                    id: "demo-2",
                    title: "Cuisine & Hygiène (HACCP)",
                    category: "Cuisine",
                    description: "Les bases indispensables de la sécurité alimentaire et de l'organisation en cuisine.",
                    questions: JSON.stringify([
                        { q: "Quelle est la zone de température critique où les bactéries se développent le plus vite ?", a: ["Entre -18°C et 0°C", "Entre +10°C et +63°C", "Entre +70°C et +100°C"], c: 1 },
                        { q: "Que signifie le concept de 'Marche en avant' ?", a: ["Toujours cuisiner vite", "Non-croisement des produits propres et des déchets", "Rangement des stocks par date"], c: 1 },
                        { q: "À quelle température doit être conservé un réfrigérateur de produits frais ?", a: ["Entre 0°C et 4°C", "Entre 5°C et 10°C", "Peu importe"], c: 0 },
                        { q: "Quelle couleur de planche utilise-t-on pour la viande crue ?", a: ["Verte", "Bleue", "Rouge"], c: 2 },
                        { q: "Comment décongeler un aliment en toute sécurité ?", a: ["À l'air libre", "Au réfrigérateur", "Sous l'eau chaude"], c: 1 },
                        { q: "Le lavage des mains est obligatoire après :", a: ["Avoir touché son téléphone", "Être allé aux toilettes", "Les deux"], c: 2 },
                        { q: "Que signifie DLC ?", a: ["Date Limite de Consommation", "Date Liquide de Conservation", "Délai de Livraison Client"], c: 0 },
                        { q: "Quelle est la température de cuisson à cœur minimum pour une volaille ?", a: ["55°C", "65°C", "75°C"], c: 2 },
                        { q: "Quelle tenue est obligatoire en cuisine ?", a: ["T-shirt et short", "Veste de cuisine, pantalon, calot et chaussures de sécurité", "Tablier par-dessus ses vêtements"], c: 1 },
                        { q: "Combien de temps maximum un plat peut-il rester en zone tempérée avant service ?", a: ["30 minutes", "2 heures", "5 heures"], c: 1 }
                    ])
                }
            ];
        }
        return tests;
    } catch (error) {
        return [];
    }
}

export async function submitTestResult(data: { extraId: string; testId: string; score: number; passed: boolean }) {
    try {
        const result = await prisma.testResult.create({
            data
        });
        revalidatePath("/extras/skills");
        revalidatePath("/admin");
        return { success: true, result };
    } catch (error) {
        return { success: false, error: "Database error" };
    }
}

export async function updateSkillTest(id: string, data: any) {
    try {
        // Validation simple du JSON questions si présent
        if (data.questions && typeof data.questions !== 'string') {
            data.questions = JSON.stringify(data.questions);
        }

        const test = await prisma.skillTest.upsert({
            where: { id },
            update: data,
            create: { ...data, id: id.startsWith('demo') ? undefined : id }
        });
        revalidatePath("/admin");
        return { success: true, test };
    } catch (error) {
        console.error("Update skill test error:", error);
        return { success: false, error: "Database error" };
    }
}

export async function getAllTestResults() {
    try {
        const results = await prisma.testResult.findMany({
            include: {
                extra: true,
                test: true
            },
            orderBy: { createdAt: 'desc' }
        });
        return results;
    } catch (error) {
        return [];
    }
}
