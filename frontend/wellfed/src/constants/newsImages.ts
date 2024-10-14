// constants/newsImages.ts

/**
 * @file newsImages.ts
 * @description Contains an array of news images and associated data for the NewsCardOpened page.
 */

import { ImageItem } from "@/types/types";

/**
 * An array of news images with titles, headings, and content blocks.
 * Used in the NewsCardOpened page to render the image carousel and article content.
 */
export const NEWS_IMAGES: ImageItem[] = [
  {
    url: "/images/news1.png",
    title: "The Rise of Plant-Based Diets",
    heading: "How Plant-Based Eating is Transforming Health and Wellness",
    content: [
      {
        type: "paragraph",
        text: "Plant-based diets have gained significant popularity in recent years, with more people embracing the health benefits of consuming fruits, vegetables, legumes, and whole grains. Nutritionists highlight that a well-planned plant-based diet can provide all the necessary nutrients while reducing the risk of chronic diseases."
      },
      {
        type: "image",
        src: "/images/news1-content.png",
        alt: "A colorful assortment of fresh vegetables and fruits"
      },
      {
        type: "paragraph",
        text: "Restaurants and food companies are responding to this trend by offering more plant-based options. From vegan burgers to dairy-free cheeses, the variety of delicious alternatives is expanding rapidly."
      },
      {
        type: "paragraph",
        text: "Experts suggest that even reducing meat consumption slightly can have positive impacts on personal health and the environment."
      }
    ]
  },
  {
    url: "/images/news2.png",
    title: "Superfoods You Should Include in Your Diet",
    heading: "Top 10 Nutrient-Dense Foods for Optimal Health",
    content: [
      {
        type: "paragraph",
        text: "Superfoods are nutrient-rich foods considered to be especially beneficial for health and well-being. Incorporating them into your daily diet can boost your energy levels, improve immune function, and promote overall wellness."
      },
      {
        type: "image",
        src: "/images/news2-content.png",
        alt: "Assortment of superfoods like berries, nuts, and seeds"
      },
      {
        type: "paragraph",
        text: "Some of the top superfoods include blueberries, kale, quinoa, chia seeds, and salmon. These foods are packed with antioxidants, vitamins, and essential fatty acids."
      },
      {
        type: "paragraph",
        text: "Nutritionists recommend adding a variety of superfoods to your meals to ensure a balanced intake of nutrients."
      }
    ]
  }
  // Add more images and content as needed
];
