'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5'; // Back icon
import { motion } from 'framer-motion';
import ReviewIngredients from '@/components/Cart/ReviewIngrediants'; // Adjust the import path

const ReviewIngredientsPage: React.FC = () => {
  const router = useRouter();

  // Back button handler
  const handleBackClick = () => {
    router.back(); // Navigate back to the previous page
  };

  const pageVariants = {
    initial: {
      x: '-100vw', // Slide in from the left
      opacity: 0,
    },
    animate: {
      x: 0, // Center the component
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
      {/* Header Section */}
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <motion.button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleBackClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoChevronBack size={30} />
          </motion.button>

    
        </div>
        <h1 className="text-3xl font-bold">Ingredients</h1>
      </div>

      {/* Ingredients Review Component */}
      <div>
        <ReviewIngredients />
      </div>
    </motion.div>
  );
};

export default ReviewIngredientsPage;
