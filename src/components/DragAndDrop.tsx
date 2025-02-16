// src/components/DragAndDrop.tsx
import React, { useState, useRef } from 'react';
import { DragAndDropQuestion } from '../types';
import { motion } from 'framer-motion';
import FeedbackMessage from './FeedbackMessage';

interface DragAndDropProps {
  question: DragAndDropQuestion;
  onAnswer: (questionId: string, answer: Record<string, string>) => void;
  showFeedback: boolean;
  isCorrect: boolean | null;
}

interface DragItem {
  id: string;
  text: string;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
  question,
  onAnswer,
  showFeedback,
  isCorrect,
}) => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const dropTargetRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  const handleDragStart = (itemId: string) => {
    if (showFeedback) return;
    setDraggedItem(itemId);
  };
  
  const handleDragEnd = () => {
    setDraggedItem(null);
  };
  
  const handleDrop = (definitionId: string) => {
    if (!draggedItem || showFeedback) return;
    
    const newMatches = { ...matches, [draggedItem]: definitionId };
    setMatches(newMatches);
    
    // Check if all items are matched
    if (Object.keys(newMatches).length === question.items.length) {
      onAnswer(question.id, newMatches);
    }
  };
  
  const isMatched = (definitionId: string) => {
    return Object.values(matches).includes(definitionId);
  };
  
  const getMatchedItem = (definitionId: string) => {
    const itemId = Object.entries(matches).find(([_, defId]) => defId === definitionId)?.[0];
    return question.items.find(item => item.id === itemId);
  };
  
  const isItemMatched = (itemId: string) => {
    return itemId in matches;
  };
  
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">{question.text}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Items column */}
        <div className="space-y-4">
          {question.items.map((item) => (
            <motion.div
              key={item.id}
              drag={!isItemMatched(item.id) && !showFeedback}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragStart={() => handleDragStart(item.id)}
              onDragEnd={handleDragEnd}
              className={`p-4 rounded-lg cursor-grab ${
                isItemMatched(item.id)
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-purple-100 border border-purple-200 shadow-sm'
              }`}
            >
              {item.text}
            </motion.div>
          ))}
        </div>
        
        {/* Definitions column */}
        <div className="space-y-4">
          {question.definitions.map((def) => {
            const matched = isMatched(def.id);
            const matchedItem = matched ? getMatchedItem(def.id) : null;
            
            return (
              <div
                key={def.id}
                ref={(el) => (dropTargetRefs.current[def.id] = el)}
                className={`p-4 rounded-lg border min-h-[80px] transition-colors ${
                  matched
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
                onMouseUp={() => handleDrop(def.id)}
              >
                <p className="text-sm text-gray-600 mb-2">{def.text}</p>
                {matched && matchedItem && (
                  <div className="bg-blue-100 p-2 rounded border border-blue-200">
                    {matchedItem.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {showFeedback && (
        <FeedbackMessage
          isCorrect={isCorrect || false}
          message={isCorrect ? question.feedback.correct : question.feedback.incorrect}
        />
      )}
      
      {!showFeedback && Object.keys(matches).length > 0 && (
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            onClick={() => onAnswer(question.id, matches)}
          >
            Check Answers
          </button>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;