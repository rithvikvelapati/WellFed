import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SearchOverlayProps {
  isOpen: boolean;
  closeSearch: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, closeSearch, inputRef }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement && event.target.id === 'search-overlay') {
      closeSearch();
    }
  };

  return (
    <div
      id="search-overlay"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white shadow-lg flex items-center p-3 rounded-lg w-3/4 max-w-lg"
        style={{ position: 'relative', top: '-10%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-2">
          <Link href="/search-results">
            <Image src="/SearchIcon.svg" alt="Search" width={24} height={24} />
          </Link>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search recipes..."
          className="flex-grow py-2 px-4 bg-transparent text-gray-500 placeholder-gray-500 outline-none"
          autoFocus
        />
      </div>
    </div>
  );
};

export default SearchOverlay;
