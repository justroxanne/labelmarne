import HeaderAdmin from './admin/components/HeaderAdmin/HeaderAdmin';
import FooterAdmin from './admin/components/FooterAdmin/FooterAdmin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './admin/pages/AdminDashboard';
import './AppAdmin.css';
import AdminIdentity from './admin/components/AdminIdentity/AdminIdentity';
import DemandeTable from './admin/components/DemandTable/DemandeTable';

function AppAdmin() {
  return (
    <div>
      <HeaderAdmin />
      <AdminIdentity />
      <DemandeTable />
      <Routes>
        <Route path='/admins/*' element={<AdminDashboard />} />
      </Routes>
      <FooterAdmin />
    </div>
  );
}

export default AppAdmin;
