"use client";

import { motion } from "framer-motion";
import { Gamepad2, Star, CheckCircle2, ChevronRight, Trophy, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { getSkillsTests, getLatestExtra } from "@/app/actions";
import Link from "next/link";

export default function SkillsPage() {
    const [tests, setTests] = useState<any[]>([]);
    const [extra, setExtra] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getSkillsTests(), getLatestExtra()]).then(([testsData, extraData]) => {
            setTests(testsData);
            setExtra(extraData);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-10 text-slate-400 font-bold animate-pulse">Chargement du centre de compétences...</div>;

    return (
        <div className="space-y-12">
            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <Trophy size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score Moyen</p>
                        <p className="text-2xl font-black text-slate-900 italic">85%</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                        <BookOpen size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tests Complétés</p>
                        <p className="text-2xl font-black text-slate-900 italic">2 / {tests.length}</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
                    <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                        <Star size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Niveau Talent</p>
                        <p className="text-2xl font-black text-slate-900 italic">Expert</p>
                    </div>
                </div>
            </div>

            {/* Tests List */}
            <div className="space-y-6">
                <h2 className="text-2xl font-black text-slate-900 italic">Tests <span className="text-emerald-500">Disponibles</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tests.map((test, idx) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl hover:border-emerald-200 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] -z-10" />
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 bg-slate-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                    <Gamepad2 size={24} />
                                </div>
                                <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">{test.category}</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3">{test.title}</h3>
                            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                                {test.description}
                            </p>
                            <Link
                                href={`/extras/skills/${test.id}`}
                                className="inline-flex items-center gap-3 bg-slate-900 text-white font-black px-8 py-4 rounded-2xl hover:bg-emerald-500 transition-all group/btn active:scale-95 shadow-lg shadow-slate-900/10"
                            >
                                COMMENCER LE TEST
                                <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
