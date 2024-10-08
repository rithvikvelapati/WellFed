'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';
import Image from 'next/image';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { setModalOpen } from '@/store/modalSlice';
import ProfileInfo from '@/components/ProfileSection/ProfileInfo';

const ProfileInfoPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setModalOpen(true));
    return () => {
      dispatch(setModalOpen(false));
    };
  }, [dispatch]);

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

  const handleClose = async () => {
    alert('Back button clicked!');  // Added alert to check button click
    try {
      await router.push('/dashboard-links'); // Navigate back to the dashboard-links page
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  const handleCalendarSection = async () => {
    try {
      await router.push('/dashboard-links');
    } catch (error) {
      console.error('Navigation failed:', error);
    }
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
        <div>
          <div className="relative w-full h-32">
            <Image
              src="/Profilebanner.svg"
              alt="Profile Banner"
              layout="fill"
              objectFit="cover"
            />
            {/* Edit Button for Banner */}
            <button className="absolute bottom-0 right-4 bg-[#B64B29] border-2 border-white text-white rounded-full p-2">
              <FaEdit size={16} />
            </button>
          </div>

          {/* Back Button and See Profile Button */}
          <div className="w-full flex justify-between items-center px-4 mt-4">
            <button className="text-gray-600" onClick={() => router.back()}>
              <IoChevronBack size={24} /> {/* Back Button */}
            </button>
           
           

            <button
              className="text-gray-800 font-semibold flex items-center gap-1"
              onClick={() => router.push('/profile-section/profile-preview')}
            >
              See Profile <IoChevronForward size={20} /> {/* See Profile Button */}
            </button>
          </div>


        </div>
        <div className="absolute top-[6rem] left-[40%] md:left-[50%] flex justify-center mb-6">
          <div className="relative w-20 h-20"> {/* Ensure the container has a fixed width and height */}
            <Image
              src="/Amanda.svg"
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full object-cover w-full h-full border-4 border-white shadow-lg"
            />
            {/* Edit Button for Profile Picture */}
            <button className="absolute bottom-0 right-0 bg-[#B64B29] text-white border-2 border-white rounded-full p-1">
              <FaEdit size={16} />
            </button>
          </div>
        </div>
        <div className='mt-24'>
          <ProfileInfo />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileInfoPage;
