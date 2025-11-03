// src/components/SimpleDestinationGrid.jsx - Light Blue Theme
import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import data from '../data/destinations.json'
import { ModernCard } from './ui/ModernCard'
import { ModernButton } from './ui/ModernButton'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Star, Users, Navigation } from 'lucide-react'
import { trackSearch } from '../utils/analytics'

export default function SimpleDestinationGrid({ title = "Explore Sri Lanka", subtitle = "Discover breathtaking destinations across the beautiful island" }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDestinations = useMemo(() => {
    if (!searchQuery) return data.destinations

    const query = searchQuery.toLowerCase()
    return data.destinations.filter(dest => 
      dest.name.toLowerCase().includes(query) ||
      dest.region.toLowerCase().includes(query) ||
      (dest.description && dest.description.toLowerCase().includes(query)) ||
      dest.category.some(cat => cat.toLowerCase().includes(query))
    )

    // Track search
    if (searchQuery) {
      trackSearch(searchQuery, results.length)
    }

    return results
  }, [searchQuery])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50/50 via-sky-50/50 to-cyan-50/50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-blue mb-4">
            {title}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search destinations, regions, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg shadow-sm"
            />
          </div>
          
          {/* Results Count */}
          <div className="text-center mt-4">
            <p className="text-slate-600">
              {filteredDestinations.length} of {data.destinations.length} destinations
            </p>
          </div>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                variants={item}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ModernDestinationCard dest={dest} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredDestinations.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-slate-800">No destinations found</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              No destinations match your search for "<span className="font-semibold text-slate-800">{searchQuery}</span>". 
              Try different keywords or browse all destinations.
            </p>
            <ModernButton
              onClick={() => setSearchQuery('')}
            >
              View All Destinations
            </ModernButton>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Modern Destination Card Component
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

          {/* Category Tags */}
          <div className="absolute top-3 left-3 flex gap-1">
            {dest.category.slice(0, 2).map((cat, i) => (
              <motion.span
                key={cat}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium"
              >
                {cat}
              </motion.span>
            ))}
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
              Explore
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </motion.div>
          </div>
        </div>
      </Link>
    </ModernCard>
  )
}