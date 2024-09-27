'use client';

import React from 'react';
import TopBar from '../Topbar';
import Sidebar from '../Sidebar';
import BottomBar from '../Bottombar';
import { Box } from '@mui/material';
import ReduxProvider from '@/store/ReduxProvider'; // Import the Redux Provider

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
      <Box sx={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden' }}>
        {/* Sidebar */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: '80px',
            zIndex: 10,
            backgroundColor: 'var(--bg-second)',
          }}
        >
          <Sidebar />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: '80px',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflowX: 'hidden',
          }}
        >
          {/* Top Bar */}
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

          {/* Page Content */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              backgroundColor: '#bad4d4',
              borderTopLeftRadius: '1rem',
              padding: '16px',
            }}
          >
            <main>{children}</main>
          </Box>

          {/* Bottom Bar */}
          <BottomBar
            onCameraClick={handleCameraClick}
            onSearchClick={handleSearchClick}
            onProfileClick={handleProfileClick}
          />
        </Box>
      </Box>
    </ReduxProvider>
  );
};

export default RootLayoutClient;
