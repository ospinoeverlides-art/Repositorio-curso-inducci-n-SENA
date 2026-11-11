import { ModuleData, CaseStudy, GlossaryTerm, ApprenticeProgress, InstructorProfile } from '../types';

export const SENA_MODULES: ModuleData[] = [
  {
    id: 'mod-1',
    number: 1,
    title: 'Identidad e Imagen Institucional',
    subtitle: 'Historia, misión, visión, símbolos patrios e institucionales',
    durationMinutes: 30,
    category: 'identidad',
    summary: 'Comprende el origen histórico del SENA, su propósito como entidad estatal líder en formación integral y el significado de sus insignias institucionales.',
    learningOutcomes: [
      'Reconocer la historia del SENA y a su fundador, Rodolfo Martínez Tono.',
      'Apropiar la misión, visión y principios éticos que rigen la comunidad SENA.',
      'Interpretar el significado heráldico del Escudo, la Bandera, el Logotipo y el Himno Institucional.'
    ],
    sections: [
      {
        title: '1. Historia y Fundación (1957)',
        content: 'El Servicio Nacional de Aprendizaje (SENA) nació en 1957 mediante el Decreto Ley 118 de 1957, concebido durante una conversación a orillas del lago Lemán (Suiza) entre el economista y abogado cartagenero Rodolfo Martínez Tono y Francis Blanchard, alto directivo de la OIT (Organización Internacional del Trabajo). La idea era brindar formación técnica práctica a la clase obrera y campesina de Colombia para impulsar la industrialización nacional.',
        keyTakeaway: 'Fundador: Rodolfo Martínez Tono · Creado el 21 de junio de 1957 · Vinculado al Ministerio del Trabajo.',
        points: [
          'Brinda formación profesional integral, gratuita e incluyente.',
          'Con presencia en los 32 departamentos del territorio nacional y en más de 117 centros de formación.',
          'Articulado permanentemente con el sector empresarial y las necesidades de productividad de las regiones.'
        ]
      },
      {
        title: '2. Misión y Visión Institucional',
        content: 'La Misión del SENA radica en invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral para la incorporación de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.\n\nSu Visión proyecta al SENA como una entidad de clase mundial en innovación, formación técnica y tecnológica, fortaleciendo la competitividad de las empresas y el empleo digno.',
        keyTakeaway: 'Valores: Integridad, Transparencia, Respeto, Compromiso, Diligencia, Solidaridad y Justicia.'
      },
      {
        title: '3. Los Símbolos Institucionales',
        content: 'La imagen del SENA representa el trabajo, la ciencia y la técnica al servicio de Colombia. Se compone de 4 insignias fundamentales:\n\n• El Escudo: Enmarcado por una cinta dorada, presenta una rueda dentada (piñón) que simboliza la industria y la construcción; el caduceo alado con dos serpientes que representa el comercio y los servicios; y la rama de café con frutos que honra al sector agropecuario y primario.\n• La Bandera: De color blanco impoluto en su totalidad, simboliza la paz, la tranquilidad y la libertad, portando en su centro el escudo institucional.\n• El Logotipo (Símbolo del Aprendiz): Representa a un ser humano caminando hacia el futuro sobre un sendero geométrico, transmitiendo superación personal, esfuerzo y liderazgo constructivo.\n• El Himno del SENA: Compuesto por un coro y 4 estrofas, exalta a los aprendices y la juventud colombiana forjando la patria, el trabajo digno, la ciencia y la paz.',
        keyTakeaway: 'Los 3 sectores de la economía nacional confluyen en el escudo: Industria, Comercio/Servicios y Agropecuario.'
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: '¿Quién fue el visionario fundador del SENA en el año 1957?',
        options: [
          'Rodolfo Martínez Tono',
          'Alberto Lleras Camargo',
          'Francis Blanchard',
          'Jorge Eliécer Gaitán'
        ],
        correctAnswer: 0,
        explanation: 'Rodolfo Martínez Tono ideó y fundó el SENA en 1957 con el apoyo de la Organización Internacional del Trabajo (OIT).'
      },
      {
        id: 'q1-2',
        question: 'En el Escudo del SENA, ¿qué sector económico representa la rueda dentada o piñón?',
        options: [
          'Sector Agropecuario y Minero',
          'Sector Industria y de la Construcción',
          'Sector Comercio y Servicios',
          'Sector Tecnológico y de Comunicaciones'
        ],
        correctAnswer: 1,
        explanation: 'El piñón o rueda dentada simboliza la fuerza laboral, la industria manufacturera y la construcción.'
      },
      {
        id: 'q1-3',
        question: '¿Qué simboliza el color blanco predominante en la Bandera del SENA?',
        options: [
          'El uniforme de los aprendices de cocina',
          'La paz, la tranquilidad y la libertad',
          'La pureza de los recursos minerales de Colombia',
          'El rigor técnico en las evaluaciones'
        ],
        correctAnswer: 1,
        explanation: 'La bandera totalmente blanca simboliza los principios de paz, convivencia, tranquilidad y libertad que promulga la institución.'
      },
      {
        id: 'q1-4',
        question: '¿Qué figura humana y geométrica describe el logotipo moderno del SENA?',
        options: [
          'Un atleta saltando una valla',
          'Un estudiante leyendo un libro abierto',
          'Un ser humano que camina hacia el futuro sobre un sendero',
          'Una balanza de justicia y trabajo'
        ],
        correctAnswer: 2,
        explanation: 'El logotipo del aprendiz ilustra a una persona decidida caminando hacia el horizonte sobre un sendero, encarnando superación y formación.'
      }
    ]
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'Reglamento del Aprendiz (Acuerdo 009 de 2024 y mod. Acuerdo 002 de 2026)',
    subtitle: 'Derechos, deberes, prohibiciones, faltas y garantías del debido proceso',
    durationMinutes: 45,
    category: 'normativa',
    summary: 'Aprende la versión vigente del Reglamento del Aprendiz (Acuerdo 009 de 2024), sus derechos inalienables, deberes corporativos, clasificación de faltas y las garantías de debido proceso actualizadas mediante el Acuerdo 002 de 2026.',
    learningOutcomes: [
      'Diferenciar con precisión los derechos, deberes y prohibiciones del aprendiz SENA.',
      'Clasificar las faltas disciplinarias y académicas según su gravedad (leves, graves, gravísimas).',
      'Conocer el debido proceso disciplinario y las funciones del Comité de Evaluación y Seguimiento.'
    ],
    sections: [
      {
        title: '1. Derechos y Deberes Fundamentales',
        content: 'El aprendiz es el protagonista de su proceso formativo. Posee derechos como recibir inducción integral, acceder a ambientes de formación dotados con tecnologías actualizadas, ser escuchado respetuosamente, participar activamente en la vida comunitaria y disfrutar de bienestar integral.\n\nA la par, asume deberes esenciales: portar en todo momento y en lugar visible el carné institucional dentro y fuera de las instalaciones, asistir con puntualidad a las sesiones presenciales y virtuales, cuidar la infraestructura y herramientas, y respetar los derechos humanos de instructores, directivos y compañeros.',
        keyTakeaway: 'El carné institucional es personal e intransferible. Portarlo con orgullo es un deber diario obligatorio.',
        points: [
          'Derecho al debido proceso ante cualquier reporte o presunción de falta.',
          'Deber de justificar inasistencias dentro de los 3 días hábiles siguientes.',
          'Deber de respetar las normas de seguridad y salud en el trabajo (SST) y usar Elementos de Protección Personal (EPP).'
        ]
      },
      {
        title: '2. Clasificación de Faltas: Académicas y Disciplinarias',
        content: 'Las faltas se configuran cuando el aprendiz incumple sus deberes o incurre en prohibiciones expresas:\n\n• Faltas Académicas: Relacionadas directamente con el compromiso en el aprendizaje, entrega oportuna de evidencias, apropiación de competencias y asistencia a actividades de formación.\n• Faltas Disciplinarias: Relacionadas con el comportamiento individual y grupal, el respeto a la integridad física o moral de las personas, el uso de sustancias psicoactivas o porte de armas, daño a bienes del Estado y fraude o suplantación.',
        keyTakeaway: 'Gravedad: Se clasifican en Leves, Graves o Gravísimas según los criterios de intencionalidad, reiteración, daño causado y grado de perturbación.'
      },
      {
        title: '3. Medidas Formativas vs. Sanciones',
        content: 'El SENA prioriza el carácter pedagógico y formativo sobre el punitivo:\n\n1. Medidas Formativas:\n• Llamado de atención verbal (pedagógico e inmediato).\n• Plan de Mejoramiento Académico (acuerdo entre aprendiz e instructor para subsanar evidencias pendientes en plazo pactado).\n• Plan de Mejoramiento Disciplinario (compromiso de conducta y cambio de actitud concertado).\n\n2. Sanciones Formales (Dictadas por Subdirector de Centro previo Comité):\n• Llamado de atención escrito con copia a hoja de vida.\n• Condicionamiento de matrícula (compromiso estricto durante el resto del programa).\n• Cancelación de matrícula (conlleva la pérdida del carácter de aprendiz e inhabilidad de 6 meses a 2 años para reingresar al SENA).',
        keyTakeaway: 'Toda sanción requiere el debido proceso, formulación de cargos, derecho a presentar descargos y posibilidad de recurso de reposición.'
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: '¿Cuántos días hábiles tiene un aprendiz para radicar la justificación formal ante una inasistencia?',
        options: [
          'Hasta 15 días después de finalizar el mes',
          'Máximo 3 días hábiles siguientes a la inasistencia',
          'No se requiere justificar si avisa por WhatsApp',
          '8 días calendario'
        ],
        correctAnswer: 1,
        explanation: 'Según el Reglamento del Aprendiz, las inasistencias deben justificarse por escrito con soportes válidos dentro de los 3 días hábiles siguientes.'
      },
      {
        id: 'q2-2',
        question: '¿Cuál de las siguientes acciones es una Medida Formativa de carácter pedagógico y NO una sanción?',
        options: [
          'Cancelación de la matrícula',
          'Condicionamiento de matrícula',
          'Plan de Mejoramiento Académico concertado',
          'Llamado de atención escrito con copia a la hoja de vida'
        ],
        correctAnswer: 2,
        explanation: 'El Plan de Mejoramiento Académico es una medida formativa concertada con el instructor para lograr los resultados de aprendizaje pendientes.'
      },
      {
        id: 'q2-3',
        question: 'Presentar evidencias de aprendizaje tomadas de internet sin citar fuentes o plagiadas de otro aprendiz constituye una falta:',
        options: [
          'Leve sin mayor relevancia académica',
          'Grave o gravísima que atenta contra la honestidad académica',
          'Una sugerencia de mejora de estilo',
          'Un trámite que se soluciona con disculpas verbales'
        ],
        correctAnswer: 1,
        explanation: 'El plagio y el fraude académico vulneran la ética institucional y son considerados faltas graves o gravísimas según el Reglamento.'
      },
      {
        id: 'q2-4',
        question: '¿Quién es la única autoridad facultada para imponer las sanciones de Condicionamiento o Cancelación de Matrícula?',
        options: [
          'El Representante de Aprendices',
          'El Instructor técnico de la ficha',
          'El Subdirector del Centro de Formación mediante acto administrativo',
          'El vigilante de la portería'
        ],
        correctAnswer: 2,
        explanation: 'El Subdirector de Centro es la única autoridad con competencia para imponer sanciones mediante resolución motivada, luego del dictamen del Comité.'
      }
    ]
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'Etapas de Formación y Alternativas Productivas',
    subtitle: 'Etapa lectiva, etapa productiva y sus 6 modalidades de cumplimiento',
    durationMinutes: 35,
    category: 'etapas',
    summary: 'Descubre cómo se articula la formación profesional por proyectos y las 6 alternativas legales reconocidas para realizar con éxito tu etapa productiva.',
    learningOutcomes: [
      'Entender la estructura de la formación por proyectos y los Resultados de Aprendizaje (RAP).',
      'Conocer los requisitos y características de las 6 alternativas de etapa productiva.',
      'Identificar los derechos económicos y de seguridad social del Contrato de Aprendizaje (Ley 789 de 2002).'
    ],
    sections: [
      {
        title: '1. Formación Profesional Integral (FPI)',
        content: 'La Formación Profesional Integral del SENA se enfoca en el "Saber", "Saber Hacer" y "Saber Ser". No es mera instrucción memorística, sino desarrollo de competencias laborales orientadas a solucionar problemas reales de la comunidad y del sector productivo mediante la Metodología de Formación por Proyectos.',
        keyTakeaway: 'Etapa Lectiva: Desarrollo teórico-práctico en ambientes de aprendizaje físicos y virtuales.'
      },
      {
        title: '2. Las 6 Alternativas de Etapa Productiva',
        content: 'Para titularte debes aprobar obligatoriamente la etapa productiva mediante alguna de las siguientes opciones avaladas:\n\n1. Contrato de Aprendizaje: Relación formativa con una empresa patrocinadora que otorga apoyo de sostenimiento (mínimo el 75% o 100% de un SMMLV según desempleo nacional) y cobertura en EPS y ARL.\n2. Vínculo Laboral o Contractual: Si ya trabajas formalmente en actividades directamente afines a tu programa de formación.\n3. Proyecto Productivo: Emprendimiento validado por la Unidad de Emprendimiento SENA o Fondo Emprender.\n4. Pasantía: Práctica en PYMEs, empresas familiares, ONG o entidades estatales con plan de concertación concertado.\n5. Monitoría: Apoyo técnico, pedagógico o administrativo dentro de los ambientes y laboratorios del centro SENA con apoyo económico institucional.\n6. Apoyo a Entidad Estatal o Comunitaria: Práctica en alcaldías, colegios o juntas comunales en proyectos de desarrollo social.',
        keyTakeaway: 'Cada aprendiz debe registrar y concertar su alternativa a través del sistema SOFIA Plus / aplicativo institucional asignado.'
      },
      {
        title: '3. Seguimiento y Bitácoras de Etapa Productiva',
        content: 'Durante tu etapa práctica contarás con un instructor de seguimiento asignado. Debes diligenciar periódicamente el formato F023 (Planeación, Seguimiento y Evaluación de Etapa Productiva) y bitácoras quincenales firmadas por tu jefe inmediato en la empresa.',
        keyTakeaway: 'El incumplimiento injustificado en la etapa productiva puede acarrear la cancelación de la matrícula.'
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'En el Contrato de Aprendizaje durante la etapa productiva, ¿qué coberturas de seguridad social amparan al aprendiz por ley?',
        options: [
          'Solo pensión obligatoria',
          'Salud (EPS) y Riesgos Laborales (ARL)',
          'No tiene cobertura de seguridad social',
          'Únicamente seguro funerario'
        ],
        correctAnswer: 1,
        explanation: 'La empresa patrocinadora asume por ley la afiliación completa a EPS y a la Administradora de Riesgos Laborales (ARL).'
      },
      {
        id: 'q3-2',
        question: '¿Cuál de las siguientes es una alternativa formalmente aprobada para la etapa productiva en el SENA?',
        options: [
          'Pasantía empresarial o institucional',
          'Vender productos por redes sociales sin registro de proyecto',
          'Tomar vacaciones durante 6 meses',
          'Hacer cursos libres sin relación con el programa'
        ],
        correctAnswer: 0,
        explanation: 'La pasantía empresarial concertada es una de las 6 alternativas oficiales reconocidas por el SENA.'
      },
      {
        id: 'q3-3',
        question: '¿Qué documento oficial de seguimiento registra periódicamente las evidencias y avances en la empresa durante la etapa productiva?',
        options: [
          'El carné estudiantil',
          'Las bitácoras y formato de seguimiento F023',
          'Una carta informal del aprendiz',
          'El recibo de nómina únicamente'
        ],
        correctAnswer: 1,
        explanation: 'El formato de planeación y evaluación F023 junto con las bitácoras quincenales son el registro formal del avance práctico.'
      }
    ]
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'Bienestar al Aprendiz y Servicios de Apoyo',
    subtitle: 'Apoyos socioeconómicos, liderazgo, cultura, deporte y salud',
    durationMinutes: 25,
    category: 'bienestar',
    summary: 'Conoce todas las oportunidades y beneficios complementarios que el SENA pone a tu disposición para garantizar tu permanencia y éxito formativo.',
    learningOutcomes: [
      'Identificar las dimensiones del Plan Nacional Integral de Bienestar al Aprendiz.',
      'Conocer los requisitos para postularse a apoyos de sostenimiento (FIC y Regular).',
      'Comprender el rol y la elección de Voceros de Ficha y Representante de Centro.'
    ],
    sections: [
      {
        title: '1. Dimensiones de Bienestar al Aprendiz',
        content: 'El área de Bienestar al Aprendiz acompaña tu formación mediante programas enfocados en:\n\n• Salud y Prevención: Campañas de salud integral, salud mental, prevención de adicciones y primeros auxilios.\n• Deporte y Recreación: Torneos intercentros de fútbol, baloncesto, atletismo, juegos autóctonos y acondicionamiento físico.\n• Cultura y Arte: Grupos de danza folclórica, música, teatro, literatura y artes visuales.\n• Habilidades Socioemocionales: Talleres de resiliencia, comunicación asertiva, resolución pacífica de conflictos y liderazgo.',
        keyTakeaway: 'Participar en actividades de bienestar fortalece tu hoja de vida y tu desarrollo como ser humano integral.'
      },
      {
        title: '2. Apoyos Socioeconómicos y Subsidios',
        content: 'Para mitigar la deserción por factores económicos, el SENA ofrece convocatorias periódicas de:\n\n• Apoyo de Sostenimiento Regular: Para aprendices de estratos 1 y 2 que no cuenten con contrato de aprendizaje.\n• Apoyo de Sostenimiento FIC: Exclusivo para programas afines a la Industria de la Construcción.\n• Subsidios de Transporte y Alimentación: Convenios locales para facilitar el desplazamiento a los centros de formación.',
        keyTakeaway: 'Requisito clave: Mantener excelente rendimiento académico, puntualidad y no tener sanciones vigentes.'
      },
      {
        title: '3. Democracia y Liderazgo SENA',
        content: 'Cada grupo de aprendices (Ficha) elige al inicio de su formación a un Vocero Titular y un Vocero Suplente. Los voceros son el puente de comunicación directa entre el grupo y los instructores/coordinadores.\n\nAnualmente se realiza la jornada de elección democrática del Representante de Centro, quien representa la voz de los aprendices en el Consejo de Centro y ante la Dirección General.',
        keyTakeaway: 'El liderazgo en el SENA es una escuela de formación ciudadana y participación democrática.'
      }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: '¿Cuál es el rol principal del Vocero de Ficha elegido democráticamente por su grupo?',
        options: [
          'Hacer las evaluaciones en lugar del instructor',
          'Cobrar dinero para los materiales de formación',
          'Ser el canal de interlocución y liderazgo constructivo entre el grupo y la institución',
          'Asignar las sanciones a sus compañeros'
        ],
        correctAnswer: 2,
        explanation: 'El vocero representa los intereses formativos del grupo, dinamiza la comunicación y lidera iniciativas constructivas.'
      },
      {
        id: 'q4-2',
        question: '¿Qué condición indispensable se exige para mantener un Apoyo de Sostenimiento de Bienestar?',
        options: [
          'Tener automóvil propio',
          'Mantener excelente desempeño académico y no tener sanciones disciplinarias',
          'Vivir a menos de 5 minutos del centro',
          'Pagar una mensualidad a la coordinación'
        ],
        correctAnswer: 1,
        explanation: 'Los apoyos socioeconómicos premian la dedicación, excelencia académica y cumplimiento estricto del reglamento.'
      },
      {
        id: 'q4-3',
        question: '¿Qué tipo de apoyo socioeconómico está destinado específicamente a aprendices de programas de construcción?',
        options: [
          'Apoyo de Sostenimiento FIC (Fondo de la Industria de la Construcción)',
          'Beca Erasmus Plus',
          'Subsidio de Vivienda Gratuita',
          'Crédito bancario rotativo'
        ],
        correctAnswer: 0,
        explanation: 'El apoyo FIC proviene de la contribución especial de la industria de la construcción y beneficia a sus aprendices.'
      }
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Caso 1: Evidencias duplicadas en plataforma virtual',
    apprenticeName: 'Carlos Mendieta',
    program: 'Técnico en Sistemas (Ficha 289104)',
    situation: 'Durante la revisión del Resultado de Aprendizaje "Configuración de redes locales", el instructor evidencia que Carlos presentó exactamente el mismo informe técnico, capturas y diagramas de otro aprendiz de una ficha anterior, sin citación y cambiando únicamente la portada.',
    faultCategoryOptions: [
      'Académica',
      'Disciplinaria',
      'No constituye falta'
    ],
    correctFaultCategory: 'Académica',
    severityOptions: [
      'Leve',
      'Grave',
      'No aplica'
    ],
    correctSeverity: 'Grave',
    measureOptions: [
      'Plan de Mejoramiento Académico con entrega de evidencia original o remisión a Comité',
      'Expulsión inmediata sin derecho a descargos',
      'Ignorar el caso para no perjudicar la estadística'
    ],
    correctMeasure: 'Plan de Mejoramiento Académico con entrega de evidencia original o remisión a Comité',
    legalRationale: 'El plagio de evidencias académicas vulnera la autenticidad del aprendizaje. El instructor debe citar al aprendiz, no aprobar el resultado y formular Plan de Mejoramiento; si hay reiteración o negativa, se eleva a Comité de Evaluación y Seguimiento.',
    article: 'Artículos 9 (Deberes Académicos) y 10 (Prohibiciones sobre fraude en evidencias) del Reglamento del Aprendiz.'
  },
  {
    id: 'case-2',
    title: 'Caso 2: Alteración de la convivencia en taller de maquinaria',
    apprenticeName: 'Julián Pantoja',
    program: 'Tecnólogo en Mantenimiento Electromecánico (Ficha 284521)',
    situation: 'Durante una práctica en el taller de soldadura, Julián agredió verbalmente de forma soez y amenazó físicamente a un compañero por una disputa sobre el uso de una herramienta. Además, se rehusó reiteradamente a utilizar las gafas de seguridad y guantes reglamentarios.',
    faultCategoryOptions: [
      'Académica',
      'Disciplinaria',
      'No constituye falta'
    ],
    correctFaultCategory: 'Disciplinaria',
    severityOptions: [
      'Leve',
      'Grave',
      'No aplica'
    ],
    correctSeverity: 'Grave',
    measureOptions: [
      'Citación a Comité de Evaluación y Seguimiento para debido proceso disciplinario',
      'Una felicitación por defender sus herramientas',
      'Cambiar al compañero agredido de ficha'
    ],
    correctMeasure: 'Citación a Comité de Evaluación y Seguimiento para debido proceso disciplinario',
    legalRationale: 'La agresión verbal/física y el desacato a normas de Seguridad y Salud en el Trabajo (SST) amenazan la vida y la integridad de la comunidad educativa, constituyendo falta disciplinaria grave remitible a Comité.',
    article: 'Artículos 10 (Prohibiciones) y 26 (Tipificación de Faltas Disciplinarias) del Reglamento del Aprendiz.'
  },
  {
    id: 'case-3',
    title: 'Caso 3: Inasistencia por calamidad doméstica comprobada',
    apprenticeName: 'Valeria Osorio',
    program: 'Tecnólogo en Gestión Empresarial (Ficha 291330)',
    situation: 'Valeria faltó a dos sesiones de formación presencial consecutivas. Al segundo día hábil, radicó mediante correo institucional al instructor y a coordinación la certificación médica hospitalaria que sustentaba una urgencia de salud de su hija menor.',
    faultCategoryOptions: [
      'Académica',
      'Disciplinaria',
      'No constituye falta'
    ],
    correctFaultCategory: 'No constituye falta',
    severityOptions: [
      'Leve',
      'Grave',
      'No aplica'
    ],
    correctSeverity: 'No aplica',
    measureOptions: [
      'Aceptación de la justificación oportuna y acuerdo para entrega de evidencias atrasadas',
      'Cancelación de matrícula por abandono',
      'Llamado de atención escrito'
    ],
    correctMeasure: 'Aceptación de la justificación oportuna y acuerdo para entrega de evidencias atrasadas',
    legalRationale: 'Valeria cumplió cabalmente con radicar la justificación dentro de los 3 días hábiles siguientes con el soporte oficial idóneo. Por ende, no existe falta y el instructor debe facilitarle la concertación de evidencias.',
    article: 'Artículo 22 (Inasistencias Justificadas) del Reglamento del Aprendiz.'
  },
  {
    id: 'case-4',
    title: 'Caso 4: Uso no autorizado de bienes y carné ajeno',
    apprenticeName: 'Sebastián Gómez',
    program: 'Técnico en Cocina (Ficha 288764)',
    situation: 'Sebastián facilitó su carné institucional a una persona particular externa para que pudiera ingresar sin registro a las instalaciones del centro y utilizar el laboratorio de cómputo en horas no autorizadas.',
    faultCategoryOptions: [
      'Académica',
      'Disciplinaria',
      'No constituye falta'
    ],
    correctFaultCategory: 'Disciplinaria',
    severityOptions: [
      'Leve',
      'Grave',
      'No aplica'
    ],
    correctSeverity: 'Grave',
    measureOptions: [
      'Apertura de proceso disciplinario ante el Comité de Evaluación y Seguimiento',
      'Pedirle prestado el carné también al vigilante',
      'Llamado de atención verbal sin registro'
    ],
    correctMeasure: 'Apertura de proceso disciplinario ante el Comité de Evaluación y Seguimiento',
    legalRationale: 'El carné institucional del SENA es personal e intransferible. Prestarlo para vulnerar la seguridad institucional compromete la custodia de los bienes públicos y constituye falta disciplinaria grave.',
    article: 'Artículos 8 (Deberes del Aprendiz) y 10 (Prohibiciones expresas) del Reglamento.'
  }
];

