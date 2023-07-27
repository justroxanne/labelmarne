import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../Context';
import { IoCloseSharp } from 'react-icons/io5';
import axios from 'axios';
import './editInfos.css';

const EditInfos = ({ handleClick }) => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const { user, storeUser } = useContext(UserContext);

  const [userInfos, setUserInfos] = useState({
    phone: user.phone,
  });
  const [addressInfos, setAddressInfos] = useState({
    address: user.address,
    complement: user.complement,
    zip_code: user.zip_code,
    city: user.city,
  });

  const handleUserInfosChange = (event) => {
    const { name, value } = event.target;
    setUserInfos((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };
  const handleAddressInfosChange = (event) => {
    const { name, value } = event.target;
    setAddressInfos((prevAddressInfo) => ({
      ...prevAddressInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${url}/api/users/${user.id}`, userInfos).then((response) => {
      storeUser(response.data);
      console.log(response.data);
    });
    axios
      .put(`${url}/api/address/${user.address_id}`, addressInfos)
      .then((response) => {
        storeUser(response.data);
        console.log(response.data);
      });
  };

  return (
    <div className='edit-user-infos'>
      <form className='edit-user-panel' onSubmit={handleSubmit}>
        <IoCloseSharp className='close-edit' onClick={handleClick} />
        <div className='address-edit'>
          <label htmlFor='address'>
            Adresse
            <input
              type='text'
              name='address'
              className='user-infos-label'
              value={addressInfos.address}
              onChange={handleAddressInfosChange}
              required
            ></input>
          </label>
          <label htmlFor='complement'>
            Complément d'adresse
            <input
              type='text'
              name='complement'
              className='user-infos-label'
              value={addressInfos.complement}
              onChange={handleAddressInfosChange}
            ></input>
          </label>
          <label htmlFor='zip_code'>
            Code postal
            <input
              type='text'
              name='zip_code'
              className='user-infos-label'
              value={addressInfos.zip_code}
              onChange={handleAddressInfosChange}
              required
            ></input>
          </label>
          <label htmlFor='city'>
            Ville
            <input
              type='text'
              name='city'
              className='user-infos-label'
              value={addressInfos.city}
              onChange={handleAddressInfosChange}
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
              onChange={handleUserInfosChange}
              required
            ></input>
          </label>
        </div>
        <button
          type='submit'
          className='submit-infos-edition'
          onClick={handleSubmit}
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default EditInfos;
