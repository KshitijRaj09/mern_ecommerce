import { Typography } from '@mui/material';
import AppNavbar from './components/AppNavbar';
import LoginModal from './components/authComponents/LoginModal';
import Logout from './components/authComponents/Logout';
import RegisterModal from './components/authComponents/RegisterModal';
import Home from './Pages/HomePage';
import "./index.css";
import { Routes, Route } from 'react-router-dom';
import CartDetails from './Pages/cartPages/CartDetails';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <div>
      <AppNavbar />
      <div style={{
        backgroundColor: '#F5F5F5'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<CartDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div >
  )
}

export default App;
