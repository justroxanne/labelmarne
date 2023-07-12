import React, { createContext, useState } from 'react';
import storageService from '../services/storageService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(storageService.getItem('user'));

  const storeUser = (userData) => {
    storageService.setItem('user', userData);
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, storeUser }}>
      {children}
    </UserContext.Provider>
  );
};
