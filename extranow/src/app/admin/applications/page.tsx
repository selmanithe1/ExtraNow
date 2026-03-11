"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Search, Briefcase, User, Clock, Filter } from "lucide-react";
import { getAllApplications, updateApplicationStatus } from "@/app/actions";

const statusColors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    ACCEPTED: "bg-emerald-100 text-emerald-700",
    REJECTED: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
    PENDING: "En attente",
    ACCEPTED: "Acceptée",
    REJECTED: "Refusée",
};

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

    const showToast = (msg: string, type: "success" | "error" = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    useEffect(() => {
        getAllApplications().then(data => { setApplications(data as any[]); setLoading(false); });
    }, []);

    const handleStatus = async (id: string, status: string, label: string) => {
        setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
        const res = await updateApplicationStatus(id, status);
        if (res.success) showToast(`Candidature ${label} avec succès`);
        else showToast("Erreur lors de la mise à jour", "error");
    };

    const filtered = applications.filter(a => {
        const matchSearch = search === "" ||
            a.extra?.name?.toLowerCase().includes(search.toLowerCase()) ||
            a.mission?.company?.toLowerCase().includes(search.toLowerCase()) ||
            a.mission?.type?.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filterStatus === "ALL" || a.status === filterStatus;
        return matchSearch && matchFilter;
    });

    return (
        <div className="space-y-8">
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-6 right-6 z-[999] px-6 py-4 rounded-2xl font-bold text-white shadow-2xl ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
                    >
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">
                        Candidatures <span className="text-orange-500">({filtered.length})</span>
                    </h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">Gérez les candidatures des extras aux missions</p>
                </div>

                {/* Stats rapides */}
                <div className="flex gap-4">
                    {["PENDING", "ACCEPTED", "REJECTED"].map(s => (
                        <div key={s} className="text-center bg-white rounded-2xl px-5 py-3 border border-slate-200">
                            <div className="text-2xl font-black text-slate-900">{applications.filter(a => a.status === s).length}</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{statusLabels[s]}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 flex-wrap">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text" placeholder="Rechercher..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        className="bg-white border border-slate-200 rounded-2xl pl-11 pr-5 py-3.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500 w-72"
                    />
                </div>
                <div className="flex gap-2">
                    {["ALL", "PENDING", "ACCEPTED", "REJECTED"].map(s => (
                        <button key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-5 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filterStatus === s ? "bg-slate-900 text-white" : "bg-white text-slate-400 border border-slate-200 hover:border-slate-400"}`}
                        >
                            {s === "ALL" ? "Toutes" : statusLabels[s]}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-20 text-center animate-pulse text-slate-300 font-black italic text-xl">Chargement...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-20 text-center text-slate-400 font-bold">
                        <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
                        Aucune candidature trouvée
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filtered.map(app => (
                            <motion.div key={app.id} layout
                                className="flex items-center justify-between p-6 hover:bg-slate-50 transition-all group"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black">
                                        {app.extra?.name?.[0] || "?"}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 group-hover:text-orange-500 transition-colors">
                                            {app.extra?.name || "Extra inconnu"}
                                        </p>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                            {app.mission?.type} · {app.mission?.company} · {app.mission?.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden md:block">
                                        <p className="text-xs font-bold text-slate-400">
                                            <Clock size={11} className="inline mr-1" />
                                            {new Date(app.createdAt).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-xl ${statusColors[app.status] || "bg-slate-100 text-slate-500"}`}>
                                        {statusLabels[app.status] || app.status}
                                    </span>
                                    {app.status === "PENDING" && (
                                        <div className="flex gap-2">
                                            <button onClick={() => handleStatus(app.id, "ACCEPTED", "acceptée")}
                                                className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 active:scale-95 transition-all">
                                                <Check size={16} strokeWidth={3} />
                                            </button>
                                            <button onClick={() => handleStatus(app.id, "REJECTED", "refusée")}
                                                className="p-3 bg-red-500 text-white rounded-xl shadow-lg shadow-red-500/20 hover:bg-red-600 active:scale-95 transition-all">
                                                <X size={16} strokeWidth={3} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
