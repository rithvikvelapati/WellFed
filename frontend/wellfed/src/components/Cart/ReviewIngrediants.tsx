'use client';

import React, { useState } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { motion } from 'framer-motion';

interface Ingredient {
  name: string;
  quantity: string;
  amount: number;
}

const ReviewIngredients: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: 'Beef Stock', quantity: '450 g', amount: 4 },
    { name: 'Soy Sauce', quantity: '6 tbsp', amount: 4 },
    { name: 'Cane Sugar', quantity: '2 tbsp', amount: 4 },
    { name: 'Ginger', quantity: '10 g', amount: 4 },
    { name: 'Garlic', quantity: '2 cloves', amount: 4 },
    { name: 'Green Onions', quantity: '3', amount: 4 },
    { name: 'Collard Greens', quantity: '3', amount: 4 },
    { name: 'Beef Stock', quantity: '450 g', amount: 4 },
    { name: 'Soy Sauce', quantity: '6 tbsp', amount: 4 },
    { name: 'Cane Sugar', quantity: '2 tbsp', amount: 4 },
    { name: 'Ginger', quantity: '10 g', amount: 4 },
    { name: 'Garlic', quantity: '2 cloves', amount: 4 },
    { name: 'Green Onions', quantity: '3', amount: 4 },
    { name: 'Collard Greens', quantity: '3', amount: 4 },
  ]);

  const [subtotal, setSubtotal] = useState(146.23); // Example subtotal, adjust as necessary

  // Handler for incrementing and decrementing amounts
  const handleAmountChange = (index: number, delta: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].amount = Math.max(1, updatedIngredients[index].amount + delta); // Minimum amount of 1
    setIngredients(updatedIngredients);
    // Recalculate subtotal here if necessary
  };

  // Handler for deleting an ingredient
  const handleDelete = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
    // Recalculate subtotal here if necessary
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md min-h-[87.5vh]">
      {/* Ingredient List */}
      <div className="mb-4 max-h-[70vh] overflow-auto">
        <p className="text-sm text-gray-500">30 ingredients</p>

        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex justify-between items-center mb-4 border-b pb-2 ">
            <div>
              <p className="text-lg font-semibold">{ingredient.name}</p>
              <p className="text-sm text-gray-500">{ingredient.quantity}</p>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center gap-2">
              <div className="flex">

              <button
                className="px-3 py-0 border border-[#B64B29] text-gray-600 w-12 rounded-l"
                onClick={() => handleAmountChange(index, -1)}
              >
                −
              </button>
              <button
                className="px-3 py-0 border border-[#B64B29] text-gray-600 w-12 rounded-r"
                onClick={() => handleAmountChange(index, 1)}
              >
                +
              </button>
              </div>
              <input
                type="text"
                value={ingredient.amount}
                readOnly
                className="w-10 h-10 text-center border border-gray-300 rounded"
              />
              

              {/* Delete Button */}
              <button
                className="ml-4 text-[#B64B29]"
                onClick={() => handleDelete(index)}
              >
                <RiDeleteBin6Fill size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="mt-2">
      <div className="flex justify-between items-center font-semibold border-t border-[#B64B29] pt-4 mb-4">
        <p>Estimated Subtotal</p>
        <p>${subtotal.toFixed(2)}</p>
      </div>

      {/* Continue to Checkout Button */}
      <motion.button
        className="w-full  bg-gradient-to-r from-[#B64B29] to-[#EC9556] text-white py-3 rounded-lg text-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => console.log('Proceed to Checkout')} // Adjust this action as needed
      >
        Continue to Checkout
      </motion.button>
      </div>
     
    </div>
  );
};

export default ReviewIngredients;
