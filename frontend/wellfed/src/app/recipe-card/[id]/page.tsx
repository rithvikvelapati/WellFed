"use client";

import React, { useEffect, useState } from "react";
import RecipeCardPage from "./ui/RecipeCardPage";
import { BASE_URL, GET_RECEPIES } from "@/constants/api";

const Page = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState<string | null>(null); // Type the error as string | null

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${BASE_URL}${GET_RECEPIES}${params.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch recipe: ${response.status}`);
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err: any) {  // Handle the error here by using 'err'
        setError(err.message); // Set the error message from 'err'
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
