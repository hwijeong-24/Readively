import React from 'react';
import { Star, BookOpen, Layers, Award, Sparkles } from 'lucide-react';

interface ResultScreenProps {
  scoreCount: number; // number of first-try correct questions
  totalQuestions: number;
  savedWordsCount: number;
  badgeCount: number;
  onOpenWordBank: () => void;
  onOpenStoryRebuilder: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  scoreCount,
  totalQuestions,
  savedWordsCount,
  badgeCount,
  onOpenWordBank,
  onOpenStoryRebuilder,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full p-4 space-y-4">
      {/* Top Bar with Cumulative Badge Count in top-right */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs font-bold font-kr text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
          학습 완료 리포트
        </span>
        <div className="flex items-center gap-1.5 bg-amber-400 text-amber-950 px-3.5 py-1.5 rounded-full font-black text-sm shadow-xs border border-amber-500/40">
          <Star className="w-4 h-4 fill-amber-950 text-amber-950" />
          <span>⭐ {badgeCount}</span>
        </div>
      </div>

      {/* Main Celebration Card */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-300 text-center space-y-4">
        {/* Star Badge Icon & Sparkles */}
        <div className="relative inline-block mx-auto">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-lg border-4 border-white animate-bounce duration-1000">
            <Award className="w-14 h-14 text-amber-950" />
          </div>
          <Sparkles className="w-7 h-7 text-amber-500 fill-amber-400 absolute -top-1 -right-2 animate-pulse" />
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black font-story text-amber-950">
            You finished the story!
          </h2>
          <p className="text-sm font-bold font-kr text-stone-600">
            끝까지 소리 내어 읽고 멋지게 완료했어요! 🎉
          </p>
        </div>

        {/* Summary Lines (PRD Section 5.⑤) */}
        <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 text-left space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold font-kr text-stone-700">추론 퀴즈 정답:</span>
            <span className="text-base font-extrabold font-story text-emerald-700">
              You answered {scoreCount} / {totalQuestions} questions correctly
            </span>
          </div>

          <div className="h-px bg-amber-200/60" />

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold font-kr text-stone-700">저장된 단어:</span>
            <span className="text-base font-extrabold font-story text-amber-900">
              Words saved: {savedWordsCount}
            </span>
          </div>
        </div>

        {/* [📒 Review Word Bank] Button */}
        <button
          onClick={onOpenWordBank}
          className="w-full py-3.5 px-4 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black font-kr text-base flex items-center justify-center gap-2 border-2 border-amber-300 transition-colors active:scale-98 shadow-xs"
        >
          <BookOpen className="w-5 h-5 text-amber-900" />
          <span>📒 Review Word Bank</span>
        </button>
      </div>

      {/* [Story Rebuilder] Button - the ONLY next-step button (no "Read again" button here!) */}
      <div className="pt-2 pb-2">
        <button
          onClick={onOpenStoryRebuilder}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black font-kr text-lg flex items-center justify-center gap-2.5 shadow-lg border-2 border-amber-500 active:scale-98 transition-all"
        >
          <Layers className="w-6 h-6 text-amber-950" />
          <span>Story Rebuilder</span>
        </button>
        <p className="text-center text-xs font-kr text-stone-500 mt-2">
          이야기 순서를 직접 바꾸고 나만의 책을 만들어 읽어보세요!
        </p>
      </div>
    </div>
  );
};
