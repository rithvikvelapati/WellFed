// ui/EventBanner.tsx

"use client";

import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const EventBanner: React.FC = () => {
  const event = {
    imageUrl: "/SanFran.png",
    title: "SF Night Grille",
    description: "Join us in the heart of San Francisco for a night of delicious food and great company.",
    rating: 4.5,
    totalRatings: 120,
  };

  return (
    <div className="relative w-full h-[50vh]">
      {/* Background Image */}
      <Image
        src={event.imageUrl}
        alt={event.title}
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">

        {/* Title and Description */}
        <h1 className="text-3xl font-bold mb-2 text-center">{event.title}</h1>
        <p className="text-center max-w-md">{event.description}</p>
        {/* Ratings at the bottom */}
        <div className="absolute bottom-8 flex items-center space-x-1">
          <FaStar className="text-secondary" />
          <span className="text-lg font-semibold">{event.rating}</span>
          <span>({event.totalRatings} ratings)</span>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
