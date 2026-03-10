"use client";

import { LayoutDashboard, TrendingUp, Users, Zap, DollarSign, Check, X, Search, FileText, Download, Briefcase, MapPin, User as UserIcon, Gamepad2, GraduationCap, Edit3, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { updateMissionStatus, getAdminData, getStats, getSkillsTests, getAllTestResults, updateSkillTest } from "@/app/actions";

export default function AdminPage() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");

    const [activeTab, setActiveTab] = useState(tabParam || "dashboard");
    const [missions, setMissions] = useState<any[]>([]);
    const [extras, setExtras] = useState<any[]>([]);
    const [statsData, setStatsData] = useState<any>(null);
    const [tests, setTests] = useState<any[]>([]);
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditingTest, setIsEditingTest] = useState<any>(null);

    useEffect(() => {
        if (tabParam) {
            setActiveTab(tabParam);
        } else {
            setActiveTab("dashboard");
        }
    }, [tabParam]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [adminData, liveStats, testsData, resultsData] = await Promise.all([
                    getAdminData(),
                    getStats(),
                    getSkillsTests(),
                    getAllTestResults()
                ]);
                setExtras(adminData.extras);
                setMissions(adminData.missions);
                setStatsData(liveStats);
                setTests(testsData);
                setResults(resultsData);
            } catch (err) {
                console.error("Fetch error");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const [search, setSearch] = useState("");

    const updateStatus = async (id: string, newStatus: string) => {
        setMissions(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
        await updateMissionStatus(id, newStatus);
    };

    const stats = [
        { label: "Total Extras", value: statsData?.totalExtras || "...", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Missions Actives", value: statsData?.activeMissions || "...", change: "+5%", icon: Zap, color: "text-orange-600", bg: "bg-orange-50" },
        { label: "Revenu (Mois)", value: statsData?.revenue || "...", change: "+18%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Satisfaction", value: statsData?.satisfaction || "...", change: "+0.2", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
    ];

    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <motion.div key={stat.label} layout className="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}><stat.icon size={26} strokeWidth={2.5} /></div>
                            <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl">{stat.change}</span>
                        </div>
                        <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 p-2 bg-slate-100 rounded-3xl w-fit">
                {["dashboard", "missions", "extras", "tests", "scores"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white text-[#0f172a] shadow-md" : "text-slate-400 hover:text-slate-600"}`}
                    >
                        {tab === "scores" ? "Notes" : tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm min-h-[500px] flex flex-col relative overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight capitalize">Gestion des {activeTab}</h2>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition-all w-80 font-bold"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {loading && <div className="p-20 text-center animate-pulse text-slate-300 font-black italic">Chargement...</div>}

                        {!loading && activeTab === "dashboard" && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                                <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                                    <LayoutDashboard size={40} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2 italic">Bienvenue sur le <span className="text-orange-500">Dashboard</span></h3>
                                <p className="text-slate-400 font-bold max-w-sm uppercase tracking-widest text-[10px]">Utilisez le menu pour gérer les missions, les utilisateurs et les tests de compétences.</p>
                            </div>
                        )}

                        {!loading && activeTab === "extras" && extras.map(e => (
                            <div key={e.id} className="p-6 border border-slate-100 rounded-[2rem] flex items-center justify-between hover:bg-slate-50 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center font-black">
                                        {e.avatarUrl ? <img src={e.avatarUrl} className="w-full h-full object-cover" /> : <UserIcon size={20} className="text-slate-400" />}
                                    </div>
                                    <div>
                                        <p className="font-black italic text-slate-900 group-hover:text-orange-500 transition-colors uppercase text-sm">{e.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{e.skills || 'Sans compétences'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${e.status === 'VERIFICATION' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>{e.status}</span>
                                    <button className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-red-50 text-red-500 transition-all active:scale-95"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        ))}

                        {!loading && activeTab === "missions" && missions.map(m => (
                            <div key={m.id} className="p-6 border border-slate-100 rounded-[2rem] flex items-center justify-between hover:bg-slate-50 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black">{m.company[0]}</div>
                                    <div>
                                        <p className="font-black italic text-slate-900 group-hover:text-orange-500 transition-colors uppercase text-sm">{m.company}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.type} • {m.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${m.status === 'CONFIRME' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>{m.status}</span>
                                    {m.status === 'EN_ATTENTE' && (
                                        <button onClick={() => updateStatus(m.id, 'CONFIRME')} className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95"><Check size={18} strokeWidth={4} /></button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {!loading && activeTab === "tests" && (
                            <div className="space-y-4">
                                {tests.map(test => (
                                    <div key={test.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-4 bg-white rounded-2xl text-emerald-500 shadow-sm"><Gamepad2 size={24} /></div>
                                            <div>
                                                <p className="font-black text-slate-900 italic">{test.title}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{test.category}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsEditingTest(test)}
                                            className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-orange-500 transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
                                        >
                                            <Edit3 size={16} /> Éditer
                                        </button>
                                    </div>
                                ))}
                                <button className="w-full p-6 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-black uppercase tracking-widest text-[10px] hover:border-orange-500 hover:text-orange-500 transition-all">
                                    + Ajouter un nouveau test
                                </button>
                            </div>
                        )}

                        {!loading && activeTab === "scores" && (
                            <div className="space-y-4">
                                {results.map(res => (
                                    <div key={res.id} className="p-6 border border-slate-100 rounded-[2rem] flex items-center justify-between hover:bg-emerald-50 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center font-black text-slate-300">
                                                {res.extra?.avatarUrl ? <img src={res.extra.avatarUrl} className="w-full h-full object-cover rounded-xl" /> : <GraduationCap size={20} />}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900">{res.extra?.name || 'Extra inconnu'}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.test?.title}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-2xl font-black italic ${res.passed ? 'text-emerald-500' : 'text-red-500'}`}>{res.score}%</p>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{res.passed ? 'Succès' : 'Échec'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Live Stats Log */}
                <div className="bg-[#0f172a] rounded-[2.5rem] p-10 text-white flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px]" />
                    <h3 className="text-xl font-black italic mb-8">Activités Réelles <span className="text-orange-500">Live</span></h3>
                    <div className="space-y-6 flex-1">
                        {[
                            { text: "Nouveau test complété par Marco S.", time: "À l'instant", col: "text-emerald-500" },
                            { text: "Mission 'Chef de Rang' publiée par Plaza", time: "Il y a 2 min", col: "text-orange-400" },
                            { text: "Candidature reçue pour 'Barmaid'", time: "Il y a 5 min", col: "text-blue-400" }
                        ].map((log, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 bg-current ${log.col}`} />
                                <div>
                                    <p className="text-sm font-bold leading-tight">{log.text}</p>
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">{log.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Editing Modal Placeholder */}
            {isEditingTest && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-sm">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-2xl rounded-[3rem] p-10">
                        <h2 className="text-3xl font-black mb-6 italic">Modifier le <span className="text-orange-500">Test</span></h2>
                        <div className="space-y-6">
                            <input className="w-full bg-slate-50 p-5 rounded-2xl font-bold border border-slate-100" defaultValue={isEditingTest.title} />
                            <textarea className="w-full bg-slate-50 p-5 rounded-2xl font-bold border border-slate-100 h-32" defaultValue={isEditingTest.description} />
                            <div className="flex gap-4">
                                <button onClick={() => setIsEditingTest(null)} className="flex-1 bg-slate-100 p-5 rounded-2xl font-black uppercase tracking-widest text-xs">Annuler</button>
                                <button className="flex-1 bg-slate-900 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs">Sauvegarder</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
