// constants/recipes.ts

import { Recipe } from '@/types/types';

/**
 * Sample recipe data for demonstration purposes.
 */
export const SAMPLE_RECIPE: Recipe = {
  title: 'Classic Pancakes',
  ingredients: [
    { name: 'All-purpose flour', quantity: '1 1/2 cups' },
    { name: 'Baking powder', quantity: '3 1/2 teaspoons' },
    { name: 'Salt', quantity: '1 teaspoon' },
    { name: 'White sugar', quantity: '1 tablespoon' },
    { name: 'Milk', quantity: '1 1/4 cups' },
    { name: 'Egg', quantity: '1' },
    { name: 'Butter (melted)', quantity: '3 tablespoons' },
    { name: 'Vanilla extract', quantity: '1 teaspoon' },
  ],
  tools: [
    'Mixing bowl',
    'Whisk',
    'Measuring cups and spoons',
    'Frying pan or griddle',
    'Spatula',
  ],
  steps: [
    {
      stepNumber: 1,
      imageUrl: '/images/recipes/step1.png',
      instruction: 'In a large mixing bowl, sift together the flour, baking powder, salt, and sugar.',
    },
    {
      stepNumber: 2,
      imageUrl: '/images/recipes/step2.png',
      instruction: 'Make a well in the center and pour in the milk, egg, melted butter, and vanilla extract.',
    },
    {
      stepNumber: 3,
      imageUrl: '/images/recipes/step3.png',
      instruction: 'Mix until smooth, but do not overmix. Some lumps are okay.',
    },
    {
      stepNumber: 4,
      imageUrl: '/images/recipes/step4.png',
      instruction: 'Heat a lightly oiled frying pan over medium-high heat. Pour or scoop the batter onto the pan.',
    },
    {
      stepNumber: 5,
      imageUrl: '/images/recipes/step5.png',
      instruction: 'Cook until bubbles form and the edges are dry. Flip and cook until golden brown on the other side.',
    },
  ],
};
