// components/RecipeCard.tsx
import React from 'react';
import Image from "next/image";
import { FaHeart } from 'react-icons/fa';

// Define the Recipe interface directly here
interface Recipe {
  id: number;
  title: string;
  image: string;
  likes: number;
  username: string;
}

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md m-2 flex-none w-30 p-2">
      <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover rounded-lg" />
      <div className="mt-2 flex justify-between items-center">
        <div>
          <h5 className="text-xs font-sans">{recipe.title}</h5>
          <p className="text-xs text-gray-500 font-sans">@{recipe.username}</p>
        </div>
        <button className="text-red-500 flex items-center">
        <FaHeart className="text-red-500 mr-1" size={20}/>
          <span className="text-xs">{recipe.likes}</span>
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
export type { Recipe };  // Exporting the Recipe type if needed elsewhere
