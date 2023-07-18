import React, { useContext } from 'react'
import DemandTable from '../components/DemandTable/DemandeTable'
import { MdAdminPanelSettings } from 'react-icons/Md';
import { AdminContext } from '../../Context/AdminContext';
import './AdminDashboard.css'
import AdminIdentity from '../components/AdminIdentity/AdminIdentity';

function AdminDashboard() {
  const {admin}= useContext(AdminContext)

  return (
   
      <div>
        <div className='adminconnect'>
          <div className='icones-admin'>  
            <MdAdminPanelSettings style={{ width: "2em", height: "2em" }} />
          </div>
          <h3>{ admin.firstname}</h3> 
        </div>
          <AdminIdentity/>
          <DemandTable />
      </div>
      

  )
}

export default AdminDashboard