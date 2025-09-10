import React from 'react';

interface EmotionSelectorProps {
  emotions: string[];
  selectedEmotion: string | null;
  onSelectEmotion: (emotion: string) => void;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ emotions, selectedEmotion, onSelectEmotion }) => {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      {emotions.map((emotion) => (
        <button
          key={emotion}
          onClick={() => onSelectEmotion(emotion)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${
              selectedEmotion === emotion
                ? 'text-white border-transparent shadow-md'
                : 'bg-transparent'
            }
          `}
          // Fix: Cast style object to React.CSSProperties to allow for CSS custom properties like '--tw-ring-color'.
          style={{
            borderColor: selectedEmotion === emotion ? 'var(--primary-color)' : 'var(--border-color)',
            backgroundColor: selectedEmotion === emotion ? 'var(--primary-color)' : 'transparent',
            color: selectedEmotion === emotion ? '#FFFFFF' : 'var(--primary-color)',
            // Fix: 'ringColor' is not a valid style property. Replaced with the CSS variable
            // '--tw-ring-color', which is used by Tailwind's focus ring utilities.
            '--tw-ring-color': 'var(--accent-color)',
          } as React.CSSProperties}
        >
          {emotion}
        </button>
      ))}
    </div>
  );
};

export default EmotionSelector;