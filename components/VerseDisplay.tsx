import React from 'react';
import type { QuranVerse } from '../types';

interface VerseDisplayProps {
  verse: QuranVerse;
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({ verse }) => {
  return (
    <div 
      className="bg-card-bg-color rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in border-2"
      style={{
        backgroundColor: 'var(--card-bg-color)',
        borderColor: 'var(--accent-color)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div className="text-center border-b-2 pb-4 mb-6" style={{borderColor: 'var(--border-color)'}}>
        <h3 className="text-xl font-semibold" style={{color: 'var(--primary-color)'}}>
          {verse.surahName}, {verse.verseNumber}
        </h3>
      </div>
      <div className="space-y-6">
        {/* Arabic */}
        <div>
          <p 
            className="font-amiri text-3xl md:text-4xl leading-relaxed text-right" 
            dir="rtl"
            style={{color: 'var(--text-color)'}}
          >
            {verse.arabicText}
          </p>
        </div>

        <div className="decorative-divider"></div>

        {/* English Translation */}
        <div>
           <h4 className="text-lg font-semibold mb-2" style={{color: 'var(--primary-color)'}}>English Translation</h4>
           <p className="leading-relaxed text-base md:text-lg italic" style={{color: 'var(--subtle-text-color)'}}>
            "{verse.englishTranslation}"
          </p>
        </div>

        <div className="decorative-divider"></div>

        {/* Bengali Translation */}
        <div>
           <h4 className="text-lg font-semibold mb-2 font-bengali" style={{color: 'var(--primary-color)'}}>বাংলা অনুবাদ</h4>
           <p className="leading-relaxed text-base md:text-lg font-bengali" style={{color: 'var(--subtle-text-color)'}}>
            "{verse.bengaliTranslation}"
          </p>
        </div>

        <div className="decorative-divider"></div>

        {/* Explanation */}
        <div>
           <h4 className="text-lg font-semibold mb-2" style={{color: 'var(--primary-color)'}}>Relevance</h4>
           <p className="leading-relaxed text-base md:text-lg" style={{color: 'var(--subtle-text-color)'}}>
            {verse.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};

// Add a simple fade-in animation for when the verse appears
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);


export default VerseDisplay;