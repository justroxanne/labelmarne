import React, { useState, useEffect } from 'react';
import './adminsList.css';
import axios from 'axios';

const AdminsList = () => {
  const [admins, setAdmins] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${url}/api/admins`)
      .then((res) => {
        setAdmins(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='admins-list'>
      <h2>Liste des admins</h2>
      <ul>
        {admins.map((admin) => {
          return (
            <li key={admin.id}>
              {admin.firstname} {admin.lastname}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminsList;
