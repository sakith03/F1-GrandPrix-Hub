import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'https://sakith-api-app-b8gkabeabve2apec.centralindia-01.azurewebsites.net';

function Standings() {
  const [activeTab, setActiveTab] = useState('drivers');
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/standings/drivers`).then(r => r.json()),
      fetch(`${API_BASE}/api/standings/constructors`).then(r => r.json())
    ])
      .then(([drivers, constructors]) => {
        setDriverStandings(drivers);
        setConstructorStandings(constructors);
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
        <span className="loading-text">Loading standings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <h3>Unable to Load Standings</h3>
          <p>{error}. Make sure the backend API is running.</p>
        </div>
      </div>
    );
  }

  const maxDriverPoints = driverStandings.length > 0 ? driverStandings[0].points : 1;
  const maxConstructorPoints = constructorStandings.length > 0 ? constructorStandings[0].points : 1;

  function getPositionClass(pos) {
    if (pos === 1) return 'gold';
    if (pos === 2) return 'silver';
    if (pos === 3) return 'bronze';
    return 'default';
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Championship <span>Standings</span></h1>
        <p>Live championship points table for drivers and constructors</p>
      </div>

      <div className="standings-tabs">
        <button
          className={`standings-tab ${activeTab === 'drivers' ? 'active' : ''}`}
          onClick={() => setActiveTab('drivers')}
        >
          Drivers
        </button>
        <button
          className={`standings-tab ${activeTab === 'constructors' ? 'active' : ''}`}
          onClick={() => setActiveTab('constructors')}
        >
          Constructors
        </button>
      </div>

      {activeTab === 'drivers' && (
        <table className="standings-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Pos</th>
              <th>Driver</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {driverStandings.map(standing => (
              <tr key={standing.position} className="animate-in">
                <td>
                  <span className={`position-badge ${getPositionClass(standing.position)}`}>
                    {standing.position}
                  </span>
                </td>
                <td className="driver-name">{standing.driver}</td>
                <td className="team-name-cell">{standing.team}</td>
                <td className="points-bar-cell">
                  <div className="points-bar-wrapper">
                    <div
                      className="points-bar"
                      style={{
                        width: `${(standing.points / maxDriverPoints) * 200}px`,
                        background: 'var(--f1-red)',
                      }}
                    />
                    <span className="points-value">{standing.points}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === 'constructors' && (
        <table className="standings-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Pos</th>
              <th>Constructor</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {constructorStandings.map(standing => (
              <tr key={standing.position} className="animate-in">
                <td>
                  <span className={`position-badge ${getPositionClass(standing.position)}`}>
                    {standing.position}
                  </span>
                </td>
                <td>
                  <span className="team-color-dot" style={{ background: standing.color }} />
                  <span className="driver-name">{standing.team}</span>
                </td>
                <td className="points-bar-cell">
                  <div className="points-bar-wrapper">
                    <div
                      className="points-bar"
                      style={{
                        width: `${(standing.points / maxConstructorPoints) * 200}px`,
                        background: standing.color,
                      }}
                    />
                    <span className="points-value">{standing.points}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Standings;
