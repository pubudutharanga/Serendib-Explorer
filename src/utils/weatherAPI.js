// src/utils/weatherAPI.js
const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Validate API key on import
if (!WEATHER_API_KEY || WEATHER_API_KEY === 'undefined') {
  console.error('❌ OpenWeather API key is missing. Please check your .env file');
}

export const getCurrentWeather = async (lat, lon) => {
  // Check if API key is available
  if (!WEATHER_API_KEY || WEATHER_API_KEY === 'undefined') {
    throw new Error('OpenWeather API key is not configured');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=en`
    );
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeather API configuration.');
      }
      throw new Error(`Weather data unavailable (Status: ${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('Weather API Error:', error);
    throw error;
  }
};

export const getWeatherForecast = async (lat, lon) => {
  if (!WEATHER_API_KEY || WEATHER_API_KEY === 'undefined') {
    throw new Error('OpenWeather API key is not configured');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=en`
    );
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeather API configuration.');
      }
      throw new Error(`Forecast data unavailable (Status: ${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('Forecast API Error:', error);
    throw error;
  }
};

// Weather condition to icon mapping
export const getWeatherIcon = (condition) => {
  const iconMap = {
    '01d': '☀️',  // clear sky day
    '01n': '🌙',  // clear sky night
    '02d': '⛅',  // few clouds day
    '02n': '☁️',  // few clouds night
    '03d': '☁️',  // scattered clouds
    '03n': '☁️',
    '04d': '🌥️',  // broken clouds
    '04n': '🌥️',
    '09d': '🌧️',  // shower rain
    '09n': '🌧️',
    '10d': '🌦️',  // rain day
    '10n': '🌦️',  // rain night
    '11d': '⛈️',   // thunderstorm
    '11n': '⛈️',
    '13d': '❄️',   // snow
    '13n': '❄️',
    '50d': '🌫️',   // mist
    '50n': '🌫️'
  };
  return iconMap[condition] || '🌈';
};

export const getWeatherGradient = (condition) => {
  const gradientMap = {
    '01d': 'from-yellow-400 to-orange-300',  // sunny
    '01n': 'from-blue-900 to-purple-800',    // clear night
    '02d': 'from-blue-300 to-cyan-200',      // partly cloudy
    '02n': 'from-blue-800 to-indigo-700',
    '03d': 'from-gray-300 to-blue-200',      // cloudy
    '03n': 'from-gray-700 to-blue-800',
    '04d': 'from-gray-400 to-blue-300',      // overcast
    '04n': 'from-gray-800 to-blue-900',
    '09d': 'from-blue-400 to-gray-300',      // rain
    '09n': 'from-blue-800 to-gray-700',
    '10d': 'from-blue-500 to-cyan-400',      // rainy
    '10n': 'from-blue-900 to-cyan-800',
    '11d': 'from-purple-500 to-blue-400',    // storm
    '11n': 'from-purple-900 to-blue-800',
    '13d': 'from-cyan-200 to-blue-100',      // snow
    '13n': 'from-cyan-800 to-blue-700',
    '50d': 'from-gray-200 to-blue-100',      // mist
    '50n': 'from-gray-800 to-blue-700'
  };
  return gradientMap[condition] || 'from-blue-400 to-cyan-300';
};

// Export everything as named exports
export default {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherIcon,
  getWeatherGradient
};