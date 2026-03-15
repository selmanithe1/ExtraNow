import { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <header className="bg-white border-b border-border py-6 px-6 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-xl font-black italic flex items-center gap-2 hover:text-accent transition-colors">
                        <ArrowLeft size={20} /> Retour à l'accueil
                    </Link>
                    <div className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
                        <span className="font-outfit italic">Extra<span className="text-accent italic">Now</span></span>
                    </div>
                </div>
            </header>
            
            <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-20">
                <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}
