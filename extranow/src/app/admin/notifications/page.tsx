"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Users, Briefcase, FileText, RefreshCw, CheckCheck } from "lucide-react";
import { getSystemNotifications } from "@/app/actions";

const typeIcons: Record<string, any> = {
    extra: Users,
    mission: Briefcase,
    application: FileText,
};
const typeColors: Record<string, string> = {
    extra: "bg-blue-100 text-blue-600",
    mission: "bg-orange-100 text-orange-600",
    application: "bg-emerald-100 text-emerald-600",
};

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [read, setRead] = useState<Set<string>>(new Set());

    const fetchNotifs = async () => {
        setLoading(true);
        const res = await getSystemNotifications();
        setNotifications(res.data as any[]);
        setLoading(false);
    };

    useEffect(() => { fetchNotifs(); }, []);

    const markAllRead = () => setRead(new Set(notifications.map(n => n.id)));
    const markRead = (id: string) => setRead(prev => new Set([...prev, id]));

    const unreadCount = notifications.filter(n => !read.has(n.id)).length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">
                        Notifications <span className="text-orange-500">({unreadCount} non lues)</span>
                    </h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">Activité récente sur la plateforme</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchNotifs}
                        className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-600 hover:border-orange-500 hover:text-orange-500 transition-all">
                        <RefreshCw size={16} /> Actualiser
                    </button>
                    <button onClick={markAllRead}
                        className="flex items-center gap-2 px-5 py-3 bg-slate-900 rounded-2xl text-sm font-black text-white hover:bg-orange-500 transition-all">
                        <CheckCheck size={16} /> Tout marquer lu
                    </button>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-20 text-center animate-pulse text-slate-300 font-black italic text-xl">Chargement...</div>
                ) : notifications.length === 0 ? (
                    <div className="p-20 text-center text-slate-400 font-bold">
                        <Bell size={48} className="mx-auto mb-4 opacity-20" />
                        Aucune notification récente.<br />
                        <span className="text-sm opacity-70">Les nouvelles activités (inscriptions, missions, candidatures) apparaîtront ici.</span>
                    </div>
                ) : (
                    <AnimatePresence>
                        <div className="divide-y divide-slate-100">
                            {notifications.map((notif, i) => {
                                const Icon = typeIcons[notif.type] || Bell;
                                const isRead = read.has(notif.id);
                                return (
                                    <motion.div key={notif.id}
                                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        onClick={() => markRead(notif.id)}
                                        className={`flex items-center gap-5 p-6 cursor-pointer transition-all ${isRead ? "opacity-50" : "hover:bg-slate-50"}`}
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${typeColors[notif.type] || "bg-slate-100 text-slate-500"}`}>
                                            <Icon size={22} strokeWidth={2.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-bold text-sm ${isRead ? "text-slate-400" : "text-slate-900"}`}>{notif.message}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                                {new Date(notif.time).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        {!isRead && (
                                            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shrink-0" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
