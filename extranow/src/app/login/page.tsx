"use client";

import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UnifiedLoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false, // Prevent default next-auth redirect to handle it manually
            });

            if (result?.error) {
                setError("Email ou mot de passe incorrect");
                setIsLoading(false);
            } else {
                // Redirect to the smart router which will decide where to go based on role
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("Une erreur est survenue");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-96 bg-[#0f172a] -skew-y-6 transform origin-top-left -z-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[100px] rounded-full -z-10" />

            <Link href="/" className="absolute top-8 left-8 text-white font-black tracking-tight flex items-center gap-2 z-10">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center rotate-3">E</div>
                <span className="font-outfit italic">Extra<span className="text-accent italic">Now</span></span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-[2rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent to-orange-400" />
                    
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-orange-50 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
                            <UserCircle2 size={32} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Connexion</h1>
                        <p className="text-slate-500 font-medium mt-2">Accédez à votre espace sécurisé</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Adresse Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-6 font-bold focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all text-slate-900"
                                    placeholder="vous@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-6 font-bold focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all text-slate-900"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#0f172a] hover:bg-accent text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 group mt-2"
                        >
                            {isLoading ? "Vérification..." : "Se connecter"}
                            {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-sm font-medium mt-8">
                        Nouveau sur ExtraNow ?{" "}
                        <Link href="/register" className="text-accent font-bold hover:underline">
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
