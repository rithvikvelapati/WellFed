"use client";
import React from "react";
import HorizontalScrollContainer from "@/components/HorizontalScrollContainer";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "../../../constants";
import { SavedRecipe } from "@/components/RecipeCard";

interface HorizontalRecipeCardsProps {
  recipesData: Recipe[];
  type: string;
  savedRecipesData: SavedRecipe[];
  handleToggleFavorite: (recipie: Recipe) => void
}

const HorizontalRecipeCards: React.FC<HorizontalRecipeCardsProps> = (props) => {
  return (
    <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
      <div className="mb-2 pt-2 space-x-fluid-px">
        {(props.recipesData || []).length > 0 ? (
          (props.recipesData || [])
            .filter((dt) =>
              props.type
                ? dt.category?.toLowerCase().includes(props.type.toLowerCase())
                : true
            )
            .map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                savedRecipesData={props.savedRecipesData}
                onToggleFavorite={props.handleToggleFavorite}
                className="drop-shadow-lg rounded-xl" onToggleBookmark={function (id: number): void {
                  throw new Error("Function not implemented.");
                } }              />
            ))
        ) : (
          <div>No recipes found.</div>
        )}
      </div>
    </HorizontalScrollContainer>
  );
};

export default HorizontalRecipeCards;
