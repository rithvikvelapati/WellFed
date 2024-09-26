'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';
import HorizontalScrollContainer from '../../../components/HorizontalScrollContainer';
import RecipeSearchBar from './ui/RecipeSearchBar';

const RecipeListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  // Animation variants for sliding in from right to left
  const pageVariants = {
    initial: {
      x: '100vw', // Start from right
      opacity: 0,
    },
    in: {
      x: 0, // End at center
      opacity: 1,
      transition: { type: 'tween', duration: 0.5 },
    },
    out: {
      x: '100vw', // Slide out to the right when closing
      opacity: 0,
      transition: { type: 'tween', duration: 0.5 },
    },
  };

  // Close modal by simulating a back navigation or state change
  const handleClose = () => {
    setIsModalOpen(false); // Close the modal effect
    setTimeout(() => router.back(), 500); // Use a delay to match animation before navigating back
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-white z-50"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
        >
          <div className="relative w-full h-full p-4">
            {/* Back Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 left-4 p-2 mb-4 focus:outline-none"
            >
              <IoIosArrowBack className="text-2xl text-slate-700" />
            </button>

            {/* Content Container with Top Padding */}
            <div className="pt-16">
              {/* Search Bar */}
              <RecipeSearchBar />

              {/* Categories Section */}
              <section className="mb-8">
                <div className="flex justify-between items-center my-4">
                  <h2 className="text-fluid-lg font-bold">Categories</h2>
                  <button
                    className="flex items-center text-slate-500 text-fluid-sm"
                    onClick={() => router.push('/categories')}
                  >
                    See All <IoIosArrowForward className="ml-1" />
                  </button>
                </div>
                {/* Categories Content */}
                <HorizontalScrollContainer>
                  {/* Replace with your RecipeCard components */}
                  <div className="snap-start mx-2">
                    <div className="w-48 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-center">Category 1</p>
                    </div>
                  </div>
                  {/* Add more cards as needed */}
                </HorizontalScrollContainer>
              </section>

              {/* Trending Now Section */}
              <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-fluid-lg font-bold">Trending Now</h2>
                  <button
                    className="flex items-center text-slate-500 text-fluid-sm"
                    onClick={() => router.push('/trending')}
                  >
                    See All <IoIosArrowForward className="ml-1" />
                  </button>
                </div>
                {/* Trending Now Content */}
                <HorizontalScrollContainer>
                  {/* Replace with your RecipeCard components */}
                  <div className="snap-start mx-2">
                    <div className="w-48 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-center">Trending Recipe 1</p>
                    </div>
                  </div>
                  {/* Add more cards as needed */}
                </HorizontalScrollContainer>
              </section>

              {/* Recent Recipes Section */}
              <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-fluid-lg font-bold">Recent Recipes</h2>
                  <button
                    className="flex items-center text-slate-500 text-fluid-sm"
                    onClick={() => router.push('/recent-recipes')}
                  >
                    See All <IoIosArrowForward className="ml-1" />
                  </button>
                </div>
                {/* Recent Recipes Content */}
                <HorizontalScrollContainer>
                  {/* Replace with your RecipeCard components */}
                  <div className="snap-start mx-2">
                    <div className="w-48 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-center">Recent Recipe 1</p>
                    </div>
                  </div>
                  {/* Add more cards as needed */}
                </HorizontalScrollContainer>
              </section>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecipeListPage;
