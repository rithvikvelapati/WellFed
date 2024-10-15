// components/ui/RecipeStepCarousel.tsx

"use client";

import React from "react";
import Image from "next/image";
import { Recipe } from "@/types/types";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { FaFlagCheckered } from "react-icons/fa";

interface RecipeStepCarouselProps {
  recipe: Recipe;
  currentStepIndex: number;
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * RecipeStepCarousel Component
 * Displays the image of the current recipe step and allows navigation between steps.
 * The last slide is an additional slide with a flag icon.
 */
const RecipeStepCarousel: React.FC<RecipeStepCarouselProps> = ({
  recipe,
  currentStepIndex,
  setCurrentStepIndex,
}) => {
  const totalSlides = recipe.steps.length + 1; // Steps + completion slide

  const goToPrevious = () => {
    const index =
      currentStepIndex === 0 ? totalSlides - 1 : currentStepIndex - 1;
    setCurrentStepIndex(index);
  };

  const goToNext = () => {
    const index =
      currentStepIndex === totalSlides - 1 ? 0 : currentStepIndex + 1;
    setCurrentStepIndex(index);
  };

  // Handlers for swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="relative w-full h-64 drop-shadow-lg overflow-hidden"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          {/* Image */}
          {currentStepIndex < recipe.steps.length ? (
            <Image
              src={recipe.steps[currentStepIndex].imageUrl}
              alt={`Step ${recipe.steps[currentStepIndex].stepNumber}`}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            // Last slide (Recipe Complete)
            <div className="w-full h-full bg-slate-50 flex items-center justify-center">
              <Image src="/images/recipes/endinglogo.png" alt={"company logo"} width={390} height={300} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Step Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center px-4">
        <div className="flex items-center w-full max-w-xl">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <React.Fragment key={index}>
              {/* Connector Line */}
              {index !== 0 && (
                <div className="flex-1 h-0.5 bg-slate-50"></div>
              )}

              {/* Step Circle */}
              <button
                onClick={() => setCurrentStepIndex(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border focus:outline-none ${
                  index === currentStepIndex
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "bg-slate-600 text-white"
                }`}
                aria-label={
                  index < recipe.steps.length
                    ? `Go to step ${index + 1}`
                    : "Recipe Complete"
                }
              >
                {index < recipe.steps.length ? (
                  index + 1
                ) : (
                  <FaFlagCheckered className="text-lg" />
                )}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeStepCarousel;
