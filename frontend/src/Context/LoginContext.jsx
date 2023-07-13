import React, { useState, createContext } from 'react';
import storageService from '../services/storageService';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
const [isLoginDisplayed, setIsLoginDisplayed ]=useState(storageService.getItem('isLoginDisplayed'))
  
const displayLogin = () => {
    setIsLoginDisplayed(!isLoginDisplayed);
  };

  return (
    <LoginContext.Provider value={{ isLoginDisplayed, displayLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
