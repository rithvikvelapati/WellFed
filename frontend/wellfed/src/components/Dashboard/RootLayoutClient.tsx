"use client";

import React from 'react';
import TopBar from '../Topbar';
import Sidebar from '../Sidebar';
import BottomBar from '../Bottombar';
import { Box } from '@mui/material';

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
    <Box sx={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden' }}>
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

      <Box
        sx={{
          flexGrow: 1,
          marginLeft: '60px',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflowX: 'hidden',
        }}
      >
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

        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: '#bad4d4',
            borderTopLeftRadius: '1rem',
            padding: '8px',
          }}
        >
          <main>{children}</main>
        </Box>

        <Box
          sx={{
            height: '64px',
            backgroundColor: '#fff',
            zIndex: 15,
            flexShrink: 0,
          }}
        >
          <BottomBar
            onCameraClick={handleCameraClick}
            onSearchClick={handleSearchClick}
            onProfileClick={handleProfileClick}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RootLayoutClient;
