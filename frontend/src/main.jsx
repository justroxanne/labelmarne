import React from 'react';
import ReactDOM from 'react-dom/client';
import AppAdmin from './AppAdmin.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginProvider } from './utils/Context';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <Router>
        <Routes>
          <Route path='*' element={<App />} />
          <Route path='/admin/*' element={<AppAdmin />} />
        </Routes>
      </Router>
    </LoginProvider>
  </React.StrictMode>
);
