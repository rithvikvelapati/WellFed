import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";

interface Ingredient {
  name: string;
  quantity: string;
  checked: boolean; // Track whether the ingredient is checked
}

const RecipeIngredients: React.FC = () => {
  const [servings, setServings] = useState(4);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: 'Beef Stock', quantity: '450 g', checked: true },
    { name: 'Soy Sauce', quantity: '6 tbsp', checked: true },
    { name: 'Cane Sugar', quantity: '2 tbsp', checked: true },
    { name: 'Ginger', quantity: '10 g', checked: true },
    { name: 'Garlic', quantity: '2 cloves', checked: true },
    { name: 'Green Onions', quantity: '3', checked: true },
  ]);

  const [originalIngredients, setOriginalIngredients] = useState<Ingredient[]>([]);

  // Load persisted ingredients from localStorage on component mount
  useEffect(() => {
    const savedIngredients = localStorage.getItem('ingredients');
    if (savedIngredients) {
      const parsedIngredients = JSON.parse(savedIngredients);
      setIngredients(parsedIngredients);
      setOriginalIngredients(parsedIngredients); // Store the original state once
    } else {
      setOriginalIngredients([...ingredients]); // Store initial ingredients as original
    }
  }, [ingredients]);

  // Save ingredients to localStorage on change
  const saveIngredients = (updatedIngredients: Ingredient[]) => {
    localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
  };

  // Track which ingredients are unchecked and store the indexes in localStorage
  const checkIfRecipeEdited = (updatedIngredients: Ingredient[]) => {
    const editedIndexes = updatedIngredients
      .map((ingredient, index) => (!ingredient.checked ? index : null))
      .filter(index => index !== null); // Get indexes of unchecked ingredients
    localStorage.setItem('editedIngredients', JSON.stringify(editedIndexes));
  };

  // Check if there are any changes in the ingredients compared to original
  const hasRecipeChanged = (updatedIngredients: Ingredient[]) => {
    return updatedIngredients.some((ingredient, index) =>
      ingredient.checked !== originalIngredients[index]?.checked
    );
  };

  // Handle checkbox toggle
  const handleToggleCheck = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].checked = !updatedIngredients[index].checked;

    setIngredients(updatedIngredients);
    saveIngredients(updatedIngredients); // Persist updated state in localStorage

    // Track changes and store edited ingredients
    checkIfRecipeEdited(updatedIngredients);

    // Update the edited flag based on changes
    const isEdited = hasRecipeChanged(updatedIngredients);
    localStorage.setItem('recipeEdited', JSON.stringify(isEdited));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Image Section */}
      <div className="relative w-full h-[250px] mb-4">
        <Image
          src="/appetizers.png"
          alt="Appetizer"
          className="absolute top-0 left-0 w-full h-full object-cover"
          width={100}
          height={100}
        />
        {/* Servings Control at the Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white px-4 py-2 flex justify-between items-center">
          <p className="text-white">Servings</p>
          <div className="flex items-center">
            <button
              className="px-4 py-1 border border-white text-white rounded-l-lg"
              onClick={() => setServings(Math.max(1, servings - 1))} // Prevent servings from going below 1
            >
              -
            </button>
            <p className="px-4">{servings}</p>
            <button
              className="px-4 py-1 border border-white text-white rounded-r-lg"
              onClick={() => setServings(servings + 1)}
            >
              +
            </button>
          </div>
        </div>

      </div>

      {/* Ingredients List */}
      <div className="p-4">
        <p className="text-lg font-semibold mb-4">Ingredients</p>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-800">{ingredient.name}</p>
                <p className="text-gray-500">{ingredient.quantity}</p>
              </div>
              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ingredient.checked}
                    onChange={() => handleToggleCheck(index)}
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${ingredient.checked ? 'bg-[#EC9556] border-[#EC9556]' : 'border-gray-300'
                      }`}
                  >
                    {ingredient.checked && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between items-center p-4 gap-2">
        <button className="flex items-center gap-2 border-2 border-[#B64B29] text-transparent bg-clip-text bg-gradient-to-r from-[#B64B29] to-[#EC9556] py-2 px-6 rounded-full text-md font-semibold shadow-md hover:bg-orange-50 hover:shadow-lg transition-all duration-300 min-w-[150px] h-12">
          Remove Recipe
        </button>
        <button className="flex items-center gap-2 bg-gradient-to-r from-[#B64B29] to-[#EC9556] text-white py-2 px-6 rounded-full text-md font-semibold shadow-md hover:shadow-lg transition-all duration-300 min-w-[150px] h-12">
          Add to Cart
          <MdOutlineShoppingCart className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default RecipeIngredients;
