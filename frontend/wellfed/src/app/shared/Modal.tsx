import React from "react";
import { IoCloseSharp } from "react-icons/io5";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-50">
      <div className="p-6 rounded-lg shadow-md max-w-lg w-full bg-transparent">
        {children}
        <button
          className="mt-4 bg-transparent text-white px-4 py-2 rounded-lg absolute top-0 right-2"
          onClick={onClose}
        >
          <IoCloseSharp size={30} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
