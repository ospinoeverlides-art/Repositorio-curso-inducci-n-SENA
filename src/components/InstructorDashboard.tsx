import React, { useState } from 'react';
import { ApprenticeProgress } from '../types';
import { Users, CheckCircle2, AlertCircle, Clock, Search, Download, Plus, Award, ChevronRight, UserCheck } from 'lucide-react';

interface InstructorDashboardProps {
  apprentices: ApprenticeProgress[];
  currentApprenticeId: string;
  onSelectApprentice: (apprenticeId: string) => void;
  onAddApprentice: (newApprentice: ApprenticeProgress) => void;
  onViewCertificate: (apprentice: ApprenticeProgress) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  apprentices,
  currentApprenticeId,
  onSelectApprentice,
  onAddApprentice,
  onViewCertificate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress' | 'not_started'>('all');
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New Apprentice Form State
  const [newName, setNewName] = useState('');
  const [newDoc, setNewDoc] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newFicha, setNewFicha] = useState('2874921');
  const [newProgram, setNewProgram] = useState('Análisis y Desarrollo de Software (ADSO)');

  // Statistics calculation
  const totalCount = apprentices.length;
  const completedCount = apprentices.filter((a) => a.completedModules.length === 4).length;
  const completionRate = Math.round((completedCount / totalCount) * 100) || 0;
  
  // Calculate general average score across all tests
  let totalScoreSum = 0;
  let scoreCount = 0;
  apprentices.forEach((a) => {
    Object.values(a.moduleScores).forEach((score) => {
      totalScoreSum += score;
      scoreCount++;
    });
  });
  const overallAvgScore = scoreCount > 0 ? Math.round(totalScoreSum / scoreCount) : 0;
  const inRiskCount = apprentices.filter((a) => a.completedModules.length === 0).length;

  // Filtered apprentices
  const filteredApprentices = apprentices.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.documentNumber.includes(searchTerm) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase());

    const isCompleted = a.completedModules.length === 4;
    const isNotStarted = a.completedModules.length === 0;
    const isInProgress = !isCompleted && !isNotStarted;

    let matchesStatus = true;
    if (statusFilter === 'completed') matchesStatus = isCompleted;
    if (statusFilter === 'in_progress') matchesStatus = isInProgress;
    if (statusFilter === 'not_started') matchesStatus = isNotStarted;

    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = ['Nombre Completo', 'Documento', 'Email', 'Ficha', 'Modulos Completados', 'Promedio Calificacion', 'Estado Induccion'];
    const rows = apprentices.map((a) => {
      const scores = Object.values(a.moduleScores);
      const avg = scores.length > 0 ? Math.round(scores.reduce((x, y) => x + y, 0) / scores.length) : 0;
      const status = a.completedModules.length === 4 ? 'Certificado' : a.completedModules.length > 0 ? 'En Progreso' : 'Sin Iniciar';
      return [
        `"${a.fullName}"`,
        `"${a.documentNumber}"`,
        `"${a.email}"`,
        `"${a.fichaNumber}"`,
        `"${a.completedModules.length}/4"`,
        `"${avg}%"`,
        `"${status}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SENA_Seguimiento_Induccion_Ficha_${newFicha}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDoc.trim()) return;

    const created: ApprenticeProgress = {
      id: `apr-${Date.now()}`,
      documentNumber: newDoc,
      fullName: newName,
      email: newEmail || `${newDoc}@soy.sena.edu.co`,
      fichaNumber: newFicha,
      programName: newProgram,
      regional: 'Regional Antioquia',
      centroFormacion: 'Centro de Formación en Tecnologías de la Información',
      completedModules: [],
      moduleScores: {},
      casesSolved: [],
      badges: [],
      inductionCompleted: false
    };

    onAddApprentice(created);
    setNewName('');
    setNewDoc('');
    setNewEmail('');
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00324D] dark:text-emerald-400 uppercase tracking-wider mb-1">
              <Users className="w-4 h-4" />
              <span>Consola del Instructor y Coordinador Académico</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Seguimiento al Proceso de Inducción · Ficha {newFicha}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Monitorea el avance de lectura, evaluaciones de normativa y emisión de certificaciones para toda la cohorte.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#318f00] rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Aprendiz</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Reporte</span>
            </button>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Aprendices</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
              {totalCount}
            </div>
            <span className="text-[11px] text-slate-400">Cohorte activa</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tasa de Certificación</span>
            <div className="text-2xl font-bold text-[#39A900] mt-1 tabular-nums">
              {completionRate}%
            </div>
            <span className="text-[11px] text-slate-400">{completedCount} de {totalCount} completaron</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Promedio en Quizzes</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
              {overallAvgScore}%
            </div>
            <span className="text-[11px] text-slate-400">Rendimiento académico</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sin Iniciar (En Riesgo)</span>
            <div className="text-2xl font-bold text-amber-600 mt-1 tabular-nums">
              {inRiskCount}
            </div>
            <span className="text-[11px] text-slate-400">Requieren seguimiento</span>
          </div>
        </div>
      </div>

      {/* Cohort Tracking Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {/* Table Filters & Search */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                statusFilter === 'all'
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Todos ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                statusFilter === 'completed'
                  ? 'bg-[#39A900] text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Certificados ({completedCount})
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                statusFilter === 'in_progress'
                  ? 'bg-sky-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              En Progreso ({totalCount - completedCount - inRiskCount})
            </button>
            <button
              onClick={() => setStatusFilter('not_started')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                statusFilter === 'not_started'
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Sin Iniciar ({inRiskCount})
            </button>
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Aprendiz</th>
                <th className="py-3.5 px-4">Documento</th>
                <th className="py-3.5 px-4">Progreso de Inducción</th>
                <th className="py-3.5 px-4 text-center">Módulos</th>
                <th className="py-3.5 px-4 text-center">Promedio</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredApprentices.map((apprentice) => {
                const isSelected = apprentice.id === currentApprenticeId;
                const isComplete = apprentice.completedModules.length === 4;
                const progressPct = Math.round((apprentice.completedModules.length / 4) * 100);
                
                const scores = Object.values(apprentice.moduleScores);
                const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

                return (
                  <tr
                    key={apprentice.id}
                    className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${
                      isSelected ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 uppercase text-xs">
                          {apprentice.fullName.charAt(0)}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white block">
                            {apprentice.fullName}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {apprentice.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                      {apprentice.documentNumber}
                    </td>

                    <td className="py-3.5 px-4 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#39A900] h-full"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold tabular-nums text-slate-700 dark:text-slate-300">
                          {progressPct}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center font-semibold tabular-nums text-slate-800 dark:text-slate-200">
                      {apprentice.completedModules.length} / 4
                    </td>

                    <td className="py-3.5 px-4 text-center font-semibold tabular-nums">
                      {avg !== null ? (
                        <span className="text-[#39A900]">{avg}%</span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {isComplete ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Certificado</span>
                        </span>
                      ) : apprentice.completedModules.length > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 dark:text-sky-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>En Progreso</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Sin Iniciar</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isComplete && (
                          <button
                            onClick={() => onViewCertificate(apprentice)}
                            className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded"
                            title="Ver Certificado de Inducción"
                          >
                            <Award className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => onSelectApprentice(apprentice.id)}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                            isSelected
                              ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                              : 'bg-emerald-50 dark:bg-emerald-950/40 text-[#2a8000] dark:text-emerald-400 hover:bg-emerald-100'
                          }`}
                        >
                          {isSelected ? 'Activo' : 'Ver como'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add New Apprentice */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-md w-full p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Registrar Nuevo Aprendiz a la Ficha
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Ingresa los datos para incorporar al aprendiz a la cohorte de inducción.
            </p>

            <form onSubmit={handleCreateApprentice} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre Completo:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Camilo Andrés Pérez"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Número de Documento (C.C. o T.I.):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 1045987123"
                  value={newDoc}
                  onChange={(e) => setNewDoc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Correo Electrónico Institucional:
                </label>
                <input
                  type="email"
                  placeholder="Ej: cperez@soy.sena.edu.co"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-3.5 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white bg-[#39A900] hover:bg-[#318f00] font-semibold"
                >
                  Guardar y Matricular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
