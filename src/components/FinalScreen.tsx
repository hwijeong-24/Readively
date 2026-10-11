import React, { useState } from 'react';
import { VIRTUAL_BOOKS, STORY_TITLE } from '../data/storyData';
import { RotateCcw, BookPlus, ArrowLeft, Star, Sparkles, CheckCircle2 } from 'lucide-react';

interface FinalScreenProps {
  onReadAgain: () => void;
  badgeCount: number;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({ onReadAgain, badgeCount }) => {
  const [showBookSelector, setShowBookSelector] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectVirtualBook = (bookId: string) => {
    if (bookId === 'max_brave_dog') {
      // Re-read current book
      onReadAgain();
    } else {
      // Show "This book is coming soon!" toast and stay on screen
      setToastMessage('This book is coming soon!');
      setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    }
  };

  if (showBookSelector) {
    return (
      <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full p-4 space-y-4">
        {/* Header with back button to Final screen */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowBookSelector(false)}
            className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold font-kr text-xs flex items-center gap-1 active:scale-95 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>뒤로 가기</span>
          </button>
          <span className="text-xs font-bold font-kr text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
            책 선택하기
          </span>
        </div>

        {/* Heading */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black font-kr text-stone-900">
            읽고 싶은 책을 골라보세요
          </h2>
          <p className="text-xs font-kr text-stone-600">
            새로운 흥미진진한 이야기들이 준비되고 있어요!
          </p>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="p-3 bg-amber-400 text-amber-950 rounded-2xl font-black font-story text-center shadow-lg border-2 border-amber-500 animate-in fade-in slide-in-from-top-2 duration-150">
            📢 {toastMessage}
          </div>
        )}

        {/* 3 Virtual Books */}
        <div className="space-y-3 flex-1 overflow-y-auto py-1">
          {VIRTUAL_BOOKS.map((book) => {
            const isCurrent = book.id === 'max_brave_dog';

            return (
              <div
                key={book.id}
                onClick={() => handleSelectVirtualBook(book.id)}
                className={`p-4 rounded-3xl border-3 transition-all cursor-pointer flex items-center gap-3.5 shadow-sm active:scale-98 ${
                  isCurrent
                    ? 'bg-amber-50/90 border-amber-400 hover:border-amber-500 ring-2 ring-amber-300'
                    : 'bg-white border-stone-200 hover:border-amber-300 opacity-90'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 border border-amber-200">
                  {book.icon}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-story font-black text-stone-900 text-base sm:text-lg">
                      {book.title}
                    </h3>
                    <span
                      className={`text-2xs font-bold font-kr px-2 py-0.5 rounded-full ${
                        isCurrent
                          ? 'bg-emerald-500 text-white'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {book.badge}
                    </span>
                  </div>
                  <p className="text-xs font-kr text-stone-600 line-clamp-2">
                    {book.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Back Button */}
        <div className="pt-2">
          <button
            onClick={() => setShowBookSelector(false)}
            className="w-full py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold font-kr text-sm transition-colors active:scale-98"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full p-4 space-y-4">
      {/* Top Banner with Badge */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs font-bold font-kr text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
          최종 독서 완료
        </span>
        <div className="flex items-center gap-1.5 bg-amber-400 text-amber-950 px-3 py-1 rounded-full font-black text-xs shadow-xs border border-amber-500/30">
          <Star className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
          <span>⭐ {badgeCount}</span>
        </div>
      </div>

      {/* Celebration Main Card */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-300 text-center space-y-4">
        <div className="relative inline-block mx-auto">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-green-300 flex items-center justify-center shadow-lg border-4 border-white">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <Sparkles className="w-6 h-6 text-amber-500 fill-amber-400 absolute -top-1 -right-2 animate-pulse" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black font-story text-stone-900">
            Great Job!
          </h2>
          <p className="text-sm font-bold font-kr text-amber-900">
            {STORY_TITLE} 이야기를 완벽하게 마스터했어요!
          </p>
          <p className="text-xs font-kr text-stone-500 leading-relaxed pt-1">
            소리 내어 읽기, 그림 추론하기, 감정 표현하기까지<br />
            모든 활동을 훌륭하게 완주했습니다.
          </p>
        </div>
      </div>

      {/* Two Large Buttons: [Read again] & [Read new book] */}
      <div className="space-y-3 pt-2 pb-2">
        <button
          onClick={onReadAgain}
          className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black font-kr text-lg flex items-center justify-center gap-2.5 shadow-lg border-2 border-amber-500 active:scale-98 transition-all"
        >
          <RotateCcw className="w-5 h-5 text-amber-950" />
          <span>Read again (다시 읽기)</span>
        </button>

        <button
          onClick={() => setShowBookSelector(true)}
          className="w-full py-4 rounded-2xl bg-white hover:bg-amber-50 text-stone-800 font-black font-kr text-lg flex items-center justify-center gap-2.5 shadow-md border-2 border-amber-300 active:scale-98 transition-all"
        >
          <BookPlus className="w-5 h-5 text-amber-600" />
          <span>Read new book (다른 책 보기)</span>
        </button>
      </div>
    </div>
  );
};
