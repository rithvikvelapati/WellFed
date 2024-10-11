//./ui/ArticleContent.tsx

'use client';

import React from 'react';
import { ImageItem } from '@/types/types';
import Image from 'next/image';
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

  return (
    <div className="bg-white p-2">
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
          return (
            <div key={index} className="mb-4">
              <Image src={block.src} alt={block.alt} className="w-full rounded-xl" width={700} height={700} />
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default ArticleContent;
