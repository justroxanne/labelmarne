import React from 'react';
import './editInfos.css';
import { IoCloseSharp } from 'react-icons/io5';

const editInfos = ({ handleClick, userInfos, setUserInfos }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfos((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='edit-user-infos'>
      <form className='edit-user-panel' onSubmit={handleSubmit}>
        <IoCloseSharp className='close-edit' onClick={handleClick} />
        <div className='address-edit'>
          <label htmlFor='number'>
            Numéro
            <input
              type='number'
              name='number'
              className='user-infos-label'
              value={userInfos.number}
              onChange={handleInputChange}
              required
            ></input>
          </label>
          <label htmlFor='type'>
            Type de voirie
            <input
              type='text'
              name='type'
              className='user-infos-label'
              value={userInfos.type}
              onChange={handleInputChange}
              required
            ></input>
          </label>
          <label htmlFor='streetname'>
            Nom
            <input
              type='text'
              name='streetname'
              className='user-infos-label'
              value={userInfos.streetname}
              onChange={handleInputChange}
              required
            ></input>
          </label>
          <label htmlFor='zipcode'>
            Code postal
            <input
              type='text'
              name='zipcode'
              className='user-infos-label'
              value={userInfos.zipcode}
              onChange={handleInputChange}
              required
            ></input>
          </label>
          <label htmlFor='city'>
            Ville
            <input
              type='text'
              name='city'
              className='user-infos-label'
              value={userInfos.city}
              onChange={handleInputChange}
              required
            ></input>
          </label>
        </div>
        <div className='edit-label'>
          <label htmlFor='phone'>
            Numéro de téléphone :
            <input
              type='text'
              name='phone'
              className='user-infos-label'
              value={userInfos.phone}
              onChange={handleInputChange}
              required
            ></input>
          </label>
        </div>
        <div className='edit-label'>
          <label htmlFor='email'>
            Email :
            <input
              type='text'
              name='email'
              className='user-infos-label'
              value={userInfos.email}
              onChange={handleInputChange}
              required
            ></input>
          </label>
        </div>
        <button
          type='submit'
          className='submit-infos-edition'
          onClick={handleClick}
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default editInfos;
