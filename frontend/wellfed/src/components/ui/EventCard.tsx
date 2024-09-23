import React from 'react';
import Image from 'next/image';
import { FaStar, FaDollarSign } from 'react-icons/fa';

interface EventCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  users: string[];
  priceLevel: number;
  bookmarked: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  imageUrl,
  rating,
  reviewsCount,
  users,
  priceLevel,
  bookmarked,
}) => {

  const bookmarkImageUrl = bookmarked ? "/BookmarkTrue.svg" : "/BookmarkFalse.svg";
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg bg-white w-35">
      {/* Bookmark icon */}
      <div className="absolute top-2 right-2">
        <Image
          src={bookmarkImageUrl}  // Dynamic source based on bookmarked status
          alt="Bookmark Icon"
          width={25}
          height={25}
        />
      </div>

      {/* Event Image */}
      <Image
        src={imageUrl}
        alt={title}
        width={100} // Set the desired width
        height={200} // Set the desired height
        className="object-cover"
      />
      {/* Event Info */}
      <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-xs font-sans  text-white">{title}</h3>
        
        {/* Rating and Reviews */}
        <div className="flex items-center text-white text-xs mt-2">
          <FaStar className="text-yellow-400" />
          <span className="ml-1">{rating}</span>
          <span className="ml-2">({reviewsCount})</span>
        </div>

        {/* User Avatars */}
        <div className="flex -space-x-2 mt-2">
          {users.map((user, index) => (
            <img
              key={index}
              src={user}
              alt={`User ${index + 1}`}
              className="w-5 h-5 rounded-full border-2 border-white"
            />
          ))}
        </div>

        {/* Pricing */}
        <div className="flex items-center mt-2">
          {Array(priceLevel).fill(0).map((_, index) => (
            <FaDollarSign key={index} className="text-yellow-400 w-3 h-3" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
