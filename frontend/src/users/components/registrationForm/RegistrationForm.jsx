import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context';
import axios from 'axios';
import { IoCloseSharp } from 'react-icons/io5';
import { BsEyeFill } from 'react-icons/bs';
import { BiCheck } from 'react-icons/bi';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const { storeUser } = useContext(UserContext);

  const navigate = useNavigate();

  const passwordRegex = new RegExp(
    /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );

  const [profile_picture, setProfile_picture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
    const { name, value } = e.target;

    if (name === 'siret' && value.length > 14) {
      return;
    }
    setUserInfos({ ...userInfos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!passwordRegex.test(userInfos.password)) {
        return;
      } else {
        const formData = new FormData();
        formData.append('profile_picture', profile_picture);
        for (const key in userInfos) {
          formData.append(key, userInfos[key]);
        }

        const responseUser = await axios.post(`${url}/api/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        storeUser(responseUser.data);
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleChangePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='registration-form'>
      <IoCloseSharp
        className='close-registration-form'
        onClick={handleCancel}
      />
      <form
        className='registration-form-container'
        encType='multipart/form-data'
        method='post'
      >
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

            <label
              htmlFor='password'
              className='register-password'
              style={{ position: 'relative' }}
            >
              Mot de passe *
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={userInfos.password}
                onChange={handleChange}
                required
              />
              <BsEyeFill
                onClick={handleChangePasswordVisibility}
                style={{ position: 'absolute', top: '1.5em', right: '1em' }}
              />
              <ul
                style={{
                  listStyle: 'none',
                  fontSize: '0.7em',
                  position: 'fixed',
                  transform: 'translateY(5em)',
                }}
              >
                <li
                  className={
                    userInfos.password.length >= 8
                      ? 'valid-password'
                      : 'invalid-password'
                  }
                >
                  8 caractères minimum
                  {userInfos.password.length >= 8 && <BiCheck />}
                </li>
                <li
                  className={
                    userInfos.password.match(/[A-Z]/)
                      ? 'valid-password'
                      : 'invalid-password'
                  }
                >
                  1 majuscule {userInfos.password.match(/[A-Z]/) && <BiCheck />}
                </li>
                <li
                  className={
                    userInfos.password.match(/[a-z]/)
                      ? 'valid-password'
                      : 'invalid-password'
                  }
                >
                  1 minuscule {userInfos.password.match(/[a-z]/) && <BiCheck />}
                </li>
                <li
                  className={
                    userInfos.password.match(/[0-9]/)
                      ? 'valid-password'
                      : 'invalid-password'
                  }
                >
                  1 chiffre {userInfos.password.match(/[0-9]/) && <BiCheck />}
                </li>
              </ul>
            </label>
            <label
              htmlFor='profile_picture'
              className='register-profile-picture'
            >
              Photo de profil
              <input
                type='file'
                id='profile_picture'
                name='profile_picture'
                onChange={(e) => setProfile_picture(e.target.files[0])}
              />
            </label>
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