export const SENA_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'FPI',
    acronym: 'Formación Profesional Integral',
    definition: 'Proceso teórico-práctico de carácter educativo y social que propende por el desarrollo de conocimientos técnicos, tecnológicos y de actitudes y valores para el desarrollo humano.',
    category: 'Institucional'
  },
  {
    term: 'RAP',
    acronym: 'Resultado de Aprendizaje',
    definition: 'Indicadores observables y evaluables que demuestran lo que el aprendiz sabe, comprende y es capaz de hacer al culminar una unidad de formación.',
    category: 'Académico'
  },
  {
    term: 'SOFIA Plus',
    acronym: 'Sistema Optimizado para la Formación Integral del Aprendizaje Activo',
    definition: 'Plataforma informática oficial del SENA donde se gestiona la inscripción, matrícula, certificación, consulta de calificaciones y novedades académicas.',
    category: 'Plataformas'
  },
  {
    term: 'Zajuna / Territorium',
    definition: 'Ambiente Virtual de Aprendizaje (LMS) donde los aprendices interactúan con foros, descargan material de formación y cargan sus evidencias digitales.',
    category: 'Plataformas'
  },
  {
    term: 'Ficha de Formación',
    definition: 'Código numérico único e irrepetible que identifica a una cohorte o grupo específico de aprendices matriculados en un programa.',
    category: 'Académico'
  },
  {
    term: 'Guía de Aprendizaje',
    definition: 'Instrumento pedagógico diseñado por los instructores que orienta al aprendiz paso a paso en las actividades, recursos y evidencias que debe alcanzar.',
    category: 'Académico'
  },
  {
    term: 'Comité de Evaluación y Seguimiento',
    definition: 'Instancia colegiada del Centro de Formación encargada de analizar el desempeño académico y disciplinario de los aprendices y recomendar medidas al Subdirector.',
    category: 'Normativo'
  },
  {
    term: 'Vocero de Ficha',
    definition: 'Aprendiz elegido democráticamente por sus pares para representarlos, velar por la sana convivencia y coordinar con el equipo de instructores.',
    category: 'Institucional'
  },
  {
    term: 'SENNOVA',
    acronym: 'Sistema de Investigación, Innovación y Desarrollo Tecnológico',
    definition: 'Estrategia del SENA que impulsa la cultura de la innovación, investigación aplicada y modernización tecnológica en aprendices e instructores.',
    category: 'Institucional'
  },
  {
    term: 'Fondo Emprender',
    definition: 'Fondo de capital semilla creado por el Gobierno Nacional y administrado por el SENA para financiar iniciativas empresariales de aprendices y colombianos.',
    category: 'Institucional'
  },
  {
    term: 'Plan de Mejoramiento',
    definition: 'Medida pedagógica concertada entre el aprendiz y el instructor o comité para superar dificultades académicas o corregir faltas disciplinarias.',
    category: 'Normativo'
  },
  {
    term: 'Etapa Productiva',
    definition: 'Período en el cual el aprendiz aplica, complementa y consolida sus competencias en un entorno laboral real empresarial o institucional.',
    category: 'Académico'
  }
];

