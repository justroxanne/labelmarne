import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context';
import './userDashboard.css';
import UserCard from '../components/userCard/UserCard';
import EditInfos from '../components/userInfosEdit/EditInfos';

const UserDashboard = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { user } = useContext(UserContext);

  console.log(user);

  const handleClick = () => {
    setIsEditOpen(!isEditOpen);
  };

  return (
    <div className='user-dashboard'>
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
