
"use client";

import React, { useEffect, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  setMonth,
  eachDayOfInterval,
} from "date-fns";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaCalendarDay } from "react-icons/fa";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen, setInviteModalOpen } from "@/store/modalSlice";
import AddRecipePopup from "./AddRecipePopup";
import InviteModal from "@/components/EditEvent/InviteModal";
import { Recipe, recipeCard } from "@/constants";
import { RiDeleteBinFill } from "react-icons/ri";
import { RootState } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useAppState } from "@/context/AppState";

// Helper function to generate time slots
const generateTimeSlots = (interval: number) => {
  const times = [];
  let start = 0; // Start at 00:00 (midnight)
  let end = 24 * 60; // End at 24:00

  for (let i = start; i < end; i += interval) {
    const hours = Math.floor(i / 60);
    const minutes = i % 60;
    const timeString = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes === 0 ? "00" : minutes
      } ${hours >= 12 ? "PM" : "AM"}`;
    times.push(timeString);
  }

  return times;
};

const AddEvent: React.FC = () => {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]); // State to store selected recipes
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("12:00 PM");
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { setSharedState, sharedState } = useAppState();

  const { isSignedIn, user } = useUser();

  const [isMeal, setIsMeal] = useState(true);


  const isInviteModalOpen = useSelector(
    (state: RootState) => state.modal.isInviteModalOpen
  );

  // Set modal open state to true when component mounts
  useEffect(() => {
    dispatch(setModalOpen(true));
    return () => {
      dispatch(setModalOpen(false));
    };
  }, [dispatch]);

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

  const handleClose = () => {
    router.push("/calendar-section"); // Navigate back to the previous page
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    const newMonth = Number(event.target.value) - 1; // Convert to 0-based month index
    setCurrentMonth(setMonth(currentMonth, newMonth));
  };

  const handleDateChange = (day: Date) => {
    setSelectedDate(day);
  };

  const timeSlots = generateTimeSlots(30);

  const handleInviteModalOpen = () => {
    dispatch(setInviteModalOpen(true));
  };

  const handleInviteModalClose = () => {
    dispatch(setInviteModalOpen(false));
  };

  const handleAddAttendeesDetails = () => {
    if(isSignedIn && sharedState) {
      const meal = {
        title: title,
        date: currentMonth,
        time: {
          start: startTime,
          end: endTime
        },
        recipes: selectedRecipes?.map(recipe => recipe._id),
        notes: notes,
        createdBy: user.id,
        createdAt: new Date(),
        updatedBy: user.id,
        updatedAt: new Date()
      }
      sharedState.meal = meal;
      setSharedState({...sharedState})
      router.push("/calendar-section/meal-details", );
    }
   
  };

  const handleRecipeSelect = (recipes: Recipe[]) => {
    setSelectedRecipes(recipes); // Directly set the updated recipes list
  };

  const [isRecipePopupOpen, setRecipePopupOpen] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={handleClose}
            className="pl-2 focus:outline-none"
            aria-label="Close Modal"
          >
            <IoIosArrowBack className="text-2xl text-gray-700 mt-4" />
          </button>
          <h2 className="text-3xl font-semibold mt-6 mb-2">New Schedule</h2>
          <p className="text-xl mt-5 mr-3">Cancel</p>
        </div>
        <div className="mt-5">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md shadow-emerald-600">
            {/* Toggle Buttons */}
            <div className="flex items-center justify-between rounded-md p-1 px-12 mb-8">
              <button className="w-1/2 py-2 text-center font-medium bg-gradient-to-r shadow-[3px_1px_7px_1px_#dcdcdc] from-[#B64B29] to-[#EC9556] text-white rounded-l-xl">
                New Meal
              </button>
              <button className="w-1/2 py-2 text-center font-medium shadow-[3px_1px_7px_1px_#dcdcdc] rounded-r-xl">
                New Event
              </button>
            </div>
            <div className="rounded-t-[2.5rem] shadow-[0px_0px_15px_5px_#dcdcdc] p-6">
              {/* Month Selector */}
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-xl">Date</p>
                <Select
                  labelId="month-select-label"
                  id="month-select"
                  value={currentMonth.getMonth() + 1} // Use 1-based month for Select
                  onChange={handleMonthChange}
                  className="h-8 border-none"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {format(new Date(0, i), "MMMM")}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={handlePrevMonth}
                    className="text-gray-600 font-medium"
                  >
                    {"<"}
                  </button>
                  <span className="text-lg font-semibold">
                    {format(currentMonth, "MMMM yyyy")}
                  </span>
                  <button
                    onClick={handleNextMonth}
                    className="text-gray-600 font-medium"
                  >
                    {">"}
                  </button>
                </div>

                {/* Date Slider */}
                <div className="overflow-x-auto">
                  <div className="flex space-x-4">
                    {daysInMonth.map((day) => (
                      <div
                        key={day.toISOString()}
                        className="flex flex-col items-center"
                      >
                        <span
                          className={`py-2.5 px-1 rounded-t-full font-semibold text-center min-w-[40px] ${selectedDate &&
                            format(selectedDate, "yyyy-MM-dd") ===
                            format(day, "yyyy-MM-dd")
                            ? "bg-secondary text-primary"
                            : "text-black"
                            }`}
                        >
                          {format(day, "EEE")}
                        </span>
                        <button
                          className={`py-2.5 px-2.5 rounded-b-full min-w-[40px] ${selectedDate &&
                            format(selectedDate, "yyyy-MM-dd") ===
                            format(day, "yyyy-MM-dd")
                            ? "bg-secondary text-primary"
                            : "text-gray-500"
                            }`}
                          onClick={() => handleDateChange(day)}
                        >
                          {format(day, "dd")}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Selector */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Time</h2>
                <div className="flex items-center space-x-4 gap-3">
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-xl shadow-md"
                  >
                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <span>to</span>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-xl shadow-md"
                  >
                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Title</h2>
                <textarea
                  value={title} // Bind to title state
                  onChange={(e) => setTitle(e.target.value)} // Update title state
                  className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 leading-5 placeholder-gray-500"
                  rows={1}
                  placeholder="Add Title..."
                />
              </div>


              {/* Add Recipe Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Add Recipe</h2>
                {selectedRecipes.map((recipe) => (
                  <div
                    key={recipe._id}
                    className="pt-6 rounded-lg flex justify-between items-center mb-4"
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mr-4">
                        <img
                          src={`https://wellfedpics.blob.core.windows.net/recipie-images/${recipe.recipeId}-recipe.jpeg`}
                          alt={recipe.title}
                          className="w-full h-full rounded-lg object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-md">{recipe.title}</h3>
                      </div>
                    </div>
                    <button
                      className="text-[#B64B29] text-2xl"
                      onClick={() => {
                        const updatedRecipes = selectedRecipes.filter((r) => r._id !== recipe._id);
                        setSelectedRecipes(updatedRecipes); // Update parent state
                      }}
                    >
                      <RiDeleteBinFill />
                    </button>

                  </div>
                ))}
                <button
                  className="flex items-center justify-center w-9 h-9 bg-slate-100 rounded-full text-xl font-black text-slate-600 shadow-md"
                  onClick={() => setRecipePopupOpen(true)}
                >
                  +
                </button>
              </div>

              {/* Notes Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Notes</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={5}
                  placeholder="Add notes..."
                />
              </div>

              {/* Add Attendees Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Add Attendees</h2>
                <button
                  className="flex items-center justify-center w-9 h-9 bg-slate-100 rounded-full text-xl font-black text-slate-600 shadow-md"
                  onClick={handleInviteModalOpen}
                >
                  +
                </button>
                <button
                  className="mt-3 flex items-center justify-center w-full py-2 px-4 bg-slate-100 text-primary font-semibold rounded-xl shadow-md"
                >
                  <HiMiniUserGroup className="mr-2" /> Add Family
                </button>
              </div>
              <div className="flex justify-center items-center py-4">
                <button
                  className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xl flex items-center border border-gray-400 rounded-lg px-4 py-2 hover:bg-gray-100"
                  onClick={handleAddAttendeesDetails}
                >
                  Finalize Meal
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {isRecipePopupOpen && (
        <AddRecipePopup
          onClose={() => setRecipePopupOpen(false)}
          onRecipeSelect={handleRecipeSelect}
          preSelectedRecipes={selectedRecipes} // Pass selected recipes
        />
      )}

      <InviteModal
        isInviteModalOpen={isInviteModalOpen}
        handleModalClose={handleInviteModalClose}
      />
    </AnimatePresence>
  );
};

export default AddEvent;
