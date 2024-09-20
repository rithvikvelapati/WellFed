import React from 'react';
import TopBar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import '../app/globals.css';

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
        <div className="flex flex-col h-screen">
          <div className="fixed top-0 left-0 h-full w-15 z-10 bg-second">
            <Sidebar />
          </div>
          <div className="fixed top-0 left-12 right-0 h-16 z-20 bg-second">
            <TopBar />
          </div>

          {/* Main Content Area */}
          <div className="flex-col mt-12 ml-12">
            {/* Main Dashboard Content - Scrollable */}
            <main className="w-full -pt-8 -pl-8 bg-third rounded-tl-lg overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
