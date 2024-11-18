"use client";
import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from 'react-icons/fa';
import Link from 'next/link';
import { Ingredient, Instruction, Tool } from "@/types/types";

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
  instructions: Instruction[];
  tools: Tool[];
  servings: number; // Accept servings as a prop
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  ingredients,
  instructions,
  tools,
  servings: initialServings, // Use servings from parent as initial state
}) => {
  const [servings, setServings] = useState<number>(initialServings);
  const [adjustedIngredients, setAdjustedIngredients] = useState<Ingredient[]>(ingredients);

  useEffect(() => {
    setServings(initialServings); // Update state if prop changes
  }, [initialServings]);

  useEffect(() => {
    // Calculate new ingredient quantities when servings change
    const newIngredients = ingredients.map(ingredient => ({
      ...ingredient,
      quantity: (ingredient.quantity / initialServings) * servings, // Adjust the quantity based on new servings without rounding
    }));
    setAdjustedIngredients(newIngredients);
  }, [servings, initialServings, ingredients]);

  const [activeTab, setActiveTab] = useState('Ingredients');

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleServingsChange = (change: number) => () => {
    const newServings = Math.max(1, servings + change);
    setServings(newServings);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Tabs */}
      <div className="w-full max-w-[300px] mx-auto bg-gray-200 rounded-full p-1 flex justify-around">
        {['Ingredients', 'Tools', 'Instructions'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`flex-1 py-2 rounded-full text-[13px] transition duration-300 ${
              activeTab === tab ? 'text-black bg-white' : 'text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full mx-auto p-4">
        {activeTab === 'Ingredients' && (
          <>
            {/* Servings Control */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-[15px] font-semibold">{servings} Servings</span>
              <div className="flex border border-[#B64B29] rounded-md">
                <button
                  onClick={handleServingsChange(-1)}
                  className="px-3 py-1 border-r border-[#B64B29] text-[#B64B29] hover:bg-[#B64B29] hover:text-white transition"
                >
                  <FaMinus />
                </button>
                <button
                  onClick={handleServingsChange(1)}
                  className="px-3 py-1 text-[#B64B29] hover:bg-[#B64B29] hover:text-white transition"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Ingredients List */}
            <ul>
              {adjustedIngredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between items-center py-1">
                  <span>
                    {ingredient.quantity.toFixed(2)} {ingredient.unit} {ingredient.title} {/* Display with two decimal places */}
                  </span>
                </li>
              ))}
            </ul>

            {/* Add to Shopping Cart Button */}
            <div className="flex justify-center items-center mt-6">
              <Link href="/" passHref>
                <div className="flex justify-center items-center">
                  <button className="relative bg-white hover:bg-[#DADADA] font-bold py-2 px-4 rounded-full border-2 transition duration-300 ease-in-out text-lg shadow-lg" style={{ width: '358px' }}>
                    <span className="bg-clip-text text-transparent text-[18px]" style={{ backgroundImage: 'linear-gradient(to right, #B64B29, #EC9556)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      <span className="ml-2">Add to Shopping Cart</span>
                    </span>
                  </button>
                </div>
              </Link>
            </div>
          </>
        )}

        {activeTab === 'Tools' && (
          <ul>
            {tools && tools.length > 0 ? (
              tools.map((tool, index) => (
                <li key={tool._id || index} className="py-1">
                  {tool.name}
                </li>
              ))
            ) : (
              <li className="py-1">No tools available.</li>
            )}
          </ul>
        )}

        {activeTab === 'Instructions' && (
          <ol className="list-decimal list-inside">
            {instructions && instructions.length > 0 ? (
              instructions.map((instruction, index) => (
                <li key={instruction._id || index} className="py-1">
                  {instruction.instruction}
                </li>
              ))
            ) : (
              <li className="py-1">No instructions available.</li>
            )}
          </ol>
        )}
      </div>
    </div>
  );
};

export default RecipeIngredients;
