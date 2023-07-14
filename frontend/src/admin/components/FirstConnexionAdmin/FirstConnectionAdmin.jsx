import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../../Context';
import axios from 'axios';
import { FiArrowRight } from "react-icons/fi";
import './firstConnexionAdmin.css';

const FirstConnectionAdmin = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  
  const { setAdmin } = useContext(AdminContext);

  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = generaterandomPassword();

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('password', password);
      formData.append('profileImage', profileImage);

      const response = await axios.post(`${url}/api/admin`, formData);
      setAdmin(response.data);
      navigate('/admin-dashboard');
    }
    catch (error) {
        console.error(error);
    }
    };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const generaterandomPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    return randomPassword;
  };

  return (
    <div className='adminConnect-form-container'>
      <form className='adminConnect-form' onSubmit={handleSubmit}>
        <h2>Première connection</h2>
        <label htmlFor="email"><h3>Email</h3></label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label htmlFor="firstname"><h3>Prénom</h3></label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
          required
        />
        <label htmlFor="lastname"><h3>Nom</h3></label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
          required
        />
        <label htmlFor="profileImage"><h3>Photo de profil</h3></label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          onChange={handleFileChange}
          required
        />
        <button 
        type="submit"
        className='adminConnect-login'>Créer le compte<FiArrowRight className="Adminlogin-arrow-right" /></button>
      </form>
    </div>
  );
};

export default FirstConnectionAdmin;
