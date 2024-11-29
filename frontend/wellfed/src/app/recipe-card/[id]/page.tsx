"use client";

import React, { useEffect, useState } from "react";
import RecipeCardPage from "./ui/RecipeCardPage";

const Page = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3001/recipe/${params.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch recipe: ${response.status}`);
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(error);
      }
    };

    fetchRecipe();
  }, [params.id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return <RecipeCardPage recipeId={(recipe as any)._id} />;
};

export default Page;
