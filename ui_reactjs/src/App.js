import AppNavbar from './components/AppNavbar';
import Home from './Pages/HomePage';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import CartDetails from './Pages/cartPages/CartDetails';
import PageNotFound from './Pages/PageNotFound';
import Footer from './Pages/Footer';

function App() {
  if (process.env.NODE_ENV !== 'development') {
    console.log = () => {};
  }
  return (
    <div>
      <AppNavbar />
      <div
        style={{
          backgroundColor: '#F5F5F5',
        }}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='cart' element={<CartDetails />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
