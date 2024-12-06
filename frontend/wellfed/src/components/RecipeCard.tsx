"use client";
import React from "react";
import Image from "next/image";
import {
  FaBookmark,
  FaRegBookmark,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaClock,
} from "react-icons/fa";
import AutoScrollText from "./AutoScrollText";
import Link from "next/link";
import { Recipe } from "@/constants";

export interface SavedRecipe {
  _id: string; // MongoDB ObjectId as a string
  recipeId: number; // Recipe identifier as a number
  userId: string; // User identifier as a string
  createdAt: string; // Creation date as a string
  updatedAt: string; // Last update date as a string
  createdBy: string; // User who created the record
  updatedBy: string; // User who last updated the record
}

interface RecipeCardProps {
  recipe: Recipe;
  savedRecipesData: SavedRecipe[];
  onToggleFavorite: (id: Recipe) => void;
  onToggleBookmark: (id: number) => void;
  className?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  savedRecipesData,
  onToggleFavorite,
  onToggleBookmark,
}) => {
  if (!recipe) return null; // Safeguard if recipe is undefined

  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  return (
    <div
      className="relative inline-block flex-shrink-0 w-[180px] h-[178px] bg-white rounded-lg overflow-hidden shadow-md"
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Recipe Image */}
      <div className="relative w-full h-[131px]">
        <Link href={`/recipe-card/${recipe?._id}`} className="w-full h-full">
          <Image
            src={`https://wellfedpics.blob.core.windows.net/recipie-images/${recipe.recipeId}-recipe.jpeg`}
            alt={recipe?.title || "Recipe Image"}
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
            e.preventDefault();
            e.stopPropagation();
            onToggleBookmark(recipe?._id);
          }}
          className="absolute top-1 right-0 text-lg text-[#EC9556] hover:text-[#e8773c] mr-0.5"
          aria-label={recipe?.bookmarked ? "Remove Bookmark" : "Add Bookmark"}
        >
          {recipe?.bookmarked ? (
            <FaBookmark className="drop-shadow-[0_0_5px_rgba(0,0,0,1)]" />
          ) : (
            <FaRegBookmark className="drop-shadow-[0_0_5px_rgba(0,0,0,1)]" />
          )}
        </button>
      </div>

      {/* Recipe Details */}
      <div className="flex w-full mt-0.5 px-1">
        <div className="flex justify-between items-center w-full font-semibold">
          {/* Title */}
          <div className="flex w-[70%]">
            <Link href={`/recipe-card/${recipe?._id}`} className="flex w-full">
              {recipe?.title && recipe.title.length > 15 ? (
                <AutoScrollText
                  text={recipe.title}
                  className="text-[12px] leading-tight"
                  isFocused={isFocused}
                />
              ) : (
                <span className="text-[12px] leading-tight">
                  {recipe?.title || 'Untitled Recipe'}
                </span>
              )}
            </Link>
          </div>


          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(recipe);
            }}
            className="text-[#EC9556] hover:text-[#e8773c]"
            aria-label={
              recipe?.favorited ? "Remove Favorite" : "Add to Favorites"
            }
          >
            {recipe?.favorited ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      {/* Rating, Reviews, and Time */}
      <div className="flex flex-shrink w-full items-center text-[10px] mx-1">
        <div className="container flex items-center">
          <span className="mr-0.5 font-semibold">{recipe?.rating}</span>
          <FaStar className="text-[#EC9556]" />
          <span className="ml-0.5">({recipe?.reviewsCount || 0})</span>
          <span className="mx-0.5">•</span>
          <FaClock className="mr-0.5" />
          <span className="ml-0.5">{recipe?.totalTime} mins</span>
        </div>
      </div>

      {/* Chef Handle */}
      <div className="flex justify-end items-center text-[10px] font-semibold leading-tight mr-0.5">
        <div className="w-[65%]">
          {recipe?.handle?.length > 15 ? (
            <AutoScrollText
              text={recipe?.handle}
              className="text-right"
              isFocused={isFocused}
            />
          ) : (
            <span className="flex justify-end text-right mr-1">
              {recipe?.handle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
