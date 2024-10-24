'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setModalOpen } from '@/store/modalSlice';

const NotificationsPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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


  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Top Bar with Back */}
        <div className="absolute top-10 left-0 right-0 flex justify-between items-center px-2">
          <button
            onClick={handleClose}
            className="p-2 focus:outline-none"
            aria-label="Close Filter Modal"
          >
            <IoIosArrowBack className="text-2xl text-slate-900" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="mt-16 pt-4 pl-4 pb-10">
          <h1 className="text-3xl font-bold my-4">Notifications</h1>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationsPage;
