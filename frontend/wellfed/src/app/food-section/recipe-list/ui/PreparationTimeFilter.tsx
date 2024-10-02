'use client';

import React from 'react';
import { PreparationTimeOption, preparationTimeOptions } from '@/constants';
import { IoIosCheckmark } from 'react-icons/io';

interface PreparationTimeFilterProps {
  selectedTimeId: number | null;
  onSelectTime: (timeId: number) => void;
}

const PreparationTimeFilter: React.FC<PreparationTimeFilterProps> = ({
  selectedTimeId,
  onSelectTime,
}) => {
  return (
    <div className="p-4 max-w-[740px]">
      <ul>
        {preparationTimeOptions.map((option) => (
          <li
            key={option.id}
            className="flex justify-between items-center cursor-pointer py-4 border-b border-gray-200 last:border-b-0"
            onClick={() => onSelectTime(option.id)}
          >
            {/* Option Label */}
            <span className="text-lg">{option.label}</span>
            {/* Radio Button */}
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedTimeId === option.id
                  ? 'border-secondary bg-secondary text-white'
                  : 'border-gray-400'
              }`}
            >
              {selectedTimeId === option.id && (
                <IoIosCheckmark size={24} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreparationTimeFilter;
