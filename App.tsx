
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { quizTopicGroups } from './data';
import { QuizItem, Scripture, QAItem, ProphecyItem, BooksItem, HowToItem, QuizItemType, BookCategory, Prophecy, BookQuizItem, BookQuizQuestion, QuizTopicGroup } from './types';
import { generateQuizOptions, QuizOption } from './services/geminiService';

// --- Helper Functions & Constants ---
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

// --- Custom Hook for Service Worker Updates ---
const useServiceWorkerUpdater = () => {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // The new service worker has taken control, reload the page
      window.location.reload();
    });

    const checkForUpdate = (registration: ServiceWorkerRegistration) => {
      // A new service worker is waiting to activate.
      if (registration.waiting) {
        setWaitingWorker(registration.waiting);
        setShowUpdateNotification(true);
      }
    };
    
    navigator.serviceWorker.ready.then(registration => {
      // Check for an update on initial load.
      checkForUpdate(registration);
      
      // Listen for future updates.
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              // A new version is installed and waiting.
              checkForUpdate(registration);
            }
          });
        }
      });
    });
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      // Send a message to the waiting service worker to take over.
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdateNotification(false);
    }
  };

  return { showUpdateNotification, handleUpdate };
};


// --- Icon Components ---
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
);
const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
);
const ShuffleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18 20.25V19.05C18 16.65 16.35 15.675 14.55 15.675H13.5V14.175H14.55C15.9 14.175 16.5 13.575 16.5 12.75C16.5 11.925 15.9 11.325 14.55 11.325H13.125L14.625 12.825L13.575 13.875L10.95 11.25L13.575 8.625L14.625 9.675L13.125 11.175H14.55C16.95 11.175 18 10.125 18 8.7V7.5H19.5V8.7C19.5 10.575 17.925 11.85 16.05 12.375V12.75C17.925 13.275 19.5 14.55 19.5 16.5V19.05C19.5 20.85 17.85 21.75 16.05 21.75H8.25V20.25H16.05C17.4 20.25 18 19.65 18 18.825V20.25ZM4.5 3.75H6V5.25H4.5V3.75ZM6 18.75V21.75H4.5V18.75H6ZM6 6.75V17.25H4.5V6.75H6Z"></path></svg>
);
const ReverseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18 22.5H6C5.175 22.5 4.5 21.825 4.5 21V3C4.5 2.175 5.175 1.5 6 1.5H18C18.825 1.5 19.5 2.175 19.5 3V21C19.5 21.825 18.825 22.5 18 22.5ZM13.05 8.4V5.25L9 9.3L13.05 13.35V10.2H15V8.4H13.05Z"></path></svg>
);
const BackIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
);
const AiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C11.45 2 11 2.45 11 3V4.05C7.4 4.56 4.56 7.4 4.05 11H3C2.45 11 2 11.45 2 12C2 12.55 2.45 13 3 13H4.05C4.56 16.6 7.4 19.44 11 19.95V21C11 21.55 11.45 22 12 22C12.55 22 13 21.55 13 21V19.95C16.6 19.44 19.44 16.6 19.95 13H21C21.55 13 22 12.55 22 12C22 11.45 21.55 11 21 11H19.95C19.44 7.4 16.6 4.56 13 4.05V3C13 2.45 12.55 2 12 2ZM12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6Z"></path></svg>
);
const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 18H20V20H4V18Z"></path></svg>
);
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path></svg>
);


// --- UI Components ---

const Header: React.FC<{ onBack?: () => void; title: string; children?: React.ReactNode; }> = ({ onBack, title, children }) => (
  <header className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm sticky top-0 z-20 flex items-center shadow-sm">
    {onBack && (
      <button onClick={onBack} className="p-2 mr-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Go back">
        <BackIcon className="w-6 h-6" />
      </button>
    )}
    <h1 className="flex-grow text-xl font-bold text-slate-900 dark:text-white truncate">{title}</h1>
    {children}
  </header>
);

