"use client";

import { LayoutDashboard, Users, FileText, Settings, LogOut, Bell, BarChart2, Briefcase } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");

    const isActive = (href: string, matchTab?: string) => {
        if (matchTab) return pathname === "/admin" && tab === matchTab;
        if (href === "/admin" && !matchTab) return pathname === "/admin" && !tab;
        return pathname.startsWith(href) && href !== "/admin";
    };

    const navGroups = [
        {
            label: "Principal",
            items: [
                { icon: LayoutDashboard, label: "Dashboard", href: "/admin", tab: undefined },
                { icon: BarChart2, label: "Analytiques", href: "/admin/analytics" },
                { icon: Bell, label: "Notifications", href: "/admin/notifications" },
            ]
        },
        {
            label: "Gestion",
            items: [
                { icon: Users, label: "Extras", href: "/admin", tab: "extras" },
                { icon: FileText, label: "Missions", href: "/admin", tab: "missions" },
                { icon: Briefcase, label: "Candidatures", href: "/admin/applications" },
            ]
        },
        {
            label: "Système",
            items: [
                { icon: Settings, label: "Paramètres", href: "/admin/settings" },
            ]
        }
    ];

    const pageTitle: Record<string, string> = {
        "/admin/analytics": "Analytiques",
        "/admin/notifications": "Notifications",
        "/admin/applications": "Candidatures",
        "/admin/settings": "Paramètres",
    };

    const currentTitle = pageTitle[pathname] || (tab ? { extras: "Extras", missions: "Missions" }[tab] || "Dashboard" : "Dashboard");

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Sidebar */}
            <aside className="w-72 bg-[#0f172a] hidden md:flex flex-col shadow-2xl fixed h-full z-50">
                <div className="p-8 mb-2">
                    <Link href="/" className="text-2xl font-black text-white hover:opacity-80 transition-opacity">
                        Extra<span className="text-[#f97316]">Now</span>
                        <span className="block text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Plateforme Administration</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-6 mt-2 overflow-y-auto">
                    {navGroups.map(group => (
                        <div key={group.label}>
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] px-4 mb-2">{group.label}</p>
                            <div className="space-y-1">
                                {group.items.map(item => {
                                    const href = item.tab ? `${item.href}?tab=${item.tab}` : item.href;
                                    const active = isActive(item.href, item.tab);
                                    return (
                                        <Link key={href} href={href}
                                            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 ${active
                                                ? "bg-[#f97316] text-white shadow-lg shadow-orange-500/20"
                                                : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                                        >
                                            <item.icon size={20} strokeWidth={2.5} />
                                            <span className="font-bold text-sm">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Link href="/admin/login"
                        className="flex w-full items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all font-bold text-sm">
                        <LogOut size={20} strokeWidth={2.5} />
                        <span>Déconnexion</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden ml-72">
                {/* Header */}
                <header className="h-18 bg-white border-b border-slate-200 flex items-center justify-between px-10 py-4 shadow-sm z-10 sticky top-0">
                    <div>
                        <h1 className="text-lg font-black text-[#0f172a]">{currentTitle}</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ExtraNow Admin</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/admin/notifications" className="p-3 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-orange-500 transition-all relative">
                            <Bell size={20} strokeWidth={2.5} />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
                        </Link>
                        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
                            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-[#f97316] to-[#fb923c] flex items-center justify-center font-black text-white text-xs shadow">AD</div>
                            <div className="hidden lg:block">
                                <div className="text-xs font-black text-[#0f172a]">Administrateur</div>
                                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">admin@extranow.fr</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-8 bg-[#f8fafc]">{children}</div>
            </main>
        </div>
    );
}
