"use client";

import React, { useEffect, useState } from "react";

import { setModalOpen } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdOutlineAddCircle } from "react-icons/md";
import EditDetailsModal from "@/components/EventCalender/EditDetailsModal";
import Image from "next/image";
import InviteModal from "@/components/EditEvent/InviteModal";

const MealDetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [reminderTime, setReminderTime] = useState("15 minutes before");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const people = [
    { name: "John Doe", avatar: "/Profile1.svg" },
    { name: "Jane Doe", avatar: "/Profile2.svg" },
    { name: "Amanda Lockwood", avatar: "/Profile3.svg" }
  ];

  // Set modal open state to true when component mounts
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
      opacity: 0
    },
    animate: {
      x: 0, // Slide to the center
      opacity: 1,
      transition: { type: "tween", duration: 0.5 }
    },
    exit: {
      x: "100vw", // Slide out to the right
      opacity: 0,
      transition: { type: "tween", duration: 0.5 }
    }
  };

  const handleClose = () => {
    router.push("/calendar-section");
  };

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  const handleReminderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReminderTime(e.target.value);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

    const handleInviteModalOpen = () => {
    setIsInviteModalOpen(true);
  };

  const handleInviteModalClose = () => {
    setIsInviteModalOpen(false);
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
              <h2 className="text-3xl font-semibold mt-5 mb-2">Wednesday</h2>
              <p className="text-xl">
                28 September 2024{" "}
                <FaChevronDown className="inline ml-2 text-sm" />
              </p>
            </div>
          </div>

          {/* Meal Details */}
          <div className=" h-screen rounded-t-[2.5rem] shadow-[0px_0px_15px_5px_#dcdcdc] p-2 mt-4 z-50">
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

            <div className="px-6 py-4 border-t border-b pb-8">
              <button className="text-gray-500 text-sm flex items-center mb-4 float-right">
                <MdOutlineAddCircle /> Add another recipe
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

            {/* Date Details Section */}
            <div className="mt-6 px-6">
              <label className="block font-bold text-gray-700">
                Date details
              </label>
              <p className="mt-2 text-gray-500 text-sm md:text-base">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Commodi suscipit quis mollitia quod! Neque, molestiae aperiam
                vitae doloribus reprehenderit ipsum!
              </p>
            </div>

            <hr className="my-6 border-t-2 border-gray-200" />

            {/* Edit and Delete Buttons */}
            <div className="flex flex-col space-y-4 mt-10 px-6">
              {/* Edit Details Button */}
              <button
                className="w-full py-2 bg-slate-100 rounded-xl text-primary font-semibold shadow-md"
                onClick={handleModalOpen}
              >
                Edit Details
              </button>

              {/* Delete Event Button */}
              <button
                className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center justify-center shadow-md"
                onClick={handleClose}
              >
                Delete Event
                <Image
                  src="/deleteicon.svg"
                  alt="Delete Icon"
                  width={20}
                  height={20}
                  className="mr-2 ml-3"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* EditDetailsModal (Conditionally Rendered) */}
      {isModalOpen && (
        <EditDetailsModal
          handleModalClose={handleModalClose}
          isModalOpen={false}
        />
      )}

      {isInviteModalOpen && (
        <InviteModal
          handleModalClose={handleInviteModalClose}
           isInviteModalOpen={false}        />
      )}
    </>
  );
};

export default MealDetailsPage;
