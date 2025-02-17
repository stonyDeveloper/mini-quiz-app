// src/components/MultipleChoice.tsx
import React, { useState } from 'react';
import { MultipleChoiceQuestion } from '../types';
import FeedbackMessage from './FeedbackMessage';
import { motion } from 'framer-motion';

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  onAnswer: (questionId: string, answerId: string) => void;
  showFeedback: boolean;
  isCorrect: boolean | null;
  onTryAgain: () => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  onAnswer,
  showFeedback,
  isCorrect,
  onTryAgain,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const handleOptionSelect = (optionId: string) => {
    if (showFeedback && isCorrect) return; // Prevent changing after correct feedback
    setSelectedOption(optionId);
    onAnswer(question.id, optionId);
  };
  
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">{question.text}</h2>
      
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOption === option.id;
          let optionClassName = "block w-full text-left p-4 border rounded-lg transition-colors";
          
          if (showFeedback && isCorrect) {
            if (option.isCorrect) {
              optionClassName += " bg-green-100 border-green-300";
            } else {
              optionClassName += " bg-gray-50 border-gray-200";
            }
          } else if (showFeedback && !isCorrect && isSelected) {
            optionClassName += " bg-red-100 border-red-300";
          } else if (isSelected) {
            optionClassName += " bg-purple-100 border-purple-300";
          } else {
            optionClassName += " bg-white border-gray-200 hover:bg-gray-50";
          }
          
          return (
            <button
              key={option.id}
              className={optionClassName}
              onClick={() => handleOptionSelect(option.id)}
              disabled={showFeedback && isCorrect}
            >
              <div className="flex items-start">
                <span className="font-medium mr-2">{option.id.toUpperCase()}.</span>
                <span>{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>
      
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeedbackMessage
            isCorrect={isCorrect || false}
            message={isCorrect ? question.feedback.correct : question.feedback.incorrect}
          />
          
          {!isCorrect && (
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                onClick={onTryAgain}
              >
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MultipleChoice;