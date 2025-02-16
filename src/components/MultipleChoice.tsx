// src/components/MultipleChoice.tsx
import React, { useState } from 'react';
import { MultipleChoiceQuestion } from '../types';
import FeedbackMessage from './FeedbackMessage';

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  onAnswer: (questionId: string, answerId: string) => void;
  showFeedback: boolean;
  isCorrect: boolean | null;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  onAnswer,
  showFeedback,
  isCorrect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return; // Prevent changing after feedback is shown
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
          
          if (showFeedback) {
            if (option.isCorrect) {
              optionClassName += " bg-green-100 border-green-300";
            } else if (isSelected && !option.isCorrect) {
              optionClassName += " bg-red-100 border-red-300";
            } else {
              optionClassName += " bg-gray-50 border-gray-200";
            }
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
              disabled={showFeedback}
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
        <FeedbackMessage
          isCorrect={isCorrect || false}
          message={isCorrect ? question.feedback.correct : question.feedback.incorrect}
        />
      )}
    </div>
  );
};

export default MultipleChoice;