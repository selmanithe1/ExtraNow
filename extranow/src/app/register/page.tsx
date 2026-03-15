"use client";

import { motion } from "framer-motion";
import { Building2, ArrowRight, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RegisterHubPage() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    // If a type is provided in the URL, we could auto-redirect, but for now we'll just highlight it
    // or let the user choose explicitly. The hub is cleaner.

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
                className="w-full max-w-4xl"
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Rejoindre l'aventure</h1>
                    <p className="text-white/60 font-medium text-lg">Choisissez votre profil pour commencer</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Extra Card */}
                    <Link href="/extras/register">
                         <div className={`bg-white rounded-[2rem] p-10 shadow-2xl border ${type === 'extra' ? 'border-accent ring-4 ring-accent/20' : 'border-slate-100 outline-transparent'} relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer h-full flex flex-col`}>
                            <div className="w-20 h-20 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
                                <UserCircle2 size={40} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Je suis un Talent</h2>
                            <p className="text-slate-500 font-medium mb-8 flex-1">
                                Trouvez des missions flexibles dans les meilleurs établissements. Gérez votre emploi du temps et recevez vos paiements rapidement.
                            </p>
                            <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                                Créer un compte Extra <ArrowRight className="ml-2" size={20} />
                            </div>
                        </div>
                    </Link>

                    {/* Entreprise Card */}
                    <Link href="/entreprises/register">
                        <div className={`bg-white rounded-[2rem] p-10 shadow-2xl border ${type === 'entreprise' ? 'border-orange-500 ring-4 ring-orange-500/20' : 'border-slate-100 outline-transparent'} relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer h-full flex flex-col`}>
                            <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
                                <Building2 size={40} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Je suis un Établissement</h2>
                            <p className="text-slate-500 font-medium mb-8 flex-1">
                                Publiez vos offres de mission en quelques clics et trouvez instantanément du personnel qualifié pour vos services.
                            </p>
                            <div className="flex items-center text-orange-500 font-bold group-hover:translate-x-2 transition-transform">
                                Créer un compte Entreprise <ArrowRight className="ml-2" size={20} />
                            </div>
                        </div>
                    </Link>
                </div>

                <p className="text-center text-slate-500 text-sm font-medium mt-12 bg-white/80 backdrop-blur-md py-4 rounded-full max-w-sm mx-auto shadow-sm">
                    Déjà inscrit ?{" "}
                    <Link href="/login" className="text-accent font-bold hover:underline">
                        Se connecter
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
