// src/components/ExpandableWeather.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Eye, 
  Sunrise, 
  Sunset, 
  Calendar, 
  Droplets, 
  Gauge, 
  Navigation,
  Compass,
  Umbrella,
  CloudDrizzle,
  CloudSnow,
  CloudLightning
} from 'lucide-react';
import { ModernCard } from './ui/ModernCard';
import { getWeatherIcon, getWeatherGradient } from '../utils/weatherAPI';
import { useWeather } from '../hooks/useWeather';

const ExpandableWeather = ({ destination, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { weather, forecast, loading, error } = useWeather(destination);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Enhanced Mini Weather Badge (Collapsed State)
  const MiniWeatherBadge = () => {
    if (loading || !weather) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur-xl rounded-2xl text-slate-800 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-left">
            <div className="font-semibold text-lg">Loading...</div>
            <div className="text-sm text-slate-600">Weather data</div>
          </div>
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur-xl rounded-2xl text-slate-800 border border-white/30 shadow-lg"
        >
          <Cloud className="w-6 h-6 text-slate-500" />
          <div className="text-left">
            <div className="font-semibold text-lg">Unavailable</div>
            <div className="text-sm text-slate-600">Weather data</div>
          </div>
        </motion.div>
      );
    }

    const currentTemp = Math.round(weather.main.temp);
    const weatherIcon = getWeatherIcon(weather.weather[0].icon);
    const feelsLike = Math.round(weather.main.feels_like);
    const humidity = weather.main.humidity;

    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={toggleExpand}
        className="flex items-center gap-4 px-5 py-4 bg-white/95 backdrop-blur-xl rounded-2xl text-slate-800 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 group w-full max-w-sm"
      >
        <div className="flex items-center gap-3 flex-1">
          <span className="text-3xl">{weatherIcon}</span>
          <div className="text-left">
            <div className="font-bold text-2xl">{currentTemp}°</div>
            <div className="text-sm text-slate-600 capitalize">
              {weather.weather[0].description}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <div className="text-center">
            <Thermometer className="w-4 h-4 mx-auto mb-1" />
            <span>{feelsLike}°</span>
          </div>
          <div className="text-center">
            <Droplets className="w-4 h-4 mx-auto mb-1" />
            <span>{humidity}%</span>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-slate-400 group-hover:text-slate-600 transition-colors flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    );
  };

  // Enhanced Detailed Weather Widget (Expanded State)
  const DetailedWeather = () => {
    if (loading) {
      return (
        <ModernCard className="p-8">
          <div className="flex items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full"
            />
            <span className="ml-4 text-slate-600 text-lg">Loading detailed weather data...</span>
          </div>
        </ModernCard>
      );
    }

    if (error || !weather) {
      return (
        <ModernCard className="p-8">
          <div className="text-center py-12">
            <Cloud className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 text-lg mb-2">Weather data unavailable</p>
            <p className="text-slate-500">Try refreshing the page or check your connection</p>
          </div>
        </ModernCard>
      );
    }

    const { main, weather: weatherInfo, wind, visibility, sys, clouds, rain, snow } = weather;
    const currentWeather = weatherInfo[0];
    const sunrise = new Date(sys.sunrise * 1000);
    const sunset = new Date(sys.sunset * 1000);

    // Calculate UV Index (mock - in real app, you'd get this from API)
    const uvIndex = Math.min(Math.round((main.feels_like - 20) / 5 + 3), 11);
    
    // Calculate precipitation
    const precipitation = rain ? rain['1h'] || 0 : snow ? snow['1h'] || 0 : 0;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, height: 0 }}
        animate={{ opacity: 1, scale: 1, height: 'auto' }}
        exit={{ opacity: 0, scale: 0.95, height: 0 }}
        className="overflow-hidden"
      >
        <ModernCard variant="glass" className="overflow-hidden shadow-2xl">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-white/20 bg-white/5">
            <div>
              <h3 className="font-bold text-2xl text-slate-800">Weather Details</h3>
              <p className="text-slate-600 text-sm">Real-time weather for {destination.name}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleExpand}
              className="p-2 text-slate-500 hover:text-slate-700 transition-colors bg-white/50 rounded-lg"
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Enhanced Weather Header */}
          <div className={`bg-gradient-to-r ${getWeatherGradient(currentWeather.icon)} p-8 text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{destination.name}</h3>
                  <p className="text-xl opacity-90 capitalize">{currentWeather.description}</p>
                </div>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-6xl"
                >
                  {getWeatherIcon(currentWeather.icon)}
                </motion.div>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="text-7xl font-light">{Math.round(main.temp)}°</div>
                <div className="text-right">
                  <div className="text-xl mb-2">Feels like {Math.round(main.feels_like)}°</div>
                  <div className="text-lg opacity-90">
                    H: {Math.round(main.temp_max)}° • L: {Math.round(main.temp_min)}°
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Weather Details */}
          <div className="p-8">
            {/* Primary Weather Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <EnhancedWeatherStat 
                icon={<Thermometer className="w-5 h-5" />}
                label="Real Feel"
                value={`${Math.round(main.feels_like)}°`}
                description="How it actually feels"
              />
              <EnhancedWeatherStat 
                icon={<Droplets className="w-5 h-5" />}
                label="Humidity"
                value={`${main.humidity}%`}
                description="Air moisture level"
              />
              <EnhancedWeatherStat 
                icon={<Wind className="w-5 h-5" />}
                label="Wind Speed"
                value={`${Math.round(wind.speed * 3.6)} km/h`}
                description="Current wind conditions"
              />
              <EnhancedWeatherStat 
                icon={<Gauge className="w-5 h-5" />}
                label="Pressure"
                value={`${main.pressure} hPa`}
                description="Atmospheric pressure"
              />
            </div>

            {/* Secondary Weather Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <EnhancedWeatherStat 
                icon={<Eye className="w-5 h-5" />}
                label="Visibility"
                value={`${(visibility / 1000).toFixed(1)} km`}
                compact
              />
              <EnhancedWeatherStat 
                icon={<Cloud className="w-5 h-5" />}
                label="Cloudiness"
                value={`${clouds.all}%`}
                compact
              />
              <EnhancedWeatherStat 
                icon={<Umbrella className="w-5 h-5" />}
                label="Precipitation"
                value={`${precipitation} mm`}
                compact
              />
              <EnhancedWeatherStat 
                icon={<Compass className="w-5 h-5" />}
                label="UV Index"
                value={uvIndex}
                uvLevel={uvIndex}
                compact
              />
            </div>

            {/* Wind Details */}
            {wind && (
              <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                <h4 className="font-semibold text-slate-800 text-lg mb-4 flex items-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Wind Details
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{Math.round(wind.speed * 3.6)}</div>
                    <div className="text-sm text-slate-600">Speed (km/h)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{wind.deg}°</div>
                    <div className="text-sm text-slate-600">Direction</div>
                  </div>
                  {wind.gust && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">{Math.round(wind.gust * 3.6)}</div>
                      <div className="text-sm text-slate-600">Gust (km/h)</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">
                      {wind.speed < 1 ? 'Calm' : 
                       wind.speed < 5 ? 'Light' : 
                       wind.speed < 10 ? 'Moderate' : 'Strong'}
                    </div>
                    <div className="text-sm text-slate-600">Condition</div>
                  </div>
                </div>
              </div>
            )}

            {/* Sunrise & Sunset with Progress */}
            <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-2xl p-6 mb-8">
              <h4 className="font-semibold text-slate-800 text-lg mb-4">Daylight</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DaylightCard 
                  icon={<Sunrise className="w-6 h-6 text-orange-500" />}
                  label="Sunrise"
                  time={sunrise}
                  color="from-orange-400 to-yellow-400"
                />
                <DaylightCard 
                  icon={<Sunset className="w-6 h-6 text-purple-500" />}
                  label="Sunset"
                  time={sunset}
                  color="from-purple-400 to-pink-400"
                />
              </div>
            </div>

            {/* Enhanced 5-Day Forecast */}
            {forecast && (
              <div className="bg-white rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <h4 className="font-bold text-slate-800 text-xl">5-DAY FORECAST</h4>
                </div>
                <div className="space-y-3">
                  {forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((day, index) => (
                    <EnhancedForecastItem key={day.dt} forecast={day} isToday={index === 0} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </ModernCard>
      </motion.div>
    );
  };

  const EnhancedWeatherStat = ({ icon, label, value, description, compact = false, uvLevel }) => (
    <motion.div 
      whileHover={{ scale: 1.03, y: -2 }}
      className={`text-center p-4 rounded-xl bg-white border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 ${
        compact ? 'p-3' : ''
      }`}
    >
      <div className="flex justify-center text-blue-600 mb-2">{icon}</div>
      <div className={`font-semibold text-slate-800 ${compact ? 'text-lg' : 'text-2xl'} mb-1`}>
        {value}
        {uvLevel !== undefined && (
          <span className={`text-xs ml-1 px-2 py-1 rounded-full ${
            uvLevel <= 2 ? 'bg-green-100 text-green-800' :
            uvLevel <= 5 ? 'bg-yellow-100 text-yellow-800' :
            uvLevel <= 7 ? 'bg-orange-100 text-orange-800' :
            uvLevel <= 10 ? 'bg-red-100 text-red-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {uvLevel <= 2 ? 'Low' :
             uvLevel <= 5 ? 'Moderate' :
             uvLevel <= 7 ? 'High' :
             uvLevel <= 10 ? 'Very High' : 'Extreme'}
          </span>
        )}
      </div>
      <div className={`text-slate-600 ${compact ? 'text-sm' : 'text-base'}`}>{label}</div>
      {description && (
        <div className="text-xs text-slate-500 mt-1">{description}</div>
      )}
    </motion.div>
  );

  const DaylightCard = ({ icon, label, time, color }) => (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-4 bg-white rounded-xl border border-orange-100"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-50 rounded-lg">
          {icon}
        </div>
        <div>
          <div className="font-semibold text-slate-800">{label}</div>
          <div className="text-2xl font-bold text-slate-900">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} shadow-lg`}></div>
    </motion.div>
  );

  const EnhancedForecastItem = ({ forecast, isToday }) => {
    const date = new Date(forecast.dt * 1000);
    const dayName = isToday ? 'Today' : date.toLocaleDateString('en', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
    const weather = forecast.weather[0];
    const precipitation = forecast.rain ? forecast.rain['3h'] || 0 : forecast.snow ? forecast.snow['3h'] || 0 : 0;

    return (
      <motion.div 
        whileHover={{ x: 4, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
        className="flex items-center justify-between p-4 rounded-xl border border-blue-50 transition-all duration-300"
      >
        <div className="flex items-center gap-4 flex-1">
          <span className="text-3xl">{getWeatherIcon(weather.icon)}</span>
          <div className="flex-1">
            <div className="font-semibold text-slate-800">{dayName}</div>
            <div className="text-sm text-slate-600 capitalize">{weather.description}</div>
            <div className="text-xs text-slate-500 mt-1">{dateStr}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {precipitation > 0 && (
            <div className="text-center">
              <CloudDrizzle className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <div className="text-xs text-slate-600">{precipitation}mm</div>
            </div>
          )}
          
          <div className="text-right">
            <div className="font-bold text-slate-800 text-lg">{Math.round(forecast.main.temp)}°</div>
            <div className="text-sm text-slate-500 flex gap-2">
              <span>H: {Math.round(forecast.main.temp_max)}°</span>
              <span>L: {Math.round(forecast.main.temp_min)}°</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="mini"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center"
          >
            <MiniWeatherBadge />
          </motion.div>
        ) : (
          <motion.div
            key="detailed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <DetailedWeather />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableWeather;