import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context';
import { TbLogout } from 'react-icons/tb';
import storageService from '../../services/storageService';
import './userDashboard.css';
import UserCard from '../components/userCard/UserCard';
import EditInfos from '../components/userInfosEdit/EditInfos';
import axios from 'axios';

const UserDashboard = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsEditOpen(!isEditOpen);
  };

  const logout = () => {
    const id = user.id;
    axios
      .post(`${url}/api/users/${id}/logout`, { withCredentials: true })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='user-dashboard'>
      <TbLogout className='logout' onClick={logout} />
      {isEditOpen && <EditInfos handleClick={handleClick} />}
      <UserCard handleClick={handleClick} />
      <div className='my-steps'>
        Mes demandes en cours
        <hr />
        <table>
          <thead>
            <tr>
              <th>Numéro de demande</th>
              <th>Date</th>
              <th>Label</th>
              <th>Avancement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5776537900</td>
              <td>07/06/2023</td>
              <td>AOP</td>
              <td>En cours</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='my-labels'>
        Mes labels
        <hr />
      </div>
    </div>
  );
};

export default UserDashboard;
