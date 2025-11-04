// src/components/ModernHero.jsx - UPDATED
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ModernButton } from './ui/ModernButton'
import { Compass, MapPin, Leaf, Trees, Mountain, Sun, Cloud, Bird, Star, Map } from 'lucide-react'

// Local background images from public folder
const localBackgrounds = [
  './assets/images/hero-backgrounds/colombo.jpg',
  './assets/images/hero-backgrounds/ella.jpg', 
  './assets/images/hero-backgrounds/sigiriya.jpg',
  './assets/images/hero-backgrounds/ruwanwalimahasaya.jpg',
  './assets/images/hero-backgrounds/elephants.jpg',
  './assets/images/hero-backgrounds/galle.jpg',
  './assets/images/hero-backgrounds/polhena.jpg',
  './assets/images/hero-backgrounds/mirissa.jpg',
  './assets/images/hero-backgrounds/mask.jpg',
  './assets/images/hero-backgrounds/beach.jpg'
]

// Fallback images in case local images are not available
const fallbackBackgrounds = [
  'https://images.unsplash.com/photo-1598890777033-351b315d82c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1588666309993-5c258b263e23?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1558349694-9bc53c0a4b84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1574362849222-93a8655b6ce5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1573790387438-4da905039392?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
]

// Icon components array
const iconComponents = [Leaf, Mountain, Cloud, Star, Map, Trees]

export default function PremiumNatureHero() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [activeBackgrounds, setActiveBackgrounds] = useState(localBackgrounds)
  
  // Check if local images exist, fallback to URLs if not
  useEffect(() => {
    const checkLocalImages = async () => {
      const availableImages = []
      
      for (const src of localBackgrounds) {
        try {
          const response = await fetch(src, { method: 'HEAD' })
          if (response.ok) {
            availableImages.push(src)
          } else {
            availableImages.push(fallbackBackgrounds[localBackgrounds.indexOf(src)])
          }
        } catch (error) {
          availableImages.push(fallbackBackgrounds[localBackgrounds.indexOf(src)])
        }
      }
      
      setActiveBackgrounds(availableImages)
      
      // Preload images
      let loadedCount = 0
      availableImages.forEach(src => {
        const img = new Image()
        img.onload = () => {
          loadedCount++
          if (loadedCount === availableImages.length) setImagesLoaded(true)
        }
        img.onerror = () => {
          loadedCount++
          if (loadedCount === availableImages.length) setImagesLoaded(true)
        }
        img.src = src
      })
    }
    
    checkLocalImages()
  }, [])

  // Auto-advance backgrounds
  useEffect(() => {
    if (!imagesLoaded) return
    
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % activeBackgrounds.length)
    }, 6000)
    
    return () => clearInterval(interval)
  }, [imagesLoaded, activeBackgrounds.length])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 1.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const floatVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      {/* Dynamic Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={currentBgIndex}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${activeBackgrounds[currentBgIndex]})`
            }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-800/40 to-cyan-900/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Subtle Light Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200/5 via-transparent to-blue-200/5" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Subtle Light Rays */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 h-full w-px bg-gradient-to-b from-cyan-200/15 via-cyan-100/10 to-transparent"
              style={{
                left: `${25 + i * 25}%`,
              }}
              animate={{
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 1.5,
              }}
            />
          ))}
        </div>

        {/* Floating Icons */}
        {[...Array(8)].map((_, i) => {
          const IconComponent = iconComponents[i % iconComponents.length];
          return (
            <motion.div
              key={i}
              className="absolute text-cyan-300/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <IconComponent size={20} />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="space-y-8">
            {/* Welcome Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Compass className="w-4 h-4 text-cyan-300" />
              </motion.div>
              <span className="text-sm font-medium text-white/90">
                Welcome to Paradise Island
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Discover Hidden Gems
                <span className="block bg-gradient-to-r from-cyan-200 via-blue-200 to-sky-200 bg-clip-text text-transparent mt-2">
                  In Sri Lanka
                </span>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-white/70 text-lg font-normal">Pearl of the Indian Ocean</span>
                </div>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl font-light">
                Uncover ancient secrets, pristine landscapes, and cultural treasures in the heart of the Indian Ocean.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <Link to="/trending" className="group">
                <ModernButton 
                  size="lg" 
                  className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[200px]"
                >
                  <Compass className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-500" />
                  Explore Destinations
                </ModernButton>
              </Link>
              
              <button
                onClick={() => document.getElementById('explore-sri-lanka')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 backdrop-blur-lg transition-all duration-300 group"
              >
                View All Places
              </button>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-8"
            >
              {[
                { icon: Trees, label: 'Wildlife', color: 'text-green-400' },
                { icon: Mountain, label: 'Adventure', color: 'text-amber-400' },
                { icon: Sun, label: 'Beaches', color: 'text-cyan-400' },
                { icon: Map, label: 'Culture', color: 'text-purple-400' },
                { icon: Leaf, label: 'Nature', color: 'text-emerald-400' },
                { icon: Star, label: 'Heritage', color: 'text-yellow-400' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-white/80 text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Interactive Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 gap-4 relative"
          >
            {/* Main Featured Card */}
            <motion.div
              variants={floatVariants}
              animate="float"
              className="col-span-2 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden"
              whileHover={{ 
                y: -4,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 opacity-50" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center">
                    <Star className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Sigiriya Rock</h3>
                    <p className="text-white/60 text-sm">Ancient Rock Fortress</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  UNESCO World Heritage site with ancient palace ruins and breathtaking views.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-cyan-300 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>Central Province</span>
                  </div>
                  <div className="text-white/60 text-sm">★ 4.8</div>
                </div>
              </div>
            </motion.div>

            {/* Secondary Cards */}
            <motion.div
              variants={floatVariants}
              animate="float"
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-4 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer overflow-hidden"
              whileHover={{ 
                y: -2,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-sky-500/10 opacity-50" />
              <div className="relative z-10 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500/20 to-sky-500/20 border border-blue-400/30 flex items-center justify-center">
                  <Mountain className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Ella</h4>
                  <p className="text-white/60 text-xs">Mountain Views</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={floatVariants}
              animate="float"
              transition={{ delay: 1 }}
              className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-4 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer overflow-hidden"
              whileHover={{ 
                y: -2,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-cyan-500/10 opacity-50" />
              <div className="relative z-10 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-sky-500/20 to-cyan-500/20 border border-sky-400/30 flex items-center justify-center">
                  <Cloud className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Galle</h4>
                  <p className="text-white/60 text-xs">Coastal Heritage</p>
                </div>
              </div>
            </motion.div>

            {/* Background Glow Effects */}
            <div className="absolute -inset-4 -z-10">
              <motion.div
                className="absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  )
}