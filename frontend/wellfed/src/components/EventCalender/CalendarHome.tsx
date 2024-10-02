"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { FaMapMarkerAlt, FaEdit, FaPlus } from "react-icons/fa"; // Location, Edit, and Plus icons
import { GoClockFill } from "react-icons/go";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

interface Event {
  title: string;
  start: string;
  description: string;
  time: string;
  location: string;
  icon: string;
  colorClass: string; // Color class for top border
  bgColor: string;    // Background color for the card
}

const CalendarHome: React.FC = () => {
  const router = useRouter(); // Initialize Next.js router for navigation

  const [events, setEvents] = useState<Event[]>([
    {
      title: "Sunny Grille",
      start: "2024-09-23T09:00:00",
      description: "Soccer Game Event",
      time: "09:00am - 1:00pm",
      location: "Stamford Bridge",
      icon: "/avatar1.png",
      colorClass: "bg-[#428F8F]", // Top border color
      bgColor: "bg-white "     // Card background color
    },
    {
      title: "Chicken Marsala And Mushrooms",
      start: "2024-09-23T15:00:00",
      description: "Items ordered and delivered",
      time: "3:00pm - 4:00pm",
      location: "Home",
      icon: "/avatar2.png",
      colorClass: "bg-[#EE2B00]",
      bgColor: "bg-white"
    },
    {
      title: "Coffee and Shortbread Cookies",
      start: "2024-09-28T21:00:00",
      description: "Family gathering",
      time: "9:00pm - 10:00pm",
      location: "Home",
      icon: "/avatar3.png",
      colorClass: "bg-[#EC9556]",
      bgColor: "bg-white"
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (info: any) => {
    const eventDetails = info.event;
    const selected = events.find((e) => e.title === eventDetails.title);
    if (selected) setSelectedEvent(selected);
  };

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt("Enter Event Title");
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // Clear date selection

    if (title) {
      setEvents([
        ...events,
        {
          title,
          start: selectInfo.startStr,
          description: "",
          time: "",
          location: "",
          icon: "/avatar1.png",
          colorClass: "bg-green-200",
          bgColor: "bg-green-100"
        },
      ]);
    }
  };

  return (
    <div className="container mx-auto p-0 bg-transparent min-h-screen rounded-lg">
      <div className="bg-transparent p-0 rounded-lg pl-1">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          selectable={true}
          select={handleDateSelect}
          dayMaxEventRows={true}
          eventContent={(eventInfo) => (
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${eventInfo.event.extendedProps.colorClass}`} />
              <span className="text-xs"></span>
            </div>
          )}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="auto"
        />
      </div>

      {/* Schedule Section */}
      <div className="mt-8 pl-1">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Schedule</h2>

          {/* Add Event Button next to the Schedule heading */}
          <button
            className="bg-[#428F8F] text-white p-3 rounded-full shadow-md"
            onClick={() => router.push('/calendar-section/new-schedule')} // Redirect to new schedule page
          >
            <FaPlus className="text-white" />
          </button>
        </div>

        <div className="space-y-4 mt-4">
          {events.map((event, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg shadow-md flex justify-between items-center relative  ${event.bgColor}`} // Use bgColor for card background
            >
              {/* Top border */}
              <div className={`absolute top-0 left-0 w-full h-2 ${event.colorClass} rounded-t-lg`} />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-sm text-gray-600 italic">{event.description}</p>
                <div className="flex items-center mt-2">
                  {/* Time Icon */}
                  <div className="flex items-center text-sm text-blue-700 space-x-2">
                    <GoClockFill className="text-blue-700" />
                    <span>{event.time}</span>
                  </div>
                  {/* Location Icon */}
                  <div className="flex items-center text-sm text-gray-500 space-x-2 ml-4">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Avatars */}
                <div className="flex -space-x-2">
                  <img
                    src="/Profile1.svg"
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  {/* Add more avatars if needed */}
                  <img
                    src="/Profile2.svg"
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src="/Profile3.svg"
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                </div>
                {/* Edit Button */}
                <button
                  className="p-4 rounded-full text-[#B64B29] absolute right-0 -bottom-2"
                  onClick={() => router.push('/calendar-section/edit-event')} // Redirect to edit event page
                >
                  <FaEdit className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}

          {/* Extra Event Card (Add New Event) */}
          <div className="relative p-4 rounded-lg shadow-md bg-[#f3f4f6]">
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-2 rounded-t-lg bg-gradient-to-r from-[#B64B29] to-[#EC9556]" />

            {/* Centered Plus Icon */}
            <div className="flex justify-center items-center h-20">
              <button className="p-3 bg-white text-[#B64B29] border-2 border-[#B64B29] rounded-full shadow-md" onClick={() => router.push('/calendar-section/new-schedule')}>
                <FaPlus className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CalendarHome;