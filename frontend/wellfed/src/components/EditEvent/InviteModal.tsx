"use client";

import Image from "next/image";
import { useState } from "react";
import { FaFacebook, FaEnvelope, FaUserPlus } from "react-icons/fa";
import { RiDeleteBinLine, RiMessage2Line } from "react-icons/ri";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { IoIosLink, IoMdMore } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { setInviteModalOpen } from "@/store/modalSlice";
import { useDispatch } from "react-redux";

interface InviteModalProps {
  isInviteModalOpen: boolean;
  handleModalClose: () => void;
}

interface Friend {
  id: number;
  name: string;
  image: string;
}

interface Group {
  id: number;
  name: string;
  image: string;
}

const InviteModal: React.FC<InviteModalProps> = ({
  isInviteModalOpen,
  handleModalClose,
}) => {
  const dispatch = useDispatch();
  const allFriends: Friend[] = [
    { id: 1, name: "John", image: "/Profile1.svg" },
    { id: 2, name: "Emma", image: "/Profile2.svg" },
    { id: 3, name: "Liam", image: "/Profile3.svg" },
    { id: 4, name: "Sophia", image: "/Profile3.svg" },
    { id: 5, name: "Michael", image: "/Profile2.svg" },
    { id: 6, name: "Olivia", image: "/Profile1.svg" },
    { id: 7, name: "James", image: "/Profile3.svg" },
    { id: 8, name: "Ava", image: "/Profile2.svg" }
  ];

  const groups: Group[] = [
    { id: 1, name: "Group 1", image: "/group1.svg" },
    { id: 2, name: "Group 2", image: "/group2.svg" },
    { id: 3, name: "Group 3", image: "/group3.svg" },
    { id: 4, name: "Group 4", image: "/group4.svg" }
  ];

  const [invitedFriends, setInvitedFriends] = useState<Friend[]>([
    allFriends[0],
    allFriends[1],
    allFriends[2]
  ]);

  const modalVariants = {
    initial: {
      x: "100vw", // Start from the left
      opacity: 0
    },
    animate: {
      x: 0, // End at the center
      opacity: 1,
      transition: { type: "tween", duration: 0.5 }
    },
    exit: {
      x: "-100vw", // Exit to the right
      opacity: 0,
      transition: { type: "tween", duration: 0.5 }
    }
  };
  // Filter friends based on search query

  return (
    <AnimatePresence>
      {isInviteModalOpen && (
      <motion.div
        className="fixed inset-0 z-50 bg-black bg-opacity-70 overflow-y-auto"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="p-6 text-white">
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute h-6 w-6 top-10 right-4 text-slate-100 focus:outline-none"
              aria-label="Close"
            >
              <IoClose size={24}/>
            </button>
            {/* All Friends Section */}
            <div className="mt-12">
              <h4 className="font-normal text-sm mb-1">
                All Friends - {allFriends.length}
              </h4>
              <div className="flex -space-x-4 mb-6">
                {" "}
                {/* Add negative space to overlap */}
                {allFriends.map((friend) => (
                  <div key={friend.id} className="relative">
                    <Image
                      src={friend.image}
                      alt={friend.name}
                      width={40}
                      height={40}
                      className="rounded-full border border-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Invited Friends Section */}
            <div>
              <h4 className="font-normal text-sm mb-1">
                Invited - {invitedFriends.length}
              </h4>
              <div className="flex space-x-1 mb-6">
                {invitedFriends.map((friend) => (
                  <div key={friend.id} className="relative">
                    <Image
                      src={friend.image}
                      alt={friend.name}
                      width={40}
                      height={40}
                      className="rounded-full border border-white"
                    />
                    <div className="absolute -right-1 -bottom-2 rounded-full bg-red-600 p-0.5 border">
                      <RiDeleteBinLine />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Groups Section */}
            <div>
              <h4 className="font-normal text-sm mb-1">Groups</h4>
              <div className="flex items-center space-x-3 mb-6">
                {groups.map((group) => (
                  <div key={group.id} className="relative">
                    <Image
                      src={group.image}
                      alt={group.name}
                      width={52}
                      height={52}
                      className="rounded-lg"
                    />
                  </div>
                ))}
                <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <MdAdd className="text-black text-xl" />
                </button>
              </div>
            </div>

            {/* Action Buttons (Icons) */}
            <div className="flex justify-around mb-6 gap-0  font-thin">
              <button className="flex flex-col items-center">
                <div className="bg-gray-800 p-2 rounded-full">
                  <FaRegShareFromSquare className="text-black-500 text-2xl" />
                </div>
                <span className="text-xs text-white-500">Share</span>
              </button>
              <button className="flex flex-col items-center">
                <div className="bg-gray-800 p-2 rounded-full">
                  <IoIosLink className="text-black-500 text-2xl" />
                </div>
                <span className="text-xs text-white-500">Link</span>
              </button>
              <button className="flex flex-col items-center">
                <div className="bg-gray-800 p-2 rounded-full">
                  <RiMessage2Line className="text-black-500 text-2xl" />
                </div>
                <span className="text-xs text-white-500">Message</span>
              </button>
              <button className="flex flex-col items-center">
                <div className="bg-gray-800 p-2 rounded-full">
                  <FaFacebook className="text-black-500 text-2xl" />
                </div>
                <span className="text-xs text-white-500">Facebook</span>
              </button>
              <button className="flex flex-col items-center">
                <div className="bg-gray-800 p-2 rounded-full">
                  <IoMdMore className="text-white-500 text-2xl" />
                </div>
                <span className="text-xs text-white-500">More</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center mb-4">
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full text-black"
                placeholder="Search friends"
              />
              <button className="ml-2 p-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md flex items-center">
                <FaUserPlus className="text-xl" />
              </button>
            </div>
          </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InviteModal;
