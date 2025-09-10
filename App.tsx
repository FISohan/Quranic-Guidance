
import React, { useState, useCallback } from 'react';
import type { QuranVerse } from './types';
import { EMOTIONS } from './constants';
import { getVerseForEmotion } from './services/geminiService';
import Header from './components/Header';
import EmotionSelector from './components/EmotionSelector';
import VerseDisplay from './components/VerseDisplay';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [verse, setVerse] = useState<QuranVerse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFindVerse = useCallback(async () => {
    if (!selectedEmotion) {
      setError('Please select an emotion first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setVerse(null);

    try {
      const result = await getVerseForEmotion(selectedEmotion);
      setVerse(result);
    } catch (err) {
      setError('Failed to fetch a verse. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedEmotion]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <Header />

        <main className="mt-8">
          <div className="bg-card-bg-color rounded-2xl shadow-xl p-6 md:p-8 text-center border-2 border-amber-200/50" style={{backgroundColor: 'var(--card-bg-color)'}}>
            <h2 className="text-xl md:text-2xl font-semibold" style={{color: 'var(--primary-color)'}}>How are you feeling today?</h2>
            <p className="mt-2" style={{color: 'var(--subtle-text-color)'}}>Select an emotion to receive guidance from the Quran.</p>
            
            <EmotionSelector 
              emotions={EMOTIONS} 
              selectedEmotion={selectedEmotion} 
              onSelectEmotion={setSelectedEmotion} 
            />

            <button
              onClick={handleFindVerse}
              disabled={!selectedEmotion || isLoading}
              className="mt-6 w-full sm:w-auto text-white font-bold py-3 px-10 rounded-lg focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
              style={{backgroundColor: 'var(--primary-color)', color: '#FFFFFF', boxShadow: `0 4px 14px 0 rgba(0, 51, 102, 0.39)`, textShadow: '0px 1px 2px rgba(0,0,0,0.2)'}}
            >
              {isLoading ? 'Seeking...' : 'Find Verse'}
            </button>
          </div>

          <div className="mt-8">
            {isLoading && <Spinner />}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}
            {verse && !isLoading && <VerseDisplay key={verse.surahName + verse.verseNumber} verse={verse} />}
          </div>
        </main>
      </div>
       <footer className="w-full max-w-2xl mx-auto mt-12 text-center text-sm pb-4" style={{color: 'var(--subtle-text-color)'}}>
          <p>Designed to provide comfort and reflection through Quranic wisdom.</p>
       </footer>
    </div>
  );
};

export default App;