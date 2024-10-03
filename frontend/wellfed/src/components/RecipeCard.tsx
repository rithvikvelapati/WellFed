import React, { useState } from 'react';
import Image from 'next/image';
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart, FaStar, FaClock } from 'react-icons/fa';
import AutoScrollText from './AutoScrollText';

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    imageUrl: string;
    rating: number;
    reviews: number;
    time: string;
    handle: string;
    favorited: boolean;
    bookmarked: boolean;
  };
  toggleFavorite: (id: number) => void;
  toggleBookmark: (id: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, toggleFavorite, toggleBookmark }) => {
  const [isFocused, setIsFocused] = useState(false); // State to control focus

  return (
    <div
      className="relative inline-block flex-shrink-0 w-[180px] h-[178px] bg-white rounded-lg overflow-hidden shadow-lg"
      tabIndex={0} // Make the card focusable
      onFocus={() => setIsFocused(true)} // Set focus
      onBlur={() => setIsFocused(false)} // Remove focus when blur
    >
      {/* Recipe Image */}
      <div className="relative w-full h-[131px]">
        <Image src={recipe.imageUrl} alt={recipe.title} width={100} height={100} className="w-full h-full object-cover" />

        {/* Curved Gradient Overlay */}
        {isFocused && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        )}

        {/* Bookmark Button */}
        <div className="absolute top-0 right-0 p-0 m-2">
          <button
            onClick={() => toggleBookmark(recipe.id)}
            className="text-lg text-[#EC9556] hover:text-[#e8773c] p-0"
          >
            {recipe.bookmarked ? (
              <FaBookmark className="drop-shadow-[0_0_5px_rgba(0,0,0,1)]" />
            ) : (
              <FaRegBookmark className="drop-shadow-[0_0_5px_rgba(0,0,0,1)]" />
            )}
          </button>
        </div>
      </div>

      {/* Recipe Details */}
      <div className="flex flex-col w-full p-0 bottom-0 ml-1 mt-0">
        {/* Title and Favorite Icon on Opposite Sides */}
        <div className="flex justify-between items-center m-0 p-0 w-full">
          {/* Conditionally use AutoScrollText for title if it's longer than 15 characters */}
          {recipe.title.length > 15 ? (
            <AutoScrollText text={recipe.title} className="text-md text-[12px] w-[120px] truncate leading-tight m-0 p-0" isFocused={isFocused} />
          ) : (
            <span className="text-md text-[12px] truncate leading-tight m-0 p-0">{recipe.title}</span>
          )}

          {/* Favorite Button */}
          <div className="absolute top-[125px] right-0 p-0 m-2">
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className="text-[#EC9556] hover:text-[#e8773c]"
            >
              {recipe.favorited ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>

        {/* Rating, Review Count, Dot, and Time */}
        <div className="flex items-center text-[10px] leading-tight ml-1 p-0">
          <div className="flex items-center m-0 p-0">
            <span className="font-semibold">{recipe.rating}</span>
            <FaStar className="text-[#EC9556] ml-0.5 m-0 p-0" />
            <span className="ml-0.5 m-0 p-0">({recipe.reviews})</span>
          </div>
          <span className="mx-1 m-0 p-0">•</span>
          <div className="flex items-center m-0 p-0">
            <FaClock className="mr-0.5 m-0 p-0" />
            {recipe.time}~
          </div>
        </div>

        {/* Chef Handle (aligned to the right side, scrolling within 90px if needed) */}
        <div className="flex justify-end items-center mr-3 p-0 leading-tight">
          {/* Conditionally use AutoScrollText for handle if it's longer than 15 characters */}
          {recipe.handle.length > 15 ? (
            <AutoScrollText text={recipe.handle} className="text-[10px] text-md m-0 p-0 leading-tight w-[90px] text-right" isFocused={isFocused} />
          ) : (
            <span className="text-[10px] text-md m-0 p-0 leading-tight w-[90px] text-right">{recipe.handle}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
