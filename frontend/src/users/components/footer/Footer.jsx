import React from 'react';
import { Link } from 'react-router-dom'; 
import Logo from '../../assets/logoMarne_partenariat_white.png';
import './footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='contact'>
        <h2>ADT DE LA MARNE</h2>
        <span>
          13 Bis Rue Carnot - CS 50074 <br /> 51006 Châlons-en-Champagne
        </span>
        <br />
        <Link to='/contact'>
          <p>CONTACTEZ-NOUS</p>
        </Link>
      </div>
      <div className='footer-logo-container'>
        <img src={Logo} className='footer-logo' alt='logo la marne' />
       <div className='signatures'>
        Designed and developed by <a href='https://example.com'>Audrey ALAIME</a> and <br /><a href='https://roxannelucas.fr'>Roxanne LUCAS</a>
        <p>© 2023 Your Website. All rights reserved.</p>
      </div>
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

export default Footer;