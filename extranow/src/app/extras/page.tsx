"use client";

import { motion } from "framer-motion";
import { Star, Zap, ShieldCheck, Wallet } from "lucide-react";
import Link from "next/link";

export default function ExtrasPage() {
    return (
        <div className="min-h-screen bg-white">
            <nav className="h-20 border-b border-slate-100 flex items-center justify-between px-10">
                <Link href="/" className="text-2xl font-black text-slate-900">
                    Extra<span className="text-orange-500">Now</span>
                </Link>
                <Link href="/" className="text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors">
                    Retour à l'accueil
                </Link>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        Devenez un <span className="text-orange-500 italic">Extra Hero</span>
                    </motion.h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                        Travaillez quand vous voulez, où vous voulez. Les meilleures missions de restauration sont ici.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[
                        {
                            title: "Liberté Totale",
                            desc: "Choisissez vos créneaux et vos établissements préférés. Aucune contrainte.",
                            icon: Zap,
                            color: "text-orange-500"
                        },
                        {
                            title: "Paiements Rapides",
                            desc: "Recevez votre rémunération directement sur votre compte juste après la mission.",
                            icon: Wallet,
                            color: "text-emerald-500"
                        },
                        {
                            title: "Profil Certifié",
                            desc: "Valorisez vos compétences et devenez un extra Premium sollicité par les grands chefs.",
                            icon: Star,
                            color: "text-yellow-500"
                        },
                        {
                            title: "Assurance Incluse",
                            desc: "Travaillez en toute sécurité. Toutes vos missions sont assurées par AXA.",
                            icon: ShieldCheck,
                            color: "text-blue-500"
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-50 p-10 rounded-[2.5rem] flex items-start gap-8 border border-slate-100 hover:border-slate-200 transition-all"
                        >
                            <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center ${item.color} shadow-sm shrink-0`}>
                                <item.icon size={32} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link
                        href="/extras/register"
                        className="inline-block bg-[#101e33] hover:bg-slate-800 text-white font-black px-12 py-6 rounded-3xl transition-all shadow-2xl active:scale-95 text-xl tracking-wide uppercase"
                    >
                        S'inscrire en tant qu'Extra
                    </Link>
                </div>
            </main>
        </div>
    );
}
