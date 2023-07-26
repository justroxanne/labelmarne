import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginContext } from './Context';
import { useContext } from 'react';
import Header from './users/components/header/Header';
import LoginForm from './users/components/loginForm/LoginForm';
import Footer from './users/components/footer/Footer';
import UserDashboard from './users/pages/UserDashboard';
import Registration from './users/pages/Registration';
import Home from './users/pages/Home';
import ContactPage from './users/pages/ContactPage';
import PageQuizz from './users/pages/PageQuizz';
import FAQ from './users/pages/FAQ';
import './App.css';




function App() {
  const { isLoginDisplayed } = useContext(LoginContext);

  return (
    <div className='app'>
      {isLoginDisplayed && <LoginForm />}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user-dashboard' element={<UserDashboard />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/testermoneligibilite' element={<PageQuizz />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/contact' element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
