"use client";

import { MessageSquare, Send, User, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { getConversations, getMessages, sendMessage, markMessagesAsRead } from "@/app/actions/messages";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface ChatInterfaceProps {
    userId: string;
    role: "CLIENT" | "EXTRA";
}

export default function ChatInterface({ userId, role }: ChatInterfaceProps) {
    const [conversations, setConversations] = useState<any[]>([]);
    const [activeConvId, setActiveConvId] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial load of conversations
    const loadConversations = async () => {
        const res = await getConversations(userId, role);
        if (res.success && res.conversations) {
            setConversations(res.conversations);
            // Auto-select first conversation if none selected
            if (!activeConvId && res.conversations.length > 0) {
                setActiveConvId(res.conversations[0].id);
            }
        }
        setIsLoading(false);
    };

    // Load messages for active conversation
    const loadMessages = async () => {
        if (!activeConvId) return;
        const res = await getMessages(activeConvId);
        if (res.success && res.messages) {
            setMessages(res.messages);
            await markMessagesAsRead(activeConvId, userId);
        }
    };

    // Polling setup
    useEffect(() => {
        loadConversations();
        const convInterval = setInterval(loadConversations, 10000); // Check for new conversations every 10s
        return () => clearInterval(convInterval);
    }, [userId, role]);

    useEffect(() => {
        if (activeConvId) {
            loadMessages();
            const msgInterval = setInterval(loadMessages, 3000); // Check for new messages every 3s
            return () => clearInterval(msgInterval);
        }
    }, [activeConvId]);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !activeConvId) return;

        const text = inputText;
        setInputText(""); // Optimistic clear
        
        // Optimistic UI update
        const optimisticMsg = {
            id: Date.now().toString(),
            senderId: userId,
            text,
            createdAt: new Date(),
            read: false
        };
        setMessages(prev => [...prev, optimisticMsg]);

        const res = await sendMessage(activeConvId, userId, text);
        if (!res.success) {
            // Revert on failure (simplified)
            loadMessages();
        }
    };

    const activeConv = conversations.find(c => c.id === activeConvId);

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500 font-bold animate-pulse">Chargement de vos messages...</div>;
    }

    if (conversations.length === 0) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center bg-white rounded-[3rem] border border-slate-100 shadow-sm text-center p-10">
                <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-[2rem] flex items-center justify-center mb-6">
                    <MessageSquare size={48} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Aucun message</h2>
                <p className="text-slate-500 font-medium max-w-sm">
                    {role === "CLIENT" 
                        ? "Contactez directement les extras qui ont postulé à vos offres."
                        : "Vous n'avez pas encore été contacté par un établissement."}
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-[75vh] bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
            {/* Sidebar: Conversations List */}
            <div className="w-1/3 border-r border-slate-100 bg-slate-50/50 flex flex-col">
                <div className="p-6 border-b border-slate-100 bg-white">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {conversations.map(conv => {
                        const otherParty = role === "CLIENT" ? conv.extra.name : (conv.client.companyName || conv.client.name);
                        const lastMsg = conv.messages[0];
                        const isUnread = lastMsg && !lastMsg.read && lastMsg.senderId !== userId;

                        return (
                            <button
                                key={conv.id}
                                onClick={() => setActiveConvId(conv.id)}
                                className={`w-full text-left p-4 rounded-[1.5rem] transition-all flex items-start gap-4 ${activeConvId === conv.id ? "bg-white shadow-md border border-slate-100" : "hover:bg-white/60 text-slate-500"}`}
                            >
                                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-black text-xl flex-shrink-0">
                                    {otherParty?.charAt(0) || "?"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className={`font-black truncate ${isUnread ? "text-slate-900" : ""}`}>
                                            {otherParty}
                                        </div>
                                        {lastMsg && (
                                            <div className="text-[10px] font-bold text-slate-400 whitespace-nowrap ml-2">
                                                {formatDistanceToNow(new Date(lastMsg.createdAt), { locale: fr, addSuffix: false })}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xs font-bold text-slate-400 truncate mb-1">
                                        {conv.mission?.type || "Mission générale"}
                                    </div>
                                    {lastMsg && (
                                        <div className={`text-sm truncate ${isUnread ? "font-bold text-slate-900" : "text-slate-500"}`}>
                                            {lastMsg.senderId === userId ? "Vous: " : ""}{lastMsg.text}
                                        </div>
                                    )}
                                </div>
                                {isUnread && <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {activeConv ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg font-black text-xl">
                                    {(role === "CLIENT" ? activeConv.extra.name : (activeConv.client.companyName || activeConv.client.name))?.charAt(0) || "?"}
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">
                                        {role === "CLIENT" ? activeConv.extra.name : (activeConv.client.companyName || activeConv.client.name)}
                                    </h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <Clock size={12} /> {activeConv.mission?.type || "Contact direct"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:20px_20px]">
                            {messages.map((msg, idx) => {
                                const isMe = msg.senderId === userId;
                                return (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex flex-col ${isMe ? "items-end" : "items-start"} w-full`}
                                    >
                                        <div className={`max-w-[70%] p-5 rounded-[2rem] font-medium text-[15px] leading-relaxed shadow-sm ${isMe ? "bg-[#0f172a] text-white rounded-tr-none" : "bg-slate-100 text-slate-800 rounded-tl-none"}`}>
                                            {msg.text.split('\n').map((line: string, i: number) => (
                                                <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                                            ))}
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400 mt-2 px-2 flex items-center gap-2">
                                            {formatDistanceToNow(new Date(msg.createdAt), { locale: fr, addSuffix: true })}
                                            {isMe && msg.read && <span className="text-emerald-500 font-black">✓ Lu</span>}
                                        </div>
                                    </motion.div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-100">
                            <div className="relative flex items-center gap-4">
                                <input
                                    type="text"
                                    placeholder="Écrivez votre message..."
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                />
                                <button 
                                    disabled={!inputText.trim()}
                                    type="submit" 
                                    className="bg-orange-500 text-white p-4 rounded-2xl hover:bg-orange-600 transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:hover:bg-orange-500"
                                >
                                    <Send size={24} />
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-400 font-bold">
                        Sélectionnez une conversation pour commencer
                    </div>
                )}
            </div>
        </div>
    );
}
