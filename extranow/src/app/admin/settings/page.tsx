"use client";

import { Settings, Clock, Shield, Database, Users, Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSettings() {
    return (
        <div className="space-y-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Paramètres <span className="text-orange-500">Système</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { icon: Shield, title: "Sécurité & Accès", desc: "Gérez les permissions des administrateurs et les logs de sécurité." },
                    { icon: Database, title: "Base de Données", desc: "Maintenance, sauvegardes et optimisation des performances." },
                    { icon: Users, title: "Modération", desc: "Paramètres de validation automatique des nouveaux profils." },
                    { icon: Bell, title: "Notifications Push", desc: "Configuration des alertes et rappels automatiques." },
                    { icon: Settings, title: "API Configuration", desc: "Gestion des clés d'API et des intégrations tierces." },
                ].map((item, idx) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:border-orange-200 transition-all group"
                    >
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-orange-500 group-hover:bg-orange-50 transition-all mb-6">
                            <item.icon size={28} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-500 text-sm font-medium mb-8">{item.desc}</p>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                            <Clock size={14} /> En développement
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
