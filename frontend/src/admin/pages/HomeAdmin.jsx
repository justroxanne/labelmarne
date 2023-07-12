import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../utils/Context';
import './HomeAdmin';

const HomeAdmin = () => {
  const { displayLogin } = useContext(LoginContext);

  return (
    <div className='homeadmin'>
      <div className='login-linkAdmin'>
        <Link to='/dashboard'>Se connecter</Link>
        <span>|</span>
        <a className='open-loginAdmin' onClick={displayLogin}>
          Connexion
        </a>
      </div>
    </div>
  );
};

export default HomeAdmin;