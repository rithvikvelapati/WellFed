// app/event-card/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import EventBanner from "./ui/EventBanner";
import EventContent from "./ui/EventContent";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setModalOpen } from "@/store/modalSlice";
import { IoIosArrowBack } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface Event {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  bookmarked: boolean;
  description: string;
  duration: string;
}

const EventPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Local state for event data
  const [event, setEvent] = useState<Event>({
    id: 1,
    title: "Community Clean-Up Day",
    imageUrl: "/SanFran.png", // Ensure this image exists in your public folder
    rating: 4.5,
    bookmarked: false,
    description: "Join us in making our neighborhood cleaner and greener!",
    duration: "2-3 hours",
  });

  // Function to toggle bookmark status
  const toggleBookmark = () => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      bookmarked: !prevEvent.bookmarked,
    }));
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
      x: "-100vw", // Start from the left
      opacity: 0,
    },
    animate: {
      x: 0, // End at the center
      opacity: 1,
      transition: { type: "tween", duration: 0.5 },
    },
    exit: {
      x: "100vw", // Exit to the right
      opacity: 0,
      transition: { type: "tween", duration: 0.5 },
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
        {/* Top Bar with Back and Bookmark */}
        <div className="absolute top-10 left-0 right-0 flex justify-between items-center px-1">
          <button
            onClick={handleClose}
            className="p-2 focus:outline-none z-50"
            aria-label="Close Event Modal"
          >
            <IoIosArrowBack className="text-2xl text-slate-400" />
          </button>

          {/* Bookmark Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark();
            }}
            className="p-2 focus:outline-none z-50 text-2xl text-secondary"
            aria-label={event.bookmarked ? "Remove Bookmark" : "Add Bookmark"}
          >
            {event.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>

        <div className="min-h-screen flex flex-col">
          {/* Event Banner */}
          <EventBanner event={event} />

          {/* Event Content */}
          <EventContent event={event} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventPage;
