"use client";

import { motion } from "framer-motion";
import { Building2, CheckCircle2, Users, Rocket } from "lucide-react";
import Link from "next/link";

export default function EntreprisesPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Simple Header for navigation back */}
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
                        Solutions pour les <span className="text-orange-500 italic">Entreprises</span>
                    </motion.h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                        Trouvez les meilleurs extras pour votre établissement en quelques clics. Qualification garantie.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Recrutement Rapide",
                            desc: "Postez votre besoin et recevez des propositions en moins de 24h.",
                            icon: Rocket
                        },
                        {
                            title: "Profils Vérifiés",
                            desc: "Tous nos extras passent un test de compétences rigoureux.",
                            icon: CheckCircle2
                        },
                        {
                            title: "Gestion Simplifiée",
                            desc: "Facturation, contrats et paiements centralisés sur une seule interface.",
                            icon: Building2
                        }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-orange-200 transition-all group"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 mb-8 shadow-sm group-hover:scale-110 transition-transform">
                                <feature.icon size={32} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4">{feature.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 bg-[#101e33] rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px]" />
                    <h2 className="text-4xl font-black mb-6 relative z-10">Prêt à booster votre service ?</h2>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-5 rounded-2xl transition-all shadow-xl shadow-orange-500/20 active:scale-95 text-lg relative z-10">
                        DÉPOSER UNE ANNONCE
                    </button>
                </div>
            </main>
        </div>
    );
}
