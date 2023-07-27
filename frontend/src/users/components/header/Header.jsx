import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo_marne from '../../assets/logoMarne_partenariat_white.png';
import Navbar from '../navbar/Navbar';
import './header.css';

const Header = () => {
  const navigate = useNavigate();

  const backHome = () => {
    navigate('/');
  };

  return (
    <div className='header'>
      <div className='header-logo-container'>
        <img src={logo_marne} alt='logo_marne_white' onClick={backHome} />
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
