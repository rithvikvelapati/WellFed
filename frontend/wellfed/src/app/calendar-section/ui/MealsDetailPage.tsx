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
import {
  setModalOpen,
  setEditDetailsModalOpen,
  setInviteModalOpen,
} from "@/store/modalSlice";
import { RootState } from "@/store/store";

const MealDetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleClose = () => {
    dispatch(setModalOpen(false));
    router.push("/calendar-section");
  };

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  const handleReminderChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setReminderTime(e.target.value);
  };

  // Handle modal open and close through Redux actions
  const handleEditDetailsModalOpen = () => {
    dispatch(setEditDetailsModalOpen(true));
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
          {/* Back Button */}
          <div className="flex gap-16 pl-2 pt-4">
            <button
              onClick={handleBack}
              className="p-2 focus:outline-none"
              aria-label="Close Modal"
            >
              <IoIosArrowBack className="text-2xl text-slate-700" />
            </button>
            <div className="my-4">
              <h2 className="text-3xl font-semibold mt-5 mb-2">
                Wednesday
              </h2>
              <p className="text-xl">
                28 September 2024{" "}
                <FaChevronDown className="inline ml-2 text-sm" />
              </p>
            </div>
          </div>

          {/* Meal Details */}
          <div className="h-screen rounded-t-[2.5rem] shadow-md p-2 mt-4 z-50">
            {/* Meal details content */}
            <div className="pt-6 rounded-lg flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mr-4">
                  <p className="text-xs">64 x 64</p>
                </div>
                <div>
                  <h3 className="font-bold text-md">
                    The All-American Breakfast Muffin
                  </h3>
                  <p className="text-gray-600 text-sm">by Amanda Lockwood</p>
                </div>
              </div>
              <button className="text-[#B64B29] text-2xl">
                <RiDeleteBinFill />
              </button>
            </div>

            <div className="flex justify-center items-center py-4 border-t border-b">
              <button
                className="text-gray-500 text-xl flex items-center"
                onClick={() => router.push("/food-section/recipe-list")}
              >
                <MdOutlineAddCircle className="mr-2" /> Add recipe
              </button>
            </div>


            {/* Reminder Section */}
            <div className="mt-6 px-6">
              <label className="block font-bold text-gray-700">Reminder</label>
              <select
                className="block py-2 mt-1 rounded-md text-gray-600 focus:ring focus:ring-orange-400 w-[170px]"
                value={reminderTime}
                onChange={handleReminderChange}
              >
                <option value="15 minutes before">15 minutes before</option>
                <option value="30 minutes before">30 minutes before</option>
                <option value="45 minutes before">45 minutes before</option>
                <option value="60 minutes before">60 minutes before</option>
              </select>
            </div>

            {/* Invite People Section */}
            <div className="mt-6 px-6">
              <label className="block font-bold text-gray-700">
                Invite People
              </label>
              <div className="flex items-center mt-2 space-x-4">
                {people.map((person, index) => (
                  <div className="relative" key={index}>
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {/* Status Dot */}
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border border-white"></span>
                  </div>
                ))}
                {/* Add Profile Button */}
                <button
                  className="w-10 h-10 flex items-center justify-center"
                  onClick={handleInviteModalOpen}
                >
                  <Image
                    src="/add.svg"
                    alt="Add Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </button>
              </div>
            </div>
            
            <div className="mt-6 px-6">
            <label className="block font-bold text-gray-700">
              Notes
            </label>
            <p className="mt-2 text-gray-500 text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nunc ut laoreet venenatis, massa justo ultricies justo,
              vel laoreet est tortor non turpis. Suspendisse potenti. Proin sit
              amet semper urna.
            </p>
          </div>      

            {/* Edit and Delete Buttons */}
            <div className="flex flex-col space-y-4 mt-10 px-6">
              {/* Edit Details Button */}
              <button
                className="w-full py-2 bg-slate-100 rounded-xl text-primary font-semibold shadow-md"
                onClick={handleEditDetailsModalOpen}
              >
                Edit Details
              </button>

              {/* Delete Event Button */}
              <button
                className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center justify-center shadow-md"
                onClick={handleClose}
              >
                Return to Calendar Page
                <FaCalendarDay className="ml-3 text-xl" /> {/* Add margin and adjust size */}
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
