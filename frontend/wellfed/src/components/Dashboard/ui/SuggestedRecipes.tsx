'use client';
import React, { useState } from 'react';
import { recipesData } from '../../../constants';
import HorizontalScrollContainer from '@/components/HorizontalScrollContainer';
import RecipeCard from '@/components/RecipeCard';

const SuggestedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState(recipesData);

  // Log the recipesData to verify the data structure
  console.log(recipesData);

  const toggleFavorite = (id: number) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, favorited: !recipe.favorited } : recipe
      )
    );
  };

  const toggleBookmark = (id: number) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, bookmarked: !recipe.bookmarked } : recipe
      )
    );
  };

  return (
    <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          toggleFavorite={toggleFavorite}
          toggleBookmark={toggleBookmark}
        />
      ))}
    </HorizontalScrollContainer>
  );
};

export default SuggestedRecipes;
