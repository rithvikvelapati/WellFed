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

/**
 * Represents an ingredient with a name and optional quantity.
 */
export interface Ingredient {
  name: string;
  quantity?: string;
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
