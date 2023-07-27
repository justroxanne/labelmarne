import React, { useEffect, useState, useContext } from 'react';
import { CategoryContext } from '../../../Context';
import { RiArrowDropDownFill } from 'react-icons/ri';
import './filterBar.css';
import axios from 'axios';

const FilterBar = () => {
  const { categories, setCategories, category, setCategory } =
    useContext(CategoryContext);

  const url = import.meta.env.VITE_BACKEND_URL;

  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    axios.get(`${url}/api/categories`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleShowCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className='filter-bar'>
      <span>
        {category.name ? category.name : 'Sélectionnez une catégorie'}
        <RiArrowDropDownFill
          className='filter-bar-btn'
          onClick={handleShowCategories}
        />
      </span>
      {showCategories && (
        <ul className='categories-dropdown'>
          <li
            className='category-item'
            onClick={() => {
              setCategory('');
              setShowCategories(false);
            }}
            style={{ color: 'lightgrey' }}
          >
            Toutes les catégories
          </li>
          {categories.map((category) => {
            return (
              <li
                key={category.id}
                className='category-item'
                value={category.name}
                onClick={() => {
                  setCategory(category);
                  setShowCategories(false);
                }}
              >
                {category.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilterBar;
