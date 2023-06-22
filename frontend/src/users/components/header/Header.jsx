import React from 'react';
import logo_marne from '../../assets/logoMarne_partenariat_white.png';
import './header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='header-logo-container'>
        <img src={logo_marne} alt='logo_marne_white' />
      </div>
    </div>
  );
};

export default Header;
