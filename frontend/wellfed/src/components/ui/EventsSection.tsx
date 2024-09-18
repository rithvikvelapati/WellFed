import React from 'react';
import EventCard from './EventCard';

const EventsSection = () => {
  const eventData1 = {
    title: "SF Night Grille",
    imageUrl: "/SF.svg",
    rating: 4.5,
    reviewsCount: 32,
    users: [
      "https://example.com/avatar1.jpg",
      "https://example.com/avatar2.jpg",
      "https://example.com/avatar3.jpg"
    ],
    priceLevel: 2,
    bookmarked: true
  };

  const eventData2 = {
    title: "SF Night Grille",
    imageUrl: "/SF.svg",
    rating: 3.5,
    reviewsCount: 20,
    users: [
      "https://example.com/avatar1.jpg",
      "https://example.com/avatar2.jpg",
      "https://example.com/avatar3.jpg"
    ],
    priceLevel: 1,
    bookmarked: false
  };

  return (
      <div className="relative overflow-x-auto scrollbar-hide">

        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <EventCard {...eventData1} />
          </div>
          <div className="flex-shrink-0">
            <EventCard {...eventData2} />
          </div>
          <div className="flex-shrink-0">
            <EventCard {...eventData1} />
          </div>
          <div className="flex-shrink-0">
            <EventCard {...eventData2} />
          </div>
          <div className="flex-shrink-0">
            <EventCard {...eventData1} />
          </div>
          <div className="flex-shrink-0">
            <EventCard {...eventData2} />
          </div>
        </div>
      </div>
  );
};

export default EventsSection;
