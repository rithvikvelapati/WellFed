'use client';

import React from 'react';
import Image from 'next/image';
import { Category } from '@/constants';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, className }) => {
  return (
    <div
      className={`relative w-[138px] h-[188px] mx-2 rounded-lg overflow-hidden drop-shadow-lg ${className}`}
    >
      {/* Background Image */}
      <Image
        src={category.image}
        alt={category.name}
        layout="fill"
        objectFit="cover"
        quality={80}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

      {/* Category Info */}
      <div className="absolute bottom-2 left-2 right-2 text-white">
        <h3 className="text-base font-semibold">{category.name}</h3>
        <p className="text-xs">{category.recipeCount} Recipes</p>
      </div>
    </div>
  );
};

export default CategoryCard;
