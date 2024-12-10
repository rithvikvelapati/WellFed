"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { Recipe } from "@/constants";
import { BASE_URL, GET_RECEPIES } from "@/constants/api";
import { useUser } from "@clerk/nextjs";
import RecipeCard from "@/components/RecipeCard";

const AddRecipePopup: React.FC<{
  onClose: () => void;
  onRecipeSelect: (recipes: Recipe[]) => void;
}> = ({ onClose, onRecipeSelect }) => {
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRecipes, setSelectedRecipes] = useState<Set<Recipe>>(new Set());
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      fetchRecipesData();
    }
  }, [isSignedIn, user]);

  const fetchRecipesData = async () => {
    try {
      const recipeUrl = BASE_URL + GET_RECEPIES;
      const response = await fetch(recipeUrl);
      const recipes = await response.json();
      setRecipesData(recipes);
      setFilteredRecipes(recipes);
    } catch (error) {
      console.error("Error fetching recipes data:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = recipesData.filter(
      (recipe) =>
        recipe.title?.toLowerCase().includes(query) ||
        recipe.description?.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  const handleCheckboxChange = (recipe: Recipe) => {
    setSelectedRecipes((prev) => {
      const updated = new Set(prev);
      if (updated.has(recipe)) {
        updated.delete(recipe);
      } else {
        updated.add(recipe);
      }
      return updated;
    });
  };

  const handleAddRecipes = () => {
    onRecipeSelect(Array.from(selectedRecipes));
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white h-screen w-screen overflow-y-auto"
        variants={{
          initial: { x: "100vw", opacity: 0 },
          animate: { x: 0, opacity: 1, transition: { type: "spring", duration: 0.5 } },
          exit: { x: "100vw", opacity: 0, transition: { type: "spring", duration: 0.5 } },
        }}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <button
            onClick={onClose}
            className="p-2 text-xl text-gray-600"
            aria-label="Go Back"
          >
            <IoIosArrowBack />
          </button>
          <h2 className="text-xl font-bold">Add Recipe</h2>
          <div className="w-8"></div>
        </div>

        {selectedRecipes.size > 0 && (
          <section className="p-4 bg-gray-100 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">Selected Recipes</h3>
            <div className="grid grid-cols-4 gap-4">
              {Array.from(selectedRecipes).map((recipe) => (
                <div key={recipe._id} className="relative">
                  <button
                    className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 z-10"
                    onClick={() => handleCheckboxChange(recipe)}
                  >
                    ✕
                  </button>
                  <RecipeCard
                    recipe={recipe}
                    onToggleFavorite={() => {}}
                    onToggleBookmark={() => {}}
                    savedRecipesData={[]}
                    size="extra-small"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="p-4">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <section className="p-4">
          <h3 className="text-lg font-semibold mb-4">Recipes</h3>
          <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[70vh]">
            {filteredRecipes.map((recipe) => (
              <div key={recipe._id} className="relative">
                <input
                  type="checkbox"
                  className="absolute top-2 left-2 z-10 w-5 h-5"
                  checked={selectedRecipes.has(recipe)}
                  onChange={() => handleCheckboxChange(recipe)}
                />
                <RecipeCard
                  recipe={recipe}
                  onToggleFavorite={() => {}}
                  onToggleBookmark={() => {}}
                  savedRecipesData={[]}
                />
              </div>
            ))}
          </div>
        </section>

        {selectedRecipes.size > 0 && (
          <div className="p-4 fixed bottom-0 w-full bg-white shadow-md">
            <button
              onClick={handleAddRecipes}
              className="w-full py-3 text-white bg-primary rounded-lg font-bold hover:bg-primary-dark"
            >
              Add Recipes ({selectedRecipes.size})
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AddRecipePopup;
