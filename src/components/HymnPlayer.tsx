import React, { useState, useEffect, useRef } from 'react';
import { SENA_HYMN_STANZAS } from '../data/senaData';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Music,
  Video,
  FileText,
  Copy,
  Check,
  Download,
  BookOpen,
  Layers,
  ExternalLink
} from 'lucide-react';

type MediaTab = 'all' | 'video' | 'audio' | 'lyrics';

export const HymnPlayer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MediaTab>('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeStanzaIndex, setActiveStanzaIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<'gB_P1zb2_ds' | '6Db009yNvpc'>('gB_P1zb2_ds');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const stepTimerRef = useRef<number | null>(null);

  // Play anthem melody using Web Audio API
  const startAudioSynth = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      // Melodic notes for SENA Anthem motif
      const notes = [
        { freq: 261.63, dur: 0.5 }, // C4 - A-
        { freq: 329.63, dur: 0.5 }, // E4 - pren-
        { freq: 392.00, dur: 0.5 }, // G4 - di-
        { freq: 523.25, dur: 0.7 }, // C5 - ces
        { freq: 440.00, dur: 0.4 }, // A4 - del
        { freq: 392.00, dur: 0.6 }, // G4 - SE-
        { freq: 349.23, dur: 0.4 }, // F4 - NA
        { freq: 329.63, dur: 0.8 }, // E4 - a-de-lan-te
        { freq: 392.00, dur: 0.5 }, // G4 - por
        { freq: 440.00, dur: 0.5 }, // A4 - Co-
        { freq: 493.88, dur: 0.5 }, // B4 - lom-
        { freq: 523.25, dur: 0.9 }, // C5 - bia
        { freq: 440.00, dur: 0.4 }, // A4 - lu-
        { freq: 392.00, dur: 0.5 }, // G4 - chad
        { freq: 329.63, dur: 0.5 }, // E4 - con
        { freq: 261.63, dur: 1.0 }  // C4 - a-mor!
      ];

      let noteTime = now + 0.1;

      notes.forEach((note) => {
        if (isMuted) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm brass/flute timbre with sine + triangle harmonics
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, noteTime);

        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.18, noteTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + note.dur - 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + note.dur);

        noteTime += note.dur;
      });
    } catch {
      // AudioContext fallback handled silently
    }
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
    } else {
      setIsPlayingAudio(true);
      startAudioSynth();

      // Step through stanzas automatically every 7 seconds
      stepTimerRef.current = window.setInterval(() => {
        setActiveStanzaIndex((prev) => {
          const next = (prev + 1) % SENA_HYMN_STANZAS.length;
          startAudioSynth();
          return next;
        });
      }, 7000);
    }
  };

  const handleResetAudio = () => {
    setIsPlayingAudio(false);
    if (stepTimerRef.current) clearInterval(stepTimerRef.current);
    setActiveStanzaIndex(0);
  };

  const handleCopyLyrics = () => {
    const fullText = `HIMNO OFICIAL DEL SENA\n\n` +
      SENA_HYMN_STANZAS.map((s) => `[${s.type}]\n${s.text}`).join('\n\n');
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownloadLyrics = () => {
    const fullText = `HIMNO OFICIAL DEL SERVICIO NACIONAL DE APRENDIZAJE (SENA)\n\n` +
      `Compuesto por un Coro y 4 Estrofas\n` +
      `República de Colombia\n\n` +
      SENA_HYMN_STANZAS.map((s) => `[${s.type}]\n${s.text}`).join('\n\n') +
      `\n\n---\nDocumento Institucional para Aprendices del SENA`;

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Himno_Oficial_del_SENA.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    return () => {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
      {/* Top Header & Multimedia Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wider mb-1">
            <Music className="w-4 h-4" />
            <span>Himno Institucional del SENA</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Himno Oficial del SENA
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compuesto por un coro y 4 estrofas · Disponible en audio, video oficial y letra completa
          </p>
        </div>

        {/* Media Selector Tabs (Audio, Video, Letra, Vista Dual) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Video & Letra</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'video'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Video</span>
          </button>

          <button
            onClick={() => setActiveTab('audio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'audio'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Audio & Melodía</span>
          </button>

          <button
            onClick={() => setActiveTab('lyrics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'lyrics'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Solo Letra</span>
          </button>
        </div>
      </div>

      {/* Main Content Stage according to Selected Media View */}
      <div className="space-y-6">
        {/* VIEW 1: Dual Mode (Video + Letra) or Solo Video */}
        {(activeTab === 'all' || activeTab === 'video') && (
          <div className={`grid gap-6 items-start ${activeTab === 'all' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
            {/* Embedded Official Video Player */}
            <div className={`${activeTab === 'all' ? 'lg:col-span-7' : 'max-w-4xl mx-auto w-full'} space-y-3`}>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-[#39A900]" />
                  Video Oficial del SENA en Alta Definición
                </span>

                {/* Video Version Toggle */}
                <div className="flex items-center gap-1 text-[11px]">
                  <button
                    onClick={() => setSelectedVideoId('gB_P1zb2_ds')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      selectedVideoId === 'gB_P1zb2_ds'
                        ? 'bg-[#39A900] text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Subtitulado & LSC
                  </button>
                  <button
                    onClick={() => setSelectedVideoId('6Db009yNvpc')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      selectedVideoId === '6Db009yNvpc'
                        ? 'bg-[#39A900] text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Versión Coral
                  </button>
                </div>
              </div>

              {/* Responsive Video Frame */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black shadow-md">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideoId}?rel=0&modestbranding=1`}
                  title="Video Oficial del Himno del SENA"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Canal Institucional SENA Comunica · Video con Lengua de Señas Colombiana</span>
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-[#39A900] transition-colors"
                >
                  <span>Abrir en YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Accompanying Lyrics Column in Dual Mode */}
            {activeTab === 'all' && (
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#39A900]" />
                    Letra Oficial Sincronizada
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLyrics}
                      className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#39A900] transition-colors"
                      title="Copiar letra al portapapeles"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copiada' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {SENA_HYMN_STANZAS.map((stanza, idx) => (
                    <div
                      key={stanza.type}
                      onClick={() => setActiveStanzaIndex(idx)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        idx === activeStanzaIndex
                          ? 'border-[#39A900] bg-emerald-50/70 dark:bg-emerald-950/20 ring-1 ring-[#39A900]'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#39A900] uppercase tracking-wider text-[11px]">
                          {stanza.type}
                        </span>
                        {idx === activeStanzaIndex && (
                          <span className="text-[10px] font-semibold text-[#39A900]">
                            Estrofa activa
                          </span>
                        )}
                      </div>
                      <p className="whitespace-pre-line leading-relaxed font-medium text-slate-800 dark:text-slate-200">
                        {stanza.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: Audio & Melody Player Bar */}
        {(activeTab === 'all' || activeTab === 'audio') && (
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#39A900] text-white flex items-center justify-center shadow-xs">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Guía Melódica y Marcha Institucional (Web Audio)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Sintetizador interactivo del compás melódico oficial con avance automático
                  </p>
                </div>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleAudio}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all shadow-sm ${
                    isPlayingAudio
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-[#39A900] hover:bg-[#318f00]'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pausar Audio</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>Reproducir Melodía</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleResetAudio}
                  className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Reiniciar reproducción"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Dynamic Equalizer Wave Animation when playing */}
            {isPlayingAudio && (
              <div className="flex items-center gap-2 py-2 px-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200">
                <div className="flex items-end gap-1 h-4">
                  <span className="w-1 bg-[#39A900] animate-pulse h-2 rounded-full" />
                  <span className="w-1 bg-[#39A900] animate-pulse h-4 rounded-full" />
                  <span className="w-1 bg-[#39A900] animate-pulse h-3 rounded-full" />
                  <span className="w-1 bg-[#39A900] animate-pulse h-4 rounded-full" />
                  <span className="w-1 bg-[#39A900] animate-pulse h-2 rounded-full" />
                </div>
                <span className="font-medium">
                  Sincronizando: {SENA_HYMN_STANZAS[activeStanzaIndex].type}
                </span>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: Full Lyrics Grid (Solo Letra) */}
        {(activeTab === 'lyrics' || activeTab === 'audio') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Estructura Poética Oficial (Coro y 4 Estrofas)
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLyrics}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '¡Letra Copiada!' : 'Copiar Letra'}</span>
                </button>

                <button
                  onClick={handleDownloadLyrics}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#39A900] text-white hover:bg-[#318f00] transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar TXT</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SENA_HYMN_STANZAS.map((stanza, idx) => {
                const isActive = idx === activeStanzaIndex;
                return (
                  <div
                    key={stanza.type}
                    onClick={() => setActiveStanzaIndex(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#39A900] bg-emerald-50/70 dark:bg-emerald-950/20 shadow-sm ring-1 ring-[#39A900]'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isActive ? 'text-[#39A900]' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {stanza.type}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#39A900] text-white">
                          En reproducción
                        </span>
                      )}
                    </div>
                    <p className={`whitespace-pre-line text-sm leading-relaxed font-medium ${
                      isActive ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-300'
                    }`}>
                      {stanza.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer protocol notice */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
          <span>El Himno del SENA se entona solemnemente en actos de inducción, posesión de voceros y ceremonias de grado.</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLyrics}
            className="hover:text-[#39A900] transition-colors"
          >
            Copiar texto
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={handleDownloadLyrics}
            className="hover:text-[#39A900] transition-colors"
          >
            Descargar archivo .txt
          </button>
        </div>
      </div>
    </div>
  );
};
