"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Building2, CheckCircle2, Users, Rocket, X, Send, MapPin, Calendar, DollarSign, Briefcase } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createMission } from "@/app/actions";
import { HOSPITALITY_ROLES } from "@/app/data";

export default function EntreprisesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        company: "",
        type: "",
        location: "",
        date: "",
        amount: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await createMission({
            ...formData,
            amount: parseFloat(formData.amount)
        });
        if (result.success) {
            setIsSuccess(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setIsSuccess(false);
                setFormData({ company: "", type: "", location: "", date: "", amount: "" });
            }, 3000);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.03] pointer-events-none" />

            {/* Navigation */}
            <header className="fixed top-0 z-50 w-full glass border-b border-border/50">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <Link href="/" className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white rotate-3">E</div>
                        <span className="font-outfit italic">Extra<span className="text-accent italic">Now</span></span>
                    </Link>
                    <Link href="/" className="text-xs font-black text-foreground/50 hover:text-accent transition-all uppercase tracking-[0.2em] font-outfit">
                        Retour à l'accueil
                    </Link>
                </nav>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-40 relative z-10">
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
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-5 rounded-2xl transition-all shadow-xl shadow-orange-500/20 active:scale-95 text-lg relative z-10"
                    >
                        DÉPOSER UNE ANNONCE
                    </button>
                </div>
            </main>

            {/* Modal Form */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-xl rounded-[3rem] p-12 relative z-10 shadow-2xl overflow-hidden"
                        >
                            {isSuccess ? (
                                <div className="text-center py-10">
                                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 mb-2 italic">Mission Publiée !</h2>
                                    <p className="text-slate-500 font-bold">Votre demande est en cours de validation par nos équipes.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Nouvelle <span className="text-orange-500">Annonce</span></h2>
                                        <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-slate-900 transition-colors">
                                            <X size={24} strokeWidth={3} />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="col-span-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Établissement</label>
                                                <div className="relative">
                                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                    <input
                                                        required
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 font-bold focus:outline-none focus:border-orange-500 transition-all"
                                                        placeholder="Nom de l'hôtel/restaurant"
                                                        value={formData.company}
                                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Type de Poste</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                                                    <select
                                                        required
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 font-bold focus:outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer"
                                                        value={formData.type}
                                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                    >
                                                        <option value="" disabled>Sélectionnez un poste...</option>
                                                        {HOSPITALITY_ROLES.map(role => (
                                                            <option key={role} value={role}>{role}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Ville</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                    <input
                                                        required
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 font-bold focus:outline-none focus:border-orange-500 transition-all"
                                                        placeholder="Paris"
                                                        value={formData.location}
                                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Date</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                    <input
                                                        required
                                                        type="date"
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 font-bold focus:outline-none focus:border-orange-500 transition-all"
                                                        value={formData.date}
                                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Rémunération (€)</label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                    <input
                                                        required
                                                        type="number"
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 font-bold focus:outline-none focus:border-orange-500 transition-all"
                                                        placeholder="150"
                                                        value={formData.amount}
                                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            disabled={isSubmitting}
                                            className="w-full bg-[#0f172a] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-xl active:scale-95 uppercase tracking-widest mt-4"
                                        >
                                            {isSubmitting ? "Envoi..." : "Publier l'Annonce"} <Send size={20} strokeWidth={3} />
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
