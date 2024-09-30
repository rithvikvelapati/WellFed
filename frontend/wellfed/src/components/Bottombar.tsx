'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface BottomBarProps {
  onCameraClick: () => void;
  onSearchClick: () => void;
  onProfileClick: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({
  onCameraClick,
  onSearchClick,
  onProfileClick,
}) => {
  const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen);

  // Track which button is selected
  const [selected, setSelected] = useState<'camera' | 'search' | 'profile'>('profile');

  if (isModalOpen) {
    return null; // Hide BottomBar when a modal is open
  }

  // Dynamic indicator bar width and selected class
  const selectedClass = (button: 'camera' | 'search' | 'profile') => {
    return selected === button
      ? 'border-t-4 border-orange-500 w-1/2' // Increase indicator width
      : '';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 m-0 p-0 z-50 flex justify-around items-center h-10 bg-white shadow-md">
      {/* Camera Button */}
      <button
        className={`flex flex-col items-center justify-center w-20 h-full ${selectedClass('camera')}`}
        onClick={() => {
          setSelected('camera');
          onCameraClick(); // Keeps the onCameraClick functionality
        }}
        aria-label="Open Camera"
      >
        <Image
          src="/Camera.svg"
          alt="Camera Icon"
          width={24}
          height={24}
          priority
        />
      </button>

      {/* Profile Button */}
      <button
        className={`flex flex-col items-center justify-center w-20 h-full ${selectedClass('profile')}`}
        onClick={() => {
          setSelected('profile');
          onProfileClick(); // Keeps the onProfileClick functionality
        }}
        aria-label="Open Profile"
      >
        <Image
          src="/Avatar.svg"
          alt="Avatar Icon"
          width={30}
          height={30}
          priority
        />
      </button>

      {/* Search Button */}
      <button
        className={`flex flex-col items-center justify-center w-20 h-full ${selectedClass('search')}`}
        onClick={() => {
          setSelected('search');
          onSearchClick(); // Keeps the onSearchClick functionality
        }}
        aria-label="Search"
      >
        <Image
          src="/Search.svg"
          alt="Search Icon"
          width={24}
          height={24}
          priority
        />
      </button>
    </div>
  );
};

export default BottomBar;

