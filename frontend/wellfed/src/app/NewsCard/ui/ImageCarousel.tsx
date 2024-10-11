// ui/ImageCarousel.tsx

"use client";

import React from "react";
import Image from "next/image";
import { ImageItem } from "@/types/types";
import { useSwipeable } from "react-swipeable";

interface ImageCarouselProps {
  images: ImageItem[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * ImageCarousel Component
 * Displays an image carousel with pagination dots and swipe gestures.
 *
 * @param {ImageItem[]} images - Array of image items to display.
 * @param {number} currentIndex - The index of the currently displayed image.
 * @param {Function} setCurrentIndex - Function to update the current image index.
 */
const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  const numImages = images.length;

  const goToPrevious = () => {
    const index = currentIndex === 0 ? numImages - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const goToNext = () => {
    const index = currentIndex === numImages - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  // Handlers for swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    trackMouse: true, // Allows swipe with mouse or finger (optional)
  });

  return (
    <div
      {...handlers}
      className="relative w-full h-64 rounded-t-2xl overflow-hidden pt-2 shadow-lg drop"
    >
      {/* Image */}
      <Image
        src={images[currentIndex].url}
        alt={images[currentIndex].title}
        layout="fill"
        objectFit="cover"
      />

      {/* Overlay for Title and Heading */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
        <h2 className="text-lg font-bold">{images[currentIndex].title}</h2>
        <p className="text-sm">{images[currentIndex].heading}</p>
      </div>

      {/* Pagination Dots */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-50 px-3 py-1 rounded-full flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full focus:outline-none ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
