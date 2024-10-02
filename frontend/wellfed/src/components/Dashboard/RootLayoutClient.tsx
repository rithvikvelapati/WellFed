'use client';

import React from 'react';
import TopBar from '../Topbar';
import BottomBar from '../Bottombar';
import { Box } from '@mui/material';
import ReduxProvider from '@/store/ReduxProvider'; // Import the Redux Provider
import SideBar from '../Sidebar';
import { usePathname } from 'next/navigation';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

const routeswithStandalone = ['/calendar-section/new-schedule','/calendar-section/meal-details','/calendar-section/meal-editdetails','/calendar-section/edit-event']

const RootLayoutClient: React.FC<RootLayoutClientProps> = ({ children }) => {

  const pathname = usePathname();
  const handleCameraClick = () => {
    console.log('Camera clicked');
  };

  const handleSearchClick = () => {
    console.log('Search clicked');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const showLayout = () => {
    if (routeswithStandalone.includes(pathname)) {
      return false;
    }
    return true;
  }

  return (
    <ReduxProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden' }}>
        {/* Sidebar */}
        {showLayout() &&
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '41px',
              zIndex: 10,
              backgroundColor: 'var(--bg-second)',
            }}
          >
            <SideBar />
          </Box>
        }

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: showLayout() ? '36px' : '0',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflowX: 'hidden',
          }}
        >
          {/* Top Bar */}
          {showLayout() &&
            <Box
              sx={{
                height: '64px',
                backgroundColor: 'var(--bg-second)',
                zIndex: 20,
                flexShrink: 0,
              }}
            >
              <TopBar />
            </Box>
          }

          {/* Page Content */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              backgroundColor: 'rgba(66, 143, 143, 0.1)',
              borderTopLeftRadius: '1rem',
              padding: '2px',
            }}
          >
            <main>{children}</main>
          </Box>

          {/* Bottom Bar */}
          {showLayout() &&
            <BottomBar
              onCameraClick={handleCameraClick}
              onSearchClick={handleSearchClick}
              onProfileClick={handleProfileClick}
            />
          }
        </Box>
      </Box>
    </ReduxProvider>
  );
};

export default RootLayoutClient;
