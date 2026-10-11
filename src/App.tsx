/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ScreenType,
  WordDef,
  StoryStageCard,
} from './types';
import {
  STORY_PAGES,
  INFERENCE_QUESTIONS,
  STORY_STAGE_CARDS,
  WORD_DICTIONARY,
} from './data/storyData';
import { Header } from './components/Header';
import { CoverScreen } from './components/CoverScreen';
import { StoryPageScreen } from './components/StoryPageScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ReflectionScreen } from './components/ReflectionScreen';
import { ResultScreen } from './components/ResultScreen';
import { StoryRebuilderScreen } from './components/StoryRebuilderScreen';
import { RebuiltStoryReaderScreen } from './components/RebuiltStoryReaderScreen';
import { FinalScreen } from './components/FinalScreen';
import { WordBankModal } from './components/WordBankModal';
import { HomeConfirmModal } from './components/HomeConfirmModal';
import { WordPopup } from './components/WordPopup';

const STORAGE_KEY_BADGES = 'readively_badges';
const STORAGE_KEY_COMPLETED = 'readively_completed_stories';
const STORAGE_KEY_WORDS = 'readively_saved_words';

export default function App() {
  // Persistent data
  const [badgeCount, setBadgeCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BADGES);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [completedStories, setCompletedStories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedWords, setSavedWords] = useState<WordDef[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WORDS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // App Navigation & Session States
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('cover');
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0); // 0 to 9
  const [readSentenceIds, setReadSentenceIds] = useState<Set<string>>(new Set());
  const [questionResults, setQuestionResults] = useState<
    Record<string, { answered: boolean; firstTryCorrect: boolean; selectedIndex: number }>
  >({});
  const [, setReflectionSentence] = useState<string>('');
  const [reorderedStageCards, setReorderedStageCards] = useState<StoryStageCard[]>(STORY_STAGE_CARDS);

  // Modals & Popups
  const [activeWordPopup, setActiveWordPopup] = useState<WordDef | null>(null);
  const [isWordBankOpen, setIsWordBankOpen] = useState<boolean>(false);
  const [isHomeConfirmOpen, setIsHomeConfirmOpen] = useState<boolean>(false);

  // Sync saved words to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WORDS, JSON.stringify(savedWords));
    } catch (e) {
      console.error(e);
    }
  }, [savedWords]);

  // Sync badges and completed stories to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BADGES, badgeCount.toString());
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedStories));
    } catch (e) {
      console.error(e);
    }
  }, [badgeCount, completedStories]);

  // Toggle Word Bank save
  const handleToggleSaveWord = (wordDef: WordDef) => {
    const isAlreadySaved = savedWords.some((w) => w.word === wordDef.word);
    if (isAlreadySaved) {
      setSavedWords((prev) => prev.filter((w) => w.word !== wordDef.word));
    } else {
      setSavedWords((prev) => [...prev, wordDef]);
    }
  };

  // Start story from Cover
  const handleStartReading = () => {
    setCurrentScreen('story');
    setCurrentPageIndex(0);
  };

  // Reset progress and return Home
  const handleConfirmHome = () => {
    setIsHomeConfirmOpen(false);
    setCurrentScreen('cover');
    setCurrentPageIndex(0);
    setReadSentenceIds(new Set());
    setQuestionResults({});
    setReflectionSentence('');
    setReorderedStageCards(STORY_STAGE_CARDS);
  };

  // Mark a sentence as completed
  const handleSentenceCompleted = (sentenceId: string) => {
    setReadSentenceIds((prev) => {
      const next = new Set(prev);
      next.add(sentenceId);
      return next;
    });
  };

  // Handle Question Completed
  const handleQuestionCompleted = (questionId: string, isFirstTryCorrect: boolean) => {
    const qObj = INFERENCE_QUESTIONS.find((q) => q.id === questionId);
    setQuestionResults((prev) => ({
      ...prev,
      [questionId]: {
        answered: true,
        firstTryCorrect: isFirstTryCorrect,
        selectedIndex: qObj ? qObj.correctIndex : 0,
      },
    }));
  };

  // Navigation: Next from Story Page
  const handleStoryPageNext = () => {
    const currentPageNumber = currentPageIndex + 1; // 1 to 10
    // After pages 2, 4, 6, 8, 10, check if question exists
    const questionForPage = INFERENCE_QUESTIONS.find((q) => q.pageNumber === currentPageNumber);

    if (questionForPage) {
      // Go to Question Screen
      setCurrentScreen('question');
    } else {
      // Move to next story page
      if (currentPageIndex < STORY_PAGES.length - 1) {
        setCurrentPageIndex((prev) => prev + 1);
      }
    }
  };

  // Navigation: Previous from Story Page
  const handleStoryPagePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  // Navigation: Next from Question Screen
  const handleQuestionNext = () => {
    const currentPageNumber = currentPageIndex + 1;
    if (currentPageNumber === 10) {
      // After Page 10's Question, go to Reflection Screen!
      setCurrentScreen('reflection');
    } else {
      // Advance to next page and go back to story screen
      setCurrentPageIndex((prev) => prev + 1);
      setCurrentScreen('story');
    }
  };

  // Navigation: Previous from Question Screen
  const handleQuestionPrevious = () => {
    // Return to the story page just read
    setCurrentScreen('story');
  };

  // Reflection completion -> Result Screen
  const handleReflectionComplete = (reflectionText: string) => {
    setReflectionSentence(reflectionText);

    // Award badge if first time completing this story (PRD Section 5.⑤)
    if (!completedStories.includes('max_brave_dog')) {
      setBadgeCount((prev) => prev + 1);
      setCompletedStories((prev) => [...prev, 'max_brave_dog']);
    }

    setCurrentScreen('result');
  };

  // Count first-try correct questions
  const firstTryCorrectCount = Object.values(questionResults).filter(
    (r) => r.firstTryCorrect
  ).length;

  const currentPage = STORY_PAGES[currentPageIndex] || STORY_PAGES[0];
  const currentQuestion = INFERENCE_QUESTIONS.find(
    (q) => q.pageNumber === currentPageIndex + 1
  );

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-stone-900 font-story selection:bg-amber-200">
      {/* Header: shown on every screen EXCEPT Cover (PRD Section 5-B) */}
      {currentScreen !== 'cover' && (
        <Header
          pageCounter={
            currentScreen === 'story'
              ? `Page ${currentPage.pageNumber} / ${STORY_PAGES.length}`
              : currentScreen === 'question'
              ? `Question ${Math.ceil(currentPage.pageNumber / 2)} / 5`
              : undefined
          }
          onHomeClick={() => setIsHomeConfirmOpen(true)}
          onWordBankClick={() => setIsWordBankOpen(true)}
          savedWordsCount={savedWords.length}
        />
      )}

      {/* Screen Views */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'cover' && (
          <CoverScreen
            onStartReading={handleStartReading}
            badgeCount={badgeCount}
          />
        )}

        {currentScreen === 'story' && (
          <StoryPageScreen
            page={currentPage}
            totalPages={STORY_PAGES.length}
            onPrevious={handleStoryPagePrevious}
            onNext={handleStoryPageNext}
            onWordClick={(wordDef) => setActiveWordPopup(wordDef)}
            readSentenceIds={readSentenceIds}
            onSentenceCompleted={handleSentenceCompleted}
          />
        )}

        {currentScreen === 'question' && currentQuestion && (
          <QuestionScreen
            question={currentQuestion}
            onPrevious={handleQuestionPrevious}
            onNext={handleQuestionNext}
            onWordClick={(wordDef) => setActiveWordPopup(wordDef)}
            onQuestionCompleted={handleQuestionCompleted}
            existingResult={questionResults[currentQuestion.id]}
          />
        )}

        {currentScreen === 'reflection' && (
          <ReflectionScreen onComplete={handleReflectionComplete} />
        )}

        {currentScreen === 'result' && (
          <ResultScreen
            scoreCount={firstTryCorrectCount}
            totalQuestions={INFERENCE_QUESTIONS.length}
            savedWordsCount={savedWords.length}
            badgeCount={badgeCount}
            onOpenWordBank={() => setIsWordBankOpen(true)}
            onOpenStoryRebuilder={() => setCurrentScreen('rebuilder')}
          />
        )}

        {currentScreen === 'rebuilder' && (
          <StoryRebuilderScreen
            cards={reorderedStageCards}
            onBackToResult={() => setCurrentScreen('result')}
            onMakeMyBook={(newCards) => {
              setReorderedStageCards(newCards);
              setCurrentScreen('rebuilt_reader');
            }}
          />
        )}

        {currentScreen === 'rebuilt_reader' && (
          <RebuiltStoryReaderScreen
            reorderedCards={reorderedStageCards}
            onFinishRebuiltStory={() => setCurrentScreen('final')}
            onBackToRebuilder={() => setCurrentScreen('rebuilder')}
          />
        )}

        {currentScreen === 'final' && (
          <FinalScreen
            onReadAgain={handleConfirmHome}
            badgeCount={badgeCount}
          />
        )}
      </main>

      {/* Popups and Modals */}
      <WordPopup
        wordDef={activeWordPopup}
        isOpen={Boolean(activeWordPopup)}
        onClose={() => setActiveWordPopup(null)}
        isSaved={
          activeWordPopup
            ? savedWords.some((w) => w.word === activeWordPopup.word)
            : false
        }
        onToggleSave={(wordDef) => handleToggleSaveWord(wordDef)}
      />

      <WordBankModal
        isOpen={isWordBankOpen}
        onClose={() => setIsWordBankOpen(false)}
        savedWords={savedWords}
      />

      <HomeConfirmModal
        isOpen={isHomeConfirmOpen}
        onConfirm={handleConfirmHome}
        onCancel={() => setIsHomeConfirmOpen(false)}
      />
    </div>
  );
}
