import React from 'react'
import DemandTable from '../components/DemandTable/DemandeTable'
import { MdAdminPanelSettings } from 'react-icons/Md';
import './AdminDashboard.css'
import AdminIdentity from '../components/AdminIdentity/AdminIdentity';

function AdminDashboard() {

  return (
   
      <div>
        <div className='adminconnect'>
          <div className='icones-admin'>  
            <MdAdminPanelSettings style={{ width: "2em", height: "2em" }} />
          </div>
          <h3>Martine</h3> 
        </div>
          <AdminIdentity/>
          <DemandTable />
      </div>
      

  )
}

export default AdminDashboard