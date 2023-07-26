import React, { useContext } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { UserContext } from '../../../Context';
import { useNavigate } from 'react-router-dom'; 
import Avatar from '../../assets/avatar.png';
import './userCard.css';

const UserCard = ({handleClick}) => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/testermoneligibilite');
  };

  return (
    <>
      <div className='usercard'>
        <img
          src={
            user.profile_picture
              ? `/api/public/uploads/${user.profile_picture}`
              : Avatar
          }
          className='profile-picture'
          alt='user profile picture'
        />
        <div className='user-infos'>
          <h3>{user.company_name}</h3>
          <h4>
            {user.firstname} {user.lastname}
          </h4>
          <br />
          <span>{user.address}</span>
          <span>
            {user.zip_code} {user.city}
          </span>
          <span>{user.email}</span>
          <span>{user.phone}</span>
        </div>
        <AiOutlineEdit
          style={{ width: '1.5em', height: '1.5em' }}
          className='edit-infos'
          onClick={handleClick}
        />
      </div>
      <button className='new-step-btn'onClick={handleOnClick}>Faire une demande</button>
    </>
  );
};

export default UserCard;
