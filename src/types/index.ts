// src/types/index.ts

export type QuestionType = 'multiple-choice' | 'drag-and-drop';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  points: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export interface DragAndDropQuestion extends BaseQuestion {
  type: 'drag-and-drop';
  items: Array<{
    id: string;
    text: string;
    matchesTo: string;
  }>;
  definitions: Array<{
    id: string;
    text: string;
  }>;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export type Question = MultipleChoiceQuestion | DragAndDropQuestion;

export interface QuizState {
  currentQuestionIndex: number;
  totalPoints: number;
  goalPoints: number;
  questions: Question[];
  userAnswers: Record<string, any>;
  showFeedback: boolean;
  isCorrect: boolean | null;
  canContinue: boolean;
}

export type QuizAction =
  | { type: 'NEXT_QUESTION' }
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; answer: any } }
  | { type: 'SHOW_FEEDBACK'; payload: { isCorrect: boolean } }
  | { type: 'RESET_QUIZ' };