export type UserRole = 'landing' | 'apprentice' | 'instructor';

export interface InstructorProfile {
  id: string;
  name: string;
  email: string;
  roleTitle: string;
  centroFormacion: string;
  regional: string;
  assignedFicha: string;
  programName: string;
}

export type SectionType = 
  | 'overview'
  | 'modules'
  | 'simulator'
  | 'symbols'
  | 'glossary'
  | 'tracking-instructor'
  | 'certificate';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  articleReference?: string;
}

export interface ModuleData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  category: 'identidad' | 'normativa' | 'etapas' | 'bienestar';
  summary: string;
  learningOutcomes: string[];
  sections: {
    title: string;
    content: string;
    keyTakeaway?: string;
    points?: string[];
  }[];
  quiz: QuizQuestion[];
}

export interface CaseStudy {
  id: string;
  title: string;
  situation: string;
  apprenticeName: string;
  program: string;
  faultCategoryOptions: string[];
  correctFaultCategory: string; // 'Académica' | 'Disciplinaria' | 'No constituye falta'
  severityOptions: string[];
  correctSeverity: string; // 'Leve' | 'Grave' | 'Gravísima' | 'No aplica'
  measureOptions: string[];
  correctMeasure: string;
  legalRationale: string;
  article: string;
}

export interface GlossaryTerm {
  term: string;
  acronym?: string;
  definition: string;
  category: 'Académico' | 'Institucional' | 'Plataformas' | 'Normativo';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface ApprenticeProgress {
  id: string;
  documentNumber: string;
  fullName: string;
  email: string;
  fichaNumber: string;
  programName: string;
  regional: string;
  centroFormacion: string;
  avatarUrl?: string;
  completedModules: string[]; // module ids
  moduleScores: Record<string, number>; // moduleId -> score (0-100)
  casesSolved: string[];
  badges: Badge[];
  inductionCompleted: boolean;
  inductionCompletedDate?: string;
}
