"use client";

import { Settings, Clock, User, Bell, Shield, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function ExtrasSettings() {
    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <div className="flex items-center justify-between">
                <h2 className="text-4xl font-black text-slate-900 italic">Paramètres <span className="text-orange-500">Profil</span></h2>
                <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Shield size={14} /> Compte Sécurisé
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Settings */}
                <div className="space-y-2">
                    {[
                        { icon: User, label: "Profil Public", active: true },
                        { icon: Bell, label: "Notifications", active: false },
                        { icon: Shield, label: "Sécurité", active: false },
                        { icon: LogOut, label: "Compte", active: false, color: "text-red-500" },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${item.active ? "bg-white shadow-md text-orange-500" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
                        >
                            <item.icon size={20} className={item.color} />
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Main Settings Area */}
                <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 bg-slate-50 text-slate-300 rounded-[1.5rem] flex items-center justify-center border-2 border-dashed border-slate-200"
                    >
                        <Settings size={40} />
                    </motion.div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-900">Édition en cours...</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                            <Clock size={16} /> Bientôt disponible
                        </p>
                    </div>
                    <p className="max-w-xs text-slate-400 font-medium text-sm">
                        La gestion complète de votre profil, de vos notifications et de votre sécurité arrive dans la prochaine mise à jour.
                    </p>
                </div>
            </div>
        </div>
    );
}
