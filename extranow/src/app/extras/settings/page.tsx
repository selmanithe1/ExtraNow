"use client";

import { Settings, Clock, User, Bell, Shield, LogOut, DollarSign, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { createStripeConnectAccount } from "@/app/actions";
import { useSession } from "next-auth/react";

export default function ExtrasSettings() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleStripeConnect = async () => {
        setIsLoading(true);
        const result = await createStripeConnectAccount(session?.user?.id as string);
        if (result.success && result.url) {
            window.location.href = result.url;
        } else {
            alert(result.error || "Une erreur est survenue");
            setIsLoading(false);
        }
    };

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
                        { icon: User, label: "Profil Public", active: false },
                        { icon: DollarSign, label: "Paiements (Stripe)", active: true },
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
                        className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[1.5rem] flex items-center justify-center border-2 border-dashed border-emerald-200"
                    >
                        <DollarSign size={40} />
                    </motion.div>
                    <div className="space-y-4 max-w-md">
                        <h3 className="text-2xl font-black text-slate-900">Recevoir vos paiements</h3>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">
                            Pour être payé après vos missions, vous devez configurer un compte sécurisé via <b>Stripe Connect</b>. 
                            C'est gratuit et ça permet de virer vos gains directement sur votre compte bancaire.
                        </p>
                    </div>
                    
                    <button 
                        onClick={handleStripeConnect}
                        disabled={isLoading}
                        className="mt-4 bg-[#635BFF] hover:bg-[#5046e5] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg active:scale-95 flex items-center gap-3 disabled:opacity-50"
                    >
                        {isLoading ? "Configuration en cours..." : "Configurer mon compte Stripe"}
                        {!isLoading && <ExternalLink size={18} />}
                    </button>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">
                        Paiements sécurisés par Stripe
                    </p>
                </div>
            </div>
        </div>
    );
}
