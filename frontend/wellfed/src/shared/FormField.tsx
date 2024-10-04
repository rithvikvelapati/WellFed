import React, { useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Define the prop types
interface FormFieldProps {
  label: string;
  type?: string; // Optional, defaults to "text"
  value?: string; // Optional for non-date fields
  icon?: string; // Icon is optional
  isSelect?: boolean; // If true, render a select instead of input
  options?: string[]; // Array of options for select, required if isSelect is true
  isDatePicker?: boolean; // Optional, for Date Picker field
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // onChange handler for inputs and selects
  onDateChange?: any; // onChange handler for DatePicker
  name?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, type = "text", value, icon, isSelect, options, isDatePicker, onChange, onDateChange, name }) => {

  return (
    <div className="relative flex flex-col gap-2">
      <label className="block text-sm font-semibold mb-2">{label}</label>

      {/* Render DatePicker if isDatePicker is true */}
      {isDatePicker ? (
        <div className="relative w-full">
          <DatePicker
            value={value}
            onChange={onDateChange}
            className="w-full p-3 bg-orange-200 border-2 border-gray-300 rounded-lg text-gray-800 p-2 pad-2"
          />
          {/* Icon for date picker */}
          {icon && (
            <button className="absolute top-1/2 right-3 transform -translate-y-1/2 opacity-90 icon">
              <Image src={icon} alt="icon" width={24} height={24} />
            </button>
          )}
        </div>
      ) : isSelect ? (
        <div className="relative">
          <select
            value={value}
            onChange={onChange}
            name={name}
            className="w-full p-3 bg-orange-200 border-2 border-gray-300 rounded-lg text-gray-800 appearance-none p-2 mt-2 pad-2"
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {/* Icon for select fields */}
          {icon && (
            <button className="absolute top-1/2 right-3 transform -translate-y-1/2 opacity-90 icon">
              <Image src={icon} alt="icon" width={24} height={24} />
            </button>
          )}
        </div>
      ) : (
        <div className="relative">
          <input
            type={type}
            value={value}
            name={name}
            className="w-full bg-orange-200 border-2 border-gray-300 rounded-lg text-gray-800 !p-3 mt-2 pad-2"
            onChange={onChange}
          />
          {icon && (
            <button className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-90 icon">
              <Image src={icon} alt="icon" width={24} height={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FormField;