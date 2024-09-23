"use client"; // This ensures that this is a client-side component

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

interface Event {
  title: string;
  start: string;
  description: string;
  time: string;
  location: string;
  icon: string;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      title: "Sunny Grille",
      start: "2024-09-28T09:00:00",
      description: "Soccer Game Event",
      time: "09:00am - 1:00pm",
      location: "Stamford Bridge",
      icon: "/avatar1.png",
    },
    {
      title: "Chicken Marsala And Mushrooms",
      start: "2024-09-28T15:00:00",
      description: "Items ordered and delivered",
      time: "3:00pm - 4:00pm",
      location: "Home",
      icon: "/avatar2.png",
    },
    {
      title: "Coffee and Shortbread Cookies",
      start: "2024-09-28T21:00:00",
      description: "Family gathering",
      time: "9:00pm - 10:00pm",
      location: "Home",
      icon: "/avatar3.png",
    },
  ]);

  const handleEventClick = (info: any) => {
    const eventDetails = info.event;
    alert(`Event: ${eventDetails.title}\nDescription: ${eventDetails.extendedProps.description}`);
  };

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt("Enter Event Title");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

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
        },
      ]);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-[#dfecec] min-h-screen rounded-lg">
      <div className="bg-white shadow-md p-4 rounded-lg">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          selectable={true}
          select={handleDateSelect}
          dayMaxEventRows={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="auto"
        />
      </div>

      {/* Schedule Section */}
      <div className="mt-8">
        <h2 className="text-lg font-bold">Schedule</h2>
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
