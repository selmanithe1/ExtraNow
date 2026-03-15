"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Building2, PlusCircle, Calendar, MapPin, DollarSign, Briefcase, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createMission } from "@/app/actions";
import { HOSPITALITY_ROLES } from "@/app/data";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function NewMissionPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [formData, setFormData] = useState({
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
            amount: parseFloat(formData.amount),
            clientId: (session?.user as any)?.clientId,
        });

        if (result.success) {
            if (result.checkoutUrl) {
                setIsRedirecting(true);
                window.location.href = result.checkoutUrl;
            } else {
                setIsSuccess(true);
                setTimeout(() => {
                    router.push("/entreprises/dashboard/missions");
                    router.refresh();
                }, 2000);
                setIsSubmitting(false);
            }
        } else {
            alert(result.error || "Une erreur est survenue");
            setIsSubmitting(false);
        }
    };

    if (isSuccess || isRedirecting) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Mission Publiée !</h2>
                    <p className="text-xl text-slate-500 font-medium">
                        {isRedirecting ? "Redirection vers la passerelle de paiement sécurisée..." : "Redirection vers vos missions..."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-10">
                <Link 
                    href="/entreprises/dashboard/missions" 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold mb-6 transition-colors"
                >
                    <ArrowLeft size={20} /> Retour aux missions
                </Link>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                    Nouvelle <span className="text-orange-500 italic">Offre</span>
                </h1>
                <p className="text-slate-500 font-medium mt-2 text-lg">Détaillez votre besoin pour trouver le bon extra.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10" />

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                            <label className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-3 block ml-1">Type de Poste recherché</label>
                            <div className="relative">
                                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={24} />
                                <select
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] py-5 pl-14 pr-6 text-lg font-bold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all appearance-none cursor-pointer"
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
                            <label className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-3 block ml-1">Ce dont vous avez besoin le</label>
                            <div className="relative">
                                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={24} />
                                <input
                                    required
                                    type="date"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] py-5 pl-14 pr-6 text-lg font-bold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all cursor-text"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-3 block ml-1">Lieu de la prestation</label>
                            <div className="relative">
                                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] py-5 pl-14 pr-6 text-lg font-bold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-slate-300"
                                    placeholder="Ex: Paris 11ème"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-3 block ml-1">Rémunération Nette (€)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                                <input
                                    required
                                    type="number"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] py-5 pl-14 pr-6 text-2xl font-black text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-slate-300"
                                    placeholder="150"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                            <p className="text-xs text-slate-400 font-bold mt-3 ml-2">* La commission ExtraNow de 15% sera calculée sur ce montant et facturée séparément.</p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                        <button
                            disabled={isSubmitting}
                            className="bg-[#0f172a] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-500 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center gap-3"
                        >
                            {isSubmitting ? "Création en cours..." : "Publier & Payer (Sécurisé)"}
                            {!isSubmitting && <PlusCircle size={24} />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
