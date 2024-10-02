import React from 'react';
import Image from 'next/image';
import { FaBookmark, FaRegBookmark, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    imageUrl: string;
    rating: number;
    bookmarked: boolean;
  };
  toggleBookmark: (id: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, toggleBookmark }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Full stars (e.g., 4 in 4.5)
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
    const totalStars = 5; // Total number of stars

    return (
      <div className="flex items-center text-sm mt-1 space-x-1">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} style={{ color: '#EC9556' }} />
        ))}

        {/* Half Star (if any) */}
        {hasHalfStar && <FaStarHalfAlt style={{ color: '#EC9556' }} />}

        {/* Empty Stars */}
        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <FaRegStar key={i} style={{ color: '#EC9556' }} />
        ))}
      </div>
    );
  };

  return (
    <div className="relative inline-block flex-shrink-0 min-w-[145px] min-h-[190px] bg-gray-200 rounded-xl overflow-hidden">
      {/* Event Background Image */}
      <Image
        src={event.imageUrl}
        alt={event.title}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-lg"
      />

      {/* Bookmark Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleBookmark(event.id);
        }}
        className="absolute top-3 right-4 text-lg z-10"
        style={{ color: event.bookmarked ? '#EC9556' : '#EC9556' }}
      >
        {event.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </button>

      {/* Title and Rating Over the Image */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-10">
        <h3 className="text-sm font-semibold">{event.title}</h3>
        {/* Render stars */}
        {renderStars(event.rating)}
      </div>
    </div>
  );
};

export default EventCard;
