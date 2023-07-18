import React, { useContext } from 'react'
import { AdminContext } from '../../../Context/AdminContext';
import './AdminIdentity.css';


const AdminIdentity = () => {
  const {admin}= useContext(AdminContext)

  return (
    <div className='container-admin'>
      <div className='box-admin'>
        <div className='img-profil'>
          <img src={''  } alt="Profile Image" /> {/* Utilisation de l'URL de l'image de profil */}
        </div>
        <div className='identity'>
            <h2>{admin.firstname} {admin.lastname}</h2>
              <p>Administrateur</p>
        </div>
      </div>
    </div>
  )
}

export default AdminIdentity;
