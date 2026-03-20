import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'https://sakith-api-app-b8gkabeabve2apec.centralindia-01.azurewebsites.net';

// Team logo URLs from the official F1 media CDN
const TEAM_LOGOS = {
  'Red Bull Racing': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2024/red-bull-racing-logo',
  'Mercedes-AMG Petronas': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2024/mercedes-logo',
  'Scuderia Ferrari': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2024/ferrari-logo',
  'McLaren F1 Team': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2024/mclaren-logo',
  'Aston Martin': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2024/aston-martin-logo',
  'Alpine F1 Team': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2024/alpine-logo',
  'Williams Racing': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2024/williams-logo',
  'Visa Cash App RB': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2024/rb-logo',
  'Kick Sauber': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2024/kick-sauber-logo',
  'Haas F1 Team': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2024/haas-logo',
};

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
            className="card team-card animate-in"
            style={{ '--card-accent': team.color }}
          >
            <div className="team-card-top">
              <div className="team-logo-wrapper">
                <img
                  src={TEAM_LOGOS[team.name] || ''}
                  alt={`${team.name} logo`}
                  className="team-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="team-logo-fallback" style={{ display: 'none' }}>
                  <span>{team.name.charAt(0)}</span>
                </div>
              </div>
              <div className="team-badges">
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
