import React from 'react';
import { X, Play, Video, ShieldCheck, Award } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface VideoModalProps {
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-3xl w-full overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#39A900] flex items-center justify-center text-white p-1">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                Video Tutorial Oficial
              </span>
              <h3 className="text-base font-bold text-white">
                Video Manual de la Plataforma · Ficha #2874921
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Cerrar video manual"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Body with Full HTML5 Controls */}
        <div className="p-4 sm:p-6 bg-slate-950 flex flex-col items-center justify-center">
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-inner relative border border-slate-800 flex items-center justify-center">
            <video
              src="/assets/aistudio/2026__5_17_p.m._f50631cc.mp4"
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              Tu navegador no soporta la reproducción de video HTML5.
            </video>
          </div>
        </div>

        {/* Description & Features Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <Play className="w-4 h-4 text-[#39A900] shrink-0" />
              <span><strong>1. Registro:</strong> Como aprendiz o instructor.</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#39A900] shrink-0" />
              <span><strong>2. Normativa:</strong> Acuerdo 009 de 2024.</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <Award className="w-4 h-4 text-[#39A900] shrink-0" />
              <span><strong>3. Certificación:</strong> Descarga con QR.</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500">
              Utiliza los controles del reproductor para pausar, adelantar o ajustar el volumen.
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#39A900] hover:bg-[#318f00] transition-colors shadow-xs"
            >
              Entendido, Cerrar Manual
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
