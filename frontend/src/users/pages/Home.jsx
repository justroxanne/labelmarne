import React from 'react';
import FilterBar from '../components/filterBar/FilterBar';
import LabelsCarousel from '../components/labels/LabelsCarousel';
import './Home.css';

const Home = () => {
  return (
    <div className='homepage'>
      <FilterBar />
      <LabelsCarousel />
    </div>
  );
};

export default Home;
