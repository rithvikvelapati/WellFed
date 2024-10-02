import React from 'react';

interface AutoScrollTextProps {
  text: string;
  className?: string; // Add className prop
}

const AutoScrollText: React.FC<AutoScrollTextProps> = ({ text, className = '' }) => {
  const shouldScroll = text.length > 20;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={shouldScroll ? 'animate-marquee' : ''}>
        {text}
      </div>
    </div>
  );
};

export default AutoScrollText;
