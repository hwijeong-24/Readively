import React, { useState } from 'react';
import { StoryStageCard } from '../types';
import { StoryIllustration } from './illustrations/StoryIllustration';
import { playAISpeech, stopAISpeech } from '../utils/audioSpeech';
import { ChevronLeft, ChevronRight, Headphones, Check } from 'lucide-react';

interface RebuiltStoryReaderScreenProps {
  reorderedCards: StoryStageCard[];
  onFinishRebuiltStory: () => void;
  onBackToRebuilder: () => void;
}

export const RebuiltStoryReaderScreen: React.FC<RebuiltStoryReaderScreenProps> = ({
  reorderedCards,
  onFinishRebuiltStory,
  onBackToRebuilder,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const currentCard = reorderedCards[currentPageIndex];
  const isLastPage = currentPageIndex === reorderedCards.length - 1;

  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      stopAISpeech();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    playAISpeech(currentCard.sentence, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleNext = () => {
    stopAISpeech();
    setIsPlayingAudio(false);
    if (isLastPage) {
      onFinishRebuiltStory();
    } else {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    stopAISpeech();
    setIsPlayingAudio(false);
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    } else {
      onBackToRebuilder();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full pb-4">
      {/* Top Bar */}
      <div className="px-4 pt-2 flex items-center justify-between">
        <span className="text-xs font-bold font-kr text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
          내가 만든 이야기 책
        </span>
        <span className="text-xs font-extrabold font-story text-stone-700 bg-white px-3 py-1 rounded-full border border-stone-200">
          Part {currentPageIndex + 1} / {reorderedCards.length}
        </span>
      </div>

      {/* Top Half: Illustration */}
      <div className="w-full px-4 pt-2">
        <div className="w-full aspect-4/3 rounded-3xl overflow-hidden border-2 border-stone-200/90 shadow-md bg-white relative">
          <StoryIllustration illustrationId={currentCard.illustrationId} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Bottom Half: Rebuilt story text & controls */}
      <div className="px-4 pt-3 flex-1 flex flex-col justify-between space-y-3">
        <div className="p-4 rounded-3xl bg-amber-50/90 border-2 border-amber-300 shadow-xs space-y-3">
          <p className="font-story font-black text-amber-950 text-xl leading-relaxed">
            {currentCard.sentence}
          </p>

          <button
            onClick={handlePlayAudio}
            className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold font-kr text-xs flex items-center gap-1.5 transition-colors active:scale-95 border border-amber-300/60"
          >
            <Headphones className="w-4 h-4 text-amber-900" />
            <span>AI 목소리로 듣기</span>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold font-kr text-sm flex items-center gap-1 transition-colors active:scale-95 shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold font-kr text-sm flex items-center gap-1 transition-all active:scale-95 shadow-md border-2 border-amber-500"
          >
            <span>{isLastPage ? '완료' : 'Next'}</span>
            {isLastPage ? <Check className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
