import React, { useEffect, useState } from 'react';
import { FiAlertTriangle, FiEdit } from 'react-icons/fi'; // Import the edit icon
import { RiDeleteBin6Fill } from "react-icons/ri"; // Import the delete icon
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { motion } from 'framer-motion'; // Ensure Framer Motion is imported
import { useRouter } from 'next/navigation';

interface ShoppingItem {
  id: number;
  name: string;
  ingredients: number;
}

const ShoppingList: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: 1, name: 'Grilled Beef Creamy Sauce', ingredients: 29 },
    { id: 2, name: 'The All-American Breakfast Muffin', ingredients: 17 },
    { id: 3, name: 'Classic Spaghetti Carbonara', ingredients: 12 },
    { id: 4, name: 'Hawaiian Aloha Chicken Burger', ingredients: 7 },
    { id: 5, name: 'Avocado Veggie Rainbow Rolls', ingredients: 11 },
    { id: 6, name: 'Blueberry and Mint Ice Cream', ingredients: 9 },
    { id: 7, name: 'Sweet and Sour Pork', ingredients: 12 },
  ]);

  const [editedRecipes, setEditedRecipes] = useState<number[]>([]);
  const [editedIndexes, setEditedIndexes] = useState<number[]>([]);

  // On component mount, load edited recipe IDs from localStorage
  useEffect(() => {
    const storedEditedRecipes = JSON.parse(localStorage.getItem('editedRecipes') || '{}');
    const editedIds = Object.keys(storedEditedRecipes)
      .map((id) => parseInt(id))
      .filter((id) => storedEditedRecipes[id] === true); // Get only the recipes that are marked as edited
    setEditedRecipes(editedIds);

    const storedEditedIndexes = JSON.parse(localStorage.getItem('editedIngredients') || '[]');
    setEditedIndexes(storedEditedIndexes); // Set the indexes of edited ingredients
  }, []);

  const handleDelete = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const handleEdit = (name: string, id: number) => {
    if (name === 'Grilled Beef Creamy Sauce') {
      router.push('/cart-section/recipe-ingrediants');
    }

    // Only mark as edited if recipeEdited is true
    const isEdited = JSON.parse(localStorage.getItem('recipeEdited') || 'false');
    if (isEdited) {
      const updatedEditedRecipes = [...editedRecipes, id];
      setEditedRecipes(updatedEditedRecipes);
      localStorage.setItem('editedRecipes', JSON.stringify(updatedEditedRecipes));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 flex flex-col justify-between bg-transparent"
    >
      <div className='bg-[#f5f5f5]'>
        <SwipeableList>
          {items.map(item => (
            <SwipeableListItem
              key={item.id}

              // Swipe right to edit (with edit icon)
              swipeRight={{
                content: (
                  <div className="flex justify-center items-center bg-gradient-to-r from-[#EC9556] to-[#B64B29] text-white w-20 h-full rounded-md !bg-transparent">
                    <FiEdit size={32} />
                  </div>
                ),
                action: () => handleEdit(item.name, item.id),
              }}

              // Swipe left to delete
              swipeLeft={{
                content: (
                  <div className="flex justify-center items-center bg-gradient-to-r from-[#B64B29] to-[#EC9556] text-white w-20 h-full rounded-md !bg-transparent">
                    <RiDeleteBin6Fill size={32} />
                  </div>
                ),
                action: () => handleDelete(item.id),
              }}
            >
              <motion.div
                className="flex w-full items-center justify-between mb-3 rounded-lg border-gray-200 !bg-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ height: '80px' }}
              >
                <div className="w-16 h-16 bg-gray-300 flex items-center justify-center text-sm rounded-md">
                  64 x 64
                </div>
                <div className="flex-1 ml-4">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.ingredients} ingredients</p>
                </div>

                {/* Show the disclaimer icon only if the recipe has been edited */}
                {editedRecipes.includes(item.id) && editedIndexes?.length > 0 && (
                  <span className="disclaimer-icon" style={{ color: '#B64B29' }}>
                    <FiAlertTriangle size={20} />
                  </span>
                )}
              </motion.div>
            </SwipeableListItem>
          ))}
        </SwipeableList>
      </div>

      {/* Review Ingredients Button */}
      <motion.button
        className="bg-gradient-to-r from-[#B64B29] to-[#EC9556] text-white w-full py-3 rounded-lg text-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/cart-section/review-ingrediants')}
      >
        Review Ingredients
      </motion.button>
    </motion.div>
  );
};

export default ShoppingList;
