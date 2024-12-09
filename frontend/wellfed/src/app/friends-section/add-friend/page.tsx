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

const AddFriendsPage: React.FC = () => {
  const [isContactsAllowed, setIsContactsAllowed] = useState<boolean>(false);

  const toggleContacts = () => {
    setIsContactsAllowed(!isContactsAllowed);
  };
  const router = useRouter();
  const dispatch = useDispatch();

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

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Top Bar with Back*/}
        <div className="absolute top-10 left-0 right-0 flex justify-between items-center px-4">
          <button
            onClick={handleClose}
            className="p-2 focus:outline-none"
            aria-label="Close Filter Modal"
          >
            <IoIosArrowBack className="text-2xl text-slate-900" />
          </button>
        </div>
          <h1 className="absolute top-7 left-1/2 transform -translate-x-1/2 text-2xl font-bold my-4">Add Friends</h1>
        <div className="mt-16 pt-4 pl-4 pb-10">
          {/* Action Buttons */}
          <div className="flex justify-around p-4 bg-white">
            {/* Share Button */}
            <div className="flex flex-col items-center">
              <Button variant="secondary" className="rounded-full p-3">
                <IoMdShare className="h-6 w-6" />
              </Button>
              <span className="mt-2 text-sm text-gray-700">Share</span>
            </div>

            {/* Copy Link Button */}
            <div className="flex flex-col items-center">
              <Button variant="secondary" className="rounded-full p-3">
                <IoMdCopy className="h-6 w-6" />
              </Button>
              <span className="mt-2 text-sm text-gray-700">Copy Link</span>
            </div>

            {/* Messages Button */}
            <div className="flex flex-col items-center">
              <Button variant="secondary" className="rounded-full p-3">
                <IoMdChatboxes className="h-6 w-6" />
              </Button>
              <span className="mt-2 text-sm text-gray-700">Messages</span>
            </div>

            {/* Facebook Button */}
            <div className="flex flex-col items-center">
              <Button variant="secondary" className="rounded-full p-3">
                <IoLogoFacebook className="h-6 w-6" />
              </Button>
              <span className="mt-2 text-sm text-gray-700">Facebook</span>
            </div>

            {/* More Button */}
            <div className="flex flex-col items-center">
              <Button variant="secondary" className="rounded-full p-3">
                <IoMdMore className="h-6 w-6" />
              </Button>
              <span className="mt-2 text-sm text-gray-700">More</span>
            </div>
          </div>

           {/* Search by Username Button */}
          <div className="px-4">
            <Link href="/username-search">
              <Button
                variant="primary"
                className="w-full flex justify-between items-center px-6 py-3 text-left"
              >
                <span className="text-lg text-gray-800">
                  @ Search by Username
                </span>
                <IoIosArrowForward className="h-6 w-6 text-slate-900" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Sync Contacts Section */}
        <div className="flex-grow">
          <div className="bg-third/25 h-full w-auto rounded-t-3xl p-4 flex flex-col items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Sync your contacts and Find your Friends
              </h2>
              <Button variant="primary" className="mt-6 w-full">
                Allow
              </Button>
            </div>
        {/* Allow Contacts Toggle */}
        <div className="flex justify-center items-end mt-2">
          <span className="text-lg text-gray-800">
            Allow Contacts to find me
          </span>
          <ToggleSwitch isEnabled={isContactsAllowed} toggle={toggleContacts} />
        </div>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
};

export default AddFriendsPage;
