'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { setModalOpen } from '@/store/modalSlice';
import CategoryFilter from '../ui/CategoryFilter';
import PreparationTimeFilter from '../ui/PreparationTimeFilter';

const FilterPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // State for selected category and preparation time
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);

  // Set modal open state to true when component mounts
  useEffect(() => {
    dispatch(setModalOpen(true));
    return () => {
      dispatch(setModalOpen(false));
    };
  }, [dispatch]);

  // Animation variants for sliding in from left to right
  const modalVariants = {
    initial: {
      x: '-100vw', // Start from the left
      opacity: 0,
    },
    animate: {
      x: 0, // End at the center
      opacity: 1,
      transition: { type: 'tween', duration: 0.5 },
    },
    exit: {
      x: '100vw', // Exit to the right
      opacity: 0,
      transition: { type: 'tween', duration: 0.5 },
    },
  };

  const handleClose = () => {
    router.back(); // Navigate back to the previous page
  };

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleSelectTime = (timeId: number) => {
    setSelectedTimeId(timeId);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Back Button */}
        <button
          onClick={handleClose}
          className="absolute top-10 left-0 p-2 focus:outline-none"
          aria-label="Close Filter Modal"
        >
          <IoIosArrowBack className="text-2xl text-gray-700" />
        </button>

        {/* Modal Content */}
        <div className="mt-16 pt-4 pl-4">
          <h1 className="text-3xl font-bold my-4">Filter</h1>
          {/* Add your filter options here */}
          <h2 className="text-lg font-bold mt-6 ml-4">Categories</h2>
        </div>
        <CategoryFilter
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
          />
        <div className="pl-4">
          <h2 className="text-lg font-bold mt-6 ml-4">Preparation Time</h2>
          <PreparationTimeFilter
            selectedTimeId={selectedTimeId}
            onSelectTime={handleSelectTime}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilterPage;
