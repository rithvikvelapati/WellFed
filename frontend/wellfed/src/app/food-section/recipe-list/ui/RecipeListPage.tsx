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
import { categories } from "@/constants";
import CategoryCard from "./CategoryCard";
import HorizontalRecipeCards from "@/components/Dashboard/ui/HorizontalRecipeCards";

const RecipeListPage = () => {
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

            {/* TAppetizers Section */}
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
                <HorizontalRecipeCards />
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
                  <HorizontalRecipeCards />
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
                  <HorizontalRecipeCards />
                </div>
              </HorizontalScrollContainer>
            </section>

            {/* Breakfast Section */}
            <section id="dinner" className="mb-4">
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
                  <HorizontalRecipeCards />
                </div>
              </HorizontalScrollContainer>
            </section>

            {/* Breakfast Section */}
            <section id="desserts" className="mb-4">
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
                  <HorizontalRecipeCards />
                </div>
              </HorizontalScrollContainer>
            </section>

            {/* Breakfast Section */}
            <section id="beverages" className="mb-4">
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
                  <HorizontalRecipeCards />
                </div>
              </HorizontalScrollContainer>
            </section>

            {/* Breakfast Section */}
            <section id="snacks" className="mb-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-fluid-lg font-semibold">Snacks</h2>
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
                  <HorizontalRecipeCards />
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
