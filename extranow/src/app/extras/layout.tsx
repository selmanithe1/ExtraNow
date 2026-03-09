"use client";

import { motion } from "framer-motion";
import {
    BarChart3,
    MessageSquare,
    Briefcase,
    Users,
    Gamepad2,
    Settings,
    LogOut,
    ChevronRight,
    Bell,
    User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getLatestExtra } from "@/app/actions";

export default function ExtraLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [extra, setExtra] = useState<any>(null);

    useEffect(() => {
        getLatestExtra().then(setExtra);
    }, []);

    const menuItems = [
        { label: "Tableau de bord", icon: BarChart3, href: "/extras/dashboard" },
        { label: "Missions", icon: Briefcase, href: "/extras/missions" },
        { label: "Messages", icon: MessageSquare, href: "/extras/messages" },
        { label: "Partenaires", icon: Users, href: "/extras/partners" },
        { label: "Compétences", icon: Gamepad2, href: "/extras/skills" },
    ];

    if (pathname === "/extras/register" || pathname === "/extras") return children;

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            {/* Sidebar */}
            <aside className="w-80 bg-[#0f172a] text-white flex flex-col p-8 fixed h-full z-40">
                <div className="text-2xl font-black mb-16 tracking-tight">
                    Extra<span className="text-orange-500 italic">Now</span>
                </div>

                <nav className="flex-1 space-y-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${pathname === item.href
                                ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <item.icon size={22} strokeWidth={pathname === item.href ? 3 : 2} />
                                <span className="font-bold uppercase tracking-widest text-[10px]">{item.label}</span>
                            </div>
                            <ChevronRight size={16} className={`transition-transform ${pathname === item.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto space-y-4">
                    <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black relative overflow-hidden group border border-white/10">
                                {extra?.avatarUrl && extra.avatarUrl !== "simulated_avatar_url" ? (
                                    <img src={extra.avatarUrl} className="w-full h-full object-cover" alt="Profile" />
                                ) : (
                                    <span className="text-white">
                                        {extra?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || "EX"}
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <User size={14} />
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-black truncate max-w-[120px]">{extra?.name || "Chargement..."}</p>
                                <p className="text-[10px] text-slate-500 font-bold">Extra Premium</p>
                            </div>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 w-[75%]" />
                        </div>
                        <p className="text-[9px] font-black text-slate-500 uppercase mt-2">Niveau 4 • 7500 XP</p>
                    </div>

                    <button className="flex items-center gap-3 p-4 text-slate-500 hover:text-red-400 font-bold uppercase tracking-widest text-[10px] transition-colors w-full">
                        <LogOut size={18} /> Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-80 p-10">
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight italic capitalize">
                            {pathname.split("/").pop()?.replace("dashboard", "Aperçu général")}
                        </h1>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">Plateforme Interne • Session Active</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-orange-500 hover:border-orange-200 transition-all relative shadow-sm">
                            <Bell size={22} />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="h-10 w-px bg-slate-200" />
                        <Link href="/extras/settings" className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                            <Settings size={22} />
                        </Link>
                    </div>
                </header>

                <div className="relative z-10">
                    {children}
                </div>

                {/* Decorative background elements */}
                <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
                <div className="fixed bottom-0 left-80 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />
            </main>
        </div>
    );
}
