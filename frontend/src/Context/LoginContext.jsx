import React, { useState, createContext } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoginDisplayed, setIsLoginDisplayed] = useState(false);

  const displayLogin = () => {
    setIsLoginDisplayed(!isLoginDisplayed);
  };

  return (
    <LoginContext.Provider value={{ isLoginDisplayed, displayLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
