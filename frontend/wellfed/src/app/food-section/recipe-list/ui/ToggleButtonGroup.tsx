'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoIosAdd } from 'react-icons/io';

interface ToggleButtonGroupProps {
  // Optional props can be added here in the future
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = () => {
  const [selected, setSelected] = useState('Self');
  const router = useRouter();

  const buttons = ['Self', 'Family'];

  const handleButtonClick = (button: string) => {
    setSelected(button);
    // Additional logic can be added here when focusing on functionality
  };

  const handleAddButtonClick = () => {
    // Navigate to the modal overlay page
    router.push('/add-member'); // Adjust the route as needed
  };

  return (
    <div className="flex justify-center space-x-4 mb-6">
      {buttons.map((button) => (
        <button
          key={button}
          onClick={() => handleButtonClick(button)}
          className={`w-24 h-9 rounded-3xl flex items-center justify-center font-normal text-sm shadow-lg
            ${
              selected === button
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-slate-200 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
            }
            focus:outline-none focus:ring-2 focus:ring-secondary`}
        >
          <span>{button}</span>
        </button>
      ))}
      {/* "+" Button */}
      <button
        onClick={handleAddButtonClick}
        className="w-9 h-9 rounded-full flex items-center justify-center font-normal text-sm shadow-lg
          bg-gradient-to-r from-primary to-secondary text-white
          focus:outline-none focus:ring-2 focus:ring-secondary"
        aria-label="Add Member"
      >
        <IoIosAdd className="text-2xl" />
      </button>
    </div>
  );
};

export default ToggleButtonGroup;
