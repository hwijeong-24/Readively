import React from 'react';
import { WordDef } from '../types';
import { WordIcon } from './illustrations/WordIcon';
import { playAISpeech } from '../utils/audioSpeech';
import { X, Volume2, BookOpen } from 'lucide-react';

interface WordBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedWords: WordDef[];
}

export const WordBankModal: React.FC<WordBankModalProps> = ({ isOpen, onClose, savedWords }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border-4 border-amber-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-950" />
            <h2 className="text-xl font-bold font-kr text-amber-950">
              내 단어장 (Word Bank)
            </h2>
            <span className="bg-white/80 text-amber-950 text-xs px-2 py-0.5 rounded-full font-bold">
              {savedWords.length}개
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center active:scale-95 transition-transform"
          >
            <X className="w-5 h-5 text-amber-950" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-amber-50/50">
          {savedWords.length === 0 ? (
            <div className="py-12 text-center text-stone-500 font-kr space-y-2">
              <div className="text-4xl mb-2">📒</div>
              <p className="text-base font-semibold text-stone-700">아직 저장된 단어가 없어요!</p>
              <p className="text-sm text-stone-500 leading-relaxed">
                이야기나 질문에서 <span className="underline decoration-amber-500 font-bold">밑줄 친 단어</span>를 톡 누르면<br />단어장에 쏙 담을 수 있어요.
              </p>
            </div>
          ) : (
            savedWords.map((item) => (
              <div
                key={item.word}
                className="bg-white rounded-2xl p-3.5 border-2 border-amber-200 shadow-sm flex items-center gap-3.5 hover:border-amber-400 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-100/80 p-2 flex items-center justify-center shrink-0 border border-amber-200">
                  <WordIcon iconType={item.iconType} className="w-10 h-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-stone-900 tracking-wide font-story">
                      {item.word}
                    </span>
                    <button
                      onClick={() => playAISpeech(item.word)}
                      aria-label={`${item.word} 발음 듣기`}
                      className="p-1 rounded-full text-amber-600 hover:text-amber-800 hover:bg-amber-100 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-bold font-kr text-stone-700 mt-0.5">
                    {item.korean}
                  </p>
                  {item.englishMeaning && (
                    <p className="text-xs font-story text-slate-500 mt-1">
                      {item.englishMeaning}
                    </p>
                  )}
                  {item.inThisStory && (
                    <p className="text-xs font-story italic text-amber-900 bg-amber-50/80 px-2 py-1 rounded-lg mt-1 border border-amber-200/50">
                      “{item.inThisStory}”
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-amber-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold font-kr text-base rounded-2xl shadow-md active:scale-98 transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
