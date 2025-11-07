// src/components/FeaturedDestinations.jsx - Light Blue Theme
import React from 'react'
import { Link } from 'react-router-dom'
import data from '../data/destinations.json'
import { ModernCard } from './ui/ModernCard'
import { ModernButton } from './ui/ModernButton'
import { motion } from 'framer-motion'
import { Star, Users, MapPin, ArrowRight, Award } from 'lucide-react'

export default function FeaturedDestinations() {
  const featuredDestinations = data.destinations.slice(0, 3)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 border border-blue-200">
            <Award className="w-4 h-4" />
            Iconic Destinations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Must-Visit <span className="text-gradient-blue">Places</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover the most iconic and breathtaking destinations that make Sri Lanka truly special
          </p>
        </motion.div>

        {/* Featured Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredDestinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              variants={item}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <ModernCard variant="interactive" className="h-full">
                <Link to={`/dest/${dest.id}`} className="block h-full">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={dest.images[0]}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      whileHover={{ scale: 1.05 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Premium Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        Iconic
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{dest.rating}</span>
                    </div>

                    {/* Location */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{dest.region}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors text-slate-800">
                      {dest.name}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-600">
                            {(dest.visitors / 1000).toFixed(1)}k visitors
                          </span>
                        </div>
                      </div>
                      
                      <motion.div
                        className="text-blue-600 font-semibold flex items-center gap-1"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        Explore
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </ModernCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/trending">
            <ModernButton size="lg" className="min-w-[200px]">
              View All Trending Places
              <ArrowRight className="w-5 h-5 ml-2" />
            </ModernButton>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}