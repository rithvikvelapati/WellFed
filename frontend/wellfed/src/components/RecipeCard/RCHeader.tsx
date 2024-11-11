"use client";
import React from 'react';
import Image from 'next/image';
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';

interface RecipeCardHeaderProps {
  title: string;
  description: string;
  category: string;
  imageUrl: string; // Added imageUrl prop
}

const RecipeCardHeader: React.FC<RecipeCardHeaderProps> = ({ title, description, category, imageUrl }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-center items-start w-full">
      <div className="relative w-full min-w-[375px] h-[455px] shadow-lg overflow-hidden">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-10 left-2 z-20 text-white text-[24px]"
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Recipe Image as Background */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover z-[-1]"
          />
        )}

        {/* Gradient background for content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full text-white p-4 z-20">
          <div className="text-[18px]">{category}</div>
          <h1 className="text-[35px] font-bold">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardHeader;  