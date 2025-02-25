import React, { useEffect, useState } from 'react';
import { getWeather } from '../api';
import { Weather } from '../types';

interface WeatherProps {
  token: string;
}

const WeatherComponent: React.FC<WeatherProps> = ({ token }) => {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(token);
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    fetchWeather();
  }, [token]);

  if (!weather) return <div>Loading weather...</div>;

  return (
    <div className='weather-container'>
      <div className='weather-column'>
        <h2>
          {weather.location.name}, {weather.location.country}
        </h2>
        <p>Local Time: {weather.location.localtime}</p>
      </div>

      <div className='weather-details'>
        <p>
          <strong>Temperature:</strong> {weather.current.temperature}°C
        </p>
        <p>
          <strong>Feels Like:</strong> {weather.current.feelslike}°C
        </p>
        <p>
          <strong>Weather:</strong> {weather.current.weather_descriptions[0]}
        </p>
        <p>
          <strong>Wind Speed:</strong> {weather.current.wind_speed} km/h
        </p>
        <p>
          <strong>Humidity:</strong> {weather.current.humidity}%
        </p>
        <p>
          <strong>Pressure:</strong> {weather.current.pressure} hPa
        </p>
        <p>
          <strong>Visibility:</strong> {weather.current.visibility} km
        </p>
      </div>
    </div>
  );
};

export default WeatherComponent;
