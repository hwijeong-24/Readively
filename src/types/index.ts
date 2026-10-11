export interface WordDef {
  word: string;
  korean: string;
  pronunciationTip?: string;
  ipa?: string;
  englishMeaning?: string;
  inThisStory?: string;
  iconType: string;
}

export interface SentenceItem {
  id: string;
  text: string;
  underlinedWords: string[]; // words that can be clicked for definition
  practiceWords: string[]; // 1-2 words to highlight in AI Reading Coach feedback
  feedbackComment: string; // Encouraging tip for practicing those words
}

export interface InferenceQuestion {
  id: string;
  pageNumber: number; // 2, 4, 6, 8, or 10
  question: string;
  underlinedWord?: string; // One slightly difficult word in the question
  choices: string[];
  correctIndex: number;
  hint: string;
}

export interface StoryPage {
  pageNumber: number;
  sentences: SentenceItem[];
  illustrationId: string;
}

export interface EmotionChip {
  id: string;
  text: string;
}

export type EmotionType = 'happy' | 'sad' | 'surprised' | 'interested';

export interface StoryStageCard {
  id: string;
  stageName: 'beginning' | 'development' | 'turn' | 'ending';
  sentence: string; // A1 picture-book level sentence
  illustrationId: string;
}

export type ScreenType =
  | 'cover'
  | 'story'
  | 'question'
  | 'reflection'
  | 'result'
  | 'rebuilder'
  | 'rebuilt_reader'
  | 'final'
  | 'book_selector';
