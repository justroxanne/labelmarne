import React from 'react';
import Logo from'../../assets/logoMarne_partenariat_white.png'
import './FooterAdmin.css';

const FooterAdmin = () => {
  return (
    <div className='footerAdmin'>
      <div className='contact'>
        <h2>ADT DE LA MARNE</h2>
        <p>
          13 Bis Rue Carnot - CS 50074 <br /> 51006 Châlons-en-Champagne
        </p>
        <br />
        <p>CONTACTEZ-NOUS</p>
      </div>
      <div className='logo-container'>
        <img src={Logo} className='logo-footer' alt='logo la marne' />
      </div>
      <div className='newsletter'>
        <h2>NEWSLETTER</h2>
        <p>
          Inscrivez-vous gratuitement à notre lettre d'information et recevez
          notre sélection de bons plans, d'idées de séjours, de visites et de
          sorties !
        </p>
      </div>
    </div>
  );
};

export default FooterAdmin;