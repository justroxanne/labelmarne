import React from 'react';
import FilterBar from '../components/filterBar/FilterBar';
import LabelsCarousel from '../components/labels/LabelsCarousel';
import './Home.css';
import Labellisation from '../components/Labellisation/Labellisation';

const Home = () => {
  return (
    <div className='homepage'>
      <FilterBar />
      <LabelsCarousel />
      <Labellisation />
    </div>
  );
};

export default Home;
