import React, { Suspense, lazy } from 'react';
import './index.css';
import QuizLoadingScreen from './components/Loader';// Ensure this points to your new loader

const QuizContainer = lazy(() => import('./components/QuizContainer')); // Lazy loading

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <Suspense fallback={<QuizLoadingScreen />}>
          <QuizContainer />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
