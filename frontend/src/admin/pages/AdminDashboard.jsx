import React, { useState, useContext } from 'react';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../Context/AdminContext';
import AdminIdentity from '../components/AdminIdentity/AdminIdentity';
import AdminLabel from '../components/AdminLabel/AdminLabel';
import AdminCategory from '../components/AdminCategory/AdminCategory';
import './AdminDashboard.css';
import DataVisualization from '../components/DataVisualization/DataVisualization';
import AdminRegister from '../components/adminRegister/AdminRegister';
import AdminsList from '../components/adminsList/AdminsList';
import axios from 'axios';
import storageService from '../../services/storageService';

function AdminDashboard() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const { admin, setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('label');

  // Fonction pour gérer la déconnexion et revenir à la page d'accueil
  const handleLogout = () => {
    const id = admin.id;
    axios
      .post(`${url}/api/admins/${id}/logout`, {
        withCredentials: true,
      })
      .then(() => {
        storageService.clearStorage('admin');
        navigate('/admin');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fonction pour changer d'onglet
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='admin-dashboard-container'>
      <div className='adminconnect'>
        <button className='icones-admin' onClick={handleLogout}>
          <MdAdminPanelSettings style={{ width: '2em', height: '2em' }} />
          <p className='icones-admin-text'>Déconnexion</p>
        </button>
      </div>
      <AdminIdentity />

      {/* Onglets */}
      <div className='tab-buttons'>
        <button
          className={activeTab === 'label' ? 'active-tab' : ''}
          onClick={() => handleTabChange('label')}
        >
          La liste des labels
        </button>
        <button
          className={activeTab === 'category' ? 'active-tab' : ''}
          onClick={() => handleTabChange('category')}
        >
          La liste des catégories
        </button>
        <button
          className={activeTab === 'data' ? 'active-tab' : ''}
          onClick={() => handleTabChange('data')}
        >
          Visualisation des données
        </button>
        <button
          className={activeTab === 'add-admin' ? 'active-tab' : ''}
          onClick={() => handleTabChange('add-admin')}
        >
          Ajouter un nouvel administrateur
        </button>
      </div>

      {/* Visualisation des données */}
      {activeTab === 'data' && (
        <div className='data-visualization-container'>
          <DataVisualization />
        </div>
      )}

      {/* Contenu de l'onglet actif */}
      <div className='tab-content'>
        {activeTab === 'label' ? (
          <AdminLabel />
        ) : activeTab === 'category' ? (
          <AdminCategory />
        ) : activeTab === 'add-admin' ? (
          <div className='admins-organiser'>
            <AdminRegister />
            <AdminsList />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
