// components/SearchModal.tsx

import React from 'react';

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-start pt-20">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-3xl focus:outline-none"
        aria-label="Close Search"
      >
        &times;
      </button>

      {/* Search Input */}
      <div className="absolute top-48 w-full py-4 px-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-4 text-lg bg-white rounded-xl focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchModal;
