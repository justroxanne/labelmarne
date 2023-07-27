import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Context';
import './userDashboard.css';
import UserCard from '../components/userCard/UserCard';
import EditInfos from '../components/userInfosEdit/EditInfos';
import axios from 'axios';

const UserDashboard = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userHasLabels, setUserHasLabels] = useState([]);

  const { user } = useContext(UserContext);

  const handleClick = () => {
    setIsEditOpen(!isEditOpen);
  };

  useEffect(() => {
    axios
      .get(`${url}/api/userHasLabels`, {
        params: { user_id: user.id },
        withCredentials: true,
      })
      .then((res) => {
        setUserHasLabels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='user-dashboard'>
      {isEditOpen && <EditInfos handleClick={handleClick} />}
      <UserCard handleClick={handleClick} />
      <div className='my-labels'>
        Mes labels
        <hr />
        {userHasLabels.length === 0 ? (
          <span>Vous n'avez pas encore de label</span>
        ) : (
          <ul className='user-labels-list'>
            {userHasLabels.map((label) => {
              return (
                <li key={label.id} className='user-label-item'>
                  {label.logo && (
                    <img src={`/api/public/uploads/${label.logo}`} />
                  )}
                  <span>{label.name}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
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
    </div>
  );
};

export default UserDashboard;
