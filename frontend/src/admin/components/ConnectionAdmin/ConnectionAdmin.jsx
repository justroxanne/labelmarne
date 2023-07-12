import React from 'react';
import {useState} from 'react';
import authAdmin from '../../../utils/Context/authAdmin';
import './ConnectionAdmin.css';
const ConnectionAdmin = ({ path , component}) => {
  const {isAutenficated} =  useContext(authAdmin)

  return isAutenficated ? (
    <Route path={path} element={component} />
  ) : (
    <Navigate to='/admin' />
  )
}

export default ConnectionAdmin