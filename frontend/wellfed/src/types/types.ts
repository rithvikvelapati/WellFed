// types/types.ts

/**
 * @file types.ts
 * @description Defines TypeScript interfaces and types used throughout the application.
 */

/**
 * Represents a content block within an article.
 */
export interface ContentBlock {
  type: 'paragraph' | 'image';
  text?: string;
  src?: string;
  alt?: string;
}

/**
 * Represents an image item for the image carousel.
 */
export interface ImageItem {
  url: string;
  title: string;
  heading: string;
  content: ContentBlock[];
}

/**
 * Represents a single step in a recipe.
 */
export interface RecipeStep {
  stepNumber: number;
  imageUrl: string;
  instruction: string;
}

export interface Recipe {
  _id: string; // MongoDB ObjectId as a string
  recipeId: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  preparationTime: string | number; // Adapted based on potential format in data
  servings: number;
  rating: number;
  reviewsCount: number;
  authorId: string;
  createdAt: string; // Date as a string (ISO format)
  updatedAt: string; // Date as a string (ISO format)
  createdBy: string;
  updatedBy: string;
  totalTime: number;
  quickTips: string;
}




/**
 * Represents an ingredient with a name and optional quantity.
 */
export interface Ingredient {
  name: string;
  _id: string; // Unique identifier for the ingredient
  recipeId: string; // Identifier for the associated recipe
  title: string; // Name of the ingredient
  quantity: number; // Quantity of the ingredient
  unit: string; // Unit of measurement (e.g., tbsp, g, ml)
  createdBy: string; // User who created the entry
  updatedBy: string; // User who last updated the entry
}

export interface Instruction {
  tools: any;
  _id: string;
  recipeId: string;
  stepNumber: number;
  instruction: string;
  imageUrl?: string;
  createdBy: string;
  updatedBy: string;
}

export interface Tool {
  _id: string; // Unique identifier for the ingredient
  recipeId: string; // Identifier for the associated recipe
  name: string; // Name of the ingredient
  createdBy: string; // User who created the entry
  updatedBy: string; // User who last updated the entry
}

export interface NutritionData {
  _id: string;
  recipeId: string;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}





/**
 * Represents a recipe with steps, ingredients, and tools.
 */
export interface Recipe {
  title: string;
  ingredients: Ingredient[];
  tools: string[];
  steps: RecipeStep[];
}
