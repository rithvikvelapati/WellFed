"use client";

import React from 'react';
import Image from 'next/image';

// Define the props interface
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
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-white shadow-md z-50">
      {/* Camera Button */}
      <button
        className="flex items-center justify-center"
        onClick={onCameraClick}
        aria-label="Open Camera"
      >
        <Image
          src="/Camera.svg"
          alt="Camera Logo"
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
          alt="Avatar Logo"
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
          alt="Search Logo"
          width={24}
          height={24}
          priority
        />
      </button>
    </div>
  );
};

export default BottomBar;
