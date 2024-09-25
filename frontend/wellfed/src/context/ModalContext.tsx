'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextProps {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
