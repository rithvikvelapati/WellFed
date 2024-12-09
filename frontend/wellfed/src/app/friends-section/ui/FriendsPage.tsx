// app/friends-section/ui/FriendsPage.tsx
"use client";

import React, { useState } from "react";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  selectOnlineUsersCount,
  selectAllFriendsCount,
  selectPendingFriendRequests,
  selectOnlineFriends,
  selectAllFriends
} from "@/store/userSelectors";
import { acceptFriendRequest, rejectFriendRequest } from "@/store/userSlice";
import Image from "next/image";
import { IoMdPersonAdd } from "react-icons/io";
import { motion } from "framer-motion";
import { ImBlocked } from "react-icons/im";
import Spinner from "@/components/common/Spinner";
import Button from "@/components/common/Button";

interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

const FriendsPage: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();

  // Retrieve data from Redux store using selectors
  const onlineUsersCount = useSelector(selectOnlineUsersCount);
  const allFriendsCount = useSelector(selectAllFriendsCount);
  const pendingFriendRequests: FriendRequest[] = useSelector(
    selectPendingFriendRequests
  );

  // New Selectors for Friends Lists
  const onlineFriends: Friend[] = useSelector(selectOnlineFriends);
  const allFriends: Friend[] = useSelector(selectAllFriends);

  // Local state to manage loading and error states for each request
  const [loadingRequests, setLoadingRequests] = useState<{
    [key: string]: boolean;
  }>({});
  const [errorRequests, setErrorRequests] = useState<{ [key: string]: string }>(
    {}
  );

  // Handler to accept a friend request
  const handleAccept = async (requestId: string) => {
    // Set loading state for this request
    setLoadingRequests((prev) => ({ ...prev, [requestId]: true }));
    setErrorRequests((prev) => ({ ...prev, [requestId]: "" }));

    try {
      // Dispatch the acceptFriendRequest thunk
      await dispatch(acceptFriendRequest(requestId)).unwrap();
    } catch (error: any) {
      // Set error message for this request
      setErrorRequests((prev) => ({
        ...prev,
        [requestId]: error || "Failed to accept friend request."
      }));
    } finally {
      // Reset loading state for this request
      setLoadingRequests((prev) => ({ ...prev, [requestId]: false }));
    }
  };

  // Handler to reject a friend request
  const handleReject = async (requestId: string) => {
    // Set loading state for this request
    setLoadingRequests((prev) => ({ ...prev, [requestId]: true }));
    setErrorRequests((prev) => ({ ...prev, [requestId]: "" }));

    try {
      // Dispatch the rejectFriendRequest thunk
      await dispatch(rejectFriendRequest(requestId)).unwrap();
    } catch (error: any) {
      // Set error message for this request
      setErrorRequests((prev) => ({
        ...prev,
        [requestId]: error || "Failed to reject friend request."
      }));
    } finally {
      // Reset loading state for this request
      setLoadingRequests((prev) => ({ ...prev, [requestId]: false }));
    }
  };

  return (
    <div className="p-4">
      {/* Add Friends Button */}
      <div className="flex justify-center mb-6">
        <Link href="/friends-section/add-friend">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center items-center bg-gradient-to-r from-primary to-secondary text-white w-full max-w-md py-2 px-4 rounded-2xl text-lg font-medium shadow-md transition duration-200"
          >
            <IoMdPersonAdd className="mr-2 h-6 w-6" />
            Add Friends
          </motion.button>
        </Link>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {/* Online Users Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Online Friends</h2>
          {onlineFriends.length > 0 ? (
            <div className="flex space-x-4 overflow-x-auto">
              {onlineFriends.map((friend) => (
                <div key={friend.id} className="flex flex-col items-center">
                  <Image
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-16 h-16 rounded-full"
                    width={64}
                    height={64}
                  />
                  <p className="mt-2 text-center text-gray-800">
                    {friend.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">No friends are currently online.</p>
          )}
        </div>

        {/* All Friends Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">All Friends</h2>
          {allFriends.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {allFriends.map((friend) => (
                <div key={friend.id} className="flex flex-col items-center">
                  <Image
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-16 h-16 rounded-full"
                    width={64}
                    height={64}
                  />
                  <p className="mt-2 text-center text-gray-800">
                    {friend.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">You have no friends yet.</p>
          )}
        </div>

        {/* Pending Friend Requests Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Pending Friend Requests
          </h2>
          {pendingFriendRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingFriendRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg"
                >
                  <Image
                    src={request.avatar}
                    alt={request.name}
                    className="w-16 h-16 rounded-full"
                    width={64}
                    height={64}
                  />
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-800">
                      {request.name}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="primary"
                      onClick={() => handleAccept(request.id)}
                      disabled={loadingRequests[request.id]}
                    >
                      Accept
                      {loadingRequests[request.id] && <Spinner />}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleReject(request.id)}
                      disabled={loadingRequests[request.id]}
                    >
                      Reject
                      {loadingRequests[request.id] && <Spinner />}
                    </Button>
                  </div>
                  {/* Display error message if any */}
                  {errorRequests[request.id] && (
                    <p className="text-red-500 text-sm mt-2 sm:mt-0 sm:ml-16">
                      {errorRequests[request.id]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">No pending friend requests.</p>
          )}
        </div>

        {/* Blocked Users Button (Optional) */}
        <div className="flex justify-center my-6">
          <Link href="/blocked-users">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center items-center bg-gradient-to-r from-primary to-secondary text-white w-full max-w-md py-2 px-4 rounded-2xl text-lg font-medium shadow-md transition duration-200"
            >
              <ImBlocked className="mr-2 h-6 w-6" />
              Blocked Users
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
