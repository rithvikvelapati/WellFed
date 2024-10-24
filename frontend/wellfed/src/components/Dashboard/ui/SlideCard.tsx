"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for Next.js 13
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  imageUrl: string;
  title: string;
  description: string;
}

interface SlideshowProps {
  slides: Slide[];
}

const SlideCard: React.FC<SlideshowProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Set up auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [goToNextSlide]); // Include goToNextSlide in the dependency array
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };


  const handleClick = () => {
    router.push('/news');
  };

  return (
    <div className="relative w-full rounded-xl shadow-md">
      <div className="relative overflow-hidden h-40">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Image */}
            <Image
              src={slides[currentIndex].imageUrl}
              alt={`Slide ${currentIndex}`}
              fill
              className="rounded-xl object-cover"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-center rounded-xl">
              <div className="text-white text-left">
                <p className="text-lg font-sans mb-2">
                  {slides[currentIndex].title}
                </p>
                <p className="text-xs font-sans">
                  {slides[currentIndex].description}
                </p>
                <button
                  onClick={handleClick}
                  className="mt-4 py-2 px-4 bg-white text-primary text-xs font-medium rounded-md shadow-lg focus:bg-slate-300"
                >
                  Try Now!
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Pagination Dots */}
      <div className="absolute bottom-3 right-3 flex justify-center space-x-2">
        <div className="px-3 py-1 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full focus:outline-none ${
                currentIndex === index ? 'bg-white' : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
