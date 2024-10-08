import React from "react";
import Image from "next/image";
import {
  FaBookmark,
  FaRegBookmark,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";

interface Event {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  bookmarked: boolean;
}

interface EventCardProps {
  event: Event;
  toggleBookmark: (id: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, toggleBookmark }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center text-sm mt-1 space-x-1 text-[#EC9556]">
        {/* Full Stars */}
        {Array.from({ length: fullStars }, (_, i) => (
          <FaStar key={`full-${i}`} />
        ))}

        {/* Half Star */}
        {hasHalfStar && <FaStarHalfAlt key="half" />}

        {/* Empty Stars */}
        {Array.from({ length: emptyStars }, (_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="relative inline-block w-[145px] h-[190px] rounded-xl overflow-hidden drop-shadow-lg">
      {/* Event Background Image */}
      <Image
        src={event.imageUrl}
        alt={event.title}
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, 145px"
        priority
      />

      {/* Bookmark Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleBookmark(event.id);
        }}
        className="absolute top-2 right-2 text-lg z-10 text-[#EC9556]"
        aria-label={event.bookmarked ? "Remove Bookmark" : "Add Bookmark"}
      >
        {event.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </button>

      {/* Title and Rating Over the Image */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-10 bg-gradient-to-t from-black via-transparent to-transparent">
        <h3 className="text-sm font-semibold">{event.title}</h3>
        {/* Render stars */}
        {renderStars(event.rating)}
      </div>
    </div>
  );
};

export default EventCard;
