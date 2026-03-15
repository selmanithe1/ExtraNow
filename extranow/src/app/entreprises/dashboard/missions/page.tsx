import { getClientMissions } from "@/app/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PlusCircle, Calendar, MapPin, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function EntrepriseMissionsPage() {
    const session = await auth();
    const clientId = (session?.user as any)?.clientId;

    if (!session || (session.user as any)?.role !== "CLIENT") {
        redirect("/login");
    }

    const missions = await getClientMissions(clientId);

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "EN_ATTENTE":
                return "bg-orange-100 text-orange-700 border-orange-200";
            case "CONFIRME":
                return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "TERMINE":
                return "bg-slate-100 text-slate-600 border-slate-200";
            default:
                return "bg-slate-100 text-slate-600 border-slate-200";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "EN_ATTENTE": return "En Attente";
            case "CONFIRME": return "Confirmé";
            case "TERMINE": return "Terminé";
            default: return status;
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mes Missions</h1>
                    <p className="text-slate-500 font-medium">Gérez vos offres et leur statut</p>
                </div>
                <Link 
                    href="/entreprises/dashboard/missions/new" 
                    className="bg-[#0f172a] hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2"
                >
                    <PlusCircle size={20} />
                    Nouvelle Mission
                </Link>
            </div>

            {missions.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Calendar size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Aucune mission</h2>
                    <p className="text-slate-500 font-medium mb-8 max-w-sm mx-auto">Vous n'avez pas encore publié d'offres de mission sur la plateforme.</p>
                    <Link 
                        href="/entreprises/dashboard/missions/new" 
                        className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-[#0f172a] transition-colors"
                    >
                        Publier ma première offre
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {missions.map((mission) => (
                        <div key={mission.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 hover:border-orange-200 transition-colors group">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(mission.status)}`}>
                                    {getStatusLabel(mission.status)}
                                </div>
                                <div className="text-lg font-black text-slate-900">
                                    {mission.amount} €
                                </div>
                            </div>
                            
                            <h3 className="text-2xl font-black text-slate-900 mb-4">{mission.type}</h3>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-slate-500 font-medium">
                                    <Calendar size={18} className="text-slate-400" />
                                    {format(new Date(mission.date), "EEEE d MMMM yyyy", { locale: fr })}
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 font-medium">
                                    <MapPin size={18} className="text-slate-400" />
                                    {mission.location}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                                <div className="text-xs font-bold text-slate-400">
                                    Publiée le {format(new Date(mission.createdAt), "dd/MM/yyyy")}
                                </div>
                                <Link 
                                    href="/entreprises/dashboard/applications" 
                                    className="text-orange-500 font-black hover:text-orange-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                                >
                                    Candidatures &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
