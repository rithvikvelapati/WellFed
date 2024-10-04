'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setModalOpen } from '@/store/modalSlice';
import CategoryFilter from '../ui/CategoryFilter';
import PreparationTimeFilter from '../ui/PreparationTimeFilter';
import ServingsFilter from '../ui/ServingsFilter';
import ToggleButtonGroup from '../ui/ToggleButtonGroup';
import CaloriesFilter from '../ui/CaloriesFilter';
import { setFilters, resetFilters } from '@/store/filterSlice';

const FilterPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get filter values from Redux store
  const categoryIdFromStore = useSelector((state: RootState) => state.filter.categoryId);
  const timeIdFromStore = useSelector((state: RootState) => state.filter.timeId);
  const servingsFromStore = useSelector((state: RootState) => state.filter.servings);
  const calorieRangeFromStore = useSelector((state: RootState) => state.filter.calorieRange);


// Local state initialized from Redux store
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(categoryIdFromStore);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(timeIdFromStore);
  const [servings, setServings] = useState<number>(servingsFromStore);
  const [calorieRange, setCalorieRange] = useState<[number, number]>(calorieRangeFromStore);
  // Add other filter states as needed

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

  const handleReset = () => {
    dispatch(resetFilters());
    // Reset local state
    setSelectedCategoryId(null);
    setSelectedTimeId(null);
    setServings(1);
    setCalorieRange([0, 5000]);
  };

    const handleApplyFilters = () => {
    dispatch(
      setFilters({
        categoryId: selectedCategoryId,
        timeId: selectedTimeId,
        servings,
        calorieRange,
        // Include other filters as needed
      })
    );
    router.back();
  };

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleSelectTime = (timeId: number) => {
    setSelectedTimeId(timeId);
  };

  const handleServingsChange = (newServings: number) => {
    setServings(newServings);
  };

  const handleCaloriesChange = (values: [number, number]) => {
    setCalorieRange(values);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Top Bar with Back and Reset Buttons */}
        <div className="absolute top-10 left-0 right-0 flex justify-between items-center px-4">
          <button
            onClick={handleClose}
            className="p-2 focus:outline-none"
            aria-label="Close Filter Modal"
          >
            <IoIosArrowBack className="text-2xl text-slate-900" />
          </button>
          <button
            onClick={handleReset}
            className="text-base font-normal focus:outline-none"
          >
            Reset
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="mt-16 pt-4 pl-4 pb-10">
          <h1 className="text-3xl font-bold my-4">Filters</h1>

          {/* Categories Section */}
          <h2 className="text-lg font-bold mt-6 ml-4">Categories</h2>
          <CategoryFilter
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
          />

          {/* Number of Servings Section */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold ml-4">Number of Servings</h2>
            <ServingsFilter
              servings={servings}
              onServingsChange={handleServingsChange}
            />
          </div>

          {/* Preparation Time Section */}
          <h2 className="text-lg font-bold mt-6 ml-4">Preparation Time</h2>
          <PreparationTimeFilter
            selectedTimeId={selectedTimeId}
            onSelectTime={handleSelectTime}
          />

          {/* Calories Section */}
          <h2 className="text-lg font-bold mt-6 ml-4">Calories</h2>
          <CaloriesFilter
            minCalories={calorieRange[0]}
            maxCalories={calorieRange[1]}
            onCaloriesChange={handleCaloriesChange}
          />

          {/* Cooking for Section */}
          <h2 className="text-lg font-bold mt-6 ml-4">Cooking for</h2>
          <div className="ml-6 mt-4 flex space-x-fluid-px">
            <ToggleButtonGroup />
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="bg-white p-4 border-t border-gray-200">
          <button
            onClick={handleApplyFilters}
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg text-lg"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilterPage;
