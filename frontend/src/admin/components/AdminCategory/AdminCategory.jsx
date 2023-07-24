import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminCategory.css';

const AdminCategory = () => {
  const [backendUrlInput, setBackendUrlInput] = useState(import.meta.env.VITE_BACKEND_URL);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [deleteCategory, setDeleteCategory] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendUrlInput}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [backendUrlInput]);

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(`${backendUrlInput}/api/categories`, { name: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory('');
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie :', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${backendUrlInput}/api/categories/${categoryId}`);
      setCategories(categories.filter((category) => category.id !== categoryId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie :', error);
    }
  };

  return (
    <div className='category-container'>
      <h1>Les catégories de labels</h1>
      <div className="admin-category">
        <div className="admin-category__list">
          {categories.map((category) => (
            <div key={category.id}>
              <span>{category.name}</span>
              <button onClick={() => handleDeleteCategory(category.id)}>Supprimer</button>
            </div>
          ))}
        </div>
        <div className="admin-category__add">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nouvelle catégorie"
          />
          <button onClick={handleAddCategory}>Ajouter</button>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
