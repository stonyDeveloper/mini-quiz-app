import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const QuizLoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  
  const loadingMessages = [
    'Shuffling questions...',
    'Consulting the quiz master...',
    'Verifying answers...',
    'Calibrating difficulty...',
    'Finalizing the leaderboard...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const messageTimer = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % loadingMessages.length);
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-800 to-purple-900 flex items-center justify-center text-white">
      <div className="w-full max-w-md p-6">
        {/* Animated Quiz Window */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="bg-gray-900 rounded-lg shadow-2xl p-6 text-center"
        >
          <h2 className="text-xl font-bold text-yellow-400">Quiz Time!</h2>
          <p className="text-gray-400 italic">Preparing your challenge...</p>

          {/* Loading Messages */}
          <div className="mt-4 text-lg font-mono">
            {loadingMessages.map((msg, index) => (
              <div 
                key={index} 
                className={`transition-opacity duration-500 ${index === currentLine ? 'text-white' : 'text-gray-600'}`}
              >
                <span className="text-blue-400">❯</span> {msg}
                {index === currentLine && <span className="animate-pulse">_</span>}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div 
              className="bg-yellow-400 h-full" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Percentage Indicator */}
          <div className="text-gray-400 text-sm mt-2">
            {progress}%
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizLoadingScreen;
