
import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center p-8">
    <div 
      className="w-12 h-12 border-4 rounded-full animate-spin"
      style={{
        borderColor: 'var(--border-color)',
        borderTopColor: 'var(--primary-color)'
      }}
    ></div>
  </div>
);

export default Spinner;