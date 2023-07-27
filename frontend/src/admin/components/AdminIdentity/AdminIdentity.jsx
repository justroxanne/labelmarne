import React, { useContext } from 'react';
import { AdminContext } from './../../../Context/AdminContext';
import Avatar from '../../assets/avatar.png';
import './adminIdentity.css';

const AdminIdentity = () => {
  const { admin } = useContext(AdminContext); // Récupère les données de l'administrateur du contexte

  return (
    <div className='box-admin'>
      <div className='identity'>
        <h2>
          {admin.firstname} {admin.lastname}
        </h2>
        <p>{admin.email}</p>
      </div>
      <img
        className='admin-profile-picture'
        src={
          admin.profile_picture
            ? `/api/public/uploads/${admin.profile_picture}`
            : Avatar
        }
        alt='Profile'
      />
    </div>
  );
};

export default AdminIdentity;
