"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, User, ArrowRight, ShieldCheck, Zap, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminLogin } from "@/app/actions";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        setError(null);
        const result = await adminLogin(email, password);
        setIsLoading(false);
        if (result.success) {
            router.push("/admin");
        } else {
            setError(result.error || "Connexion refusée.");
        }
    };

    const fastLogin = () => {
        setEmail("admin@extranow.fr");
        setPassword("admin123");
        // Trigger login with hardcoded values directly
        setIsLoading(true);
        setError(null);
        adminLogin("admin@extranow.fr", "admin123").then((result) => {
            setIsLoading(false);
            if (result.success) { router.push("/admin"); }
            else { setError(result.error || "Erreur"); }
        });
    };


    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#f97316]/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md p-12 rounded-[2.5rem] relative z-10 shadow-2xl"
            >
                <div className="text-center mb-12">
                    <div className="mx-auto w-20 h-20 bg-[#f97316] rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-orange-500/20">
                        <ShieldCheck size={40} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tight italic">ESPACE ADMIN</h1>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Utilisez <span className="text-[#f97316]">admin@extranow.fr</span></p>
                </div>

                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 ml-1 uppercase tracking-widest font-bold">Identifiant Email</label>
                        <div className="relative group">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#f97316] transition-colors" size={22} strokeWidth={2.5} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-[#f97316] focus:bg-white/10 transition-all text-lg font-bold placeholder:text-white/5"
                                placeholder="admin@extranow.fr"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 ml-1 uppercase tracking-widest">Code d'accès secret</label>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#f97316] transition-colors" size={22} strokeWidth={2.5} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-[#f97316] focus:bg-white/10 transition-all text-lg font-bold placeholder:text-white/5"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="pt-4 space-y-4">
                        {error && (
                            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl px-5 py-4">
                                <AlertCircle size={18} className="shrink-0" />
                                <p className="text-sm font-bold">{error}</p>
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#f97316] hover:bg-[#fb923c] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-4 transition-all hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.5)] active:scale-95 text-lg"
                        >
                            {isLoading ? (
                                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    ACCÉDER AU PANEL <ArrowRight size={24} strokeWidth={3} />
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={fastLogin}
                            className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 uppercase tracking-widest text-xs"
                        >
                            <Zap size={18} className="text-[#f97316]" fill="currentColor" /> Connexion Rapide
                        </button>
                    </div>
                </form>

                <div className="mt-12 text-center">
                    <Link href="/" className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-[0.3em] transition-all border-b border-transparent hover:border-white/20 pb-1">
                        Retour au site public
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
