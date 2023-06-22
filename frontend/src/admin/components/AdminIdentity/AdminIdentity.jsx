import React from 'react'
import ImgAdmin from'../../assets/profilMen.jpg';
import './AdminIdentity.css';


const AdminIdentity = () => {
  return (
    <div className='container-admin'>
      <div className='box-admin'>
        <div className='img-profil'>
          <img src={ImgAdmin} alt="profilMen" />
        </div>
        <div className='identity'>
          <h2>Martin DUPONT</h2>
          <p>Administratif</p>
        </div>
      </div>
    </div>
  )
}

export default AdminIdentity;
