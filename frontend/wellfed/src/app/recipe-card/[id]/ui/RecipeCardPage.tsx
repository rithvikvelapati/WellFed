"use client";

import React, { useEffect, useState } from "react";
import Reviews from "@/components/RecipeCard/RCReviews";
import Timer from "@/components/RecipeCard/RCTimers";
import Header from "@/components/RecipeCard/RCHeader";
import Profile from "@/components/RecipeCard/RCProfileCard";
import Ingredients from "@/components/RecipeCard/RCIngredients";
import Nutrition from "@/components/RecipeCard/RCNutrition";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setModalOpen } from "@/store/modalSlice";
import { AnimatePresence, motion } from "framer-motion";
import { BASE_URL, GET_INGREDIENTS, GET_INSTRUCTIONS, GET_TOOLS, GET_NUTRITION, GET_RECEPIES } from "@/constants/api";
import { Ingredient, Instruction, Tool, NutritionData } from "@/types/types";

interface RecipeCardProps {
  recipeId: string;
}

const RecipeCardLayout = (props: RecipeCardProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [nutrition, setNutrition] = useState<NutritionData | null>(null);
  const [totalTime, setTotalTime] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("Loading...");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [servings, setServings] = useState<number>(1); // Added to store servings

  useEffect(() => {
    fetchIngredients();
    fetchInstructions();
    fetchTools();
    fetchNutrition();
    fetchRecipeDetails(); // Fetch title, description, category, imageUrl, and servings
    fetchTotalTime();
  }, []);

  const fetchIngredients = async () => {
    try {
      const ingredientsUrl = `${BASE_URL}${GET_INGREDIENTS}${props.recipeId}`;
      const response = await fetch(ingredientsUrl);
      if (!response.ok) throw new Error(`Failed to fetch ingredients. Status: ${response.status}`);
      const result = (await response.json()) as Ingredient[];
      setIngredients(result);
    } catch (error) {
      console.error("Error fetching ingredients data:", error);
    }
  };

  const fetchInstructions = async () => {
    try {
      const instructionsUrl = `${BASE_URL}${GET_INSTRUCTIONS}${props.recipeId}`;
      const response = await fetch(instructionsUrl);
      if (!response.ok) throw new Error(`Failed to fetch instructions. Status: ${response.status}`);
      const result = (await response.json()) as Instruction[];
      setInstructions(result);
    } catch (error) {
      console.error("Error fetching instructions data:", error);
    }
  };

  const fetchTools = async () => {
    try {
      const toolsUrl = `${BASE_URL}${GET_TOOLS}${props.recipeId}`;
      const response = await fetch(toolsUrl);
      if (!response.ok) throw new Error(`Failed to fetch tools. Status: ${response.status}`);
      const result = (await response.json()) as Tool[];
      setTools(result);
    } catch (error) {
      console.error("Error fetching tools data:", error);
    }
  };

  const fetchNutrition = async () => {
    try {
      const nutritionUrl = `${BASE_URL}${GET_NUTRITION}${props.recipeId}`;
      const response = await fetch(nutritionUrl);
      if (!response.ok) throw new Error(`Failed to fetch nutrition data. Status: ${response.status}`);
      const result = (await response.json()) as NutritionData;
      setNutrition(result);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
    }
  };

  const fetchTotalTime = async () => {
    try {
      const totalTimeUrl = `${BASE_URL}${GET_RECEPIES}${props.recipeId}`;
      const response = await fetch(totalTimeUrl);
      if (!response.ok) throw new Error(`Failed to fetch preparation time. Status: ${response.status}`);
      const result = await response.json();
      if (result && result.totalTime) {
        setTotalTime(result.totalTime);
      } else {
        console.warn("Preparation time not found in the response.");
        setTotalTime("N/A");
      }
    } catch (error) {
      console.error("Error fetching preparation time:", error);
      setTotalTime("N/A");
    }
  };

  const fetchRecipeDetails = async () => {
    try {
      const detailsUrl = `${BASE_URL}${GET_RECEPIES}${props.recipeId}`;
      const response = await fetch(detailsUrl);
      if (!response.ok) throw new Error(`Failed to fetch recipe details. Status: ${response.status}`);
      const result = await response.json();
      setTitle(result.title || "No Title");
      setDescription(result.description || "No Description");
      setCategory(result.category || "No Category");
      setImageUrl(`https://wellfedpics.blob.core.windows.net/recipie-images/${result.recipeId}-recipe.jpeg`);
      setServings(result.servings || 1); // Set servings from response
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      setTitle("N/A");
      setDescription("N/A");
      setCategory("Error loading category");
      setImageUrl("");
      setServings(1); // Default value on error
    }
  };

  useEffect(() => {
    dispatch(setModalOpen(true));
    return () => {
      dispatch(setModalOpen(false));
    };
  }, [dispatch]);

  const modalVariants = {
    initial: { x: "-100vw", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.5 } },
    exit: { x: "100vw", opacity: 0, transition: { type: "tween", duration: 0.5 } },
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 bg-white overflow-y-auto" variants={modalVariants} initial="initial" animate="animate" exit="exit">
        <Header title={title} category={category} description={description} imageUrl={imageUrl} />
        <Profile description={description} profilePic={""} name={""} recipes={0} location={""} />
        <Timer totalTime={totalTime} />
        <Ingredients ingredients={ingredients} instructions={instructions} tools={tools} servings={servings} /> {/* Pass servings as prop */}
        {nutrition && (
          <Nutrition
            calories={nutrition.calories}
            protein={nutrition.protein}
            fat={nutrition.fat}
            carbohydrates={nutrition.carbohydrates}
            recipeId={props.recipeId}
          />
        )}
        <Reviews />
      </motion.div>
    </AnimatePresence>
  );
};

export default RecipeCardLayout;
