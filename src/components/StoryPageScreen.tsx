import React, { useState, useEffect, useRef } from 'react';
import { StoryPage, SentenceItem, WordDef } from '../types';
import { StoryIllustration } from './illustrations/StoryIllustration';
import { sharedVoiceValidator, playAISpeech, stopAISpeech } from '../utils/audioSpeech';
import { WORD_DICTIONARY } from '../data/storyData';
import {
  Mic,
  Volume2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  AlertCircle,
  Play,
  Square,
} from 'lucide-react';

interface StoryPageScreenProps {
  page: StoryPage;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onWordClick: (wordDef: WordDef) => void;
  readSentenceIds: Set<string>;
  onSentenceCompleted: (sentenceId: string) => void;
}

export const StoryPageScreen: React.FC<StoryPageScreenProps> = ({
  page,
  totalPages,
  onPrevious,
  onNext,
  onWordClick,
  readSentenceIds,
  onSentenceCompleted,
}) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);

  // Recorder states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [recordingVolume, setRecordingVolume] = useState<number>(0);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // Coach feedback state for the recorded sentence
  const [activeFeedbackSentence, setActiveFeedbackSentence] = useState<SentenceItem | null>(null);
  const [isPlayingTTS, setIsPlayingTTS] = useState<boolean>(false);

  // Recorded audio URLs for "My Voice" playback
  const [recordedAudioUrls, setRecordedAudioUrls] = useState<Record<string, string>>({});
  const [isPlayingMyVoice, setIsPlayingMyVoice] = useState<boolean>(false);
  const myVoiceAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    stopAISpeech();
    setIsPlayingTTS(false);
    if (myVoiceAudioRef.current) {
      myVoiceAudioRef.current.pause();
      setIsPlayingMyVoice(false);
    }
    setSpeechError(null);

    const firstUnread = page.sentences.findIndex((s) => !readSentenceIds.has(s.id));
    if (firstUnread !== -1) {
      setCurrentSentenceIndex(firstUnread);
      setActiveFeedbackSentence(null);
    } else {
      setCurrentSentenceIndex(page.sentences.length - 1);
      const lastSentence = page.sentences[page.sentences.length - 1];
      setActiveFeedbackSentence(lastSentence);
    }
  }, [page.pageNumber]);

  useEffect(() => {
    return () => {
      sharedVoiceValidator.cancel();
      stopAISpeech();
      if (myVoiceAudioRef.current) {
        myVoiceAudioRef.current.pause();
      }
    };
  }, []);

  const currentSentence = page.sentences[currentSentenceIndex] || page.sentences[0];
  const allSentencesReadOnPage = page.sentences.every((s) => readSentenceIds.has(s.id));

  // Toggle Recording with strict Section 5-A Valid Speech Check
  const handleToggleRecord = async (targetSentence: SentenceItem) => {
    if (isProcessing) return;

    if (myVoiceAudioRef.current) {
      myVoiceAudioRef.current.pause();
      setIsPlayingMyVoice(false);
    }

    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      setSpeechError(null);

      try {
        const validation = await sharedVoiceValidator.stopAndValidate();

        if (validation.isValid) {
          // Save recorded audio URL for "My Voice"
          if (validation.audioBlobUrl) {
            setRecordedAudioUrls((prev) => ({
              ...prev,
              [targetSentence.id]: validation.audioBlobUrl!,
            }));
          }

          onSentenceCompleted(targetSentence.id);
          setActiveFeedbackSentence(targetSentence);

          const nextIndex = page.sentences.findIndex(
            (s, idx) => idx > currentSentenceIndex && !readSentenceIds.has(s.id)
          );
          if (nextIndex !== -1) {
            setCurrentSentenceIndex(nextIndex);
          }
        } else {
          setSpeechError("I couldn't hear you. Let's try again!");
        }
      } catch (err: any) {
        console.error('Validation error:', err);
        setSpeechError("I couldn't hear you. Let's try again!");
      } finally {
        setIsProcessing(false);
      }
    } else {
      setSpeechError(null);
      stopAISpeech();
      setIsPlayingTTS(false);

      try {
        await sharedVoiceValidator.startRecording((volume) => {
          setRecordingVolume(volume);
        });
        setIsRecording(true);
      } catch (err: any) {
        if (err.message === 'PERMISSION_DENIED') {
          setSpeechError('마이크 권한이 필요해요. 브라우저 설정에서 마이크를 허용해주세요!');
        } else {
          setSpeechError("I couldn't hear you. Let's try again!");
        }
        setIsRecording(false);
      }
    }
  };

  const handlePlaySentenceAudio = (sentenceText: string) => {
    if (myVoiceAudioRef.current) {
      myVoiceAudioRef.current.pause();
      setIsPlayingMyVoice(false);
    }

    if (isPlayingTTS) {
      stopAISpeech();
      setIsPlayingTTS(false);
      return;
    }
    setIsPlayingTTS(true);
    playAISpeech(sentenceText, () => {
      setIsPlayingTTS(false);
    });
  };

  // Play learner's own recorded voice ("My Voice" button)
  const handlePlayMyVoice = (sentenceId: string) => {
    const audioUrl = recordedAudioUrls[sentenceId];
    if (!audioUrl) return;

    stopAISpeech();
    setIsPlayingTTS(false);

    if (isPlayingMyVoice && myVoiceAudioRef.current) {
      myVoiceAudioRef.current.pause();
      setIsPlayingMyVoice(false);
      return;
    }

    if (myVoiceAudioRef.current) {
      myVoiceAudioRef.current.pause();
    }

    const audio = new Audio(audioUrl);
    myVoiceAudioRef.current = audio;
    setIsPlayingMyVoice(true);

    audio.onended = () => {
      setIsPlayingMyVoice(false);
    };

    audio.onerror = () => {
      setIsPlayingMyVoice(false);
    };

    audio.play().catch((err) => {
      console.warn('Error playing My Voice:', err);
      setIsPlayingMyVoice(false);
    });
  };

  // Render sentence with highlighted underlined words
  const renderSentenceWithUnderlines = (sentence: SentenceItem, isCurrent: boolean) => {
    const words = sentence.text.split(' ');

    return (
      <span className="font-story font-bold leading-relaxed text-xl sm:text-2xl">
        {words.map((wordWithPunct, idx) => {
          const cleanWord = wordWithPunct.replace(/[.,!?"']/g, '').toLowerCase();
          const isUnderlined = sentence.underlinedWords.some(
            (w) => w.toLowerCase() === cleanWord
          );

          if (isUnderlined && WORD_DICTIONARY[cleanWord]) {
            return (
              <React.Fragment key={idx}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onWordClick(WORD_DICTIONARY[cleanWord]);
                  }}
                  className="inline-block bg-[#fef3c7] text-[#78350f] font-black px-2 py-0.5 mx-0.5 rounded-lg underline decoration-[#d97706] decoration-2 underline-offset-4 hover:bg-amber-200 active:scale-95 transition-all cursor-pointer"
                  title="단어 뜻 보기"
                >
                  {wordWithPunct}
                </button>
                {idx < words.length - 1 ? ' ' : ''}
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={idx}>
              <span className={isCurrent ? 'text-stone-900' : 'text-slate-500'}>
                {wordWithPunct}
              </span>
              {idx < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          );
        })}
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full pb-4">
      {/* Top Half: Illustration */}
      <div className="w-full px-4 pt-2">
        <div className="w-full aspect-4/3 rounded-3xl overflow-hidden border-2 border-stone-200/90 shadow-md bg-white relative">
          <StoryIllustration
            illustrationId={page.illustrationId}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Half: Story Sentences & Actions */}
      <div className="px-4 pt-3 flex-1 flex flex-col justify-between space-y-3">
        {/* Sentences Boxes */}
        <div className="space-y-2.5">
          {page.sentences.map((sent, index) => {
            const isCurrent = index === currentSentenceIndex;
            const isRead = readSentenceIds.has(sent.id);

            return (
              <div
                key={sent.id}
                onClick={() => {
                  setCurrentSentenceIndex(index);
                  if (isRead) {
                    setActiveFeedbackSentence(sent);
                  }
                }}
                className={`p-4 sm:p-5 rounded-2xl transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#fefce8] border-2 border-[#fde047] shadow-xs'
                    : 'bg-white/90 border border-slate-200 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {renderSentenceWithUnderlines(sent, isCurrent)}
                  </div>
                  {isRead && !isCurrent && (
                    <span className="shrink-0 text-2xs font-bold font-kr text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full ml-2">
                      완료
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Listen Button and Sentence Counter Row */}
        <div className="flex items-center justify-between px-1">
          <button
            onClick={() => handlePlaySentenceAudio(currentSentence.text)}
            className="bg-[#fef3c7] hover:bg-[#fde68a] text-[#78350f] text-xs font-bold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs border border-amber-200/80 active:scale-95 transition-all"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#78350f]" />
            <span>Listen to Sentence (올바른 발음 듣기)</span>
          </button>

          <span className="text-xs font-medium font-story text-slate-500">
            Sentence {currentSentenceIndex + 1} of {page.sentences.length}
          </span>
        </div>

        {/* Invalid Speech Warning (Section 5-A) */}
        {speechError && (
          <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center gap-2.5 text-rose-800 animate-in fade-in duration-150">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <div className="flex-1">
              <p className="text-sm font-extrabold font-story">{speechError}</p>
              <p className="text-xs font-kr text-rose-700">목소리가 들리지 않았어요. 다시 한번 또박또박 말해볼까요?</p>
            </div>
          </div>
        )}

        {/* AI Reading Coach Panel (Matches Screenshot 223916 with "My Voice" button) */}
        {activeFeedbackSentence && !speechError && (
          <div className="p-4 bg-white rounded-3xl border-2 border-amber-300 shadow-md space-y-2.5 animate-in fade-in zoom-in-98 duration-150">
            {/* Header: AI Reading Coach + Re-record pill button */}
            <div className="flex items-center justify-between pb-0.5">
              <span className="text-sm font-black font-story text-slate-800">
                AI Reading Coach
              </span>

              <button
                onClick={() => {
                  const targetIndex = page.sentences.findIndex(
                    (s) => s.id === activeFeedbackSentence.id
                  );
                  if (targetIndex !== -1) {
                    setCurrentSentenceIndex(targetIndex);
                  }
                  handleToggleRecord(activeFeedbackSentence);
                }}
                className="py-1 px-3 rounded-full bg-white hover:bg-amber-50 text-[#b45309] font-bold font-story text-xs flex items-center gap-1 border border-amber-300 shadow-2xs active:scale-95 transition-all"
              >
                <RotateCcw className="w-3 h-3 text-[#b45309]" />
                <span>Re-record</span>
              </button>
            </div>

            {/* Encouraging Feedback Heading */}
            <p className="text-sm font-bold font-story text-slate-800 leading-snug">
              Super reading! Practice pronouncing "{activeFeedbackSentence.practiceWords[0] || 'words'}" with confidence!
            </p>

            {/* Practice Words interactive chip */}
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-xs font-semibold font-story text-slate-500">
                Practice words:
              </span>
              {activeFeedbackSentence.practiceWords.map((pw) => (
                <button
                  key={pw}
                  onClick={() => playAISpeech(pw)}
                  className="px-3 py-1 rounded-full bg-[#fef3c7] hover:bg-amber-200 text-[#78350f] font-black font-story text-xs flex items-center gap-1.5 border border-amber-200/80 shadow-2xs active:scale-95 transition-all"
                  title="단어 발음 듣기"
                >
                  <span>{pw}</span>
                  <Volume2 className="w-3.5 h-3.5 text-[#78350f]" />
                </button>
              ))}
            </div>

            {/* Callout Tip Box */}
            <div className="bg-[#fefce8] p-2.5 rounded-2xl border border-amber-200/70 text-xs font-bold font-kr text-[#78350f] leading-snug flex items-center gap-2">
              <span className="text-sm">💡</span>
              <span>
                "{activeFeedbackSentence.practiceWords[0] || '단어'}" 단어의 올바른 발음과 억양을 듣고 따라 해보세요! 잘했어요!
              </span>
            </div>

            {/* Action Buttons: [올바른 발음 확인] & [My Voice] */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* 올바른 발음 확인 */}
              <button
                onClick={() => handlePlaySentenceAudio(activeFeedbackSentence.text)}
                className="py-2.5 px-3 rounded-2xl bg-[#fef3c7] hover:bg-[#fde68a] text-[#78350f] font-bold font-kr text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-amber-300 shadow-2xs active:scale-95 transition-all"
              >
                <Volume2 className="w-4 h-4 text-[#78350f]" />
                <span>올바른 발음 확인</span>
              </button>

              {/* My Voice (내 목소리 다시 듣기) */}
              <button
                onClick={() => handlePlayMyVoice(activeFeedbackSentence.id)}
                disabled={!recordedAudioUrls[activeFeedbackSentence.id]}
                className={`py-2.5 px-3 rounded-2xl font-bold font-story text-xs sm:text-sm flex items-center justify-center gap-1.5 border shadow-2xs active:scale-95 transition-all ${
                  isPlayingMyVoice
                    ? 'bg-amber-500 text-white border-amber-600 animate-pulse'
                    : recordedAudioUrls[activeFeedbackSentence.id]
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    : 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                }`}
                title={
                  recordedAudioUrls[activeFeedbackSentence.id]
                    ? '내가 녹음한 목소리 듣기'
                    : '녹음 후 내 목소리를 들을 수 있어요'
                }
              >
                {isPlayingMyVoice ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current text-slate-600" />
                    <span>My Voice</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Bottom Bar: Record Button & Next / Prev */}
        <div className="flex items-center justify-between gap-2 pt-2">
          {/* Previous Button (Hidden on page 1) */}
          {page.pageNumber > 1 ? (
            <button
              onClick={onPrevious}
              aria-label="이전 페이지"
              className="py-3 px-3.5 rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#64748b] font-bold text-xs flex items-center gap-1 active:scale-95 transition-all shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>
          ) : (
            <div className="w-10" />
          )}

          {/* Prominent Orange Pill Button: Record (소리 내어 읽기) */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {isRecording && (
              <div className="mb-1 flex items-center gap-1 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300 text-2xs font-bold text-amber-900">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>녹음 중...</span>
                <div className="w-12 h-1.5 bg-stone-200 rounded-full overflow-hidden ml-1">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-75"
                    style={{ width: `${Math.round(recordingVolume * 100)}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => handleToggleRecord(currentSentence)}
              disabled={isProcessing}
              className={`w-full max-w-[240px] py-3.5 px-5 rounded-full font-bold font-kr text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all ${
                isRecording
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                  : 'bg-[#f97316] hover:bg-[#ea580c] text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>
                {isRecording
                  ? '녹음 완료'
                  : speechError
                  ? 'Record (소리 내어 읽기)'
                  : 'Record (소리 내어 읽기)'}
              </span>
            </button>
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={!allSentencesReadOnPage}
            className={`py-3.5 px-5 rounded-full text-sm font-semibold flex items-center gap-1 transition-all shrink-0 ${
              allSentencesReadOnPage
                ? 'bg-slate-900 hover:bg-black text-white shadow-md active:scale-95'
                : 'bg-[#f1f5f9] text-[#94a3b8] cursor-not-allowed'
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
