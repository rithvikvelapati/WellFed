'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { sidebarIcons } from '../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const SideBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen);

  const initialPath =
    pathname === '/' || pathname.startsWith('/home') ? '/' : pathname;
  const [activeIcon, setActiveIcon] = useState(initialPath);

  useEffect(() => {
    setActiveIcon(
      pathname === '/' || pathname.startsWith('/home') ? '/' : pathname
    );
  }, [pathname]);

  const handleIconClick = (iconPath: string) => {
    setActiveIcon(iconPath);
    router.push(iconPath);
  };

  // Separate the last icon from the rest
  const mainIcons = sidebarIcons.slice(0, -1);
  const lastIcon = sidebarIcons[sidebarIcons.length - 1];

  if (isModalOpen) {
    return null; // Hide SideBar when a modal is open
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-10 flex flex-col bg-white pt-32 z-40">
      {/* Top Icons */}
      <div className="flex flex-col space-y-2">
        {mainIcons.map((item) => (
          <div
            key={item.name}
            className={`relative flex items-center w-full h-14 cursor-pointer transition-transform duration-300 ${
              activeIcon === item.path ? '-translate-y-2' : 'translate-y-0'
            }`}
            onClick={() => handleIconClick(item.path)}
          >
            {/* Background for active icon */}
            {activeIcon === item.path && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-r-lg -z-10"></div>
            )}

            {/* Indicator on the left side */}
            {activeIcon === item.path && (
              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-white rounded-tr-lg rounded-br-lg"></div>
            )}

            {/* Icon Image */}
            <div className="pl-1">
              <Image
                src={item.src}
                alt={item.label}
                width={22}
                height={22}
                className={`transition duration-500 ${
                  activeIcon === item.path ? 'filter invert brightness-0' : ''
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Spacer to push last icon to the bottom */}
      <div className="flex-grow"></div>

      {/* Last Icon at the bottom */}
      <div className="mb-8">
        <div
          key={lastIcon.name}
          className={`relative flex items-center w-full h-14 cursor-pointer transition-transform duration-300 ${
            activeIcon === lastIcon.path ? '-translate-y-2' : 'translate-y-0'
          }`}
          onClick={() => handleIconClick(lastIcon.path)}
        >
          {/* Background for active icon */}
          {activeIcon === lastIcon.path && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-r-lg -z-10"></div>
          )}
          {activeIcon === lastIcon.path && (
            <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-white rounded-tr-lg rounded-br-lg"></div>
          )}

          {/* Icon Image */}
          <div className="pl-1 z-50">
            <Image
              src={lastIcon.src}
              alt={lastIcon.label}
              width={24}
              height={24}
              className={`transition duration-500 ${
                activeIcon === lastIcon.path ? 'filter invert brightness-0' : ''
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
