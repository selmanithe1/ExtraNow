"use client";

import { motion } from "framer-motion";
import {
    MapPin,
    Calendar,
    DollarSign,
    Briefcase,
    Clock,
    ArrowRight,
    Filter,
    Search,
    ShieldCheck,
    CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getAvailableMissions, applyToMission } from "@/app/actions";
import { HOSPITALITY_ROLES } from "@/app/data";

export default function MissionsMarketplace() {
    const { data: session } = useSession();
    const extraId = (session?.user as any)?.extraId as string | undefined;

    const [missions, setMissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("Tous");
    const [submittingId, setSubmittingId] = useState<string | null>(null);
    const [appliedIds, setAppliedIds] = useState<string[]>([]);

    useEffect(() => {
        getAvailableMissions().then(data => {
            setMissions(data);
            setLoading(true); // Small delay simulation
            setTimeout(() => setLoading(false), 500);
        });
    }, []);

    const categories = ["Tous", ...HOSPITALITY_ROLES.slice(0, 5)];

    const handleApply = async (missionId: string) => {
        if (!extraId) return;
        setSubmittingId(missionId);
        const result = await applyToMission(missionId, extraId);
        if (result.success) {
            setAppliedIds(prev => [...prev, missionId]);
        }
        setSubmittingId(null);
    };

    const filteredMissions = missions.filter(m =>
        m.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20">
            {/* Header with search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="relative flex-1 max-w-xl">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Rechercher par poste, ville ou établissement..."
                        className="w-full bg-white border border-slate-200 rounded-3xl py-5 pl-14 pr-6 font-bold text-slate-900 focus:outline-none focus:border-orange-500 transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-3 px-8 py-5 bg-white border border-slate-200 rounded-3xl font-black text-slate-900 hover:border-orange-500 transition-all shadow-sm uppercase tracking-widest text-xs">
                    <Filter size={18} /> Filtres Avancés
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-white rounded-[3rem] p-10 border border-slate-100 animate-pulse h-[300px]" />
                    ))}
                </div>
            ) : filteredMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMissions.map((mission, idx) => (
                        <motion.div
                            key={mission.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white rounded-[3rem] p-10 border border-slate-100 hover:border-orange-200 transition-all shadow-sm hover:shadow-xl group"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                                    <Briefcase size={28} strokeWidth={2.5} />
                                </div>
                                <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <ShieldCheck size={14} /> Vérifié
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-2">{mission.type}</h3>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">{mission.company}</p>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-3 text-slate-500 font-medium">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                        <MapPin size={16} />
                                    </div>
                                    <span className="text-sm">{mission.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 font-medium">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                        <Calendar size={16} />
                                    </div>
                                    <span className="text-sm">{new Date(mission.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                                </div>
                                <div className="flex items-center gap-3 text-orange-600 font-black">
                                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                                        <DollarSign size={16} />
                                    </div>
                                    <span className="text-lg">{mission.amount}€ <span className="text-[10px] uppercase font-bold text-orange-400 ml-1">Net / jour</span></span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleApply(mission.id)}
                                disabled={appliedIds.includes(mission.id) || submittingId === mission.id}
                                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 ${appliedIds.includes(mission.id)
                                    ? "bg-emerald-500 text-white cursor-default"
                                    : "bg-slate-900 text-white hover:bg-orange-500"
                                    }`}
                            >
                                {submittingId === mission.id ? "Envoi..." :
                                    appliedIds.includes(mission.id) ? (
                                        <>Candidature Envoyée <CheckCircle2 size={18} /></>
                                    ) : (
                                        <>Postuler <ArrowRight size={18} strokeWidth={3} /></>
                                    )}
                            </button>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Briefcase size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Aucune mission trouvée</h3>
                    <p className="text-slate-400 font-bold max-w-md mx-auto">Essayez de modifier vos critères de recherche ou revenez plus tard.</p>
                </div>
            )}
        </div>
    );
}
