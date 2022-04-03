import AppNavbar from './components/AppNavbar';
import Home from './Pages/HomePage';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import CartDetails from './Pages/cartPages/CartDetails';
import PageNotFound from './Pages/PageNotFound';
import Footer from './Pages/Footer';
import { createContext, useState } from 'react';

export const SearchTermContext = createContext(null); // creating context for PageNumber and search Term

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const data = {
    searchTerm,
    setSearchTerm,
    pageNumber,
    setPageNumber,
  };
  console.log(searchTerm);
  if (process.env.NODE_ENV !== 'development') {
    console.log = () => {};
  }
  return (
    <SearchTermContext.Provider value={data}>
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
    </SearchTermContext.Provider>
  );
}

export default App;
