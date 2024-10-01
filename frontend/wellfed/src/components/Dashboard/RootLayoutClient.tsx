'use client';

import React from 'react';
import TopBar from '@/components/TopBar/TopBar';
import BottomBar from '@/components/Bottombar';
import ReduxProvider from '@/store/ReduxProvider'; // Import the Redux Provider
import SideBar from '@/components/SideBar';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

const RootLayoutClient: React.FC<RootLayoutClientProps> = ({ children }) => {
  const handleCameraClick = () => {
    console.log('Camera clicked');
  };

  const handleSearchClick = () => {
    console.log('Search clicked');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  return (
    <ReduxProvider>
      <div className="flex min-h-screen overflow-x-hidden">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 bottom-0 w-[41px] z-10 bg-bg-second">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="flex-grow ml-[41px] flex flex-col h-screen overflow-x-hidden">
          {/* Top Bar */}
          <div className="h-[64px] bg-bg-second z-20 flex-shrink-0">
            <TopBar />
          </div>

          {/* Page Content */}
          <div className="flex-grow mb-10 overflow-y-auto overflow-x-hidden bg-[rgba(66,143,143,0.1)] rounded-tl-lg p-1">
            <main>{children}</main>
          </div>

          {/* Bottom Bar */}
          <BottomBar
            onCameraClick={handleCameraClick}
            onSearchClick={handleSearchClick}
            onProfileClick={handleProfileClick}
          />
        </div>
      </div>
    </ReduxProvider>
  );
};

export default RootLayoutClient;
