'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NotificationIcon from './NotificationIcon';
import CartIcon from './CartIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const TopBar: React.FC = () => {
  const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen);

  if (isModalOpen) {
    return null; // Hide TopBar when a modal is open
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-[72px] w-full flex justify-end items-end pr-4 z-50">
      {/* Logo */}
      <Link href="/" passHref>
        <div className="absolute left-0 bottom-0 cursor-pointer mb-0">
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={40}
            height={40}
            priority
          />
        </div>
      </Link>
      {/* Icons */}
      <div className="flex items-end space-x-fluid-px mb-4">
        <NotificationIcon />
        <CartIcon />
      </div>
    </div>
  );
};

export default TopBar;
