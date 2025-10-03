
export interface Scripture {
  reference: string;
  text: string;
}

export interface Prophecy {
  prophecy: Scripture;
  fulfillment: Scripture;
}

export interface BookCategory {
  name: string;
  description: string;
  books: string[];
}

export interface BibleBook {
  group: string;
  categories: BookCategory[];
}

export enum QuizItemType {
  QA = 'QA',
  PROPHECY = 'PROPHECY',
  BOOKS = 'BOOKS',
  HOW_TO = 'HOW_TO',
  BOOK_QUIZ = 'BOOK_QUIZ',
}

export interface BaseQuizItem {
  id: number;
  question: string;
}

export interface QAItem extends BaseQuizItem {
  type: QuizItemType.QA;
  answers: Scripture[];
}

export interface ProphecyItem extends BaseQuizItem {
  type: QuizItemType.PROPHECY;
  pairs: Prophecy[];
}

export interface BooksItem extends BaseQuizItem {
  type: QuizItemType.BOOKS;
  content: BibleBook[];
}

export interface HowToItem extends BaseQuizItem {
  type: QuizItemType.HOW_TO;
  points: { title: string; text: string }[];
  conclusion: Scripture;
}

export interface BookQuizQuestion {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface BookQuizItem extends BaseQuizItem {
  type: QuizItemType.BOOK_QUIZ;
  quiz: BookQuizQuestion[];
}

export type QuizItem = QAItem | ProphecyItem | BooksItem | HowToItem | BookQuizItem;

export interface QuizSubTopicGroup {
  title: string;
  items: QuizItem[];
}

export interface QuizTopicGroup {
  title: string;
  subGroups: QuizSubTopicGroup[];
}