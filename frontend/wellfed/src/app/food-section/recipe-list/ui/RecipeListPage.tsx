"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setModalOpen } from "@/store/modalSlice";
import HorizontalScrollContainer from "@/components/HorizontalScrollContainer";
import RecipeSearchBar from "./RecipeSearchBar";
import ToggleButtonGroup from "./ToggleButtonGroup";
import FilterButton from "./FilterButton";
import { Recipe, categories } from "@/constants";
import CategoryCard from "./CategoryCard";
import HorizontalRecipeCards from "@/components/Dashboard/ui/HorizontalRecipeCards";
import { BASE_URL, GET_RECEPIES, GET_SAVED_RECEPIES, PUT_FAV_RECEPIES } from "@/constants/api";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SavedRecipe } from "@/components/RecipeCard";

const RecipeListPage = () => {
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [savedRecipesData, setSavedRecipesData] = useState<SavedRecipe[]>([]);

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
      if (recipes?.length) {
        fetchSavedRecipesData(recipes);
      } else {
        setRecipesData([]);
      }
    } catch (error) {
      console.error("Error fetching recipes data:", error);
    }
  };

  const fetchSavedRecipesData = async (recipes: Recipe[]) => {
    try {
      const savedRecipesUrl = BASE_URL + GET_SAVED_RECEPIES + user?.id;
      const response = await fetch(savedRecipesUrl);
      const savedRecipes = await response.json();

      recipes.forEach((recipe) => {
        const isSaved = savedRecipes.find(
          (savedRecipe: SavedRecipe) => savedRecipe.recipeId === recipe._id
        );
        recipe.favorited = !!isSaved; // Mark as favorited if found in saved recipes
      });

      setRecipesData([...recipes]);
      setSavedRecipesData(savedRecipes);
    } catch (error) {
      console.error("Error fetching saved recipes data:", error);
    }
  };

  const handleToggleFavorite = async (recipe: Recipe) => {
    try {
      const url = BASE_URL + PUT_FAV_RECEPIES + recipe._id;
      const body = {
        recipeId: recipe._id,
        userId: user?.id,
      };

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (result) {
        fetchRecipesData();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  // const [isModalOpen, setIsModalOpen] = useState(true);
  // const dispatch = useDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   dispatch(setModalOpen(true));
  //   return () => {
  //     dispatch(setModalOpen(false));
  //   };
  // }, [dispatch]);

  // Animation variants for sliding in from right to left
  const pageVariants = {
    initial: {
      x: "100vw", // Start from right
      opacity: 0
    },
    in: {
      x: 0, // End at center
      opacity: 1,
      transition: { type: "tween", duration: 0.5 }
    },
    out: {
      x: "100vw", // Slide out to the right when closing
      opacity: 0,
      transition: { type: "tween", duration: 0.5 }
    }
  };

  // Close modal by simulating a back navigation or state change
  // const handleClose = () => {
  //   setIsModalOpen(false);
  //   dispatch(setModalOpen(false)); // Update Redux state
  //   setTimeout(() => router.back(), 500); // Use a delay to match animation before navigating back
  // };

  return (
    <AnimatePresence>
      {/* {isModalOpen && ( */}
      <motion.div
        // className="absolute top-0 left-0 w-full h-full bg-white z-50"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <div className="relative w-full h-full">
          {/* Back Button */}
          {/* <button
              onClick={handleClose}
              className="absolute top-4 left-4 py-2 mb-4 focus:outline-none"
            >
              <IoIosArrowBack className="text-2xl text-slate-700" />
            </button> */}

          {/* Content Container with Top Padding */}
          <div className="pt-2">
            <div className="flex mx-2 items-center w-full mb-4">
              {/* Search Bar */}
              <div className="flex-grow">
                <RecipeSearchBar />
              </div>
              {/* Filter Button */}
              <FilterButton />
            </div>
            {/* Toggle Button Group */}
            <div className="mx-2 flex space-x-fluid-px">
              <ToggleButtonGroup />
            </div>
            {/* Categories Section */}
            <section className="mb-4">
              <div className="flex justify-between items-center ml-2 mb-2">
                <h2 className="text-fluid-lg font-semibold">Categories</h2>
                {/* see all section for categories to be added at a later time */}
                {/* <button
                    className="flex items-center text-slate-500 text-fluid-sm"
                    onClick={() => router.push('/categories')}
                  >
                    See All <IoIosArrowForward className="ml-1" />
                  </button> */}
              </div>
              {/* Categories Content */}
              <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
                {/* Replace with your RecipeCard components */}
                <div className="snap-start flex px-1 mb-3 ">
                  {/* Example Cards */}
                  {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                  {/* Add more cards as needed */}
                </div>
              </HorizontalScrollContainer>
            </section>

            {/* Appetizers Section */}
            <section id="/#appetizers" className="mb-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-fluid-lg font-semibold">Appetizers</h2>
                {/* <button
                  className="flex items-center text-slate-500 text-fluid-sm"
                  onClick={() => router.push("/")}
                >
                  See All <IoIosArrowForward className="ml-1" />
                </button> */}
              </div>
              {/* Trending Now Content */}
              <div className="snap-start flex px-1 ml-1 mb-3 ">
                <HorizontalRecipeCards recipesData={recipesData} savedRecipesData={savedRecipesData} handleToggleFavorite={handleToggleFavorite}  type="appetizer"  />
              </div>
            </section>

            {/* Breakfast Section */}
            <section id="breakfast" className="mb-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-fluid-lg font-semibold">Breakfast</h2>
                {/* <button
                  className="flex items-center text-slate-500 text-fluid-sm"
                  onClick={() => router.push("/recent-recipes")}
                >
                  See All <IoIosArrowForward className="ml-1" />
                </button> */}
              </div>
              {/* Recent Recipes Content */}
              <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
                <div className="snap-start flex px-2 ml-2">
                  <HorizontalRecipeCards recipesData={recipesData} savedRecipesData={savedRecipesData} handleToggleFavorite={handleToggleFavorite}  type="breakfast" />
                </div>
              </HorizontalScrollContainer>
            </section>

            {/* Lunch Section */}
            <section id="lunch" className="mb-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-fluid-lg font-semibold">Lunch</h2>
                {/* <button
                  className="flex items-center text-slate-500 text-fluid-sm"
                  onClick={() => router.push("/recent-recipes")}
                >
                  See All <IoIosArrowForward className="ml-1" />
                </button> */}
              </div>
              {/* Recent Recipes Content */}
              <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
                <div className="snap-start flex px-2 ml-2">
                  <HorizontalRecipeCards recipesData={recipesData} savedRecipesData={savedRecipesData} handleToggleFavorite={handleToggleFavorite}  type="lunch" />
                </div>
              </HorizontalScrollContainer>
            </section>

            {/* Dinner Section */}
            <section id="desserts" className="mb-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-fluid-lg font-semibold">Dinner</h2>
                {/* <button
                  className="flex items-center text-slate-500 text-fluid-sm"
                  onClick={() => router.push("/recent-recipes")}
                >
                  See All <IoIosArrowForward className="ml-1" />
                </button> */}
              </div>
              {/* Recent Recipes Content */}
              <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
                <div className="snap-start flex px-2 ml-2">
                  <HorizontalRecipeCards recipesData={recipesData} savedRecipesData={savedRecipesData} handleToggleFavorite={handleToggleFavorite}  type="dinner" />
                </div>
              </HorizontalScrollContainer>
            </section>

            {/* Desserts Section */}
            <section id="beverages" className="mb-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-fluid-lg font-semibold">Desserts</h2>
                {/* <button
                  className="flex items-center text-slate-500 text-fluid-sm"
                  onClick={() => router.push("/recent-recipes")}
                >
                  See All <IoIosArrowForward className="ml-1" />
                </button> */}
              </div>
              {/* Recent Recipes Content */}
              <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
                <div className="snap-start flex px-2 ml-2">
                  <HorizontalRecipeCards recipesData={recipesData} savedRecipesData={savedRecipesData} handleToggleFavorite={handleToggleFavorite}  type="dessert" />
                </div>
              </HorizontalScrollContainer>
            </section>

            {/* Beverages Section */}
            <section id="breakfast" className="mb-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-fluid-lg font-semibold">Beverages</h2>
                {/* <button
                  className="flex items-center text-slate-500 text-fluid-sm"
                  onClick={() => router.push("/recent-recipes")}
                >
                  See All <IoIosArrowForward className="ml-1" />
                </button> */}
              </div>
              {/* Recent Recipes Content */}
              <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
                <div className="snap-start flex px-2 ml-2">
                  <HorizontalRecipeCards recipesData={recipesData} savedRecipesData={savedRecipesData} handleToggleFavorite={handleToggleFavorite}  type="drink" />
                </div>
              </HorizontalScrollContainer>
            </section>

            {/* Chicken Section */}
            <section id="breakfast" className="mb-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-fluid-lg font-semibold">Chicken</h2>
                {/* <button
                  className="flex items-center text-slate-500 text-fluid-sm"
                  onClick={() => router.push("/recent-recipes")}
                >
                  See All <IoIosArrowForward className="ml-1" />
                </button> */}
              </div>
              {/* Recent Recipes Content */}
              <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
                <div className="snap-start flex px-2 ml-2">
                  <HorizontalRecipeCards recipesData={recipesData} savedRecipesData={savedRecipesData} handleToggleFavorite={handleToggleFavorite}  type="chicken" />
                </div>
              </HorizontalScrollContainer>
            </section>

            {/* Fish Section */}
            <section id="breakfast" className="mb-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-fluid-lg font-semibold">Fish</h2>
                {/* <button
                  className="flex items-center text-slate-500 text-fluid-sm"
                  onClick={() => router.push("/recent-recipes")}
                >
                  See All <IoIosArrowForward className="ml-1" />
                </button> */}
              </div>
              {/* Recent Recipes Content */}
              <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
                <div className="snap-start flex px-2 ml-2">
                  <HorizontalRecipeCards recipesData={recipesData} savedRecipesData={savedRecipesData} handleToggleFavorite={handleToggleFavorite}  type="fish" />
                </div>
              </HorizontalScrollContainer>
            </section>

            {/* beef Section */}
            <section id="breakfast" className="mb-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-fluid-lg font-semibold">Beef</h2>
                {/* <button
                  className="flex items-center text-slate-500 text-fluid-sm"
                  onClick={() => router.push("/recent-recipes")}
                >
                  See All <IoIosArrowForward className="ml-1" />
                </button> */}
              </div>
              {/* Recent Recipes Content */}
              <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
                <div className="snap-start flex px-2 ml-2">
                  <HorizontalRecipeCards recipesData={recipesData} savedRecipesData={savedRecipesData} handleToggleFavorite={handleToggleFavorite}  type="beef" />
                </div>
              </HorizontalScrollContainer>
            </section>


            {/* vegetarian Section */}
            <section id="snacks" className="mb-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-fluid-lg font-semibold">Vegetarian</h2>
                {/* <button
                  className="flex items-center text-slate-500 text-fluid-sm"
                  onClick={() => router.push("/recent-recipes")}
                >
                  See All <IoIosArrowForward className="ml-1" />
                </button> */}
              </div>
              {/* Recent Recipes Content */}
              <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
                <div className="snap-start flex px-2 ml-2">
                  <HorizontalRecipeCards recipesData={recipesData} savedRecipesData={savedRecipesData} handleToggleFavorite={handleToggleFavorite}  type="vegetarian" />
                </div>
              </HorizontalScrollContainer>
            </section>
          </div>
        </div>
      </motion.div>
      {/* //   )} */}
    </AnimatePresence>
  );
};

export default RecipeListPage;
