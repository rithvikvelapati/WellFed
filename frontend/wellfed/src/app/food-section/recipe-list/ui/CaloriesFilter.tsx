'use client';

import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Keep this import for rc-slider styles
import styles from './CaloriesFilter.module.css'; // Import the CSS module

interface CaloriesFilterProps {
  minCalories: number;
  maxCalories: number;
  onCaloriesChange: (values: [number, number]) => void;
}

const CaloriesFilter: React.FC<CaloriesFilterProps> = ({
  minCalories,
  maxCalories,
  onCaloriesChange,
}) => {
  const [calorieRange, setCalorieRange] = useState<[number, number]>([
    minCalories,
    maxCalories,
  ]);

  const handleSliderChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setCalorieRange([values[0], values[1]]);
      onCaloriesChange([values[0], values[1]]);
    }
  };

  // Calculate positions for the gradient
  const minPosition = ((calorieRange[0] / 5000) * 100).toFixed(2) + '%';
  const maxPosition = ((calorieRange[1] / 5000) * 100).toFixed(2) + '%';

  return (
    <div className="p-4 ml-4 max-w-[740px]">
      <div className="mb-4">
        <p className="text-lg font-medium">
          {calorieRange[0]} kcal - {calorieRange[1]} kcal
        </p>
      </div>
      <div className="relative px-2 mr-4">
        {/* Custom track for the "hump" effect */}
        <div
          className={styles.caloriesSliderTrack}
          style={{
            background: `linear-gradient(
              to right,
              #D1D5DB 0%,
              #D1D5DB ${minPosition},
              #EC9556 ${minPosition},
              #B64B29 ${maxPosition},
              #D1D5DB ${maxPosition},
              #D1D5DB 100%
            )`,
            height: '10px',
            position: 'absolute',
            width: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            borderRadius: '5px',
          }}
        />
        {/* Slider without deprecated props */}
        <Slider
          range
          min={0}
          max={5000}
          step={50}
          value={calorieRange}
          onChange={handleSliderChange}
          className={styles.caloriesSlider}
          marks={{
            0: '0 kcal',
            1000: '1000',
            2000: '2000',
            3000: '3000',
            4000: '4000',
            5000: '5000 kcal',
          }}
          dotStyle={{ display: 'none' }}
          activeDotStyle={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default CaloriesFilter;

