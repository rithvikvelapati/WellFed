import React from 'react';
import TopBar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Bottombar from '../components/Bottombar';
import { Box } from '@mui/material';
import './globals.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
 });

export const metadata = {
  title: "WellFed",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
        <body className="flex flex-col h-screen">
            <div className="fixed top-0 left-0 h-full w-15 z-10 bg-secondary">
              <Sidebar />
            </div>
            <div className="fixed top-0 left-12 right-0 h-16 z-20 bg-secondary">
              <TopBar />
            </div>
            <div className="flex-col mt-12 ml-12">
              <main className="w-full pt-8 bg-third overflow-auto">
                {children}
              </main>
            </div>
        </body>
      </html>
  );
}
