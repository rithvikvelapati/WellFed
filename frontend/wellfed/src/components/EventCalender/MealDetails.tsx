"use client"; // Ensure this is a Client Component
import React, { useState } from 'react';
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa';
import { RiDeleteBinFill } from "react-icons/ri";
import { MdOutlineAddCircle } from "react-icons/md";
import Image from 'next/image';
import MealEditOverlay from './MealEditOverlay';
import { useRouter } from 'next/navigation'; // Import Next.js router
import EditDetailsModal from './EditDetailsModal';

const MealDetails = () => {
    const router = useRouter();
    const [reminderTime, setReminderTime] = useState('15 minutes before');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const people = [
        { name: 'John Doe', avatar: '/Profile1.svg' },
        { name: 'Jane Doe', avatar: '/Profile2.svg' },
        { name: 'Amanda Lockwood', avatar: '/Profile3.svg' },
    ];

    const handleReminderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReminderTime(e.target.value);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
            {/* Header Section */}
            
            {/* Meal Details */}
            <div className="rounded-t-[2.5rem] shadow-[0px_0px_15px_5px_#dcdcdc]  p-2">
                <div className=" p-2 pt-6 rounded-lg flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mr-4">
                            <p className="text-xs">64 x 64</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-md">The All-American Breakfast Muffin</h3>
                            <p className="text-gray-600 text-sm">by Amanda Lockwood</p>
                        </div>
                    </div>
                    <button className="text-[#B64B29] text-2xl">
                        <RiDeleteBinFill />
                    </button>
                </div>

                <div className='px-24 py-4 border-t border-b pb-8 ml-24'>
                    <button className="text-gray-500 text-sm flex items-center mb-4 float-right" onClick={handleModalOpen}>
                        <MdOutlineAddCircle /> Add another recipe
                    </button>
                </div>

                {/* Reminder Section */}
                <div className="mt-6 px-6">
                    <label className="block font-bold text-gray-700">Reminder</label>
                    <select className="block py-2 mt-1 rounded-md text-gray-600 focus:ring focus:ring-orange-400 w-[170px]" value={reminderTime} onChange={handleReminderChange}>
                        <option value="5 minutes before">15 minutes before</option>
                        <option value="30 minutes before">30 minutes before</option>
                        <option value="45 minutes before">45 minutes before</option>
                        <option value="60 minutes before">60 minutes before</option>
                    </select>
                </div>

                {/* Invite People Section */}
                <div className="mt-6 px-6">
                    <label className="block font-bold text-gray-700">Invite People</label>
                    <div className="flex items-center mt-2 space-x-4">
                        {people.map((person, index) => (
                            <div className="relative" key={index}>
                                <Image src={person.avatar} alt={person.name} width={40} height={40} className="rounded-full" />
                                {/* Status Dot */}
                                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border border-white"></span>
                            </div>
                        ))}
                        {/* Add Profile Button */}
                        <button className="w-10 h-10 flex items-center justify-center" onClick={handleModalOpen}>
                            <Image src="/add.svg" alt="Add Profile" width={40} height={40} className="rounded-full" />
                        </button>
                    </div>
                </div>

                {/* Date Details Section */}
                <div className="mt-6 px-6">
                    <label className="block font-bold text-gray-700">Date details</label>
                    <p className="mt-2 text-gray-500 text-sm md:text-base">
                        Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.
                    </p>
                </div>

                <hr className="my-6 border-t-2 border-gray-200" />

                {/* Edit and Delete Buttons */}
                <div className="flex flex-col space-y-4 mt-20 px-6 absolute w-full bottom-1 relative">
                    {/* Edit Details Button */}
                    <button
                      className="w-full py-2 bg-[#F1F1F1] rounded-full text-[#B64B29] font-semibold shadow-md"
                      onClick={() => handleModalOpen()} // Route to the EditDetailsModal
                    >
                        Edit Details
                    </button>

                    {/* Delete Event Button */}
                    <button className="w-full py-2 bg-[#B64B29] from-orange-600 to-orange-400 text-white rounded-full flex items-center justify-center shadow-md">
                        Delete Event
                        <Image src="/deleteicon.svg" alt="Delete Icon" width={20} height={20} className="mr-2 ml-3" />
                    </button>
                </div>
            </div>

            {/* Overlay Modal */}
            <EditDetailsModal
                isModalOpen={isModalOpen}
                handleModalClose={handleModalClose}
            />
        </div>
    );
};

export default MealDetails;
