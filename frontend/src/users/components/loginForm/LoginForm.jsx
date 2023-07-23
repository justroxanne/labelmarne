import axios from 'axios';
import React, { useState, useContext } from 'react';
import { LoginContext } from '../../../Context';
import { UserContext } from '../../../Context';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5';
import './loginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const url = import.meta.env.VITE_BACKEND_URL;

  const { displayLogin } = useContext(LoginContext);
  const { storeUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Merci de remplir l'email et le mot de passe");
    } else {
      axios
        .post(
          `${url}/api/login`,
          { email: email, password: password },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            displayLogin();
            storeUser(res.data);
            navigate('/user-dashboard');
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Email ou mot de passe incorrect');
        });
    }
  };

  return (
    <div className='login-form-container'>
      <form className='login-form'>
        <IoCloseSharp className='close-login-form' onClick={displayLogin} />
        <h2>Accès à votre espace utilisateur</h2>
        <label htmlFor='email'>
          <h3>Saisissez votre identifiant:</h3>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='monemail@email.fr'
            value={email}
            onChange={handleEmailChange}
          ></input>
        </label>
        <label htmlFor='password' required>
          <h3>Saisissez votre mot de passe:</h3>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='********'
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button
          type='submit'
          className='login-submit-btn'
          onClick={handleSubmit}
        >
          ENTREZ <FiArrowRight className='arrow-login-btn' />
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
