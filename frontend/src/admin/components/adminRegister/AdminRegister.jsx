import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import './adminRegister.css';

const AdminRegister = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [adminInfos, setAdminInfos] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });

  const [profile_picture, setProfile_picture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminInfos({ ...adminInfos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('profile_picture', profile_picture);
      for (const key in adminInfos) {
        formData.append(key, adminInfos[key]);
      }

      const responseAdmin = await axios.post(
        `${url}/api/admin-register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className='admin-registration'>
      <form
        className='admin-registration-form'
        encType='multipart/form-data'
        method='post'
        onSubmit={handleSubmit}
      >
        <h2 className='title-card'>Ajouter un nouvel admin</h2>
        <label className='admin-registration-form-label' htmlFor='email'>
          Email*
        </label>
        <input
          type='email'
          id='email'
          name='email'
          onChange={handleChange}
          value={adminInfos.email}
          required
        />
        <label className='admin-registration-form-label' htmlFor='firstname'>
          Prénom*
        </label>
        <input
          type='text'
          id='firstname'
          name='firstname'
          onChange={handleChange}
          value={adminInfos.firstname}
          required
        />
        <label className='admin-registration-form-label' htmlFor='lastname'>
          Nom*
        </label>
        <input
          type='text'
          id='lastname'
          name='lastname'
          onChange={handleChange}
          value={adminInfos.lastname}
          required
        />
        <label className='admin-registration-form-label' htmlFor='password'>
          Mot de passe*
        </label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='*******'
          onChange={handleChange}
          value={adminInfos.password}
          required
        />
        <div className='profile-picture-select'>
          <span className='select-picture-label'>
            Choisissez une photo de profil :
          </span>
          {profile_picture ? (
            <span className='select-picture'>{profile_picture.name}</span>
          ) : null}
          <label className='custom-file-input' htmlFor='profile_picture'>
            Parcourir
            <input
              type='file'
              id='profile_picture'
              name='profile_picture'
              onChange={(e) => setProfile_picture(e.target.files[0])}
            />
          </label>
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          className='admin-registration-submit'
        >
          ENVOYER
          <FiArrowRight
            className='admin-registration-arrow-right'
            style={{ width: '1.5em', height: '1.5em' }}
          />
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
