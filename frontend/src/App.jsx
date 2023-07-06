import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginContext } from './utils/Context';
import { useContext } from 'react';
import Header from './users/components/header/Header';
import LoginForm from './components/loginForm/LoginForm';
import Footer from './users/components/footer/Footer';
import UserDashboard from './users/pages/UserDashboard';
import Registration from './users/pages/Registration';
import Home from './users/pages/Home';
import './App.css';

function App() {
  const { isLoginDisplayed } = useContext(LoginContext);

  return (
    <div className='app'>
      {isLoginDisplayed && <LoginForm />}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<UserDashboard />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
