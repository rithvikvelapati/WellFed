import React from "react";
import Image from "next/image";
import {
  FaBookmark,
  FaRegBookmark,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaClock
} from "react-icons/fa";
import AutoScrollText from "./AutoScrollText";
import Link from "next/link";

interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  time: string;
  handle: string;
  favorited: boolean;
  bookmarked: boolean;
}

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (id: number) => void;
  onToggleBookmark: (id: number) => void;
  className?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onToggleFavorite,
  onToggleBookmark
}) => {
  // State to control focus for AutoScrollText
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  return (
    <div
      className="relative inline-block flex-shrink-0 w-[180px] h-[178px] bg-white rounded-lg overflow-hidden shadow-lg"
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Recipe Image */}
      <div className="relative w-full h-[131px]">
        <Link href={`/recipe-card`} passHref>
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Gradient Overlay */}
        {!isFocused && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        )}

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(recipe.id);
          }}
          className="absolute top-1 right-0 text-lg text-[#EC9556] hover:text-[#e8773c] mr-0.5"
          aria-label={recipe.bookmarked ? "Remove Bookmark" : "Add Bookmark"}
        >
          {recipe.bookmarked ? (
            <FaBookmark className="drop-shadow-[0_0_5px_rgba(0,0,0,1)]" />
          ) : (
            <FaRegBookmark className="drop-shadow-[0_0_5px_rgba(0,0,0,1)]" />
          )}
        </button>
      </div>

      {/* Recipe Details */}
      <div className="flex w-full mt-0.5 px-1">
        {/* Title and Favorite Icon */}
        <div className="flex justify-between items-center w-full font-semibold">
          {/* Title */}
          <Link href={`/recipe-card`} passHref>
            <div className="flex w-[70%]">
              {recipe.title.length > 15 ? (
                <AutoScrollText
                  text={recipe.title}
                  className="text-[12px] leading-tight"
                  isFocused={isFocused}
                />
              ) : (
                <span className="text-[12px] leading-tight">
                  {recipe.title}
                </span>
              )}
            </div>
          </Link>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe.id);
            }}
            className="text-[#EC9556] hover:text-[#e8773c]"
            aria-label={
              recipe.favorited ? "Remove Favorite" : "Add to Favorites"
            }
          >
            {recipe.favorited ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      {/* Rating, Reviews, and Time */}
      <div className="flex flex-shrink w-full items-center text-[10px] mx-1">
        <div className="container flex items-center">
          <span className="mr-0.5 font-semibold">{recipe.rating}</span>
          <FaStar className="text-[#EC9556]" />
          <span className="ml-0.5">({recipe.reviews})</span>
          <span className="mx-0.5">•</span>
          <FaClock className="mr-0.5" />
          <span className="ml-0.5">{recipe.time}</span>
        </div>
      </div>

      {/* Chef Handle */}
      <div className="flex justify-end items-center text-[10px] font-semibold leading-tight mr-0.5">
        <div className="w-[65%]">
          {recipe.handle.length > 15 ? (
            <AutoScrollText
              text={recipe.handle}
              className="text-right"
              isFocused={isFocused}
            />
          ) : (
            <span className="flex justify-end text-right mr-1">
              {recipe.handle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
