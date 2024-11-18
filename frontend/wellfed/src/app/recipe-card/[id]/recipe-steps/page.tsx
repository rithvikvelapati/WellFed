"use client";

import React from 'react'
import RecipeStepsPage from '../ui/RecipeStepsPage';

const page = ({params}: {params: {id: string}}) => {
  return <RecipeStepsPage recipeId={params.id} />;
}

export default page
