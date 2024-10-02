import React from 'react';
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
  return (
    <div className="relative inline-block flex-shrink-0 w-[180px] h-[200px] bg-white rounded-lg shadow-md mx-1 overflow-hidden relative">
      {/* Recipe Image */}
      <div className="relative w-full h-[131px]">
        <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />

        {/* Bookmark Button */}
        <button
          onClick={() => toggleBookmark(recipe.id)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            recipe.bookmarked ? 'text-[#EC9556]' : 'text-gray-400'
          } bg-white bg-opacity-75 hover:bg-opacity-100 text-xl`}
        >
          {recipe.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>

      {/* Recipe Details */}
      <div className="px-2 flex flex-col justify-between w-full h-[70px]">
        {/* Title and Favorite Icon on Opposite Sides */}
        <div className="flex justify-between items-center">
          {/* Title on the left */}
          <AutoScrollText text={recipe.title} className="text-sm font-semibold truncate" />

          {/* Favorite Button on the right */}
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className={`p-1 ${recipe.favorited ? 'text-[#EC9556]' : 'text-gray-400'} text-xl`}
          >
            {recipe.favorited ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        {/* Rating, Review Count, Dot, and Time */}
        <div className="flex items-center justify-start text-xs mt-1">
          <div className="flex items-center">
            <FaStar className="text-[#EC9556] mr-1" /> 
            {recipe.rating} <span className="ml-1">({recipe.reviews})</span>
          </div>
          {/* Dot */}
          <span className="mx-1">•</span>
          <div className="flex items-center">
            <FaClock className="mr-1" /> 
            {recipe.time}~
          </div>
        </div>

        {/* Handle */}
        <div className="flex justify-end items-center mt-1">
          <AutoScrollText text={recipe.handle} className="text-xs" />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
