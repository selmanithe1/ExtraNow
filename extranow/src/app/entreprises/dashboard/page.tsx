import { getClientMissions, getClientApplications } from "@/app/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PlusCircle, Star, Users, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export default async function DashboardEntreprise() {
    const session = await auth();
    const clientId = (session?.user as any)?.clientId;

    if (!session || (session.user as any)?.role !== "CLIENT") {
        redirect("/login");
    }

    const [missions, applications] = await Promise.all([
        getClientMissions(clientId),
        getClientApplications(clientId)
    ]);

    const activeMissions = missions.filter(m => m.status === "CONFIRME" || m.status === "EN_ATTENTE");
    const pendingApplications = applications.filter(a => a.status === "PENDING");

    return (
        <div className="p-8">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bonjour, {session.user?.name}</h1>
                    <p className="text-slate-500 font-medium">Voici ce qui se passe aujourd'hui.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-50 flex items-center justify-center text-orange-500">
                            <Star size={24} />
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-slate-900 mb-1">{activeMissions.length}</div>
                        <div className="text-sm font-bold text-slate-500">Missions actives</div>
                    </div>
                </div>

                <div className="bg-[#0f172a] p-6 rounded-[2rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-2xl -z-10 group-hover:scale-110 transition-transform" />
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-orange-400">
                            <Users size={24} />
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white mb-1">{pendingApplications.length}</div>
                        <div className="text-sm font-bold text-slate-400">Candidatures à traiter</div>
                    </div>
                </div>

                <Link href="/entreprises/dashboard/missions/new" className="bg-orange-500 hover:bg-orange-600 transition-colors p-6 rounded-[2rem] shadow-xl text-white flex flex-col justify-center items-center text-center group">
                    <PlusCircle size={40} className="mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-xl font-black mb-1">Publier une Offre</div>
                    <div className="text-sm font-medium opacity-80">Trouvez un extra dès maintenant</div>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Applications */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black text-slate-900">Dernières Candidatures</h2>
                        <Link href="/entreprises/dashboard/applications" className="text-sm font-bold text-orange-500 hover:text-orange-600">Voir tout</Link>
                    </div>

                    <div className="space-y-4">
                        {pendingApplications.length === 0 ? (
                            <div className="text-center py-10 text-slate-500 font-medium bg-slate-50 rounded-2xl">
                                Aucune candidature en attente.
                            </div>
                        ) : (
                            pendingApplications.slice(0, 3).map((app) => (
                                <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 font-black text-xl">
                                            {app.extra?.name?.charAt(0) || "?"}
                                        </div>
                                        <div>
                                            <div className="font-black text-slate-900">{app.extra?.name || "Extra Utilisateur"}</div>
                                            <div className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                                <Clock size={12} />
                                                il y a {formatDistanceToNow(new Date(app.createdAt), { locale: fr })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-slate-900">{app.mission?.type}</div>
                                        <div className="text-xs font-bold text-orange-500">{new Date(app.mission?.date).toLocaleDateString('fr-FR')}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Active Missions */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black text-slate-900">Missions en cours</h2>
                        <Link href="/entreprises/dashboard/missions" className="text-sm font-bold text-orange-500 hover:text-orange-600">Voir tout</Link>
                    </div>

                    <div className="space-y-4">
                        {activeMissions.length === 0 ? (
                            <div className="text-center py-10 text-slate-500 font-medium bg-slate-50 rounded-2xl">
                                Aucune mission active.
                            </div>
                        ) : (
                            activeMissions.slice(0, 3).map((mission) => (
                                <div key={mission.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-black text-slate-900">{mission.type}</span>
                                            {mission.status === "CONFIRME" && (
                                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                            )}
                                            {mission.status === "EN_ATTENTE" && (
                                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                            )}
                                        </div>
                                        <div className="text-xs font-bold text-slate-500">
                                            {new Date(mission.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-slate-900">{mission.amount} €</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            Net
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
