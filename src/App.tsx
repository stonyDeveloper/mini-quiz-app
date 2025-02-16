// src/App.tsx
import React from 'react';
import QuizContainer from './components/QuizContainer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <QuizContainer />
      </div>
    </div>
  );
}

export default App;