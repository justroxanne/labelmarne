import React from 'react';
import ReactDOM from 'react-dom/client';
import AppAdmin from './AppAdmin.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='*' element={<App />} />
        <Route path='/admin/*' element={<AppAdmin />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
