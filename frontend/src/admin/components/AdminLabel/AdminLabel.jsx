import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminLabel.css';
import AddLabel from '../addLabel/AddLabel';

const AdminLabel = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [labels, setLabels] = useState([]);
  const [editLabelId, setEditLabelId] = useState(null);
  const [editLabelName, setEditLabelName] = useState('');
  const [editLabelUrl, setEditLabelUrl] = useState('');
  const [editLabelLogo, setEditLabelLogo] = useState('');
  const [categories, setCategories] = useState([]);
  const [newLabelLogoFile, setNewLabelLogoFile] = useState(null);

  //fonction pour récupérer les labels
  const fetchLabels = async () => {
    try {
      const response = await axios.get(`${url}/api/labels`);
      setLabels(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des labels :', error);
    }
  };

  //fonction pour récupérer les catégories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
    }
  };

  //useEffect pour récupérer les labels et les catégories
  useEffect(() => {
    fetchLabels();
    fetchCategories();
  }, []);

  //fonction pour modifier un label
  const handleEditLabel = (labelId, labelName, labelUrl, labelLogo) => {
    setEditLabelId(labelId);
    setEditLabelName(labelName);
    setEditLabelUrl(labelUrl);
    setEditLabelLogo(labelLogo);
  };

  const handleEditLabelSubmit = async (labelId) => {
    try {
      const updatedData = {
        name: editLabelName,
        url: editLabelUrl,
        logo: editLabelLogo,
      };

      await axios.put(`${url}/api/labels/${labelId}`, updatedData);
      setLabels(
        labels.map((label) =>
          label.id === labelId ? { ...label, ...updatedData } : label
        )
      );
      setEditLabelId(null);
      setEditLabelName('');
      setEditLabelUrl('');
      setEditLabelLogo('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du label :', error);
    }
  };

  //fonction pour annuler la modification d'un label
  const handleCancelEdit = () => {
    setEditLabelId(null);
    setEditLabelName('');
    setEditLabelUrl('');
    setEditLabelLogo('');
  };

  // Fonction pour gérer le changement du fichier image du logo
  const handleNewLabelLogoChange = (e) => {
    const file = e.target.files[0];
    setNewLabelLogoFile(file);
  };

  //fonction pour supprimer un label
  const handleDeleteLabel = async (labelId) => {
    try {
      await axios.delete(`${url}/api/labels/${labelId}`);
      setLabels(labels.filter((label) => label.id !== labelId));
    } catch (error) {
      console.error('Erreur lors de la suppression du label :', error);
    }
  };

  return (
    <div className='admin-label-container'>
      <h2>Labels</h2>
      <ul className='label-list'>
        {labels.map((label) => (
          <li key={label.id} className='label-item'>
            {editLabelId === label.id ? (
              <div className='edit-label-form'>
                <div className='form-row'>
                  <label>Nom :</label>
                  <input
                    type='text'
                    value={editLabelName}
                    onChange={(e) => setEditLabelName(e.target.value)}
                  />
                </div>
                <div className='form-row'>
                  <label>Url :</label>
                  <input
                    type='text'
                    value={editLabelUrl}
                    onChange={(e) => setEditLabelUrl(e.target.value)}
                  />
                </div>
                <div className='form-row'>
                  <label>Logo :</label>
                  <input
                    type='text'
                    value={editLabelLogo}
                    onChange={(e) => setEditLabelLogo(e.target.value)}
                  />
                </div>
                <button
                  className='link-button'
                  onClick={() => handleEditLabelSubmit(label.id)}
                >
                  Enregistrer
                </button>
                <button
                  className='link-button'
                  onClick={() => handleCancelEdit()}
                >
                  Annuler
                </button>
              </div>
            ) : (
              <>
                <div className='admin-label-infos'>
                  <img
                    className='admin-label-logo'
                    src={`/api/public/uploads/${label.logo}`}
                  />
                  <p style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.2em' }}>{label.name}</span>
                    {label.url && (
                      <a
                        href={label.url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Voir la page
                      </a>
                    )}
                  </p>
                </div>

                <div className='update-btn'>
                  <button
                    className='btn-adminLabel'
                    onClick={() => handleDeleteLabel(label.id)}
                  >
                    Supprimer
                  </button>
                  <button
                    className='btn-adminLabel'
                    onClick={() => {
                      handleEditLabel(
                        label.id,
                        label.name,
                        label.url,
                        label.logo
                      );
                    }}
                  >
                    Modifier
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2>Ajouter un label</h2>
      <AddLabel categories={categories} labels={labels} setLabels={setLabels} />
    </div>
  );
};

export default AdminLabel;
