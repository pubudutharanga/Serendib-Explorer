// src/pages/Favorites.jsx - FIXED with Light Blue Theme
import React from 'react'
import { Link } from 'react-router-dom'
import data from '../data/destinations.json'
import useLocalStorage from '../hooks/useLocalStorage'
import { ModernCard } from '../components/ui/ModernCard'
import { ModernButton } from '../components/ui/ModernButton'
import { motion } from 'framer-motion'
import { MapPin, Star, Users, Heart, Compass } from 'lucide-react'

export default function Favorites() {
  const [favorites] = useLocalStorage('favorites', [])
  
  console.log('Favorites from localStorage:', favorites)
  console.log('All destinations:', data.destinations)

  const favDests = data.destinations.filter(d => favorites.includes(d.id))

  console.log('Filtered favorite destinations:', favDests)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-blue mb-4">
            Your Favorites
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Your saved destinations in Sri Lanka
          </p>
        </motion.div>

        {favDests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-slate-800">No favorites yet</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Start exploring destinations and add them to your favorites by clicking the heart icon.
            </p>
            <Link to="/">
              <ModernButton size="lg">
                <Compass className="w-5 h-5" />
                Explore Destinations
              </ModernButton>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {favDests.map((dest, index) => (
              <motion.div
                key={dest.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <ModernDestinationCard dest={dest} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Fixed Modern Destination Card Component
function ModernDestinationCard({ dest }) {
  return (
    <ModernCard variant="interactive" className="h-full">
      <Link to={`/dest/${dest.id}`} className="block h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <motion.img
            src={dest.images[0]}
            alt={dest.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{dest.rating}</span>
          </div>

          {/* Favorite Badge */}
          <div className="absolute top-3 left-3">
            <div className="px-2 py-1 rounded-full bg-red-500/90 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
              <Heart className="w-3 h-3 fill-white" />
              <span>Favorite</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-semibold text-xl mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors text-slate-800">
            {dest.name}
          </h3>
          
          <div className="flex items-center text-sm text-slate-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{dest.region}</span>
          </div>

          <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">
            {dest.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">
                  {dest.visitors >= 1000 
                    ? `${(dest.visitors / 1000).toFixed(1)}k` 
                    : dest.visitors
                  }
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-600">Best:</span>
                <span className="font-medium text-blue-600">{dest.bestTime}</span>
              </div>
            </div>
            
            <motion.div
              className="text-blue-600 font-semibold flex items-center gap-1"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              View
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </motion.div>
          </div>
        </div>
      </Link>
    </ModernCard>
  )
}