"use client";

import { CheckCircle2, Users, Calendar, TrendingUp, ShieldCheck, MessageCircle, Clock, Zap, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] selection:bg-orange-500/30">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full bg-white border-b border-slate-100">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-2xl font-black tracking-tight text-[#0f172a]">
            Extra<span className="text-orange-500 italic">Now</span>
          </div>

          <div className="hidden items-center gap-10 md:flex">
            {[
              { label: "Accueil", href: "/" },
              { label: "Entreprises", href: "/entreprises" },
              { label: "Extras", href: "/extras" },
              { label: "FAQ", href: "/faq" }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-bold text-[#0f172a] transition-all hover:text-orange-500 uppercase tracking-widest"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="rounded-2xl bg-[#0f172a] px-8 py-3 text-sm font-black text-white transition-all hover:bg-slate-800 hover:shadow-xl active:scale-95 uppercase tracking-[0.2em]"
            >
              Admin
            </Link>
          </div>

          <button className="md:hidden text-[#0f172a]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-7 w-7" strokeWidth={2.5} />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-[95vh] flex-col justify-center overflow-hidden bg-[#0f172a] px-6 pt-20 text-white rounded-b-[4rem] shadow-2xl">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]" />

        <div className="mx-auto max-w-6xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-2xl mb-8 backdrop-blur-md"
          >
            <span className="text-orange-500 font-black text-xs uppercase tracking-[0.3em]">Nouveau : Certification Premium 2024</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black tracking-tighter md:text-8xl lg:text-9xl mb-8 italic"
          >
            Trouvez un extra <span className="text-orange-500">qualifié</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-xl text-white/50 md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed"
          >
            La plateforme d'élite pour le recrutement instantané en hôtellerie et restauration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-14 flex flex-wrap justify-center gap-6"
          >
            <Link
              href="/entreprises"
              className="rounded-[2rem] bg-orange-500 px-12 py-6 text-xl font-black transition-all hover:bg-orange-600 hover:shadow-[0_25px_50px_-12px_rgba(249,115,22,0.5)] active:scale-95 uppercase tracking-widest text-white"
            >
              Je suis Pro
            </Link>
            <Link
              href="/extras"
              className="rounded-[2rem] bg-white text-[#0f172a] px-12 py-6 text-xl font-black transition-all hover:shadow-2xl active:scale-95 uppercase tracking-widest"
            >
              Je suis Extra
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with High Visibility */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Talents inscrits", value: "5K+", icon: Users, color: "text-blue-600" },
              { label: "Établissements", value: "1.2K+", icon: Calendar, color: "text-orange-600" },
              { label: "Opérations", value: "15K+", icon: Zap, color: "text-emerald-600" },
              { label: "Score Qualité", value: "4.8/5", icon: TrendingUp, color: "text-indigo-600" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm text-center group hover:border-orange-200 transition-all"
              >
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-50 ${stat.color} mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                  <stat.icon size={32} strokeWidth={2.5} />
                </div>
                <div className="text-4xl font-black text-[#0f172a] tracking-tighter mb-2">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-32 rounded-t-[5rem]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-24 text-center">
            <h2 className="text-6xl font-black text-[#0f172a] tracking-tighter italic">COMMENT ÇA <span className="text-orange-500">MARCHE</span> ?</h2>
            <p className="mt-6 text-lg text-slate-400 font-bold uppercase tracking-[0.3em]">L'efficacité poussée à l'extrême</p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {[
              { title: "Publiez", desc: "Décrivez votre besoin en 30 secondes chrono.", num: "01" },
              { title: "Sélectionnez", desc: "Algorithme de matching haute performance.", num: "02" },
              { title: "Validez", desc: "Profils qualifiés, motivés et disponibles.", num: "03" },
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                className="bg-slate-50 relative p-12 rounded-[3rem] border border-slate-100"
              >
                <div className="text-8xl font-black text-slate-200 absolute top-8 right-8 leading-none opacity-50 italic">
                  {step.num}
                </div>
                <h3 className="text-3xl font-black text-[#0f172a] mb-6 relative z-10">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-lg relative z-10">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-orange-500 rounded-[3rem] p-16 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-orange-500/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.2),transparent_40%)]" />
            <div className="text-center md:text-left relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">Prêt pour demain ?</h2>
              <p className="text-white/80 font-bold text-lg md:text-xl max-w-lg">Rejoignez la communauté de restauration la plus dynamique de France.</p>
            </div>
            <Link href="/login" className="bg-[#0f172a] text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-slate-800 transition-all shadow-xl active:scale-95 uppercase tracking-widest relative z-10">
              Démarrer
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#0f172a] pt-32 pb-16 text-white/40">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="text-4xl font-black text-white mb-10 tracking-widest">
            EXTRA<span className="text-orange-500 italic">NOW</span>
          </div>
          <div className="flex flex-wrap justify-center gap-10 mb-20">
            {["Services", "Procédures", "Sécurité", "Contact", "Légal"].map(link => (
              <a key={link} href="#" className="font-bold uppercase tracking-[0.2em] text-xs hover:text-white transition-all">{link}</a>
            ))}
          </div>
          <div className="pt-10 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.5em]">
            © 2024 Extra Now Platform. High-Performance Hospitality.
          </div>
        </div>
      </footer>
    </div>
  );
}
