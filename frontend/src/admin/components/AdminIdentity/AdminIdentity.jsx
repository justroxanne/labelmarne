// AdminIdentity.jsx
import React, { useContext } from 'react';
import { AdminContext } from './../../../Context/AdminContext';
import './adminIdentity.css';

const AdminIdentity = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const { admin } = useContext(AdminContext);

  return (
    <div className="container-admin">
      <div className="box-admin">
        <div className="identity">
          <h2>Profil</h2>
          <p>{admin.firstname}{admin.lastname}</p>
          <p>{admin.email}</p>
        </div>
        {admin.profile_picture && (
          <div className="img-profil">
            <img src={`${url}/${admin.profile_picture}`} alt="Profile" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminIdentity;
