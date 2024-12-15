import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use UserContext
export const useUserContext = () => useContext(UserContext);

// Provider to manage user state and provide it throughout the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch userId from localStorage when the component mounts
    const userId = localStorage.getItem('hostel_id');
    if (userId) {
      setUser(userId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
