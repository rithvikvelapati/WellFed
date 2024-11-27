// components/CommonButton.tsx
'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gradient';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseStyles =
    'px-4 py-2 rounded focus:outline-none focus:ring transition duration-200';

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-blue-600 focus:ring-blue-300',
    secondary: 'bg-secondary text-white hover:bg-gray-600 focus:ring-gray-300',
    gradient: 'bg-gradient-to-r from-primary to-secondary text-white',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
