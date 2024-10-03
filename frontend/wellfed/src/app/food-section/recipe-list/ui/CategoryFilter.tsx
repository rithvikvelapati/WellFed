'use client';

import React from 'react';
import { Category, categories } from '@/constants';
import { IoIosCheckmark } from 'react-icons/io';

interface CategoryFilterProps {
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="pt-2 px-4 ml-4 max-w-[740px]">
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex justify-between items-center cursor-pointer py-4 border-b border-gray-200 last:border-b-0"
            onClick={() => onSelectCategory(category.id)}
          >
            {/* Category Name */}
            <span className="text-lg">{category.name}</span>
            {/* Radio Button */}
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedCategoryId === category.id
                  ? 'border-secondary bg-secondary text-white'
                  : 'border-gray-400'
              }`}
            >
              {selectedCategoryId === category.id && (
                <IoIosCheckmark size={24} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
