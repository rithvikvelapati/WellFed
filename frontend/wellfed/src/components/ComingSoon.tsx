// components/ComingSoon.tsx
"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; // For Next.js 13 App Router
// For Next.js 12 or using pages directory, use:
// import { useRouter } from 'next/router';

const ComingSoon: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    window.open('https://wellfed.us', '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Coming Soon!
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        This section isn&apos;t available in the current version of the app. We&apos;re working hard to bring it to you in future updates.
      </p>
      <button
        onClick={handleButtonClick}
        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-md "
      >
        Follow Us for Updates
      </button>
    </div>
  );
};

export default ComingSoon;
