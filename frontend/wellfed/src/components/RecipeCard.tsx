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
    <div
      className="relative inline-block flex-shrink-0 w-[180px] h-[178px] bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Recipe Image */}
      <div className="relative w-full h-[131px]">
        {/* Image with overlay */}
        <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
        
        {/* Curved Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Bookmark Button */}
        <button
          onClick={() => toggleBookmark(recipe.id)}
          className="absolute top-2 right-2.5 p-0 text-lg text-[#EC9556] hover:text-[#e8773c]"
        >
          {recipe.bookmarked ? (
            <FaBookmark className="drop-shadow-[0_0_5px_rgba(0,0,0,1)]" />
          ) : (
            <FaRegBookmark className="drop-shadow-[0_0_5px_rgba(0,0,0,1)]" />
          )}
        </button>
      </div>

      {/* Recipe Details */}
      <div className="flex flex-col w-[165px] p-0 ml-2 mt-0.4">
        {/* Title and Favorite Icon on Opposite Sides */}
        <div className="flex justify-between items-center m-0 p-0 w-full">
          {/* Conditionally use AutoScrollText or plain text */}
          {recipe.title.length > 15 ? (
            <AutoScrollText text={recipe.title} className="text-md text-[12px] w-[140px] truncate m-0 p-0 w-full" />
          ) : (
            <span className="text-md text-[12px] truncate m-0 p-0 w-full">{recipe.title}</span>
          )}

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className="p-0 text-lg text-[#EC9556] hover:text-[#e8773c] ml-auto"
          >
            {recipe.favorited ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        {/* Rating, Review Count, Dot, and Time */}
        <div className="flex items-center text-[10px] m-0 p-0">
          <div className="flex items-center m-0 p-0 ">
            <span className="text-semi-bold">{recipe.rating}</span>
            <FaStar className="text-[#EC9556] ml-0.5 m-0 p-0" />
            <span className="ml-0.5 m-0 p-0">({recipe.reviews})</span>
          </div>
          {/* Dot */}
          <span className="mx-1 m-0 p-0">•</span>
          <div className="flex items-center m-0 p-0">
            <FaClock className="mr-1 m-0 p-0" />
            {recipe.time}~
          </div>
        </div>

        {/* Handle */}
        <div className="flex justify-end items-center m-0 p-0">
          {recipe.handle.length > 15 ? (
            <AutoScrollText text={recipe.handle} className="text-[10px] text-md m-0 p-0" />
          ) : (
            <span className="text-[10px] text-md m-0 p-0">{recipe.handle}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
