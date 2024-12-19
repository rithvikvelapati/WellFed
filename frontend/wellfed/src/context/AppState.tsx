import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the state
interface AppState {
  meal: any;
}

// Define the context type
interface StateContextType {
  sharedState: AppState | null;
  setSharedState: (state: AppState) => void;
}

// Create the context with a default value
const StateContext = createContext<StateContextType | undefined>(undefined);

// Provider props interface
interface StateProviderProps {
  children: ReactNode;
}

// Create the provider
export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [sharedState, setSharedState] = useState<AppState | null>({meal : {}});

  return (
    <StateContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to access the state context
export const useAppState = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return context;
};