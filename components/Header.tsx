
import React from 'react';

const Header: React.FC = () => (
  <header className="text-center pt-8">
    <h1 className="text-4xl md:text-5xl font-bold font-cinzel tracking-wider" style={{color: 'var(--primary-color)', textShadow: '1px 1px 2px rgba(0,0,0,0.1)'}}>
      Quranic Guidance
    </h1>
    <p className="mt-3 text-lg" style={{color: 'var(--subtle-text-color)'}}>
      Find solace and wisdom for your heart.
    </p>
  </header>
);

export default Header;