// src/hooks/useQuiz.ts
import { useReducer } from 'react';
import { QuizState, QuizAction, Question, MultipleChoiceQuestion, DragAndDropQuestion } from '../types';
import { questions, GOAL_POINTS } from '../data/questions';

const initialState: QuizState = {
  currentQuestionIndex: 0,
  totalPoints: 0,
  goalPoints: GOAL_POINTS,
  questions,
  userAnswers: {},
  showFeedback: false,
  isCorrect: null,
  canContinue: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        showFeedback: false,
        isCorrect: null,
        canContinue: false,
      };
      
    case 'ANSWER_QUESTION': {
      const { questionId, answer } = action.payload;
      const currentQuestion = state.questions[state.currentQuestionIndex];
      let isCorrect = false;
      
      // Check if answer is correct based on question type
      if (currentQuestion.type === 'multiple-choice') {
        const mcQuestion = currentQuestion as MultipleChoiceQuestion;
        const selectedOption = mcQuestion.options.find(opt => opt.id === answer);
        isCorrect = selectedOption?.isCorrect || false;
      } else if (currentQuestion.type === 'drag-and-drop') {
        const ddQuestion = currentQuestion as DragAndDropQuestion;
        // For drag and drop, answer is an object mapping item ids to definition ids
        isCorrect = Object.entries(answer).every(([itemId, defId]) => {
          const item = ddQuestion.items.find(i => i.id === itemId);
          return item?.matchesTo === defId;
        });
      }
      
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [questionId]: answer,
        },
        totalPoints: isCorrect ? state.totalPoints + currentQuestion.points : state.totalPoints,
        showFeedback: true,
        isCorrect,
        canContinue: isCorrect,
      };
    }
      
    case 'SHOW_FEEDBACK':
      return {
        ...state,
        showFeedback: true,
        isCorrect: action.payload.isCorrect,
        canContinue: action.payload.isCorrect,
      };
      
    case 'RESET_QUIZ':
      return initialState;
      
    default:
      return state;
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
  
  return {
    ...state,
    currentQuestion,
    isLastQuestion,
    dispatch,
  };
}