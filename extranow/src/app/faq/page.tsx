"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
    const faqs = [
        { q: "Comment s'inscrire en tant qu'entreprise ?", a: "Créez un compte en 2 minutes, vérifiez votre SIRET et commencez à poster vos missions immédiatement." },
        { q: "Quelles sont les conditions pour être Extra ?", a: "Vous devez avoir une expérience en restauration et réussir notre test de qualification en ligne." },
        { q: "Comment sont fixés les tarifs ?", a: "Les tarifs sont libres, fixés par l'entreprise ou négociés selon la rareté du profil." },
        { q: "Est-ce que je suis assuré ?", a: "Oui, chaque mission effectuée via ExtraNow bénéficie d'une assurance RC professionnelle incluse." },
    ];

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

            <main className="max-w-4xl mx-auto px-6 py-20">
                <div className="flex items-center gap-6 mb-16">
                    <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-500 shadow-sm">
                        <HelpCircle size={36} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight">FAQ</h1>
                        <p className="text-xl text-slate-400 font-bold uppercase tracking-widest mt-2 text-sm italic">Questions Fréquentes</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 group hover:border-orange-200 transition-all cursor-pointer"
                        >
                            <div className="flex items-center justify-between gap-6">
                                <h3 className="text-xl font-black text-slate-900">{faq.q}</h3>
                                <ChevronRight className="text-slate-300 group-hover:text-orange-500 transition-colors shrink-0" size={24} />
                            </div>
                            <p className="mt-4 text-slate-500 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-all h-0 group-hover:h-auto overflow-hidden">
                                {faq.a}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 p-12 bg-orange-50 rounded-[2.5rem] border border-orange-100 text-center">
                    <p className="text-lg font-bold text-slate-900 mb-6">Vous ne trouvez pas votre réponse ?</p>
                    <button className="text-orange-500 font-black flex items-center gap-2 mx-auto hover:gap-4 transition-all uppercase tracking-widest text-sm">
                        Contacter le support <ChevronRight size={18} />
                    </button>
                </div>
            </main>
        </div>
    );
}
