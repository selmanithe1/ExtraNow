"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Download } from "lucide-react";
import { getMonthlyStats, getStats, exportData } from "@/app/actions";

const COLORS = ["#f97316", "#0f172a", "#10b981", "#6366f1", "#ec4899"];

function downloadCSV(data: any[], filename: string) {
    if (!data.length) return;
    const keys = Object.keys(data[0]);
    const csv = [keys.join(","), ...data.map(row => keys.map(k => JSON.stringify(row[k] ?? "")).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
}

export default function AnalyticsPage() {
    const [monthly, setMonthly] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([getMonthlyStats(), getStats()]).then(([m, s]) => {
            setMonthly(m.data as any[]);
            setStats(s);
            setLoading(false);
        });
    }, []);

    const handleExport = async (type: "extras" | "missions" | "applications") => {
        setExporting(type);
        const res = await exportData(type);
        if (res.success && res.data) downloadCSV(res.data as any[], `${type}_${new Date().toISOString().slice(0,10)}.csv`);
        setExporting(null);
    };

    const pieData = [
        { name: "Extras actifs", value: 68 },
        { name: "En vérification", value: 22 },
        { name: "Suspendus", value: 10 },
    ];

    const missionTypeData = [
        { name: "Serveur", value: 42 },
        { name: "Cuisinier", value: 28 },
        { name: "Barman", value: 18 },
        { name: "Plongeur", value: 8 },
        { name: "Hôtesse", value: 4 },
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">
                        Analytiques <span className="text-orange-500">& Rapports</span>
                    </h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">Performances de la plateforme sur les 6 derniers mois</p>
                </div>
                {/* Export Buttons */}
                <div className="flex gap-3">
                    {(["extras", "missions", "applications"] as const).map(type => (
                        <button key={type} onClick={() => handleExport(type)}
                            disabled={exporting === type}
                            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:border-orange-500 hover:text-orange-500 transition-all disabled:opacity-50">
                            <Download size={14} />
                            {exporting === type ? "..." : `CSV ${type}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Cards */}
            {!loading && stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Total Extras", value: stats.totalExtras?.toLocaleString(), trend: "+12%", color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Missions Actives", value: stats.activeMissions, trend: "+8%", color: "text-orange-600", bg: "bg-orange-50" },
                        { label: "Revenu Estimé", value: stats.revenue, trend: "+18%", color: "text-emerald-600", bg: "bg-emerald-50" },
                        { label: "Satisfaction", value: stats.satisfaction, trend: "+0.2", color: "text-indigo-600", bg: "bg-indigo-50" },
                    ].map((kpi, i) => (
                        <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[2rem] border border-slate-200 p-7">
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${kpi.color}`}>{kpi.label}</span>
                                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-xl flex items-center gap-1">
                                    <TrendingUp size={10} /> {kpi.trend}
                                </span>
                            </div>
                            <div className="text-3xl font-black text-slate-900">{kpi.value}</div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Line Chart */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8">
                    <h3 className="text-lg font-black text-slate-900 mb-6 italic">
                        Inscriptions & Missions <span className="text-orange-500">/ Mois</span>
                    </h3>
                    {loading ? <div className="h-64 animate-pulse bg-slate-100 rounded-2xl" /> : (
                        <ResponsiveContainer width="100%" height={240}>
                            <LineChart data={monthly}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="label" style={{ fontFamily: 'inherit', fontSize: 11, fontWeight: 700 }} />
                                <YAxis style={{ fontFamily: 'inherit', fontSize: 11 }} />
                                <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontFamily: 'inherit', fontWeight: 700 }} />
                                <Legend />
                                <Line type="monotone" dataKey="extras" stroke="#f97316" strokeWidth={3} dot={{ r: 6, fill: '#f97316', strokeWidth: 0 }} name="Extras" />
                                <Line type="monotone" dataKey="missions" stroke="#0f172a" strokeWidth={3} dot={{ r: 6, fill: '#0f172a', strokeWidth: 0 }} name="Missions" />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Bar Chart Revenue */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8">
                    <h3 className="text-lg font-black text-slate-900 mb-6 italic">
                        Revenu Généré <span className="text-orange-500">(€)</span>
                    </h3>
                    {loading ? <div className="h-64 animate-pulse bg-slate-100 rounded-2xl" /> : (
                        <ResponsiveContainer width="100%" height={240}>
                            <BarChart data={monthly}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="label" style={{ fontFamily: 'inherit', fontSize: 11, fontWeight: 700 }} />
                                <YAxis style={{ fontFamily: 'inherit', fontSize: 11 }} />
                                <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontFamily: 'inherit', fontWeight: 700 }} formatter={(v: any) => [`${v} €`, 'Revenu']} />
                                <Bar dataKey="revenue" fill="#f97316" radius={[8, 8, 0, 0]} name="Revenu (€)" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pie - Statuts extras */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8">
                    <h3 className="text-lg font-black text-slate-900 mb-6 italic">
                        Répartition des <span className="text-orange-500">Extras</span>
                    </h3>
                    <div className="flex items-center gap-8">
                        <ResponsiveContainer width="50%" height={200}>
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', fontFamily: 'inherit', fontWeight: 700 }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-3">
                            {pieData.map((entry, i) => (
                                <div key={entry.name} className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                                    <span className="text-sm font-bold text-slate-600">{entry.name}</span>
                                    <span className="text-sm font-black text-slate-900 ml-auto">{entry.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bar - Types de missions */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8">
                    <h3 className="text-lg font-black text-slate-900 mb-6 italic">
                        Missions par <span className="text-orange-500">Type</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={missionTypeData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                            <XAxis type="number" style={{ fontFamily: 'inherit', fontSize: 11 }} />
                            <YAxis type="category" dataKey="name" style={{ fontFamily: 'inherit', fontSize: 11, fontWeight: 700 }} width={70} />
                            <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', fontFamily: 'inherit', fontWeight: 700 }} />
                            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                                {missionTypeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
