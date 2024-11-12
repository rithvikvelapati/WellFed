"use client";

import React from 'react'
import RecipeCardPage from './ui/RecipeCardPage';

const page = ({params}: {params: {id: string}}) => {
  return <RecipeCardPage recipeId={params.id} />;
}

export default page
