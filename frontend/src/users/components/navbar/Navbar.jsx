import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext, UserContext } from '../../../Context';
import { FaUserCircle } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import './navbar.css';

const Navbar = () => {
  const { displayLogin } = useContext(LoginContext);
  const { user, logout } = useContext(UserContext);

  const navigate = useNavigate();

  const goDashboard = () => {
    navigate('/user-dashboard');
  };

  const logoutAndGoHome = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className='navbar'>
      <Link to='/faq'>FAQ</Link>
      <span>|</span>
      <Link to='/contact'>Contact</Link>
      <span>|</span>
      {user ? (
        <FaUserCircle className='user-icon' onClick={goDashboard} />
      ) : (
        <FaUserCircle className='user-icon' onClick={displayLogin} />
      )}
      {user ? (
        <>
          <span>|</span>
          <TbLogout className='logout' onClick={logoutAndGoHome} />
        </>
      ) : null}
    </div>
  );
};

export default Navbar;
