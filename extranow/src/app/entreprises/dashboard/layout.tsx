"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
    LayoutDashboard, 
    Briefcase, 
    Users, 
    Settings, 
    LogOut,
    Building2,
    PlusCircle
} from "lucide-react";
import { motion } from "framer-motion";

export default function EntrepriseDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    const menu = [
        { icon: LayoutDashboard, label: "Vue d'ensemble", path: "/entreprises/dashboard" },
        { icon: Briefcase, label: "Mes Missions", path: "/entreprises/dashboard/missions" },
        { icon: Users, label: "Candidatures", path: "/entreprises/dashboard/applications" },
        { icon: Settings, label: "Paramètres", path: "/entreprises/dashboard/settings" },
    ];

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 fixed h-full z-20 hidden lg:flex flex-col">
                <div className="p-6 border-b border-slate-100">
                    <Link href="/" className="text-xl font-black tracking-tight flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white rotate-3">E</div>
                        <span className="font-outfit italic text-slate-900">Extra<span className="text-orange-500 italic">Now</span></span>
                    </Link>
                </div>

                <div className="p-6 pb-2 border-b border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center overflow-hidden">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-900">{session?.user?.name || "Entreprise"}</div>
                        <div className="text-xs text-slate-500">{session?.user?.email}</div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 relative">
                    {/* Bouton Créer une mission rapide */}
                    <Link href="/entreprises/dashboard/missions/new" className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 bg-slate-900 text-white hover:bg-orange-500 transition-colors shadow-md group">
                        <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
                        <span className="font-bold">Nouvelle Mission</span>
                    </Link>

                    <div className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4 px-4 pt-2">Menu Principal</div>
                    
                    {menu.map((item) => {
                        const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium relative ${
                                    isActive 
                                    ? "text-orange-600 bg-orange-50" 
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute left-0 top-0 w-1 h-full bg-orange-500 rounded-r-full"
                                    />
                                )}
                                <item.icon size={20} className={isActive ? "stroke-[2.5px]" : "stroke-2"} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-slate-100">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all font-medium"
                    >
                        <LogOut size={20} />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 min-h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-20 flex items-center justify-between">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-black italic">E</div>
                    <button className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </button>
                </header>

                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
