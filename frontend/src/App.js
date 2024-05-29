import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './views/Navbar'

import { AuthProvider } from './context/AuthContext'


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
     
        </Routes>
      </AuthProvider>
      
    </Router>
  );
}

export default App;

