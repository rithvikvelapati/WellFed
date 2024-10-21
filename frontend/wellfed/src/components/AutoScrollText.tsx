import React from 'react';

interface AutoScrollTextProps {
  text: string;
  className?: string;
  isFocused: boolean;
}

const AutoScrollText: React.FC<AutoScrollTextProps> = ({ text, className = '', isFocused }) => {
  const shouldScroll = text.length > 15;

  // Truncate text if not focused or if scrolling is not needed
  const displayText = isFocused && shouldScroll ? text + '   ' + text : shouldScroll ? text.slice(0, 15) + '...' : text;

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Gradient overlays on focus */}
      {isFocused && shouldScroll && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 z-10 bg-gradient-to-r from-white to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-white to-transparent"></div>
        </>
      )}

      {/* Scrollable text */}
      <div
        className={`whitespace-nowrap ${isFocused && shouldScroll ? 'animate-marquee' : ''}`}
        style={{ animationDuration: '10s' }}
      >
        {displayText}
      </div>
    </div>
  );
};

export default AutoScrollText;

