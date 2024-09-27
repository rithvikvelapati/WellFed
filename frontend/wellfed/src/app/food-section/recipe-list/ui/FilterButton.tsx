'use client';

import React from 'react';
import { FiFilter } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const FilterButton = () => {
  const router = useRouter();

  const handleFilterClick = () => {
    router.push('/filter');
  };

  return (
    <button
      onClick={handleFilterClick}
      className="p-3"
      aria-label="Filter recipes"
    >
      <FiFilter className="text-gray-600 text-xl" />
    </button>
  );
};

export default FilterButton;
