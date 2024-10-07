'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaEdit, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';

const ProfileInfo = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: 'Ari',
    lastName: 'Noso',
    email: 'Arinoso@Thehealthvice.Com',
    dob: new Date('1992-09-04'),
    gender: 'Male',
    address: '123, Bridgeton, Finland - 12345',
    phone: '+1 9876543210',
    familyMembers: '5',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date) => {
    setFormData((prevState) => ({
      ...prevState,
      dob: date,
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start rounded-t-3xl gap-4">

      <div className="w-full max-w-md p-6 mt-[-6rem] shadow-md">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20"> {/* Ensure the container has a fixed width and height */}
            <Image
              src="/Profilephoto.svg"
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full object-cover w-full h-full border-4 border-white shadow-lg"
            />
            {/* Edit Button for Profile Picture */}
            <button className="absolute bottom-0 right-0 bg-[#B64B29] text-white border-2 border-white rounded-full p-1">
              <FaEdit size={16} />
            </button>
          </div>
        </div>


        {/* Input Fields with Labels */}
        <form className="max-w-lg mx-auto p-4 bg-white rounded-lg flex flex-col gap-5">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full bg-gradient-to-r from-[#FFFFFF] to-[rgba(236,149,86,0.5)] shadow-inner rounded-xl p-2 border border-gray-300 mt-2"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full bg-gradient-to-r from-[#FFFFFF] to-[rgba(236,149,86,0.5)] shadow-inner rounded-xl p-2 border border-gray-300 mt-2"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gradient-to-r from-[#FFFFFF] to-[rgba(236,149,86,0.5)] shadow-inner rounded-xl p-2 border border-gray-300 mt-2"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">Date of Birth</label>
            <div className="relative">
              <DatePicker
                selected={formData.dob}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="w-full bg-gradient-to-r from-[#FFFFFF] to-[rgba(236,149,86,0.5)] shadow-inner rounded-xl p-2 border border-gray-300 mt-2"
              />
              <FaCalendarAlt className="absolute right-4 top-4 text-[#B64B29]" size={25} />
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full bg-gradient-to-r from-[#FFFFFF] to-[rgba(236,149,86,0.5)] shadow-inner rounded-xl p-2 border border-gray-300 mt-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full bg-gradient-to-r from-[#FFFFFF] to-[rgba(236,149,86,0.5)] shadow-inner rounded-xl p-2 border border-gray-300 mt-2"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-gradient-to-r from-[#FFFFFF] to-[rgba(236,149,86,0.5)] shadow-inner rounded-xl p-2 border border-gray-300 mt-2"
            />
          </div>

          {/* Family Members */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">Family Members</label>
            <select
              name="familyMembers"
              value={formData.familyMembers}
              onChange={handleInputChange}
              className="w-full bg-gradient-to-r from-[#FFFFFF] to-[rgba(236,149,86,0.5)] shadow-inner rounded-xl p-2 border border-gray-300 mt-2"
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="other">Other</option>
            </select>
          </div>
        </form>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-between mt-6">
          <button className="text-[#B64B29] font-semibold ml-12">Cancel</button>
          <button className="bg-[#B64B29] text-white font-semibold py-2 px-6 rounded-md mr-12">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
