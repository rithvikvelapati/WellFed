"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { FaMapMarkerAlt, FaEdit, FaPlus } from "react-icons/fa"; // Location, Edit, and Plus icons
import { GoClockFill } from "react-icons/go";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useUser } from "@clerk/nextjs";
import { BASE_URL, GET_MEALS } from "@/constants/api";

interface Event {
  title: string;
  date: string; // ISO date string
  time: {
    start: string; // Time in "h:mm A" format
    end: string; // Time in "h:mm A" format
  };
  recipes: string[]; // Array of recipe IDs
  notes: string;
  createdBy: string; // User ID of the creator
  createdAt: string; // ISO date string
  updatedBy: string; // User ID of the last updater
  updatedAt: string; // ISO date string
  colorClass: string;
  bgColor: string;
  location: string;
}

const CalendarHome: React.FC = () => {
  const router = useRouter(); // Initialize Next.js router for navigation

  const [events, setEvents] = useState<Event[]>([]);
  const [orignalEvents, setOrignalEvents] = useState<Event[]>([]);

  const [calenderEvents, setCalenderEvents] = useState<Event[]>([]);
  const { isSignedIn, user } = useUser();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      fetchMeals();
    }
  }, [isSignedIn, user])

  const fetchMeals = async () => {
    try {
      const mealsUrl = BASE_URL + GET_MEALS + user?.id;
      const response = await fetch(mealsUrl);
      const meals = await response.json();
      setOrignalEvents(meals)
      const dts = getFiltedData(meals)

      setEvents(dts as any)
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  const getFiltedData = (data: Event[], date?: Date) => {
    const today = date || new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const filteredData = data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startOfDay && itemDate <= endOfDay;
    });

    return filteredData;
  }

  const handleEventClick = (info: any) => {
    const eventDetails = info.event;
    const selected = events.find((e) => e.title === eventDetails.title);
    if (selected) setSelectedEvent(selected);
  };

  const handleDateSelect = (selectInfo: any) => {
    //  const title = prompt("Enter Event Title");
    setCalenderEvents([{
      title: 'Selected',
      start: selectInfo.startStr,
      allDay: true,
      backgroundColor: '#ff9f89', // Highlight color
      borderColor: '#ff9f89',
    } as any]);

    const dts = getFiltedData(orignalEvents, selectInfo.start)

    setEvents(dts as any)
  };


  return (
    <div className="container mx-auto p-0 bg-none min-h-screen rounded-xl">
      <div className="bg-none rounded-xl">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calenderEvents}
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
            onClick={() => router.push('/calendar-section/add-event')} // Redirect to new schedule page
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
                <p className="text-sm text-gray-600 italic">{event.notes}</p>
                <div className="flex items-center mt-2">
                  {/* Time Icon */}
                  <div className="flex items-center text-sm text-blue-700 space-x-2">
                    <GoClockFill className="text-blue-700" />
                    <span>{event.time.start} - {event.time.end}</span>
                  </div>
                  {/* Location Icon */}
                  <div className="flex items-center text-sm text-gray-500 space-x-2 ml-4">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span>{event.location || 'Home'} </span>
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
