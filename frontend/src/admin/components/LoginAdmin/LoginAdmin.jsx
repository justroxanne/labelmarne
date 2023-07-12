import React, { useState, useContext } from 'react';
import authAdmin from '../../../utils/Context/authAdmin';
import './LoginAdmin.css';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated } = useContext(authAdmin);

  const handleLogin = () => {
    const data = {
        username: username,
        password: password,
    };

    axios.post('http://localhost:''/api/login_check', data)
    .then((response) => {
        // Gérer la réponse de l'API
      // Par exemple, vérifier si les informations d'identification sont valides
      if(response.data.sucesse){
        isAuthenticated = true;
      }else{
        alert('Mauvais identifiants');
        }
    })
    .catch((error) => {
        // Gérer l'erreur
        console.log(error);
    });


    // Vérifier les informations d'identification ici (par exemple, avec une requête API)
    // Si les informations sont valides, définissez le contexte isAuthenticated sur true
    // Sinon, affichez un message d'erreur ou effectuez toute autre action nécessaire
  };

  return (
    <div className="login-admin">
      <h1>Admin Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginAdmin;
