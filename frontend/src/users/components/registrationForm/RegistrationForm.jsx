import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoCloseSharp } from 'react-icons/io5';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const [message, setMessage] = useState(false);
  const [messagePassword, setMessagePassword] = useState(false);

  // const [userPassword, setUserPassword] = useState({
  //   password: '',
  // });

  const [userInfos, setUserInfos] = useState({
    address: '',
    complement: '',
    zip_code: '',
    city: '',
    company_name: '',
    siret: '',
    lastname: '',
    firstname: '',
    phone: '',
    email: '',
    website_url: '',
    address_id: '',
    password: '',
  });

  const handleChange = (e) => {
    // const passwordRegex = /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    // if (!passwordRegex.test(e.target.password)) {
    //   setMessagePassword(true);
    //   return;
    // }

    // if (e.target.passwordConfirmation !== e.target.password) {
    //   setMessage(true);
    //   return;
    // } else {
    //   setUserPassword({ password: e.target.password });
    // }

    const { name, value } = e.target;

    if (name === 'siret' && value.length > 14) {
      return;
    }
    setUserInfos({ ...userInfos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseUser = await axios.post(`${url}/api/register`, userInfos);

      console.log(responseUser.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className='registration-form'>
      <IoCloseSharp
        className='close-registration-form'
        onClick={handleCancel}
      />
      <form className='registration-form-container'>
        <div className='registration-form-group'>
          <h2>Candidat</h2>
          <div className='registration-form-subdivision'>
            <label htmlFor='lastname' className='register-lastname'>
              Nom *
              <input
                type='text'
                id='lastname'
                name='lastname'
                value={userInfos.lastname}
                onChange={handleChange}
                required
              />
            </label>

            <label htmlFor='firstname' className='register-firstname'>
              Prénom *
              <input
                type='text'
                id='firstname'
                name='firstname'
                value={userInfos.firstname}
                onChange={handleChange}
                required
              />
            </label>

            <label htmlFor='address' className='register-address'>
              Adresse *
              <input
                type='text'
                id='address'
                name='address'
                value={userInfos.address}
                onChange={handleChange}
                required
              />
            </label>

            <label htmlFor='complement' className='register-complement'>
              <input
                type='text'
                id='complement'
                name='complement'
                value={userInfos.complement}
                onChange={handleChange}
              />
            </label>

            <label htmlFor='zip-code' className='register-zip-code'>
              Code postal *
              <input
                type='text'
                id='zip-code'
                name='zip_code'
                value={userInfos.zip_code}
                onChange={handleChange}
                required
              />
            </label>

            <label htmlFor='city' className='register-city'>
              Ville *
              <input
                type='text'
                id='city'
                name='city'
                value={userInfos.city}
                onChange={handleChange}
                required
              />
            </label>

            <label htmlFor='email' className='register-email'>
              Email *
              <input
                type='email'
                id='email'
                name='email'
                value={userInfos.email}
                onChange={handleChange}
                required
              />
            </label>

            <label htmlFor='phone' className='register-phone'>
              Téléphone *
              <input
                type='text'
                id='phone'
                name='phone'
                value={userInfos.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label htmlFor='password' className='register-password'>
              Mot de passe *
              <input
                type='password'
                id='password'
                name='password'
                value={userInfos.password}
                onChange={handleChange}
                onChangeCapture={(e) => setMessagePassword(false)}
                required
              />
              {messagePassword && (
                <p
                  className='password-error'
                  style={{
                    color: 'red',
                    fontSize: '0.9em',
                    position: 'fixed',
                    zIndex: '10',
                    transform: 'translateY(100%)',
                    backgroundColor: 'white',
                  }}
                >
                  Le mot de passe doit contenir au moins 8 caractères, dont au
                  moins une majuscule, une minuscule, un chiffre et un caractère
                  spécial
                </p>
              )}
            </label>

            {/* <label
              htmlFor='password-confirmation'
              className='register-password-confirmation'
            >
              Confirmation *
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
            </label> */}
          </div>
        </div>

        <hr></hr>

        <div className='registration-form-group'>
          <h2>Entreprise</h2>
          <div className='registration-form-company-subdivision'>
            <label htmlFor='company-name' className='register-company-name'>
              Raison sociale *
              <input
                type='text'
                id='company-name'
                name='company_name'
                value={userInfos.company_name}
                onChange={handleChange}
                required
              />
            </label>

            <label htmlFor='website' className='register-website'>
              Site web
              <input
                type='text'
                id='website'
                name='website_url'
                value={userInfos.website_url}
                onChange={handleChange}
              />
            </label>

            <label htmlFor='siret' className='register-siret'>
              SIRET *
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
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          className='submit-registration-btn'
        >
          Créer un compte
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
