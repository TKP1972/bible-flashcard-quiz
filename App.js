import React from 'react';
import { quizTopicGroups } from './data.js';
import { QuizItemType } from './types.js';
import { generateQuizOptions } from './services/geminiService.js';

const { useState, useEffect, useMemo, useCallback } = React;

// --- Helper Functions & Constants ---
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const hasApiKey = typeof process !== 'undefined' && process.env && process.env.API_KEY;

// --- Custom Hook for Service Worker Updates ---
const useServiceWorkerUpdater = () => {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });

    const checkForUpdate = (registration) => {
      if (registration.waiting) {
        setWaitingWorker(registration.waiting);
        setShowUpdateNotification(true);
      }
    };
    
    navigator.serviceWorker.ready.then(registration => {
      checkForUpdate(registration);
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              checkForUpdate(registration);
            }
          });
        }
      });
    });
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdateNotification(false);
    }
  };

  return { showUpdateNotification, handleUpdate };
};

// --- Icon Components ---
const e = React.createElement;

const ArrowLeftIcon = ({ className }) => e('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className }, e('path', { d: "M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" }));
const ArrowRightIcon = ({ className }) => e('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className }, e('path', { d: "M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" }));
const ShuffleIcon = ({ className }) => e('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className }, e('path', { d: "M18 20.25V19.05C18 16.65 16.35 15.675 14.55 15.675H13.5V14.175H14.55C15.9 14.175 16.5 13.575 16.5 12.75C16.5 11.925 15.9 11.325 14.55 11.325H13.125L14.625 12.825L13.575 13.875L10.95 11.25L13.575 8.625L14.625 9.675L13.125 11.175H14.55C16.95 11.175 18 10.125 18 8.7V7.5H19.5V8.7C19.5 10.575 17.925 11.85 16.05 12.375V12.75C17.925 13.275 19.5 14.55 19.5 16.5V19.05C19.5 20.85 17.85 21.75 16.05 21.75H8.25V20.25H16.05C17.4 20.25 18 19.65 18 18.825V20.25ZM4.5 3.75H6V5.25H4.5V3.75ZM6 18.75V21.75H4.5V18.75H6ZM6 6.75V17.25H4.5V6.75H6Z" }));
const ReverseIcon = ({ className }) => e('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className }, e('path', { d: "M18 22.5H6C5.175 22.5 4.5 21.825 4.5 21V3C4.5 2.175 5.175 1.5 6 1.5H18C18.825 1.5 19.5 2.175 19.5 3V21C19.5 21.825 18.825 22.5 18 22.5ZM13.05 8.4V5.25L9 9.3L13.05 13.35V10.2H15V8.4H13.05Z" }));
const BackIcon = ({ className }) => e('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className }, e('path', { d: "M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" }));
const AiIcon = ({ className }) => e('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className }, e('path', { d: "M12 2C11.45 2 11 2.45 11 3V4.05C7.4 4.56 4.56 7.4 4.05 11H3C2.45 11 2 11.45 2 12C2 12.55 2.45 13 3 13H4.05C4.56 16.6 7.4 19.44 11 19.95V21C11 21.55 11.45 22 12 22C12.55 22 13 21.55 13 21V19.95C16.6 19.44 19.44 16.6 19.95 13H21C21.55 13 22 12.55 22 12C22 11.45 21.55 11 21 11H19.95C19.44 7.4 16.6 4.56 13 4.05V3C13 2.45 12.55 2 12 2ZM12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6Z" }));
const DownloadIcon = ({ className }) => e('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className }, e('path', { d: "M13 10H18L12 16L6 10H11V3H13V10ZM4 18H20V20H4V18Z" }));
const ChevronDownIcon = ({ className }) => e('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className }, e('path', { d: "M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z" }));

// --- Error Boundary ---
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error("Caught by Error Boundary:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return e('div', { className: "flex flex-col h-screen items-center justify-center p-8 text-center bg-slate-100 dark:bg-slate-900" },
                e('h1', { className: "text-4xl font-bold text-sky-600 dark:text-sky-400 mb-4" }, "Oops!"),
                e('p', { className: "text-xl text-slate-700 dark:text-slate-300 mb-8" }, "Something went wrong while loading this part of the app."),
                e('div', { className: "flex space-x-4" },
                    e('button', { onClick: () => window.location.reload(), className: "px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors" }, "Refresh Page"),
                    e('button', { onClick: () => window.location.href = '/', className: "px-6 py-3 bg-white dark:bg-slate-800 font-semibold rounded-lg shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" }, "Go Home")
                ),
                e('p', { className: "text-sm text-slate-500 dark:text-slate-400 mt-8" }, "If the problem persists, please check the console for more details.")
            );
        }
        return this.props.children;
    }
}

// --- UI Components ---
const Header = ({ onBack, title, children }) => e('header', { className: "p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm sticky top-0 z-20 flex items-center shadow-sm" },
    onBack && e('button', { onClick: onBack, className: "p-2 mr-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors", 'aria-label': "Go back" },
        e(BackIcon, { className: "w-6 h-6" })
    ),
    e('h1', { className: "flex-grow text-xl font-bold text-slate-900 dark:text-white truncate" }, title),
    children
);

const HomeScreen = ({ onSelectTopic, onInstall, canInstall }) => {
    const [openItems, setOpenItems] = useState(new Set());

    const toggleOpen = (key) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(key)) newSet.delete(key);
            else newSet.add(key);
            return newSet;
        });
    };

    return e('div', null,
        e(Header, { title: "Bible Flashcard Quiz" },
            canInstall && e('button', { onClick: onInstall, className: "p-2 ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors", title: "Install App", 'aria-label': "Install App" },
                e(DownloadIcon, { className: "w-6 h-6" })
            )
        ),
        e('main', { className: "p-4" },
            e('div', { className: "space-y-4" },
                quizTopicGroups.map(group => {
                    const isGroupOpen = openItems.has(group.title);
                    return e('div', { key: group.title, className: "bg-white dark:bg-slate-800 rounded-lg shadow-md transition-all duration-300" },
                        e('button', { onClick: () => toggleOpen(group.title), className: "w-full flex justify-between items-center p-4 text-left", 'aria-expanded': isGroupOpen },
                            e('h2', { className: "text-xl font-bold text-slate-800 dark:text-slate-100" }, group.title),
                            e(ChevronDownIcon, { className: `w-6 h-6 text-slate-500 transition-transform duration-300 ${isGroupOpen ? 'rotate-180' : ''}` })
                        ),
                        e('div', { className: `transition-all duration-500 ease-in-out overflow-hidden ${isGroupOpen ? 'max-h-[3000px]' : 'max-h-0'}` },
                            e('div', { className: "px-4 pb-4 pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2" },
                                group.subGroups.map(subGroup => {
                                    const subGroupKey = `${group.title}-${subGroup.title}`;
                                    const isSubGroupOpen = openItems.has(subGroupKey);
                                    return e('div', { key: subGroupKey, className: "border border-slate-200 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-900/50" },
                                        e('button', { onClick: () => toggleOpen(subGroupKey), className: "w-full flex justify-between items-center p-3 text-left", 'aria-expanded': isSubGroupOpen },
                                            e('h3', { className: "font-semibold text-slate-700 dark:text-slate-300" }, subGroup.title),
                                            e(ChevronDownIcon, { className: `w-5 h-5 text-slate-400 transition-transform duration-300 ${isSubGroupOpen ? 'rotate-180' : ''}` })
                                        ),
                                        e('div', { className: `transition-all duration-500 ease-in-out overflow-hidden ${isSubGroupOpen ? 'max-h-[2000px]' : 'max-h-0'}` },
                                            e('div', { className: "p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-600" },
                                                subGroup.items.map(item => e('button', { key: item.id, onClick: () => onSelectTopic(item), className: "p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-left group border border-slate-200 dark:border-slate-700" },
                                                    e('p', { className: "text-sm font-semibold text-sky-600 dark:text-sky-400" }, item.type === QuizItemType.BOOK_QUIZ ? 'Quiz' : 'Topic'),
                                                    e('p', { className: "text-md font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors" }, item.question)
                                                ))
                                            )
                                        )
                                    );
                                })
                            )
                        )
                    );
                })
            )
        )
    );
};

const Flashcard = ({ front, back, isFlipped, onFlip }) => e('div', { className: "w-full h-full cursor-pointer", onClick: onFlip, style: { perspective: '1000px' }, role: "button", 'aria-label': "Flip card" },
    e('div', { className: "relative w-full h-full transition-transform duration-700", style: { transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'none' } },
        e('div', { className: "absolute w-full h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex items-center justify-center", style: { backfaceVisibility: 'hidden' } }, front),
        e('div', { className: "absolute w-full h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 overflow-y-auto", style: { backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' } },
            e('div', { className: "h-full w-full" }, back)
        )
    )
);

const ScriptureList = ({ scriptures }) => e('div', { className: "space-y-4" },
    scriptures.map((s, i) => e('div', { key: i },
        e('p', { className: "font-serif text-lg text-slate-700 dark:text-slate-300 leading-relaxed" }, s.text),
        e('p', { className: "text-right font-sans text-base font-semibold text-sky-600 dark:text-sky-400 mt-1" }, s.reference, e('span', { className: "font-normal text-slate-500 dark:text-slate-400" }, " (NWT 2013)"))
    ))
);

const CenteredScriptureList = ({ scriptures }) => e('div', { className: "space-y-4 text-center" },
    scriptures.map((s, i) => e('div', { key: i },
        e('p', { className: "font-serif text-xl text-slate-700 dark:text-slate-300 leading-relaxed" }, s.text),
        e('p', { className: "font-sans text-lg font-semibold text-sky-600 dark:text-sky-400 mt-2" }, s.reference, e('span', { className: "text-base font-normal text-slate-500 dark:text-slate-400" }, " (NWT 2013)"))
    ))
);

const ScriptureTextOnly = ({ scriptures }) => e('div', { className: "space-y-4" },
    scriptures.map((s, i) => e('div', { key: i, className: "flex flex-col justify-center items-center h-full text-center" },
        e('p', { className: "font-serif text-slate-700 dark:text-slate-300 leading-relaxed text-lg" }, s.text),
        e('p', { className: "text-slate-500 dark:text-slate-400 mt-8 font-sans" }, "What is the reference for this scripture?")
    ))
);

const GameScreen = ({ topic, onBack }) => {
    // ... (State and logic remains the same)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [gameItems, setGameItems] = useState([]);
  const [quizOptions, setQuizOptions] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [quizError, setQuizError] = useState(null);

    useEffect(() => {
        let items = [];
        if (topic.type === QuizItemType.QA) items = topic.answers;
        else if (topic.type === QuizItemType.PROPHECY) items = topic.pairs;
        else items = [topic];
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
        const options = await generateQuizOptions(topic.question, currentItem);
        if (options) {
            setQuizOptions(options);
        } else {
            setQuizError("Couldn't generate quiz. The API key might be missing or invalid.");
        }
        setIsLoadingQuiz(false);
    };

    const handleAnswerSelect = (option) => {
        if (selectedAnswer) return;
        setSelectedAnswer(option);
    };

    const renderFrontContent = () => {
        switch (topic.type) {
            case QuizItemType.QA:
                if (!currentItem) return null;
                return e('div', { className: "text-center flex flex-col justify-center items-center h-full" },
                    e('p', { className: "text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-4" }, "Recall the Scripture"),
                    e('p', { className: "text-4xl font-bold font-sans text-slate-800 dark:text-slate-100" }, currentItem.reference),
                    e('p', { className: "text-lg font-semibold text-slate-500 dark:text-slate-400 mt-2" }, "(NWT 2013)")
                );
            case QuizItemType.PROPHECY:
                if (!currentItem) return null;
                return e('div', null,
                    e('p', { className: "text-sm font-bold text-center text-sky-600 dark:text-sky-400 mb-4" }, "PROPHECY"),
                    e(ScriptureList, { scriptures: [currentItem.prophecy] })
                );
            case QuizItemType.BOOKS:
            case QuizItemType.HOW_TO:
                return e('p', { className: "text-2xl font-bold text-center" }, topic.question);
            default: return null;
        }
    };
    
    const renderBackContent = () => {
        switch (topic.type) {
            case QuizItemType.QA:
                if (!currentItem) return null;
                if (isReversed) return e(ScriptureTextOnly, { scriptures: [currentItem] });
                return e('div', { className: "flex items-center justify-center h-full" }, e(CenteredScriptureList, { scriptures: [currentItem] }));
            case QuizItemType.PROPHECY:
                 if (!currentItem) return null;
                return e('div', { className: "text-center flex flex-col justify-center h-full" },
                    e('p', { className: "text-base font-bold text-green-600 dark:text-green-400 mb-4" }, "FULFILLMENT"),
                    e(CenteredScriptureList, { scriptures: [currentItem.fulfillment] })
                );
            case QuizItemType.BOOKS:
                return e('div', { className: "space-y-6 text-center" },
                    topic.content.map(group => e('div', { key: group.group },
                        e('h3', { className: "text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2" }, group.group),
                        group.categories.map(cat => e('div', { key: cat.name, className: "mb-4" },
                            e('h4', { className: "font-semibold text-xl text-slate-700 dark:text-slate-300" }, cat.name),
                            e('p', { className: "text-lg text-slate-500 dark:text-slate-400 italic mb-1" }, cat.description),
                            e('p', { className: "text-lg text-slate-600 dark:text-slate-300" }, cat.books.join(', '))
                        ))
                    ))
                );
            case QuizItemType.HOW_TO:
                return e('div', { className: "space-y-6 text-center flex flex-col justify-center h-full" },
                    topic.points.map(point => e('div', { key: point.title, className: "mb-4" },
                        e('h4', { className: "font-semibold text-xl" }, point.title),
                        e('p', { className: "text-slate-600 dark:text-slate-400 text-lg" }, point.text)
                    )),
                    e('div', { className: "pt-6 mt-6 border-t border-slate-200 dark:border-slate-700" },
                        e(CenteredScriptureList, { scriptures: [topic.conclusion] })
                    )
                );
            default: return null;
        }
    };
    
    const renderFront = () => isReversed ? renderBackContent() : renderFrontContent();
    const renderBack = () => isReversed ? renderFrontContent() : renderBackContent();

    if (!currentItem) {
        return e('div', { className: "flex flex-col h-screen" },
            e(Header, { onBack, title: topic.question }),
            e('main', { className: "flex-grow p-4 md:p-8 flex items-center justify-center" },
                e('div', { className: "text-slate-500 dark:text-slate-400" }, "Loading...")
            )
        );
    }
    
    const hasMultipleCards = gameItems.length > 1;

    return e('div', { className: "flex flex-col h-screen" },
        e(Header, { onBack, title: topic.question }),
        e('main', { className: "flex-grow p-4 md:p-8 flex flex-col items-center justify-center" },
            e('div', { className: "w-full max-w-2xl h-[450px] mb-6" },
                e(Flashcard, { front: renderFront(), back: renderBack(), isFlipped, onFlip: () => setIsFlipped(!isFlipped) })
            ),
            
            quizOptions && e('div', { className: "w-full max-w-2xl mt-4 space-y-3" },
                e('h3', { className: "text-lg font-semibold text-center mb-2" }, "Which scripture answers the question?"),
                quizOptions.map((option, index) => {
                    const isSelected = selectedAnswer?.reference === option.reference;
                    const getButtonClass = () => {
                        if (!selectedAnswer) return 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700';
                        if (option.isCorrect) return 'bg-green-100 dark:bg-green-900 border-green-500 ring-2 ring-green-500';
                        if (isSelected && !option.isCorrect) return 'bg-red-100 dark:bg-red-900 border-red-500';
                        return 'bg-white dark:bg-slate-800 opacity-60';
                    };
                    return e('button', { key: index, onClick: () => handleAnswerSelect(option), disabled: !!selectedAnswer, className: `w-full p-3 text-left rounded-lg border dark:border-slate-700 transition-all ${getButtonClass()}` },
                        e('p', { className: "font-semibold" }, option.reference, e('span', { className: "font-normal text-slate-500 dark:text-slate-400" }, " (NWT 2013)")),
                        e('p', { className: "text-sm text-slate-600 dark:text-slate-400" }, `${option.text.substring(0, 100)}...`)
                    );
                })
            ),
            
            quizError && e('p', { className: "text-red-500 text-center mt-4" }, quizError),
            
            isLoadingQuiz && e('div', { className: "w-full max-w-2xl mt-4 text-center" },
                e('div', { className: "relative w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden" },
                    e('div', { className: "absolute inset-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent w-full h-full animate-shine" })
                ),
                e('p', { className: "mt-2 text-sm text-slate-500" }, "Generating AI Quiz...")
            ),

            e('div', { className: "flex items-center justify-center space-x-2 sm:space-x-4 mt-6 w-full max-w-2xl" },
                hasMultipleCards ? e(React.Fragment, null,
                    e('button', { onClick: handlePrev, className: "p-4 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors", 'aria-label': "Previous card" }, e(ArrowLeftIcon, { className: "w-6 h-6" })),
                    e('span', { className: "font-mono text-slate-500 dark:text-slate-400 w-20 text-center" }, `${currentIndex + 1} / ${gameItems.length}`),
                    e('button', { onClick: handleNext, className: "p-4 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors", 'aria-label': "Next card" }, e(ArrowRightIcon, { className: "w-6 h-6" })),
                    e('button', { onClick: handleShuffle, className: "p-4 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors", title: "Shuffle" }, e(ShuffleIcon, { className: "w-6 h-6" }))
                ) : e('div', { className: 'h-14' }),

                e('button', { onClick: () => setIsReversed(!isReversed), className: `p-4 rounded-full shadow-md transition-colors ${isReversed ? 'bg-sky-600 text-white' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'}`, title: "Reverse Card" }, e(ReverseIcon, { className: "w-6 h-6" })),

                topic.type === QuizItemType.QA && hasMultipleCards && hasApiKey && e('button', { onClick: generateAIQuiz, disabled: isLoadingQuiz, className: "p-4 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50", title: "Generate AI Quiz" }, e(AiIcon, { className: "w-6 h-6" }))
            )
        )
    );
};

// --- Book Quiz Screen Component ---
const QuizScreen = ({ topic, onBack }) => {
    // ... (State and logic remains the same)
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(topic.quiz).map(q => ({ ...q, options: shuffleArray(q.options) }));
    setQuestions(shuffledQuestions);
  }, [topic]);

  const handleAnswerSelect = (answer) => {
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
    const shuffledQuestions = shuffleArray(topic.quiz).map(q => ({ ...q, options: shuffleArray(q.options) }));
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  if (questions.length === 0) {
    return e('div', { className: "flex flex-col h-screen" },
      e(Header, { onBack, title: topic.question }),
      e('main', { className: "flex-grow p-4 md:p-8 flex items-center justify-center" },
        e('div', { className: "text-slate-500 dark:text-slate-400" }, "Loading Quiz...")
      )
    );
  }

  if (quizFinished) {
    return e('div', { className: "flex flex-col h-screen" },
      e(Header, { onBack, title: "Quiz Results" }),
      e('main', { className: "flex-grow p-4 md:p-8 flex flex-col items-center justify-center text-center" },
        e('h2', { className: "text-2xl font-bold mb-4" }, "Quiz Complete!"),
        e('p', { className: "text-4xl font-bold mb-8" }, "Your score: ", e('span', { className: "text-sky-600 dark:text-sky-400" }, `${score} / ${questions.length}`)),
        e('div', { className: "flex space-x-4" },
          e('button', { onClick: handleRestart, className: "px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors" }, "Try Again"),
          e('button', { onClick: onBack, className: "px-6 py-3 bg-white dark:bg-slate-800 font-semibold rounded-lg shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" }, "Back to Topics")
        )
      )
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return e('div', { className: "flex flex-col h-screen" },
    e(Header, { onBack, title: topic.question }),
    e('main', { className: "flex-grow p-4 md:p-8 flex flex-col items-center justify-center" },
      e('div', { className: "w-full max-w-2xl" },
        e('div', { className: "text-center mb-4" },
          e('p', { className: "text-sm font-semibold text-slate-500 dark:text-slate-400" }, `Question ${currentQuestionIndex + 1} of ${questions.length}`)
        ),
        e('div', { className: "bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg mb-8 min-h-[120px] flex items-center justify-center" },
          e('p', { className: "text-xl font-semibold text-center" }, currentQuestion.questionText)
        ),
        e('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
          currentQuestion.options.map(option => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            const getButtonClass = () => {
              if (!selectedAnswer) return 'bg-white dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700';
              if (isCorrect) return 'bg-green-100 dark:bg-green-900 border-green-500 ring-2 ring-green-500 text-green-800 dark:text-green-200';
              if (isSelected && !isCorrect) return 'bg-red-100 dark:bg-red-900 border-red-500 ring-2 ring-red-500 text-red-800 dark:text-red-200';
              return 'bg-white dark:bg-slate-800 opacity-60';
            };
            return e('button', { key: option, onClick: () => handleAnswerSelect(option), disabled: !!selectedAnswer, className: `p-4 rounded-lg border dark:border-slate-700 text-center font-semibold transition-all duration-300 transform hover:scale-105 ${getButtonClass()}` }, option);
          })
        ),
        selectedAnswer && e('div', { className: "text-center mt-8" },
          e('button', { onClick: handleNextQuestion, className: "px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors" },
            currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'
          )
        )
      )
    )
  );
};

// --- Main App Component ---
export default function App() {
  const [activeTopic, setActiveTopic] = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);
  const { showUpdateNotification, handleUpdate } = useServiceWorkerUpdater();

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') console.log('User accepted the install prompt');
      else console.log('User dismissed the install prompt');
      setInstallPrompt(null);
    });
  };

  const renderPage = () => {
    if (activeTopic) {
      if (activeTopic.type === QuizItemType.BOOK_QUIZ) {
        return e(QuizScreen, { topic: activeTopic, onBack: () => setActiveTopic(null) });
      }
      return e(GameScreen, { topic: activeTopic, onBack: () => setActiveTopic(null) });
    }
    return e(HomeScreen, { onSelectTopic: setActiveTopic, onInstall: handleInstallClick, canInstall: !!installPrompt });
  };

  return e(ErrorBoundary, null,
    renderPage(),
    showUpdateNotification && e('div', { className: "fixed bottom-4 right-4 z-50 animate-fade-in-up" },
      e('div', { className: "bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 rounded-lg shadow-xl p-4 flex items-center space-x-4" },
        e('p', { className: "font-medium" }, "A new version is available!"),
        e('button', { onClick: handleUpdate, className: "px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 dark:focus:ring-offset-slate-200 focus:ring-sky-500" }, "Reload")
      )
    )
  );
}