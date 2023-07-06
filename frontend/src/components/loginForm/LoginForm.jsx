import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          `${url}/login`,
          { email: email, password: password },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            navigate('/dashboard');
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
        <h2>Accès à votre espace utilisateur</h2>
        <label htmlFor='email'>
          <h3>Identifiant</h3>
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
          <h3>Password:</h3>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='********'
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </form>
    </div>
  );
};

export default LoginForm;
