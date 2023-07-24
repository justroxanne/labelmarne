import React, { useEffect, useState } from 'react';
import './filterBar.css';
import axios from 'axios';

const FilterBar = () => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.get(`${url}/api/categories`).then((res) => {
      console.log(res.data);
    });
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setCategory(value);
  };

  return (
    <div className='filter-bar'>
      <select name='category' id='category' onChange={handleChange}>
        {categories.map((category) => {
          return (
            <option key={category.id} value={category}>
              {category}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterBar;
