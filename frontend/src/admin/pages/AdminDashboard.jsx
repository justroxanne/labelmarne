import React, { useContext } from 'react';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../Context/AdminContext';
import AdminIdentity from '../components/AdminIdentity/AdminIdentity';
import AdminLabel from '../components/AdminLabel/AdminLabel';
import './AdminDashboard.css';

function AdminDashboard() {
  const { admin, setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion et revenir à la page d'accueil
  const handleLogout = () => {
    setAdmin(null);
    navigate('/admin'); 
  };

  return (
    <div>
      <div className='adminconnect'>
        <button className='icones-admin' onClick={handleLogout}>
          <MdAdminPanelSettings style={{ width: "2em", height: "2em" }} />
          <p className='icones-admin-text'>Déconnexion</p>
        </button>
         <h3>{admin.firstname}</h3>
      </div>
      <AdminIdentity />
      <AdminLabel/>
    </div>
  );
}

export default AdminDashboard;
