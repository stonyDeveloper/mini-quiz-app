// src/components/FeedbackMessage.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface FeedbackMessageProps {
  isCorrect: boolean;
  message: string;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ isCorrect, message }) => {
  const bgColor = isCorrect ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isCorrect ? 'border-green-200' : 'border-red-200';
  const textColor = isCorrect ? 'text-green-800' : 'text-red-800';
  const icon = isCorrect ? (
    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 p-4 rounded-lg border ${bgColor} ${borderColor}`}
    >
      <div className="flex">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${textColor}`}>
            {isCorrect ? 'Correct!' : 'Think again!'}
          </h3>
          <div className={`mt-2 text-sm ${textColor}`}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackMessage;