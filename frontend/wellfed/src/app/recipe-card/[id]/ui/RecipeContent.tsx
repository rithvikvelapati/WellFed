// components/ui/RecipeContent.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Ingredient, Instruction, Recipe, Tool } from "@/types/types";
import { motion, AnimatePresence } from "framer-motion";
import { FaCamera, FaCheckCircle } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";
import { useRouter } from "next/navigation";

interface RecipeContentProps {
  recipe: Recipe;
  currentStepIndex: number;
  tools: Tool[];
  ingredients: Ingredient[];
  instructions: Instruction[];
}

/**
 * RecipeContent Component
 * Displays ingredients, tools, and the instruction of the current recipe step.
 * Ingredients and tools remain visible during steps but are hidden on the last slide.
 */
const RecipeContent: React.FC<RecipeContentProps> = ({
  tools,
  ingredients,
  instructions,
  recipe,
  currentStepIndex,
}) => {
  const [ingredient, setIngredient] = useState(ingredients[0]);
  const [instruction, setInstruction] = useState(instructions[0] as any);
  // Animation variants
  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  useEffect(() => {

    setIngredient(ingredients[currentStepIndex]);
    setInstruction(instructions.find(ins => ins.stepNumber === currentStepIndex + 1))


  }, [currentStepIndex])

  // Determine if we are on the last slide
  const isLastSlide = currentStepIndex >= ingredients.length;
  const router = useRouter();
  const handleClick = () => {
    return router.push("/");
  }

  return (
    <div className="bg-white w-auto h-auto p-4 z-50">
      {/* Conditionally render ingredients and tools */}
      {!isLastSlide && (
        <>
          {/* Recipe Title */}
          <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>

          {/* Ingredients Section */}
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 m-fluid-px">
              <FaCheckCircle className="text-slate-500 w-5 h-5" />
            </div>
            <p>
              {ingredients.map((ingredient, index) => (
                <React.Fragment key={index}>
                  <span className="font-bold">{ingredient.title}</span>
                  {ingredient.quantity ? ` - ${ingredient.quantity}` : ""}
                  {index < ingredients.length - 1 && " - "}
                </React.Fragment>
              ))}
            </p>
          </div>

          {/* Tools Section */}
          {tools?.length > 0 &&
            <div className="flex items-start mb-4">
              <div className=" w-6 h-6 m-fluid-px">
                <GiCookingPot className="text-slate-500 w-6 h-6" />

              </div>

              <p>
                {tools.map((tool, index) => (
                  <React.Fragment key={index}>
                    {tool.name}
                    {index < recipe.tools.length - 1 && " - "}
                  </React.Fragment>
                ))}
              </p>

            </div>
          }

          {/* Divider */}
          <hr className="my-4" />
        </>
      )}

      {/* Current Step Instruction or Completion Message */}
      <AnimatePresence>
        {!isLastSlide ? (
          <motion.div
            key={currentStepIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-2">
              {`Step ${currentStepIndex + 1}`}
            </h3>
            <p className="text-base">
              {instruction?.instruction}
            </p>
          </motion.div>
        ) : (
          // Content for the last slide (Recipe Complete)
          <motion.div
            key="complete"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col text-center justify-center items-center">
              <figure className="container w-auto my-8">
                <FaCamera className="text-6xl text-slate-400" />
              </figure>
              <h2 className="text-2xl font-bold mb-4">Hooray it&apos;s completed!</h2>
              <p className="text-base mb-6 max-w-80">
                Does your dish look delicious to enjoy? Share and show pictures of your cuisine to the world
              </p>
              <div className=" flex flex-col justify-center w-44 h-12 space-y-fluid-px mt-8">
                <button
                  onClick={() => {
                    /* Handle Take a Photo action */
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl focus:outline-none drop-shadow-lg"
                >
                  Take a Picture
                </button>
                <button
                  onClick={() => {
                    handleClick();
                  }}
                  className="px-4 py-2 bg-slate-200 text-primary rounded-2xl focus:outline-none drop-shadow-lg"
                >
                  skip
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipeContent;
