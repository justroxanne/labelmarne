import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext, UserContext } from '../../../Context';
import { FaUserCircle } from 'react-icons/fa';
import './navbar.css';

const Navbar = () => {
  const { displayLogin } = useContext(LoginContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const goDashboard = () => {
    navigate('/user-dashboard');
  };

  return (
    <div className='navbar'>
      <Link to='/faq'>FAQ</Link>
      <span>|</span>
      <Link to='/contact'>Contact</Link>
      <span>|</span>
      <FaUserCircle
        className='user-icon'
        onClick={user ? goDashboard : displayLogin}
      />
    </div>
  );
};

export default Navbar;
