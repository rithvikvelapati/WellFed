// constants/newsImages.ts

/**
 * @file newsImages.ts
 * @description Contains an array of news images and associated data for the NewsCardOpened page.
 */

import { ImageItem } from '@/types/types';

/**
 * An array of news images with titles, headings, and content blocks.
 * Used in the NewsCardOpened page to render the image carousel and article content.
 */
export const NEWS_IMAGES: ImageItem[] = [
  {
    url: '/images/news1.png',
    title: 'Breaking News 1',
    heading: 'Headline for News 1',
    content: [
      {
        type: 'paragraph',
        text: 'This is the first paragraph of news article 1.',
      },
      {
        type: 'image',
        src: '/images/news1-content.png',
        alt: 'News 1 Image',
      },
      // Add more content blocks as needed
    ],
  },
  {
    url: '/images/news2.png',
    title: 'Breaking News 2',
    heading: 'Headline for News 2',
    content: [
      {
        type: 'paragraph',
        text: 'This is the first paragraph of news article 2.',
      },
      {
        type: 'image',
        src: '/images/news2-content.png',
        alt: 'News 2 Image',
      },
      // Add more content blocks as needed
    ],
  },
  // Add more images and content as needed
];
