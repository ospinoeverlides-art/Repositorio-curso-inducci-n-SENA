import React, { useState } from 'react';
import { Cog, Wheat, ShoppingBag, Flag, Sparkles, ChevronRight, Award } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface SymbolSection {
  id: string;
  title: string;
  sector: string;
  icon: React.ElementType;
  description: string;
  symbolism: string;
  relevanceToday: string;
}

const SYMBOLS_DATA: SymbolSection[] = [
  {
    id: 'pinon',
    title: 'La Rueda Dentada (El Piñón)',
    sector: 'Sector Industria y de la Construcción',
    icon: Cog,
    description: 'Representa la fuerza transformadora de la industria manufacturera, la metalmecánica, la construcción y los procesos tecnológicos que mueven el aparato productivo del país.',
    symbolism: 'La unión de los dientes del engranaje simboliza cómo el trabajo articulado y constante de cada ciudadano edifica la economía nacional.',
    relevanceToday: 'Fundamento para programas en automatización, robótica, electricidad, soldadura y desarrollo de infraestructura sostenible.'
  },
  {
    id: 'caduceo',
    title: 'El Caduceo Alado',
    sector: 'Sector Comercio y Servicios',
    icon: ShoppingBag,
    description: 'Vara alada entrelazada por dos serpientes, heráldica tradicional que simboliza la concordia, el comercio próspero, la administración y la prestación de servicios.',
    symbolism: 'Las alas significan agilidad y visión prospectiva; las dos serpientes representan la prudencia y el equilibrio en las transacciones comerciales y el servicio al cliente.',
    relevanceToday: 'Inspira la formación en gestión logística, desarrollo de software, finanzas, analítica de datos, hotelería y turismo internacional.'
  },
  {
    id: 'cafe',
    title: 'La Rama de Café con Frutos',
    sector: 'Sector Agropecuario y Primario',
    icon: Wheat,
    description: 'Ramas fecundas de café cargadas de cerezas maduras, rindiendo homenaje al campesinado colombiano y a la riqueza féil de la tierra.',
    symbolism: 'Reconoce las raíces agrícolas de Colombia y el compromiso del SENA con el campo, la seguridad alimentaria y el desarrollo agroindustrial rural.',
    relevanceToday: 'Base de programas como SENA Emprende Rural (SER), agrotecnología, café de especialidad, biotecnología y ganadería regenerativa.'
  },
  {
    id: 'caminante',
    title: 'El Logotipo del Caminante',
    sector: 'Identidad del Aprendiz del Siglo XXI',
    icon: SenaLogo,
    description: 'El símbolo gráfico moderno del SENA representa a un ser humano con los brazos abiertos avanzando con paso firme sobre un camino geométrico hacia el horizonte.',
    symbolism: 'Refleja la superación personal, la apropiación de la técnica y la ciencia, y la responsabilidad de construir su propio proyecto de vida.',
    relevanceToday: 'Es la marca que portan más de un millón de aprendices en sus uniformes, carnés y proyectos a lo largo y ancho de Colombia.'
  },
  {
    id: 'bandera',
    title: 'La Bandera Institucional',
    sector: 'Paz, Libertad y Valores Cívicos',
    icon: Flag,
    description: 'Un lienzo completamente blanco de proporciones reglamentarias que lleva en su centro el escudo oficial del SENA.',
    symbolism: 'El color blanco proclama la paz, la transparencia institucional, la convivencia fraterna y la inclusión sin distingos de credo, raza o condición social.',
    relevanceToday: 'Ondea en los 117 centros de formación de los 32 departamentos y en eventos internacionales como WorldSkills.'
  }
];

export const InteractiveShield: React.FC = () => {
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('pinon');

  const activeSymbol = SYMBOLS_DATA.find((s) => s.id === selectedSymbolId) || SYMBOLS_DATA[0];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#39A900] uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" />
            <span>Heráldica e Iconografía SENA</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Explorador Interactivo de los Símbolos Institucionales
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Cada elemento del Escudo y la Bandera del SENA fue diseñado con un profundo significado patriótico.
            Haz clic en los componentes a continuación para explorar su heráldica, los tres sectores económicos de Colombia y su relevancia actual.
          </p>
        </div>
      </div>

      {/* Main Two-Zone Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Stage: Visual Asset & Hotspots */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
          <div className="w-full text-center mb-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Escudo Oficial del SENA
            </span>
          </div>

          <div className="relative group max-w-xs w-full flex items-center justify-center p-6 bg-slate-50/60 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            <img
              src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
              onError={(e) => {
                e.currentTarget.src = '/src/assets/images/escudo_sena_oficial.png';
              }}
              alt="Escudo Oficial del SENA con tres sectores de la economía"
              referrerPolicy="no-referrer"
              className="max-h-64 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Quick Select Buttons below image */}
          <div className="w-full mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5">
              Selecciona un elemento para examinar:
            </div>
            <div className="flex flex-wrap gap-2">
              {SYMBOLS_DATA.map((sym) => {
                const isSelected = sym.id === selectedSymbolId;
                const IconComponent = sym.icon;
                return (
                  <button
                    key={sym.id}
                    onClick={() => setSelectedSymbolId(sym.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#39A900] text-white shadow-sm font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{sym.title.split(' ')[0]} {sym.title.split(' ')[1] || ''}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Stage: Detailed Concept & Explanation Deck */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#39A900] flex items-center justify-center border border-emerald-100 dark:border-emerald-800">
                  <activeSymbol.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {activeSymbol.title}
                  </h3>
                  <p className="text-xs font-medium text-[#39A900]">
                    {activeSymbol.sector}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Descripción Heráldica
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeSymbol.description}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>Simbolismo para el Aprendiz</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeSymbol.symbolism}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Relevancia en la Formación Actual
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeSymbol.relevanceToday}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation between symbols */}
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Símbolo {SYMBOLS_DATA.findIndex((s) => s.id === selectedSymbolId) + 1} de {SYMBOLS_DATA.length}
            </span>
            <button
              onClick={() => {
                const currentIndex = SYMBOLS_DATA.findIndex((s) => s.id === selectedSymbolId);
                const nextIndex = (currentIndex + 1) % SYMBOLS_DATA.length;
                setSelectedSymbolId(SYMBOLS_DATA[nextIndex].id);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#39A900] hover:text-[#2d8500] transition-colors"
            >
              <span>Siguiente símbolo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
