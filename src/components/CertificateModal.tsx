import React from 'react';
import { ApprenticeProgress } from '../types';
import { Award, Printer, X, CheckCircle, QrCode } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface CertificateModalProps {
  apprentice: ApprenticeProgress;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  apprentice,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  // Calculate overall score
  const scores = Object.values(apprentice.moduleScores);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-4xl w-full p-6 md:p-8 my-8 relative">
        {/* Top bar controls */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 no-print">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900]">
            <Award className="w-4 h-4" />
            <span>Certificado Oficial de Inducción</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#318f00] rounded-lg transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar en PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas */}
        <div className="p-8 md:p-12 border-8 border-double border-[#39A900]/40 rounded-2xl bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 text-center relative overflow-hidden">
          {/* Watermark subtle seal */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.05]">
            <SenaLogo className="w-96 h-96 text-[#39A900]" />
          </div>

          {/* Top Crest / Header */}
          <div className="flex flex-col items-center justify-center space-y-2 mb-6">
            <div className="w-14 h-14 rounded-xl bg-[#39A900] text-white flex items-center justify-center shadow-md p-2">
              <SenaLogo className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-widest text-[#00324D] dark:text-slate-200 uppercase">
                SERVICIO NACIONAL DE APRENDIZAJE · SENA
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ministerio del Trabajo · República de Colombia
              </p>
            </div>
          </div>

          <div className="my-6">
            <span className="text-xs uppercase tracking-widest text-[#39A900] font-bold block mb-1">
              CONSTANCIA INSTITUCIONAL DE CUMPLIMIENTO
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              Certificado de Inducción Integral
            </h1>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
            Hace constar que el(la) aprendiz:
          </p>

          <div className="py-2 mb-6 border-b-2 border-slate-300 dark:border-slate-700 max-w-md mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-[#00324D] dark:text-emerald-400 tracking-wide">
              {apprentice.fullName}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Documento de Identidad N°: <span className="font-semibold">{apprentice.documentNumber}</span>
            </p>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
            Ha participado y aprobado satisfactoriamente el <strong className="text-slate-900 dark:text-white">Proceso de Inducción Institucional</strong>,
            completando la totalidad de los módulos curriculares en <strong className="text-slate-900 dark:text-white">Identidad Institucional</strong>,
            <strong className="text-slate-900 dark:text-white"> Reglamento del Aprendiz (Acuerdo 009 de 2024)</strong>,
            <strong className="text-slate-900 dark:text-white"> Alternativas de Etapa Productiva</strong> y
            <strong className="text-slate-900 dark:text-white"> Plan Integral de Bienestar</strong>, con un promedio aprobatorio general de <strong className="text-[#39A900]">{avgScore}%</strong>.
          </p>

          {/* Academic program details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto text-xs text-slate-600 dark:text-slate-400 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 mb-8">
            <div>
              <span className="block font-bold text-slate-900 dark:text-white">Ficha de Formación:</span>
              <span>{apprentice.fichaNumber}</span>
            </div>
            <div>
              <span className="block font-bold text-slate-900 dark:text-white">Programa:</span>
              <span className="line-clamp-2">{apprentice.programName}</span>
            </div>
            <div>
              <span className="block font-bold text-slate-900 dark:text-white">Centro y Regional:</span>
              <span>{apprentice.regional}</span>
            </div>
          </div>

          {/* Signatures & Security Validation */}
          <div className="grid grid-cols-3 items-end gap-6 max-w-2xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center">
              <div className="h-10 border-b border-slate-400 dark:border-slate-600 mb-1 flex items-end justify-center">
                <span className="font-serif italic text-sm text-slate-500">Dr. Jorge E. Gómez</span>
              </div>
              <span className="text-[11px] font-bold text-slate-900 dark:text-white block">Subdirector de Centro</span>
              <span className="text-[10px] text-slate-400">SENA Regional</span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 p-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white flex items-center justify-center shadow-xs">
                <QrCode className="w-11 h-11 text-slate-800" />
              </div>
              <span className="text-[9px] text-slate-400 mt-1 font-mono">
                REG-SENA-2026-IND
              </span>
            </div>

            <div className="text-center">
              <div className="h-10 border-b border-slate-400 dark:border-slate-600 mb-1 flex items-end justify-center">
                <span className="font-serif italic text-sm text-slate-500">Lic. Martha Lucía Peña</span>
              </div>
              <span className="text-[11px] font-bold text-slate-900 dark:text-white block">Coordinadora Académica</span>
              <span className="text-[10px] text-slate-400">Comité de Formación</span>
            </div>
          </div>

          <div className="mt-8 text-[10px] text-slate-400">
            Expedido en Colombia a los 10 días del mes de Noviembre de 2026 · Válido para expediente académico de matrícula.
          </div>
        </div>
      </div>
    </div>
  );
};
