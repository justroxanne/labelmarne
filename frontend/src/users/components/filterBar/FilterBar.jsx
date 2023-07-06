import React, { useState } from 'react';
import './FilterBar.css'; // Import the CSS file for styling

const FilterBar = ({ onSearch }) => {
  const [destination, setDestination] = useState('');
  const [categories, setCategories] = useState('');
  const [labels, setLabels] = useState('');

  const handleSearch = () => {
    // Call the filtering function with the selected parameters
    onSearch(destination, categories, labels);
  };

  const handleInput = (e, setState) => {
    const text = e.target.textContent;
    setState(text);
  };

  return (
    <div className='filter-bar'>
      <div className='filter-input-container'>
        <label></label>
        <div
          className={`filter-text ${destination === '' ? 'placeholder' : ''}`}
          onInput={(e) => handleInput(e, setDestination)}
        >
          {destination === '' ? 'Destination' : destination}
        </div>
      </div>
      <div className='filter-input-container'>
        <label></label>
        <div
          className={`filter-text ${categories === '' ? 'placeholder' : ''}`}
          onInput={(e) => handleInput(e, setCategories)}
        >
          {categories === '' ? 'Categories' : categories}
        </div>
      </div>
      <div className='filter-input-container'>
        <label></label>
        <div
          className={`filter-text ${labels === '' ? 'placeholder' : ''}`}
          onInput={(e) => handleInput(e, setLabels)}
        >
          {labels === '' ? 'Labels' : labels}
        </div>
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default FilterBar;
