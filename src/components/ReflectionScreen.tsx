import React, { useState, useEffect } from 'react';
import { EmotionType } from '../types';
import { REFLECTION_OPTIONS } from '../data/storyData';
import { sharedVoiceValidator, playAISpeech, stopAISpeech } from '../utils/audioSpeech';
import { Mic, Headphones, ArrowRight, AlertCircle, Heart } from 'lucide-react';

interface ReflectionScreenProps {
  onComplete: (reflectionSentence: string) => void;
}

export const ReflectionScreen: React.FC<ReflectionScreenProps> = ({ onComplete }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>('happy');
  const [selectedChipIndex, setSelectedChipIndex] = useState<number>(0);

  // Recorder states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [recordingVolume, setRecordingVolume] = useState<number>(0);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isValidlyRecorded, setIsValidlyRecorded] = useState<boolean>(false);
  const [isPlayingTTS, setIsPlayingTTS] = useState<boolean>(false);

  const emotionData = REFLECTION_OPTIONS[selectedEmotion];
  const fullSentence = `I felt ${emotionData.label} because ${emotionData.chips[selectedChipIndex]}`;

  // Reset recording state whenever emotion or chip changes
  const handleSelectEmotion = (emotion: EmotionType) => {
    if (selectedEmotion !== emotion) {
      setSelectedEmotion(emotion);
      setSelectedChipIndex(0);
      setIsValidlyRecorded(false);
      setSpeechError(null);
      stopAISpeech();
    }
  };

  const handleSelectChip = (index: number) => {
    if (selectedChipIndex !== index) {
      setSelectedChipIndex(index);
      setIsValidlyRecorded(false);
      setSpeechError(null);
      stopAISpeech();
    }
  };

  // Clean up recording on unmount
  useEffect(() => {
    return () => {
      sharedVoiceValidator.cancel();
      stopAISpeech();
    };
  }, []);

  // Handle Recording Toggle (Section 5-A)
  const handleToggleRecord = async () => {
    if (isProcessing) return;

    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      setSpeechError(null);

      try {
        const validation = await sharedVoiceValidator.stopAndValidate();

        if (validation.isValid) {
          setIsValidlyRecorded(true);
          // After valid recording, AI automatically reads the completed sentence aloud
          setIsPlayingTTS(true);
          playAISpeech(fullSentence, () => {
            setIsPlayingTTS(false);
          });
        } else {
          setSpeechError("I couldn't hear you. Let's try again!");
        }
      } catch (err: any) {
        console.error('Recording validation error:', err);
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

  const handlePlaySentenceAudio = () => {
    if (isPlayingTTS) {
      stopAISpeech();
      setIsPlayingTTS(false);
      return;
    }
    setIsPlayingTTS(true);
    playAISpeech(fullSentence, () => {
      setIsPlayingTTS(false);
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full p-4 space-y-4">
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold font-kr">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-600" />
          <span>이야기를 읽고 난 내 마음</span>
        </div>
        <h2 className="text-2xl font-black font-kr text-stone-900">
          어떤 기분이 들었나요?
        </h2>
        <p className="text-xs font-kr text-stone-600">
          이모지를 고르고 마음에 드는 이유를 선택해보세요.
        </p>
      </div>

      {/* 4 Emojis Row with Large Labels */}
      <div className="grid grid-cols-4 gap-2">
        {(['happy', 'sad', 'surprised', 'interested'] as EmotionType[]).map((emotionKey) => {
          const item = REFLECTION_OPTIONS[emotionKey];
          const isSelected = selectedEmotion === emotionKey;

          return (
            <button
              key={emotionKey}
              onClick={() => handleSelectEmotion(emotionKey)}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                isSelected
                  ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-300'
                  : 'bg-white border-stone-200 hover:border-amber-200'
              }`}
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="text-xs font-black font-story text-stone-800 tracking-wide capitalize">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* "I felt ___ because ___" Sentence Display */}
      <div className="bg-amber-50/90 rounded-2xl p-4 border-2 border-amber-300 shadow-sm space-y-2">
        <span className="text-xs font-bold font-kr text-amber-800 block">
          내가 완성한 감정 문장
        </span>
        <p className="text-lg sm:text-xl font-black font-story text-amber-950 leading-relaxed">
          <span>I felt </span>
          <span className="text-amber-600 underline decoration-amber-400 decoration-3">
            {emotionData.label}
          </span>
          <span> because </span>
          <span className="text-stone-900 font-extrabold">
            {emotionData.chips[selectedChipIndex]}
          </span>
        </p>
      </div>

      {/* 3 Easy Sentence Chips matched to chosen emotion (large font) */}
      <div className="space-y-2">
        <span className="text-xs font-bold font-kr text-stone-600 block">
          이유를 골라보세요 (choose one):
        </span>
        {emotionData.chips.map((chip, idx) => {
          const isSelected = selectedChipIndex === idx;

          return (
            <button
              key={idx}
              onClick={() => handleSelectChip(idx)}
              className={`w-full p-3.5 rounded-2xl border-2 text-left font-story text-base sm:text-lg leading-snug transition-all active:scale-98 ${
                isSelected
                  ? 'bg-amber-400/20 border-amber-500 text-stone-900 font-bold shadow-xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:border-amber-200'
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Speech Error Warning (Section 5-A) */}
      {speechError && (
        <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center gap-2.5 text-rose-800 animate-in fade-in duration-150">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <div className="flex-1">
            <p className="text-sm font-extrabold font-story">{speechError}</p>
            <p className="text-xs font-kr text-rose-700">문장을 완성하고 소리 내어 말해보세요!</p>
          </div>
        </div>
      )}

      {/* Recording Area & Audio Playback */}
      <div className="flex flex-col items-center justify-center space-y-2 pt-1">
        {isRecording && (
          <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-bold font-kr text-amber-900">
              완성된 문장을 소리 내어 읽어보세요!
            </span>
            <div className="w-14 h-2 bg-stone-200 rounded-full overflow-hidden ml-1">
              <div
                className="h-full bg-emerald-500 transition-all duration-75"
                style={{ width: `${Math.round(recordingVolume * 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleRecord}
            disabled={isProcessing}
            className={`py-3.5 px-6 rounded-2xl font-black font-kr text-base flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
              isRecording
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-amber-400 hover:bg-amber-500 text-amber-950 border-2 border-amber-500'
            }`}
          >
            <Mic className={`w-5 h-5 ${isRecording ? 'animate-bounce' : ''}`} />
            <span>
              {isRecording
                ? '녹음 멈추기'
                : isValidlyRecorded
                ? '🎤 다시 읽기'
                : '🎤 문장 소리 내어 읽기'}
            </span>
          </button>

          {isValidlyRecorded && (
            <button
              onClick={handlePlaySentenceAudio}
              className="py-3.5 px-4 rounded-2xl bg-white border-2 border-amber-300 hover:bg-amber-50 text-amber-950 font-bold font-kr text-sm flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Headphones className="w-4 h-4 text-amber-800" />
              <span>Listen</span>
            </button>
          )}
        </div>
      </div>

      {/* Completion Next Button */}
      <div className="pt-2">
        <button
          onClick={() => onComplete(fullSentence)}
          disabled={!isValidlyRecorded}
          className={`w-full py-4 rounded-2xl font-black font-kr text-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 ${
            isValidlyRecorded
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          <span>완료하고 결과 보기</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
