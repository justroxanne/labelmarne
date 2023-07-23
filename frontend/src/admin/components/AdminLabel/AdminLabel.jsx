import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminLabel.css';

const AdminLabel = () => {
  const [backendUrlInput, setBackendUrlInput] = useState(import.meta.env.VITE_BACKEND_URL);
  const [labels, setLabels] = useState([]);
  const [editLabelId, setEditLabelId] = useState(null);
  const [editLabelName, setEditLabelName] = useState('');
  const [editLabelUrl, setEditLabelUrl] = useState('');
  const [editLabelLogo, setEditLabelLogo] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newLabelUrl, setNewLabelUrl] = useState('');
  const [newLabelLogo, setNewLabelLogo] = useState('');
  const [newLabelCategory, setNewLabelCategory] = useState('');
  const [showFullUrl, setShowFullUrl] = useState(false); 

  const fetchLabels = async () => {
    try {
      const response = await axios.get(`${backendUrlInput}/api/labels`);
      setLabels(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des labels :', error);
    }
  };

  useEffect(() => {
    fetchLabels();
  }, [backendUrlInput]);

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

      await axios.put(`${backendUrlInput}/api/labels/${labelId}`, updatedData);
      setLabels(labels.map((label) => (label.id === labelId ? { ...label, ...updatedData } : label)));
      setEditLabelId(null);
      setEditLabelName('');
      setEditLabelUrl('');
      setEditLabelLogo('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du label :', error);
    }
  };

  const handleCancelEdit = () => {
    setEditLabelId(null);
    setEditLabelName('');
    setEditLabelUrl('');
    setEditLabelLogo('');
  };

  const handleAddNewLabel = async () => {
    try {
      const newLabelData = {
        name: newLabel,
        url: newLabelUrl,
        logo: newLabelLogo,
        category_id: newLabelCategory,
      };

      const response = await axios.post(`${backendUrlInput}/api/labels`, newLabelData);
      setLabels([...labels, response.data]);
      setNewLabel('');
      setNewLabelUrl('');
      setNewLabelLogo('');
      setNewLabelCategory('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du nouveau label :', error);
    }
  };

  const handleDeleteLabel = async (labelId) => {
    try {
      await axios.delete(`${backendUrlInput}/api/labels/${labelId}`);
      setLabels(labels.filter((label) => label.id !== labelId));
    } catch (error) {
      console.error('Erreur lors de la suppression du label :', error);
    }
  };

  return (
    <div className="admin-label-container">
      <h2>Labels</h2>
      <ul className="label-list">
        {labels.map((label) => (
          <li key={label.id} className="label-item">
            <div className="label-info">
              {editLabelId === label.id ? (
                <div className="edit-label-form">
                  <div className="form-row">
                    <label>Nom :</label>
                    <input
                      type="text"
                      value={editLabelName}
                      onChange={(e) => setEditLabelName(e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <label>Url :</label>
                    <input
                      type="text"
                      value={editLabelUrl}
                      onChange={(e) => setEditLabelUrl(e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <label>Logo :</label>
                    <input
                      type="text"
                      value={editLabelLogo}
                      onChange={(e) => setEditLabelLogo(e.target.value)}
                    />
                  </div>
                  <button className="link-button" onClick={() => handleEditLabelSubmit(label.id)}>Enregistrer</button>
                  <button className="link-button" onClick={() => handleCancelEdit()}>Annuler</button>
                </div>
              ) : (
                <>
                  <span>{label.name}</span>
                  {label.url && (
                    <div className="label-url">
                      {showFullUrl ? (
                        <p>{label.url}</p>
                      ) : (
                        <a href={label.url} target="_blank" rel="noopener noreferrer">
                          Cliquez ici
                        </a>
                      )}
                    </div>
                  )}
                  <div className='btn-modif'>
                    <button className="btn-adminLabel" onClick={() => handleDeleteLabel(label.id)}>Supprimer</button>
                    <button className="btn-adminLabel" onClick={() => {
                      setShowFullUrl(false);
                      handleEditLabel(label.id, label.name, label.url, label.logo);
                    }}>Modifier</button>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <h2>Ajouter un label</h2>
      <div className="add-label-form">
        <div className="form-row">
          <label>Nom :</label>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Url :</label>
          <input
            type="text"
            value={newLabelUrl}
            onChange={(e) => setNewLabelUrl(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Logo :</label>
          <input
            type="text"
            value={newLabelLogo}
            onChange={(e) => setNewLabelLogo(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Catégorie :</label>
          <select value={newLabelCategory} onChange={(e) => setNewLabelCategory(e.target.value)}>
            <option value="">Sélectionnez une catégorie</option>
            <option value="1">Catégorie 1</option> {/* Remplacez 1 par l'ID de la catégorie */}
            <option value="2">Catégorie 2</option> {/* Remplacez 2 par l'ID de la catégorie */}
            {/* Ajoutez d'autres options pour les autres catégories */}
          </select>
        </div>
        <button className="add-button" onClick={handleAddNewLabel}>Ajouter</button>
      </div>
    </div>
  );
};

export default AdminLabel;
