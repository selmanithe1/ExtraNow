"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Zap, Star, ShieldCheck, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DefiPage() {
    const rewards = [
        { title: "+15% Boost", desc: "Augmentation immédiate sur vos 3 prochaines missions.", icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
        { title: "Badge Expert", desc: "Un badge brillant visible par tous les recruteurs.", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
        { title: "Priorité Top", desc: "Accès aux missions 1h avant les autres candidats.", icon: Star, color: "text-blue-500", bg: "bg-blue-50" },
    ];

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <Link
                href="/extras/dashboard"
                className="inline-flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-900 transition-all mb-10"
            >
                <ArrowLeft size={16} /> Retour au Dashboard
            </Link>

            <div className="space-y-12">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-orange-500 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-orange-500/20 text-center"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20" />
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center mx-auto mb-8"
                    >
                        <Trophy size={48} strokeWidth={2.5} />
                    </motion.div>
                    <h1 className="text-5xl font-black italic tracking-tight mb-4 uppercase">Le Défi de la <span className="text-orange-200">Semaine</span></h1>
                    <p className="text-xl text-orange-100 font-medium max-w-xl mx-auto leading-relaxed">
                        Chaque semaine, relevez un nouveau challenge pour prouver votre expertise et booster vos gains.
                    </p>
                </motion.div>

                {/* Concept Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 italic mb-2">Comment ça marche ?</h2>
                            <p className="text-slate-500 font-medium">Simple, efficace et gratifiant.</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { step: "01", text: "Inscrivez-vous au défi hebdomadaire d'un clic." },
                                { step: "02", text: "Réalisez les objectifs fixés (ex: 3 missions Expert)." },
                                { step: "03", text: "Validez vos missions et encaissez vos bonus." },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-6">
                                    <span className="text-3xl font-black text-slate-100 italic">{item.step}</span>
                                    <p className="font-bold text-slate-700">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0f172a] rounded-[3rem] p-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 blur-[60px]" />
                        <h2 className="text-2xl font-black italic mb-8">Objectif Actuel</h2>
                        <div className="space-y-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <p className="text-white/40 font-black uppercase tracking-widest text-[10px] mb-2 font-bold">La Mission</p>
                                <p className="text-lg font-black text-orange-400">Réalisez 3 missions notées 5⭐ pour débloquer votre statut Expert.</p>
                            </div>
                            <div className="pt-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">
                                    <span>Progression</span>
                                    <span>1 / 3</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "33%" }}
                                        className="h-full bg-orange-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rewards */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-black text-slate-900 italic text-center">Les <span className="text-orange-500">Récompenses</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {rewards.map((reward, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center group"
                            >
                                <div className={`w-16 h-16 ${reward.bg} ${reward.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110`}>
                                    <reward.icon size={32} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">{reward.title}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{reward.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center pt-10">
                    <button className="bg-slate-900 text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-orange-500 transition-all shadow-2xl shadow-slate-900/20 active:scale-95 group">
                        Accepter le Défi
                        <ChevronRight className="inline-block ml-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-6 italic">Expiré dans : 4 jours, 12 heures</p>
                </div>
            </div>
        </div>
    );
}
