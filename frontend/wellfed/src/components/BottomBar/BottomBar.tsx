import React from 'react';
import Image from 'next/image';

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 w-full h-16 bg-white shadow-md flex justify-around items-center border-t border-gray-300">
      <button className="flex justify-center items-center">
        <Image
          src="/Camera.svg"
          alt="Camera Logo"
          width={24}
          height={24}
          priority
          className="dark:invert"
        />
      </button>
      <button className="flex justify-center items-center">
        <Image
          src="/Avatar.svg"
          alt="Avatar Logo"
          width={30}
          height={30}
          priority
          className="rounded-full border-2 border-orange-700"
        />
      </button>
      <button className="flex justify-center items-center">
        <Image
          src="/Search.svg"
          alt="Search Logo"
          width={24}
          height={24}
          priority
          className="dark:invert"
        />
      </button>
    </div>
  );
};

export default BottomBar;
