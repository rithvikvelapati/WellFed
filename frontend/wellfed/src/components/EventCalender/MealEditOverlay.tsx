"use client";

import Image from "next/image";
import { FaFacebook, FaEnvelope, FaUserPlus } from "react-icons/fa";
import { RiDeleteBinLine, RiMessage2Line } from "react-icons/ri";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { IoIosLink, IoMdMore } from "react-icons/io";
import { MdAdd } from "react-icons/md";

interface MealEditOverlayProps {
  isModalOpen: boolean;
  searchQuery: string;
  handleModalClose: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

const MealEditOverlay: React.FC<MealEditOverlayProps> = ({
  searchQuery,
  handleSearchChange,
}) => {
  const allFriends: Friend[] = [
    { id: 1, name: "John", image: "/Profile1.svg" },
    { id: 2, name: "Emma", image: "/Profile2.svg" },
    { id: 3, name: "Liam", image: "/Profile3.svg" },
    { id: 4, name: "Sophia", image: "/Profile3.svg" },
    { id: 5, name: "Michael", image: "/Profile2.svg" },
    { id: 6, name: "Olivia", image: "/Profile1.svg" },
    { id: 7, name: "James", image: "/Profile3.svg" },
    { id: 8, name: "Ava", image: "/Profile2.svg" },
  ];

  const groups: Group[] = [
    { id: 1, name: "Group 1", image: "/group1.svg" },
    { id: 2, name: "Group 2", image: "/group2.svg" },
    { id: 3, name: "Group 3", image: "/group3.svg" },
    { id: 4, name: "Group 4", image: "/group4.svg" }
  ];


  return (
      <div className="p-6 text-white">
        {/* All Friends Section */}
        <div>
          <h4 className="font-normal text-sm mb-1">All Friends - {allFriends.length}</h4>
          <div className="flex -space-x-4 mb-6"> {/* Add negative space to overlap */}
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
          <h4 className="font-normal text-sm mb-1">Invited - {allFriends.length}</h4>
          <div className="flex space-x-1 mb-6">
            {allFriends.map((friend) => (
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
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md p-2 w-full text-black"
            placeholder="Search friends"
          />
          <button className="ml-2 p-2 bg-orange-500 text-white rounded-md flex items-center">
            <FaUserPlus className="text-xl" />
          </button>
        </div>
      </div>
  );
};

export default MealEditOverlay;
