// components/EditDetailsModal.tsx

"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface EditDetailsModalProps {
  isEditDetailsModalOpen: boolean;
  handleModalClose: () => void;
}

const EditDetailsModal: React.FC<EditDetailsModalProps> = ({
  isEditDetailsModalOpen,
  handleModalClose,
}) => {
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log(description); // Your submit logic goes here
    handleModalClose(); // Close the modal after submission
  };

  // Modal animation variants
  const modalVariants = {
    initial: {
      y: "100vh",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <AnimatePresence>
      {isEditDetailsModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center"
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-lg max-w-md w-11/12 mx-auto p-6">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
              onClick={handleModalClose}
              aria-label="Close"
            >
              <IoClose size={24} />
            </button>

            {/* Modal Header */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Edit Details
              </h2>
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
              className="w-full mt-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-md"
            >
              Submit
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditDetailsModal;
