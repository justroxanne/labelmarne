import React from 'react'
import logo_marne from'../../assets/logoMarne_partenariat_white.png'
import './HeaderAdmin.css'

const HeaderAdmin = () => {

  return (
    <div className='HeaderAdmin'>
      <div className="logo">
        <img src={logo_marne} alt="logo_marne_white" style={{width:"15%"}}/>
      </div>
      <div className="header-content">
      </div>
    </div>
  );
}

export default HeaderAdmin