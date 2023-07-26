import React, { useState } from 'react';
import axios from 'axios';
import './addLabel.css';

const AddLabel = ({ categories, labels, setLabels }) => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [labelInfos, setLabelInfos] = useState({
    name: '',
    url: '',
    category_id: '',
  });
  const [logo, setLogo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabelInfos({ ...labelInfos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('logo', logo);
      for (const key in labelInfos) {
        formData.append(key, labelInfos[key]);
      }

      const responseLabel = await axios.post(`${url}/api/labels`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLabels([...labels, responseLabel.data]);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className='add-label-container'>
      <form
        className='add-label-form'
        encType='multipart/form-data'
        method='post'
        onSubmit={handleSubmit}
      >
        <label className='add-label-form-label' htmlFor='name'>
          Nom du label*
          <input
            type='text'
            name='name'
            id='name'
            value={labelInfos.name}
            onChange={handleChange}
          />
        </label>
        <label className='add-label-form-label' htmlFor='url'>
          URL du site du label*
          <input
            type='text'
            name='url'
            id='url'
            value={labelInfos.url}
            onChange={handleChange}
          />
        </label>
        <label className='add-label-form-label' htmlFor='category_id'>
          Catégorie du label*
          <select
            name='category_id'
            id='category_id'
            value={labelInfos.category_id}
            onChange={handleChange}
          >
            <option value=''>Choisir une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className='add-label-form-label' htmlFor='labelLogo'>
          Logo du label*
          <input
            type='file'
            name='logo'
            id='logo'
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </label>
        <button className='add-label-form-button' type='submit'>
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddLabel;
