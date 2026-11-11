import React, { useState } from 'react';
import { ModuleData } from '../types';
import { SENA_MODULES } from '../data/senaData';
import { BookOpen, CheckCircle2, Clock, Award, ArrowRight, ShieldCheck, FileText, ChevronRight, HelpCircle } from 'lucide-react';

interface ModuleViewerProps {
  onStartQuiz: (module: ModuleData) => void;
  completedModules: string[];
  moduleScores: Record<string, number>;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  onStartQuiz,
  completedModules,
  moduleScores
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(SENA_MODULES[0].id);

  const activeModule = SENA_MODULES.find((m) => m.id === selectedModuleId) || SENA_MODULES[0];
  const isCompleted = completedModules.includes(activeModule.id);
  const currentScore = moduleScores[activeModule.id];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#39A900] uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Plan Curricular de Inducción</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Módulos Formativos y Normativa SENA
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Explora de manera secuencial los cuatro ejes temáticos fundamentales del proceso de inducción.
            Al finalizar la lectura de cada módulo, presenta el cuestionario interactivo para certificar tus competencias.
          </p>
        </div>
      </div>

      {/* Module Selector Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SENA_MODULES.map((mod) => {
          const isSelected = mod.id === selectedModuleId;
          const isModCompleted = completedModules.includes(mod.id);
          const score = moduleScores[mod.id];

          return (
            <button
              key={mod.id}
              onClick={() => setSelectedModuleId(mod.id)}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/20 shadow-sm ring-1 ring-[#39A900]'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold ${isSelected ? 'text-[#39A900]' : 'text-slate-500 dark:text-slate-400'}`}>
                  Módulo 0{mod.number}
                </span>
                {isModCompleted ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Aprobado {score}%</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{mod.durationMinutes} min</span>
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                {mod.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {mod.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Module Content & Reader Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Lesson Sections */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-8">
          <div>
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-[#39A900] uppercase tracking-wider">
                  Módulo {activeModule.number} de {SENA_MODULES.length}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {activeModule.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {activeModule.subtitle}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-[#39A900]" />
                <span>{activeModule.durationMinutes} minutos de lectura</span>
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 block mb-2">
                Resultados de Aprendizaje del Módulo:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {activeModule.learningOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section details */}
          <div className="space-y-8">
            {activeModule.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {section.title}
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>

                {section.points && section.points.length > 0 && (
                  <ul className="space-y-2 pl-2 text-sm text-slate-700 dark:text-slate-300">
                    {section.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] shrink-0 mt-2" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.keyTakeaway && (
                  <div className="p-3.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs font-medium text-emerald-900 dark:text-emerald-200">
                    <strong>Punto Clave:</strong> {section.keyTakeaway}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {isCompleted ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Módulo aprobado con {currentScore}%. Puedes repetirlo para mejorar tu nota.
                </span>
              ) : (
                <span>Al terminar la lectura, presenta el examen para registrar tu avance.</span>
              )}
            </div>

            <button
              onClick={() => onStartQuiz(activeModule)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#39A900] hover:bg-[#318f00] transition-all shadow-sm"
            >
              <Award className="w-4 h-4" />
              <span>{isCompleted ? 'Volver a Presentar Evaluación' : 'Presentar Evaluación del Módulo'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Media, Quick Facts & Navigation */}
        <div className="lg:col-span-4 space-y-6">
          {/* Authentic Apprentices Media Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/src/assets/images/sena_workshop_learning_1794325195843.jpg"
                alt="Aprendices SENA trabajando en laboratorio de robótica y tecnología"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                Formación Profesional Integral
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Los aprendices del SENA desarrollan competencias en talleres de última generación articulados con el sector productivo nacional.
              </p>
            </div>
          </div>

          {/* Quick Quiz Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              <FileText className="w-4 h-4 text-[#39A900]" />
              <span>Detalles de la Evaluación</span>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>Preguntas:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{activeModule.quiz.length} preguntas</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>Puntaje mínimo:</span>
                <span className="font-semibold text-slate-900 dark:text-white">75%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>Reintentos:</span>
                <span className="font-semibold text-slate-900 dark:text-white">Ilimitados</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Estado actual:</span>
                <span className={`font-semibold ${isCompleted ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {isCompleted ? 'Aprobado' : 'Pendiente'}
                </span>
              </div>
            </div>

            <button
              onClick={() => onStartQuiz(activeModule)}
              className="w-full py-2.5 rounded-lg text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{isCompleted ? 'Repetir Quiz' : 'Iniciar Examen'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
