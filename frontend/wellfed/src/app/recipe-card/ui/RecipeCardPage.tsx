"use client";

import React, { useEffect } from "react";
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

const RecipeCardLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Set modal open state to true when component mounts
  useEffect(() => {
    dispatch(setModalOpen(true));
    return () => {
      dispatch(setModalOpen(false));
    };
  }, [dispatch]);

  // Animation variants for sliding in from left to right
  const modalVariants = {
    initial: {
      x: "-100vw", // Start from the left
      opacity: 0
    },
    animate: {
      x: 0, // End at the center
      opacity: 1,
      transition: { type: "tween", duration: 0.5 }
    },
    exit: {
      x: "100vw", // Exit to the right
      opacity: 0,
      transition: { type: "tween", duration: 0.5 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Header />
        <Profile />
        <Timer />
        <Ingredients />
        <Nutrition />
        <Reviews />
      </motion.div>
    </AnimatePresence>
  );
};

export default RecipeCardLayout;
