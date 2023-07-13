import React from 'react';
import ReactDOM from 'react-dom/client';
import AppAdmin from './AppAdmin.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginProvider, UserProvider } from './Context';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path='*' element={<App />} />
            <Route path='/admins/*' element={<AppAdmin />} />
          </Routes>
        </Router>
      </UserProvider>
    </LoginProvider>
  </React.StrictMode>
);
