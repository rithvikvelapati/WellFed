// app/add-friend/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setModalOpen } from "@/store/modalSlice";
import {
  IoMdArrowBack,
  IoMdShare,
  IoMdCopy,
  IoMdChatboxes,
  IoLogoFacebook,
  IoMdMore,
  IoIosArrowBack,
  IoIosArrowForward
} from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { ImBlocked } from "react-icons/im";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
import ToggleSwitch from "@/components/common/ToggleSwitch";
import Image from "next/image";

type Friend = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
};

const AddFriendsPage: React.FC = () => {
  const [isContactsAllowed, setIsContactsAllowed] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Friend | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleContacts = () => {
    setIsContactsAllowed(!isContactsAllowed);
  };
  const router = useRouter();
  const dispatch = useDispatch();

  // Sample data to simulate a list of users
  const usersList: Friend[] = [
    { id: "1", name: "Alice", avatar: "/avatars/Avatar10.png", isOnline: true },
    { id: "2", name: "Bob", avatar: "/avatars/Avatar9.png", isOnline: false },
    {
      id: "3",
      name: "Charlie",
      avatar: "/avatars/Avatar8.png",
      isOnline: true
    },
    { id: "4", name: "David", avatar: "/avatars/Avatar7.png", isOnline: true }
    // Add more users as needed
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
      x: 0, // End at the center
      opacity: 1,
      transition: { type: "tween", duration: 0.5 }
    },
    exit: {
      x: "100vw", // Exit to the right
      opacity: 0,
      transition: { type: "tween", duration: 0.5 }
    }
  };

  const handleClose = () => {
    router.back(); // Navigate back to the previous page
  };

  // Function to handle search using linear search algorithm
  const handleSearch = () => {
    setIsLoading(true);
    setSearchResult(null);

    // Simulate an API call with a timeout
    setTimeout(() => {
      // Linear search
      const foundUser =
        usersList.find(
          (user) => user.name.toLowerCase() === searchInput.trim().toLowerCase()
        ) || null;
      setSearchResult(foundUser);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  };

  // Function to handle adding a friend
  const handleAddFriend = (friend: Friend) => {
    // Implement add friend functionality here
    // For now, we'll just close the modal and show an alert
    alert(`Friend request sent to ${friend.name}`);
    setIsModalOpen(false);
    // In a real application, dispatch an action or make an API call here
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white overflow-y-auto flex flex-col"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Header: Back Arrow and Title */}
        <div className="mt-10 flex items-center justify-between px-4 py-2 bg-white shadow-md">
          {/* Back Arrow */}
          <button
            onClick={handleClose}
            className="p-2 focus:outline-none"
            aria-label="Close Add Friends Modal"
          >
            <IoIosArrowBack className="text-2xl text-slate-900" />
          </button>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800">Add Friends</h1>

          {/* Placeholder to balance the flex layout */}
          <div className="w-8"></div>
        </div>

        {/* Action Buttons: Share, Copy Link, Messages, Facebook, More */}
        <div className="flex justify-around p-2 bg-white">
          {/* Share Button */}
          <div className="flex flex-col items-center">
            <Button
              variant="secondary"
              className="bg-slate-800 text-slate-300 rounded-full p-3"
            >
              <IoMdShare className="h-6 w-6" />
            </Button>
            <span className="mt-2 text-sm text-gray-700">Share</span>
          </div>

          {/* Copy Link Button */}
          <div className="flex flex-col items-center">
            <Button
              variant="secondary"
              className="bg-slate-800 text-slate-300 rounded-full p-3"
            >
              <IoMdCopy className="h-6 w-6" />
            </Button>
            <span className="mt-2 text-sm text-gray-700">Copy Link</span>
          </div>

          {/* Messages Button */}
          <div className="flex flex-col items-center">
            <Button
              variant="secondary"
              className="bg-slate-800 text-slate-300 rounded-full p-3"
            >
              <IoMdChatboxes className="h-6 w-6" />
            </Button>
            <span className="mt-2 text-sm text-gray-700">Messages</span>
          </div>

          {/* Facebook Button */}
          <div className="flex flex-col items-center">
            <Button
              variant="secondary"
              className="bg-slate-800 text-slate-300 rounded-full p-3"
            >
              <IoLogoFacebook className="h-6 w-6" />
            </Button>
            <span className="mt-2 text-sm text-gray-700">Facebook</span>
          </div>

          {/* More Button */}
          <div className="flex flex-col items-center">
            <Button
              variant="secondary"
              className="bg-slate-800 text-slate-300 rounded-full p-3"
            >
              <IoMdMore className="h-6 w-6" />
            </Button>
            <span className="mt-2 text-sm text-gray-700">More</span>
          </div>
        </div>

        {/* Search by Username Button */}
        <div className="px-4 py-2">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              className="bg-third/15 w-full flex justify-between items-center px-6 py-1 text-left rounded-2xl"
            >
              <span className="text-lg text-gray-800">
                @ Search by Username
              </span>
              <IoIosArrowForward className="h-6 w-6 text-slate-900" />
            </Button>
        </div>

        {/* Sync Contacts Section */}
        <div className="flex-grow bg-third/15 rounded-t-3xl flex flex-col justify-center items-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Sync your contacts and Find your Friends
            </h2>
            <Button
              variant="primary"
              className="p-1 mt-6 w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-md"
            >
              Allow
            </Button>
          </div>
        </div>

        {/* Allow Contacts Toggle: Sticks to the Bottom */}
        <div className="p-4 bg-third/15 shadow-md flex justify-between items-center">
          <span className="text-lg text-slate-900 font-medium">
            Allow Contacts to find me
          </span>
          <ToggleSwitch isEnabled={isContactsAllowed} toggle={toggleContacts} />
        </div>
         {/* Modal for Searching Friends */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Add Friend</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
                aria-label="Close Search Modal"
              >
                &times;
              </button>
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />

            {/* Search Button */}
            <div className="mt-4 flex justify-end">
              <Button
                variant="primary"
                onClick={handleSearch}
                disabled={isLoading || searchInput.trim() === ""}
              >
                {isLoading ? <Spinner /> : "Search"}
              </Button>
            </div>

            {/* Search Result */}
            {searchResult && (
              <div className="mt-6 p-4 border rounded-md flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={searchResult.avatar}
                    alt={searchResult.name}
                    className="w-12 h-12 rounded-full"
                    width={48}
                    height={48}
                  />
                  <span className="text-lg text-gray-800">{searchResult.name}</span>
                </div>
                <Button
                  variant="primary"
                  onClick={() => handleAddFriend(searchResult)}
                >
                  Add Friend
                </Button>
              </div>
            )}

            {/* No Result Found */}
            {!isLoading && searchResult === null && searchInput.trim() !== "" && (
              <div className="mt-6 text-center text-red-500">
                No user found with that username.
              </div>
            )}
      </motion.div>
    </div>
  )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AddFriendsPage;
