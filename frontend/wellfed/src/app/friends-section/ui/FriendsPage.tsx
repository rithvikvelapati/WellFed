// app/friends/page.tsx
"use client";

import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import {
  selectOnlineUsersCount,
  selectAllFriendsCount,
  selectPendingFriendRequests
} from "@/store/userSelectors";
import Image from "next/image";
import { IoMdPersonAdd } from "react-icons/io";
import { motion } from "framer-motion";
import { ImBlocked } from "react-icons/im";

interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
}

const FriendsPage: React.FC = () => {
  // Retrieve data from Redux store using selectors
  const onlineUsersCount = useSelector(selectOnlineUsersCount);
  const allFriendsCount = useSelector(selectAllFriendsCount);
  const pendingFriendRequests: FriendRequest[] = useSelector(
    selectPendingFriendRequests
  );

  return (
    <div className="p-1">
      {/* Add Friends Button */}
      <div className="flex justify-center mb-6 ">
        <motion.button className="flex justify-center items-center bg-gradient-to-r from-primary to-secondary text-white w-full py-1 rounded-2xl text-lg">
          <IoMdPersonAdd className="mr-4 height-[20px] w-[20px]" />
          Add Friends
        </motion.button>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {/* Online Users Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Online</h2>
          <p className="text-gray-700">
            {onlineUsersCount} user{onlineUsersCount !== 1 ? "s" : ""} online
          </p>
        </div>

        {/* All Friends Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">All Friends</h2>
          <p className="text-gray-700">
            {allFriendsCount} friend{allFriendsCount !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Pending Friend Requests Section */}
        <div className="p-1">
          <h2 className="text-xl font-semibold mb-4">
            Pending Friend Requests
          </h2>
          <div className="bg-white shadow-md rounded-lg">
            {pendingFriendRequests.length > 0 ? (
              <div className="w-full space-y-4">
                {pendingFriendRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg"
                  >
                    <Image
                      src={request.avatar}
                      alt={request.name}
                      className="w-12 h-12 rounded-full"
                      height={48}
                      width={48}
                    />
                    <div className="flex-1">
                      <p className="text-lg font-medium">{request.name}</p>
                      {/* Future: Add Accept/Reject buttons here */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-700">No pending friend requests.</p>
            )}
          </div>
          {/* Add Friends Button */}
          <div className="flex justify-center my-4 ">
            <motion.button className="flex justify-center items-center bg-gradient-to-r from-primary to-secondary text-white w-full py-2 rounded-2xl text-lg font-medium">
              <ImBlocked className="mr-4 height-[20px] w-[20px]" />
              Blocked Users
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
