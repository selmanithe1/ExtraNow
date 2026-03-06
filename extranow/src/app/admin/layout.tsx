import { LayoutDashboard, Users, FileText, Settings, LogOut, Bell } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Sidebar */}
            <aside className="w-72 bg-[#0f172a] hidden md:flex flex-col shadow-2xl">
                <div className="p-8 mb-4">
                    <Link href="/" className="text-2xl font-black text-white hover:opacity-80 transition-opacity">
                        Extra<span className="text-[#f97316]">Now</span>
                        <span className="block text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Plateforme Administration</span>
                    </Link>
                </div>

                <nav className="flex-1 px-6 space-y-2 mt-4">
                    {[
                        { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
                        { icon: Users, label: "Utilisateurs", href: "/admin", active: false },
                        { icon: FileText, label: "Missions", href: "/admin", active: false },
                        { icon: Settings, label: "Paramètres", href: "/admin", active: false },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${item.active
                                ? "bg-[#f97316] text-white shadow-lg shadow-orange-500/20"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon size={22} strokeWidth={2.5} />
                            <span className="font-bold tracking-wide">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-6 mt-auto border-t border-white/5">
                    <Link href="/admin/login" className="flex w-full items-center gap-4 px-5 py-4 rounded-2xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold">
                        <LogOut size={22} strokeWidth={2.5} />
                        <span>Déconnexion</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shadow-sm z-10">
                    <h1 className="text-xl font-bold text-[#0f172a]">Tableau de Bord</h1>
                    <div className="flex items-center gap-6">
                        <button className="p-3 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all relative group">
                            <Bell size={22} strokeWidth={2.5} />
                            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-[#f97316] rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#f97316] to-[#fb923c] flex items-center justify-center font-black text-white text-xs shadow-md">
                                AD
                            </div>
                            <div className="hidden lg:block text-left">
                                <div className="text-sm font-bold text-[#0f172a] leading-none">Administrateur</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">Compte Demo</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-10 bg-[#f8fafc]">
                    {children}
                </div>
            </main>
        </div>
    );
}
