import { Typography } from '@mui/material';
import AppNavbar from './components/AppNavbar';
import LoginModal from './components/authComponents/LoginModal';
import Logout from './components/authComponents/Logout';
import RegisterModal from './components/authComponents/RegisterModal';
import "./index.css";

function App() {
  return (
    <div>
      <AppNavbar />
    </div>
  );
}

export default App;
