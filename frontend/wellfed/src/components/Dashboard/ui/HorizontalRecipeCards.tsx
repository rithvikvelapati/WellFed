"use client";
import React, { useState } from "react";
import { Recipe, recipesData } from "../../../constants";
import HorizontalScrollContainer from "@/components/HorizontalScrollContainer";
import RecipeCard from "@/components/RecipeCard";

const HorizontalRecipeCards: React.FC<any> = (props) => {
  //const [recipes, setRecipes] = useState(props.recipesData as any || []);

  // Log the recipesData to verify the data structure
  console.log(recipesData);

  // Function to toggle the favorite status
  const handleToggleFavorite = (id: Recipe) => {
    props.handleToggleFavorite(id)
    
  };

  // Function to toggle the bookmark status
  const handleToggleBookmark = (id: number) => {
    // setRecipes((prevRecipes: any) =>
    //   prevRecipes.map((recipe: any) =>
    //     recipe.id === id
    //       ? { ...recipe, bookmarked: !recipe.bookmarked }
    //       : recipe
    //   )
    // );
  };

  return (
    <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
      <div className="mb-2 pt-2 space-x-fluid-px">
        {props.recipesData.map((recipe: any) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            savedRecipesData={props.savedRecipesData}
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
