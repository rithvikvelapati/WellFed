'use client';

import React from 'react';
import { FiSearch } from 'react-icons/fi';

const RecipeSearchBar = () => {
  return (
    <div className="relative w-full">
      <FiSearch
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 text-xl pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="text"
        placeholder="Search recipes..."
        className="w-full pl-12 pr-4 py-3 rounded-lg bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Search recipes"
      />
    </div>
  );
};

export default RecipeSearchBar;