export const INITIAL_BADGES = [
  {
    id: 'badge-identidad',
    title: 'Corazón SENA',
    description: 'Aprobó el Módulo 1 sobre historia, símbolos y valores institucionales.',
    icon: 'Shield',
    unlocked: true,
    unlockedDate: '10 de Noviembre'
  },
  {
    id: 'badge-reglamento',
    title: 'Defensor del Reglamento',
    description: 'Completó el Módulo 2 y dominó derechos, deberes y debido proceso.',
    icon: 'Scale',
    unlocked: false
  },
  {
    id: 'badge-productivo',
    title: 'Proyección Laboral',
    description: 'Superó el Módulo 3 y conoce las 6 alternativas de etapa productiva.',
    icon: 'Briefcase',
    unlocked: false
  },
  {
    id: 'badge-bienestar',
    title: 'Comunidad & Liderazgo',
    description: 'Conoce los beneficios de Bienestar al Aprendiz y elección de voceros.',
    icon: 'Users',
    unlocked: false
  },
  {
    id: 'badge-juez',
    title: 'Juez del Comité',
    description: 'Resolvió los 4 casos del simulador del Comité de Evaluación con precisión.',
    icon: 'Award',
    unlocked: false
  },
  {
    id: 'badge-graduado',
    title: 'Inducción Certificada',
    description: 'Culminó el 100% de los módulos de inducción del SENA.',
    icon: 'CheckCircle2',
    unlocked: false
  }
];

