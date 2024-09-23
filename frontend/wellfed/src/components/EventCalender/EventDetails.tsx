import React from "react";

interface EventDetailsProps {
  title: string;
  description: string;
  time: string;
  location: string;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  title,
  description,
  time,
  location,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-600">{time}</p>
        <p className="text-gray-600">{location}</p>
        <div className="flex space-x-4 mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
