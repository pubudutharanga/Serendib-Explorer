// src/pages/ModernDestinationDetail.jsx
import React, { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import data from '../data/destinations.json'
import ReactPlayer from 'react-player'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Share2, 
  MapPin, 
  Star, 
  Users, 
  Clock, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  Hotel,
  Navigation,
  Camera,
  Utensils,
  ShoppingBag,
  Eye,
  Mountain,
  Activity,
  Trees,
  Palette,
  X,
  Thermometer,
  Droplets
} from 'lucide-react'
import { ModernCard } from '../components/ui/ModernCard'
import { ModernButton } from '../components/ui/ModernButton'
import useLocalStorage from '../hooks/useLocalStorage'
import ExpandableWeather from '../components/ExpandableWeather'
import { getWeatherIcon } from '../utils/weatherAPI'
import { useWeather } from '../hooks/useWeather'
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Compact Hero Weather Badge Component
const HeroWeatherBadge = ({ destination }) => {
  const { weather, loading } = useWeather(destination);

  if (loading || !weather) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-4 left-4 z-20 sm:top-6 sm:left-6"
      >
        <div className="bg-black/50 backdrop-blur-xl rounded-xl p-3 text-white border border-white/20 shadow-lg min-w-[120px]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <div>
              <div className="font-semibold text-xs">Loading...</div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const currentTemp = Math.round(weather.main.temp);
  const weatherIcon = getWeatherIcon(weather.weather[0].icon);
  const condition = weather.weather[0].description;
  const feelsLike = Math.round(weather.main.feels_like);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="absolute top-4 left-4 z-20 sm:top-6 sm:left-6"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -1 }}
        className="bg-black/50 backdrop-blur-xl rounded-xl p-3 text-white border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <motion.span 
            className="text-2xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {weatherIcon}
          </motion.span>
          <div className="min-w-0">
            <div className="font-bold text-lg leading-tight">{currentTemp}°C</div>
            <div className="text-xs opacity-90 capitalize truncate">{condition}</div>
          </div>
        </div>
        
        {/* Hover Details */}
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: 'auto' }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/20 text-xs opacity-90">
            <div className="flex items-center gap-1">
              <Thermometer className="w-3 h-3" />
              <span>{feelsLike}°</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3" />
              <span>{weather.main.humidity}%</span>
            </div>
          </div>
        </motion.div>
        
        {/* Weather Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </motion.div>
    </motion.div>
  );
};

export default function ModernDestinationDetail() {
  const { id } = useParams()
  const dest = data.destinations.find(d => d.id === id)
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const videoRef = useRef(null)

  if (!dest) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md w-full"
      >
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
          <MapPin className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold mb-2">Destination Not Found</h2>
        <p className="text-muted-foreground mb-6 text-sm">The destination you're looking for doesn't exist.</p>
        <Link to="/">
          <ModernButton size="sm">
            Back to Destinations
          </ModernButton>
        </Link>
      </motion.div>
    </div>
  )

  const isFavorite = favorites.includes(id)

  const toggleFavorite = () => {
    setFavorites(prev => {
      const newFavorites = isFavorite 
        ? prev.filter(f => f !== id)
        : [...prev, id]
      return newFavorites
    })
  }

  const nextImage = () => {
    setActiveImageIndex((prev) => 
      prev === dest.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? dest.images.length - 1 : prev - 1
    )
  }

  const shareDestination = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: dest.name,
          text: dest.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      // Show a subtle notification instead of alert
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
      notification.textContent = 'Link copied to clipboard!'
      document.body.appendChild(notification)
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 2000)
    }
  }

  // Activity icons mapping with available icons
  const activityIcons = {
    hiking: Mountain,
    trekking: Mountain,
    photography: Camera,
    dining: Utensils,
    shopping: ShoppingBag,
    sightseeing: Eye,
    wildlife: Trees,
    adventure: Activity,
    cultural: Palette,
    nature: Trees,
    default: Activity
  }

  // Get icon for activity type
  const getActivityIcon = (activityType) => {
    const type = activityType?.toLowerCase() || 'default'
    return activityIcons[type] || activityIcons.default
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Hero Gallery Section */}
      <section className="relative h-[60vh] min-h-[400px] sm:h-[70vh] sm:min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <motion.div
          key={activeImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={dest.images[activeImageIndex]}
            alt={dest.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </motion.div>

        {/* Compact Hero Weather Badge */}
        <HeroWeatherBadge destination={dest} />

        {/* Navigation Arrows */}
        {dest.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs sm:text-sm z-20">
          {activeImageIndex + 1} / {dest.images.length}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex gap-2 z-20">
          {/* Favorite Button */}
          <motion.button
            onClick={toggleFavorite}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md border transition-all duration-300 flex items-center justify-center ${
              isFavorite
                ? 'bg-red-500/20 border-red-500/30 text-red-500'
                : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                isFavorite ? 'fill-current' : ''
              }`}
            />
          </motion.button>

          <motion.button
            onClick={shareDestination}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Share destination"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          <motion.button
            onClick={() => setIsGalleryOpen(true)}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open gallery"
          >
            <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              {dest.category.map((cat, index) => (
                <motion.span
                  key={cat}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium"
                >
                  {cat}
                </motion.span>
              ))}
            </div>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">{dest.name}</h1>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{dest.region}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                <span>{dest.rating} • {dest.visitors.toLocaleString()}+ visitors</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Best: {dest.bestTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expandable Weather Widget Section */}
      <section className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <ExpandableWeather destination={dest} />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-3 sm:px-4 -mt-6 sm:-mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          <ModernCard variant="glass" className="text-center p-4 sm:p-6 backdrop-blur-xl">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mx-auto mb-2 sm:mb-3" />
            <div className="text-xl sm:text-2xl font-bold">{dest.rating}/5</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Rating</div>
          </ModernCard>
          
          <ModernCard variant="glass" className="text-center p-4 sm:p-6 backdrop-blur-xl">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2 sm:mb-3" />
            <div className="text-xl sm:text-2xl font-bold">{(dest.visitors / 1000).toFixed(1)}k</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Visitors/Year</div>
          </ModernCard>
          
          <ModernCard variant="glass" className="text-center p-4 sm:p-6 backdrop-blur-xl">
            <Hotel className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mx-auto mb-2 sm:mb-3" />
            <div className="text-xl sm:text-2xl font-bold">{dest.hotels?.length || 0}+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Hotels</div>
          </ModernCard>
          
          <ModernCard variant="glass" className="text-center p-4 sm:p-6 backdrop-blur-xl">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mx-auto mb-2 sm:mb-3" />
            <div className="text-xl sm:text-2xl font-bold">{dest.bestTime}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Best Time</div>
          </ModernCard>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex space-x-1 rounded-xl sm:rounded-2xl bg-muted p-1">
                {['overview', 'activities', 'gallery', 'videos'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && (
                  <ModernCard className="overflow-hidden">
                    <div className="p-4 sm:p-6 md:p-8">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">About {dest.name}</h2>
                      <div className="prose prose-sm sm:prose-lg max-w-none">
                        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground mb-4 sm:mb-6">
                          {dest.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                          <div>
                            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">Highlights</h3>
                            <ul className="space-y-1 sm:space-y-2">
                              {dest.highlights?.map((highlight, index) => (
                                <li key={index} className="flex items-center gap-2 sm:gap-3">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0"></div>
                                  <span className="text-sm sm:text-base">{highlight}</span>
                                </li>
                              )) || [
                                "Stunning natural beauty",
                                "Rich cultural heritage",
                                "Photography opportunities",
                                "Adventure activities"
                              ].map((highlight, index) => (
                                <li key={index} className="flex items-center gap-2 sm:gap-3">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0"></div>
                                  <span className="text-sm sm:text-base">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">Travel Tips</h3>
                            <ul className="space-y-1 sm:space-y-2">
                              <li className="flex items-center gap-2 sm:gap-3">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm sm:text-base">Best visited during {dest.bestTime}</span>
                              </li>
                              <li className="flex items-center gap-2 sm:gap-3">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm sm:text-base">Carry water and sun protection</span>
                              </li>
                              <li className="flex items-center gap-2 sm:gap-3">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm sm:text-base">Wear comfortable walking shoes</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ModernCard>
                )}

                {activeTab === 'activities' && (
                  <ModernCard className="overflow-hidden">
                    <div className="p-4 sm:p-6 md:p-8">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Things to Do</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {(dest.activities && dest.activities.length > 0) ? (
                          dest.activities.map((activity, index) => {
                            const ActivityIcon = getActivityIcon(activity.type)
                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 group"
                              >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                  <ActivityIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {activity.name}
                                  </h3>
                                  <p className="text-muted-foreground mb-2 sm:mb-3 leading-relaxed text-sm sm:text-base line-clamp-2">
                                    {activity.description}
                                  </p>
                                  <div className="flex flex-wrap gap-1 sm:gap-2">
                                    {activity.duration && (
                                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                        <Clock className="w-3 h-3" />
                                        {activity.duration}
                                      </span>
                                    )}
                                    {activity.difficulty && (
                                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        activity.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                        activity.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                      }`}>
                                        {activity.difficulty}
                                      </span>
                                    )}
                                    {activity.priceRange && (
                                      <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                        {activity.priceRange}
                                      </span>
                                    )}
                                  </div>
                                  {activity.tips && (
                                    <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-muted rounded-lg">
                                      <p className="text-xs sm:text-sm text-muted-foreground">
                                        <strong>Tip:</strong> {activity.tips}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )
                          })
                        ) : (
                          <div className="col-span-2 text-center py-6 sm:py-8">
                            <Activity className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">No Activities Listed</h3>
                            <p className="text-muted-foreground text-sm sm:text-base">
                              Activity information for {dest.name} is coming soon.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </ModernCard>
                )}

                {activeTab === 'gallery' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {dest.images.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer"
                        onClick={() => {
                          setActiveImageIndex(index)
                          setIsGalleryOpen(true)
                        }}
                      >
                        <img
                          src={image}
                          alt={`${dest.name} ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'videos' && (
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {dest.videos && dest.videos.length > 0 ? (
                      dest.videos.map((video, index) => (
                        <ModernCard key={index} className="overflow-hidden">
                          <div className="p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                              Video {index + 1}
                            </h3>
                            <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-black">
                              <ReactPlayer
                                ref={videoRef}
                                url={video}
                                width="100%"
                                height="100%"
                                controls
                                playing={false}
                                light={true}
                                playIcon={
                                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white" />
                                  </div>
                                }
                              />
                            </div>
                          </div>
                        </ModernCard>
                      ))
                    ) : (
                      <ModernCard className="text-center py-8 sm:py-12">
                        <Play className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">No Videos Available</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Video content for {dest.name} is coming soon.
                        </p>
                      </ModernCard>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 sm:space-y-6">
            {/* Hotels */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <ModernCard>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <Hotel className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    <h2 className="text-xl sm:text-2xl font-semibold">Where to Stay</h2>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {dest.hotels && dest.hotels.length > 0 ? (
                      dest.hotels.map((hotel, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.01 }}
                          className="p-3 sm:p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-base sm:text-lg line-clamp-1">{hotel.name}</h3>
                            <div className="flex items-center gap-1 text-xs sm:text-sm bg-muted px-2 py-1 rounded-full flex-shrink-0 ml-2">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{hotel.rating}</span>
                            </div>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                            {hotel.priceRange} • {['Luxury', 'Comfort', 'Budget'][index] || 'Comfort'}
                          </div>
                          <div className="flex gap-2 sm:gap-3">
                            <a
                              href={`tel:${hotel.contact}`}
                              className="flex-1 text-center py-2 px-2 sm:px-3 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors"
                            >
                              Call
                            </a>
                            <a
                              href={hotel.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center py-2 px-2 sm:px-3 border border-border rounded-lg text-xs sm:text-sm font-medium hover:bg-muted transition-colors"
                            >
                              Website
                            </a>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-4 sm:py-6">
                        <Hotel className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-2 sm:mb-3" />
                        <p className="text-muted-foreground text-sm">No hotel information available</p>
                      </div>
                    )}
                  </div>
                </div>
              </ModernCard>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <ModernCard className="overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    <h2 className="text-xl sm:text-2xl font-semibold">Location</h2>
                  </div>
                  <div className="rounded-xl overflow-hidden h-48 sm:h-64 border border-border">
                    <MapContainer
                      center={[dest.location.lat, dest.location.lng]}
                      zoom={11}
                      style={{ height: '100%', width: '100%' }}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[dest.location.lat, dest.location.lng]}>
                        <Popup>
                          <div className="text-center">
                            <strong className="text-sm">{dest.name}</strong>
                            <br />
                            <span className="text-xs">{dest.region}</span>
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                  <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground text-center">
                    {dest.region} Province
                  </div>
                </div>
              </ModernCard>
            </motion.div>

            {/* Best Time to Visit */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <ModernCard variant="glass">
                <div className="p-4 sm:p-6">
                  <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Best Time to Visit</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm">January - April</span>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm">May - August</span>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm">September - December</span>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-primary/10 rounded-lg text-xs sm:text-sm">
                    <strong>Tip:</strong> {dest.bestTime} offers the best weather conditions.
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setIsGalleryOpen(false)}
          >
            <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Close gallery"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Navigation Arrows */}
              {dest.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              {/* Main Image */}
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={dest.images[activeImageIndex]}
                alt={dest.name}
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Image Counter */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs sm:text-sm">
                {activeImageIndex + 1} / {dest.images.length}
              </div>

              {/* Thumbnail Strip */}
              <div className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                {dest.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveImageIndex(index)
                    }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === activeImageIndex 
                        ? 'bg-white' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
