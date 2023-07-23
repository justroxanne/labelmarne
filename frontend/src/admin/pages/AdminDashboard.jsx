import React, { useState, useContext } from 'react';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../Context/AdminContext';
import AdminIdentity from '../components/AdminIdentity/AdminIdentity';
import AdminLabel from '../components/AdminLabel/AdminLabel';
import AdminCategory from '../components/AdminCategory/AdminCategory';
import './AdminDashboard.css';
import DataVisualization from '../components/DataVisualization/DataVisualization';

function AdminDashboard() {
  const { admin, setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('label'); 

  // Fonction pour gérer la déconnexion et revenir à la page d'accueil
  const handleLogout = () => {
    setAdmin(null);
    navigate('/admin'); 
  };

  // Fonction pour changer d'onglet
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  

  return (
    <div className="admin-dashboard-container">
      <div className='adminconnect'>
        <button className='icones-admin' onClick={handleLogout}>
          <MdAdminPanelSettings style={{ width: "2em", height: "2em" }} />
          <p className='icones-admin-text'>Déconnexion</p>
        </button>
      </div>
      <AdminIdentity />

      {/* Onglets */}
      <div className="tab-buttons">
        <button className={activeTab === 'label' ? 'active-tab' : ''} onClick={() => handleTabChange('label')}>La liste des labels</button>
        <button className={activeTab === 'category' ? 'active-tab' : ''} onClick={() => handleTabChange('category')}>La liste des catégories</button>
        <button className={activeTab === 'data' ? 'active-tab' : ''} onClick={() => handleTabChange('data')}>Visualisation des données</button>
      </div>

      {/* Visualisation des données */}
      {activeTab === 'data' && (
        <div className="data-visualization-container">
          <DataVisualization />
        </div>
      )}

      {/* Contenu de l'onglet actif */}
      <div className="tab-content">
        {activeTab === 'label' ? <AdminLabel /> : (activeTab === 'category' ? <AdminCategory /> : null)}
      </div>
    </div>
  );
}

export default AdminDashboard;
