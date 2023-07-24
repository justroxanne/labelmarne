import React, { useContext } from 'react';
import LoginAdmin from '../components/LoginAdmin/LoginAdmin';
import FirstConnectionAdmin from '../components/FirstConnexionAdmin/FirstConnectionAdmin';
import './HomeAdmin.css'


const HomeAdmin = () => {

  return (
    <div className='homeadmin'>
      <FirstConnectionAdmin  className="FirstConnection"/>
      <LoginAdmin className="LoginConnection"/>
      </div>
  );
};

export default HomeAdmin;