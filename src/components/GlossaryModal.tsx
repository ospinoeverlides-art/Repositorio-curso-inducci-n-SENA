import React, { useState } from 'react';
import { SENA_GLOSSARY } from '../data/senaData';
import { Search, BookOpen, Tag } from 'lucide-react';

export const GlossaryModal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Institucional', 'Académico', 'Plataformas', 'Normativo'];

  const filteredTerms = SENA_GLOSSARY.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.acronym && item.acronym.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#39A900] uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Vocabulario Técnico Institucional</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Glosario de Términos y Acrónimos SENA
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Familiarízate con el lenguaje técnico, las siglas y las metodologías pedagógicas que usarás a diario durante toda tu etapa formativa en el SENA.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar término o sigla (ej: RAP, SOFIA, FPI)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#39A900] text-white shadow-sm font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTerms.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-2">
                <span className="font-semibold text-[#39A900]">{item.category}</span>
                {item.acronym && (
                  <span className="font-mono text-[11px] text-slate-500">Sigla</span>
                )}
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {item.term}
              </h4>

              {item.acronym && (
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 mb-2 italic">
                  {item.acronym}
                </div>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                {item.definition}
              </p>
            </div>
          </div>
        ))}

        {filteredTerms.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No se encontraron términos que coincidan con la búsqueda
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Prueba con palabras como "FPI", "Comité", "Etapa Productiva" o selecciona otra categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
