import React from 'react';
import { Home, BookMarked } from 'lucide-react';

interface HeaderProps {
  pageCounter?: string; // e.g. "Page 3 / 10"
  onHomeClick: () => void;
  onWordBankClick: () => void;
  savedWordsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  pageCounter,
  onHomeClick,
  onWordBankClick,
  savedWordsCount,
}) => {
  return (
    <header className="h-14 px-4 bg-white/90 backdrop-blur-md border-b border-amber-200/80 flex items-center justify-between z-30 shrink-0 sticky top-0 shadow-xs">
      {/* Left: Home Button and Page Counter */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onHomeClick}
          aria-label="처음 화면으로 이동"
          className="w-11 h-11 rounded-2xl bg-amber-100/80 hover:bg-amber-200 text-amber-900 flex items-center justify-center transition-colors active:scale-95 shadow-xs"
        >
          <Home className="w-5 h-5 text-amber-900" />
        </button>

        {pageCounter && (
          <span className="text-sm font-extrabold font-story text-amber-950 bg-amber-100/70 px-3 py-1.5 rounded-full border border-amber-300/60 shadow-xs">
            {pageCounter}
          </span>
        )}
      </div>

      {/* Right: Word Bank Button */}
      <button
        onClick={onWordBankClick}
        aria-label="단어장 열기"
        className="h-11 px-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 flex items-center gap-2 font-bold font-kr text-sm transition-all shadow-xs active:scale-95 border border-amber-500/30"
      >
        <BookMarked className="w-4 h-4 text-amber-950" />
        <span>단어장</span>
        <span className="bg-amber-950 text-amber-100 text-xs px-2 py-0.5 rounded-full font-bold">
          {savedWordsCount}
        </span>
      </button>
    </header>
  );
};
