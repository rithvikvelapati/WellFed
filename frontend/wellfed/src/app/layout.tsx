import React from 'react';
import TopBar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
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
        <div className="flex h-screen overflow-hidden">
          <div className="fixed top-0 left-0 h-full w-20 z-10">
            <Sidebar />
          </div>
          <div className="fixed top-0 left-20 right-0 h-16 z-10">
              <TopBar />
          </div>
        </div>
      </body>
    </html>
  );
}
