"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Shield, Database, Users, Bell, Toggle, Save, Eye, EyeOff, RefreshCw } from "lucide-react";

export default function AdminSettings() {
    const [adminEmail, setAdminEmail] = useState("admin@extranow.fr");
    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [commission, setCommission] = useState("15");
    const [registrationsOpen, setRegistrationsOpen] = useState(true);
    const [autoApprove, setAutoApprove] = useState(false);
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);

    const showToast = (msg: string, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSaveCredentials = () => {
        if (!adminEmail.includes("@")) { showToast("Email invalide", "error"); return; }
        if (newPwd && newPwd !== confirmPwd) { showToast("Les mots de passe ne correspondent pas", "error"); return; }
        if (newPwd && newPwd.length < 6) { showToast("Mot de passe trop court (min. 6 caractères)", "error"); return; }
        showToast("Identifiants mis à jour ✓");
        setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
    };

    const handleSavePlatform = () => {
        const c = parseFloat(commission);
        if (isNaN(c) || c < 0 || c > 100) { showToast("Commission invalide (0-100%)", "error"); return; }
        showToast("Paramètres plateforme sauvegardés ✓");
    };

    return (
        <div className="space-y-8 max-w-3xl">
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-6 right-6 z-[999] px-6 py-4 rounded-2xl font-bold text-white shadow-2xl ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Paramètres <span className="text-orange-500">Système</span></h2>
                <p className="text-slate-500 text-sm font-medium mt-1">Configuration de la plateforme ExtraNow</p>
            </div>

            {/* ── Credentials ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-slate-900 rounded-2xl text-white"><Shield size={22} /></div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900">Identifiants Admin</h3>
                        <p className="text-sm text-slate-500 font-medium">Modifier l'email et le mot de passe administrateur</p>
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Email Admin</label>
                    <input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-5 font-bold text-slate-900 focus:outline-none focus:border-orange-500 transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Nouveau mot de passe</label>
                        <div className="relative">
                            <input type={showPwd ? "text" : "password"} value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-5 pr-12 font-bold text-slate-900 focus:outline-none focus:border-orange-500 transition-all" />
                            <button onClick={() => setShowPwd(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Confirmer</label>
                        <input type={showPwd ? "text" : "password"} value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} placeholder="••••••••"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-5 font-bold text-slate-900 focus:outline-none focus:border-orange-500 transition-all" />
                    </div>
                </div>

                <button onClick={handleSaveCredentials}
                    className="flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all">
                    <Save size={16} /> Enregistrer
                </button>
            </motion.div>

            {/* ── Platform Settings ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-orange-500 rounded-2xl text-white"><Settings size={22} /></div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900">Paramètres Plateforme</h3>
                        <p className="text-sm text-slate-500 font-medium">Commission, inscriptions et modération automatique</p>
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Commission plateforme (%)</label>
                    <div className="flex gap-3 items-center">
                        <input type="number" min="0" max="100" value={commission} onChange={e => setCommission(e.target.value)}
                            className="w-32 bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-5 font-black text-slate-900 text-lg focus:outline-none focus:border-orange-500 transition-all text-center" />
                        <span className="text-slate-400 font-black text-lg">%</span>
                        <span className="text-sm font-medium text-slate-500">appliqué à chaque mission</span>
                    </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                    {[
                        { label: "Inscriptions ouvertes", desc: "Permettre aux nouveaux extras de s'inscrire", value: registrationsOpen, set: setRegistrationsOpen },
                        { label: "Validation automatique", desc: "Approuver automatiquement les nouveaux profils", value: autoApprove, set: setAutoApprove },
                        { label: "Notifications email", desc: "Envoyer des emails à la création de missions", value: emailNotifs, set: setEmailNotifs },
                    ].map(toggle => (
                        <div key={toggle.label} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl">
                            <div>
                                <p className="font-black text-slate-900 text-sm">{toggle.label}</p>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">{toggle.desc}</p>
                            </div>
                            <button onClick={() => toggle.set((p: boolean) => !p)}
                                className={`w-14 h-7 rounded-full transition-all duration-300 relative ${toggle.value ? "bg-orange-500" : "bg-slate-200"}`}>
                                <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-1 transition-all duration-300 ${toggle.value ? "left-8" : "left-1"}`} />
                            </button>
                        </div>
                    ))}
                </div>

                <button onClick={handleSavePlatform}
                    className="flex items-center gap-2 px-7 py-3.5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all">
                    <Save size={16} /> Enregistrer
                </button>
            </motion.div>

            {/* ── DB Info ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-[2.5rem] border border-slate-200 p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600"><Database size={22} /></div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900">Base de Données</h3>
                        <p className="text-sm text-slate-500 font-medium">Informations sur la base SQLite</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Type", value: "SQLite (Prisma)" },
                        { label: "Fichier", value: "prisma/dev.db" },
                        { label: "ORM", value: "Prisma 6.x" },
                        { label: "Statut", value: "✅ Connectée" },
                    ].map(info => (
                        <div key={info.label} className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{info.label}</p>
                            <p className="font-black text-slate-900 mt-1 text-sm">{info.value}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
