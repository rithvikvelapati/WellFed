"use client";
import React, { useEffect, useState } from "react";
import HorizontalScrollContainer from "@/components/HorizontalScrollContainer";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "../../../constants";
import { BASE_URL, GET_RECEPIES, GET_SAVED_RECEPIES, PUT_FAV_RECEPIES } from "@/constants/api";
import { SavedRecipe } from "@/components/RecipeCard";
import { useUser } from "@clerk/nextjs";

const HorizontalRecipeCards: React.FC<any> = (props) => {
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [savedRecipesData, setSavedRecipesData] = useState<SavedRecipe[]>([]);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      fetchRecipesData();
    }
  }, [isSignedIn, user]);

  const fetchRecipesData = async () => {
    try {
      const recipeUrl = BASE_URL + GET_RECEPIES;
      const response = await fetch(recipeUrl);
      const recipes = await response.json();
      if (recipes?.length) {
        fetchSavedRecipesData(recipes);
      } else {
        setRecipesData([]);
      }
    } catch (error) {
      console.error("Error fetching recipes data:", error);
    }
  };

  const fetchSavedRecipesData = async (recipes: Recipe[]) => {
    try {
      const savedRecipesUrl = BASE_URL + GET_SAVED_RECEPIES + user?.id;
      const response = await fetch(savedRecipesUrl);
      const savedRecipes = await response.json();

      recipes.forEach((recipe) => {
        const isSaved = savedRecipes.find(
          (savedRecipe: SavedRecipe) => savedRecipe.recipeId === recipe._id
        );
        recipe.favorited = !!isSaved; // Mark as favorited if found in saved recipes
      });

      setRecipesData([...recipes]);
      setSavedRecipesData(savedRecipes);
    } catch (error) {
      console.error("Error fetching saved recipes data:", error);
    }
  };

  const handleToggleFavorite = async (recipe: Recipe) => {
    try {
      const url = BASE_URL + PUT_FAV_RECEPIES + recipe._id;
      const body = {
        recipeId: recipe._id,
        userId: user?.id,
      };

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (result) {
        fetchRecipesData();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
      <div className="mb-2 pt-2 space-x-fluid-px">
        {recipesData.length > 0 ? (
          recipesData
            .filter((dt) =>
              props.type
                ? dt.category?.toLowerCase().includes(props.type.toLowerCase())
                : true
            )
            .map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                savedRecipesData={savedRecipesData}
                onToggleFavorite={handleToggleFavorite}
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
