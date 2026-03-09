"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle, Trophy, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { getSkillsTests, submitTestResult, getLatestExtra } from "@/app/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SkillsTestPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [test, setTest] = useState<any>(null);
    const [extra, setExtra] = useState<any>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        Promise.all([getSkillsTests(), getLatestExtra()]).then(([tests, extraData]) => {
            const found = tests.find((t: any) => t.id === params.id);
            if (found) {
                found.questions = JSON.parse(found.questions);
                setTest(found);
            }
            setExtra(extraData);
        });
    }, [params.id]);

    const handleAnswer = (idx: number) => {
        const newAnswers = [...answers];
        newAnswers[currentStep] = idx;
        setAnswers(newAnswers);
    };

    const nextStep = () => {
        if (currentStep < test.questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            finishTest();
        }
    };

    const finishTest = async () => {
        let correctCount = 0;
        test.questions.forEach((q: any, i: number) => {
            if (answers[i] === q.c) correctCount++;
        });
        const finalScore = Math.round((correctCount / test.questions.length) * 100);
        setScore(finalScore);
        setIsFinished(true);

        if (extra) {
            await submitTestResult({
                extraId: extra.id,
                testId: test.id,
                score: finalScore,
                passed: finalScore >= 70
            });
        }
    };

    if (!test) return <div className="p-10 text-slate-400 font-bold animate-pulse">Chargement du test...</div>;

    if (isFinished) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl ${score >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}
                >
                    {score >= 70 ? <Trophy size={64} /> : <AlertCircle size={64} />}
                </motion.div>
                <h1 className="text-5xl font-black text-slate-900 mb-4 italic">Score : <span className={score >= 70 ? 'text-emerald-500' : 'text-orange-500'}>{score}%</span></h1>
                <p className="text-xl text-slate-500 font-medium mb-12">
                    {score >= 70
                        ? "Félicitations ! Vous avez brillamment réussi ce test. Votre profil a été mis à jour."
                        : "Dommage... Vous n'avez pas atteint le score minimum de 70%. Révisez et réessayez plus tard !"}
                </p>
                <Link
                    href="/extras/skills"
                    className="inline-flex items-center gap-3 bg-slate-900 text-white font-black px-10 py-5 rounded-2xl hover:bg-orange-500 transition-all active:scale-95 shadow-xl"
                >
                    RETOUR AU CENTRE
                    <Home size={20} />
                </Link>
            </div>
        );
    }

    const currentQuestion = test.questions[currentStep];

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Question {currentStep + 1} de {test.questions.length}</p>
                        <h2 className="text-3xl font-black text-slate-900">{test.title}</h2>
                    </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / test.questions.length) * 100}%` }}
                        className="h-full bg-emerald-500"
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl"
                >
                    <h3 className="text-2xl font-black text-slate-900 mb-10 leading-tight italic">
                        "{currentQuestion.q}"
                    </h3>

                    <div className="space-y-4">
                        {currentQuestion.a.map((opt: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className={`w-full p-6 rounded-2xl text-left font-black transition-all border-2 flex items-center justify-between group ${answers[currentStep] === idx
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md scale-[1.02]'
                                        : 'bg-slate-50 border-transparent text-slate-500 hover:border-slate-200 hover:bg-white'
                                    }`}
                            >
                                <span className="flex items-center gap-4">
                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] transition-colors ${answers[currentStep] === idx ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                                        }`}>
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    {opt}
                                </span>
                                {answers[currentStep] === idx && <CheckCircle2 size={24} className="text-emerald-500" />}
                            </button>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-between gap-4">
                        <button
                            disabled={currentStep === 0}
                            onClick={() => setCurrentStep(currentStep - 1)}
                            className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-900 disabled:opacity-0 transition-all p-4"
                        >
                            <ChevronLeft size={16} /> Précédent
                        </button>
                        <button
                            disabled={answers[currentStep] === undefined}
                            onClick={nextStep}
                            className={`flex items-center gap-3 font-black px-10 py-5 rounded-2xl transition-all active:scale-95 shadow-xl ${answers[currentStep] === undefined
                                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                                    : 'bg-slate-900 text-white hover:bg-emerald-500 shadow-emerald-500/10'
                                }`}
                        >
                            {currentStep === test.questions.length - 1 ? 'TERMINER' : 'SUIVANT'}
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
