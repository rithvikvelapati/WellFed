import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from 'react';
import TopBar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import '../app/globals.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
 });

export const metadata = {
  title: "WellFed",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex flex-col h-screen">
          {/* Signed Out - Show Sign In Button */}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          {/* Signed In - Show Layout with Sidebar and TopBar */}
          <SignedIn>
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
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>

  );
}
