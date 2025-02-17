import React, { Suspense, lazy, useEffect, useState } from 'react';
import './index.css';
import QuizLoadingScreen from './components/Loader';

const QuizContainer = lazy(() => import('./components/QuizContainer'));

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 4000); // Delay for 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <Suspense fallback={<QuizLoadingScreen />}>
          {!isReady ? <QuizLoadingScreen /> : <QuizContainer />}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
