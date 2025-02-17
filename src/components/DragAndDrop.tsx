import React, { useState, useRef } from 'react';
import { DragAndDropQuestion } from '../types';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import FeedbackMessage from './FeedbackMessage';

interface DragAndDropProps {
  question: DragAndDropQuestion;
  onAnswer: (questionId: string, answer: Record<string, string>) => void;
  showFeedback: boolean;
  isCorrect: boolean | null;
  onTryAgain: () => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
  question,
  onAnswer,
  showFeedback,
  isCorrect,
  onTryAgain,
}) => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const dropTargetRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragControls = useDragControls();
  
  const handleDragStart = (itemId: string) => {
    if (showFeedback && isCorrect) return;
    setDraggedItem(itemId);
  };
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    if (!draggedItem) return;
    
    const dropTargets = Object.entries(dropTargetRefs.current);
    for (const [defId, element] of dropTargets) {
      if (!element) continue;
      
      const rect = element.getBoundingClientRect();
      const { clientX, clientY } = 'touches' in event 
        ? event.touches[0] 
        : (event as MouseEvent);
      
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        handleDrop(defId);
        break;
      }
    }
    
    setDraggedItem(null);
  };
  
  const handleDrop = (definitionId: string) => {
    if (!draggedItem || (showFeedback && isCorrect)) return;
    
    const newMatches = { ...matches, [draggedItem]: definitionId };
    setMatches(newMatches);
    
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
  const [resetKey, setResetKey] = useState(0);

  
  const handleTryAgain = () => {
    setIsResetting(true);
  
    setTimeout(() => {
      setMatches({});
      setIsResetting(false);
      setResetKey(prevKey => prevKey + 1); // 🔥 Force re-render
      onTryAgain();
    }, 300);
  };
  

  return (
    <div className="relative">
      <h2 className="text-xl font-medium mb-4">{question.text}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Items column */}
        <div key={resetKey} className="space-y-4 relative z-10">
          <AnimatePresence>
            {question.items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={false}
                animate={{
                  opacity: isItemMatched(item.id) && !isResetting ? 0 : 1,
                  scale: 1,
                  x: 0,
                  y: 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  opacity: { duration: 0.2 }
                }}
                drag={!isItemMatched(item.id) && (!showFeedback || !isCorrect)}
                dragControls={dragControls}
                dragMomentum={false}
                dragElastic={0.2}
                dragTransition={{ 
                  bounceStiffness: 600,
                  bounceDamping: 20
                }}
                whileDrag={{ 
                  scale: 1.02,
                  zIndex: 50,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                }}
                style={{
                  zIndex: draggedItem === item.id ? 50 : 'auto',
                  touchAction: 'none',
                  width: '100%',
                  position: 'relative'
                }}
                onDragStart={() => handleDragStart(item.id)}
                onDragEnd={handleDragEnd}
                className={`p-3 rounded-lg relative select-none ${
                  !isItemMatched(item.id) || isResetting
                    ? 'bg-purple-100 border border-purple-200 shadow-sm cursor-grab active:cursor-grabbing'
                    : 'pointer-events-none'
                }`}
              >
                <div className="pointer-events-none">{item.text}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Definitions column */}
        <div className="space-y-4 relative">
          {question.definitions.map((def) => {
            const matched = isMatched(def.id);
            const matchedItem = matched ? getMatchedItem(def.id) : null;
            
            return (
              <motion.div
                key={def.id}
                ref={(el) => (dropTargetRefs.current[def.id] = el)}
                animate={{
                  scale: draggedItem && !matched ? 1.02 : 1,
                  boxShadow: draggedItem && !matched 
                    ? "0 4px 12px rgba(0,0,0,0.1)" 
                    : "none"
                }}
                className={`rounded-lg border transition-colors ${
                  matched && (showFeedback && isCorrect)
                    ? 'bg-green-50 border-green-200'
                    : matched
                    ? 'bg-blue-50 border-blue-200'
                    : draggedItem && !matched
                    ? 'bg-purple-50 border-purple-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="p-3">
                  <p className="text-sm text-gray-600 mb-3 pointer-events-none">{def.text}</p>
                  <AnimatePresence mode="wait">
                    {matched && matchedItem && !isResetting ? (
                      <motion.div
                        key={matchedItem.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`rounded border ${
                          showFeedback && isCorrect 
                            ? 'bg-green-100 border-green-200' 
                            : 'bg-blue-100 border-blue-200'
                        }`}
                      >
                        <div className="p-3 pointer-events-none">{matchedItem.text}</div>
                      </motion.div>
                    ) : (
                      <div className="h-[42px] rounded border border-dashed border-gray-300" />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
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
                onClick={handleTryAgain}
              >
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      )}
      
      {!showFeedback && Object.keys(matches).length === question.items.length && (
        <div className="mt-4 flex justify-end">
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