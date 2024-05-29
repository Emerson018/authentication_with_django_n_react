import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './views/Navbar'

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
     
        </Routes>
      </div>
    </Router>
  );
}

export default App;

