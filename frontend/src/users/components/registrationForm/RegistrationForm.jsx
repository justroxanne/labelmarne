import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
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

      const responseUser = await axios.post(`${url}/users`, {
        ...userInfos,
        address_id: address_id,
      });

      console.log(responseUser.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='registration-form'>
      <h2>Enregistrez-vous:</h2>
      <form>
        <div className='registration-form-group'>
          <label htmlFor='company-name'>
            Raison sociale:
            <input
              type='text'
              id='company-name'
              name='company_name'
              value={userInfos.company_name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='siret'>
            SIRET:
            <input
              type='text'
              id='siret'
              name='siret'
              value={userInfos.siret}
              onChange={handleChange}
              required
              pattern='^\d{14}$'
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='lastname'>
            Nom:
            <input
              type='text'
              id='lastname'
              name='lastname'
              value={userInfos.lastname}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='firstname'>
            Prénom:
            <input
              type='text'
              id='firstname'
              name='firstname'
              value={userInfos.firstname}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='phone'>
            Téléphone:
            <input
              type='text'
              id='phone'
              name='phone'
              value={userInfos.phone}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='email'>
            Email:
            <input
              type='email'
              id='email'
              name='email'
              value={userInfos.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='street-number'>
            Numéro de voie:
            <input
              type='number'
              id='street-number'
              name='number'
              value={addressInfos.number}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='street-type'>
            Type de voie:
            <input
              type='text'
              id='street-type'
              name='type'
              value={addressInfos.type}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='street-name'>
            Nom de voie:
            <input
              type='text'
              id='street-name'
              name='street_name'
              value={addressInfos.street_name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='complement'>
            Complément d'adresse:
            <input
              type='text'
              id='complement'
              name='complement'
              value={addressInfos.complement}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='zip-code'>
            Code postal:
            <input
              type='text'
              id='zip-code'
              name='zip_code'
              value={addressInfos.zip_code}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='city'>
            Ville:
            <input
              type='text'
              id='city'
              name='city'
              value={addressInfos.city}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='website'>
            Site web:
            <input
              type='text'
              id='website'
              name='website_url'
              value={userInfos.website_url}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='registration-form-group'>
          <label htmlFor='password'>
            Mot de passe:
            <input
              type='password'
              id='password'
              name='password'
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
            Confirmation du mot de passe:
            <input
              type='password'
              id='password-confirmation'
              name='password-confirmation'
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
