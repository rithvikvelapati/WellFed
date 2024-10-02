"use client";
import React, { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, setMonth, eachDayOfInterval } from 'date-fns';
import { FaChevronLeft } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaCalendarDay } from "react-icons/fa";
import { MenuItem, Select } from "@mui/material";
import { useRouter } from "next/navigation";


// Helper function to generate time slots
const generateTimeSlots = (interval: number) => {
    const times = [];
    let start = 0; // Start at 00:00 (midnight)
    let end = 24 * 60; // End at 24:00

    for (let i = start; i < end; i += interval) {
        const hours = Math.floor(i / 60);
        const minutes = i % 60;
        const timeString = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes === 0 ? '00' : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        times.push(timeString);
    }

    return times;
};

const NewSchedule = () => {
    const router = useRouter();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date);
    const [startTime, setStartTime] = useState("09:00 AM");
    const [endTime, setEndTime] = useState("12:00 PM");
    const [notes, setNotes] = useState("");

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
    const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newMonth = Number(event.target.value) - 1; // Convert to 0-based month index
        setCurrentMonth(setMonth(currentMonth, newMonth));
    };

    const handleDateChange = (day: Date) => {
        setSelectedDate(day);
    };

    // Generate time slots for every 30 minutes
    const timeSlots = generateTimeSlots(30);

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-6">
                <button className="font-semibold text-lg" onClick={() => router.push('/calendar-section')}><FaChevronLeft /></button>
                <button className="font-semibold text-2xl">New Schedule</button>
                <button className="font-semibold text-md" onClick={() => router.push('/calendar-section')}>Cancel</button>
            </div>

            <div className="flex items-center justify-between rounded-md p-1 px-12 mb-8">
                <button className="w-1/2 py-2 text-center font-medium bg-gradient-to-r shadow-[3px_1px_7px_1px_#dcdcdc] from-[#B64B29] to-[#EC9556] text-white rounded-l-xl">
                    New Meal
                </button>
                <button className="w-1/2 py-2 text-center font-medium shadow-[3px_1px_7px_1px_#dcdcdc] rounded-r-xl">New Event</button>
            </div>

            {/* Month selector */}
            <div className="rounded-t-[2.5rem] shadow-[0px_0px_15px_5px_#dcdcdc]  p-6">

                <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-xl">Date</p>
                    <Select
                        labelId="month-select-label"
                        id="month-select"
                        value={currentMonth.getMonth() + 1} // Use 1-based month for Select
                        onChange={handleMonthChange}
                        className="h-8"
                    >
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                    </Select>
                </div>
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <button onClick={handlePrevMonth} className="text-gray-600 font-medium">{'<'}</button>
                        <span className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
                        <button onClick={handleNextMonth} className="text-gray-600 font-medium">{'>'}</button>
                    </div>

                    {/* Date Slider */}
                    <div className="overflow-x-auto">
                        <div className="flex space-x-4">
                            {/* Weekdays */}
                            {daysInMonth.map((day) => (
                                <div key={day.toISOString()} className="flex flex-col items-center">
                                    <span className={`py-2.5 px-1 rounded-t-full font-semibold text-center min-w-[40px] ${selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                                        ? "bg-[#EC9556] text-[#B64B29]"
                                        : "text-black"
                                        }`}>{format(day, 'EEE')}</span> {/* Weekday */}
                                    <button
                                        className={`py-2.5 px-2.5 rounded-b-full min-w-[40px] ${selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                                            ? "bg-[#EC9556] text-[#B64B29]"
                                            : "text-gray-500"
                                            }`}
                                        onClick={() => handleDateChange(day)}
                                    >
                                        {format(day, 'dd')} {/* Day */}
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
                            className="w-full p-2 border border-gray-300 rounded-xl shadow-xl"
                        >
                            {timeSlots.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
                        <span>to</span>
                        <select
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-xl shadow-xl"
                        >
                            {timeSlots.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Attendees Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Invite Attendees</h2>
                    <button className="flex items-center justify-center w-9 h-9 bg-[#F1F1F1] rounded-full text-xl font-black text-gray-600">
                        +
                    </button>
                    <button className="mt-3 flex items-center justify-center w-full py-2 px-4 bg-[#F1F1F1] text-orange-700 font-semibold rounded-full shadow-xl">
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
                <button className="mt-2 flex items-center justify-center w-full py-2 px-4 bg-[#F1F1F1] text-orange-700 font-semibold rounded-full shadow-xl" onClick={() => router.push('/calendar-section/meal-details')}>
                    <FaCalendarDay className="mr-2" /> Add to Calendar
                </button>

            </div>
        </div>
    );
};

export default NewSchedule;