export const DEFAULT_CURRENT_APPRENTICE: ApprenticeProgress = {
  id: 'apr-101',
  documentNumber: '1098765432',
  fullName: 'Valentina Restrepo Morales',
  email: 'vrestrepo@soy.sena.edu.co',
  fichaNumber: '2874921',
  programName: 'Análisis y Desarrollo de Software (ADSO)',
  regional: 'Regional Antioquia',
  centroFormacion: 'Centro de Formación en Tecnologías de la Información',
  completedModules: ['mod-1'],
  moduleScores: {
    'mod-1': 100
  },
  casesSolved: ['case-1'],
  badges: INITIAL_BADGES,
  inductionCompleted: false
};

export const MOCK_FICHA_APPRENTICES: ApprenticeProgress[] = [
  {
    id: 'apr-101',
    documentNumber: '1098765432',
    fullName: 'Valentina Restrepo Morales',
    email: 'vrestrepo@soy.sena.edu.co',
    fichaNumber: '2874921',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Antioquia',
    centroFormacion: 'Centro de Formación en Tecnologías de la Información',
    completedModules: ['mod-1'],
    moduleScores: { 'mod-1': 100 },
    casesSolved: ['case-1'],
    badges: INITIAL_BADGES,
    inductionCompleted: false
  },
  {
    id: 'apr-102',
    documentNumber: '1023456789',
    fullName: 'Andrés Camilo Rojas',
    email: 'acrojas@soy.sena.edu.co',
    fichaNumber: '2874921',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Antioquia',
    centroFormacion: 'Centro de Formación en Tecnologías de la Información',
    completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4'],
    moduleScores: { 'mod-1': 100, 'mod-2': 90, 'mod-3': 100, 'mod-4': 95 },
    casesSolved: ['case-1', 'case-2', 'case-3', 'case-4'],
    badges: INITIAL_BADGES.map(b => ({ ...b, unlocked: true, unlockedDate: '09/11/2026' })),
    inductionCompleted: true,
    inductionCompletedDate: '09/11/2026'
  },
  {
    id: 'apr-103',
    documentNumber: '1034567890',
    fullName: 'Mariana Duque Gómez',
    email: 'mduque@soy.sena.edu.co',
    fichaNumber: '2874921',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Antioquia',
    centroFormacion: 'Centro de Formación en Tecnologías de la Información',
    completedModules: ['mod-1', 'mod-2'],
    moduleScores: { 'mod-1': 90, 'mod-2': 85 },
    casesSolved: ['case-1'],
    badges: INITIAL_BADGES.map((b, i) => ({ ...b, unlocked: i < 2 })),
    inductionCompleted: false
  },
  {
    id: 'apr-104',
    documentNumber: '1045678901',
    fullName: 'Brayan Estiven Caicedo',
    email: 'bcaicedo@soy.sena.edu.co',
    fichaNumber: '2874921',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Antioquia',
    centroFormacion: 'Centro de Formación en Tecnologías de la Información',
    completedModules: [],
    moduleScores: {},
    casesSolved: [],
    badges: INITIAL_BADGES.map(b => ({ ...b, unlocked: false })),
    inductionCompleted: false
  },
  {
    id: 'apr-105',
    documentNumber: '1056789012',
    fullName: 'Daniela Sofía Vargas',
    email: 'dvargas@soy.sena.edu.co',
    fichaNumber: '2874921',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Antioquia',
    centroFormacion: 'Centro de Formación en Tecnologías de la Información',
    completedModules: ['mod-1', 'mod-2', 'mod-3'],
    moduleScores: { 'mod-1': 100, 'mod-2': 95, 'mod-3': 90 },
    casesSolved: ['case-1', 'case-2'],
    badges: INITIAL_BADGES.map((b, i) => ({ ...b, unlocked: i < 3 })),
    inductionCompleted: false
  },
  {
    id: 'apr-106',
    documentNumber: '1067890123',
    fullName: 'Mateo Zuluaga Ocampo',
    email: 'mzuluaga@soy.sena.edu.co',
    fichaNumber: '2874921',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Antioquia',
    centroFormacion: 'Centro de Formación en Tecnologías de la Información',
    completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4'],
    moduleScores: { 'mod-1': 85, 'mod-2': 90, 'mod-3': 85, 'mod-4': 90 },
    casesSolved: ['case-1', 'case-2', 'case-3', 'case-4'],
    badges: INITIAL_BADGES.map(b => ({ ...b, unlocked: true, unlockedDate: '08/11/2026' })),
    inductionCompleted: true,
    inductionCompletedDate: '08/11/2026'
  }
];

