# Manual de Inducción Institucional - SENA
## Plataforma Interactiva de Inducción y Seguimiento (Ficha #2874921)

---

### 1. Introducción y Propósito de la Herramienta
La **Plataforma Interactiva de Inducción SENA** es una solución digital diseñada para guiar, evaluar y certificar a los nuevos aprendices en su proceso de inserción a la cultura institucional del Servicio Nacional de Aprendizaje (SENA). 

La aplicación integra contenidos multimedia, normatividad actualizada (**Acuerdo 009 de 2024** y su actualización en el **Acuerdo 002 de 2026** sobre garantías del debido proceso), evaluaciones interactivas con refuerzo visual y un simulador de comités de evaluación para aprendices e instructores.

---

### 2. Arquitectura de Ingreso y Doble Rol
Al acceder a la aplicación, la página principal (*Landing Page*) permite seleccionar entre dos perfiles de usuario:

#### A. Perfil de Aprendiz
1. **Diligenciamiento de Datos:** El aprendiz ingresa con campos limpios indicando:
   - Tipo de documento (C.C., T.I., C.E.).
   - Número de documento (ej. `1098765432`).
   - Nombres y apellidos completos.
   - Correo electrónico institucional (`@soy.sena.edu.co`).
2. **Pistas y Autocompletado:** Cuenta con un panel de guía pedagógica, pistas de formato por campo y botones de acceso rápido para pruebas con aprendices pre-registrados en la cohorte.
3. **Guardado de Perfil:** Al hacer clic en **«Guardar Perfil y Continuar al Prototipo»**, el sistema valida el registro, almacena el avance del aprendiz y le permite continuar con su ruta de formación.

#### B. Perfil de Instructor (Docente Líder)
- **Credenciales Genéricas de Acceso:**
  - **Usuario:** `instructor` *(o `cmorales`, `admin`)*
  - **Contraseña:** `sena2026` *(o `Sena2026`, `sena1234`)*
- **Consola de Instructor:** Permite supervisar a toda la cohorte de la Ficha `#2874921` (ADSO), auditar módulos completados, verificar calificaciones, ver certificados emitidos y exportar el reporte consolidado en formato CSV.

---

### 3. Ejes Temáticos (Módulos de Formación)
La inducción se divide en 4 módulos obligatorios:
1. **Módulo 1: Identidad e Imagen Institucional:** Historia del SENA desde 1957 (fundado por Rodolfo Martínez Tono), valores éticos, misión, visión, escudo oficial, bandera y el **Himno del SENA** (con reproductor de audio sintético, video con lengua de señas LSC y letra oficial referenciando a los *aprendices*).
2. **Módulo 2: Reglamento del Aprendiz (Acuerdo 009 de 2024 y mod. Acuerdo 002 de 2026):** Derechos, deberes, prohibiciones, clasificación de faltas (leves, graves, gravísimas), medidas formativas y el debido proceso actualizado.
3. **Módulo 3: Etapas de Formación y Alternativas Productivas:** Formación lectiva, etapa productiva y sus 6 alternativas (contrato de aprendizaje, vínculo laboral, pasantía, proyecto productivo, monitoría y apoyo a unidades productivas).
4. **Módulo 4: Bienestar al Aprendiz:** Programas de salud, cultura, deporte, apoyos de sostenimiento (FIC) y representación democrática de voceros de ficha.

---

### 4. Componentes Interactivos y Evaluativos
* **Cuestionarios Evaluativos (Quizzes):** Evaluaciones de opción múltiple con retroalimentación inmediata:
  - **Respuestas Correctas:** Lanzan una lluvia de **confeti** festivo (`canvas-confetti`), resaltan la opción en verde con insignia **`¡Correcta!`** y explican el fundamento pedagógico.
  - **Respuestas Incorrectas:** Resaltan la opción seleccionada en **rojo intenso** con insignia **`¡Incorrecta!`**, mostrando claramente la respuesta esperada y la explicación en un panel rojo.
* **Simulador del Comité de Evaluación y Seguimiento:** Permite resolver 4 casos éticos y disciplinarios de la vida real aplicando el reglamento vigente. Las respuestas correctas celebran con confeti y dictamen conforme a derecho; las erróneas marcan los errores en rojo con su respectiva corrección jurídica.
* **Certificado Digital de Inducción:** Al completar el 100% de los módulos y aprobar las evaluaciones, el sistema genera un certificado oficial descargable e imprimible con código QR de verificación institucional y estadísticas de notas.

---

### 5. Accesibilidad y Experiencia Visual
* **Modo Oscuro:** Activación instantánea mediante el botón superior derecho con efecto visual de desenfoque de pantalla (*blur curtain*).
* **Diseño Responsivo:** Adaptado para computadores, tabletas y teléfonos móviles con la paleta de colores institucional del SENA (Verde `#39A900` y Azul `#00324D`).
