import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS } from '../data/content';
import { X, CheckCircle, ArrowRight, ArrowLeft, RefreshCw, Activity, ShieldCheck, Heart, Moon, Flame, Apple, Brain } from 'lucide-react';

interface AssessmentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPillar?: (pillar: string) => void;
}

export const AssessmentQuizModal: React.FC<AssessmentQuizModalProps> = ({
  isOpen,
  onClose,
  onNavigateToPillar,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQ = ASSESSMENT_QUESTIONS[currentStep];
  const totalSteps = ASSESSMENT_QUESTIONS.length;

  const handleSelectOption = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Calculate results
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const maxPossible = totalSteps * 4;
  const percentage = Math.round((totalScore / maxPossible) * 100);

  let statusLabel = 'Optimal Longevity Vector';
  let statusTone = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let guidanceSummary = 'Your biomarkers and lifestyle architecture show strong foundational resilience. Focus on micro-optimizations in recovery and periodic preventative blood panels.';

  if (percentage < 50) {
    statusLabel = 'Critical Recalibration Required';
    statusTone = 'text-amber-800 bg-amber-50 border-amber-200';
    guidanceSummary = 'Multiple baseline vulnerabilities detected across sleep, cardiovascular conditioning, and chronic stress. Addressing these foundational levers will unlock immediate cognitive stamina and safeguard long-term healthspan.';
  } else if (percentage < 75) {
    statusLabel = 'Solid Foundation with Actionable Gaps';
    statusTone = 'text-blue-800 bg-blue-50 border-blue-200';
    guidanceSummary = 'You possess good health awareness, but specific bottlenecks in Zone 2 aerobic base, protein pacing, or sleep consistency are constraining your full biological ceiling.';
  }

  // Determine lowest scoring pillar or priority pillar
  const questionPillars: Record<number, { pillar: string; title: string }> = {
    1: { pillar: 'sleep', title: 'Sleep & Recovery' },
    2: { pillar: 'fitness', title: 'Functional Fitness' },
    3: { pillar: 'nutrition', title: 'Metabolic Nutrition' },
    4: { pillar: 'mindset', title: 'Mindset & Resilience' },
    5: { pillar: 'health', title: "Men's Health" },
  };

  const lowestQuestion = Object.entries(answers).sort(([, a], [, b]) => a - b)[0];
  const targetPillar = lowestQuestion ? questionPillars[Number(lowestQuestion[0])]?.pillar || 'fitness' : 'fitness';
  const targetPillarName = lowestQuestion ? questionPillars[Number(lowestQuestion[0])]?.title || 'Fitness & Longevity' : 'Fitness & Longevity';

  const getPillarIcon = (pillar: string) => {
    switch (pillar) {
      case 'sleep': return <Moon className="w-4 h-4 text-indigo-500" />;
      case 'fitness': return <Flame className="w-4 h-4 text-emerald-600" />;
      case 'nutrition': return <Apple className="w-4 h-4 text-green-600" />;
      case 'mindset': return <Brain className="w-4 h-4 text-cyan-600" />;
      default: return <Activity className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Activity className="w-4 h-4 text-[#166534]" />
            <span>2-Minute Longevity & Performance Diagnostic</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close assessment"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnostic Quiz Body */}
        {!isCompleted ? (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Step Progress & Pillar */}
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span className="flex items-center gap-1.5 capitalize font-medium text-slate-700">
                {getPillarIcon(currentQ.pillar)}
                Pillar: {currentQ.pillar}
              </span>
              <span className="font-semibold text-slate-900 tabular-nums">
                Question {currentStep + 1} of {totalSteps}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#166534] h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>

            {/* Question title */}
            <h3 className="text-xl font-bold text-[#0F172A] leading-snug">
              {currentQ.question}
            </h3>

            {/* Options list */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = answers[currentQ.id] === option.score;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, option.score)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-[#166534] bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
                    }`}
                  >
                    <span 
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        isSelected
                          ? 'border-[#166534] bg-[#166534] text-white'
                          : 'border-slate-300 text-slate-400'
                      }`}
                    >
                      {isSelected ? '✓' : String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`font-medium leading-relaxed ${isSelected ? 'text-[#0F172A]' : 'text-slate-700'}`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentStep === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-slate-100 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={answers[currentQ.id] === undefined}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 ${
                  answers[currentQ.id] !== undefined
                    ? 'bg-[#0F172A] hover:bg-[#166534] text-white cursor-pointer shadow-sm active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{currentStep === totalSteps - 1 ? 'Analyze Results' : 'Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ) : (
          /* Results View */
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-[#166534] mb-1">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F172A]">
                Your Longevity Vector
              </h3>
              <p className="text-xs text-slate-500">
                Calculated across 5 clinical pillars of longevity & performance
              </p>
            </div>

            {/* Score Ring Display */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="text-4xl sm:text-5xl font-black text-[#0F172A] tabular-nums tracking-tight">
                {percentage}%
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${statusTone}`}>
                {statusLabel}
              </div>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                {guidanceSummary}
              </p>
            </div>

            {/* Action Recommendations */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Recommended 30-Day Action Protocols:
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-start justify-between gap-3 group hover:border-[#166534] transition-colors">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-[#166534]">01.</span>
                    <span className="text-slate-700">
                      <strong>Zone 2 Cardiovascular Base:</strong> Accumulate 150 minutes of conversational aerobic cardio weekly to multiply mitochondrial density.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (onNavigateToPillar) {
                        onNavigateToPillar('fitness');
                      } else {
                        onClose();
                      }
                    }}
                    className="shrink-0 px-2.5 py-1 text-[11px] font-semibold text-[#166534] bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
                  >
                    <span>View Protocol</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-start justify-between gap-3 group hover:border-[#166534] transition-colors">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-[#166534]">02.</span>
                    <span className="text-slate-700">
                      <strong>Circadian Light Anchoring:</strong> Expose eyes to outdoor natural photons within 30 minutes of waking; maintain 66°F bedroom temperature.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (onNavigateToPillar) {
                        onNavigateToPillar('sleep');
                      } else {
                        onClose();
                      }
                    }}
                    className="shrink-0 px-2.5 py-1 text-[11px] font-semibold text-[#166534] bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
                  >
                    <span>View Protocol</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-start justify-between gap-3 group hover:border-[#166534] transition-colors">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-[#166534]">03.</span>
                    <span className="text-slate-700">
                      <strong>Preventative Blood Work:</strong> Schedule an in-depth panel testing ApoB, fasting insulin, hs-CRP, and free testosterone to establish true baselines.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (onNavigateToPillar) {
                        onNavigateToPillar('health');
                      } else {
                        onClose();
                      }
                    }}
                    className="shrink-0 px-2.5 py-1 text-[11px] font-semibold text-[#166534] bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
                  >
                    <span>View Protocol</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retake Diagnostic
              </button>

              <button
                onClick={() => {
                  if (onNavigateToPillar) {
                    onNavigateToPillar(targetPillar);
                  } else {
                    onClose();
                  }
                }}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#166534] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <span>Explore {targetPillarName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
