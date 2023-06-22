import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './users/components/header/Header';
import Footer from './users/components/footer/Footer';
import RegistrationForm from './users/components/registrationForm/RegistrationForm';
import UserDashboard from './users/pages/UserDashboard';
// import Home from './users/pages/Home';

import './App.css';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/user' element={<UserDashboard />} />
        <Route path='/registration' element={<RegistrationForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
