"use client";

import { Users, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function PartnersPlaceholder() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center shadow-inner"
            >
                <Users size={48} strokeWidth={2.5} />
            </motion.div>
            <div className="space-y-2">
                <h2 className="text-4xl font-black text-slate-900 italic">Réseau <span className="text-blue-600">Partenaires</span></h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                    <Clock size={16} /> Arrive Bientôt
                </p>
            </div>
            <p className="max-w-md text-slate-400 font-medium">
                Découvrez les établissements certifiés "Extra Friendly" et bénéficiez davantage exclusifs.
            </p>
        </div>
    );
}
