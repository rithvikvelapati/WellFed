// ./ui/ArticleContent.tsx
// ./ui/ArticleContent.tsx

'use client';

import React, { useState } from 'react';
import { ImageItem } from '@/types/types';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ArticleContent Component
 * Displays the content of the news article corresponding to the current image.
 *
 * @param {ImageItem[]} images - Array of image items containing content blocks.
 * @param {number} currentIndex - The index of the currently selected image/article.
 */

interface ArticleContentProps {
  images: ImageItem[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ArticleContent: React.FC<ArticleContentProps> = ({
  images,
  currentIndex,
}) => {
  // Retrieve the content blocks for the current article
  const contentBlocks = images[currentIndex]?.content || [];

  // State to manage the visibility of the modal overlay
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="relative bg-white p-2 min-h-screen">
      {/* Article Title */}
      <h1 className="text-2xl font-bold mb-4">
        {images[currentIndex]?.title}
      </h1>
      {/* Article Content Blocks */}
      {contentBlocks.map((block, index) => {
        if (block.type === 'paragraph' && block.text) {
          return (
            <p key={index} className="mb-4 text-justify">
              {block.text}
            </p>
          );
        } else if (block.type === 'image' && block.src && block.alt) {
          // Only render images when the modal is closed
          if (!isModalOpen) {
            return (
              <div key={index} className="mb-4">
                <Image
                  src={block.src}
                  alt={block.alt}
                  className="w-full rounded-xl"
                  width={700}
                  height={700}
                />
              </div>
            );
          } else {
            return null;
          }
        } else {
          return null;
        }
      })}

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-center justify-center"
          >
            <div className="text-center text-white">
              <p className="text-lg font-bold">Continue Reading...</p>
              <button onClick={() => setIsModalOpen(false)} className="mt-2">
                {/* Dropdown arrow icon */}
                <svg
                  className="w-6 h-6 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 15.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 11.708-.708L12 15.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArticleContent;
