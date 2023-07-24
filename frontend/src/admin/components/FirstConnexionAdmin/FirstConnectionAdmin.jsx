import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowRight } from 'react-icons/fi';
import './firstConnexionAdmin.css';

const FirstConnectionAdmin = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/admin-register`, formData);
      console.log(response.data); // Affiche la réponse du serveur (à des fins de vérification)
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
        <button type="submit" className="adminConnect-login">
          CREATION
          <FiArrowRight className="adminlogin-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default FirstConnectionAdmin;
