// app/recipe-card/[id]/page.tsx

import React from 'react';
import RecipeCardPage from './ui/RecipeCardPage';

const Page = ({ params }: { params: { id: string } }) => {
  return <RecipeCardPage recipeId={params.id} />;
};

export default Page;

export async function generateStaticParams() {
  // Fetch a list of recipes to generate paths
  const response = await fetch('http://localhost:3001/recipe');
  const recipes = await response.json();

  return recipes.map((recipe: { _id: string }) => ({
    id: recipe._id, // Ensure this matches your data structure
  }));
}
