"use client";
import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-lg">
      <div className="relative overflow-hidden h-40 bg-white shadow-lg">
        <img
          src={slides[currentIndex].imageUrl}
          alt={`Slide ${currentIndex}`}
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-center">
          <div className="text-white text-left">
            <p className="text-lg font-sans mb-2">{slides[currentIndex].title}</p>
            <p className="text-xs font-sans">{slides[currentIndex].description}</p>
            <button
              onClick={() => console.log('Try Now clicked!')}
              className="mt-4 py-2 px-4 bg-white text-orange-600 font-sans text-xs rounded-full shadow-md hover:bg-gray-100"
            >
              Try Now!
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 flex justify-center space-x-2">
        <div className="px-3 py-1 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                currentIndex === index ? 'bg-white' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
