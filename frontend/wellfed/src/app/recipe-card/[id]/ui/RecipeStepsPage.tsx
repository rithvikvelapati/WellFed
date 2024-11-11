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

const RecipeSteps: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

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
        <RecipeStepCarousel
          recipe={SAMPLE_RECIPE}
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
        />

        {/* Recipe Content */}
        <RecipeContent
          recipe={SAMPLE_RECIPE}
          currentStepIndex={currentStepIndex}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default RecipeSteps;
