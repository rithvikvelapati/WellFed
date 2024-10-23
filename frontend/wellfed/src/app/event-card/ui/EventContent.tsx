// ui/EventContent.tsx

"use client";

import React, { ReactNode, useState } from "react";
import { FaChevronDown, FaChevronUp, FaRegClock } from "react-icons/fa";

interface Event {
  overview: ReactNode;

  id: number;

  title: string;

  imageUrl: string;

  rating: number;

  bookmarked: boolean;

  description: string;

  duration: string;

}



interface EventContentProps {

  event: Event;

}

const EventContent: React.FC<EventContentProps> = ({ event }) => {
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);

  return (
    <div className="relative p-4 flex flex-col justify-between bg-white rounded-t-3xl h-[50vh] mt-[-20px] z-10">
      {/* Event Duration */}
      <div className="w-32 flex flex-col items-start space-y-2 mb-4">
        <FaRegClock className="text-primary w-6 h-6 ml-4" />
        <h3 className="text-slate-900 text-lg font-bold">Duration</h3>
        <span className="text-slate-400 text-base font-medium">{event.duration}</span>
      </div>

      {/* Overview Section */}
      <div className="border-t border-gray-300 pt-4 flex-1 relative">
        <button
          onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
          className="flex items-center justify-between w-full focus:outline-none"
        >
          <h2 className="text-xl font-bold">Overview</h2>
          {isOverviewExpanded ? (
            <FaChevronUp className="w-5 h-5" />
          ) : (
            <FaChevronDown className="w-5 h-5" />
          )}
        </button>

        {/* Collapsible Content */}
        <div
          className={`mt-2 overflow-hidden transition-max-height duration-500 ${
            isOverviewExpanded ? "max-h-screen" : "max-h-20"
          }`}
        >
          <p className="text-gray-700">{event.overview}</p>
        </div>

        {/* Overlay when collapsed */}
        {!isOverviewExpanded && (
          <div className="absolute bottom-16 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
        )}
      </div>

      {/* Join Event Button */}
      <div className="mt-4">
        <button
          onClick={() => {
            /* Handle Join Event action */
          }}
          className="w-full py-3 mb-2 bg-gradient-to-r from-primary to-secondary text-white text-lg font-semibold rounded-xl focus:outline-none"
        >
          Join Event
        </button>
      </div>
    </div>
  );
};

export default EventContent;
