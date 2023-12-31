import React, { useState, useEffect, useContext } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { CategoryContext } from '../../../Context';
import axios from 'axios';
import './labelsCarousel.css';

const LabelsCarousel = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const { category } = useContext(CategoryContext);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/labels`).then((response) => {
      setLabels(response.data);
    });
  }, []);

  const filteredLabels = labels.filter((label) => {
    return !category || label.category_id === category.id;
  });

  return (
    <div className='labels-carousel-container'>
      <h2>Les labels de la région:</h2>
      <div className='labels-carousel'>
        <ul className='labels-list'>
          {filteredLabels.map((label) => {
            return (
              <li key={`label-${label.id}`}>
                <div className='label-container'>
                  <img
                    className='label-logo'
                    src={`/api/public/uploads/${label.logo}`}
                    alt={`logo ${label.name}`}
                  />
                  <span>{label.name}</span>
                  <a
                    href={`${label.url}`}
                    target='_blank'
                    className='go-to-website'
                  >
                    Plus d'infos <FiArrowRight className='arrow' />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LabelsCarousel;
