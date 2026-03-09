"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
    User, Mail, Phone, MapPin, Calendar,
    Briefcase, GraduationCap, FileText, Upload,
    ChevronRight, ChevronLeft, CheckCircle2, Download,
    Camera, FileDown
} from "lucide-react";
import Link from "next/link";
import { registerExtra } from "@/app/actions";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";

export default function ExtraRegistrationPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const resumeRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        birthDate: "",
        skills: "",
        experience: "",
        bio: "",
        cvUrl: "",
        avatarUrl: "",
        password: ""
    });

    const [previews, setPreviews] = useState({
        avatar: "",
        cvName: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'avatar') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (type === 'avatar') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(p => ({ ...p, avatar: reader.result as string }));
                setFormData(f => ({ ...f, avatarUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        } else {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(f => ({ ...f, cvUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
            setPreviews(p => ({ ...p, cvName: file.name }));
        }
    };

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const result = await registerExtra(formData);

        if (result.success) {
            setIsSuccess(true);
            setTimeout(() => {
                router.push("/extras/dashboard");
            }, 3000);
        } else {
            setError(result.error || "Une erreur est survenue");
        }
        setIsSubmitting(false);
    };

    const downloadPDF = async () => {
        try {
            console.log("Starting PDF generation...");
            if (!resumeRef.current) {
                console.error("resumeRef.current is null");
                return;
            }

            const element = resumeRef.current;
            console.log("Capturing element:", element);

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: true, // Enable logging for debugging
                onclone: (clonedDoc) => {
                    const el = clonedDoc.querySelector('[data-pdf-content]');
                    if (el) {
                        (el as HTMLElement).style.display = 'block';
                        (el as HTMLElement).style.visibility = 'visible';
                        // Strip all global styles and inject basic ones to avoid "lab" color error
                        clonedDoc.head.innerHTML = `
                            <style>
                                * { color: #000 !important; font-family: Arial, sans-serif !important; margin: 0; padding: 0; box-sizing: border-box; }
                                [data-pdf-content] { background: white !important; width: 210mm !important; padding: 40px !important; display: block !important; visibility: visible !important; }
                                .flex { display: flex !important; }
                                .justify-between { justify-content: space-between !important; }
                                .items-start { align-items: flex-start !important; }
                                .grid-cols-2 { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
                                .border-orange-500 { border-color: #ff6b35 !important; }
                                .border-b-2 { border-bottom: 2px solid !important; }
                                .text-orange-500 { color: #ff6b35 !important; }
                                .text-slate-900 { color: #0f172a !important; }
                                .text-slate-600 { color: #475569 !important; }
                                .text-slate-500 { color: #64748b !important; }
                                .text-slate-400 { color: #94a3b8 !important; }
                                .bg-slate-50 { background-color: #f8fafc !important; }
                                .rounded-2xl { border-radius: 16px !important; }
                                .w-24 { width: 96px !important; }
                                .h-24 { height: 96px !important; }
                                .font-black { font-weight: 900 !important; }
                                .uppercase { text-transform: uppercase !important; }
                                .italic { font-style: italic !important; }
                                .border-l-4 { border-left: 4px solid !important; }
                                .pl-4 { padding-left: 16px !important; }
                                .space-y-6 > * + * { margin-top: 24px !important; }
                                .space-y-3 > * + * { margin-top: 12px !important; }
                            </style>
                        `;
                    }
                }
            });

            console.log("Canvas created successfully");
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`ExtraNow_Profil_${formData.name.replace(/\s+/g, "_")}.pdf`);
            console.log("PDF saved successfully");
        } catch (err) {
            console.error("PDF download error:", err);
            alert("Erreur lors de la génération du PDF. Veuillez réessayer.");
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 max-w-2xl w-full text-center"
                >
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <CheckCircle2 size={48} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-4 italic">Inscription Réussie !</h1>
                    <p className="text-slate-500 font-bold mb-10 text-lg">Votre dossier complet (Photo + CV) a été transmis. Vous pouvez télécharger votre fiche récapitulative.</p>

                    {/* Hidden Preview for PDF (Off-screen) */}
                    <div style={{ position: 'absolute', left: '-9999px', top: '0', zIndex: -1 }}>
                        <div ref={resumeRef} data-pdf-content className="p-10 bg-white w-[210mm] text-slate-900 font-sans" style={{ color: '#0f172a' }}>
                            <div className="flex justify-between items-start border-b-2 border-orange-500 pb-8 mb-8">
                                <div className="flex gap-6">
                                    {formData.avatarUrl && formData.avatarUrl !== "simulated_avatar_url" ? (
                                        <img src={formData.avatarUrl} className="w-24 h-24 rounded-2xl object-cover border-2 border-orange-500" alt="Avatar" />
                                    ) : previews.avatar ? (
                                        <img src={previews.avatar} className="w-24 h-24 rounded-2xl object-cover border-2 border-orange-500" alt="Avatar" />
                                    ) : (
                                        <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300">
                                            <User size={40} />
                                        </div>
                                    )}
                                    <div>
                                        <h1 className="text-4xl font-black uppercase italic">PROFIL EXTRA <span className="text-orange-500">NOW</span></h1>
                                        <p className="text-slate-500 font-bold uppercase tracking-widest mt-2">{formData.skills}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{formData.name}</p>
                                    <p className="text-sm text-slate-400">{formData.email}</p>
                                    <p className="text-sm text-slate-400">{formData.phone}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <h2 className="text-xl font-black border-l-4 border-orange-500 pl-4 uppercase">Bio & Motivation</h2>
                                    <p className="text-slate-600 leading-relaxed italic">"{formData.bio}"</p>
                                    <h2 className="text-xl font-black border-l-4 border-orange-500 pl-4 uppercase mt-8">Expérience</h2>
                                    <p className="text-slate-600 leading-relaxed">{formData.experience}</p>
                                </div>
                                <div className="space-y-6">
                                    <h2 className="text-xl font-black border-l-4 border-orange-500 pl-4 uppercase">Informations</h2>
                                    <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                                        <p className="text-sm font-bold">Ville : <span className="text-slate-600 font-medium">{formData.city}</span></p>
                                        <p className="text-sm font-bold">Adresse : <span className="text-slate-600 font-medium">{formData.address}</span></p>
                                        <p className="text-sm font-bold">Date de naissance : <span className="text-slate-600 font-medium">{formData.birthDate}</span></p>
                                    </div>
                                    <div className="mt-20 text-center opacity-20">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.5em]">ExtraNow Platform - Document Certifié</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={downloadPDF}
                            className="w-full bg-[#0f172a] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl active:scale-95 uppercase tracking-widest"
                        >
                            <Download size={24} strokeWidth={2.5} /> Télécharger ma Fiche (PDF)
                        </button>
                        <Link
                            href="/"
                            className="text-slate-400 font-bold hover:text-slate-900 transition-colors uppercase tracking-widest text-sm py-4"
                        >
                            Retour à l'accueil
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden py-20 px-6">
            <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.03] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="mb-12 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-accent font-black transition-all uppercase text-[10px] tracking-widest font-outfit">
                            <ChevronLeft size={16} strokeWidth={3} /> Accueil
                        </Link>
                        <Link href="/extras/login" className="text-[9px] font-black text-orange-500 uppercase tracking-widest italic ml-1">
                            Déjà inscrit ? Connexion
                        </Link>
                    </div>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map(s => (
                            <div key={s} className={`h-1.5 w-12 rounded-full transition-all duration-500 ${s <= step ? "bg-accent shadow-[0_0_10px_rgba(249,115,22,0.5)]" : "bg-slate-200"}`} />
                        ))}
                    </div>
                </div>

                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100"
                >
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="mb-10 text-center">
                                        <h1 className="text-4xl font-black text-[#0f172a] italic mb-2">Profil & Contact</h1>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Étape 1 sur 3</p>
                                    </div>

                                    {/* Avatar Upload */}
                                    <div className="flex flex-col items-center mb-10">
                                        <div className="relative group">
                                            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-orange-500">
                                                {previews.avatar ? (
                                                    <img src={previews.avatar} className="w-full h-full object-cover" alt="Preview" />
                                                ) : (
                                                    <Camera size={32} className="text-slate-300" />
                                                )}
                                            </div>
                                            <input type="file" className="hidden" id="avatar-upload" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatar')} />
                                            <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-3 rounded-2xl shadow-lg cursor-pointer hover:bg-orange-600 transition-all active:scale-90">
                                                <Upload size={18} strokeWidth={3} />
                                            </label>
                                        </div>
                                        <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Votre Photo de Profil</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField icon={User} label="Nom Complet" name="name" value={formData.name} onChange={handleChange} placeholder="Jean Dupont" />
                                        <InputField icon={Mail} label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="jean@example.com" type="email" />
                                        <InputField icon={Phone} label="Téléphone" name="phone" value={formData.phone} onChange={handleChange} placeholder="06 12 34 56 78" />
                                        <InputField icon={Calendar} label="Date de naissance" name="birthDate" value={formData.birthDate} onChange={handleChange} type="date" />
                                        <div className="md:col-span-2">
                                            <InputField icon={MapPin} label="Adresse" name="address" value={formData.address} onChange={handleChange} placeholder="12 rue de la Paix" />
                                        </div>
                                        <InputField icon={MapPin} label="Ville" name="city" value={formData.city} onChange={handleChange} placeholder="Paris" />
                                    </div>
                                    <button type="button" onClick={handleNext} className="w-full mt-10 bg-orange-500 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl active:scale-95 uppercase tracking-widest">
                                        Continuer <ChevronRight size={20} strokeWidth={3} />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="mb-10 text-center">
                                        <h1 className="text-4xl font-black text-[#0f172a] italic mb-2">Expériences</h1>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Étape 2 sur 3</p>
                                    </div>
                                    <div className="space-y-6">
                                        <InputField icon={Briefcase} label="Poste Souhaité" name="skills" value={formData.skills} onChange={handleChange} placeholder="Serveur, Barman..." />
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Résumé de vos expériences</label>
                                            <div className="relative">
                                                <GraduationCap className="absolute left-4 top-4 text-slate-300" size={20} />
                                                <textarea
                                                    name="experience"
                                                    value={formData.experience}
                                                    onChange={handleChange}
                                                    rows={4}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-slate-900 focus:outline-none focus:border-orange-500 transition-all font-bold placeholder:text-slate-300"
                                                    placeholder="Où avez-vous travaillé ?"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Bio / Pourquoi vous ?</label>
                                            <div className="relative">
                                                <FileText className="absolute left-4 top-4 text-slate-300" size={20} />
                                                <textarea
                                                    name="bio"
                                                    value={formData.bio}
                                                    onChange={handleChange}
                                                    rows={4}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-slate-900 focus:outline-none focus:border-orange-500 transition-all font-bold placeholder:text-slate-300"
                                                    placeholder="Dites-nous en plus..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button type="button" onClick={handleBack} className="bg-slate-100 text-slate-500 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all">Retour</button>
                                        <button type="button" onClick={handleNext} className="bg-orange-500 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl active:scale-95 uppercase tracking-widest">Continuer <ChevronRight size={20} strokeWidth={3} /></button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="mb-10 text-center">
                                        <h1 className="text-4xl font-black text-[#0f172a] italic mb-2">Document CV</h1>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Étape 3 sur 4</p>
                                    </div>

                                    <div className={`border-4 border-dashed rounded-[2.5rem] p-16 text-center group transition-all ${previews.cvName ? "border-emerald-500 bg-emerald-50" : "border-slate-100 bg-slate-50/50 hover:border-orange-300"}`}>
                                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform ${previews.cvName ? "bg-emerald-500 text-white" : "bg-white text-orange-500"}`}>
                                            {previews.cvName ? <FileText size={32} strokeWidth={2.5} /> : <FileDown size={32} strokeWidth={2.5} />}
                                        </div>
                                        <p className="text-slate-900 font-black text-xl mb-2">
                                            {previews.cvName ? previews.cvName : "Uploadez votre CV (PDF)"}
                                        </p>
                                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Format PDF requis (Max 10MB)</p>
                                        <input type="file" className="hidden" id="cv-upload" accept=".pdf" onChange={(e) => handleFileUpload(e, 'cv')} />
                                        <label htmlFor="cv-upload" className="mt-8 inline-block bg-white border border-slate-200 px-8 py-3 rounded-xl font-black text-slate-900 text-xs uppercase tracking-widest cursor-pointer hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all">
                                            {previews.cvName ? "Changer de fichier" : "Parcourir"}
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button type="button" onClick={handleBack} className="bg-slate-100 text-slate-500 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all">Retour</button>
                                        <button type="button" onClick={handleNext} className="bg-orange-500 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl active:scale-95 uppercase tracking-widest">Continuer <ChevronRight size={20} strokeWidth={3} /></button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="mb-10 text-center">
                                        <h1 className="text-4xl font-black text-[#0f172a] italic mb-2">Sécurité</h1>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Dernière étape</p>
                                    </div>

                                    <div className="bg-orange-50 p-8 rounded-[2.5rem] border border-orange-100 mb-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
                                                <CheckCircle2 size={24} />
                                            </div>
                                            <p className="text-orange-900 font-black italic">Presque fini !</p>
                                        </div>
                                        <p className="text-orange-700/70 font-bold text-sm leading-relaxed">Choisissez un mot de passe robuste pour accéder à votre dashboard ExtraNow et suivre vos missions.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <InputField
                                            icon={FileText}
                                            label="Mot de passe"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            type="password"
                                        />
                                    </div>

                                    {error && <p className="text-red-500 text-center font-bold px-4">{error}</p>}

                                    <div className="grid grid-cols-2 gap-4">
                                        <button type="button" onClick={handleBack} className="bg-slate-100 text-slate-500 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all">Retour</button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-[#0f172a] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl active:scale-95 uppercase tracking-widest"
                                        >
                                            {isSubmitting ? "Envoi..." : "Valider mon Inscription"} <CheckCircle2 size={24} strokeWidth={3} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

function InputField({ icon: Icon, label, ...props }: any) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
            <div className="relative">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input
                    {...props}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-slate-900 focus:outline-none focus:border-orange-500 transition-all font-bold placeholder:text-slate-300"
                />
            </div>
        </div>
    );
}
