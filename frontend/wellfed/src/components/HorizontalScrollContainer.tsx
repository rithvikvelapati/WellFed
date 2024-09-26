import React from 'react';

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  className?: string; // Optional className prop for custom gradient styles
}

const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({ children, className }) => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient overlay on the left */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-8 z-10 ${
          className ? className : 'bg-gradient-to-r from-white to-transparent'
        }`}
      ></div>

      {/* Gradient overlay on the right */}
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-8 z-10 ${
          className ? className : 'bg-gradient-to-l from-white to-transparent'
        }`}
      ></div>

      {/* Scrollable content */}
      <div className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
        {children}
      </div>
    </div>
  );
};

export default HorizontalScrollContainer;
