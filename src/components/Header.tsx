import React from 'react';
import { SectionType, UserRole } from '../types';
import { UserCheck, GraduationCap, Sun, Moon, LogOut, ArrowLeft, Video } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface HeaderProps {
  currentSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  currentRole: UserRole;
  onGoToLanding: () => void;
  onToggleRole: () => void;
  apprenticeName: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenVideoModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onSelectSection,
  currentRole,
  onGoToLanding,
  onToggleRole,
  apprenticeName,
  isDarkMode,
  onToggleDarkMode,
  onOpenVideoModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={onGoToLanding}
            className="flex items-center gap-3 text-left group focus:outline-none"
            title="Ir al inicio / Selección de rol"
          >
            <div className="w-11 h-11 rounded-xl bg-[#39A900] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 p-1.5">
              <SenaLogo className="w-8 h-8 text-white" />
            </div>
            <div className="whitespace-nowrap shrink-0">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                SENA <span className="text-[#39A900]">Inducción</span>
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Only shown when a role is active) */}
          {currentRole !== 'landing' ? (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <button
                onClick={() => onSelectSection('overview')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  currentSection === 'overview'
                    ? 'border-[#39A900] text-[#39A900] font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Ruta de Aprendizaje
              </button>
              <button
                onClick={() => onSelectSection('modules')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  currentSection === 'modules'
                    ? 'border-[#39A900] text-[#39A900] font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Módulos y Normativa
              </button>
              <button
                onClick={() => onSelectSection('symbols')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  currentSection === 'symbols'
                    ? 'border-[#39A900] text-[#39A900] font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Símbolos e Himno
              </button>
              <button
                onClick={() => onSelectSection('simulator')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  currentSection === 'simulator'
                    ? 'border-[#39A900] text-[#39A900] font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Simulador de Comité
              </button>
              <button
                onClick={() => onSelectSection('glossary')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  currentSection === 'glossary'
                    ? 'border-[#39A900] text-[#39A900] font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Glosario SENA
              </button>
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Portal de Ingreso Institucional</span>
              <span aria-hidden="true">·</span>
              <span>Ficha 2874921</span>
            </div>
          )}

          {/* Zone 3: Role Switcher & Dark Mode Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            {currentRole !== 'landing' ? (
              <>
                {/* Switch between apprentice / instructor */}
                <button
                  onClick={onToggleRole}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                    currentRole === 'instructor'
                      ? 'bg-[#00324D] text-white hover:bg-[#002236] shadow-sm'
                      : 'bg-emerald-50 dark:bg-emerald-950/40 text-[#2a8000] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                  }`}
                  title="Cambiar entre vista de Aprendiz e Instructor"
                >
                  {currentRole === 'instructor' ? (
                    <>
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Instructor (Activo)</span>
                      <span className="sm:hidden">Instructor</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Aprendiz: {apprenticeName.split(' ')[0]}</span>
                      <span className="sm:hidden">Aprendiz</span>
                    </>
                  )}
                </button>

                {/* Return to Landing / Role selection */}
                <button
                  onClick={onGoToLanding}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  title="Cambiar de Rol / Salir a la página principal"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cambiar Rol</span>
                </button>
              </>
            ) : (
              <div className="text-xs font-semibold text-slate-500 hidden sm:block">
                Selecciona tu Rol
              </div>
            )}

            {/* Video Manual Button */}
            <button
              onClick={onOpenVideoModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all text-xs font-semibold shadow-xs"
              title="Ver video manual de la plataforma"
            >
              <Video className="w-3.5 h-3.5 text-[#39A900]" />
              <span>Video Manual</span>
            </button>

            {/* Dark Mode Toggle Button (Top Right Corner) */}
            <button
              onClick={onToggleDarkMode}
              className="flex items-center justify-center p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation when inside a role */}
        {currentRole !== 'landing' && (
          <div className="flex md:hidden overflow-x-auto gap-4 py-2 text-xs border-t border-slate-100 dark:border-slate-800 no-scrollbar">
            <button
              onClick={() => onSelectSection('overview')}
              className={`whitespace-nowrap px-2 py-1 rounded ${currentSection === 'overview' ? 'text-[#39A900] font-bold' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Ruta
            </button>
            <button
              onClick={() => onSelectSection('modules')}
              className={`whitespace-nowrap px-2 py-1 rounded ${currentSection === 'modules' ? 'text-[#39A900] font-bold' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Módulos
            </button>
            <button
              onClick={() => onSelectSection('symbols')}
              className={`whitespace-nowrap px-2 py-1 rounded ${currentSection === 'symbols' ? 'text-[#39A900] font-bold' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Símbolos
            </button>
            <button
              onClick={() => onSelectSection('simulator')}
              className={`whitespace-nowrap px-2 py-1 rounded ${currentSection === 'simulator' ? 'text-[#39A900] font-bold' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Simulador
            </button>
            <button
              onClick={() => onSelectSection('glossary')}
              className={`whitespace-nowrap px-2 py-1 rounded ${currentSection === 'glossary' ? 'text-[#39A900] font-bold' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Glosario
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
