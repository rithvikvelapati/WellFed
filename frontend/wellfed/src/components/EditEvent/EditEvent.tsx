"use client"; // Ensure this is a Client Component

import React, { useState } from "react";
import Image from "next/image";
import EditEventOverlay from "./EditEventOverlay";
import { LuDot } from "react-icons/lu";
import { FaChevronLeft } from "react-icons/fa"; // Import the back icon
import { useRouter } from 'next/navigation'; // Import Next.js router
import EditDetailsModal from "../EventCalender/EditDetailsModal";

const EditEvent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter(); // Initialize Next.js router

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleIsEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleIsEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative items-center justify-center bg-white mx-auto mx-2">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          className="font-semibold text-lg"
          onClick={() => router.push('/calendar-section')}
        >
          <FaChevronLeft />
        </button>
      </div>

      {/* Event Banner */}
      <div className="relative">
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
          <button className=" text-white text-sm md:text-base">View Event</button>
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
          <div className="relative">
            <Image
              src="/Profile1.svg"
              alt="Person 1"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border border-white"></span>
          </div>
          <div className="relative">
            <Image
              src="/Profile2.svg"
              alt="Person 2"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-gray-400 border border-white"></span>
          </div>
          <div className="relative">
            <Image
              src="/Profile3.svg"
              alt="Person 3"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border border-white"></span>
          </div>
          <button className="w-10 h-10 flex items-center justify-center" onClick={handleModalOpen}>
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

      <EditEventOverlay
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />

      {/* Date Details */}
      <div className="mt-6 px-6">
        <label className="block font-bold text-gray-700">Date details</label>
        <p className="mt-2 text-gray-500 text-sm md:text-base">
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.
        </p>
      </div>
      <hr className="my-6 border-t-2 border-gray-200" />

      <div className="flex flex-col space-y-4 mt-20 px-6 absolute w-full bottom-1 relative">
        {/* Edit Details Button */}
        <button className="w-full py-2 bg-[#F1F1F1] rounded-full text-[#B64B29] font-semibold shadow-md" onClick={() => handleIsEditModalOpen()}>
          Edit Details
        </button>

        {/* Delete Event Button */}
        <button className="w-full py-2 bg-[#B64B29] text-white rounded-full flex items-center justify-center shadow-md">
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

      <EditDetailsModal
        isModalOpen={isEditModalOpen}
        handleModalClose={handleIsEditModalClose}
      />
    </div>
  );
};

export default EditEvent;
