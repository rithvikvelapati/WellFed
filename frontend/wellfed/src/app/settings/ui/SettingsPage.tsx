'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setModalOpen } from '@/store/modalSlice';
import { FaBell, FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { FaHand } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';
import { useClerk } from '@clerk/nextjs';  // Import useClerk to handle sign out

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signOut } = useClerk();  // Destructure signOut from useClerk

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

  const handleSignOut = () => {
    signOut({ redirectUrl: '/' }); // Trigger sign out and redirect to home page
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
        {/* Top Bar with Back */}
        <div className="absolute top-10 left-0 right-0 flex justify-between items-center px-2">
          <button
            onClick={handleClose}
            className="p-2 focus:outline-none"
            aria-label="Close Filter Modal"
          >
            <IoIosArrowBack className="text-2xl text-slate-900" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="mt-16 pt-4 pl-4 pb-4">
          <h1 className="text-3xl font-bold my-4">Settings</h1>
          <h2 className="mt-10 pl-4 font-semibold text-lg">Account</h2>
        </div>
        <div className="ml-4 pl-4 w-auto">
            <ul className="space-y-fluid-px">
                <li className="flex w-auto">
                    <Link href="/settings/account" className="flex items-center">
                        <figure className="flex justify-center items-center w-7 h-7 border-0 bg-gradient-to-r from-primary to-secondary rounded-md">
                            <FaLock className="text-white" />
                        </figure>
                        <div className="flex justify-between items-center ml-3 border-b-2 w-auto min-w-[310px]">
                            <p className="text-slate-900 font-medium">Change Password</p>
                            <IoIosArrowForward className="text-slate-400 text-lg mx-1" />
                        </div>
                    </Link>
                </li>
                <li className="flex w-auto">
                    <Link href="/settings/account" className="flex items-center">
                        <figure className="flex justify-center items-center w-7 h-7 border-0 bg-gradient-to-r from-primary to-secondary rounded-md">
                            <FaBell className="text-white" />
                        </figure>
                        <div className="flex justify-between items-center ml-3 border-b-2 w-auto min-w-[310px]">
                            <p className="text-slate-900 font-medium">Notifications</p>
                            <IoIosArrowForward className="text-slate-400 text-lg mx-1"/>
                        </div>
                    </Link>
                </li>
                <li className="flex w-auto">
                    <Link href="/settings/account" className="flex items-center">
                        <figure className="flex justify-center items-center w-7 h-7 border-0 bg-gradient-to-r from-primary to-secondary rounded-md">
                            <FaHand className="text-white" />
                        </figure>
                        <div className="flex justify-between items-center ml-3 border-b-2 w-auto min-w-[310px]">
                            <p className="text-slate-900 font-medium">Privacy Settings</p>
                            <IoIosArrowForward className="text-slate-400 text-lg mx-1"/>
                        </div>
                    </Link>
                </li>
                {/* Sign Out Button */}
                <li className="flex w-auto">
                    <button onClick={handleSignOut} className="flex items-center w-full">
                        <figure className="flex justify-center items-center w-7 h-7 border-0 bg-gradient-to-r from-primary to-secondary rounded-md">
                            <IoLogOut className="text-white" />
                        </figure>
                        <div className="flex justify-between items-center ml-3 border-b-2 w-auto min-w-[310px]">
                            <p className="text-slate-900 font-medium">Sign Out</p>
                            <IoIosArrowForward className="text-slate-400 text-lg mx-1" />
                        </div>
                    </button>
                </li>
            </ul>
        </div>
        <div className="mt-6 pl-8 pb-4">
          <h2 className="font-semibold text-lg">More Options</h2>
        </div>
        <div className="ml-4 pl-4 w-auto">
            <ul className="space-y-fluid-px">
                <li className="flex w-auto">
                    <Link href="/settings/account" className="flex items-center">
                        <div className="flex justify-between items-center border-b-2 w-auto min-w-[350px]">
                                <p className="text-slate-900 font-medium">Languages</p>
                            <div className="flex items-center">
                                <p className="text-slate-400 font-medium">English</p>
                                <IoIosArrowForward className="text-slate-400 text-lg mx-1"/>
                            </div>
                        </div>
                    </Link>
                </li>
                <li className="flex w-auto">
                    <Link href="/settings/account" className="flex items-center">
                        <div className="flex justify-between items-center border-b-2 w-auto min-w-[350px]">
                                <p className="text-slate-900 font-medium">Linked Accounts</p>
                            <div className="flex items-center">
                                <p className="text-slate-400 font-medium">Facebook, Google</p>
                                <IoIosArrowForward className="text-slate-400 text-lg mx-1"/>
                            </div>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsPage;