export const SENA_HYMN_STANZAS = [
  {
    type: 'CORO',
    text: 'Aprendices del SENA adelante\nPor Colombia luchad con amor\nCon el animo noble y radiante\nTransformémosla en mundo mejor'
  },
  {
    type: 'Estrofa I',
    text: 'De la patria el futuro destino,\nen las manos del joven está,\nel trabajo es seguro camino,\nque el progreso a Colombia dará.'
  },
  {
    type: 'Estrofa II',
    text: 'En la forja del SENA se forman,\nhombres libres que anhelan triunfar,\ncon la ciencia y la técnica unidas,\nnuevos rumbos de paz trazarán.'
  },
  {
    type: 'Estrofa III',
    text: 'Hoy la patria nos grita sentida,\n¡aprendices del SENA triunfad!\nsolo así lograréis en la vida,\nmás justicia, mayor libertad.'
  },
  {
    type: 'Estrofa IV',
    text: 'Avancemos con fuerza guerrera,\n¡aprendices con firme tesón!\nque la patria en nosotros espera,\nsu pacífica revolución.'
  }
];

export const DESIGNATED_INSTRUCTOR: InstructorProfile = {
  id: 'inst-01',
  name: 'Ing. Carlos Alberto Morales',
  email: 'cmorales@sena.edu.co',
  roleTitle: 'Instructor Técnico Líder & Coordinador de Inducción',
  centroFormacion: 'Centro de Formación en Tecnologías de la Información',
  regional: 'Regional Antioquia',
  assignedFicha: '2874921',
  programName: 'Análisis y Desarrollo de Software (ADSO)'
};
