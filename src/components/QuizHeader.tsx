// src/components/QuizHeader.tsx
import React from 'react';

interface QuizHeaderProps {
  title: string;
  currentPoints: number;
  goalPoints: number;
  onBack?: () => void;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  title,
  currentPoints,
  goalPoints,
  onBack,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        {onBack && (
          <button
            onClick={onBack}
            className="mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-lg font-medium text-gray-900">{title}</h1>
      </div>
      
      <div className="bg-purple-700 rounded-lg p-4 text-white flex justify-between items-center">
        <div>
          <p className="font-medium">Goal: {goalPoints} points</p>
        </div>
        <div>
          <p className="font-medium">Current Points: {currentPoints}</p>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;