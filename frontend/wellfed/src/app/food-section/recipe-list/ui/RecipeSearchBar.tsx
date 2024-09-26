'use client';

import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const router = useRouter();

  const handleFilterClick = () => {
    // Navigate to the filter page
    router.push('/filter');
  };

  return (
    <div className="flex items-center w-full mb-6">
      <div className="relative flex-grow">
        <FiSearch
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 text-xl pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-white shadow-inner shadow-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search recipes"
        />
      </div>
    </div>
  );
};

export default SearchBar;
