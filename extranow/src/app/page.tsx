"use client";

import {
  CheckCircle2,
  Users,
  Calendar,
  TrendingUp,
  ShieldCheck,
  MessageCircle,
  Clock,
  Zap,
  Menu,
  ArrowRight,
  Sparkles,
  Search,
  Star,
  ChevronDown,
  Building2,
  Briefcase
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => (prev < 5248 ? prev + 127 : 5248));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const logos = [
    "Ritz Paris", "Hilton", "Novotel", "Accor", "Ibis", "Mariott", "Pullman", "Vatel"
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-background selection:bg-accent/30 font-sans overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full glass border-b border-border/50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white rotate-3">E</div>
            <span className="font-outfit italic">Extra<span className="text-accent italic">Now</span></span>
          </motion.div>

          <div className="hidden items-center gap-8 lg:flex">
            {[
              { label: "Accueil", href: "/" },
              { label: "Entreprises", href: "/entreprises" },
              { label: "Extras", href: "/extras" },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-xs font-black text-foreground/70 transition-all hover:text-accent uppercase tracking-widest"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            {session ? (
              <Link
                href="/dashboard"
                className="rounded-2xl bg-accent px-8 py-3.5 text-xs font-black text-white shadow-xl hover:shadow-accent/40 transition-all active:scale-95 uppercase tracking-[0.2em] flex items-center gap-2"
              >
                <ShieldCheck size={16} /> Mon Espace
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-2xl bg-foreground px-8 py-3.5 text-xs font-black text-white shadow-xl hover:shadow-accent/20 transition-all active:scale-95 uppercase tracking-[0.2em] flex items-center gap-2"
              >
                <ShieldCheck size={16} /> Connexion
              </Link>
            )}
          </div>

          <button className="lg:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={28} strokeWidth={2.5} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] glass-dark flex flex-col items-center justify-center p-10 space-y-8 lg:hidden"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white">
              <Menu size={32} />
            </button>
            <Link href="/entreprises" className="text-4xl font-black text-white italic">Entreprises</Link>
            <Link href="/extras" className="text-4xl font-black text-white italic">Extras</Link>
            {session ? (
              <Link href="/dashboard" className="text-xl font-bold text-accent border border-accent rounded-full px-6 py-3">Mon Espace</Link>
            ) : (
              <Link href="/login" className="text-xl font-bold text-accent border border-accent rounded-full px-6 py-3">Connexion</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col justify-center items-center px-6 pt-32 pb-20 overflow-hidden bg-primary overflow-x-hidden">
        {/* Visual Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.03]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-accent/30 rounded-full blur-[150px]"
        />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-10 backdrop-blur-xl"
          >
            <Sparkles size={16} className="text-accent animate-pulse" />
            <span className="text-white font-black text-[10px] uppercase tracking-[0.4em]">Expertise hôtelière certifiée</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl lg:text-[9.5rem] font-black tracking-tight text-white mb-10 leading-[0.9] font-outfit px-4"
          >
            L'Élite de <br />
            <span className="gradient-text italic">l'Hôtellerie</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl text-white/40 font-medium max-w-3xl mx-auto mb-16 leading-relaxed px-4"
          >
            Connectez-vous instantanément aux meilleurs talents de la restauration. Qualité, rapidité, excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 px-4"
          >
            {session ? (
              <Link
                href="/dashboard"
                className="group relative overflow-hidden rounded-3xl bg-accent px-14 py-8 text-xl font-black text-white hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.6)] transition-all active:scale-95 uppercase tracking-widest w-full sm:w-auto text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">Accéder à mon espace <ArrowRight size={24} /></span>
                <motion.div
                  className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                />
              </Link>
            ) : (
              <>
                <Link
                  href="/register?type=entreprise"
                  className="group relative overflow-hidden rounded-3xl bg-accent px-14 py-8 text-xl font-black text-white hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.6)] transition-all active:scale-95 uppercase tracking-widest w-full sm:w-auto text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">Je Recrute <Building2 size={24} /></span>
                  <motion.div
                    className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                  />
                </Link>
                <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                  <Link
                    href="/register?type=extra"
                    className="group rounded-3xl bg-white/5 border border-white/10 px-14 py-8 text-xl font-black text-white hover:bg-white/10 transition-all active:scale-95 uppercase tracking-widest backdrop-blur-md w-full text-center"
                  >
                    <span className="flex items-center justify-center gap-3">Je suis Extra <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" /></span>
                  </Link>
                  <Link
                    href="/login"
                    className="text-xs font-black text-white/30 uppercase tracking-[0.3em] hover:text-accent transition-colors italic"
                  >
                    Déjà inscrit ? <span className="underline decoration-accent/50 underline-offset-4">Se Connecter</span>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-white/20"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Logo Marquee */}
      <section className="py-20 bg-white border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">Ils nous font confiance</p>
        </div>
        <div className="flex gap-20 animate-infinite-scroll overflow-hidden whitespace-nowrap py-4">
          {[...logos, ...logos].map((logo, i) => (
            <span key={i} className="text-4xl md:text-6xl font-black text-slate-200 hover:text-accent transition-colors cursor-default select-none italic font-outfit uppercase">
              {logo}
            </span>
          ))}
        </div>
      </section>

      {/* Stats / Numbers */}
      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Talents Prêts", value: counter, suffix: "+", icon: Zap, color: "bg-orange-50 text-orange-600" },
              { label: "Projets Complétés", value: 15, suffix: "K", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
              { label: "Villes Actives", value: 42, suffix: "", icon: Star, color: "bg-blue-50 text-blue-600" },
              { label: "Satisfaction", value: 4.9, suffix: "/5", icon: TrendingUp, color: "bg-indigo-50 text-indigo-600" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[3rem] border border-border shadow-2xl shadow-slate-200/50 group hover:y-[-10px] transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${stat.color} group-hover:rotate-12 transition-transform`}>
                  <stat.icon size={32} strokeWidth={2.5} />
                </div>
                <div className="text-5xl font-black text-foreground tracking-tight mb-2 font-outfit">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Timeline - Interactive */}
      <section className="py-40 bg-primary rounded-t-[5rem] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-32">
            <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none font-outfit italic">Le futur du <br /><span className="text-accent underline decoration-accent/30 underline-offset-8">recrutement</span>.</h2>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em]">Trois étapes vers l'excellence</p>
          </div>

          <div className="grid gap-20">
            {[
              { step: "01", title: "Publication Intelligente", desc: "Notre IA analyse votre besoin et cible instantanément les profils qui correspondent à l'ADN de votre établissement.", img: "building" },
              { step: "02", title: "Matching de Haute Qualité", desc: "Seuls les extras ayant les compétences vérifiées et les meilleures notes reçoivent votre offre.", img: "stars" },
              { step: "03", title: "Validation & Succès", desc: "Contrat généré, assurance active, et talent sur place. Tout est géré par Extra Now.", img: "rocket" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row items-center gap-20 group"
              >
                <div className="text-[12rem] font-black text-white/5 font-outfit leading-none mb-[-2rem] group-hover:text-accent/10 transition-colors">
                  {item.step}
                </div>
                <div className="max-w-2xl">
                  <h3 className="text-4xl md:text-5xl font-black mb-6 italic text-accent">{item.title}</h3>
                  <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Premium Card */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 p-16 md:p-32 rounded-[5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
            <MessageCircle size={100} className="text-slate-100 absolute -top-5 -left-5 rotate-12" />

            <div className="relative z-10">
              <Star className="text-accent mb-10" fill="currentColor" size={40} />
              <p className="text-3xl md:text-5xl font-black text-foreground italic leading-[1.3] mb-12">
                "Extra Now a totalement révolutionné notre gestion du personnel. Trouver un chef de rang qualifié en plein service est passé d'un cauchemar à un simple clic."
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-200 rounded-2xl overflow-hidden shadow-lg">
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white font-black">JM</div>
                </div>
                <div>
                  <p className="font-black text-xl italic uppercase font-outfit">Jean-Marc Dupont</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Directeur • Le Grand Bistrot</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-40 px-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="max-w-7xl mx-auto bg-primary rounded-[5rem] p-20 md:p-32 text-center relative overflow-hidden shadow-3xl shadow-slate-900/50"
        >
          <div className="absolute inset-0 bg-accent/10 blur-[100px] -animate-pulse" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-9xl font-black text-white mb-10 tracking-tight leading-none italic font-outfit">Êtes-vous <br /><span className="gradient-text">Extra</span> ?</h2>
            {session ? (
              <div className="flex justify-center">
                <Link href="/dashboard" className="bg-white text-primary px-16 py-8 rounded-3xl font-black text-xl hover:scale-105 transition-all uppercase tracking-widest shadow-xl">
                  Retour à mon espace
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-8">
                <Link href="/register?type=entreprise" className="bg-white text-primary px-16 py-8 rounded-3xl font-black text-xl hover:scale-105 transition-all uppercase tracking-widest shadow-xl">
                  Recruter
                </Link>
                <Link href="/register?type=extra" className="bg-accent text-white px-16 py-8 rounded-3xl font-black text-xl hover:scale-105 transition-all uppercase tracking-widest shadow-xl shadow-accent/30">
                  Postuler
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />

      <style jsx global>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                }
                .animate-infinite-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
    </div>
  );
}
