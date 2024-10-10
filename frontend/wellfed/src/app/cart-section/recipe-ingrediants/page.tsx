'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import RecipeIngredients from '@/components/Cart/RecipeIngrediants'; // Adjust the import path if needed
import { motion } from 'framer-motion'; // For animations
import { IoChevronBack } from 'react-icons/io5'; // Back icon

const RecipeIngredientsPage: React.FC = () => {
  const router = useRouter();

  // Back button handler
  const handleBackClick = () => {
    router.back(); // Navigate back to the previous page
  };

  const pageVariants = {
    initial: {
      x: '-100vw', // Start from the left
      opacity: 0,
    },
    animate: {
      x: 0, // Slide to the center
      opacity: 1,
      transition: { type: 'tween', duration: 0.5 },
    },
    exit: {
      x: '100vw', // Slide out to the right
      opacity: 0,
      transition: { type: 'tween', duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#f5f5f5] overflow-y-auto"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* White Card Container for Top Section */}
      <div className="bg-white p-4">

        {/* Back Button and Recipe Title */}
        <div className="flex items-center justify-between mb-2 mt-6">
          {/* Back Button */}
          <motion.button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleBackClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoChevronBack size={30} />
          </motion.button>

          {/* Centered Title */}
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold">Grilled Beef Creamy Sauce</h1>
          </div>

          {/* Invisible element to maintain space on the right side */}
          <div className="w-6" />
        </div>
      </div>

      {/* Recipe Ingredients Component */}
      <div>
        <RecipeIngredients />
      </div>
    </motion.div>
  );
};

export default RecipeIngredientsPage;
