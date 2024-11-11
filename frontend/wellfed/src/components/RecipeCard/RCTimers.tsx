import React from 'react';

interface RecipeTimersProps {
  preparationTime: string; // Updated to receive preparationTime prop
}

const RecipeTimers: React.FC<RecipeTimersProps> = ({ preparationTime }) => {
  const maxTime = 60; 

  // Calculates the stroke dash array for the circle
  const calculateStrokeDashArray = (time: number, radius: number) => {
    const circumference = 2 * Math.PI * radius;
    const timePercentage = time / maxTime;
    const dashArray = circumference * timePercentage;
    return `${dashArray} ${circumference}`;
  };

  return (
    <div className="flex justify-center space-x-5">
      <div className="text-center">
        <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
          {/* Define the linear gradient */}
          <defs>
            <linearGradient id="gradient-preparation" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#B64B29', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#EC9556', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#ddd" strokeWidth="5" />

          {/* Foreground circle with gradient stroke */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#gradient-preparation)"
            strokeWidth="10"
            strokeDasharray={calculateStrokeDashArray(parseInt(preparationTime), 40)}
            transform="rotate(-90 50 50)"
          />

          {/* Text displaying the preparation time inside the circle */}
          <text x="50" y="55" fontSize="14" fontWeight="medium" fill="black" textAnchor="middle" dominantBaseline="central">
            {preparationTime} min
          </text>
        </svg>
        <div className="mt-2 mb-6 text-[14px] text-gray-600">Preparation Time</div>
      </div>
    </div>
  );
};

export default RecipeTimers;
