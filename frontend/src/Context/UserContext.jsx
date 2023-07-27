import React, { createContext, useState } from 'react';
import storageService from '../services/storageService';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(storageService.getItem('user'));

  const storeUser = (userData) => {
    storageService.setItem('user', userData);
    setUser(userData);
  };

  const logout = () => {
    const id = user.id;
    axios
      .post(`${url}/api/users/${id}/logout`, { withCredentials: true })
      .then(() => {
        storageService.clearStorage('user');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserContext.Provider value={{ user, storeUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
