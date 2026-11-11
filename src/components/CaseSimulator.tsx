import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/senaData';
import confetti from 'canvas-confetti';
import { Scale, CheckCircle2, XCircle, AlertTriangle, ArrowRight, BookOpen, User, HelpCircle } from 'lucide-react';

interface CaseSimulatorProps {
  onCaseSolved: (caseId: string) => void;
  solvedCases: string[];
}

export const CaseSimulator: React.FC<CaseSimulatorProps> = ({
  onCaseSolved,
  solvedCases
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('');
  const [selectedMeasure, setSelectedMeasure] = useState<string>('');
  const [isEvaluated, setIsEvaluated] = useState(false);

  const activeCase = CASE_STUDIES[activeCaseIndex];
  const isAlreadySolved = solvedCases.includes(activeCase.id);

  const isCategoryCorrect = selectedCategory === activeCase.correctFaultCategory;
  const isSeverityCorrect = selectedSeverity === activeCase.correctSeverity;
  const isMeasureCorrect = selectedMeasure === activeCase.correctMeasure;
  const isAllCorrect = isCategoryCorrect && isSeverityCorrect && isMeasureCorrect;

  const handleEvaluate = () => {
    setIsEvaluated(true);
    if (isAllCorrect) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#39A900', '#22c55e', '#10b981', '#fbbf24', '#38bdf8']
      });
      onCaseSolved(activeCase.id);
    }
  };

  const handleNextCase = () => {
    const nextIndex = (activeCaseIndex + 1) % CASE_STUDIES.length;
    setActiveCaseIndex(nextIndex);
    setSelectedCategory('');
    setSelectedSeverity('');
    setSelectedMeasure('');
    setIsEvaluated(false);
  };

  const handleResetCurrent = () => {
    setSelectedCategory('');
    setSelectedSeverity('');
    setSelectedMeasure('');
    setIsEvaluated(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#39A900] uppercase tracking-wider mb-1">
              <Scale className="w-4 h-4" />
              <span>Simulador Jurídico y Pedagógico</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Simulador del Comité de Evaluación y Seguimiento
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Asume el rol de miembro del Comité del Centro de Formación. Analiza casos de la vida real de aprendices,
              clasifica la falta y determina las medidas formativas o sanciones según el Reglamento del Aprendiz vigente (Acuerdo 009 de 2024 y mod. Acuerdo 002 de 2026 sobre garantías del debido proceso).
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Casos Resueltos:</span>
            <span className="text-[#39A900] font-bold text-sm tabular-nums">
              {solvedCases.length} / {CASE_STUDIES.length}
            </span>
          </div>
        </div>
      </div>

      {/* Case Navigator Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CASE_STUDIES.map((c, idx) => {
          const isSelected = idx === activeCaseIndex;
          const isDone = solvedCases.includes(c.id);
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSelectedCategory('');
                setSelectedSeverity('');
                setSelectedMeasure('');
                setIsEvaluated(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#39A900] text-white border-[#39A900] shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>Caso #{idx + 1}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white/90" />}
            </button>
          );
        })}
      </div>

      {/* Case details and decision workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: The Situation Description */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
              <User className="w-4 h-4 text-[#39A900]" />
              <span>Aprendiz: <strong className="text-slate-800 dark:text-slate-200">{activeCase.apprenticeName}</strong></span>
              <span aria-hidden="true">·</span>
              <span>{activeCase.program}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              {activeCase.title}
            </h3>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                Hechos Reportados al Comité:
              </div>
              <p>{activeCase.situation}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#39A900] shrink-0" />
            <span>Marco normativo: Acuerdo 009 de 2024 y mod. Acuerdo 002 de 2026 del Consejo Directivo Nacional del SENA.</span>
          </div>
        </div>

        {/* Right column: Deliberation Controls */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
            Deliberación y Dictamen del Comité
          </h4>

          {/* Question 1: Fault Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              1. Clasificación de la Falta:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {activeCase.faultCategoryOptions.map((opt) => {
                const isSelected = selectedCategory === opt;
                const isCorrect = opt === activeCase.correctFaultCategory;
                
                let btnStyle = 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50';
                if (isEvaluated) {
                  if (isSelected) {
                    btnStyle = isCorrect
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500 font-bold'
                      : 'border-red-600 bg-red-50 dark:bg-red-950/60 text-red-950 dark:text-red-100 ring-2 ring-red-500 font-bold';
                  } else if (isCorrect) {
                    btnStyle = 'border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200 font-semibold border-dashed';
                  } else {
                    btnStyle = 'opacity-35 border-slate-200 dark:border-slate-800';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/30 text-[#246b00] dark:text-emerald-300 font-bold ring-2 ring-[#39A900]';
                }

                return (
                  <button
                    key={opt}
                    disabled={isEvaluated}
                    onClick={() => setSelectedCategory(opt)}
                    className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all flex items-center justify-center gap-1.5 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isEvaluated && isSelected && isCorrect && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                    {isEvaluated && isSelected && !isCorrect && (
                      <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Severity */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              2. Nivel de Gravedad Calificado:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {activeCase.severityOptions.map((opt) => {
                const isSelected = selectedSeverity === opt;
                const isCorrect = opt === activeCase.correctSeverity;

                let btnStyle = 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50';
                if (isEvaluated) {
                  if (isSelected) {
                    btnStyle = isCorrect
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500 font-bold'
                      : 'border-red-600 bg-red-50 dark:bg-red-950/60 text-red-950 dark:text-red-100 ring-2 ring-red-500 font-bold';
                  } else if (isCorrect) {
                    btnStyle = 'border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200 font-semibold border-dashed';
                  } else {
                    btnStyle = 'opacity-35 border-slate-200 dark:border-slate-800';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/30 text-[#246b00] dark:text-emerald-300 font-bold ring-2 ring-[#39A900]';
                }

                return (
                  <button
                    key={opt}
                    disabled={isEvaluated}
                    onClick={() => setSelectedSeverity(opt)}
                    className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all flex items-center justify-center gap-1.5 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isEvaluated && isSelected && isCorrect && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                    {isEvaluated && isSelected && !isCorrect && (
                      <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: Recommended Measure */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              3. Medida Formativa o Sanción Procedente:
            </label>
            <div className="space-y-2">
              {activeCase.measureOptions.map((opt) => {
                const isSelected = selectedMeasure === opt;
                const isCorrect = opt === activeCase.correctMeasure;

                let btnStyle = 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50';
                if (isEvaluated) {
                  if (isSelected) {
                    btnStyle = isCorrect
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500 font-bold'
                      : 'border-red-600 bg-red-50 dark:bg-red-950/60 text-red-950 dark:text-red-100 ring-2 ring-red-500 font-bold';
                  } else if (isCorrect) {
                    btnStyle = 'border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200 font-semibold border-dashed';
                  } else {
                    btnStyle = 'opacity-35 border-slate-200 dark:border-slate-800';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/30 text-[#246b00] dark:text-emerald-300 font-bold ring-2 ring-[#39A900]';
                }

                return (
                  <button
                    key={opt}
                    disabled={isEvaluated}
                    onClick={() => setSelectedMeasure(opt)}
                    className={`w-full text-left p-3 rounded-lg text-xs font-medium border transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isEvaluated && isSelected && isCorrect && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>¡Correcto!</span>
                      </span>
                    )}
                    {isEvaluated && isSelected && !isCorrect && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-red-700 dark:text-red-300 bg-red-100/90 dark:bg-red-900/60 px-2 py-0.5 rounded-full shrink-0">
                        <XCircle className="w-3.5 h-3.5 text-red-600" />
                        <span>¡Incorrecto!</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evaluation Action */}
          {!isEvaluated ? (
            <div className="pt-3">
              <button
                disabled={!selectedCategory || !selectedSeverity || !selectedMeasure}
                onClick={handleEvaluate}
                className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-[#39A900] hover:bg-[#318f00] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
              >
                Emitir Dictamen del Comité
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              {/* Result card */}
              <div className={`p-4 rounded-xl border text-xs shadow-xs ${
                isAllCorrect
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-500/30'
                  : 'bg-red-50/90 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-950 dark:text-red-100 ring-1 ring-red-500/30'
              }`}>
                <div className="flex items-start gap-2.5">
                  {isAllCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold text-sm block mb-1">
                      {isAllCorrect ? '🎉 ¡Dictamen Conforme a Derecho! (Aprobado)' : '❌ Calificación Jurídica Incorrecta'}
                    </span>
                    <p className="leading-relaxed mb-2">{activeCase.legalRationale}</p>
                    <div className="font-semibold text-slate-700 dark:text-slate-300">
                      Cita normativa: {activeCase.article}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                {!isAllCorrect && (
                  <button
                    onClick={handleResetCurrent}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  >
                    Reevaluar Caso
                  </button>
                )}
                <button
                  onClick={handleNextCase}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800"
                >
                  <span>Siguiente Caso</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
