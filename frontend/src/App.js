import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './views/TopNavbar';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loginpage from './views/Loginpage';
import Registerpage from './views/Registerpage';
import Homepage from './views/Homepage';
import Dashboard from './views/Dashboard';
import Getdata from './views/Getdata';
import ChartPage from './views/ChartPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/getdata" element={<Getdata />} />
          <Route path="/chartpage" element={<ChartPage />} />
          <Route path="/" element={<Homepage />} />

          {/* Rota privada */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
