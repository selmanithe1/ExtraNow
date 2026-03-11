"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, Zap, DollarSign, Check, X, Search, Gamepad2, GraduationCap, Edit3, Trash2, Plus, MapPin, LayoutDashboard, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
    updateMissionStatus, getAdminData, getStats, getSkillsTests, getAllTestResults, updateSkillTest,
    approveExtra, suspendExtra, deleteExtra, updateExtra,
    deleteMission, updateMission, createMission
} from "@/app/actions";

// ─── Toast ───────────────────────────────────────────────────────────
function Toast({ msg, type }: { msg: string; type: string }) {
    return (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-[999] px-6 py-4 rounded-2xl font-bold text-white shadow-2xl ${type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
            {msg}
        </motion.div>
    );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl text-center">
                <div className="text-5xl mb-6">⚠️</div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{message}</h3>
                <p className="text-slate-500 text-sm mb-8">Cette action est irréversible.</p>
                <div className="flex gap-4">
                    <button onClick={onCancel} className="flex-1 py-4 rounded-2xl bg-slate-100 font-black uppercase tracking-widest text-xs">Annuler</button>
                    <button onClick={onConfirm} className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-black uppercase tracking-widest text-xs hover:bg-red-600">Confirmer</button>
                </div>
            </motion.div>
        </div>
    );
}

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
    const [search, setSearch] = useState("");

    // Modals
    const [editingExtra, setEditingExtra] = useState<any>(null);
    const [editingMission, setEditingMission] = useState<any>(null);
    const [editingTest, setEditingTest] = useState<any>(null);
    const [creatingMission, setCreatingMission] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<{ fn: () => void; msg: string } | null>(null);

    // Toast
    const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
    const showToast = (msg: string, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    // New mission form
    const [newMission, setNewMission] = useState({ company: "", type: "", location: "", date: "", amount: "" });

    useEffect(() => {
        if (tabParam) setActiveTab(tabParam);
        else if (!tabParam) setActiveTab("dashboard");
    }, [tabParam]);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const [adminData, liveStats, testsData, resultsData] = await Promise.all([
                    getAdminData(), getStats(), getSkillsTests(), getAllTestResults()
                ]);
                setExtras(adminData.extras);
                setMissions(adminData.missions);
                setStatsData(liveStats);
                setTests(testsData);
                setResults(resultsData);
            } finally { setLoading(false); }
        };
        fetch();
    }, []);

    const stats = [
        { label: "Total Extras", value: statsData?.totalExtras ?? "...", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Missions Actives", value: statsData?.activeMissions ?? "...", change: "+5%", icon: Zap, color: "text-orange-600", bg: "bg-orange-50" },
        { label: "Revenu (Mois)", value: statsData?.revenue ?? "...", change: "+18%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Satisfaction", value: statsData?.satisfaction ?? "...", change: "+0.2", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
    ];

    // ── EXTRA ACTIONS ──────────────────────────────────────────────
    const handleApproveExtra = async (id: string) => {
        setExtras(p => p.map(e => e.id === id ? { ...e, status: "ACTIF" } : e));
        const r = await approveExtra(id);
        showToast(r.success ? "Extra validé ✓" : (r.error || "Erreur"), r.success ? "success" : "error");
    };
    const handleSuspendExtra = async (id: string) => {
        setExtras(p => p.map(e => e.id === id ? { ...e, status: "SUSPENDU" } : e));
        const r = await suspendExtra(id);
        showToast(r.success ? "Extra suspendu" : (r.error || "Erreur"), r.success ? "success" : "error");
    };
    const handleDeleteExtra = (id: string) => {
        setConfirmDelete({ msg: "Supprimer cet extra ?", fn: async () => {
            setConfirmDelete(null);
            const r = await deleteExtra(id);
            if (r.success) { setExtras(p => p.filter(e => e.id !== id)); showToast("Extra supprimé"); }
            else showToast(r.error || "Erreur", "error");
        }});
    };
    const handleSaveExtra = async () => {
        const { id, ...data } = editingExtra;
        const r = await updateExtra(id, data);
        if (r.success) { setExtras(p => p.map(e => e.id === id ? r.extra : e)); setEditingExtra(null); showToast("Extra mis à jour ✓"); }
        else showToast(r.error || "Erreur", "error");
    };

    // ── MISSION ACTIONS ─────────────────────────────────────────────
    const handleUpdateMissionStatus = async (id: string, status: string) => {
        setMissions(p => p.map(m => m.id === id ? { ...m, status } : m));
        await updateMissionStatus(id, status);
    };
    const handleDeleteMission = (id: string) => {
        setConfirmDelete({ msg: "Supprimer cette mission ?", fn: async () => {
            setConfirmDelete(null);
            const r = await deleteMission(id);
            if (r.success) { setMissions(p => p.filter(m => m.id !== id)); showToast("Mission supprimée"); }
            else showToast(r.error || "Erreur", "error");
        }});
    };
    const handleSaveMission = async () => {
        const { id, ...data } = editingMission;
        const r = await updateMission(id, { ...data, amount: parseFloat(data.amount) });
        if (r.success) { setMissions(p => p.map(m => m.id === id ? r.mission : m)); setEditingMission(null); showToast("Mission mise à jour ✓"); }
        else showToast(r.error || "Erreur", "error");
    };
    const handleCreateMission = async () => {
        if (!newMission.company || !newMission.type || !newMission.location || !newMission.date) {
            showToast("Remplissez tous les champs obligatoires", "error"); return;
        }
        const r = await createMission({ ...newMission, amount: parseFloat(newMission.amount) || 0 });
        if (r.success) { setMissions(p => [r.mission, ...p]); setCreatingMission(false); setNewMission({ company: "", type: "", location: "", date: "", amount: "" }); showToast("Mission créée ✓"); }
        else showToast(r.error || "Erreur", "error");
    };

    const statusColor = (s: string) => ({
        CONFIRME: "bg-emerald-100 text-emerald-700",
        EN_ATTENTE: "bg-amber-100 text-amber-700",
        TERMINE: "bg-slate-100 text-slate-500",
        ACTIF: "bg-emerald-100 text-emerald-700",
        VERIFICATION: "bg-blue-100 text-blue-700",
        SUSPENDU: "bg-red-100 text-red-700",
    }[s] || "bg-slate-100 text-slate-500");

    const filteredMissions = missions.filter(m => !search || m.company?.toLowerCase().includes(search.toLowerCase()) || m.type?.toLowerCase().includes(search.toLowerCase()));
    const filteredExtras = extras.filter(e => !search || e.name?.toLowerCase().includes(search.toLowerCase()) || e.email?.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-10">
            {/* Toast */}
            <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} />}</AnimatePresence>

            {/* Confirm */}
            {confirmDelete && <ConfirmDialog message={confirmDelete.msg} onConfirm={confirmDelete.fn} onCancel={() => setConfirmDelete(null)} />}

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
            <div className="flex gap-3 p-2 bg-slate-100 rounded-3xl w-fit flex-wrap">
                {["dashboard", "missions", "extras", "tests", "scores"].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white text-[#0f172a] shadow-md" : "text-slate-400 hover:text-slate-600"}`}>
                        {tab === "dashboard" ? "Vue Globale" : tab === "scores" ? "Notes" : tab}
                    </button>
                ))}
            </div>

            {/* Search bar (missions + extras) */}
            {(activeTab === "missions" || activeTab === "extras") && (
                <div className="relative w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-5 py-3.5 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all" />
                </div>
            )}

            {/* ── DASHBOARD TAB ── */}
            {activeTab === "dashboard" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xl font-black text-slate-900 italic">Dernières Missions</h3>
                        <div className="bg-white rounded-[2rem] border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                            {loading ? <div className="p-10 animate-pulse text-slate-200 text-center font-black">Chargement...</div> : missions.slice(0, 5).map(m => (
                                <div key={m.id} className="flex items-center justify-between p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-sm">{m.company?.[0]}</div>
                                        <div><p className="font-black text-slate-900 text-sm">{m.company}</p><p className="text-[10px] font-bold text-slate-400 uppercase">{m.type} · {m.location}</p></div>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${statusColor(m.status)}`}>{m.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-[#0f172a] rounded-[2rem] p-8 text-white">
                        <h3 className="text-lg font-black italic mb-6">Activité <span className="text-orange-500">Live</span></h3>
                        <div className="space-y-5">
                            {[
                                { text: extras[0] ? `Nouvel extra : ${extras[0].name}` : "Plateforme en ligne", col: "bg-emerald-500", time: "Récent" },
                                { text: missions[0] ? `Mission : ${missions[0].type}` : "En attente de données", col: "bg-orange-400", time: "Récent" },
                                { text: `${extras.filter(e => e.status === "VERIFICATION").length} extras en attente de validation`, col: "bg-blue-400", time: "Maintenant" },
                            ].map((log, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${log.col}`} />
                                    <div><p className="text-sm font-bold">{log.text}</p><p className="text-[10px] font-black text-white/30 uppercase mt-1">{log.time}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── MISSIONS TAB ── */}
            {activeTab === "missions" && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-900 italic">Missions ({filteredMissions.length})</h3>
                        <button onClick={() => setCreatingMission(true)}
                            className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 transition-all">
                            <Plus size={16} /> Nouvelle Mission
                        </button>
                    </div>
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden">
                        {loading ? <div className="p-20 animate-pulse text-slate-200 text-center font-black">Chargement...</div> : (
                            <div className="divide-y divide-slate-100">
                                {filteredMissions.map(m => (
                                    <motion.div key={m.id} layout className="flex items-center justify-between p-5 hover:bg-slate-50 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black">{m.company?.[0]}</div>
                                            <div>
                                                <p className="font-black text-slate-900 group-hover:text-orange-500 transition-colors text-sm">{m.company}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.type} · <MapPin size={9} className="inline" /> {m.location} · {m.amount}€</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-xl ${statusColor(m.status)}`}>{m.status}</span>
                                            {m.status === "EN_ATTENTE" && (
                                                <button onClick={() => handleUpdateMissionStatus(m.id, "CONFIRME")} className="p-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 active:scale-95 transition-all"><Check size={14} strokeWidth={3} /></button>
                                            )}
                                            <button onClick={() => setEditingMission({ ...m, date: m.date ? new Date(m.date).toISOString().slice(0, 10) : "" })}
                                                className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 active:scale-95 transition-all"><Edit3 size={14} /></button>
                                            <button onClick={() => handleDeleteMission(m.id)}
                                                className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-100 active:scale-95 transition-all"><Trash2 size={14} /></button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── EXTRAS TAB ── */}
            {activeTab === "extras" && (
                <div className="space-y-4">
                    <h3 className="text-xl font-black text-slate-900 italic">Extras ({filteredExtras.length})</h3>
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden">
                        {loading ? <div className="p-20 animate-pulse text-slate-200 text-center font-black">Chargement...</div> : (
                            <div className="divide-y divide-slate-100">
                                {filteredExtras.map(e => (
                                    <motion.div key={e.id} layout className="flex items-center justify-between p-5 hover:bg-slate-50 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-xl flex items-center justify-center text-white font-black">{e.name?.[0]}</div>
                                            <div>
                                                <p className="font-black text-slate-900 group-hover:text-orange-500 transition-colors text-sm">{e.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{e.email} · {e.city}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-xl ${statusColor(e.status)}`}>{e.status}</span>
                                            {e.status === "VERIFICATION" && (
                                                <button onClick={() => handleApproveExtra(e.id)} className="p-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 active:scale-95 transition-all"><Check size={14} strokeWidth={3} /></button>
                                            )}
                                            {e.status === "ACTIF" && (
                                                <button onClick={() => handleSuspendExtra(e.id)} className="p-2.5 bg-amber-100 text-amber-600 rounded-xl hover:bg-amber-200 active:scale-95 transition-all"><X size={14} strokeWidth={3} /></button>
                                            )}
                                            <button onClick={() => setEditingExtra({ ...e })}
                                                className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 active:scale-95 transition-all"><Edit3 size={14} /></button>
                                            <button onClick={() => handleDeleteExtra(e.id)}
                                                className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-100 active:scale-95 transition-all"><Trash2 size={14} /></button>
                                        </div>
                                    </motion.div>
                                ))}
                                {filteredExtras.length === 0 && (
                                    <div className="p-16 text-center text-slate-400 font-bold">
                                        <Users size={40} className="mx-auto mb-4 opacity-20" />
                                        Aucun extra trouvé
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── TESTS TAB ── */}
            {activeTab === "tests" && (
                <div className="space-y-4">
                    <h3 className="text-xl font-black text-slate-900 italic">Tests de Compétences</h3>
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden">
                        <div className="divide-y divide-slate-100">
                            {tests.map(test => (
                                <div key={test.id} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-2xl text-emerald-500 shadow border border-slate-100"><Gamepad2 size={22} /></div>
                                        <div>
                                            <p className="font-black text-slate-900">{test.title}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{test.category}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setEditingTest(test)}
                                        className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-orange-500 transition-all flex items-center gap-2 text-xs font-black uppercase">
                                        <Edit3 size={14} /> Éditer
                                    </button>
                                </div>
                            ))}
                            <div className="p-6">
                                <button className="w-full p-5 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-black uppercase tracking-widest text-[10px] hover:border-orange-500 hover:text-orange-500 transition-all">
                                    + Ajouter un test
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── SCORES TAB ── */}
            {activeTab === "scores" && (
                <div className="space-y-4">
                    <h3 className="text-xl font-black text-slate-900 italic">Résultats des Tests ({results.length})</h3>
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden">
                        {results.length === 0 ? (
                            <div className="p-16 text-center text-slate-400 font-bold">
                                <GraduationCap size={40} className="mx-auto mb-4 opacity-20" />Aucun résultat disponible
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {results.map(r => (
                                    <div key={r.id} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 bg-white border border-slate-100 rounded-xl flex items-center justify-center font-black text-slate-300">
                                                <GraduationCap size={18} />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-sm">{r.extra?.name || "Extra inconnu"}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.test?.title}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-2xl font-black italic ${r.passed ? "text-emerald-500" : "text-red-500"}`}>{r.score}%</p>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{r.passed ? "Succès" : "Échec"}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ═══════════ MODAL: Edit Extra ═══════════ */}
            {editingExtra && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6 overflow-y-auto">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl my-auto">
                        <h2 className="text-2xl font-black mb-6 italic">Modifier l'<span className="text-orange-500">Extra</span></h2>
                        <div className="space-y-4">
                            {[
                                { key: "name", label: "Nom complet", type: "text" },
                                { key: "email", label: "Email", type: "email" },
                                { key: "phone", label: "Téléphone", type: "text" },
                                { key: "city", label: "Ville", type: "text" },
                                { key: "experience", label: "Expérience", type: "text" },
                            ].map(f => (
                                <div key={f.key}>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{f.label}</label>
                                    <input type={f.type} value={editingExtra[f.key] || ""}
                                        onChange={ev => setEditingExtra((p: any) => ({ ...p, [f.key]: ev.target.value }))}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-bold text-slate-900 focus:outline-none focus:border-orange-500" />
                                </div>
                            ))}
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Compétences</label>
                                <textarea value={editingExtra.skills || ""}
                                    onChange={ev => setEditingExtra((p: any) => ({ ...p, skills: ev.target.value }))}
                                    rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-bold text-slate-900 focus:outline-none focus:border-orange-500 resize-none" />
                            </div>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setEditingExtra(null)} className="flex-1 py-4 rounded-2xl bg-slate-100 font-black uppercase tracking-widest text-xs">Annuler</button>
                            <button onClick={handleSaveExtra} className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all">Sauvegarder</button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* ═══════════ MODAL: Edit Mission ═══════════ */}
            {editingMission && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl">
                        <h2 className="text-2xl font-black mb-6 italic">Modifier la <span className="text-orange-500">Mission</span></h2>
                        <div className="space-y-4">
                            {[
                                { key: "company", label: "Entreprise", type: "text" },
                                { key: "type", label: "Type de poste", type: "text" },
                                { key: "location", label: "Lieu", type: "text" },
                                { key: "date", label: "Date", type: "date" },
                                { key: "amount", label: "Montant (€)", type: "number" },
                            ].map(f => (
                                <div key={f.key}>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{f.label}</label>
                                    <input type={f.type} value={editingMission[f.key] || ""}
                                        onChange={ev => setEditingMission((p: any) => ({ ...p, [f.key]: ev.target.value }))}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-bold text-slate-900 focus:outline-none focus:border-orange-500" />
                                </div>
                            ))}
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Statut</label>
                                <select value={editingMission.status}
                                    onChange={ev => setEditingMission((p: any) => ({ ...p, status: ev.target.value }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-bold text-slate-900 focus:outline-none focus:border-orange-500">
                                    <option>EN_ATTENTE</option><option>CONFIRME</option><option>TERMINE</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setEditingMission(null)} className="flex-1 py-4 rounded-2xl bg-slate-100 font-black uppercase tracking-widest text-xs">Annuler</button>
                            <button onClick={handleSaveMission} className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all">Sauvegarder</button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* ═══════════ MODAL: Create Mission ═══════════ */}
            {creatingMission && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl">
                        <h2 className="text-2xl font-black mb-6 italic">Nouvelle <span className="text-orange-500">Mission</span></h2>
                        <div className="space-y-4">
                            {[
                                { key: "company", label: "Entreprise *", type: "text", ph: "Le Grand Bistro" },
                                { key: "type", label: "Type de poste *", type: "text", ph: "Serveur, Barman..." },
                                { key: "location", label: "Lieu *", type: "text", ph: "Paris 8ème" },
                                { key: "date", label: "Date *", type: "date", ph: "" },
                                { key: "amount", label: "Montant (€)", type: "number", ph: "120" },
                            ].map(f => (
                                <div key={f.key}>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{f.label}</label>
                                    <input type={f.type} placeholder={f.ph} value={(newMission as any)[f.key] || ""}
                                        onChange={ev => setNewMission(p => ({ ...p, [f.key]: ev.target.value }))}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-bold text-slate-900 focus:outline-none focus:border-orange-500 placeholder:text-slate-300" />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setCreatingMission(false)} className="flex-1 py-4 rounded-2xl bg-slate-100 font-black uppercase tracking-widest text-xs">Annuler</button>
                            <button onClick={handleCreateMission} className="flex-1 py-4 rounded-2xl bg-orange-500 text-white font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all">Créer</button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* ═══════════ MODAL: Edit Test ═══════════ */}
            {editingTest && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl">
                        <h2 className="text-2xl font-black mb-6 italic">Modifier le <span className="text-orange-500">Test</span></h2>
                        <div className="space-y-5">
                            <input className="w-full bg-slate-50 p-4 rounded-2xl font-bold border border-slate-100" defaultValue={editingTest.title} onChange={e => setEditingTest((p: any) => ({ ...p, title: e.target.value }))} placeholder="Titre du test" />
                            <input className="w-full bg-slate-50 p-4 rounded-2xl font-bold border border-slate-100" defaultValue={editingTest.category} onChange={e => setEditingTest((p: any) => ({ ...p, category: e.target.value }))} placeholder="Catégorie" />
                            <textarea className="w-full bg-slate-50 p-4 rounded-2xl font-bold border border-slate-100 h-24 resize-none" defaultValue={editingTest.description} onChange={e => setEditingTest((p: any) => ({ ...p, description: e.target.value }))} placeholder="Description" />
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setEditingTest(null)} className="flex-1 py-4 rounded-2xl bg-slate-100 font-black uppercase tracking-widest text-xs">Annuler</button>
                            <button onClick={async () => { await updateSkillTest(editingTest.id, editingTest); setEditingTest(null); showToast("Test mis à jour ✓"); }}
                                className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all">Sauvegarder</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
