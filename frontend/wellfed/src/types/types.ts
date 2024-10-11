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
