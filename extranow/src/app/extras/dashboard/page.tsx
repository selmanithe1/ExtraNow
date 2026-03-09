"use client";

import { motion } from "framer-motion";
import {
    Briefcase,
    Zap,
    TrendingUp,
    Clock,
    CheckCircle2,
    Search,
    MapPin,
    DollarSign,
    ChevronRight,
    Star,
    Trophy,
    MessageCircle,
    ArrowUpRight
} from "lucide-react";
import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import Link from "next/link";
import { getStats, getAvailableMissions, getLatestExtra } from "@/app/actions";

const chartData = [
    { name: "Lun", revenue: 85, hours: 7 },
    { name: "Mar", revenue: 120, hours: 8 },
    { name: "Mer", revenue: 0, hours: 0 },
    { name: "Jeu", revenue: 150, hours: 10 },
    { name: "Ven", revenue: 180, hours: 12 },
    { name: "Sam", revenue: 220, hours: 14 },
    { name: "Dim", revenue: 95, hours: 8 },
];

export default function ExtraDashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [missions, setMissions] = useState<any[]>([]);
    const [extra, setExtra] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [s, m, e] = await Promise.all([
                    getStats(),
                    getAvailableMissions(),
                    getLatestExtra()
                ]);
                setStats(s);
                setMissions(m.slice(0, 3));
                setExtra(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const dynamicStats = [
        { label: "Revenu Hebdo", value: stats?.revenue || "850.50 €", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50", change: "+12.5%" },
        { label: "Heures ce mois", value: "124h", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", change: "Objectif: 150h" },
        { label: "Score Qualité", value: stats?.satisfaction || "4.9/5", icon: Star, color: "text-orange-600", bg: "bg-orange-50", change: "Rang: Expert" },
        { label: "Missions Actives", value: stats?.activeMissions || "0", icon: Zap, color: "text-indigo-600", bg: "bg-indigo-50", change: "Live" },
    ];

    return (
        <div className="space-y-10 pb-10">
            {/* Dynamic Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dynamicStats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-7 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:border-slate-300 transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-inner group-hover:scale-110 transition-transform`}>
                                <stat.icon size={26} strokeWidth={2.5} />
                            </div>
                            <span className="text-[10px] font-black bg-slate-50 px-3 py-1.5 rounded-full text-slate-400 uppercase tracking-widest border border-slate-100 italic">
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{stat.value}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px]" />
                        <div className="flex items-center justify-between mb-12 relative z-10">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 italic tracking-tight">
                                    Hello, {extra?.name?.split(' ')[0] || "Extra"} !
                                </h2>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Ton aperçu de performance aujourd'hui</p>
                            </div>
                            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95 shadow-lg shadow-slate-900/10">
                                Exporter Données
                            </button>
                        </div>

                        <div className="h-[350px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '20px',
                                            border: 'none',
                                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                                            fontWeight: '900',
                                            padding: '15px'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#10b981"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorRev)"
                                        animationDuration={2000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-black text-slate-900 italic tracking-tight">Missions à venir</h2>
                            <Link href="/extras/missions" className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:translate-x-1 transition-all flex items-center gap-2">
                                Voir tout <ChevronRight size={14} strokeWidth={3} />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {missions.length > 0 ? missions.map((mission, idx) => (
                                <div key={idx} className="flex items-center justify-between p-6 rounded-[2rem] border border-slate-50 hover:bg-slate-50/50 transition-all group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-white text-xl">
                                            {mission.company[0]}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 italic group-hover:text-orange-500 transition-colors uppercase tracking-tight">{mission.company}</p>
                                            <p className="text-xs font-bold text-slate-400 mt-0.5">{mission.type} • {new Date(mission.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-black text-slate-900 tracking-tighter">{mission.amount}</p>
                                        <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${mission.status === 'CONFIRME' ? 'text-emerald-500' : 'text-orange-500'}`}>
                                            {mission.status}
                                        </p>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-10 text-slate-300 font-black italic">Aucune mission à venir</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="bg-orange-500 rounded-[3rem] p-10 text-white shadow-2xl shadow-orange-500/30 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                        <div className="relative z-10 text-center">
                            <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 backdrop-blur-md">
                                <Trophy size={40} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight mb-2 italic">DÉFI DE LA SEMAINE</h3>
                            <p className="text-white/70 font-bold text-xs uppercase tracking-widest mb-10 leading-relaxed">
                                Réalise 3 missions "Expert" pour débloquer +15% de revenus.
                            </p>
                            <Link href="/extras/defi" className="block bg-white text-orange-500 rounded-2xl py-4 font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all text-center">
                                Voir les détails
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight italic">Partenaires Favoris</h3>
                        <div className="space-y-6">
                            {[
                                { name: "Groupe ACCOR", role: "Hôtellerie", active: true },
                                { name: "Mama Shelter", role: "Restauration", active: true },
                                { name: "Ducasse Paris", role: "Gastronomie", active: false },
                            ].map((partner, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-300">
                                            {partner.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{partner.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{partner.role}</p>
                                        </div>
                                    </div>
                                    <div className={`w-2.5 h-2.5 rounded-full ${partner.active ? "bg-emerald-500" : "bg-slate-200"}`} />
                                </div>
                            ))}
                            <button className="w-full mt-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 font-black text-[9px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all">
                                Explorer les partenaires
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#101e33] rounded-[3rem] p-10 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
                        <Link href="/extras/messages" className="block group/link">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500">
                                    <MessageCircle size={24} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="font-black italic">Messages Flash</p>
                                    <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mt-0.5">2 Nouveaux</p>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6 font-black text-xs hover:bg-white/10 transition-colors">
                                Messagerie connectée & live. Cliquez pour voir.
                            </div>
                        </Link>
                        <Link href="/extras/messages" className="block w-full text-[10px] font-black uppercase tracking-widest text-center py-2 text-white/50 hover:text-white transition-colors">
                            Ouvrir la messagerie
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
