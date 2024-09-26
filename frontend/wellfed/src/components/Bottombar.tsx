'use client';

import React from 'react';
import Image from 'next/image';
import { useModalContext } from '../context/ModalContext';

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
  const { isModalOpen } = useModalContext();

  if (isModalOpen) {
    return null; // Hide BottomBar when a modal is open
  }

  return (
    <div className="z-0 fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-white shadow-md">
      {/* Camera Button */}
      <button
        className="flex items-center justify-center"
        onClick={onCameraClick}
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
        className="flex items-center justify-center"
        onClick={onProfileClick}
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
        className="flex items-center justify-center"
        onClick={onSearchClick}
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

