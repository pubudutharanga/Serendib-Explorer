// src/components/MiniWeatherBadge.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { getWeatherIcon } from '../utils/weatherAPI';
import { useWeather } from '../hooks/useWeather';

const MiniWeatherBadge = ({ destination, compact = false }) => {
  const { weather, loading } = useWeather(destination);

  if (loading || !weather) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="inline-flex items-center gap-1 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs text-slate-600 border border-white/20"
      >
        <div className="w-3 h-3 border border-slate-400 border-t-transparent rounded-full animate-spin" />
        {!compact && <span>Loading...</span>}
      </motion.div>
    );
  }

  const currentTemp = Math.round(weather.main.temp);
  const weatherIcon = getWeatherIcon(weather.weather[0].icon);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700 border border-white/30 shadow-sm"
    >
      <span className="text-base">{weatherIcon}</span>
      <span>{currentTemp}°</span>
      {!compact && (
        <span className="text-slate-500 ml-1 capitalize">
          {weather.weather[0].description}
        </span>
      )}
    </motion.div>
  );
};

export default MiniWeatherBadge;