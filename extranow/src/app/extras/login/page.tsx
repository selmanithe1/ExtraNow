"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, ChevronLeft, ChevronRight, LogIn, Sparkles, UserCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginExtra } from "@/app/actions";

export default function ExtraLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const result = await loginExtra(email, password);

        if (result.success) {
            router.push("/extras/dashboard");
        } else {
            setError(result.error || "Identifiants incorrects");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden py-20 px-6 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.03] pointer-events-none" />

            <div className="max-w-md w-full relative z-10">
                <div className="mb-10 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-accent font-black transition-all uppercase text-[10px] tracking-widest font-outfit">
                        <ChevronLeft size={16} strokeWidth={3} /> Accueil
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] p-10 shadow-3xl border border-slate-100"
                >
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <LogIn size={36} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-3xl font-black text-[#0f172a] italic mb-2">Back to Action!</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Espace de Connexion Extra</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-slate-900 focus:outline-none focus:border-orange-500 transition-all font-bold placeholder:text-slate-300"
                                    placeholder="votre@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-slate-900 focus:outline-none focus:border-orange-500 transition-all font-bold placeholder:text-slate-300"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-center text-xs font-black italic bg-red-50 py-3 rounded-xl border border-red-100"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-xl active:scale-95 uppercase tracking-widest group"
                        >
                            {isSubmitting ? "Connexion..." : "Se Connecter"}
                            {!isSubmitting && <ChevronRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-10 pt-10 border-t border-slate-50 text-center space-y-4">
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">Vous êtes nouveau ?</p>
                        <Link
                            href="/extras/register"
                            className="inline-flex items-center gap-2 text-orange-500 font-black uppercase text-[10px] tracking-[0.2em] border-b-2 border-orange-500/20 hover:border-orange-500 transition-all pb-1"
                        >
                            Créer mon profil Extra <Sparkles size={14} />
                        </Link>
                    </div>
                </motion.div>

                {/* Proof Panel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 bg-slate-100/50 backdrop-blur-sm rounded-[2rem] p-6 text-center"
                >
                    <div className="flex items-center justify-center gap-3 text-slate-400">
                        <UserCheck size={16} />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Accès Sécurisé • ExtraNow Premium</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
