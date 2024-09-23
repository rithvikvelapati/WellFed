"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const TopBar = () => {
  // State to track which icon is active (notification or cart)
  const [activeIcon, setActiveIcon] = useState('');

  // Function to handle icon click and set the active icon
  const handleIconClick = (iconName: string) => {
    setActiveIcon(iconName);
  };

  return (
    <div className="bg-white p-4 flex justify-end items-center">
      <div className="flex items-center space-x-8">
        <Link href="/notifications" passHref>
          <div
            className="relative cursor-pointer"
            onClick={() => handleIconClick('notification')}
          >
            <img
              src="/Notification.svg"
              alt="Notification"
              width={25}
              height={25}
              className="transition-all duration-150"
            />
          </div>
        </Link>

        <Link href="/cart" passHref>
          <div
            className="relative cursor-pointer"
            onClick={() => handleIconClick('cart')}
          >
            <img
              src="/Shopping cart.svg"
              alt="Shopping Cart"
              width={25}
              height={25}
              className="transition-all duration-150"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
