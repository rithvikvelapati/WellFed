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
            <Button variant="secondary" className="bg-slate-800 text-slate-300 rounded-full p-3">
              <IoMdShare className="h-6 w-6" />
            </Button>
            <span className="mt-2 text-sm text-gray-700">Share</span>
          </div>

          {/* Copy Link Button */}
          <div className="flex flex-col items-center">
            <Button variant="secondary" className="bg-slate-800 text-slate-300 rounded-full p-3">
              <IoMdCopy className="h-6 w-6" />
            </Button>
            <span className="mt-2 text-sm text-gray-700">Copy Link</span>
          </div>

          {/* Messages Button */}
          <div className="flex flex-col items-center">
            <Button variant="secondary" className="bg-slate-800 text-slate-300 rounded-full p-3">
              <IoMdChatboxes className="h-6 w-6" />
            </Button>
            <span className="mt-2 text-sm text-gray-700">Messages</span>
          </div>

          {/* Facebook Button */}
          <div className="flex flex-col items-center">
            <Button variant="secondary" className="bg-slate-800 text-slate-300 rounded-full p-3">
              <IoLogoFacebook className="h-6 w-6" />
            </Button>
            <span className="mt-2 text-sm text-gray-700">Facebook</span>
          </div>

          {/* More Button */}
          <div className="flex flex-col items-center">
            <Button variant="secondary" className="bg-slate-800 text-slate-300 rounded-full p-3">
              <IoMdMore className="h-6 w-6" />
            </Button>
            <span className="mt-2 text-sm text-gray-700">More</span>
          </div>
        </div>

        {/* Search by Username Button */}
        <div className="px-4 py-2">
          <Link href="/username-search">
              <Button
                variant="primary"
                className="bg-third/15 w-full flex justify-between items-center px-6 py-1 text-left rounded-2xl"
              >
                <span className="text-lg text-gray-800">
                  @ Search by Username
                </span>
                <IoIosArrowForward className="h-6 w-6 text-slate-900" />
              </Button>
          </Link>
        </div>

        {/* Sync Contacts Section */}
        <div className="flex-grow bg-third/15 rounded-t-3xl flex flex-col justify-center items-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Sync your contacts and Find your Friends
            </h2>
            <Button variant="primary" className="p-1 mt-6 w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-md">
              Allow
            </Button>
          </div>
        </div>

        {/* Allow Contacts Toggle: Sticks to the Bottom */}
        <div className="p-4 bg-third/15 shadow-md flex justify-between items-center">
          <span className="text-lg text-slate-900 font-medium">Allow Contacts to find me</span>
          <ToggleSwitch isEnabled={isContactsAllowed} toggle={toggleContacts} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddFriendsPage;
