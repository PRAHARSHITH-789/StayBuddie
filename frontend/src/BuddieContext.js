import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the UserContext
const BuddieContext = createContext();

// Custom hook to use UserContext
export const useBuddieContext = () => useContext(BuddieContext);

// Provider to manage user state and provide it throughout the app
export const BuddieProvider = ({ children }) => {
  const [buddie, setBuddie] = useState(null);

  useEffect(() => {
    // Fetch userId from localStorage when the component mounts
    const userId = localStorage.getItem('buddie_id');
    if (userId) {
      setBuddie(userId);
    }
  }, []);

  return (
    <BuddieContext.Provider value={{ buddie, setBuddie }}>
      {children}
    </BuddieContext.Provider>
  );
};
