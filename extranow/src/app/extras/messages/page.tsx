"use client";

import { MessageSquare, Send, User, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getLatestExtra } from "@/app/actions";

export default function MessagesPage() {
    const [extra, setExtra] = useState<any>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getLatestExtra().then(setExtra);
    }, []);

    const welcomeMessage = {
        sender: "ExtraNow Admin",
        text: `Bienvenue ${extra?.name || "parmi nous"} ! 👋\n\nNous sommes ravis de vous compter dans l'élite de la restauration. Votre profil est actuellement en cours de certification. En attendant, n'hésitez pas à explorer les missions disponibles !`,
        time: "À l'instant",
        isAdmin: true
    };

    return (
        <div className="h-[75vh] flex flex-col bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-900 italic">Support Admin</h2>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">En ligne</p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:20px_20px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-start gap-3 max-w-[80%]"
                >
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{welcomeMessage.sender}</span>
                        <span className="text-[9px] font-bold text-slate-300">• {welcomeMessage.time}</span>
                    </div>
                    <div className="bg-slate-100 p-6 rounded-[2rem] rounded-tl-none text-slate-700 font-medium leading-relaxed shadow-sm">
                        {welcomeMessage.text.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Input Area */}
            <div className="p-8 bg-white border-t border-slate-50">
                <div className="relative flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Écrivez votre message..."
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 font-bold focus:outline-none focus:border-orange-500 transition-all"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="bg-slate-900 text-white p-5 rounded-2xl hover:bg-orange-500 transition-all active:scale-95 shadow-xl">
                        <Send size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
