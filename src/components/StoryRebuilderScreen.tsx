import React, { useState, useRef } from 'react';
import { StoryStageCard } from '../types';
import { ArrowLeft, Sparkles, BookOpen } from 'lucide-react';

interface StoryRebuilderScreenProps {
  cards: StoryStageCard[];
  onBackToResult: () => void;
  onMakeMyBook: (reorderedCards: StoryStageCard[]) => void;
}

export const StoryRebuilderScreen: React.FC<StoryRebuilderScreenProps> = ({
  cards: initialCards,
  onBackToResult,
  onMakeMyBook,
}) => {
  const [cards, setCards] = useState<StoryStageCard[]>(initialCards);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  // Helper to reorder array
  const moveCard = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
    const newCards = [...cards];
    const [moved] = newCards.splice(fromIndex, 1);
    newCards.splice(toIndex, 0, moved);
    setCards(newCards);
  };

  // --- Touch Drag Handling ---
  const handleTouchStart = (index: number, e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setDraggedIndex(index);
    setDropTargetIndex(index);
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || draggedIndex === null || !containerRef.current) return;

    // Prevent page scrolling while dragging (PRD Requirement)
    if (e.cancelable) {
      e.preventDefault();
    }

    const currentY = e.touches[0].clientY;
    const cardElements = containerRef.current.querySelectorAll<HTMLElement>('[data-stage-card]');

    cardElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (currentY >= rect.top && currentY <= rect.bottom) {
        setDropTargetIndex(index);
      }
    });
  };

  const handleTouchEnd = () => {
    if (draggedIndex !== null && dropTargetIndex !== null && draggedIndex !== dropTargetIndex) {
      moveCard(draggedIndex, dropTargetIndex);
    }
    setDraggedIndex(null);
    setDropTargetIndex(null);
    isDraggingRef.current = false;
  };

  // --- HTML5 Mouse Drag Handling ---
  const handleDragStart = (index: number, e: React.DragEvent) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dropTargetIndex !== index) {
      setDropTargetIndex(index);
    }
  };

  const handleDrop = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      moveCard(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full p-4 space-y-4">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToResult}
          className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold font-kr text-xs flex items-center gap-1 active:scale-95 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>결과 화면으로</span>
        </button>

        <span className="text-xs font-bold font-kr text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
          이야기 재구성 (Story Rebuilder)
        </span>
      </div>

      {/* Guide text */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black font-kr text-stone-900">
          나만의 이야기 순서 만들기
        </h2>
        <p className="text-xs font-kr text-stone-600 leading-relaxed">
          카드를 꾹 누른 채 위아래로 끌어당겨(드래그) 순서를 자유롭게 바꿔보세요!
        </p>
      </div>

      {/* The 4 Story Stage Cards:
          - Touch & Mouse Drag & Drop
          - No up/down buttons
          - NO subtitles or headings on cards!
          - Each card shows ONLY one short, simple, picture-book-level summary sentence
          - Full sentence always visible (wraps, grows to fit, no truncation, no ellipsis)
      */}
      <div
        ref={containerRef}
        className="space-y-3 flex-1 overflow-y-auto py-1 touch-none"
      >
        {cards.map((card, index) => {
          const isBeingDragged = draggedIndex === index;
          const isDropTarget = dropTargetIndex === index && draggedIndex !== null;

          return (
            <div key={card.id} className="relative">
              {/* Drop position indicator */}
              {isDropTarget && (
                <div className="h-2 w-full bg-amber-400 rounded-full mb-1 animate-pulse" />
              )}

              <div
                data-stage-card
                draggable
                onDragStart={(e) => handleDragStart(index, e)}
                onDragOver={(e) => handleDragOver(index, e)}
                onDrop={(e) => handleDrop(index, e)}
                onDragEnd={handleDragEnd}
                onTouchStart={(e) => handleTouchStart(index, e)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`p-4 rounded-3xl border-3 transition-all select-none cursor-grab active:cursor-grabbing flex items-center gap-3.5 ${
                  isBeingDragged
                    ? 'bg-amber-100 border-amber-500 shadow-2xl scale-103 -rotate-1 z-20 ring-4 ring-amber-300'
                    : 'bg-white border-amber-200 hover:border-amber-400 shadow-sm'
                }`}
              >
                {/* Drag Handle Indicator */}
                <div className="w-8 h-10 rounded-xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center gap-1 shrink-0 text-amber-700">
                  <span className="w-3 h-0.5 bg-amber-400 rounded-full" />
                  <span className="w-3 h-0.5 bg-amber-400 rounded-full" />
                  <span className="w-3 h-0.5 bg-amber-400 rounded-full" />
                </div>

                {/* ONLY one short, simple, picture-book-level summary sentence (A1 vocabulary).
                    No subtitles or headings. Full sentence visible without truncation. */}
                <div className="flex-1 min-w-0">
                  <p className="font-story font-extrabold text-stone-900 text-base sm:text-lg leading-relaxed break-words">
                    {card.sentence}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* [Make My Book] Button */}
      <div className="pt-2 pb-2">
        <button
          onClick={() => onMakeMyBook(cards)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black font-kr text-lg flex items-center justify-center gap-2 shadow-lg border-2 border-amber-500 active:scale-98 transition-all"
        >
          <BookOpen className="w-6 h-6 text-amber-950" />
          <span>Make My Book</span>
          <Sparkles className="w-5 h-5 text-amber-900" />
        </button>
      </div>
    </div>
  );
};
