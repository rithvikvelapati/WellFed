import React from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from './RecipeCard';

const recipes: Recipe[] = [
  { id: 1, title: 'Chicken Alfredo', image: '/CA.jpg', likes: 225, username: 'AiNoKitchen' },
  { id: 2, title: 'Mushroom Russitto', image: '/MR.jpg', likes: 223, username: 'AiNoKitchen' },
  { id: 3, title: 'Karelian Pie with Egg Butter', image: '/KP.jpg', likes: 300, username: 'AiNoKitchen' },
  { id: 4, title: 'Chicken Biryani', image: '/CB.jpg', likes: 450, username: 'AiNoKitchen' },
  // Additional recipes
];

const SuggestedRecipes: React.FC = () => {
  return (
    <div>
      <div className="flex overflow-x-auto scrollbar-hide">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedRecipes;
