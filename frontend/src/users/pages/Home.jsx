import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterBar from '../components/filterBar/FilterBar';
import LoginForm from '../../components/loginForm/LoginForm';
import './Home.css';

const Home = () => {
  const [isLoginDisplayed, setIsLoginDisplayed] = useState(false);

  const displayLogin = () => {
    setIsLoginDisplayed(!isLoginDisplayed);
  };

  return (
    <div>
      <div className='login-link'>
        <Link to='/registration'>S'inscrire</Link>
        <span>|</span>
        <a className='open-login' onClick={displayLogin}>
          Connexion
        </a>
      </div>
      {isLoginDisplayed && <LoginForm />}
      <FilterBar />
    </div>
  );
};

export default Home;
