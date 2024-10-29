'use client';

import React, { useEffect } from 'react';
import { SignUp } from '@clerk/nextjs';
import { useDispatch } from 'react-redux';
import { setModalOpen } from '@/store/modalSlice'; // Redux slice for modal management
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Set modal open state to true when component mounts
  useEffect(() => {
    dispatch(setModalOpen(true));
    return () => {
      dispatch(setModalOpen(false)); // Close modal when component unmounts
    };
  }, [dispatch]);

  // Animation variants for sliding in from left to right
  const modalVariants = {
    initial: {
      x: '-100vw', // Start from the left
      opacity: 0,
    },
    animate: {
      x: 0, // Slide to the center
      opacity: 1,
      transition: { type: 'tween', duration: 0.5 },
    },
    exit: {
      x: '100vw', // Slide out to the right
      opacity: 0,
      transition: { type: 'tween', duration: 0.5 },
    },
  };

  const handleClose = () => {
    router.push('/'); // Navigate back to the home page or any other route
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
        <div className="flex justify-center items-start min-h-screen bg-black pt-20">
          {/* Container for the logo and sign-up card */}
          <div className="flex flex-col items-center w-full max-w-md mx-4">

            {/* Wellfed Logo */}
            <div className="flex items-center justify-center mb-6 w-full">
              <img src="/Wellfedlogo.svg" alt="Wellfed Logo" />
            </div>

            {/* Clerk's SignUp Component */}
            <div className="p-4 md:p-8 rounded-lg shadow-lg w-full">
              <SignUp
                appearance={{
                  variables: {
                    colorPrimary: "#E97C38", // Primary button color (orange)
                    colorBackground: "#ffffff", // Set the sign-up card background to white
                    colorText: "#333333", // Text color
                    fontFamily: "Arial, sans-serif", // Font family
                    borderRadius: "10px", // Rounded corners for buttons and input fields
                  },
                  layout: {
                    logoPlacement: "none", // Disable Clerk's default logo
                    socialButtonsPlacement: "top", // Position of social buttons
                    termsPageUrl: "/terms", // URL for the Terms link
                    helpPageUrl: "/help", // URL for the Help link
                    privacyPageUrl: "/privacy", // URL for the Privacy link
                  },
                  elements: {
                    card: "bg-white shadow-lg", // Ensure the card background is explicitly white
                    formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white", // Button styling
                    formInput: "border-gray-300 focus:border-blue-500", // Input styling
                  },
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignUpPage;
