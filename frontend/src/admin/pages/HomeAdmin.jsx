import React, { useContext } from 'react';
import './HomeAdmin';
import LoginAdmin from '../components/LoginAdmin/LoginAdmin';
import FirstConnectionAdmin from '../components/FirstConnexionAdmin/FirstConnectionAdmin';

const HomeAdmin = () => {

  return (
    <div className='homeadmin'>
      <FirstConnectionAdmin />
      <LoginAdmin />
      </div>
  );
};

export default HomeAdmin;