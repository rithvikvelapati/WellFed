'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setModalOpen } from '@/store/modalSlice';
import NotificationIcon from '@/components/TopBar/NotificationIcon';
import CartIcon from '@/components/TopBar/CartIcon';
import ImageCarousel from './ImageCarousel';
import { NEWS_IMAGES } from '@/constants/newsImages';
import ArticleContent from './ArticleContent';


const NewsCardOpened: React.FC = () => {
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
   router.push('/'); // Navigate back to the previous page
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  // Debug currentIndex
  useEffect(() => {
    console.log('Current Index:', currentIndex);
  }, [currentIndex]);

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
        <div className="relative flex items-center z-50 px-1">
        </div>
          <div className=" bg-white flex flex-col justify-items-start mb-1 px-1 pt-8">
            <button
              onClick={handleClose}
              className="focus:outline-none"
              aria-label="Close Filter Modal"
            >
              <IoIosArrowBack className="text-2xl text-slate-900" />
            </button>
            <div className="absolute right-2 flex space-x-fluid-px justify-end">
              <NotificationIcon />
              <CartIcon />
            </div>
          </div>
          <section className="sticky drop-shadow-lg">
            <ImageCarousel
            images={NEWS_IMAGES}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            />
          </section>
            <ArticleContent
            images={NEWS_IMAGES}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            />
      </motion.div>
    </AnimatePresence>
  );
};

export default NewsCardOpened;
