// src/components/QuizContainer.tsx
import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import QuizHeader from './QuizHeader';
import MultipleChoice from './MultipleChoice';
import DragAndDrop from './DragAndDrop';
import { MultipleChoiceQuestion, DragAndDropQuestion } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const QuizContainer: React.FC = () => {
  const {
    currentQuestion,
    totalPoints,
    goalPoints,
    showFeedback,
    isCorrect,
    canContinue,
    isLastQuestion,
    dispatch,
  } = useQuiz();
  
  const handleAnswer = (questionId: string, answer: any) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { questionId, answer } });
  };
  
  const handleNextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };
  
  const handleTryAgain = () => {
    dispatch({ type: 'HIDE_FEEDBACK' });
  };
  
  const handleResetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };
  
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <MultipleChoice
            question={currentQuestion as MultipleChoiceQuestion}
            onAnswer={handleAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            onTryAgain={handleTryAgain}
          />
        );
      case 'drag-and-drop':
        return (
          <DragAndDrop
            question={currentQuestion as DragAndDropQuestion}
            onAnswer={handleAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            onTryAgain={handleTryAgain}
          />
        );
      default:
        return <div>Unsupported question type</div>;
    }
  };
  
  const renderQuizComplete = () => {
    const isSuccess = totalPoints >= goalPoints;
    
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">
          {isSuccess ? 'Congratulations!' : 'Quiz Completed'}
        </h2>
        
        <p className="text-lg mb-6">
          You scored {totalPoints} out of {goalPoints} points.
        </p>
        
        {isSuccess ? (
          <div className="mb-8">
            <svg
              className="w-16 h-16 mx-auto text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <p className="text-gray-600 mb-8">
            You needed {goalPoints} points to pass. Would you like to try again?
          </p>
        )}
        
        <button
          onClick={handleResetQuiz}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {isSuccess ? 'Play Again' : 'Try Again'}
        </button>
      </div>
    );
  };
  
  if (!currentQuestion) {
    return renderQuizComplete();
  }
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <QuizHeader
        title={`Question ${currentQuestion.id.slice(1)}`}
        currentPoints={totalPoints}
        goalPoints={goalPoints}
        onBack={handleResetQuiz}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderQuestion()}
        </motion.div>
      </AnimatePresence>
      
      {canContinue && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex justify-end"
        >
          <button
            onClick={handleNextQuestion}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <span>{isLastQuestion ? 'Finish' : 'Continue'}</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default QuizContainer;