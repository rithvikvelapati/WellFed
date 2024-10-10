'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import ShoppingList from '@/components/Cart/ShoppingList'; // Adjust the import path if needed
import { AnimatePresence, motion } from 'framer-motion'; // For animations
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { setModalOpen } from '@/store/modalSlice';

const ShoppingListPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setModalOpen(true));
    return () => {
      dispatch(setModalOpen(false));
    };
  }, [dispatch]);

  const modalVariants = {
    initial: {
      x: '-100vw', // Start from the left side of the screen
      opacity: 0, // Fully transparent at the start
    },
    animate: {
      x: 0, // Slide into view from the left
      opacity: 1, // Become fully visible
      transition: { type: 'tween', duration: 0.5 }, // Smooth transition with tweening
    },
    exit: {
      x: '100vw', // Slide out to the right
      opacity: 0, // Fade out
      transition: { type: 'tween', duration: 0.5 }, // Smooth transition
    },
  };

  // Back button handler
  const handleBackClick = () => {
    dispatch(setModalOpen(false)); // Close the modal before navigating back
    router.back(); // Navigate back to the previous page
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-[#f5f5f5] overflow-y-auto"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* White Card Container */}
        <div className="bg-white p-4 mb-2">

          {/* Header Section with Back Button and "All Orders" */}
          <div className="flex items-center justify-between mb-1">
            <motion.button
              className="flex items-center text-gray-600 hover:text-gray-800"
              onClick={handleBackClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Back Button */}
              <div className="w-full flex justify-between items-center px-2 mt-2">
                <button className="text-gray-600" onClick={handleBackClick}>
                  <IoChevronBack size={30} /> {/* Back Button */}
                </button>
              </div>
            </motion.button>

            <button
              className="text-gray-800 font-semibold flex items-center gap-1"
            >
              All Orders <IoChevronForward size={20} />
            </button>
          </div>

          {/* Shopping List Title */}
          <h1 className="text-2xl font-bold mb-3">Shopping List</h1>
        </div>

        <div>
          {/* Shopping List Component */}
          <ShoppingList />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShoppingListPage;
