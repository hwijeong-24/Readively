import React from 'react';
import { WordDef } from '../types';
import { WordIcon } from './illustrations/WordIcon';
import { playAISpeech } from '../utils/audioSpeech';
import { Volume2, X, Bookmark, Check } from 'lucide-react';

interface WordPopupProps {
  wordDef: WordDef | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (word: WordDef) => void;
}

export const WordPopup: React.FC<WordPopupProps> = ({
  wordDef,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  if (!isOpen || !wordDef) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border-4 border-amber-300 relative text-center space-y-3 animate-in zoom-in-95 duration-150">
        {/* Top Header Row with Tag and Close Button (Matches Screenshot 224025) */}
        <div className="flex items-center justify-between pb-0.5">
          <span className="bg-[#fef3c7] text-[#92400e] text-xs font-bold font-kr px-3 py-1 rounded-full border border-amber-200/80">
            Vocabulary Card · 초등 5-6학년 단어
          </span>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Word Box (Matches Screenshot 224025) */}
        <div className="bg-[#fffbeb] border border-amber-200/80 rounded-2xl p-3.5 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            {/* Orange rounded square icon */}
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center p-2 shrink-0 shadow-xs">
              <WordIcon iconType={wordDef.iconType} className="w-8 h-8 text-white" />
            </div>

            <div>
              <div className="flex items-baseline gap-1.5">
                <h4 className="text-2xl font-black text-slate-900 font-story tracking-tight">
                  {wordDef.word}
                </h4>
                {wordDef.ipa && (
                  <span className="text-xs font-story text-slate-400 font-normal">
                    {wordDef.ipa}
                  </span>
                )}
              </div>
              <p className="text-sm font-black font-kr text-[#9a3412] mt-0.5">
                {wordDef.korean}
              </p>
            </div>
          </div>

          {/* Sound button */}
          <button
            onClick={() => playAISpeech(wordDef.word)}
            aria-label="발음 듣기"
            className="w-10 h-10 rounded-full bg-white border border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-900 flex items-center justify-center transition-colors shadow-2xs active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-amber-700" />
          </button>
        </div>

        {/* English Meaning Card (Matches Screenshot 224025) */}
        {wordDef.englishMeaning && (
          <div className="bg-[#f8fafc] rounded-2xl p-3 border border-slate-100 text-left space-y-0.5">
            <span className="text-2xs font-semibold font-story text-slate-400 block tracking-wide">
              English Meaning
            </span>
            <p className="text-xs sm:text-sm font-medium font-story text-slate-800 leading-snug">
              {wordDef.englishMeaning}
            </p>
          </div>
        )}

        {/* In This Story Card (Matches Screenshot 224025 - 예문 추가) */}
        {wordDef.inThisStory && (
          <div className="bg-[#f8fafc] rounded-2xl p-3 border border-slate-100 text-left space-y-0.5">
            <span className="text-2xs font-semibold font-story text-slate-400 block tracking-wide">
              In this story
            </span>
            <p className="text-xs sm:text-sm font-story italic text-slate-800 leading-snug">
              “{wordDef.inThisStory}”
            </p>
          </div>
        )}

        {/* Pronunciation Tip (if present) */}
        {wordDef.pronunciationTip && !wordDef.inThisStory && (
          <p className="text-xs font-kr text-stone-500 bg-amber-50/80 p-2.5 rounded-xl text-left border border-amber-100">
            💡 {wordDef.pronunciationTip}
          </p>
        )}

        {/* Full-width Orange Add to Word Bank Button (Matches Screenshot 224025) */}
        <div className="pt-1">
          <button
            onClick={() => {
              onToggleSave(wordDef);
            }}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold font-kr text-sm flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-md ${
              isSaved
                ? 'bg-emerald-500 text-white'
                : 'bg-[#f97316] hover:bg-[#ea580c] text-white'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>✓ 단어장에 저장됨</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>+ Add to Word Bank (단어장에 추가)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
