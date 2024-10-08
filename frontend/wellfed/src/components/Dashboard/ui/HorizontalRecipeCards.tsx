"use client";
import React, { useState } from "react";
import { recipesData } from "../../../constants";
import HorizontalScrollContainer from "@/components/HorizontalScrollContainer";
import RecipeCard from "@/components/RecipeCard";

const HorizontalRecipeCards: React.FC = () => {
  const [recipes, setRecipes] = useState(recipesData);

  // Log the recipesData to verify the data structure
  console.log(recipesData);

  // Function to toggle the favorite status
  const handleToggleFavorite = (id: number) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, favorited: !recipe.favorited } : recipe
      )
    );
  };

  // Function to toggle the bookmark status
  const handleToggleBookmark = (id: number) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, bookmarked: !recipe.bookmarked }
          : recipe
      )
    );
  };

  return (
    <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
      <div className="mb-2 pt-2 space-x-fluid-px">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onToggleFavorite={handleToggleFavorite}
            onToggleBookmark={handleToggleBookmark}
            className="drop-shadow-lg rounded-xl"
          />
        ))}
      </div>
    </HorizontalScrollContainer>
  );
};

export default HorizontalRecipeCards;
