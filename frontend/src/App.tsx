import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import WeatherComponent from './components/Weather';
import Flights from './components/Flights';
import './styles.css';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  const handleClickLogout = () => {
    localStorage.removeItem('token');
  };

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return (
    <div className='app'>
      <div className='weather-header'>
        <WeatherComponent token={token} />
        <button
          className='button'
          onClick={handleClickLogout}
        >
          Выйти
        </button>
      </div>

      <div className='flights-content'>
        <Flights token={token} />
      </div>
    </div>
  );
};

export default App;
