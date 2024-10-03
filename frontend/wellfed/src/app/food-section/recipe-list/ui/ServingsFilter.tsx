'use client';

import React, { useState } from 'react';

interface ServingsFilterProps {
  servings: number;
  onServingsChange: (newServings: number) => void;
}

const ServingsFilter: React.FC<ServingsFilterProps> = ({
  servings,
  onServingsChange,
}) => {
  const [inputValue, setInputValue] = useState(servings.toString());

  const handleIncrement = () => {
    const newServings = servings + 1;
    onServingsChange(newServings);
    setInputValue(newServings.toString());
  };

  const handleDecrement = () => {
    if (servings > 1) {
      const newServings = servings - 1;
      onServingsChange(newServings);
      setInputValue(newServings.toString());
    } else {
      alert('Number of servings cannot be less than 1.');
    }
  };

const [error, setError] = useState<string | null>(null);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.trim();
  setInputValue(value);

  try {
    if (value === '') {
      throw new Error('Please enter a number.');
    }
    const parsedValue = parseInt(value, 10);
    if (
      isNaN(parsedValue) ||
      parsedValue <= 0 ||
      !Number.isInteger(parsedValue)
    ) {
      throw new Error('Please enter a whole number greater than 0.');
    }
    onServingsChange(parsedValue);
    setError(null);
  } catch (error: any) {
    setError(error.message);
  }
};

// In the return statement
{error && <p className="text-red-500 mt-2">{error}</p>}

  return (
    <div className="py-4 mx-2 max-w-[740px]">
      <div className="flex items-center space-x-fluid-px">
        <div className="flex">
            <button
            onClick={handleDecrement}
            className="w-10 h-5 flex items-center justify-center rounded-l-md bg-white text-2xl text-secondary font-normal border-2 border-secondary"
            >
            -
            </button>
            <button
            onClick={handleIncrement}
            className="w-10 h-5 flex items-center justify-center rounded-r-md bg-white text-2xl text-secondary font-normal border-2 border-secondary border-l-0"
            >
            +
            </button>
        </div>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="w-12 text-center border border-gray-300 rounded-md p-1"
          min="1"
        />
      </div>
    </div>
  );
};

export default ServingsFilter;