const HomeScreen: React.FC<{ onSelectTopic: (topic: QuizItem) => void; onInstall: () => void; canInstall: boolean; }> = ({ onSelectTopic, onInstall, canInstall }) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggleOpen = (key: string) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(key)) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
            return newSet;
        });
    };

    return (
        <div>
            <Header title="Bible Flashcard Quiz">
                {canInstall && (
                    <button onClick={onInstall} className="p-2 ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Install App" aria-label="Install App">
                        <DownloadIcon className="w-6 h-6" />
                    </button>
                )}
            </Header>
            <main className="p-4">
                <div className="space-y-4">
                    {quizTopicGroups.map((group) => {
                        const isGroupOpen = openItems.has(group.title);
                        return (
                            <div key={group.title} className="bg-white dark:bg-slate-800 rounded-lg shadow-md transition-all duration-300">
                                <button
                                    onClick={() => toggleOpen(group.title)}
                                    className="w-full flex justify-between items-center p-4 text-left"
                                    aria-expanded={isGroupOpen}
                                >
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{group.title}</h2>
                                    <ChevronDownIcon className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${isGroupOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isGroupOpen ? 'max-h-[3000px]' : 'max-h-0'}`}>
                                    <div className="px-4 pb-4 pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2">
                                        {group.subGroups.map(subGroup => {
                                            const subGroupKey = `${group.title}-${subGroup.title}`;
                                            const isSubGroupOpen = openItems.has(subGroupKey);
                                            return (
                                                <div key={subGroupKey} className="border border-slate-200 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-900/50">
                                                    <button
                                                        onClick={() => toggleOpen(subGroupKey)}
                                                        className="w-full flex justify-between items-center p-3 text-left"
                                                        aria-expanded={isSubGroupOpen}
                                                    >
                                                        <h3 className="font-semibold text-slate-700 dark:text-slate-300">{subGroup.title}</h3>
                                                        <ChevronDownIcon className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isSubGroupOpen ? 'rotate-180' : ''}`} />
                                                    </button>
                                                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isSubGroupOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
                                                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-600">
                                                            {subGroup.items.map(item => (
                                                                <button
                                                                    key={item.id}
                                                                    onClick={() => onSelectTopic(item)}
                                                                    className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-left group border border-slate-200 dark:border-slate-700"
                                                                >
                                                                    <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                                                                        {item.type === QuizItemType.BOOK_QUIZ ? 'Quiz' : 'Topic'}
                                                                    </p>
                                                                    <p className="text-md font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">{item.question}</p>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    );
};


const Flashcard: React.FC<{ front: React.ReactNode; back: React.ReactNode; isFlipped: boolean; onFlip: () => void; }> = ({ front, back, isFlipped, onFlip }) => (
  <div
    className="w-full h-full cursor-pointer"
    onClick={onFlip}
    style={{ perspective: '1000px' }}
    role="button"
    aria-label="Flip card"
  >
    <div
      className="relative w-full h-full transition-transform duration-700"
      style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
    >
      <div className="absolute w-full h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
        {front}
      </div>
      <div className="absolute w-full h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 overflow-y-auto" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
        <div className="h-full w-full">{back}</div>
      </div>
    </div>
  </div>
);

const ScriptureList: React.FC<{ scriptures: Scripture[] }> = ({ scriptures }) => (
  <div className="space-y-4">
    {scriptures.map((s, i) => (
      <div key={i}>
        <p className="font-serif text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{s.text}</p>
        <p className="text-right font-sans text-base font-semibold text-sky-600 dark:text-sky-400 mt-1">{s.reference} <span className="font-normal text-slate-500 dark:text-slate-400">(NWT 2013)</span></p>
      </div>
    ))}
  </div>
);

const CenteredScriptureList: React.FC<{ scriptures: Scripture[] }> = ({ scriptures }) => (
  <div className="space-y-4 text-center">
    {scriptures.map((s, i) => (
      <div key={i}>
        <p className="font-serif text-xl text-slate-700 dark:text-slate-300 leading-relaxed">{s.text}</p>
        <p className="font-sans text-lg font-semibold text-sky-600 dark:text-sky-400 mt-2">{s.reference} <span className="text-base font-normal text-slate-500 dark:text-slate-400">(NWT 2013)</span></p>
      </div>
    ))}
  </div>
);


const ScriptureTextOnly: React.FC<{ scriptures: Scripture[] }> = ({ scriptures }) => (
    <div className="space-y-4">
      {scriptures.map((s, i) => (
        <div key={i} className="flex flex-col justify-center items-center h-full text-center">
          <p className="font-serif text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{s.text}</p>
          <p className="text-slate-500 dark:text-slate-400 mt-8 font-sans">What is the reference for this scripture?</p>
        </div>
      ))}
    </div>
);

const GameScreen: React.FC<{ topic: QuizItem; onBack: () => void }> = ({ topic, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [gameItems, setGameItems] = useState<any[]>([]);

  const [quizOptions, setQuizOptions] = useState<QuizOption[] | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<QuizOption | null>(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);

  useEffect(() => {
    let items: any[] = [];
    if (topic.type === QuizItemType.QA) {
      items = (topic as QAItem).answers;
    } else if (topic.type === QuizItemType.PROPHECY) {
      items = (topic as ProphecyItem).pairs;
    } else {
      // For BOOKS and HOW_TO, we can treat the whole thing as one card
      items = [topic];
    }
    setGameItems(items);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsReversed(false);
    setQuizOptions(null);
    setSelectedAnswer(null);
    setIsLoadingQuiz(false);
    setQuizError(null);
  }, [topic]);

  const handleShuffle = useCallback(() => {
    setGameItems(shuffleArray(gameItems));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [gameItems]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % gameItems.length);
      setQuizOptions(null);
      setSelectedAnswer(null);
      setQuizError(null);
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + gameItems.length) % gameItems.length);
      setQuizOptions(null);
      setSelectedAnswer(null);
      setQuizError(null);
    }, 200);
  };
  
  const currentItem = useMemo(() => gameItems[currentIndex], [gameItems, currentIndex]);

  const generateAIQuiz = async () => {
      if (topic.type !== QuizItemType.QA || !currentItem) return;
      
      setIsLoadingQuiz(true);
      setQuizError(null);
      setSelectedAnswer(null);
      
      const qaItem = topic as QAItem;
      const currentScripture = currentItem as Scripture;
      
      const options = await generateQuizOptions(qaItem.question, currentScripture);
      if (options) {
          setQuizOptions(options);
      } else {
          setQuizError("Couldn't generate quiz. The API key might be missing or invalid.");
      }
      setIsLoadingQuiz(false);
  };

  const handleAnswerSelect = (option: QuizOption) => {
      if(selectedAnswer) return;
      setSelectedAnswer(option);
  }

  const renderFront = () => {
    if (isReversed) return renderBackContent();
    return renderFrontContent();
  };
  
  const renderBack = () => {
    if (isReversed) return renderFrontContent();
    return renderBackContent();
  };

  const renderFrontContent = () => {
    switch (topic.type) {
        case QuizItemType.QA:
            const scripture = currentItem as Scripture;
            return (
                <div className="text-center flex flex-col justify-center items-center h-full">
                    <p className="text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-4">Recall the Scripture</p>
                    <p className="text-4xl font-bold font-sans text-slate-800 dark:text-slate-100">{scripture.reference}</p>
                    <p className="text-lg font-semibold text-slate-500 dark:text-slate-400 mt-2">(NWT 2013)</p>
                </div>
            );
        case QuizItemType.PROPHECY:
            const prophecyItem = currentItem as Prophecy;
            return (
                <div>
                    <p className="text-sm font-bold text-center text-sky-600 dark:text-sky-400 mb-4">PROPHECY</p>
                    <ScriptureList scriptures={[prophecyItem.prophecy]} />
                </div>
            );
        case QuizItemType.BOOKS:
        case QuizItemType.HOW_TO:
            return <p className="text-2xl font-bold text-center">{topic.question}</p>;
        default:
            return null;
    }
  };

  const renderBackContent = () => {
    switch (topic.type) {
        case QuizItemType.QA:
            const scripture = currentItem as Scripture;
            if (isReversed) {
                return <ScriptureTextOnly scriptures={[scripture]} />;
            }
            return (
              <div className="flex items-center justify-center h-full">
                <CenteredScriptureList scriptures={[scripture]} />
              </div>
            );
        case QuizItemType.PROPHECY:
            const prophecyItem = currentItem as Prophecy;
            return (
                <div className="text-center flex flex-col justify-center h-full">
                    <p className="text-base font-bold text-green-600 dark:text-green-400 mb-4">FULFILLMENT</p>
                    <CenteredScriptureList scriptures={[prophecyItem.fulfillment]} />
                </div>
            );
        case QuizItemType.BOOKS:
            const booksItem = topic as BooksItem;
            return (
                <div className="space-y-6 text-center">
                    {booksItem.content.map(group => (
                        <div key={group.group}>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{group.group}</h3>
                            {group.categories.map((cat: BookCategory) => (
                                <div key={cat.name} className="mb-4">
                                    <h4 className="font-semibold text-xl text-slate-700 dark:text-slate-300">{cat.name}</h4>
                                    <p className="text-lg text-slate-500 dark:text-slate-400 italic mb-1">{cat.description}</p>
                                    <p className="text-lg text-slate-600 dark:text-slate-300">{cat.books.join(', ')}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            );
        case QuizItemType.HOW_TO:
            const howToItem = topic as HowToItem;
            return (
                <div className="space-y-6 text-center flex flex-col justify-center h-full">
                    {howToItem.points.map(point => (
                        <div key={point.title} className="mb-4">
                            <h4 className="font-semibold text-xl">{point.title}</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">{point.text}</p>
                        </div>
                    ))}
                    <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-700">
                        <CenteredScriptureList scriptures={[howToItem.conclusion]} />
                    </div>
                </div>
            )
        default:
            return null;
    }
  };

  if (!currentItem) {
    return (
      <div className="flex flex-col h-screen">
        <Header onBack={onBack} title={topic.question} />
        <main className="flex-grow p-4 md:p-8 flex items-center justify-center">
          <div className="text-slate-500 dark:text-slate-400">Loading...</div>
        </main>
      </div>
    );
  }

  const hasMultipleCards = gameItems.length > 1;

  return (
    <div className="flex flex-col h-screen">
      <Header onBack={onBack} title={topic.question} />
      <main className="flex-grow p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl h-[450px] mb-6">
          <Flashcard
            front={renderFront()}
            back={renderBack()}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
          />
        </div>

        {quizOptions && (
            <div className="w-full max-w-2xl mt-4 space-y-3">
                <h3 className="text-lg font-semibold text-center mb-2">Which scripture answers the question?</h3>
                {quizOptions.map((option, index) => {
                    const isSelected = selectedAnswer?.reference === option.reference;
                    const getButtonClass = () => {
                        if (!selectedAnswer) return 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700';
                        if (option.isCorrect) return 'bg-green-100 dark:bg-green-900 border-green-500 ring-2 ring-green-500';
                        if (isSelected && !option.isCorrect) return 'bg-red-100 dark:bg-red-900 border-red-500';
                        return 'bg-white dark:bg-slate-800 opacity-60';
                    };
                    return (
                        <button key={index} onClick={() => handleAnswerSelect(option)} disabled={!!selectedAnswer} className={`w-full p-3 text-left rounded-lg border dark:border-slate-700 transition-all ${getButtonClass()}`}>
                            <p className="font-semibold">{option.reference} <span className="font-normal text-slate-500 dark:text-slate-400">(NWT 2013)</span></p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{option.text.substring(0, 100)}...</p>
                        </button>
                    )
                })}
            </div>
        )}
        
        {quizError && <p className="text-red-500 text-center mt-4">{quizError}</p>}
        
        {isLoadingQuiz && <div className="w-full max-w-2xl mt-4 text-center">
            <div className="relative w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent w-full h-full animate-shine"></div>
            </div>
            <p className="mt-2 text-sm text-slate-500">Generating AI Quiz...</p>
        </div>}


        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-6 w-full max-w-2xl">
          {hasMultipleCards ? (
            <>
              <button onClick={handlePrev} className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" aria-label="Previous card">
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <span className="font-mono text-slate-500 dark:text-slate-400 w-20 text-center">{currentIndex + 1} / {gameItems.length}</span>
              <button onClick={handleNext} className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" aria-label="Next card">
                <ArrowRightIcon className="w-6 h-6" />
              </button>
              <button onClick={handleShuffle} className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Shuffle">
                <ShuffleIcon className="w-6 h-6" />
              </button>
            </>
          ) : <div className="h-14"/>}
          
          <button onClick={() => setIsReversed(!isReversed)} className={`p-4 rounded-full shadow-md transition-colors ${isReversed ? 'bg-sky-600 text-white' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'}`} title="Reverse Card">
            <ReverseIcon className="w-6 h-6" />
          </button>

          {topic.type === QuizItemType.QA && hasMultipleCards && process.env.API_KEY && (
             <button onClick={generateAIQuiz} disabled={isLoadingQuiz} className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50" title="Generate AI Quiz">
                <AiIcon className="w-6 h-6" />
            </button>
          )}

        </div>
      </main>
    </div>
  );
};

// --- Book Quiz Screen Component ---

const QuizScreen: React.FC<{ topic: BookQuizItem, onBack: () => void }> = ({ topic, onBack }) => {
  const [questions, setQuestions] = useState<BookQuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    // Fix: Explicitly type 'q' to resolve type inference issues.
    const shuffledQuestions = shuffleArray(topic.quiz).map((q: BookQuizQuestion) => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(shuffledQuestions);
  }, [topic]);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    // Fix: Explicitly type 'q' to resolve type inference issues.
    const shuffledQuestions = shuffleArray(topic.quiz).map((q: BookQuizQuestion) => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col h-screen">
        <Header onBack={onBack} title={topic.question} />
        <main className="flex-grow p-4 md:p-8 flex items-center justify-center">
          <div className="text-slate-500 dark:text-slate-400">Loading Quiz...</div>
        </main>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="flex flex-col h-screen">
        <Header onBack={onBack} title="Quiz Results" />
        <main className="flex-grow p-4 md:p-8 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-4xl font-bold mb-8">
            Your score: <span className="text-sky-600 dark:text-sky-400">{score} / {questions.length}</span>
          </p>
          <div className="flex space-x-4">
            <button onClick={handleRestart} className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors">
              Try Again
            </button>
            <button onClick={onBack} className="px-6 py-3 bg-white dark:bg-slate-800 font-semibold rounded-lg shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              Back to Topics
            </button>
          </div>
        </main>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col h-screen">
      <Header onBack={onBack} title={topic.question} />
      <main className="flex-grow p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg mb-8 min-h-[120px] flex items-center justify-center">
            <p className="text-xl font-semibold text-center">{currentQuestion.questionText}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map(option => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              const getButtonClass = () => {
                if (!selectedAnswer) return 'bg-white dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700';
                if (isCorrect) return 'bg-green-100 dark:bg-green-900 border-green-500 ring-2 ring-green-500 text-green-800 dark:text-green-200';
                if (isSelected && !isCorrect) return 'bg-red-100 dark:bg-red-900 border-red-500 ring-2 ring-red-500 text-red-800 dark:text-red-200';
                return 'bg-white dark:bg-slate-800 opacity-60';
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={!!selectedAnswer}
                  className={`p-4 rounded-lg border dark:border-slate-700 text-center font-semibold transition-all duration-300 transform hover:scale-105 ${getButtonClass()}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {selectedAnswer && (
              <div className="text-center mt-8">
              <button onClick={handleNextQuestion} className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors">
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
              </div>
          )}
        </div>
      </main>
    </div>
  );
};


// --- Main App Component ---

export default function App() {
  const [activeTopic, setActiveTopic] = useState<QuizItem | null>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const { showUpdateNotification, handleUpdate } = useServiceWorkerUpdater();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) {
      return;
    }
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setInstallPrompt(null);
    });
  };
  
  const renderPage = () => {
    if (activeTopic) {
        if (activeTopic.type === QuizItemType.BOOK_QUIZ) {
            return <QuizScreen topic={activeTopic as BookQuizItem} onBack={() => setActiveTopic(null)} />;
        }
        return <GameScreen topic={activeTopic} onBack={() => setActiveTopic(null)} />;
    }
    return <HomeScreen onSelectTopic={setActiveTopic} onInstall={handleInstallClick} canInstall={!!installPrompt} />;
  }

  return (
    <>
      {renderPage()}
      {showUpdateNotification && (
          <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
              <div className="bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 rounded-lg shadow-xl p-4 flex items-center space-x-4">
                  <p className="font-medium">A new version is available!</p>
                  <button 
                      onClick={handleUpdate}
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 dark:focus:ring-offset-slate-200 focus:ring-sky-500"
                  >
                      Reload
                  </button>
              </div>
          </div>
      )}
    </>
  );
}