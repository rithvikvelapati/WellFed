import React from "react";
import Reviews from "@/components/RecipeCard/RCReviews";
import Timer from "@/components/RecipeCard/RCTimers";
import Header from "@/components/RecipeCard/RCHeader";
import Profile from "@/components/RecipeCard/RCProfileCard";
import Ingredients from "@/components/RecipeCard/RCIngredients";
import Nutrition from "@/components/RecipeCard/RCNutrition";

const RecipeCardLayout = () => {
  return (
    <div>
      <Header />
      <Profile />
      <Timer />
      <Ingredients />
      <Nutrition />
      <Reviews />
    </div>
  );
};

export default RecipeCardLayout;
