"use client";

import React, { useEffect, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  setMonth,
  eachDayOfInterval,
} from "date-fns";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaCalendarDay } from "react-icons/fa";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setModalOpen } from "@/store/modalSlice";

// Helper function to generate time slots
const generateTimeSlots = (interval: number) => {
  const times = [];
  let start = 0; // Start at 00:00 (midnight)
  let end = 24 * 60; // End at 24:00

  for (let i = start; i < end; i += interval) {
    const hours = Math.floor(i / 60);
    const minutes = i % 60;
    const timeString = `${hours % 12 === 0 ? 12 : hours % 12}:${
      minutes === 0 ? "00" : minutes
    } ${hours >= 12 ? "PM" : "AM"}`;
    times.push(timeString);
  }

  return times;
};

const AddEvent: React.FC = () => {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("12:00 PM");
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();

  // Set modal open state to true when component mounts
  useEffect(() => {
    dispatch(setModalOpen(true));
    return () => {
      dispatch(setModalOpen(false));
    };
  }, [dispatch]);

  // Animation variants for sliding in from left to right
  const modalVariants = {
    initial: {
      x: "-100vw", // Start from the left
      opacity: 0,
    },
    animate: {
      x: 0, // Slide to the center
      opacity: 1,
      transition: { type: "tween", duration: 0.5 },
    },
    exit: {
      x: "100vw", // Slide out to the right
      opacity: 0,
      transition: { type: "tween", duration: 0.5 },
    },
  };

  const handleClose = () => {
    router.push("/calendar-section"); // Navigate back to the previous page
  };

  // Generate array of days for the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Handle month change from dropdown
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    const newMonth = Number(event.target.value) - 1; // Convert to 0-based month index
    setCurrentMonth(setMonth(currentMonth, newMonth));
  };

  const handleDateChange = (day: Date) => {
    setSelectedDate(day);
  };

  // Generate time slots for every 30 minutes
  const timeSlots = generateTimeSlots(30);

  // Navigate to meal details page on `+` button click
  const handleAddToMealDetails = () => {
    router.push("/calendar-section/meal-details");
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={handleClose}
            className="pl-2 focus:outline-none"
            aria-label="Close Modal"
          >
            <IoIosArrowBack className="text-2xl text-gray-700 mt-4" />
          </button>
          <h2 className="text-3xl font-semibold mt-6 mb-2">New Schedule</h2>
          <p className="text-xl mt-5 mr-3">Cancel</p>
        </div>
        <div className="mt-5">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md shadow-emerald-600">
            {/* Toggle Buttons */}
            <div className="flex items-center justify-between rounded-md p-1 px-12 mb-8">
              <button className="w-1/2 py-2 text-center font-medium bg-gradient-to-r shadow-[3px_1px_7px_1px_#dcdcdc] from-[#B64B29] to-[#EC9556] text-white rounded-l-xl">
                New Meal
              </button>
              <button className="w-1/2 py-2 text-center font-medium shadow-[3px_1px_7px_1px_#dcdcdc] rounded-r-xl">
                New Event
              </button>
            </div>

            {/* Month Selector */}
            <div className="rounded-t-[2.5rem] shadow-[0px_0px_15px_5px_#dcdcdc] p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-xl">Date</p>
                <Select
                  labelId="month-select-label"
                  id="month-select"
                  value={currentMonth.getMonth() + 1} // Use 1-based month for Select
                  onChange={handleMonthChange}
                  className="h-8 border-none"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {format(new Date(0, i), "MMMM")}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={handlePrevMonth}
                    className="text-gray-600 font-medium"
                  >
                    {"<"}
                  </button>
                  <span className="text-lg font-semibold">
                    {format(currentMonth, "MMMM yyyy")}
                  </span>
                  <button
                    onClick={handleNextMonth}
                    className="text-gray-600 font-medium"
                  >
                    {">"}
                  </button>
                </div>

                {/* Date Slider */}
                <div className="overflow-x-auto">
                  <div className="flex space-x-4">
                    {/* Weekdays */}
                    {daysInMonth.map((day) => (
                      <div
                        key={day.toISOString()}
                        className="flex flex-col items-center"
                      >
                        <span
                          className={`py-2.5 px-1 rounded-t-full font-semibold text-center min-w-[40px] ${
                            selectedDate &&
                            format(selectedDate, "yyyy-MM-dd") ===
                              format(day, "yyyy-MM-dd")
                              ? "bg-secondary text-primary"
                              : "text-black"
                          }`}
                        >
                          {format(day, "EEE")}
                        </span>{" "}
                        {/* Weekday */}
                        <button
                          className={`py-2.5 px-2.5 rounded-b-full min-w-[40px] ${
                            selectedDate &&
                            format(selectedDate, "yyyy-MM-dd") ===
                              format(day, "yyyy-MM-dd")
                              ? "bg-secondary text-primary"
                              : "text-gray-500"
                          }`}
                          onClick={() => handleDateChange(day)}
                        >
                          {format(day, "dd")} {/* Day */}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Selector */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Time</h2>
                <div className="flex items-center space-x-4 gap-3">
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-xl shadow-md"
                  >
                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <span>to</span>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-xl shadow-md"
                  >
                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Attendees Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">
                  Add Recipe and Attendees
                </h2>
                <button
                  className="flex items-center justify-center w-9 h-9 bg-slate-100 rounded-full text-xl font-black text-slate-600 shadow-md"
                  onClick={handleAddToMealDetails}
                >
                  +
                </button>
                <button
                  className="mt-3 flex items-center justify-center w-full py-2 px-4 bg-slate-100 text-primary font-semibold rounded-xl shadow-md"
                >
                  <HiMiniUserGroup className="mr-2" /> Add Family
                </button>
              </div>

              {/* Notes Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Notes</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={5}
                  placeholder="Add notes..."
                />
              </div>

              {/* Add to Calendar Button */}
              <div className="mb-4">
                <button
                  className="mt-2 flex items-center justify-center w-full py-2 px-4 bg-slate-100 text-primary font-semibold rounded-xl shadow-md"
                >
                  <FaCalendarDay className="mr-2" /> Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddEvent;
