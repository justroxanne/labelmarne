import React, { useState } from 'react';
import './userDashboard.css';
import UserCard from '../components/userCard/UserCard';
import EditInfos from '../components/userInfosEdit/EditInfos';

const UserDashboard = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [userInfos, setUserInfos] = useState({
    phone: '01 02 03 04 05',
    email: 'monadresse@mail.fr',
    number: 23,
    type: 'rue',
    streetname: 'du Temple',
    zipcode: '12345',
    city: 'Quelquepart',
  });

  const handleClick = () => {
    setIsEditOpen(!isEditOpen);
  };

  return (
    <div className='user-dashboard'>
      {isEditOpen && (
        <EditInfos
          handleClick={handleClick}
          userInfos={userInfos}
          setUserInfos={setUserInfos}
        />
      )}
      <UserCard
        handleClick={handleClick}
        userInfos={userInfos}
        setUserInfos={setUserInfos}
      />
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
