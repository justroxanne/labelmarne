import React from 'react'
import { MdAdminPanelSettings } from 'react-icons/Md';
import logo_marne from'../../assets/logoMarne_partenariat_white.png'
import './HeaderAdmin.css'

const HeaderAdmin = () => {
  return (
    <div className='HeaderAdmin'>
      <div className="logo">
        <img src={logo_marne} alt="logo_marne_white" style={{width:"15%"}}/>
      </div>
      <div className="header-content">
        <div className='icones-admin'>
          <MdAdminPanelSettings style={{ width: "2em", height: "2em" }} />
        </div>
        <h3>Martine</h3>
      </div>
    </div>
  );
}

export default HeaderAdmin