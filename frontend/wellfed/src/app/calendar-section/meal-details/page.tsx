'use client';

import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

import { setModalOpen } from '@/store/modalSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowBack } from 'react-icons/io';
import { FaChevronDown } from 'react-icons/fa';

// Dynamically import MealDetails and ensure SSR is disabled
const MealDetails = dynamic(() => import('@/components/EventCalender/MealDetails'), {
  ssr: false, // Disable server-side rendering for this component
});

const MealDetailsPage: React.FC = () => {

  const dispatch = useDispatch();
  const router = useRouter();

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
  const handleClose = () => {
    router.push('/calendar-section/new-schedule'); // Navigate back to the previous page
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
        {/* Back Button */}

        <div className="flex gap-16">
          <button
            onClick={handleClose}
            className="p-2 focus:outline-none"
            aria-label="Close Modal"
          >
            <IoIosArrowBack className="text-2xl text-gray-700" />

          </button>
          <div>
            <h2 className="text-3xl font-semibold mt-5 mb-2">Wednesday</h2>
            <p className="text-xl">28 September 2024 <FaChevronDown className="inline ml-2 text-sm" /></p>
          </div>

        </div>


        {/* Modal Content */}
        <div className="mt-5">
          <MealDetails />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MealDetailsPage;
