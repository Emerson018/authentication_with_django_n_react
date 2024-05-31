import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './views/Navbar'

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css';

import Loginpage from './views/Loginpage';
import Registerpage from './views/Registerpage';
import Homepage from './views/Homepage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/dashboard" element={<PrivateRoute />}/>
        <Route path="/homepage" element={<Homepage />}/>
        </Routes>
      </AuthProvider>
      
    </Router>
  );
}

export default App;

