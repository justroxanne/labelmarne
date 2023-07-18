import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../Context';
import FilterBar from '../components/filterBar/FilterBar';
import './Home.css';

const Home = () => {
  const { displayLogin } = useContext(LoginContext);

  return (
    <div className='homepage'>
      <div className='login-link'>
        <Link to='/registration'>S'inscrire</Link>
        <span>|</span>
        <a className='open-login' onClick={displayLogin}>
          Connexion
        </a>
      </div>
      <FilterBar />
    </div>
  );
};

export default Home;
