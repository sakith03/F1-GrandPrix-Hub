import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'https://sakith-api-app-b8gkabeabve2apec.centralindia-01.azurewebsites.net';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/teams`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch teams');
        return res.json();
      })
      .then(data => {
        setTeams(data);
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
        <span className="loading-text">Loading teams...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <h3>Unable to Load Teams</h3>
          <p>{error}. Make sure the backend API is running.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>2025 <span>Teams</span></h1>
        <p>The 10 constructors battling for the championship</p>
      </div>
      <div className="cards-grid">
        {teams.map((team, index) => (
          <div
            key={team.id}
            className="card animate-in"
            style={{ '--card-accent': team.color }}
          >
            <div className="card-header">
              <div
                className="card-badge"
                style={{
                  background: `${team.color}20`,
                  color: team.color,
                  border: `1px solid ${team.color}40`
                }}
              >
                {team.country}
              </div>
              {team.championships > 0 && (
                <div className="card-badge" style={{
                  background: 'rgba(255, 215, 0, 0.1)',
                  color: '#FFD700',
                  border: '1px solid rgba(255, 215, 0, 0.3)'
                }}>
                  🏆 {team.championships}x
                </div>
              )}
            </div>
            <div className="card-title">{team.name}</div>
            <div className="card-subtitle">{team.base}</div>
            <div className="card-details" style={{ marginTop: '1rem' }}>
              <div className="card-detail">
                <span className="label">Principal</span>
                <span className="value">{team.teamPrincipal}</span>
              </div>
              <div className="card-detail">
                <span className="label">Power Unit</span>
                <span className="value">{team.powerUnit}</span>
              </div>
              <div className="card-detail">
                <span className="label">Titles</span>
                <span className="value">{team.championships}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
