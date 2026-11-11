import React, { useState, useEffect } from 'react';
import { ApprenticeProgress, InstructorProfile } from '../types';
import { SENA_MODULES } from '../data/senaData';
import { SenaLogo } from './SenaLogo';
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  User,
  Save,
  Sparkles,
  Info,
  HelpCircle,
  FileCheck,
  Lightbulb,
  RotateCcw,
  Lock,
  Key,
  Eye,
  EyeOff,
  AlertCircle,
  LogIn
} from 'lucide-react';

interface RoleLandingPageProps {
  cohort: ApprenticeProgress[];
  instructor: InstructorProfile;
  selectedApprenticeId: string;
  onSelectApprenticeAndStart: (apprenticeId: string) => void;
  onStartAsNewApprentice: (name: string, document: string, email: string) => void;
  onStartAsInstructor: () => void;
}

export const RoleLandingPage: React.FC<RoleLandingPageProps> = ({
  cohort,
  instructor,
  selectedApprenticeId,
  onSelectApprenticeAndStart,
  onStartAsNewApprentice,
  onStartAsInstructor
}) => {
  // Form fields for apprentice identity & tracking - Se inician completamente limpios
  const [docType, setDocType] = useState<'CC' | 'TI' | 'CE'>('CC');
  const [docNumber, setDocNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [matchedApprentice, setMatchedApprentice] = useState<ApprenticeProgress | null>(null);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Credenciales genéricas del rol de instructor
  const GENERIC_INSTRUCTOR_USER = 'instructor';
  const GENERIC_INSTRUCTOR_PASS = 'sena2026';

  const [instructorUsername, setInstructorUsername] = useState('');
  const [instructorPassword, setInstructorPassword] = useState('');
  const [showInstructorPassword, setShowInstructorPassword] = useState(false);
  const [instructorAuthError, setInstructorAuthError] = useState('');
  const [isInstructorLoggingIn, setIsInstructorLoggingIn] = useState(false);

  // Autocompletar credenciales genéricas para comodidad
  const handleFillGenericCredentials = () => {
    setInstructorUsername(GENERIC_INSTRUCTOR_USER);
    setInstructorPassword(GENERIC_INSTRUCTOR_PASS);
    setInstructorAuthError('');
  };

  const handleInstructorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setInstructorAuthError('');

    const trimmedUser = instructorUsername.trim().toLowerCase();
    const trimmedPass = instructorPassword.trim();

    if (!trimmedUser || !trimmedPass) {
      setInstructorAuthError('Por favor diligencia el usuario y la contraseña.');
      return;
    }

    const validUsers = ['instructor', 'cmorales', 'cmorales@sena.edu.co', 'instructor@sena.edu.co', 'admin'];
    const validPasswords = ['sena2026', 'Sena2026', 'sena1234', 'Sena1234*', 'sena2024'];

    if (validUsers.includes(trimmedUser) && validPasswords.includes(trimmedPass)) {
      setIsInstructorLoggingIn(true);
      setTimeout(() => {
        onStartAsInstructor();
      }, 300);
    } else {
      setInstructorAuthError('Credenciales incorrectas. Verifica el usuario o la contraseña genérica.');
    }
  };

  // Limpiar todos los campos del formulario
  const handleResetForm = () => {
    setDocType('CC');
    setDocNumber('');
    setFullName('');
    setEmail('');
    setMatchedApprentice(null);
  };

  // Auto-detect if entered document matches an existing apprentice in the cohort
  useEffect(() => {
    const trimmedDoc = docNumber.trim();
    if (!trimmedDoc) {
      setMatchedApprentice(null);
      return;
    }
    const found = cohort.find((a) => a.documentNumber === trimmedDoc);
    if (found) {
      setMatchedApprentice(found);
      setFullName(found.fullName);
      setEmail(found.email);
    } else {
      setMatchedApprentice(null);
    }
  }, [docNumber, cohort]);

  const handleSelectQuickApprentice = (apr: ApprenticeProgress) => {
    setDocNumber(apr.documentNumber);
    setFullName(apr.fullName);
    setEmail(apr.email);
    setMatchedApprentice(apr);
  };

  const handleSaveAndEnterApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNumber.trim() || !fullName.trim()) return;

    setIsSavedNotice(true);

    setTimeout(() => {
      if (matchedApprentice) {
        // Update matched apprentice name/email if modified and enter
        onSelectApprenticeAndStart(matchedApprentice.id);
      } else {
        // Register new apprentice profile and enter
        onStartAsNewApprentice(fullName.trim(), docNumber.trim(), email.trim());
      }
    }, 400);
  };

  return (
    <div className="space-y-10 pb-8">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-900">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src="/src/assets/images/sena_campus_banner_1794325194739.jpg"
            alt="Campus de Formación Tecnológica SENA en Colombia"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-75 contrast-105"
          />
          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        {/* Hero Overlay Content */}
        <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300">
              <SenaLogo className="w-4 h-4 text-[#39A900]" />
              <span>Servicio Nacional de Aprendizaje · SENA Colombia</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-300 bg-black/40 px-3 py-1 rounded-lg border border-white/10">
              <span>Ficha Activa:</span>
              <strong className="text-white">#{instructor.assignedFicha}</strong>
            </div>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Plataforma de Inducción Institucional
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed max-w-2xl">
              Bienvenido al espacio oficial de inducción. Elige tu perfil de ingreso: si eres <strong className="text-white font-semibold">Aprendiz</strong>,
              diligencia tus datos de identificación para guardar tu perfil y registrar tu progreso formativo. Si eres el <strong className="text-white font-semibold">Instructor Encargado</strong>,
              accede a la consola de supervisión de la cohorte.
            </p>
          </div>
        </div>
      </div>

      {/* Two Role Decision Cards (Aprendiz vs Instructor) */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Identificación y Acceso por Rol
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Los aprendices registran sus datos para guardar y certificar su progreso individual; el instructor supervisa a toda la cohorte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Rol de Aprendiz con Formulario de Identificación y Guardado de Perfil */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500/50 dark:border-emerald-500/30 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-emerald-500 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

            <div>
              {/* Header Card 1 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center shadow-xs border border-emerald-100 dark:border-emerald-800">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#39A900] uppercase tracking-wider">
                      Paso 1 · Acceso de Aprendices
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Soy Aprendiz SENA
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Formación Integral
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Diligencia o verifica tus datos requeridos a continuación. Tu perfil quedará guardado para registrar tu avance en los 4 módulos, tus calificaciones y expedir tu certificado oficial de inducción.
              </p>

              {/* Panel de Pistas y Guía de Diligenciamiento */}
              <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 mb-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    <Lightbulb className="w-4 h-4 text-[#39A900] shrink-0" />
                    <span>Pistas para diligenciar tus datos:</span>
                  </div>
                  {(docNumber || fullName || email) && (
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40"
                      title="Limpiar todos los campos"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Limpiar campos</span>
                    </button>
                  )}
                </div>
                <ul className="text-[11px] text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
                  <li>• <strong>Documento:</strong> Ingresa solo números sin puntos ni espacios (ej: <code className="bg-emerald-100 dark:bg-emerald-900/60 px-1 py-0.5 rounded font-mono">1098765432</code>).</li>
                  <li>• <strong>Nombres y Apellidos:</strong> Digita tus nombres y apellidos tal como figuran en tu cédula para la expedición de tu certificado.</li>
                  <li>• <strong>Correo Institucional:</strong> Utiliza tu cuenta <code className="bg-emerald-100 dark:bg-emerald-900/60 px-1 py-0.5 rounded font-mono">@soy.sena.edu.co</code> o tu correo de contacto principal.</li>
                  <li>• <strong>Progreso:</strong> Si ya estás registrado en la cohorte, el sistema cargará automáticamente tus módulos completados; si eres nuevo, crearás tu perfil de inicio.</li>
                </ul>
              </div>

              {/* Formulario de Datos Requeridos del Aprendiz */}
              <form onSubmit={handleSaveAndEnterApprentice} className="space-y-4">
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-4">
                  {/* Row 1: Document type & Document Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Tipo Doc.:
                      </label>
                      <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value as 'CC' | 'TI' | 'CE')}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                      >
                        <option value="CC">Cédula (C.C.)</option>
                        <option value="TI">Tarjeta Identidad (T.I.)</option>
                        <option value="CE">Cédula Extranjería (C.E.)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Número de Documento <span className="text-emerald-600">*</span>:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: 1098765432"
                        value={docNumber}
                        onChange={(e) => setDocNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                      />
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-[#39A900] inline shrink-0" />
                        <span><strong>Pista:</strong> Solo dígitos sin puntos ni guiones (ej. 1098765432).</span>
                      </p>
                    </div>
                  </div>

                  {/* Row 2: Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Nombres y Apellidos Completos <span className="text-emerald-600">*</span>:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Valentina Restrepo Morales"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-[#39A900] inline shrink-0" />
                      <span><strong>Pista:</strong> Digita tus nombres y apellidos tal como saldrán en tu acta y certificado de inducción.</span>
                    </p>
                  </div>

                  {/* Row 3: Institutional Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Correo Electrónico Institucional:
                    </label>
                    <input
                      type="email"
                      placeholder="Ej: vrestrepo@soy.sena.edu.co"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-[#39A900] inline shrink-0" />
                      <span><strong>Pista:</strong> Ingresa tu correo con terminación @soy.sena.edu.co o tu correo personal habitual.</span>
                    </p>
                  </div>

                  {/* Row 4: Ficha & Program Information (ReadOnly/Verified Context) */}
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 grid grid-cols-2 gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <div>
                      <span className="block font-semibold text-slate-700 dark:text-slate-300">Ficha de Formación:</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">#{instructor.assignedFicha}</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-700 dark:text-slate-300">Programa:</span>
                      <span className="truncate block" title={instructor.programName}>{instructor.programName}</span>
                    </div>
                  </div>

                  {/* Recognition feedback message */}
                  {matchedApprentice ? (
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2 text-xs text-emerald-900 dark:text-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">
                          ¡Aprendiz Identificado en Sistema!
                        </span>
                        <span>
                          Tu progreso actual es del <strong className="tabular-nums">{Math.round((matchedApprentice.completedModules.length / SENA_MODULES.length) * 100)}%</strong> ({matchedApprentice.completedModules.length} de {SENA_MODULES.length} módulos completados).
                          {matchedApprentice.completedModules.length === 4 && ' ¡Tu certificado está listo para descarga!'}
                        </span>
                      </div>
                    </div>
                  ) : docNumber.trim() ? (
                    <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 flex items-start gap-2 text-xs text-sky-900 dark:text-sky-200">
                      <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Nuevo Aprendiz</span>
                        <span>
                          Al guardar tu perfil se creará tu registro oficial en la Ficha #{instructor.assignedFicha} iniciando tu ruta desde el Módulo 1.
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Quick prefill chips for testing */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>💡 Pistas de prueba: Autocompletar con un aprendiz existente:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cohort.slice(0, 4).map((apr) => {
                      const isSelected = matchedApprentice?.id === apr.id;
                      const pct = Math.round((apr.completedModules.length / SENA_MODULES.length) * 100);
                      return (
                        <button
                          key={apr.id}
                          type="button"
                          onClick={() => handleSelectQuickApprentice(apr)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                            isSelected
                              ? 'bg-[#39A900] text-white shadow-xs font-semibold'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {apr.fullName.split(' ')[0]} ({pct}%)
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit / Save button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!docNumber.trim() || !fullName.trim()}
                    className="w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#39A900] hover:bg-[#318f00] disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isSavedNotice ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 animate-bounce" />
                        <span>¡Perfil Guardado! Entrando al Prototipo...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Guardar Perfil y Continuar al Prototipo</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Card 2: Rol de Instructor Único (Lead Teacher & Evaluator) */}
          <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-[#00324D] dark:hover:border-slate-700 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/5 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00324D] text-white flex items-center justify-center shadow-xs">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                      Revisión y Supervisión
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Soy el Instructor
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  Docente Único
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Espacio exclusivo para el docente líder responsable de consolidar la información, auditar el avance de cada aprendiz y avalar las certificaciones emitidas.
              </p>

              {/* Designated instructor identity badge */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Instructor Titular Responsable:
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {instructor.name}
                  </h4>
                  <p className="text-xs text-[#39A900] font-semibold mt-0.5">
                    {instructor.roleTitle}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {instructor.email}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Ficha bajo supervisión:</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-mono">#{instructor.assignedFicha}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Cohorte de aprendices:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{cohort.length} registrados</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificaciones listas:</span>
                    <strong className="text-[#39A900]">
                      {cohort.filter((a) => a.completedModules.length === 4).length} aprobados
                    </strong>
                  </div>
                </div>
              </div>

              {/* Responsibilities list */}
              <div className="space-y-2 mb-6 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Seguimiento individual de evidencias y resultados de aprendizaje</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Detección temprana y medidas formativas a aprendices sin iniciar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Exportación oficial de notas y actas de inducción a CSV</span>
                </div>
              </div>
              {/* Credenciales Genéricas Box */}
              <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/70 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-950 dark:text-sky-200">
                    <Key className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Credenciales Genéricas de Acceso:</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillGenericCredentials}
                    className="text-[11px] font-semibold text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-white underline decoration-dotted transition-colors"
                  >
                    Autocompletar
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-sky-200/60 dark:border-sky-900/60">
                    <span className="text-[10px] uppercase font-sans text-slate-400 block font-semibold">Usuario:</span>
                    <strong className="text-slate-800 dark:text-slate-200">instructor</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-sky-200/60 dark:border-sky-900/60">
                    <span className="text-[10px] uppercase font-sans text-slate-400 block font-semibold">Contraseña:</span>
                    <strong className="text-slate-800 dark:text-slate-200">sena2026</strong>
                  </div>
                </div>
              </div>

              {/* Formulario de Inicio de Sesión de Instructor */}
              <form onSubmit={handleInstructorLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Usuario del Docente <span className="text-sky-600">*</span>:
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={instructorUsername}
                      onChange={(e) => {
                        setInstructorUsername(e.target.value);
                        if (instructorAuthError) setInstructorAuthError('');
                      }}
                      placeholder="Ej: instructor"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-sky-600"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Pista genérica: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-slate-700 dark:text-slate-300">instructor</code>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Contraseña <span className="text-sky-600">*</span>:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      type={showInstructorPassword ? 'text' : 'password'}
                      required
                      value={instructorPassword}
                      onChange={(e) => {
                        setInstructorPassword(e.target.value);
                        if (instructorAuthError) setInstructorAuthError('');
                      }}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-sky-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowInstructorPassword(!showInstructorPassword)}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                      title={showInstructorPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                    >
                      {showInstructorPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Pista genérica: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-slate-700 dark:text-slate-300">sena2026</code>
                  </p>
                </div>

                {instructorAuthError && (
                  <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-start gap-2 text-xs text-red-700 dark:text-red-300">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                    <span>{instructorAuthError}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isInstructorLoggingIn || !instructorUsername.trim() || !instructorPassword.trim()}
                    className="w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#00324D] hover:bg-[#002236] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isInstructorLoggingIn ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 animate-bounce text-emerald-400" />
                        <span>Autenticando Instructor...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>Validar Credenciales y Acceder</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum & Induction Pillars Overview */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs font-bold text-[#39A900] uppercase tracking-wider block mb-1">
            Contenidos del Proceso
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Ejes Temáticos de la Inducción SENA
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#39A900] flex items-center justify-center mb-2 font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Identidad e Imagen
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Historia desde 1957 por Rodolfo Martínez Tono, valores éticos, misión y visión nacional.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#39A900] flex items-center justify-center mb-2 font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Reglamento del Aprendiz
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Acuerdo 009 de 2024 y mod. Acuerdo 002 de 2026: Derechos, deberes, faltas y garantías del debido proceso.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#39A900] flex items-center justify-center mb-2 font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Etapa Productiva
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Las 6 alternativas avaladas: Contrato de aprendizaje, vínculo laboral, pasantía y proyectos.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#39A900] flex items-center justify-center mb-2 font-bold text-xs">
              04
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Bienestar al Aprendiz
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Salud, cultura, deporte, apoyos de sostenimiento FIC y elección democrática de voceros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
