"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import RecipeStepCarousel from "./RecipeStepCarousel";
import RecipeContent from "./RecipeContent";
import { SAMPLE_RECIPE } from "@/constants/recipes";
import { AnimatePresence, motion } from "framer-motion";
import NotificationIcon from "@/components/TopBar/NotificationIcon";
import CartIcon from "@/components/TopBar/CartIcon";
import { useDispatch } from "react-redux";
import { setModalOpen } from "@/store/modalSlice";
import { BASE_URL, GET_INGREDIENTS, GET_INSTRUCTIONS, GET_RECEPIES, GET_TOOLS } from "@/constants/api";
import { Recipe } from "@/constants";
import { Ingredient, Instruction, Tool } from "@/types/types";

interface RecipeStepsProps {
  recipeId: string;
}

const RecipeSteps: React.FC<RecipeStepsProps> = (props: RecipeStepsProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [recipe, setRecipe] = useState(undefined);

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState<Instruction[]>([]);

  const [tools, setTools] = useState<Tool[]>([]);

  // Animation variants for sliding in from left to right
  const modalVariants = {
    initial: {
      x: "-100vw", // Start from the left
      opacity: 0,
    },
    animate: {
      x: 0, // End at the center
      opacity: 1,
      transition: { type: "tween", duration: 0.5 },
    },
    exit: {
      x: "100vw", // Exit to the right
      opacity: 0,
      transition: { type: "tween", duration: 0.5 },
    },
  };

  useEffect(() => {
    fetchRecipeDetails(); 
    fetchIngredients();
    fetchInstructions();
    fetchTools();
    fetchRecipeDetails();
  }, [props.recipeId]);

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

  const fetchRecipeDetails = async () => {
    try {
      const detailsUrl = `${BASE_URL}${GET_RECEPIES}${props.recipeId}`;
      const response = await fetch(detailsUrl);
      if (!response.ok) throw new Error(`Failed to fetch recipe details. Status: ${response.status}`);
      const result = await response.json();
      setRecipe(result)
      console.log(result)
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleBack = () => {
    // Dispatch closeModal action before navigating back
    dispatch(setModalOpen(false));
    router.back();
  };

  useEffect(() => {
    // Dispatch openModal action when component mounts
    dispatch(setModalOpen(true));

    // Cleanup function to dispatch closeModal when component unmounts
    return () => {
      dispatch(setModalOpen(false));
    };
  }, [dispatch]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Top Bar with Back and Icons */}
        <div className="relative flex items-center z-50 px-1">
          <div className="bg-white flex flex-col justify-items-start mb-1 px-1 pt-8 w-full">
            <button
              onClick={handleBack}
              className="focus:outline-none"
              aria-label="Close Recipe Modal"
            >
              <IoIosArrowBack className="text-2xl text-slate-900" />
            </button>
            <div className="absolute right-1 bottom-0 flex space-x-fluid-px">
              <NotificationIcon />
              <CartIcon />
            </div>
          </div>
        </div>

        {/* Recipe Step Carousel */}
        {recipe &&
        <RecipeStepCarousel
          ingredients={ingredients}
          instructions={instructions}
          tools={tools}
          recipe={recipe}
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
        />
      }

        {/* Recipe Content */}
        {recipe && instructions?.length && ingredients?.length &&
        <RecipeContent
        ingredients={ingredients}
        instructions={instructions}
        tools={tools}
        recipe={recipe}
          currentStepIndex={currentStepIndex}
        />
      }
      </motion.div>
    </AnimatePresence>
  );
};

export default RecipeSteps;
