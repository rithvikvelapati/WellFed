// components/common/Button.tsx
'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseStyles =
    'px-4 py-2 rounded-xl focus:outline-none focus:ring transition duration-200 flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white ',
    secondary: 'bg-gradient-to-r from-primary to-secondary text-white ',
    danger: 'bg-gradient-to-r from-primary to-secondary text-white ',
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
