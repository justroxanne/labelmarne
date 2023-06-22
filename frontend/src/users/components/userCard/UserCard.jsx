import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import Leia from '../../assets/userprofile.png';
import './userCard.css';

const UserCard = ({ handleClick, userInfos }) => {
  return (
    <>
      <div className='usercard'>
        <img
          src={Leia}
          className='profile-picture'
          alt='user profile picture'
        />
        <div className='user-infos'>
          <h3>Ma super société</h3>
          <br />
          <span>
            {userInfos.number} {userInfos.type} {userInfos.streetname}
          </span>
          <span>
            {userInfos.zipcode} {userInfos.city}
          </span>
          <span>{userInfos.email}</span>
          <span>{userInfos.phone}</span>
        </div>
        <AiOutlineEdit
          style={{ width: '1.5em', height: '1.5em' }}
          className='edit-infos'
          onClick={handleClick}
        />
      </div>
      <button className='new-step-btn'>Faire une demande</button>
    </>
  );
};

export default UserCard;
