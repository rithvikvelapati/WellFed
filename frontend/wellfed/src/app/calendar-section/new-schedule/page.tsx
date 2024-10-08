'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowBack } from 'react-icons/io';
import { setModalOpen } from '@/store/modalSlice';
import NewSchedule from '@/components/EventCalender/NewSchedule';

const NewSchedulePage: React.FC = () => {
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
    router.push('/calendar-section'); // Navigate back to the previous page
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
        <div className="flex items-center justify-between">
          <button
            onClick={handleClose}
            className="p-2 focus:outline-none"
            aria-label="Close Modal"
          >
            <IoIosArrowBack className="text-2xl text-gray-700 mt-5" />

          </button>
            <h2 className="text-3xl font-semibold mt-6 mb-2">New Schedule</h2>
           
          <p className="text-xl mt-5 mr-3">Cancel</p>
        </div>

        {/* Modal Content */}
        <div className="mt-5">
          <NewSchedule />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewSchedulePage;

