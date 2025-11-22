// src/components/ModernHero.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ModernButton } from './ui/ModernButton'
import { Compass, MapPin, Leaf, Trees, Mountain, Sun, Cloud, Star, Map } from 'lucide-react'

// Local background file names (relative to the Vite base/public root)
const bgPaths = [
  
  'assets/images/hero-backgrounds/sigiriya.webp',
  'assets/images/hero-backgrounds/ella.webp',
  'assets/images/hero-backgrounds/hiriketiya2.jpeg',
  'assets/images/hero-backgrounds/colombo.webp',
  'assets/images/hero-backgrounds/ambuluwawa.webp',
  'assets/images/hero-backgrounds/ruwanwalimahasaya.webp',
  'assets/images/hero-backgrounds/palace.webp',
  'assets/images/hero-backgrounds/dabulla.png',
  'assets/images/hero-backgrounds/elephants.webp',
  'assets/images/hero-backgrounds/galle.png',
  'assets/images/hero-backgrounds/polhena.webp',
  'assets/images/hero-backgrounds/mirissa2.jpeg',
  'assets/images/hero-backgrounds/mirissa.webp',
  'assets/images/hero-backgrounds/hiriketiya.webp',
  'assets/images/hero-backgrounds/nuwara.png',
  'assets/images/hero-backgrounds/jaffna.png',
  'assets/images/hero-backgrounds/mask.webp'
]

// Fallback URLs
const fallbackBackgrounds = [
  'https://images.unsplash.com/photo-1598890777033-351b315d82c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1588666309993-5c258b263e23?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1558349694-9bc53c0a4b84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1574362849222-93a8655b6ce5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1573790387438-4da905039392?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
]

// Icon components array
const iconComponents = [Leaf, Mountain, Cloud, Star, Map, Trees]

export default function ModernHero() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [activeBackgrounds, setActiveBackgrounds] = useState([])

  // Load images directly without HEAD requests
  useEffect(() => {
    const base = import.meta.env.BASE_URL ?? './'
    
    // Create URLs for local images
    const localUrls = bgPaths.map(p => {
      if (base.endsWith('/')) return base + p
      return base + p
    })

    // Start with local URLs, will be replaced with fallbacks if they fail to load
    setActiveBackgrounds(localUrls)
    
    let firstImageLoaded = false

    // Load all images directly
    localUrls.forEach((src, index) => {
      const img = new Image()
      img.onload = () => {
        // Set loaded state after first image loads
        if (!firstImageLoaded) {
          setImagesLoaded(true)
          firstImageLoaded = true
        }
      }
      img.onerror = () => {
        // Replace failed image with fallback
        setActiveBackgrounds(prev => {
          const updated = [...prev]
          updated[index] = fallbackBackgrounds[index % fallbackBackgrounds.length]
          return updated
        })
        
        // Set loaded state after first image (even if it's a fallback)
        if (!firstImageLoaded) {
          setImagesLoaded(true)
          firstImageLoaded = true
        }
      }
      img.src = src
    })
  }, [])

  // Auto-advance backgrounds
  useEffect(() => {
    if (!imagesLoaded || activeBackgrounds.length === 0) return

    const interval = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % activeBackgrounds.length)
    }, 5000)

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
        ease: 'easeInOut'
      }
    }
  }

  // Guard: if not yet ready, render a minimal hero to avoid errors
  if (!imagesLoaded || activeBackgrounds.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white/80">Loading…</div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      {/* Dynamic Background Images - FIXED FOR MOBILE */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={currentBgIndex}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${activeBackgrounds[currentBgIndex]})`,
              // Mobile: Show more of the image, Desktop: Crop as needed
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            {/* Enhanced gradient overlays for better mobile visibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-800/50 to-cyan-900/60 md:from-slate-900/60 md:via-blue-800/40 md:to-cyan-900/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:from-black/50" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200/10 via-transparent to-blue-200/10" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reduced animation elements - from 38 to 10 total */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Reduced particles from 30 to 4 - hidden on mobile */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300/30 rounded-full hidden xs:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Reduced gradient lines from 3 to 1 - hidden on mobile */}
        <motion.div
          className="absolute top-0 h-full w-px bg-gradient-to-b from-cyan-200/15 via-cyan-100/10 to-transparent hidden md:block"
          style={{ left: '50%' }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Reduced icons from 8 to 5 - hidden on mobile */}
        {[...Array(5)].map((_, i) => {
          const IconComponent = iconComponents[i % iconComponents.length]
          return (
            <motion.div
              key={i}
              className="absolute text-cyan-300/20 hidden sm:block"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            >
              <IconComponent size={20} />
            </motion.div>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <div className="space-y-6 lg:space-y-8 max-w-3xl w-full">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 mx-auto"
            >
              <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                <Compass className="w-4 h-4 text-cyan-300" />
              </motion.div>
              <span className="text-sm font-medium text-white/90">Welcome to Paradise Island</span>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Discover Hidden Gems
                <span className="block bg-gradient-to-r from-cyan-200 via-blue-200 to-sky-200 bg-clip-text text-transparent mt-2">In Sri Lanka</span>
                <div className="flex items-center justify-center gap-3 mt-3 lg:mt-4">
                  <span className="text-white/70 text-base sm:text-lg font-normal">Pearl of the Indian Ocean</span>
                </div>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed font-light px-2 sm:px-0 max-w-2xl mx-auto">
                Uncover ancient secrets, pristine landscapes, and cultural treasures in the heart of the Indian Ocean.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 lg:pt-6 justify-center">
              <Link to="/trending" className="group w-full sm:w-auto">
                <ModernButton size="lg" className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto min-w-[200px] justify-center">
                  <Compass className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-500" />
                  Explore Destinations
                </ModernButton>
              </Link>

              <button
                onClick={() => document.getElementById('explore-sri-lanka')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 backdrop-blur-lg transition-all duration-300 group w-full sm:w-auto"
              >
                View All Places
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 pt-6 lg:pt-8">
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
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group" 
                  whileHover={{ scale: 1.02, y: -2 }} 
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-white/80 text-xs sm:text-sm font-medium truncate">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  )
}
