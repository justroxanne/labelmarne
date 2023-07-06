import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const [message, setMessage] = useState(false);
  const [userInfos, setUserInfos] = useState({
    company_name: '',
    siret: '',
    lastname: '',
    firstname: '',
    phone: '',
    email: '',
    website_url: '',
    adress_id: '',
    password: '',
  });

  const [addressInfos, setAddressInfos] = useState({
    number: '',
    type: '',
    street_name: '',
    complement: '',
    zip_code: '',
    city: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === 'siret' && value.length > 14) {
      return;
    }

    setUserInfos({ ...userInfos, [name]: value });
    setAddressInfos({ ...addressInfos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(e.target.password)) {
      setMessage(true);
      return;
    }

    if (e.target.password !== e.target.passwordConfirmation) {
      setMessage(true);
      return;
    }

    try {
      const responseAddress = await axios.post(
        `${url}/addresses`,
        addressInfos
      );
      console.log(responseAddress.data);
      const address_id = responseAddress.data.id;

      const responseUser = await axios.post(`${baseUrl}/users`, {
        ...userInfos,
        address_id,
      });

      console.log(responseUser.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='registration-form'>
      <h2>Enregistrez-vous:</h2>
      <form className='registration-form-container'>
        <div className='registration-form-group'>
          <label htmlFor='company-name'>
            <input
              type='text'
              id='company-name'
              name='company_name'
              placeholder='Raison sociale *'
              value={userInfos.company_name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='siret'>
            <input
              type='text'
              id='siret'
              name='siret'
              placeholder='SIRET *'
              value={userInfos.siret}
              onChange={handleChange}
              required
              pattern='^\d{14}$'
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='lastname'>
            <input
              type='text'
              id='lastname'
              name='lastname'
              placeholder='Nom *'
              value={userInfos.lastname}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='firstname'>
            <input
              type='text'
              id='firstname'
              name='firstname'
              placeholder='Prénom *'
              value={userInfos.firstname}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='phone'>
            <input
              type='text'
              id='phone'
              name='phone'
              placeholder='Téléphone *'
              value={userInfos.phone}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='email'>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email *'
              value={userInfos.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='street-number'>
            <input
              type='number'
              id='street-number'
              name='number'
              placeholder='Numéro de voie'
              value={addressInfos.number}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='street-type'>
            <input
              type='text'
              id='street-type'
              name='type'
              placeholder='Type de voie *'
              value={addressInfos.type}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='street-name'>
            <input
              type='text'
              id='street-name'
              name='street_name'
              placeholder='Nom de voie *'
              value={addressInfos.street_name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='complement'>
            <input
              type='text'
              id='complement'
              name='complement'
              placeholder="Complément d'adresse"
              value={addressInfos.complement}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='zip-code'>
            <input
              type='text'
              id='zip-code'
              name='zip_code'
              placeholder='Code postal *'
              value={addressInfos.zip_code}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='city'>
            <input
              type='text'
              id='city'
              name='city'
              placeholder='Ville *'
              value={addressInfos.city}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='website'>
            <input
              type='text'
              id='website'
              name='website_url'
              placeholder='Site web'
              value={userInfos.website_url}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='password'>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Mot de passe *'
              value={userInfos.password}
              onChange={handleChange}
              required
            />
            {message && (
              <p
                className='password-error'
                style={{ color: 'red', fontSize: '0.9em' }}
              >
                Le mot de passe doit contenir au moins 8 caractères, dont au
                moins une majuscule, une minuscule, un chiffre et un caractère
                spécial
              </p>
            )}
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='password-confirmation'>
            <input
              type='password'
              id='password-confirmation'
              name='password-confirmation'
              placeholder='Confirmation *'
              value={userInfos.passwordConfirmation}
              onChange={handleChange}
              required
            />
            {message && (
              <p
                className='password-confirmation-error'
                style={{ color: 'red', fontSize: '0.9em' }}
              >
                Les mots de passe ne correspondent pas
              </p>
            )}
          </label>
        </div>
        <button type='submit-registration-btn' onClick={handleSubmit}>
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
