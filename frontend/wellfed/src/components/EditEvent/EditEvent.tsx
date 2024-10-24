// ui/EditEvent.tsx

"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { FaChevronLeft } from "react-icons/fa"; // Import the back icon
import { useRouter } from "next/navigation"; // Import Next.js router
import EditDetailsModal from "../EventCalender/EditDetailsModal";
import { useDispatch } from "react-redux";
import { setModalOpen } from "@/store/modalSlice";
import { AnimatePresence, motion } from "framer-motion";
import InviteModal from "./InviteModal";

const EditEvent: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter(); // Initialize Next.js router
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    setIsInviteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsInviteModalOpen(false);
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
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
      x: '-100vw', // Start from the left
      opacity: 0,
    },
    animate: {
      x: 0, // End at the center
      opacity: 1,
      transition: { type: 'tween', duration: 0.5 },
    },
    exit: {
      x: '100vw', // Exit to the right
      opacity: 0,
      transition: { type: 'tween', duration: 0.5 },
    },
  };

  const handleClose = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
      {/* Back Button */}
      <div className="absolute top-12 left-2 z-10 text-slate-200">
        <button
          className="font-semibold text-lg"
          onClick={handleClose}
        >
          <FaChevronLeft />
        </button>
      </div>

      {/* Event Banner */}
      <div className="relative height">
        <Image
          src="/Eventphoto.svg"
          alt="Event Banner"
          width={500}
          height={200}
          className="w-full object-cover"
        />
      </div>

      {/* Green Event Info Box */}
      <div className="bg-teal-600 text-white p-6 rounded-b-3xl shadow-lg relative">
        <div className="flex flex-col">
          <h1 className="md:text-3xl font-bold mb-1">Sunny Grille</h1>
          <p className="text-sm md:text-base opacity-80">
            Manchester United vs Arsenal (Premier League)
          </p>
        </div>
        <div className="flex flex-col mt-3">
          <div className="flex items-center mb-2">
            <Image
              src="/icon1.svg"
              alt="Time Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <span className="text-sm md:text-base">09:00am - 1:00pm</span>
          </div>
          <div className="flex items-center">
            <Image
              src="/icon2.svg"
              alt="Location Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <span className="text-sm md:text-base">Stamford Bridge</span>
          </div>
        </div>

        <div className="flex flex-col items-center absolute bottom-2 right-4 justify-center">
          <button className="text-white text-sm md:text-base">
            View Event
          </button>
          <Image
            src="/downarrow.svg"
            alt="Down Arrow"
            width={20}
            height={20}
            className="bottom-4 right-4"
          />
        </div>
      </div>

      {/* Reminder Section */}
      <div className="mt-6 px-6">
        <label className="block font-bold text-gray-700">Reminder</label>
        <select className="block py-2 mt-1 rounded-md text-gray-600 focus:ring focus:ring-orange-400 w-[170px]">
          <option>15 minutes before</option>
          <option>30 minutes before</option>
          <option>1 hour before</option>
        </select>
      </div>

      {/* Invite People Section */}
      <div className="mt-6 px-6">
        <label className="block font-bold text-gray-700">Invite People</label>
        <div className="flex items-center mt-2 space-x-4">
          {/* Profile Images */}
          {["/Profile1.svg", "/Profile2.svg", "/Profile3.svg"].map(
            (src, index) => (
              <div key={index} className="relative">
                <Image
                  src={src}
                  alt={`Person ${index + 1}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {/* Online Status Indicator */}
                <span
                  className={`absolute top-0 right-0 block h-2.5 w-2.5 rounded-full border border-white ${
                    index === 0
                      ? "bg-green-500"
                      : index === 1
                      ? "bg-gray-400"
                      : "bg-red-500"
                  }`}
                ></span>
              </div>
            )
          )}

          {/* Add Profile Button */}
          <button
            className="w-10 h-10 flex items-center justify-center"
            onClick={handleModalOpen}
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

      {/* Date Details */}
      <div className="mt-6 px-6">
        <label className="block font-bold text-gray-700">Date Details</label>
        <p className="mt-2 text-gray-500 text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nunc ut laoreet venenatis, massa justo ultricies justo, vel laoreet
          est tortor non turpis. Suspendisse potenti. Proin sit amet semper
          urna.
        </p>
      </div>
      <hr className="my-4 border-t-1 border-gray-200" />

      {/* Buttons */}
      <div className="flex flex-col space-y-fluid-px mt-14 px-6 mb-2">
        {/* Edit Details Button */}
        <button
          className="w-full py-2 bg-slate-100 rounded-xl text-primary font-semibold shadow-md"
          onClick={handleEditModalOpen}
        >
          Edit Details
        </button>

        {/* Delete Event Button */}
        <button className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center justify-center shadow-md">
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

      {/* Modals */}
      {isInviteModalOpen && (
        <InviteModal
          handleModalClose={handleModalClose} isInviteModalOpen={false}
        />
      )}

      {isEditModalOpen && (
        <EditDetailsModal handleModalClose={handleEditModalClose} isModalOpen={false} />
      )}
    </motion.div>
    </AnimatePresence>
  );
};

export default EditEvent;
