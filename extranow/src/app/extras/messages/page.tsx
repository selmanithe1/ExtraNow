"use client";

import { useSession } from "next-auth/react";
import ChatInterface from "@/components/chat/ChatInterface";
import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
    const { data: session } = useSession();

    if (!session?.user?.id) return null;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                    Vos <span className="text-orange-500 italic">Conversations</span>
                </h1>
                <p className="text-slate-500 font-medium mt-2 text-lg">Échangez directement avec les établissements.</p>
            </div>

            <ChatInterface userId={session.user.id} role="EXTRA" />
        </div>
    );
}
