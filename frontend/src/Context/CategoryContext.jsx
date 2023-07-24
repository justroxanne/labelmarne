import React, { createContext, useState } from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  return (
    <CategoryContext.Provider
      value={{ categories, setCategories, category, setCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
