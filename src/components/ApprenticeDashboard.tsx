import React from 'react';
import { ApprenticeProgress, SectionType, ModuleData } from '../types';
import { SENA_MODULES } from '../data/senaData';
import { Award, CheckCircle2, ArrowRight, Clock, BookOpen, Scale, Sparkles, User, FileCheck, Layers } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface ApprenticeDashboardProps {
  apprentice: ApprenticeProgress;
  onNavigate: (section: SectionType) => void;
  onStartModule: (module: ModuleData) => void;
  onViewCertificate: () => void;
}

export const ApprenticeDashboard: React.FC<ApprenticeDashboardProps> = ({
  apprentice,
  onNavigate,
  onStartModule,
  onViewCertificate
}) => {
  const completedCount = apprentice.completedModules.length;
  const totalModules = SENA_MODULES.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);
  const isInductionDone = completedCount === totalModules;

  return (
    <div className="space-y-8">
      {/* Hero Banner with Authentic SENA Regional Campus image */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-slate-900">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src="/src/assets/images/sena_campus_banner_1794325194739.jpg"
            alt="Campus de Formación Tecnológica SENA en Colombia"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-90 contrast-105"
          />
          {/* Measured contrast scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        {/* Hero Overlay Content */}
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1.5">
              <SenaLogo className="w-5 h-5 text-[#39A900]" />
              <span>Bienvenido a la Familia SENA · Proceso de Inducción</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance">
              ¡Hola, {apprentice.fullName}!
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-2xl leading-relaxed">
              Inicias tu ruta formativa en <strong className="text-white">{apprentice.programName}</strong>.
              Apropia los valores, símbolos y el Reglamento del Aprendiz para culminar tu inducción y obtener tu certificación institucional.
            </p>
          </div>
        </div>
      </div>

      {/* Apprentice Identity Card & Progress Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Apprentice profile details */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#39A900] flex items-center justify-center font-bold text-lg border border-emerald-100 dark:border-emerald-800">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {apprentice.fullName}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {apprentice.email}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 mt-4 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-500">Documento:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                  C.C. {apprentice.documentNumber}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-500">Ficha de Formación:</span>
                <span className="font-bold text-[#39A900] tabular-nums">
                  #{apprentice.fichaNumber}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-500">Programa:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 text-right max-w-[220px]">
                  {apprentice.programName}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Centro / Regional:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 text-right max-w-[220px]">
                  {apprentice.regional}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Estado de Inducción:</span>
            <span className={`font-semibold ${isInductionDone ? 'text-emerald-600' : 'text-amber-600'}`}>
              {isInductionDone ? '100% Completada' : `${completedCount} de ${totalModules} Módulos`}
            </span>
          </div>
        </div>

        {/* Right: Progress tracker & Quick Certificate action */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-[#39A900] uppercase tracking-wider">
                  Avance General
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Cumplimiento del Plan de Inducción
                </h3>
              </div>
              <div className="text-2xl font-bold text-[#39A900] tabular-nums">
                {progressPercent}%
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden mb-5">
              <div
                className="bg-[#39A900] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Step badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              {SENA_MODULES.map((m) => {
                const isDone = apprentice.completedModules.includes(m.id);
                return (
                  <div
                    key={m.id}
                    className={`p-2.5 rounded-lg border transition-all ${
                      isDone
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-1">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <span className="font-semibold block truncate">Módulo 0{m.number}</span>
                    <span className="text-[10px] opacity-75">{isDone ? 'Aprobado' : 'Pendiente'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certificate banner */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {isInductionDone ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  ¡Has finalizado con éxito! Tu certificado está listo para imprimir.
                </span>
              ) : (
                <span>Aprueba los 4 módulos para habilitar tu Certificado Oficial.</span>
              )}
            </div>

            <button
              disabled={!isInductionDone}
              onClick={onViewCertificate}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold shadow-sm transition-all ${
                isInductionDone
                  ? 'bg-[#39A900] text-white hover:bg-[#318f00]'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Ver Certificado Oficial</span>
            </button>
          </div>
        </div>
      </div>

      {/* Induction Modules Roadmap */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Ruta Formativa de Inducción
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Contenidos oficiales para apropiar la cultura y la normativa del SENA
            </p>
          </div>
          <button
            onClick={() => onNavigate('modules')}
            className="text-xs font-semibold text-[#39A900] hover:text-[#2d8500] flex items-center gap-1"
          >
            <span>Ver todos los módulos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SENA_MODULES.map((mod) => {
            const isDone = apprentice.completedModules.includes(mod.id);
            const score = apprentice.moduleScores[mod.id];

            return (
              <div
                key={mod.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-bold text-slate-400 uppercase tracking-wider">
                      Módulo 0{mod.number}
                    </span>
                    {isDone ? (
                      <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{score}%</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{mod.durationMinutes} min</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {mod.summary}
                  </p>
                </div>

                <button
                  onClick={() => onStartModule(mod)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isDone
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      : 'bg-[#39A900] text-white hover:bg-[#318f00] shadow-sm'
                  }`}
                >
                  <span>{isDone ? 'Repasar Módulo' : 'Comenzar Módulo'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Highlights: Símbolos & Simulador de Casos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner 1: Símbolos e Himno */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Identidad SENA</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Explorador Heráldico e Himno
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Descubre el significado del Piñón, el Caduceo y la Rama de Café en el Escudo, y practica el Himno institucional con nuestra guía melódica.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => onNavigate('symbols')}
              className="text-xs font-semibold text-[#39A900] hover:text-[#2d8500] flex items-center gap-1.5"
            >
              <span>Explorar Símbolos e Himno</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Banner 2: Simulador de Comité */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wider mb-2">
              <Scale className="w-4 h-4" />
              <span>Práctica Pedagógica</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Simulador del Comité de Evaluación
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Ponte en el papel de la comisión del centro. Resuelve 4 situaciones éticas y disciplinarias aplicando el Reglamento del Aprendiz (Acuerdo 009 de 2024 y mod. Acuerdo 002 de 2026).
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => onNavigate('simulator')}
              className="text-xs font-semibold text-[#39A900] hover:text-[#2d8500] flex items-center gap-1.5"
            >
              <span>Ingresar al Simulador de Casos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Insignias de Logro de Inducción
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Desbloqueadas al aprobar evaluaciones y resolver casos del comité
            </p>
          </div>
          <span className="text-xs font-semibold text-[#39A900] tabular-nums">
            {apprentice.badges.filter((b) => b.unlocked).length} de {apprentice.badges.length} desbloqueadas
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {apprentice.badges.map((b) => (
            <div
              key={b.id}
              className={`p-3 rounded-xl border text-center transition-all ${
                b.unlocked
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-50 grayscale'
              }`}
            >
              <div className={`w-9 h-9 mx-auto rounded-lg flex items-center justify-center mb-2 ${
                b.unlocked ? 'bg-[#39A900] text-white shadow-xs' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
              }`}>
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                {b.title}
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
