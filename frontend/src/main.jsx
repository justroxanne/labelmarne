import React from 'react';
import ReactDOM from 'react-dom/client';
import AppAdmin from './AppAdmin.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  LoginProvider,
  UserProvider,
  AdminProvider,
  CategoryProvider,
} from './Context';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <UserProvider>
        <AdminProvider>
          <CategoryProvider>
            <Router>
              <Routes>
                <Route path='/admin/*' element={<AppAdmin />} />
                <Route path='*' element={<App />} />
              </Routes>
            </Router>
          </CategoryProvider>
        </AdminProvider>
      </UserProvider>
    </LoginProvider>
  </React.StrictMode>
);
