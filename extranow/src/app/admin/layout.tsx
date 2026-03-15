"use client";

import { LayoutDashboard, Users, FileText, Settings, LogOut, Bell, BarChart2, Briefcase, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");
    const router = useRouter();
    const { data: session, status } = useSession();
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Auth guard
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
        if (status === "authenticated" && (session?.user as any)?.role !== "ADMIN") {
            router.replace("/login");
        }
    }, [status, session, pathname, router]);

    // Close mobile sidebar on navigation
    useEffect(() => {
        setMobileSidebarOpen(false);
    }, [pathname, tab]);

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/login" });
    };

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
    const adminEmail = (session?.user as any)?.email || "admin@extranow.fr";
    const adminInitials = adminEmail.slice(0, 2).toUpperCase();

    // Show loading while checking auth
    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            </div>
        );
    }

    // ─── Sidebar content (shared for desktop + mobile overlay) ───────
    const SidebarContent = () => (
        <>
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
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all font-bold text-sm"
                >
                    <LogOut size={20} strokeWidth={2.5} />
                    <span>Déconnexion</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Desktop Sidebar */}
            <aside className="w-72 bg-[#0f172a] hidden md:flex flex-col shadow-2xl fixed h-full z-50">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileSidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 z-[60] md:hidden"
                        />
                        {/* Sidebar Panel */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 h-full w-72 bg-[#0f172a] z-[70] flex flex-col shadow-2xl md:hidden"
                        >
                            <button
                                onClick={() => setMobileSidebarOpen(false)}
                                className="absolute top-5 right-5 p-2 text-white/40 hover:text-white transition-colors"
                            >
                                <X size={22} />
                            </button>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden md:ml-72">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-10 py-4 shadow-sm z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-all"
                        >
                            <Menu size={22} strokeWidth={2.5} />
                        </button>
                        <div>
                            <h1 className="text-lg font-black text-[#0f172a]">{currentTitle}</h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">ExtraNow Admin</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/admin/notifications" className="p-3 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-orange-500 transition-all relative">
                            <Bell size={20} strokeWidth={2.5} />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
                        </Link>
                        <div className="flex items-center gap-3 bg-slate-50 px-3 md:px-4 py-2.5 rounded-2xl border border-slate-100">
                            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-[#f97316] to-[#fb923c] flex items-center justify-center font-black text-white text-xs shadow">{adminInitials}</div>
                            <div className="hidden lg:block">
                                <div className="text-xs font-black text-[#0f172a]">Administrateur</div>
                                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{adminEmail}</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-4 md:p-8 bg-[#f8fafc]">{children}</div>
            </main>
        </div>
    );
}
