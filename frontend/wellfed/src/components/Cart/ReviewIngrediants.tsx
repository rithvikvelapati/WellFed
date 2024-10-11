import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Fill, RiErrorWarningLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

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
    { name: 'Beef Stock', quantity: '450 g', amount: 4 },
    { name: 'Soy Sauce', quantity: '6 tbsp', amount: 4 },
    { name: 'Cane Sugar', quantity: '2 tbsp', amount: 4 },
    { name: 'Ginger', quantity: '10 g', amount: 4 },
    { name: 'Garlic', quantity: '2 cloves', amount: 4 },
    { name: 'Green Onions', quantity: '3', amount: 4 },
  ]);

  const [originalIngredients, setOriginalIngredients] = useState<Ingredient[]>([]);
  const [subtotal, setSubtotal] = useState(146.23);
  const [editedIndexes, setEditedIndexes] = useState<number[]>([]);
  const [activePopUpIndex, setActivePopUpIndex] = useState<number | null>(null); // Track which pop-up is active

  // On mount, store the original ingredient quantities to compare against later
  useEffect(() => {
    setOriginalIngredients([...ingredients]); // Clone the original ingredients state
  }, []);

  // Fetch the edited ingredient indexes from localStorage
  useEffect(() => {
    const storedEditedIndexes = JSON.parse(localStorage.getItem('editedIngredients') || '[]');
    setEditedIndexes(storedEditedIndexes); // Set the indexes of edited ingredients
  }, []);

  // Handler for incrementing and decrementing amounts
  const handleAmountChange = (index: number, delta: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].amount = Math.max(1, updatedIngredients[index].amount + delta); // Minimum amount of 1
    setIngredients(updatedIngredients);

    // Once an ingredient is flagged as edited, it remains flagged
    if (!editedIndexes.includes(index)) {
      setEditedIndexes([...editedIndexes, index]);
      localStorage.setItem('editedIngredients', JSON.stringify([...editedIndexes, index]));
    }

    // Recalculate subtotal here if necessary
  };

  // Handler for deleting an ingredient
  const handleDelete = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);

    // Remove the index from editedIndexes if the ingredient is deleted
    const newEditedIndexes = editedIndexes.filter(i => i !== index);
    setEditedIndexes(newEditedIndexes);
    localStorage.setItem('editedIngredients', JSON.stringify(newEditedIndexes));

    // Recalculate subtotal here if necessary
  };

  // Function to handle click event to show/hide pop-up
  const togglePopUp = (index: number) => {
    setActivePopUpIndex(activePopUpIndex === index ? null : index); // Toggle the pop-up visibility
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md min-h-[87.5vh]">
      {/* Ingredient List */}
      <div className="mb-4 max-h-[70vh] overflow-auto">
        <p className="text-sm text-gray-500">{ingredients.length} ingredients</p>

        {ingredients.map((ingredient, index) => (
          <div key={index} className="relative flex justify-between items-center mb-4 border-b pb-2">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{ingredient.name}</p>
              <p className="text-sm text-gray-500">{ingredient.quantity}</p>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center gap-2">
              {editedIndexes.includes(index) && (
                <>
                  <FiAlertTriangle
                    className="text-[#B64B29] cursor-pointer"
                    size={20}
                    onClick={() => togglePopUp(index)} // Click event to toggle pop-up
                  />

                  {/* Conditional pop-up display when clicked */}
                  {activePopUpIndex === index && (
                    <div
                      className="absolute z-50 mt-2 w-[320px] bg-white border border-[#B64B29] p-4 rounded-lg shadow-lg"
                      style={{ top: '100%', left: '50%', transform: 'translate(-50%, 0)' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <RiErrorWarningLine className="text-[#B64B29]" size={20} /> {/* Adjust icon size */}
                        <h4 className="text-[#B64B29] text-md font-semibold">Recipe Ingredients Missing</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        You might not have the necessary ingredients to complete some recipes.
                      </p>
                      <button
                        className="absolute top-2 right-2 text-gray-500"
                        onClick={() => togglePopUp(null)} // Close pop-up
                      >
                        ✖
                      </button>
                    </div>
                  )}
                </>
              )}

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
                onClick={() => handleDelete(index)} // Updated deletion logic
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

          {/* Line between the text and subtotal */}
          <div className="flex-grow mx-2 border-t border-gray-300"></div>

          <p>${subtotal.toFixed(2)}</p>
        </div>

        {/* Continue to Checkout Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-[#B64B29] to-[#EC9556] text-white py-3 rounded-lg text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => console.log('Proceed to Checkout')}
        >
          Continue to Checkout
        </motion.button>
      </div>
    </div>
  );
};

export default ReviewIngredients;
