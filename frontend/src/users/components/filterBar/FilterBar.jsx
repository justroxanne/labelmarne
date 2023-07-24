import React, { useEffect, useState, useContext } from 'react';
import { CategoryContext } from '../../../Context';
import { IoIosArrowDown } from 'react-icons/io';
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
      <div className='categories-filter'>
        <span>
          {category.name ? category.name : 'Sélectionnez une catégorie'}
          <IoIosArrowDown onClick={handleShowCategories} />
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
              Sélectionnez une catégorie
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
      <button className='filter-search-btn'>Rechercher</button>
    </div>
  );
};

export default FilterBar;
