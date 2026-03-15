import Link from "next/link";
import { Linkedin, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary pt-40 pb-20 text-white/40 border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient spot */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block text-4xl font-black text-white italic mb-10 font-outfit group">
              Extra<span className="text-accent group-hover:underline decoration-white/20 underline-offset-8 transition-all">Now</span>
            </Link>
            <p className="max-w-xs text-lg font-medium leading-relaxed text-white/50">
              Le standard d'excellence pour le recrutement hôtelier. Chaque talent, chaque établissement, chaque service compte.
            </p>
            <div className="mt-12 flex items-center gap-6">
              <Link href="mailto:contact@extranow.fr" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95 border border-white/10">
                <Mail size={20} />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95 border border-white/10">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95 border border-white/10">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95 border border-white/10">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <p className="text-white font-black uppercase tracking-[0.3em] text-[11px] mb-10 italic">L'Expérience</p>
            <div className="flex flex-col gap-5 font-bold text-sm">
              <Link href="/entreprises" className="hover:text-accent transition-all uppercase tracking-widest text-white/60 hover:translate-x-1 inline-block">Établissements</Link>
              <Link href="/extras" className="hover:text-accent transition-all uppercase tracking-widest text-white/60 hover:translate-x-1 inline-block">Talents</Link>
              <Link href="/faq" className="hover:text-accent transition-all uppercase tracking-widest text-white/60 hover:translate-x-1 inline-block">Questions</Link>
              <Link href="/login" className="hover:text-accent transition-all uppercase tracking-widest text-white/60 hover:translate-x-1 inline-block">Connexion</Link>
            </div>
          </div>
          
          <div>
            <p className="text-white font-black uppercase tracking-[0.3em] text-[11px] mb-10 italic">Juridique</p>
            <div className="flex flex-col gap-5 font-bold text-sm">
              <Link href="/legal/cgu" className="hover:text-accent transition-all uppercase tracking-widest text-white/60 hover:translate-x-1 inline-block">CGU</Link>
              <Link href="/legal/cgv" className="hover:text-accent transition-all uppercase tracking-widest text-white/60 hover:translate-x-1 inline-block">CGV</Link>
              <Link href="/legal/mentions-legales" className="hover:text-accent transition-all uppercase tracking-widest text-white/60 hover:translate-x-1 inline-block">Mentions Légales</Link>
              <Link href="/legal/confidentialite" className="hover:text-accent transition-all uppercase tracking-widest text-white/60 hover:translate-x-1 inline-block">Confidentialité</Link>
            </div>
          </div>
        </div>
        
        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            © {currentYear} Extra Now • Premium Hospitality Hub
          </p>
          <div className="flex items-center gap-8">
             <span className="text-[10px] font-black uppercase tracking-widest text-white/10">Paris / Lyon / Marseille / Bordeaux</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
