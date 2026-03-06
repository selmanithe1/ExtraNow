"use client";

import { TrendingUp, Users, Zap, DollarSign, Check, X, Search, FileText, Download, Briefcase, MapPin, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateMissionStatus } from "@/app/actions";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("missions"); // "missions" or "extras"
    const [missions, setMissions] = useState([
        { id: "cm1", company: "Le Petit Nice", type: "Serveur", date: "Demain, 19:00", amount: "85 €", status: "EN_ATTENTE" },
        { id: "cm2", company: "Hôtel Continental", type: "Barman", date: "Aujourd'hui, 21:00", amount: "120 €", status: "CONFIRME" },
        { id: "cm3", company: "Bistro Volney", type: "Cuisinier", date: "15 Mars, 10:00", amount: "150 €", status: "EN_ATTENTE" },
        { id: "cm4", company: "La Brasserie", type: "Plongeur", date: "16 Mars, 18:00", amount: "65 €", status: "EN_ATTENTE" },
    ]);

    const [extras, setExtras] = useState([
        { id: "e1", name: "Thomas L.", email: "thomas@extra.fr", city: "Marseille", skills: "Serveur Expert", status: "VERIFICATION", phone: "0601020304", avatarUrl: "" },
        { id: "e2", name: "Sarah M.", email: "sarah@extra.fr", city: "Paris", skills: "Chef de rang", status: "ACTIF", phone: "0605060708", avatarUrl: "" },
        { id: "e3", name: "Karim B.", email: "karim@extra.fr", city: "Lyon", skills: "Barman", status: "ACTIF", phone: "0609101112", avatarUrl: "" },
    ]);

    const [search, setSearch] = useState("");

    const updateStatus = async (id: string, newStatus: string) => {
        setMissions(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
        try {
            await updateMissionStatus(id, newStatus);
        } catch (error) {
            console.error("Action error:", error);
        }
    };

    const filteredMissions = missions.filter(m =>
        m.company.toLowerCase().includes(search.toLowerCase()) ||
        m.type.toLowerCase().includes(search.toLowerCase())
    );

    const filteredExtras = extras.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.skills.toLowerCase().includes(search.toLowerCase())
    );

    const stats = [
        { label: "Total Extras", value: "5,248", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Missions Actives", value: missions.filter(m => m.status === "CONFIRME").length.toString(), change: "+5%", icon: Zap, color: "text-orange-600", bg: "bg-orange-50" },
        { label: "Revenu (Mois)", value: "42,850 €", change: "+18%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Satisfaction", value: "4.8/5", change: "+0.2", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
    ];

    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <motion.div
                        key={stat.label}
                        layout
                        className="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={26} strokeWidth={2.5} />
                            </div>
                            <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl">
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 p-2 bg-slate-100 rounded-3xl w-fit">
                <button
                    onClick={() => setActiveTab("missions")}
                    className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === "missions" ? "bg-white text-[#0f172a] shadow-md" : "text-slate-400 hover:text-slate-600"}`}
                >
                    Missions
                </button>
                <button
                    onClick={() => setActiveTab("extras")}
                    className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === "extras" ? "bg-white text-[#0f172a] shadow-md" : "text-slate-400 hover:text-slate-600"}`}
                >
                    Candidats (Extras)
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            {activeTab === "missions" ? "Gestion des Missions" : "Gestion des Extras"}
                        </h2>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all w-full md:w-80 font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-5">
                        <AnimatePresence mode="popLayout">
                            {activeTab === "missions" ? (
                                filteredMissions.map((mission) => (
                                    <motion.div
                                        key={mission.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-3xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all group gap-6"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-white text-xl shadow-lg shrink-0">
                                                {mission.company[0]}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 group-hover:text-orange-600 transition-colors text-lg italic">{mission.company}</div>
                                                <div className="text-sm font-bold text-slate-500 mt-0.5">{mission.type} • <span className="text-slate-400">{mission.date}</span></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                                            <div className="text-right">
                                                <div className="font-black text-slate-900 text-xl tracking-tight">{mission.amount}</div>
                                                <div className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 ${mission.status === "CONFIRME" ? "text-emerald-600" :
                                                        mission.status === "REJETE" ? "text-red-600" : "text-orange-500"
                                                    }`}>
                                                    {mission.status.replace("_", " ")}
                                                </div>
                                            </div>

                                            {mission.status === "EN_ATTENTE" && (
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => updateStatus(mission.id, "CONFIRME")}
                                                        className="p-3.5 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all active:scale-90"
                                                    >
                                                        <Check size={22} strokeWidth={4} />
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(mission.id, "REJETE")}
                                                        className="p-3.5 rounded-2xl bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all active:scale-90"
                                                    >
                                                        <X size={22} strokeWidth={4} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                filteredExtras.map((extra) => (
                                    <motion.div
                                        key={extra.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-3xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group gap-6"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-400 text-xl border-2 border-dashed border-slate-200 overflow-hidden shrink-0">
                                                {extra.avatarUrl ? (
                                                    <img src={extra.avatarUrl} className="w-full h-full object-cover" alt="User" />
                                                ) : <UserIcon size={24} />}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 group-hover:text-blue-600 transition-colors text-lg italic">{extra.name}</div>
                                                <div className="text-sm font-bold text-slate-500 mt-0.5">{extra.skills} • <span className="text-slate-400">{extra.city}</span></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                                            <div className="text-right">
                                                <div className="font-black text-slate-900 text-base tracking-tight">{extra.phone}</div>
                                                <div className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 ${extra.status === "ACTIF" ? "text-emerald-600" : "text-orange-500"
                                                    }`}>
                                                    {extra.status}
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button className="p-3.5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-lg transition-all active:scale-90" title="Voir Fiche PDF">
                                                    <FileText size={22} strokeWidth={2.5} />
                                                </button>
                                                <button className="p-3.5 rounded-2xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all active:scale-90" title="Voir CV Original">
                                                    <Download size={22} strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Action Panel */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm flex flex-col">
                    <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Actions Rapides</h2>
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-between p-5 rounded-3xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-all group">
                            <span className="font-black uppercase tracking-widest text-xs">Nouvelle Mission</span>
                            <Briefcase size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="w-full flex items-center justify-between p-5 rounded-3xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all group">
                            <span className="font-black uppercase tracking-widest text-xs">Vérifier Profils</span>
                            <Users size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="w-full flex items-center justify-between p-5 rounded-3xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all group">
                            <span className="font-black uppercase tracking-widest text-xs">Envoyer Message</span>
                            <MapPin size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="mt-auto pt-10">
                        <div className="bg-[#0f172a] rounded-[2rem] p-8 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px]" />
                            <p className="text-white/40 font-black uppercase tracking-widest text-[10px] mb-4">Support Premium</p>
                            <p className="text-xl font-black italic mb-6">Besoin d'aide ?</p>
                            <button className="w-full bg-white text-[#0f172a] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all">
                                Contactez-nous
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
