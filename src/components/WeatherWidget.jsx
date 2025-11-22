// src/components/WeatherWidget.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModernCard } from './ui/ModernCard';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Eye, Sunrise, Sunset, Calendar } from 'lucide-react';
import { getWeatherIcon, getWeatherGradient } from '../utils/weatherAPI';
import { useWeather } from '../hooks/useWeather'; // Add this import

const WeatherWidget = ({ destination, className = '' }) => {
  const { weather, forecast, loading, error } = useWeather(destination);

  if (loading) {
    return (
      <ModernCard className={`p-6 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
          />
          <span className="ml-3 text-slate-600">Loading weather...</span>
        </div>
      </ModernCard>
    );
  }

  if (error || !weather) {
    return (
      <ModernCard className={`p-6 ${className}`}>
        <div className="text-center py-6">
          <Cloud className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600">Weather data unavailable</p>
          <p className="text-slate-500 text-sm mt-1">Try refreshing the page</p>
        </div>
      </ModernCard>
    );
  }

  const { main, weather: weatherInfo, wind, visibility, sys } = weather;
  const currentWeather = weatherInfo[0];
  const sunrise = new Date(sys.sunrise * 1000);
  const sunset = new Date(sys.sunset * 1000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <ModernCard variant="glass" className="overflow-hidden">
        {/* Weather Header */}
        <div className={`bg-gradient-to-r ${getWeatherGradient(currentWeather.icon)} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{destination.name}</h3>
              <p className="opacity-90 capitalize">{currentWeather.description}</p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-4xl"
            >
              {getWeatherIcon(currentWeather.icon)}
            </motion.div>
          </div>
          
          <div className="flex items-end justify-between mt-4">
            <div className="text-5xl font-light">{Math.round(main.temp)}°</div>
            <div className="text-right">
              <div className="text-lg">Feels like {Math.round(main.feels_like)}°</div>
              <div className="text-sm opacity-90">H: {Math.round(main.temp_max)}° • L: {Math.round(main.temp_min)}°</div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <WeatherStat 
              icon={<Thermometer className="w-4 h-4" />}
              label="Real Feel"
              value={`${Math.round(main.feels_like)}°`}
            />
            <WeatherStat 
              icon={<CloudRain className="w-4 h-4" />}
              label="Humidity"
              value={`${main.humidity}%`}
            />
            <WeatherStat 
              icon={<Wind className="w-4 h-4" />}
              label="Wind"
              value={`${Math.round(wind.speed * 3.6)} km/h`}
            />
            <WeatherStat 
              icon={<Eye className="w-4 h-4" />}
              label="Visibility"
              value={`${(visibility / 1000).toFixed(1)} km`}
            />
          </div>

          {/* Sunrise & Sunset */}
          <div className="flex items-center justify-around p-4 bg-blue-50 rounded-2xl mb-6">
            <div className="text-center">
              <Sunrise className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-sm text-slate-600">Sunrise</div>
              <div className="font-semibold text-slate-800">
                {sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div className="text-center">
              <Sunset className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-sm text-slate-600">Sunset</div>
              <div className="font-semibold text-slate-800">
                {sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          {forecast && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-slate-600" />
                <h4 className="font-semibold text-slate-800">5-Day Forecast</h4>
              </div>
              <div className="space-y-2">
                {forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((day, index) => (
                  <ForecastItem key={day.dt} forecast={day} isToday={index === 0} />
                ))}
              </div>
            </div>
          )}
        </div>
      </ModernCard>
    </motion.div>
  );
};

const WeatherStat = ({ icon, label, value }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="text-center p-3 rounded-xl bg-white border border-blue-100"
  >
    <div className="flex justify-center text-blue-600 mb-2">{icon}</div>
    <div className="text-sm text-slate-600 mb-1">{label}</div>
    <div className="font-semibold text-slate-800">{value}</div>
  </motion.div>
);

const ForecastItem = ({ forecast, isToday }) => {
  const date = new Date(forecast.dt * 1000);
  const dayName = isToday ? 'Today' : date.toLocaleDateString('en', { weekday: 'short' });
  const weather = forecast.weather[0];

  return (
    <motion.div 
    whileHover={{ x: 4 }}
    className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{getWeatherIcon(weather.icon)}</span>
        <div>
          <div className="font-medium text-slate-800">{dayName}</div>
          <div className="text-sm text-slate-600 capitalize">{weather.description}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-slate-800">{Math.round(forecast.main.temp)}°</div>
        <div className="text-sm text-slate-500">
          H: {Math.round(forecast.main.temp_max)}° • L: {Math.round(forecast.main.temp_min)}°
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;