'use client';

import React, { useState } from 'react';

interface ToggleButtonGroupProps {
  // Optional props can be added here in the future
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = () => {
  const [selected, setSelected] = useState('Self');

  const buttons = ['Self', 'Family'];

  const handleButtonClick = (button: string) => {
    setSelected(button);
    // Additional logic can be added here when focusing on functionality
  };

  return (
    <div className="flex justify-center space-x-fluid-px mb-6">
      {buttons.map((button) => (
        <button
          key={button}
          onClick={() => handleButtonClick(button)}
          className={`w-24 h-[36px] rounded-3xl flex items-center justify-center font-normal text-fluid-sm shadow-lg
            ${
              selected === button
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-slate-200 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
            }
            focus:outline-none focus:ring-2 focus:ring-gradient`}
        >
          <span className="text-sm font-medium">{button}</span>
        </button>
      ))}
    </div>
  );
};

export default ToggleButtonGroup;
