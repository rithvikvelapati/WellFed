"use client";
import React, { useState, useRef, useEffect } from 'react';
import SearchOverlay from './SearchOverlay';

const SearchOverlayManager: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const handleCameraClick = () => {
    console.log('Camera Clicked');
  };

  const handleProfileClick = () => {
    console.log('Profile Clicked');
  };

  return (
    <>
      <SearchOverlay isOpen={showSearch} closeSearch={() => setShowSearch(false)} inputRef={inputRef} />
    </>
  );
};

export default SearchOverlayManager;
