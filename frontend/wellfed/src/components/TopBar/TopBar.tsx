import React from 'react';

const TopBar = () => {
  return (
    <div className="fixed top-0 w-full h-16 bg-white shadow-md flex justify-between items-center px-4 z-10">
      {/* Back Button */}
      <button className="text-[#B64B29] flex items-center">
        <i className="fas fa-arrow-left"></i>
      </button>

      {/* Title */}
      <h1 className="text-lg font-semibold text-black">My Profile</h1>

      {/* Save Button */}
      <button className="text-[#B64B29] font-semibold">
        Save
      </button>
    </div>
  );
};

export default TopBar;
