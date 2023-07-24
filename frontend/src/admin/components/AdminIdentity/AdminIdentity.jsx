import React, { useContext } from 'react';
import { AdminContext } from './../../../Context/AdminContext';
import './adminIdentity.css';

const AdminIdentity = () => {
  const { admin } = useContext(AdminContext); // Récupère les données de l'administrateur du contexte

  return (
    <div className="container-admin">
      <div className="box-admin">
        <div className="identity">
          <h2>Profil</h2>
          <p>{admin.firstname} {admin.lastname}</p>
          <p>{admin.email}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminIdentity;
