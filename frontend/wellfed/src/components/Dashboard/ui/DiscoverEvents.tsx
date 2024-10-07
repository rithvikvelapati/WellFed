"use client";

import React from "react";
import HorizontalScrollContainer from "@/components/HorizontalScrollContainer";
import EventCard from "@/components/EventCard";
import { eventsData } from "@/constants";

const DiscoverEvents: React.FC = () => {
  const [events, setEvents] = React.useState(eventsData);
  const toggleBookmark = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, bookmarked: !event.bookmarked } : event
      )
    );
  };
  return (
    <HorizontalScrollContainer className="bg-gradient-to-r from-backgroundDash to-inherit">
      <div className="py-2 space-x-fluid-px drop-shadow-xl">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          toggleBookmark={toggleBookmark}
        />
      ))}
      </div>
    </HorizontalScrollContainer>
  );
};
export default DiscoverEvents;
