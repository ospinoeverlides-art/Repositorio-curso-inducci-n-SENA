import React, { useState } from 'react';
import { ModuleData } from '../types';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';

interface QuizModalProps {
  module: ModuleData;
  onClose: () => void;
  onPassQuiz: (moduleId: string, scorePercent: number) => void;
  previousScore?: number;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  module,
  onClose,
  onPassQuiz,
  previousScore
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const questions = module.quiz;
  const currentQ = questions[currentQuestionIndex];
  const userSelected = selectedAnswers[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (hasSubmittedAnswer) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: index
    }));
  };

  const handleConfirmAnswer = () => {
    setHasSubmittedAnswer(true);
    if (userSelected === currentQ.correctAnswer) {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#39A900', '#22c55e', '#10b981', '#fbbf24', '#38bdf8']
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setHasSubmittedAnswer(false);
    } else {
      // Calculate final score
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswer) {
          correctCount++;
        }
      });
      const scorePercent = Math.round((correctCount / questions.length) * 100);
      setIsFinished(true);

      if (scorePercent >= 75) {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.55 },
          colors: ['#39A900', '#00324D', '#10b981', '#f59e0b', '#ec4899']
        });
        onPassQuiz(module.id, scorePercent);
      }
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setHasSubmittedAnswer(false);
    setIsFinished(false);
  };

  // Final summary calculation
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctAnswer) {
      correctCount++;
    }
  });
  const finalScore = Math.round((correctCount / questions.length) * 100);
  const isPassed = finalScore >= 75;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full p-6 md:p-8 my-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Cuestionario Evaluativo · Módulo {module.number}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              {module.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-semibold p-1.5"
          >
            ✕
          </button>
        </div>

        {!isFinished ? (
          <div>
            {/* Progress indicators */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
                <span>Mínimo para aprobar: 75%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#39A900] h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <h4 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h4>
            </div>

            {/* Options list */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, idx) => {
                const isSelected = userSelected === idx;
                const isCorrect = idx === currentQ.correctAnswer;

                let optionStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200';

                if (hasSubmittedAnswer) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-600 bg-emerald-50/90 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500 font-semibold shadow-xs';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-red-600 bg-red-50 dark:bg-red-950/60 text-red-900 dark:text-red-100 ring-2 ring-red-500 font-semibold shadow-xs';
                  } else {
                    optionStyle = 'opacity-40 border-slate-200 dark:border-slate-800 text-slate-400';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-[#39A900] bg-emerald-50/50 dark:bg-emerald-950/20 text-[#256c00] dark:text-emerald-300 ring-2 ring-[#39A900] font-medium';
                }

                return (
                  <button
                    key={idx}
                    disabled={hasSubmittedAnswer}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-sm ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        hasSubmittedAnswer && isCorrect
                          ? 'bg-emerald-600 text-white'
                          : hasSubmittedAnswer && isSelected && !isCorrect
                          ? 'bg-red-600 text-white'
                          : isSelected
                          ? 'bg-[#39A900] text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {hasSubmittedAnswer && isCorrect && (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-1 rounded-full shrink-0 ml-3 border border-emerald-300 dark:border-emerald-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>¡Correcta!</span>
                      </span>
                    )}
                    {hasSubmittedAnswer && isSelected && !isCorrect && (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900/60 px-2.5 py-1 rounded-full shrink-0 ml-3 border border-red-300 dark:border-red-700">
                        <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <span>¡Incorrecta!</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submitting */}
            {hasSubmittedAnswer && (
              <div className={`p-4 rounded-xl mb-6 text-sm border shadow-xs ${
                userSelected === currentQ.correctAnswer
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-500/30'
                  : 'bg-red-50/90 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-950 dark:text-red-200 ring-1 ring-red-500/30'
              }`}>
                <div className="flex items-start gap-2.5">
                  {userSelected === currentQ.correctAnswer ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold block mb-1">
                      {userSelected === currentQ.correctAnswer ? '🎉 ¡Respuesta Correcta!' : '❌ ¡Respuesta Incorrecta!'}
                    </span>
                    <p className="text-xs leading-relaxed">{currentQ.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">
                Selecciona una respuesta y confirma
              </span>

              {!hasSubmittedAnswer ? (
                <button
                  disabled={userSelected === undefined}
                  onClick={handleConfirmAnswer}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#39A900] hover:bg-[#318f00] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
                >
                  Comprobar Respuesta
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 transition-all shadow-sm"
                >
                  <span>{currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultado Final'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Result Screen */
          <div className="text-center py-4">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              isPassed ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600' : 'bg-rose-100 dark:bg-rose-950/50 text-rose-600'
            }`}>
              {isPassed ? <Award className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>

            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isPassed ? '¡Felicitaciones, Aprobaste el Módulo!' : 'Puntaje Insuficiente'}
            </h4>

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
              {isPassed
                ? 'Has demostrado el dominio de los conceptos esenciales. Tu avance ha quedado registrado en tu hoja de ruta de inducción.'
                : 'Para aprobar se requiere un mínimo del 75%. Te invitamos a repasar los contenidos del módulo y volver a intentarlo.'}
            </p>

            {/* Score pill */}
            <div className="inline-flex items-baseline gap-1 my-6 px-6 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
                {finalScore}%
              </span>
              <span className="text-xs text-slate-500 font-medium">
                ({correctCount} de {questions.length} correctas)
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Cuestionario</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#39A900] hover:bg-[#318f00] transition-colors shadow-sm"
              >
                Continuar con la Inducción
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
