'use client';

import React, { useState } from 'react';
import TopBar from '@/components/TopBar/TopBar';
import BottomBar from '@/components/Bottombar';
import ReduxProvider from '@/store/ReduxProvider'; // Import the Redux Provider
import SideBar from '../Sidebar';
import { usePathname, useRouter } from 'next/navigation';
import SearchModal from '@/components/SearchModal';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

const routeswithStandalone = [
  '/calendar-section/new-schedule',
  '/calendar-section/meal-details',
  '/calendar-section/meal-editdetails',
  '/calendar-section/edit-event',
  '/profile-section/profile-info',
  '/cart-section/shopping-list',
  '/cart-section/recipe-ingrediants',
  '/cart-section/review-ingrediants',
  '/sign-in',
  '/sign-up'
];

const RootLayoutClient: React.FC<RootLayoutClientProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleCameraClick = () => {
    console.log('Camera button clicked!');
  };

  // Update handleProfileClick to navigate to the dashboard-links page
  const handleProfileClick = () => {
    router.push('/dashboard-links'); // Navigate to dashboard-links page
  };

  const showLayout = () => {
    if (routeswithStandalone.includes(pathname)) {
      return false;
    }
    return true;
  };

  return (
    <ReduxProvider>
      <div className="flex min-h-screen overflow-x-hidden">
        {/* Sidebar */}
        {showLayout() && (
          <div className="fixed top-0 left-0 bottom-0 w-[41px] z-10 bg-bg-second">
            <SideBar />
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-grow ${!showLayout() ? 'ml-0' : 'ml-[41px]'} flex flex-col h-screen overflow-x-hidden`}>
          {/* Top Bar */}
          {showLayout() && (
            <div className="h-[64px] bg-bg-second z-20 flex-shrink-0">
              <TopBar />
            </div>
          )}

          {/* Page Content */}
          <div className="flex-grow mb-10 overflow-y-auto overflow-x-hidden bg-[rgba(66,143,143,0.1)] rounded-tl-lg p-1">
            <main>{children}</main>
          </div>

          {/* Render SearchModal when isSearchModalOpen is true */}
          {isSearchModalOpen && (
            <SearchModal onClose={() => setIsSearchModalOpen(false)} />
          )}
          {/* Bottom Bar */}
          {showLayout() && (
            <BottomBar
              onCameraClick={handleCameraClick}
              onSearchClick={() => setIsSearchModalOpen(true)}
              onProfileClick={handleProfileClick} // Trigger navigation on profile click
            />
          )}
        </div>
      </div>
    </ReduxProvider>
  );
};

export default RootLayoutClient;
