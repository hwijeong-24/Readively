import React from 'react';
import { StoryIllustration } from './illustrations/StoryIllustration';
import { Mic, Search, Smile, BookOpen, Sparkles } from 'lucide-react';
import { STORY_TITLE } from '../data/storyData';

interface CoverScreenProps {
  onStartReading: () => void;
  badgeCount: number;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onStartReading, badgeCount }) => {
  return (
    <div className="flex-1 flex flex-col justify-between items-center p-4 max-w-md mx-auto w-full space-y-4">
      {/* Top Pill Badge (Matches Screenshot 221604) */}
      <div className="pt-1 flex items-center justify-center w-full relative">
        <div className="bg-[#fef3c7] text-[#92400e] font-bold font-kr text-xs px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
          <span>초등 5-6학년 · 영어 그림책 액티비티</span>
        </div>

        {badgeCount > 0 && (
          <div className="absolute right-0 bg-amber-400 text-amber-950 px-2.5 py-1 rounded-full font-black text-2xs shadow-2xs border border-amber-500/40">
            ⭐ {badgeCount}
          </div>
        )}
      </div>

      {/* Book Cover Card (Matches Screenshot 221604) */}
      <div className="w-full max-w-[340px] aspect-3/4 rounded-[32px] overflow-hidden border-4 border-[#fde047] shadow-xl bg-white relative flex flex-col justify-end">
        {/* Watercolor Illustration */}
        <div className="absolute inset-0">
          <StoryIllustration illustrationId="cover" className="w-full h-full object-cover" />
        </div>

        {/* Floating Title Card at Bottom of Illustration */}
        <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg mx-3.5 mb-3.5 border border-white/90 text-center space-y-1">
          <h1 className="text-2xl font-black font-story text-[#5c2a12] tracking-tight leading-tight">
            {STORY_TITLE}
          </h1>
          <p className="text-sm font-bold font-kr text-[#c2410c]">
            맥스는 용감한 강아지
          </p>
          <p className="text-2xs font-medium font-story text-slate-500 pt-0.5">
            By Lily Meadows · A Counterpointing Picture Book
          </p>
        </div>
      </div>

      {/* 3 Core Features Row (Matches Screenshot 221604) */}
      <div className="w-full grid grid-cols-3 gap-2.5 pt-1">
        {/* Card 1: Read Aloud */}
        <div className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-2xs text-center flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mb-1.5">
            <Mic className="w-4 h-4" />
          </div>
          <span className="text-xs font-black font-kr text-slate-900 block leading-tight">
            소리 내어 읽기
          </span>
          <span className="text-2xs font-story text-slate-500 mt-0.5">
            Read Aloud
          </span>
        </div>

        {/* Card 2: Picture Inference */}
        <div className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-2xs text-center flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-1.5">
            <Search className="w-4 h-4" />
          </div>
          <span className="text-xs font-black font-kr text-slate-900 block leading-tight">
            그림으로 추론
          </span>
          <span className="text-2xs font-story text-slate-500 mt-0.5">
            Picture Inference
          </span>
        </div>

        {/* Card 3: Express Feelings */}
        <div className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-2xs text-center flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1.5">
            <Smile className="w-4 h-4" />
          </div>
          <span className="text-xs font-black font-kr text-slate-900 block leading-tight">
            감정 표현하기
          </span>
          <span className="text-2xs font-story text-slate-500 mt-0.5">
            Express Feelings
          </span>
        </div>
      </div>

      {/* Large [Open the book] Button (PRD Section 5.①) */}
      <div className="w-full pt-1 pb-2">
        <button
          onClick={onStartReading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black font-story text-xl shadow-lg border-2 border-amber-500 flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <BookOpen className="w-5 h-5 text-amber-950" />
          <span>Open the book</span>
        </button>
      </div>
    </div>
  );
};
