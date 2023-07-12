import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginContext } from './utils/Context';
import { useContext, useState } from 'react';
import HeaderAdmin from './admin/components/HeaderAdmin/HeaderAdmin';
import FooterAdmin from './admin/components/FooterAdmin/FooterAdmin';
import { hasAuthenticated } from './utils/services/authAdminApi'; 
import HomeAdmin from './admin/pages/HomeAdmin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AuthAdmin from './utils/Context/authAdmin';
import './AppAdmin.css';



function AppAdmin() {
  const [isAutenficated, setIsAutenficated] = useState(hasAuthenticated());

  return (
    <AuthAdmin.Provider value={{isAutenficated}}>
    <div className='app-admin'>
      <HeaderAdmin />

      <Routes>
        <Route path='/' element={<HomeAdmin />} />
        <AuthAdmin path='/admin' element={<AdminDashboard/>} />
      </Routes>
      
      <FooterAdmin />
    </div>
    </AuthAdmin.Provider>
  );
}

export default AppAdmin;
