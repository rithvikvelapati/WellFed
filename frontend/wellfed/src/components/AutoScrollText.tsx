import React from 'react';

interface AutoScrollTextProps {
  text: string;
  className?: string;
  isFocused: boolean;
}

const AutoScrollText: React.FC<AutoScrollTextProps> = ({ text, className = '', isFocused }) => {

  const shouldScroll = text.length > 15;
  const truncatedText = shouldScroll ? text.slice(0, 15) + '...' : text;

  return (
    <div className={`relative w-full overflow-hidden whitespace-nowrap ${className}`}>
      {/* Conditionally apply gradient overlay on focus */}
      {isFocused && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-4 z-10 bg-gradient-to-r from-white to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-4 z-10 bg-gradient-to-l from-white to-transparent"></div>
        </>
      )}

      {/* Scrollable text */}
      <div className={`transition-transform ease-in-out duration-800 ${isFocused && shouldScroll ? 'animate-marquee' : ''}`}
        style={{ animationDuration: '20s' }}>
          {isFocused && shouldScroll ? text : truncatedText}
      </div>
    </div>
  );
};

export default AutoScrollText;
