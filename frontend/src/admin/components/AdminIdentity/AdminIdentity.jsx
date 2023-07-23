import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from './../../../Context/AdminContext';
import axios from 'axios';
import './adminIdentity.css';

const AdminIdentity = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const { admin } = useContext(AdminContext); // Récupère les données de l'administrateur du contexte

  const fetchAdmin = async () => {
    try {
      const response = await axios.get(`${url}/api/admin-register`);
      setAdmin(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des infos :', error);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  console.log(admin);

  return (
    <div className="container-admin">
      <div className="box-admin">
        <div className="identity">
          <h2>Profil</h2>
          <p>{admin.firstname} {admin.lastname}</p>
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
