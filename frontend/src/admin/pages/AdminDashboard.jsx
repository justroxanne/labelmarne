import  AdminIdentity  from '../components/AdminIdentity/AdminIdentity'
import DemandeTable from '../components/DemandTable/DemandeTable'
import FooterAdmin from '../components/FooterAdmin/FooterAdmin'
import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin'
import './AdminDashboard.css'

function AdminDashboard() {

  return (
   
      <div>
        <HeaderAdmin/>
        <AdminIdentity/>
        <DemandeTable/>
        <FooterAdmin/>
      </div>
      

  )
}

export default AdminDashboard