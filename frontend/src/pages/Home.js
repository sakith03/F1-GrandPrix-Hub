import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">2025 Season</div>
          <h1>
            The World of <span>Formula 1</span>
          </h1>
          <p>
            Experience the thrill of the fastest motorsport on the planet.
            Explore drivers, teams, race calendar, and championship standings.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">20</span>
              <span className="stat-label">Drivers</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">10</span>
              <span className="stat-label">Teams</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">24</span>
              <span className="stat-label">Races</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">5</span>
              <span className="stat-label">Continents</span>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <h2>Explore <span>F1</span></h2>
        <div className="featured-grid">
          <Link to="/drivers" className="featured-card animate-in">
            <div className="featured-icon">🏎️</div>
            <h3>Drivers</h3>
            <p>Meet the 20 world-class drivers competing for glory in the 2025 season.</p>
          </Link>
          <Link to="/teams" className="featured-card animate-in">
            <div className="featured-icon">🏁</div>
            <h3>Teams</h3>
            <p>Discover the 10 constructors engineering the fastest machines on earth.</p>
          </Link>
          <Link to="/races" className="featured-card animate-in">
            <div className="featured-icon">🌍</div>
            <h3>Race Calendar</h3>
            <p>Follow the 24-race calendar spanning 5 continents across the globe.</p>
          </Link>
          <Link to="/standings" className="featured-card animate-in">
            <div className="featured-icon">🏆</div>
            <h3>Standings</h3>
            <p>Track the championship battles in both driver and constructor standings.</p>
          </Link>
        </div>
      </section>

      <footer className="footer">
        F1 Grand Prix Hub — A simple Formula 1 web application
      </footer>
    </div>
  );
}

export default Home;
