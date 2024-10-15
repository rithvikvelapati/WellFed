'use client';

import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import EditEventOverlay from '@/components/EditEvent/EditEventOverlay';

interface ToggleButtonGroupProps {
  // Optional props can be added here in the future
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = () => {
  const [selected, setSelected] = useState('Self');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const buttons = ['Self', 'Family'];

  const handleButtonClick = (button: string) => {
    setSelected(button);
    // Additional logic can be added here when focusing on functionality
  };

  const handleAddButtonClick = () => {
    // Open the overlay modal
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    // Close the overlay modal
    setIsModalOpen(false);
  };

 const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex justify-center space-x-4 mb-2">
      {buttons.map((button) => (
        <button
          key={button}
          onClick={() => handleButtonClick(button)}
          className={`w-24 h-9 rounded-3xl flex items-center justify-center font-normal text-sm shadow-lg
            ${
              selected === button
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-white text-secondary'
            }
            focus:outline-none focus:ring-0 focus:ring-secondary`}
        >
          <span>{button}</span>
        </button>
      ))}
      {/* "+" Button */}
      <button
        onClick={handleAddButtonClick}
        className="w-9 h-9 rounded-full flex items-center justify-center font-normal text-sm shadow-lg
          bg-gradient-to-r from-primary to-secondary text-white
          focus:outline-0 focus:ring-2 focus:ring-none"
        aria-label="Add Member"
      >
        <IoIosAdd className="text-2xl" />
      </button>
      {/* Render the EditEventOverlay component when isModalOpen is true */}
      {isModalOpen && (
        <EditEventOverlay
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
      )}
    </div>
  );
};

export default ToggleButtonGroup;
