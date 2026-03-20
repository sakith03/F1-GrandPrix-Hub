import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-f1">F1</span>
          <span className="logo-text">Grand Prix Hub</span>
        </NavLink>
        <ul className="navbar-links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/drivers" className={({ isActive }) => isActive ? 'active' : ''}>Drivers</NavLink></li>
          <li><NavLink to="/teams" className={({ isActive }) => isActive ? 'active' : ''}>Teams</NavLink></li>
          <li><NavLink to="/races" className={({ isActive }) => isActive ? 'active' : ''}>Races</NavLink></li>
          <li><NavLink to="/standings" className={({ isActive }) => isActive ? 'active' : ''}>Standings</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
