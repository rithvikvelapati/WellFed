import React from 'react';
import TopBar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Bottombar from '../components/Bottombar';
import { Box } from '@mui/material';
import './globals.css';

export const metadata = {
  title: 'WellFed',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
          {/* Sidebar on the left */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: '64px', // Bottom aligned with Bottombar
              width: '80px', // Fixed width for sidebar
              zIndex: 10,
            }}
          >
            <Sidebar />
          </Box>

          {/* Main content area */}
          <Box
            sx={{
              marginLeft: '80px', // Offset by the sidebar width
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '1200px', // Maximum width for content
              width: '100%', // Ensures the content fills the screen width
              margin: '0 auto', // Centers the content horizontally
              padding: '16px', // Add padding to the main content
              position: 'relative',
            }}
          >
            {/* TopBar at the top */}
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: '80px', // Matches the sidebar width
                right: 0,
                height: '64px', // Height of the TopBar
                zIndex: 20,
                backgroundColor: 'var(--bg-second)',
              }}
            >
              <TopBar />
            </Box>

            {/* Main content with correct spacing */}
            <Box
              sx={{
                marginTop: '64px', // Push content below the TopBar
                paddingBottom: '64px', // Space for the BottomBar
                marginLeft: '64px',
                flexGrow: 1,
              }}
            >
              <main className="w-full bg-third rounded-tl-lg overflow-auto pb-16">
                {children}
              </main>
            </Box>
          </Box>

          {/* BottomBar at the bottom */}
          <Box
            sx={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              height: '64px', // Height of the Bottombar
              zIndex: 15, // Higher than sidebar but lower than the TopBar
            }}
          >
            <Bottombar />
          </Box>
        </Box>
      </body>
    </html>
  );
}
