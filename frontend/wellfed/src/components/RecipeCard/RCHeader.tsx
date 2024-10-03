"use client";
import React, { useState } from 'react';
import { FaRegPlayCircle, FaRegPauseCircle, FaRegHeart, FaHeart, FaChevronLeft, FaShareAlt } from "react-icons/fa";
import { recipeCard } from '../../constants';

const RecipeCardHeader = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [likes, setLikes] = useState(recipeCard.likes);

  const handlePlayClick = () => {
    const video = document.getElementById('backgroundVideo') as HTMLVideoElement;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setLikes(isFavorite ? likes - 1 : likes + 1);
  };

  const handleBack = () => {
    console.log('Go back');
  };

  const handleShare = () => {
    console.log('Share this video');
  };

  return (
    <div className="flex justify-center items-start w-full">
      <div className="relative w-full min-w-[375px] h-[455px] bg-white shadow-lg">
        <video
          id="backgroundVideo"
          muted
          loop
          className="absolute w-full h-full top-0 left-0 object-cover z-0"
          src={recipeCard.videoSrc}
        ></video>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-2 left-2 z-20 text-white text-[24px]"
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Likes and Share */}
        <div className="absolute top-2 right-2 z-20 flex flex-col items-center text-white">
          <div className="flex items-center">
            <span className="text-[18px]">{likes}</span>
            <button onClick={toggleFavorite} className={`ml-2 ${isFavorite ? 'text-red-500' : 'text-white'}`}>
              {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </button>
          </div>
          <button onClick={handleShare} className="mt-4">
            <FaShareAlt size={24} />
          </button>
        </div>

        {/* Gradient background for content */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent text-white p-4 z-10">
          <div className="text-[18px]">{recipeCard.category}</div>
          <h1 className="text-[35px] font-bold">{recipeCard.title}</h1>
          <div className="flex justify-center items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-[18px] ${i < Math.round(recipeCard.rating) ? 'text-orange-400' : 'text-gray-400'}`}
              >
                ★
              </span>
            ))}
            <span className="text-[16px]">{recipeCard.rating} ({recipeCard.ratingsCount} ratings)</span>
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayClick}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl z-20"
        >
          {isPlaying ? <FaRegPauseCircle size={48} /> : <FaRegPlayCircle size={48} />}
        </button>
      </div>
    </div>
  );
};

export default RecipeCardHeader;
