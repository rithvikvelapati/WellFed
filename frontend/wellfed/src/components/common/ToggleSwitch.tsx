// components/common/ToggleSwitch.tsx
"use client";

import React from "react";

interface ToggleSwitchProps {
  isEnabled: boolean;
  toggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isEnabled, toggle }) => {
  return (
    <span
      onClick={toggle}
      className={`${
        isEnabled ? "bg-gradient-to-r from-primary to-secondary" : "bg-gray-300"
      } relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200`}
    >
      <span
        className={`${
          isEnabled ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200`}
      />
    </span>
  );
};

export default ToggleSwitch;
