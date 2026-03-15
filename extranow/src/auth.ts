import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = "admin@extranow.fr";
const ADMIN_PASSWORD = "admin123";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email as string;
                const password = credentials?.password as string;

                if (!email || !password) return null;

                // 1. Check Admin
                if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                    return {
                        id: "admin",
                        email: ADMIN_EMAIL,
                        name: "Administrateur ExtraNow",
                        role: "ADMIN",
                    };
                }

                // 2. Check Client (Entreprise)
                try {
                    const client = await prisma.user.findUnique({ where: { email, role: "CLIENT" } });
                    if (client && client.password) {
                        const passwordMatch = await bcrypt.compare(password, client.password);
                        if (passwordMatch) {
                            return {
                                id: client.id,
                                email: client.email,
                                name: client.name || client.companyName,
                                role: "CLIENT",
                                clientId: client.id,
                            };
                        }
                    }
                } catch (error) {
                    console.error("Client Auth error:", error);
                }

                // 3. Check Extra
                try {
                    const extra = await prisma.extra.findUnique({ where: { email } });
                    if (extra) {
                        let passwordMatch = false;
                        if (extra.password) {
                            const isBcrypt = extra.password.startsWith("$2");
                            if (isBcrypt) {
                                passwordMatch = await bcrypt.compare(password, extra.password);
                            } else {
                                passwordMatch = extra.password === password;
                            }
                        } else {
                            // Aucun password en DB → accès libre (compte legacy)
                            passwordMatch = true;
                        }

                        if (passwordMatch) {
                            return {
                                id: extra.id,
                                email: extra.email,
                                name: extra.name,
                                role: "EXTRA",
                                extraId: extra.id,
                            };
                        }
                    }
                } catch (error) {
                    console.error("Auth error:", error);
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.extraId = (user as any).extraId;
                token.clientId = (user as any).clientId;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).extraId = token.extraId;
                (session.user as any).clientId = token.clientId;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login", // défaut — le middleware gère la redirection spécifique
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 heures
    },
    secret: process.env.NEXTAUTH_SECRET,
});
