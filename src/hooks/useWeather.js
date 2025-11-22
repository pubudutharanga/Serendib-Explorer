// src/hooks/useWeather.js
import { useState, useEffect } from 'react';
import { getCurrentWeather, getWeatherForecast } from '../utils/weatherAPI';

export const useWeather = (destination) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destination?.location) {
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [current, forecastData] = await Promise.all([
          getCurrentWeather(destination.location.lat, destination.location.lng),
          getWeatherForecast(destination.location.lat, destination.location.lng)
        ]);

        setWeather(current);
        setForecast(forecastData);
      } catch (err) {
        console.error('Weather fetch error:', err);
        
        // Provide more user-friendly error messages
        if (err.message.includes('API key')) {
          setError('Weather service configuration error. Please contact support.');
        } else if (err.message.includes('Network')) {
          setError('Network error. Please check your internet connection.');
        } else {
          setError('Unable to load weather data at this time.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [destination]);

  return { weather, forecast, loading, error };
};