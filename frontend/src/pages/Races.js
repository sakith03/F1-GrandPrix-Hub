import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Races() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/races`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch races');
        return res.json();
      })
      .then(data => {
        setRaces(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span className="loading-text">Loading race calendar...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <h3>Unable to Load Races</h3>
          <p>{error}. Make sure the backend API is running.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>2025 <span>Race Calendar</span></h1>
        <p>24 rounds across 5 continents — the ultimate test of speed and endurance</p>
      </div>
      <div className="race-list">
        {races.map((race, index) => {
          const raceDate = new Date(race.date);
          const formattedDate = raceDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });

          return (
            <div key={race.id} className="race-item animate-in">
              <div className="race-round">R{race.id}</div>
              <div className="race-info">
                <div className="race-name">{race.name}</div>
                <div className="race-circuit">{race.circuit} — {race.location}</div>
              </div>
              <div className="race-meta">
                <div className="race-meta-item">
                  <span className="meta-label">Date</span>
                  <span className="meta-value">{formattedDate}</span>
                </div>
                <div className="race-meta-item">
                  <span className="meta-label">Laps</span>
                  <span className="meta-value">{race.laps}</span>
                </div>
                <div className="race-meta-item">
                  <span className="meta-label">Length</span>
                  <span className="meta-value">{race.circuitLength}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Races;
