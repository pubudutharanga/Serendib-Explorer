// src/pages/ModernDestinationDetail.jsx - FIXED with default export
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
  Navigation
} from 'lucide-react'
import { ModernCard } from '../components/ui/ModernCard'
import { ModernButton } from '../components/ui/ModernButton'
import useLocalStorage from '../hooks/useLocalStorage'

export default function ModernDestinationDetail() {
  const { id } = useParams()
  const dest = data.destinations.find(d => d.id === id)
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const videoRef = useRef(null)

  // Debug favorites
  console.log('🔄 ModernDestinationDetail - Current favorites:', favorites)
  console.log('🔄 ModernDestinationDetail - Current destination ID:', id)
  console.log('🔄 ModernDestinationDetail - Found destination:', dest)

  if (!dest) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
          <MapPin className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Destination Not Found</h2>
        <p className="text-muted-foreground mb-6">The destination you're looking for doesn't exist.</p>
        <Link to="/">
          <ModernButton>
            Back to Destinations
          </ModernButton>
        </Link>
      </motion.div>
    </div>
  )

  const isFavorite = favorites.includes(id)

  const toggleFavorite = () => {
    console.log('❤️ Toggling favorite for:', id)
    console.log('❤️ Current favorites before:', favorites)
    
    setFavorites(prev => {
      const newFavorites = isFavorite 
        ? prev.filter(f => f !== id)
        : [...prev, id]
      console.log('❤️ New favorites after toggle:', newFavorites)
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
      // Show toast notification
      alert('Link copied to clipboard!')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Hero Gallery Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
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

        {/* Navigation Arrows */}
        {dest.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-sm">
          {activeImageIndex + 1} / {dest.images.length}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          {/* Favorite Button */}
          <motion.button
            onClick={toggleFavorite}
            className={`w-12 h-12 rounded-full backdrop-blur-md border transition-all duration-300 flex items-center justify-center ${
              isFavorite
                ? 'bg-red-500/20 border-red-500/30 text-red-500'
                : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`w-6 h-6 transition-all duration-300 ${
                isFavorite ? 'fill-current' : ''
              }`}
            />
          </motion.button>

          <motion.button
            onClick={shareDestination}
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Share destination"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={() => setIsGalleryOpen(true)}
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open gallery"
          >
            <Maximize2 className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {dest.category.map((cat, index) => (
                <motion.span
                  key={cat}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium"
                >
                  {cat}
                </motion.span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{dest.name}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{dest.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{dest.rating} • {dest.visitors.toLocaleString()}+ visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Best time: {dest.bestTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <ModernCard variant="glass" className="text-center p-6 backdrop-blur-xl">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <div className="text-2xl font-bold">{dest.rating}/5</div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </ModernCard>
          
          <ModernCard variant="glass" className="text-center p-6 backdrop-blur-xl">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold">{(dest.visitors / 1000).toFixed(1)}k</div>
            <div className="text-sm text-muted-foreground">Visitors/Year</div>
          </ModernCard>
          
          <ModernCard variant="glass" className="text-center p-6 backdrop-blur-xl">
            <Hotel className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-bold">{dest.hotels?.length || 0}+</div>
            <div className="text-sm text-muted-foreground">Hotels</div>
          </ModernCard>
          
          <ModernCard variant="glass" className="text-center p-6 backdrop-blur-xl">
            <Clock className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <div className="text-2xl font-bold">{dest.bestTime}</div>
            <div className="text-sm text-muted-foreground">Best Time</div>
          </ModernCard>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex space-x-1 rounded-2xl bg-muted p-1">
                {['overview', 'gallery', 'videos', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
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
                    <div className="p-8">
                      <h2 className="text-3xl font-bold mb-6">About {dest.name}</h2>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                          {dest.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <h3 className="font-semibold mb-3">Highlights</h3>
                            <ul className="space-y-2">
                              {dest.highlights?.map((highlight, index) => (
                                <li key={index} className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span>{highlight}</span>
                                </li>
                              )) || [
                                "Stunning natural beauty",
                                "Rich cultural heritage",
                                "Photography opportunities",
                                "Adventure activities"
                              ].map((highlight, index) => (
                                <li key={index} className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-3">Travel Tips</h3>
                            <ul className="space-y-2">
                              <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Best visited during {dest.bestTime}</span>
                              </li>
                              <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Carry water and sun protection</span>
                              </li>
                              <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Wear comfortable walking shoes</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ModernCard>
                )}

                {activeTab === 'gallery' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {dest.images.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="aspect-square rounded-2xl overflow-hidden cursor-pointer"
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

                {activeTab === 'videos' && dest.videos?.length > 0 && (
                  <div className="grid grid-cols-1 gap-6">
                    {dest.videos.map((video, index) => (
                      <ModernCard key={index} className="overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-4">
                            Video {index + 1}
                          </h3>
                          <div className="aspect-video rounded-xl overflow-hidden bg-black">
                            <ReactPlayer
                              ref={videoRef}
                              url={video}
                              width="100%"
                              height="100%"
                              controls
                              playing={false}
                              light={true}
                              playIcon={
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                                  <Play className="w-8 h-8 text-white fill-white" />
                                </div>
                              }
                            />
                          </div>
                        </div>
                      </ModernCard>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <ModernCard>
                    <div className="p-8">
                      <h2 className="text-2xl font-bold mb-6">Visitor Reviews</h2>
                      <div className="space-y-6">
                        {[1, 2, 3].map((review) => (
                          <div key={review} className="pb-6 border-b last:border-0 last:pb-0">
                            <div className="flex items-center gap-4 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                                {['JS', 'AM', 'SR'][review - 1]}
                              </div>
                              <div>
                                <div className="font-semibold">{['John Smith', 'Anna Maria', 'Sam Rogers'][review - 1]}</div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span>5.0 • {['2 weeks', '1 month', '3 months'][review - 1]} ago</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {[
                                "Absolutely breathtaking! The views were worth every step. The local guides were knowledgeable and friendly.",
                                "A must-visit destination in Sri Lanka. The cultural significance combined with natural beauty is unparalleled.",
                                "Perfect family trip. Our kids loved the adventure and we appreciated the well-maintained facilities."
                              ][review - 1]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ModernCard>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Hotels */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <ModernCard>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Hotel className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold">Where to Stay</h2>
                  </div>
                  <div className="space-y-4">
                    {dest.hotels?.map((hotel, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">{hotel.name}</h3>
                          <div className="flex items-center gap-1 text-sm bg-muted px-2 py-1 rounded-full">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{hotel.rating}</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">
                          {hotel.priceRange} • {['Luxury', 'Comfort', 'Budget'][index] || 'Comfort'}
                        </div>
                        <div className="flex gap-3">
                          <a
                            href={`tel:${hotel.contact}`}
                            className="flex-1 text-center py-2 px-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                          >
                            Call
                          </a>
                          <a
                            href={hotel.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center py-2 px-3 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                          >
                            Website
                          </a>
                        </div>
                      </motion.div>
                    )) || (
                      <p className="text-muted-foreground text-center py-4">
                        No hotel information available
                      </p>
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
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Navigation className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold">Location</h2>
                  </div>
                  <div className="rounded-xl overflow-hidden h-64 border border-border">
                    <MapContainer
                      center={[dest.location.lat, dest.location.lng]}
                      zoom={12}
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
                            <strong>{dest.name}</strong>
                            <br />
                            {dest.region}
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground text-center">
                    {dest.region} Province
                  </div>
                </div>
              </ModernCard>
            </motion.div>

            {/* Weather & Best Time */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <ModernCard variant="glass">
                <div className="p-6">
                  <h3 className="font-semibold mb-4">Best Time to Visit</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">January - April</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">May - August</span>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">September - December</span>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg text-sm">
                    <strong>Tip:</strong> {dest.bestTime} offers the best weather conditions for visiting.
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
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setIsGalleryOpen(false)}
          >
            <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center p-4">
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {dest.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

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

              {/* Thumbnail Strip */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {dest.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveImageIndex(index)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeImageIndex 
                        ? 'bg-white' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
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
