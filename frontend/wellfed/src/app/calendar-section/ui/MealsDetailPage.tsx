// components/MealDetailsPage.tsx

"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { FaCalendarDay, FaChevronDown } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdOutlineAddCircle } from "react-icons/md";
import EditDetailsModal from "@/components/EventCalender/EditDetailsModal";
import InviteModal from "@/components/EditEvent/InviteModal";
import Image from "next/image";
import { format } from "date-fns";
import { Recipe, recipeCard } from "@/constants";
import {
  setModalOpen,
  setEditDetailsModalOpen,
  setInviteModalOpen,
} from "@/store/modalSlice";
import { RootState } from "@/store/store";
import { useAppState } from "@/context/AppState";
import { BASE_URL, POST_MEAL } from "@/constants/api";

const MealDetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { setSharedState, sharedState } = useAppState();
  const meal = sharedState?.meal;

  // Use Redux to track modal states
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const isEditDetailsModalOpen = useSelector(
    (state: RootState) => state.modal.isEditDetailsModalOpen
  );
  const isInviteModalOpen = useSelector(
    (state: RootState) => state.modal.isInviteModalOpen
  );

  const people = [
    { name: "John Doe", avatar: "/Profile1.svg" },
    { name: "Jane Doe", avatar: "/Profile2.svg" },
    { name: "Amanda Lockwood", avatar: "/Profile3.svg" },
  ];

  const [reminderTime, setReminderTime] = React.useState("15 minutes before");

  // Set main modal open state when component mounts
  useEffect(() => {
    dispatch(setModalOpen(true));
    return () => {
      dispatch(setModalOpen(false));
    };
  }, [dispatch]);

  // Animation variants for sliding in from left to right
  const modalVariants = {
    initial: {
      x: "-100vw", // Start from the left
      opacity: 0,
    },
    animate: {
      x: 0, // Slide to the center
      opacity: 1,
      transition: { type: "tween", duration: 0.5 },
    },
    exit: {
      x: "100vw", // Slide out to the right
      opacity: 0,
      transition: { type: "tween", duration: 0.5 },
    },
  };

  const createMeal = async () => {
    try {
      const profileUpdateUrl = BASE_URL + POST_MEAL;

      const body = sharedState?.meal;

      await fetch(profileUpdateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      dispatch(setModalOpen(false));
      router.push("/calendar-section");
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleClose = () => {


    console.log(sharedState)
    createMeal();


  };

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  const handleReminderChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setReminderTime(e.target.value);
  };

  const handleEditDetailsModalClose = () => {
    dispatch(setEditDetailsModalOpen(false));
  };

  const handleInviteModalOpen = () => {
    dispatch(setInviteModalOpen(true));
  };

  const handleInviteModalClose = () => {
    dispatch(setInviteModalOpen(false));
  };

  function handleDeleteRecipe(recipeId: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      {/* Main Modal */}
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 bg-white h-screen w-auto overflow-y-auto"
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Back Button and Date Content */}
          <div className="flex flex-col items-center justify-center pt-4">
            <button
              onClick={handleBack}
              className="absolute top-4 left-4 p-2 focus:outline-none"
              aria-label="Close Modal"
            >
              <IoIosArrowBack className="text-2xl text-slate-700" />
            </button>
            <div className="text-center my-4">
              <h2 className="text-3xl font-semibold mt-5 mb-2">
                {meal?.date ? format(new Date(meal.date), "EEEE") : ""}
              </h2>
              <p className="text-xl">
                {meal?.date ? format(new Date(meal.date), "dd MMMM yyyy") : ""}
              </p>
            </div>
          </div>



          {/* Meal Details */}
          <div className="h-screen rounded-t-[2.5rem] shadow-md p-2 mt-4 z-50">
            {/* Title */}
            <h3 className="font-bold text-2xl px-2 py-2 text-center border-t border-b border-gray-400">
              {meal?.title}
            </h3>


            {/* Meal details content */}
            {meal?.recipes?.length > 0 &&
              meal.recipes.map((recipe: Recipe, index: number) => (
                <div
                  key={recipe.id || index}
                  className="pt-6 rounded-lg flex justify-between items-center mb-4 px-6"
                >
                  {/* Recipe Image */}
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mr-4">
                      <img
                        src={`https://wellfedpics.blob.core.windows.net/recipie-images/${recipe.recipeId}-recipe.jpeg`}
                        alt={recipe.title || "Unnamed Recipe"}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    </div>
                    {/* Recipe Title */}
                    <div>
                      <h3 className="font-bold text-md">{recipe.title || "Unnamed Recipe"}</h3>
                    </div>
                  </div>
                  {/* Delete Button */}
                  <button className="text-[#B64B29] text-2xl">
                    <RiDeleteBinFill />
                  </button>
                </div>
              ))}


            {/* Time Section */}
            <div className="mt-6 px-6">
              <label className="block font-bold text-gray-700">Time</label>
              <p className="mt-2 text-gray-600">
                {meal?.time?.start} - {meal?.time?.end}
              </p>
            </div>

            {/* Notes Section */}
            <div className="mt-6 px-6">
              <label className="block font-bold text-gray-700">Notes</label>
              <p className="mt-2 text-gray-500 text-sm md:text-base">
                {meal?.notes}
              </p>
            </div>

            {/* Add to Calendar */}
            <div className="flex flex-col space-y-4 mt-10 px-6">
              <button
                className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center justify-center shadow-md"
                onClick={handleClose}
              >
                Add to Calendar
                <FaCalendarDay className="ml-3 text-xl" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* EditDetailsModal */}
      <EditDetailsModal
        isEditDetailsModalOpen={isEditDetailsModalOpen}
        handleModalClose={handleEditDetailsModalClose}
      />

      {/* InviteModal */}
      <InviteModal
        isInviteModalOpen={isInviteModalOpen}
        handleModalClose={handleInviteModalClose}
      />
    </>
  );

};

export default MealDetailsPage;
