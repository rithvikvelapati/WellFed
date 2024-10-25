"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaEdit, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { BASE_URL, GET_PROFILE, POST_PROFILE } from '@/constants/api';

const ProfileInfo = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthdate: new Date(),
    gender: '',
    address: '',
    phoneNumber: '',
    familyMembers: '',
    clerkId: '',
    username: '',
    profilePictureURL: '',
    bannerURL: '',
  });

  const [isProfilePresent, setIsProfilePresent] = useState(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      setFormData({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.emailAddresses?.[0].emailAddress || '',
        birthdate: new Date(),
        gender: '',
        address: '',
        phoneNumber: '',
        familyMembers: '',
        clerkId: user?.id || '',
        username: user?.username || '',
        profilePictureURL: user?.imageUrl || '', // Use Clerk's user imageUrl for profile picture
        bannerURL: '/defaultBanner.svg', // Set a default banner (you can change this as needed)
      });
      fetchData();
    }
  }, [user, isSignedIn]);

  const fetchData = async () => {
    try {
      const profileUrl = BASE_URL + GET_PROFILE + user?.id;
      const response = await fetch(profileUrl); // Call your Next.js API route
      const result = await response.json();
      if (user) {
        setIsProfilePresent(true);
        setFormData(result);
      } else {
        setIsProfilePresent(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if(date) {
      setFormData((prevState) => ({
        ...prevState,
        birthdate: date,
      }));
    }
    
  };

  const updateProfile = async () => {
    try {
      const profileUpdateUrl = BASE_URL + POST_PROFILE + (isProfilePresent ? user?.id : '');

      const body = { ...formData };
      body['clerkId'] = user?.id || '';

      await fetch(profileUpdateUrl, {
        method: isProfilePresent ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      await fetchData();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start rounded-t-3xl gap-4">
      <div className="w-full max-w-md p-6 mt-[-6rem] shadow-md">

        {/* Input Fields with Labels */}
        <form className="max-w-lg mx-auto px-4 bg-white rounded-lg flex flex-col gap-5">
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
                selected={formData.birthdate}
                onChange={handleDateChange as any}
                dateFormat="dd/MM/yyyy"
                className="w-full bg-gradient-to-r from-[#FFFFFF] to-[rgba(236,149,86,0.5)] shadow-inner rounded-xl p-2 border border-gray-300 mt-2"
              />
              <FaCalendarAlt
                className="absolute right-4 top-4 text-[#B64B29]"
                size={25}
              />
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
              <option value="">Select</option>
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
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full bg-gradient-to-r from-[#FFFFFF] to-[rgba(236,149,86,0.5)] shadow-inner rounded-xl p-2 border border-gray-300 mt-2"
            />
          </div>

          {/* Family Members */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">
              Family Members
            </label>
            <select
              name="familyMembers"
              value={formData.familyMembers}
              onChange={handleInputChange}
              className="w-full bg-gradient-to-r from-[#FFFFFF] to-[rgba(236,149,86,0.5)] shadow-inner rounded-xl p-2 border border-gray-300 mt-2"
            >
              <option value="">Select</option>
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
        <div className="flex justify-between my-6">
          <button className="text-[#B64B29] font-semibold ml-12">Cancel</button>
          <button className="bg-[#B64B29] text-white font-semibold py-2 px-6 rounded-md mr-12" onClick={updateProfile}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
