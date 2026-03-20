import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'https://sakith-api-app-b8gkabeabve2apec.centralindia-01.azurewebsites.net';

// Driver headshot URLs from the official F1 media CDN
const DRIVER_IMAGES = {
  'VER': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01',
  'PER': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01',
  'HAM': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01',
  'LEC': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01',
  'NOR': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01',
  'PIA': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01',
  'SAI': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01',
  'ALB': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01',
  'RUS': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01',
  'ANT': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/A/ANDANT01_Andrea_Kimi_Antonelli/andant01',
  'ALO': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01',
  'STR': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01',
  'GAS': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01',
  'DOO': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/J/JACDOO01_Jack_Doohan/jacdoo01',
  'TSU': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01',
  'HAD': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01',
  'HUL': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01',
  'BOR': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01',
  'BEA': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01',
  'OCO': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01',
};

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
            className="card driver-card animate-in"
            style={{ '--card-accent': getTeamColor(driver.team) }}
          >
            <div className="driver-card-top">
              <div className="driver-photo-wrapper">
                <img
                  src={DRIVER_IMAGES[driver.code] || ''}
                  alt={`${driver.firstName} ${driver.lastName}`}
                  className="driver-photo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="driver-photo-fallback" style={{ display: 'none' }}>
                  <span>{driver.code}</span>
                </div>
              </div>
              <div className="driver-info-top">
                <div className="card-number">#{driver.number}</div>
                <div
                  className="driver-team-stripe"
                  style={{ background: getTeamColor(driver.team) }}
                ></div>
              </div>
            </div>
            <div className="card-title">{driver.firstName} {driver.lastName}</div>
            <div className="card-subtitle">{driver.team}</div>
            <div className="card-details">
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
