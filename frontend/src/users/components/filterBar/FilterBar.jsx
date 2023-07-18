import React, { useState } from 'react';
import './FilterBar.css'; // Import the CSS file for styling

const FilterBar = () => {
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('');
  const [label, setLabel] = useState('');

  const handleSearch = () => {
    // Call the filtering function with the selected parameters
    // onSearch(destination, category, label);
    console.log(destination, category, label);
  };

  const handleChange = (e, setState) => {
    const text = e.target.value;
    setState(text);
  };

  return (
    <div className='filter-bar'>
      <ul className='filter-input-container'>
        <li>
          <label htmlFor='destination'>
            <input
              type='text'
              name='destination'
              id='destination'
              placeholder='Destination'
              className='filter-input'
              onChange={(e) => handleChange(e, setDestination)}
            ></input>
          </label>
        </li>
        <li>|</li>
        <li>
          <label htmlFor='category'>
            <input
              type='text'
              name='category'
              id='category'
              placeholder='Catégorie'
              className='filter-input'
              onChange={(e) => handleChange(e, setCategory)}
            ></input>
          </label>
        </li>
        <li>|</li>
        <li>
          <label htmlFor='label'>
            <input
              type='text'
              name='label'
              id='label'
              placeholder='Label'
              className='filter-input'
              onChange={(e) => handleChange(e, setLabel)}
            ></input>
          </label>
        </li>
        <button className='filter-search-btn' onClick={handleSearch}>
          Rechercher
        </button>
      </ul>
    </div>
  );
};

export default FilterBar;
