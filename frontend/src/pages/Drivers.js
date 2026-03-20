import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'https://sakith-api-app-b8gkabeabve2apec.centralindia-01.azurewebsites.net';

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/drivers`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch drivers');
        return res.json();
      })
      .then(data => {
        setDrivers(data);
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
        <span className="loading-text">Loading drivers...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <h3>Unable to Load Drivers</h3>
          <p>{error}. Make sure the backend API is running.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>2025 <span>Drivers</span></h1>
        <p>The complete grid of Formula 1 drivers competing this season</p>
      </div>
      <div className="cards-grid">
        {drivers.map((driver, index) => (
          <div
            key={driver.id}
            className="card animate-in"
            style={{ '--card-accent': getTeamColor(driver.team) }}
          >
            <div className="card-header">
              <div>
                <div className="card-title">{driver.firstName} {driver.lastName}</div>
                <div className="card-subtitle">{driver.team}</div>
              </div>
              <div className="card-number">#{driver.number}</div>
            </div>
            <div className="card-details">
              <div className="card-detail">
                <span className="label">Code</span>
                <span className="value">{driver.code}</span>
              </div>
              <div className="card-detail">
                <span className="label">Nationality</span>
                <span className="value">{driver.nationality}</span>
              </div>
              <div className="card-detail">
                <span className="label">Age</span>
                <span className="value">{driver.age}</span>
              </div>
              <div className="card-detail">
                <span className="label">Wins</span>
                <span className="value">{driver.wins}</span>
              </div>
              <div className="card-detail">
                <span className="label">Podiums</span>
                <span className="value">{driver.podiums}</span>
              </div>
              <div className="card-detail">
                <span className="label">Poles</span>
                <span className="value">{driver.poles}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getTeamColor(teamName) {
  const colors = {
    'Red Bull Racing': '#3671C6',
    'Mercedes-AMG Petronas': '#27F4D2',
    'Scuderia Ferrari': '#E80020',
    'McLaren F1 Team': '#FF8000',
    'Aston Martin': '#229971',
    'Alpine F1 Team': '#FF87BC',
    'Williams Racing': '#64C4FF',
    'Visa Cash App RB': '#6692FF',
    'Kick Sauber': '#52E252',
    'Haas F1 Team': '#B6BABD',
  };
  return colors[teamName] || '#E10600';
}

export default Drivers;
