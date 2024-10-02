"use client";
import Modal from "@/shared/Modal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface EditDetailsModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
}

const EditDetailsModal: React.FC<EditDetailsModalProps> = ({
  isModalOpen,
  handleModalClose,
}) => {
  const router = useRouter();
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log(description); // Your submit logic goes here
    handleModalClose(); // Close the modal after submission
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose}>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full mx-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Details</h2>
          <button className="text-gray-500" onClick={() => handleModalClose()}>
            Cancel
          </button>
        </div>

        {/* Textarea Input */}
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-md text-gray-700"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description..."
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 py-2 bg-gradient-to-r from-orange-600 to-orange-400 text-white font-semibold rounded-md shadow-md"
        >
          Submit
        </button>
      </div>
    </Modal>

  );
};

export default EditDetailsModal;
