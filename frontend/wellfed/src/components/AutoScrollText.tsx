import React from 'react';

interface AutoScrollTextProps {
  text: string;
  className?: string; // Add className prop
}

const AutoScrollText: React.FC<AutoScrollTextProps> = ({ text, className = '' }) => {

  return (
    <div className={`relative w-full overflow-hidden whitespace-nowrap ${className}`}>
      {/* Gradient overlay on the left */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-4 z-10 bg-gradient-to-r from-white to-transparent"></div>

      {/* Gradient overlay on the right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-white to-transparent"></div>

      {/* Scrollable text */}
      <div className='animate-marquee'>
        {text}
      </div>
    </div>
  );
};

export default AutoScrollText;
