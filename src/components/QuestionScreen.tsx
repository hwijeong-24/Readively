import React, { useState } from 'react';
import { InferenceQuestion, WordDef } from '../types';
import { StoryIllustration } from './illustrations/StoryIllustration';
import { WORD_DICTIONARY } from '../data/storyData';
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

interface QuestionScreenProps {
  question: InferenceQuestion;
  onPrevious: () => void;
  onNext: () => void;
  onWordClick: (wordDef: WordDef) => void;
  onQuestionCompleted: (questionId: string, isFirstTryCorrect: boolean) => void;
  existingResult?: { answered: boolean; firstTryCorrect: boolean; selectedIndex: number };
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  onPrevious,
  onNext,
  onWordClick,
  onQuestionCompleted,
  existingResult,
}) => {
  // Local state for attempt handling
  const [disabledIndices, setDisabledIndices] = useState<Set<number>>(new Set());
  const [hasAttemptedWrong, setHasAttemptedWrong] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isResolved, setIsResolved] = useState<boolean>(existingResult?.answered || false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    existingResult ? existingResult.selectedIndex : null
  );

  const handleSelectChoice = (index: number) => {
    if (isResolved || disabledIndices.has(index)) return;

    if (index === question.correctIndex) {
      // Correct!
      const firstTry = !hasAttemptedWrong && disabledIndices.size === 0;
      setIsResolved(true);
      setSelectedAnswerIndex(index);
      setShowHint(false);
      onQuestionCompleted(question.id, firstTry);
    } else {
      // Wrong choice
      setHasAttemptedWrong(true);
      setShowHint(true);
      const updated = new Set(disabledIndices);
      updated.add(index);
      setDisabledIndices(updated);

      // Check if all wrong choices picked
      const remainingChoices = question.choices.filter((_, idx) => !updated.has(idx));
      if (remainingChoices.length <= 1) {
        // Reveal correct answer so learner never gets stuck
        setIsResolved(true);
        setSelectedAnswerIndex(question.correctIndex);
        onQuestionCompleted(question.id, false);
      }
    }
  };

  // Render question text with underlined vocabulary word if present
  const renderQuestionText = () => {
    if (!question.underlinedWord) {
      return <span>{question.question}</span>;
    }

    const parts = question.question.split(new RegExp(`(${question.underlinedWord})`, 'gi'));
    const wordKey = question.underlinedWord.toLowerCase();
    const wordDef = WORD_DICTIONARY[wordKey];

    return (
      <span>
        {parts.map((part, idx) => {
          if (part.toLowerCase() === wordKey && wordDef) {
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onWordClick(wordDef)}
                className="underline decoration-amber-500 decoration-3 underline-offset-4 text-amber-900 font-extrabold hover:text-amber-600 transition-colors cursor-pointer"
                title="단어 뜻 보기"
              >
                {part}
              </button>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full pb-4">
      {/* Top Half: Page Illustration */}
      <div className="w-full px-4 pt-2">
        <div className="w-full aspect-4/3 rounded-3xl overflow-hidden border-2 border-stone-200/90 shadow-md bg-white relative">
          <StoryIllustration illustrationId={`page_${question.pageNumber}`} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Bottom Half: Question and Sentence Choices */}
      <div className="px-4 pt-3 flex-1 flex flex-col justify-between space-y-3">
        {/* Question Header */}
        <div className="space-y-1 bg-amber-50/90 p-3.5 rounded-2xl border-2 border-amber-300 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-bold font-kr text-amber-800">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>그림 추론 퀴즈</span>
          </div>
          <h3 className="text-xl font-black font-story text-amber-950 leading-snug">
            {renderQuestionText()}
          </h3>
        </div>

        {/* Feedback Banner on Wrong or Correct */}
        {showHint && !isResolved && (
          <div className="p-3 bg-amber-100/90 border-2 border-amber-300 rounded-2xl flex items-start gap-2.5 animate-in fade-in duration-150">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-700 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-bold font-kr text-amber-900">
                🔁 그림을 다시 한번 살펴볼까요?
              </p>
              <p className="text-xs font-bold font-story text-amber-950">
                💡 힌트: {question.hint}
              </p>
            </div>
          </div>
        )}

        {isResolved && (
          <div className="p-3 bg-emerald-100 border-2 border-emerald-300 rounded-2xl flex items-center gap-2.5 text-emerald-900 animate-in fade-in duration-150">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
            <div className="leading-tight">
              <span className="text-sm font-extrabold font-story block">
                Nice! 정답이에요!
              </span>
              <span className="text-xs font-kr text-emerald-800">
                그림 속 숨은 단서를 잘 찾아냈어요!
              </span>
            </div>
          </div>
        )}

        {/* Sentence Choices */}
        <div className="space-y-2">
          {question.choices.map((choice, idx) => {
            const isCorrectChoice = idx === question.correctIndex;
            const isSelected = selectedAnswerIndex === idx;
            const isDisabled = disabledIndices.has(idx);

            let buttonStyle = 'bg-white border-amber-200 text-stone-800 hover:border-amber-400 hover:bg-amber-50/50';

            if (isResolved) {
              if (isCorrectChoice) {
                buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300 font-bold';
              } else if (isSelected) {
                buttonStyle = 'bg-stone-100 border-stone-300 text-stone-400 opacity-60';
              } else {
                buttonStyle = 'bg-white border-stone-200 text-stone-400 opacity-50';
              }
            } else if (isDisabled) {
              buttonStyle = 'bg-stone-100 border-stone-200 text-stone-400 opacity-50 line-through cursor-not-allowed';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectChoice(idx)}
                disabled={isResolved || isDisabled}
                className={`w-full p-3.5 rounded-2xl border-2 text-left font-story text-base sm:text-lg leading-snug transition-all shadow-2xs active:scale-98 flex items-center justify-between gap-2 ${buttonStyle}`}
              >
                <span>{choice}</span>
                {isResolved && isCorrectChoice && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons: [◀ Previous] & [Next ▶] */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={onPrevious}
            className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold font-kr text-sm flex items-center gap-1 transition-colors active:scale-95 shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={onNext}
            disabled={!isResolved}
            className={`py-2.5 px-5 rounded-xl font-bold font-kr text-sm flex items-center gap-1 transition-all active:scale-95 shadow-md ${
              isResolved
                ? 'bg-amber-400 hover:bg-amber-500 text-amber-950 border-2 border-amber-500'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
