import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../../Context';
import axios from 'axios';
import { FiArrowRight } from 'react-icons/fi';
import './firstConnexionAdmin.css';

const FirstConnectionAdmin = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const inputRef = useRef(null);

  const { setAdmin } = useContext(AdminContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [profile_picture, setProfile_picture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('profile_picture', profile_picture);

      const response = await axios.post(`${url}/api/admin-register`, formData);
      setAdmin(response.data);
      navigate('/admin-dashboard');
    } catch (error) {
      console.log('error', error);
      console.log('URL:', url);
    }
  };

  const handleFileChange = (e) => {
    setProfile_picture(e.target.files[0]);
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Prénom"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
          required
        />
        <label htmlFor="lastname">Nom</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Nom"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
          required
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password-admin1"
          name="password-admin"
          placeholder="*******"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
