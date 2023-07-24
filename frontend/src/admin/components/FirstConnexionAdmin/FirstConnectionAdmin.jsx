import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from './../../../Context/AdminContext';
import axios from 'axios';
import { FiArrowRight } from 'react-icons/fi';
import './firstConnexionAdmin.css';

const FirstConnectionAdmin = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const inputRef = useRef(null);

  const { storeAdmin } = useContext(AdminContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    profile_picture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profile_picture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('firstname', formData.firstname);
      formDataToSend.append('lastname', formData.lastname);
      formDataToSend.append('profile_picture', formData.profile_picture);

      const response = await axios.post(`${url}/api/admin-register`, formDataToSend);
      storeAdmin(response.data);
      navigate('/admin/dashboard');
    } catch (error) {
      console.log('error', error);
      console.log('URL:', url);
    }
  };

  return (
    <div className="adminConnect-form-container">
      <form className="adminConnect-form" onSubmit={handleSubmit}>
        <h2 className="title-card">Première connexion</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Prénom"
          onChange={handleChange}
          value={formData.firstname}
          required
        />
        <label htmlFor="lastname">Nom</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Nom"
          onChange={handleChange}
          value={formData.lastname}
          required
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password-admin1"
          name="password"
          placeholder="*******"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <label className="label-input" htmlFor="profile_picture">
          Choisissez votre photo de profil
          <div className="custom-file-input">
            <input
              type="file"
              id="profile_picture"
              name="profile_picture"
              onChange={handleFileChange}
              ref={inputRef}
              required
            />
            <span>Parcourir</span>
          </div>
        </label>
        <button type="submit" className="adminConnect-login">
          CREATION
          <FiArrowRight className="adminlogin-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default FirstConnectionAdmin;
