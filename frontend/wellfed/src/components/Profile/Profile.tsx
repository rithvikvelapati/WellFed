"use client"; // Mark this as a client-side component

import React, { useState } from 'react';
import Image from 'next/image';
import FormField from '@/shared/FormField/FormField';

const Profile = () => {
  // Define the form state using useState hook
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Abraham',
    email: 'john.ab@Thehealthvice.Com',
    dob: '',
    gender: 'Male',
    address: '123, Bridgeton, Finland - 12345',
    phone: '+1 9876543210',
    familyMembers: ''
  });

  // Define a state to track which fields are editable
  const [editableFields, setEditableFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    dob: false,
    gender: false,
    address: false,
    phone: false,
    familyMembers: false
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle date change for date picker
  const handleDateChange = (date: Date) => {
    setFormData(prevState => ({
      ...prevState,
      dob: date.toISOString().split('T')[0] // Convert to YYYY-MM-DD format
    }));
  };

  // Toggle edit mode for a field
  const toggleEdit = (field: string) => {
    setEditableFields(prevState => ({
      ...prevState,
      [field]: !prevState[field] // Toggle the edit state for the field
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#dfecec] flex flex-col items-center justify-start rounded-t-3xl gap-4">
      {/* Content Section */}
      <div className="w-full max-w-md  p-6 mt-4 shadow-md h-[110vh]">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Image
              src="/profile-pic.jpg" // Replace with actual image path
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-0 right-0 bg-orange-500 text-white rounded-full p-1">
              <Image src="/Editicon.svg" alt="Edit" width={16} height={16} /> {/* Pencil icon */}
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-md bg-white rounded-lg flex flex-col gap-8">
          <FormField
            label="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            icon="/Editicon.svg"
            name="firstName"
            editable={editableFields.firstName} // Pass edit state
            onEditClick={() => toggleEdit('firstName')} // Handle edit icon click
          />
          <FormField
            label="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            icon="/Editicon.svg"
            name="lastName"
            editable={editableFields.lastName}
            onEditClick={() => toggleEdit('lastName')}
          />
          <FormField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            icon="/Editicon.svg"
            name="email"
            editable={editableFields.email}
            onEditClick={() => toggleEdit('email')}
          />
          <FormField
            label="Date of Birth"
            isDatePicker
            value={formData.dob}
            onDateChange={handleDateChange}
            icon="calenderIcon.svg"
            editable={editableFields.dob}
            onEditClick={() => toggleEdit('dob')}
          />
          <FormField
            label="Gender"
            isSelect
            value={formData.gender}
            name={'gender'}
            onChange={handleInputChange}
            options={['Male', 'Female']}
            editable={editableFields.gender}
            onEditClick={() => toggleEdit('gender')}
          />
          <FormField
            label="Address"
            value={formData.address}
            onChange={handleInputChange}
            icon="/Editicon.svg"
            name="address"
            editable={editableFields.address}
            onEditClick={() => toggleEdit('address')}
          />
          <FormField
            label="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            icon="/Editicon.svg"
            name="phone"
            editable={editableFields.phone}
            onEditClick={() => toggleEdit('phone')}
          />
          <FormField
            label="Family Members"
            isSelect
            value={formData.familyMembers}
            onChange={handleInputChange}
            options={['2', '3', '4', '5', '6', 'other']}
            editable={editableFields.familyMembers}
            onEditClick={() => toggleEdit('familyMembers')}
          />
        </form>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 w-full bg-white shadow-lg py-3 flex justify-around items-center">
        <button className="text-orange-500">
          <i className="fas fa-camera"></i>
        </button>
        <button className="text-orange-500">
          <Image
            src=""
            alt="Avatar"
            width={30}
            height={30}
            className="rounded-full"
          />
        </button>
        <button className="text-orange-500">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
};

export default Profile;
