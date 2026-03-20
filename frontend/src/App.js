import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import Teams from './pages/Teams';
import Races from './pages/Races';
import Standings from './pages/Standings';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/races" element={<Races />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
    </Router>
  );
}

export default App;