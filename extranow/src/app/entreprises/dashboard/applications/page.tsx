import { getClientApplications, updateApplicationStatusByClient } from "@/app/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CheckCircle2, XCircle, Users, Clock, Star, ShieldCheck, Mail, MapPin, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function EntrepriseApplicationsPage() {
    const session = await auth();
    const clientId = (session?.user as any)?.clientId;

    if (!session || (session.user as any)?.role !== "CLIENT") {
        redirect("/login");
    }

    const applications = await getClientApplications(clientId);

    const pendingApps = applications.filter(a => a.status === "PENDING");
    const otherApps = applications.filter(a => a.status !== "PENDING");

    const ApplicationCard = ({ app }: { app: any }) => (
        <div key={app.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 hover:border-orange-200 transition-colors flex flex-col justify-between group">
            <div>
                <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
                    <div>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Candidature pour</div>
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-500 transition-colors">{app.mission.type}</h3>
                        <div className="text-slate-500 text-sm font-bold flex items-center gap-2 mt-2">
                            <Clock size={16} /> Le {format(new Date(app.mission.date), "dd/MM/yyyy")}
                        </div>
                    </div>
                    {app.status === "PENDING" && (
                        <div className="bg-orange-100 text-orange-700 font-black text-[10px] px-3 py-1 rounded-lg uppercase tracking-widest">
                            Nouvelle
                        </div>
                    )}
                    {app.status === "ACCEPTED" && (
                        <div className="bg-emerald-100 text-emerald-700 font-black text-[10px] px-3 py-1 rounded-lg uppercase tracking-widest">
                            Acceptée
                        </div>
                    )}
                    {app.status === "REJECTED" && (
                        <div className="bg-red-100 text-red-700 font-black text-[10px] px-3 py-1 rounded-lg uppercase tracking-widest">
                            Refusée
                        </div>
                    )}
                </div>

                <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl font-black text-slate-500">
                        {app.extra.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            {app.extra.name}
                            {app.extra.status === "ACTIF" && <ShieldCheck size={18} className="text-emerald-500" />}
                        </h4>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-500 mt-1">
                            {app.extra.city && <span className="flex items-center gap-1"><MapPin size={14} /> {app.extra.city}</span>}
                            <span className="flex items-center gap-1"><Star size={14} className="text-orange-500" /> {app.extra.rating}/5</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-slate-50 rounded-xl p-4 text-sm font-medium text-slate-700 italic border border-slate-100 relative">
                    <span className="absolute -top-3 left-4 text-4xl text-orange-200">"</span>
                    <p className="relative z-10 break-words line-clamp-2">
                        {app.extra.bio || "Aucune description fournie par cet extra."}
                    </p>
                </div>
            </div>

            {app.status === "PENDING" ? (
                <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
                    <form action={async () => {
                        "use server";
                        await updateApplicationStatusByClient(app.id, "ACCEPTED", clientId);
                    }} className="flex-1">
                        <button className="w-full bg-[#0f172a] hover:bg-emerald-500 text-white py-3 rounded-xl font-black transition-colors flex items-center justify-center gap-2">
                            <CheckCircle2 size={18} /> Accepter
                        </button>
                    </form>
                    <form action={async () => {
                        "use server";
                        await updateApplicationStatusByClient(app.id, "REJECTED", clientId);
                    }} className="flex-1">
                        <button className="w-full bg-slate-100 hover:bg-red-500 text-slate-600 hover:text-white py-3 rounded-xl font-black transition-colors flex items-center justify-center gap-2">
                            <XCircle size={18} /> Refuser
                        </button>
                    </form>
                </div>
            ) : (
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
                    {app.status === "ACCEPTED" && (
                        <form action={async () => {
                            "use server";
                            const { createConversation } = await import("@/app/actions/messages");
                            await createConversation(clientId, app.extraId, app.missionId);
                            redirect("/entreprises/dashboard/messages");
                        }}>
                            <button className="text-[#0f172a] bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg text-sm font-black flex items-center gap-2 transition-colors inline-block w-full">
                                <MessageSquare size={16} /> Contacter {app.extra.name}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="p-8">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Candidatures</h1>
                    <p className="text-slate-500 font-medium">Gérez les extras qui ont postulé à vos missions</p>
                </div>
            </div>

            {applications.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Users size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Aucune candidature</h2>
                    <p className="text-slate-500 font-medium max-w-sm mx-auto">Vous n'avez pas encore reçu de candidatures pour vos missions.</p>
                </div>
            ) : (
                <>
                    {pendingApps.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-6">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                Nouvelles Candidatures ({pendingApps.length})
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {pendingApps.map(app => <ApplicationCard key={app.id} app={app} />)}
                            </div>
                        </div>
                    )}

                    {otherApps.length > 0 && (
                        <div>
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-6">
                                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                                Historique ({otherApps.length})
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 opacity-75 hover:opacity-100 transition-opacity">
                                {otherApps.map(app => <ApplicationCard key={app.id} app={app} />)}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
