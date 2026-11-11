/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SectionType, ModuleData, ApprenticeProgress, UserRole } from './types';
import {
  MOCK_FICHA_APPRENTICES,
  DEFAULT_CURRENT_APPRENTICE,
  SENA_MODULES,
  INITIAL_BADGES,
  DESIGNATED_INSTRUCTOR
} from './data/senaData';

import { Header } from './components/Header';
import { RoleLandingPage } from './components/RoleLandingPage';
import { ApprenticeDashboard } from './components/ApprenticeDashboard';
import { ModuleViewer } from './components/ModuleViewer';
import { InteractiveShield } from './components/InteractiveShield';
import { HymnPlayer } from './components/HymnPlayer';
import { CaseSimulator } from './components/CaseSimulator';
import { GlossaryModal } from './components/GlossaryModal';
import { InstructorDashboard } from './components/InstructorDashboard';
import { QuizModal } from './components/QuizModal';
import { CertificateModal } from './components/CertificateModal';
import { VideoModal } from './components/VideoModal';
import { SenaLogo } from './components/SenaLogo';

export default function App() {
  // Role selector state: defaults to 'landing'
  const [currentRole, setCurrentRole] = useState<UserRole>('landing');
  const [currentSection, setCurrentSection] = useState<SectionType>('overview');
  const [cohort, setCohort] = useState<ApprenticeProgress[]>(MOCK_FICHA_APPRENTICES);
  const [activeApprenticeId, setActiveApprenticeId] = useState<string>(DEFAULT_CURRENT_APPRENTICE.id);

  // Dark mode state and blur transition
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sena_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isThemeBlurring, setIsThemeBlurring] = useState<boolean>(false);

  // Sync dark class on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleDarkMode = () => {
    // 1. Activate the screen blur effect
    setIsThemeBlurring(true);

    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem('sena_dark_mode', String(nextMode));

    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 2. Smoothly ease out blur after the new theme renders
    window.setTimeout(() => {
      setIsThemeBlurring(false);
    }, 450);
  };

  // Modals state
  const [activeQuizModule, setActiveQuizModule] = useState<ModuleData | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [certificateTarget, setCertificateTarget] = useState<ApprenticeProgress | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const activeApprentice =
    cohort.find((a) => a.id === activeApprenticeId) || cohort[0] || DEFAULT_CURRENT_APPRENTICE;

  // Role transition actions
  const handleSelectApprenticeAndStart = (apprenticeId: string) => {
    setActiveApprenticeId(apprenticeId);
    setCurrentRole('apprentice');
    setCurrentSection('overview');
  };

  const handleStartAsNewApprentice = (name: string, document: string, email: string) => {
    const newApprentice: ApprenticeProgress = {
      id: `apr-${Date.now()}`,
      documentNumber: document,
      fullName: name,
      email: email || `${document}@soy.sena.edu.co`,
      fichaNumber: DESIGNATED_INSTRUCTOR.assignedFicha,
      programName: DESIGNATED_INSTRUCTOR.programName,
      regional: DESIGNATED_INSTRUCTOR.regional,
      centroFormacion: DESIGNATED_INSTRUCTOR.centroFormacion,
      completedModules: [],
      moduleScores: {},
      casesSolved: [],
      badges: INITIAL_BADGES.map((b) => ({ ...b, unlocked: false })),
      inductionCompleted: false
    };
    setCohort((prev) => [newApprentice, ...prev]);
    setActiveApprenticeId(newApprentice.id);
    setCurrentRole('apprentice');
    setCurrentSection('overview');
  };

  const handleStartAsInstructor = () => {
    setCurrentRole('instructor');
  };

  const handleGoToLanding = () => {
    setCurrentRole('landing');
  };

  const handleToggleRole = () => {
    if (currentRole === 'instructor') {
      setCurrentRole('apprentice');
    } else {
      setCurrentRole('instructor');
    }
  };

  // Passing quiz logic
  const handlePassQuiz = (moduleId: string, scorePercent: number) => {
    setCohort((prevCohort) =>
      prevCohort.map((apprentice) => {
        if (apprentice.id !== activeApprentice.id) return apprentice;

        const updatedCompleted = Array.from(new Set([...apprentice.completedModules, moduleId]));
        const updatedScores = {
          ...apprentice.moduleScores,
          [moduleId]: scorePercent
        };

        const isAllModulesDone = updatedCompleted.length === SENA_MODULES.length;

        // Badge unlock map
        const badgeMap: Record<string, string> = {
          'mod-1': 'badge-identidad',
          'mod-2': 'badge-reglamento',
          'mod-3': 'badge-productivo',
          'mod-4': 'badge-bienestar'
        };

        const unlockedBadgeId = badgeMap[moduleId];

        const updatedBadges = apprentice.badges.map((b) => {
          if (b.id === unlockedBadgeId) {
            return { ...b, unlocked: true, unlockedDate: 'Hoy' };
          }
          if (b.id === 'badge-graduado' && isAllModulesDone) {
            return { ...b, unlocked: true, unlockedDate: 'Hoy' };
          }
          return b;
        });

        return {
          ...apprentice,
          completedModules: updatedCompleted,
          moduleScores: updatedScores,
          badges: updatedBadges,
          inductionCompleted: isAllModulesDone,
          inductionCompletedDate: isAllModulesDone ? '10 de Noviembre' : apprentice.inductionCompletedDate
        };
      })
    );
  };

  // Case solving logic
  const handleCaseSolved = (caseId: string) => {
    setCohort((prevCohort) =>
      prevCohort.map((apprentice) => {
        if (apprentice.id !== activeApprentice.id) return apprentice;

        const updatedCases = Array.from(new Set([...apprentice.casesSolved, caseId]));
        const isAllCasesDone = updatedCases.length >= 4;

        const updatedBadges = apprentice.badges.map((b) => {
          if (b.id === 'badge-juez' && isAllCasesDone) {
            return { ...b, unlocked: true, unlockedDate: 'Hoy' };
          }
          return b;
        });

        return {
          ...apprentice,
          casesSolved: updatedCases,
          badges: updatedBadges
        };
      })
    );
  };

  const handleAddApprentice = (newApprentice: ApprenticeProgress) => {
    setCohort((prev) => [newApprentice, ...prev]);
    setActiveApprenticeId(newApprentice.id);
  };

  const handleOpenCertificateFor = (target: ApprenticeProgress) => {
    setCertificateTarget(target);
    setIsCertificateOpen(true);
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 relative ${
        isThemeBlurring ? 'theme-blur-active' : 'theme-blur-settling'
      }`}
    >
      {/* Dynamic Screen Blur Overlay during theme switch */}
      {isThemeBlurring && (
        <div className="theme-blur-curtain" aria-hidden="true" />
      )}

      {/* Institutional Top Bar with Role Management */}
      <Header
        currentSection={currentSection}
        onSelectSection={setCurrentSection}
        currentRole={currentRole}
        onGoToLanding={handleGoToLanding}
        onToggleRole={handleToggleRole}
        apprenticeName={activeApprentice.fullName}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenVideoModal={() => setIsVideoModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* VIEW 1: Role Landing Page */}
        {currentRole === 'landing' && (
          <RoleLandingPage
            cohort={cohort}
            instructor={DESIGNATED_INSTRUCTOR}
            selectedApprenticeId={activeApprenticeId}
            onSelectApprenticeAndStart={handleSelectApprenticeAndStart}
            onStartAsNewApprentice={handleStartAsNewApprentice}
            onStartAsInstructor={handleStartAsInstructor}
          />
        )}

        {/* VIEW 2: Instructor Dashboard */}
        {currentRole === 'instructor' && (
          <InstructorDashboard
            apprentices={cohort}
            currentApprenticeId={activeApprentice.id}
            onSelectApprentice={(id) => {
              setActiveApprenticeId(id);
              setCurrentRole('apprentice');
              setCurrentSection('overview');
            }}
            onAddApprentice={handleAddApprentice}
            onViewCertificate={handleOpenCertificateFor}
          />
        )}

        {/* VIEW 3: Apprentice Experience */}
        {currentRole === 'apprentice' && (
          <>
            {currentSection === 'overview' && (
              <ApprenticeDashboard
                apprentice={activeApprentice}
                onNavigate={setCurrentSection}
                onStartModule={() => {
                  setCurrentSection('modules');
                }}
                onViewCertificate={() => handleOpenCertificateFor(activeApprentice)}
              />
            )}

            {currentSection === 'modules' && (
              <ModuleViewer
                onStartQuiz={(mod) => setActiveQuizModule(mod)}
                completedModules={activeApprentice.completedModules}
                moduleScores={activeApprentice.moduleScores}
              />
            )}

            {currentSection === 'symbols' && (
              <div className="space-y-8">
                <InteractiveShield />
                <HymnPlayer />
              </div>
            )}

            {currentSection === 'simulator' && (
              <CaseSimulator
                onCaseSolved={handleCaseSolved}
                solvedCases={activeApprentice.casesSolved}
              />
            )}

            {currentSection === 'glossary' && <GlossaryModal />}
          </>
        )}
      </main>

      {/* Quiz Modal */}
      {activeQuizModule && (
        <QuizModal
          module={activeQuizModule}
          onClose={() => setActiveQuizModule(null)}
          onPassQuiz={handlePassQuiz}
          previousScore={activeApprentice.moduleScores[activeQuizModule.id]}
        />
      )}

      {/* Certificate Modal */}
      {isCertificateOpen && certificateTarget && (
        <CertificateModal
          apprentice={certificateTarget}
          onClose={() => {
            setIsCertificateOpen(false);
            setCertificateTarget(null);
          }}
        />
      )}

      {/* Video Manual Modal */}
      {isVideoModalOpen && (
        <VideoModal onClose={() => setIsVideoModalOpen(false)} />
      )}

      {/* Institutional Footer */}
      <footer className="mt-auto bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-xs text-slate-500 dark:text-slate-400 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SenaLogo className="w-4 h-4 text-[#39A900] shrink-0" />
            <span className="font-bold text-[#00324D] dark:text-white">
              SENA · Servicio Nacional de Aprendizaje
            </span>
            <span aria-hidden="true">·</span>
            <span>República de Colombia</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Reglamento del Aprendiz (Acuerdo 009 de 2024 y mod. Acuerdo 002 de 2026)</span>
            <span aria-hidden="true">·</span>
            <span>Instructor Líder: {DESIGNATED_INSTRUCTOR.name}</span>
            <span aria-hidden="true">·</span>
            <span>Ficha {DESIGNATED_INSTRUCTOR.assignedFicha}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
