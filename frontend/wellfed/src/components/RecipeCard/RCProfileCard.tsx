"use client";
import React, { useState, useEffect } from 'react';
import { BsFillBookmarkFill, BsBookmark, BsChevronDown } from 'react-icons/bs';
import { recipeCard } from '../../constants';

const ProfileCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [description, setDescription] = useState<string>('Loading...');

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch('/api/recipe/description'); // Replace with your actual API endpoint
        if (!response.ok) throw new Error(`Failed to fetch description. Status: ${response.status}`);
        const result = await response.json();
        setDescription(result.description || 'No description available');
      } catch (error) {
        console.error('Error fetching description:', error);
        setDescription('Error loading description');
      }
    };

    fetchDescription();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="w-full overflow-hidden shadow-none pt-[20px]"> {/* Reduced padding */}
      <div className="p-4">
        {/* Avatar and Info Row */}
        <div className="flex items-center gap-2">
          <img
            src={recipeCard.profilePic}
            alt={recipeCard.name}
            className="w-[64px] h-[64px] rounded-full"
          />
          <div className="flex-grow">
            <h2 className="text-black text-[18px] font-semibold">{recipeCard.name}</h2>
            <p className="text-gray-500 text-[16px]">
              {recipeCard.recipes} recipes · From {recipeCard.location}
            </p>
          </div>
          <button onClick={toggleBookmark} className="text-[#EC9556]">
            {isBookmarked ? (
              <BsFillBookmarkFill size={24} />
            ) : (
              <BsBookmark size={24} />
            )}
          </button>
        </div>

        {/* Description */}
        <p
          className={`mt-2 text-black text-[13px] relative ${
            expanded ? '' : 'line-clamp-4'
          }`}
        >
          {description}
          {!expanded && (
            <span className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></span>
          )}
        </p>

        {/* Read More/Expand Section */}
        <div className="flex flex-col items-center mt-2">
          <p className="cursor-pointer" onClick={handleExpandClick}>
            {expanded ? 'Read less' : 'Read more'}
          </p>
          <button
            onClick={handleExpandClick}
            className={`transition-transform duration-500 transform ${
              expanded ? 'rotate-180' : 'rotate-0'
            }`}
          >
            <BsChevronDown size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
