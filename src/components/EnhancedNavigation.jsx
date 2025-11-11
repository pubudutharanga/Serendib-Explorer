// src/components/EnhancedNavigation.jsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Menu, 
  X,
  Home,
  TrendingUp,
  Compass
} from 'lucide-react'
import { Brain } from 'lucide-react';

export default function EnhancedNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Handle scroll effect - make header visible immediately
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    // Check initial scroll position
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Trending', path: '/trending', icon: TrendingUp },
    { name: 'Explore', path: '/#explore-sri-lanka', icon: Compass, scroll: true },
    { name: 'Favorites', path: '/favorites', icon: Heart },
     {
  name: 'AI Assistant', 
  path: '/ai-assistant', 
  icon: Brain,
  description: 'Smart travel guidance'
},
  ]

  const scrollToExplore = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('explore-sri-lanka')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate('/')
      // Scroll after a short delay to allow page load
      setTimeout(() => {
        const element = document.getElementById('explore-sri-lanka')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    }
  }

  // Get correct base path for images
  const getImagePath = (imageName) => {
    const base = import.meta.env.BASE_URL || '/';
    return `${base}assets/${imageName}`;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        // FIX: Always use visible background and text colors
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-blue-100"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand */}
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link to="/" className="flex items-center gap-4 group">
                {/* Sri Lanka Flag JPG Container */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-blue-100 group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Sri Lanka Flag JPG - Fixed path */}
                    <motion.img
                      src={getImagePath("Sri-Lanka-logo.jpg")}
                      alt="Sri Lanka Flag"
                      className="w-10 h-10 relative z-10 object-cover rounded-lg"
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onError={(e) => {
                        console.log('Logo image failed to load:', e.target.src);
                        // Fallback to a simple div with background color
                        e.target.style.display = 'none';
                        e.target.parentElement.style.backgroundColor = '#1e40af';
                        e.target.parentElement.innerHTML = '<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg"></div>';
                      }}
                    />
                  </div>
                </motion.div>

                {/* Brand Text - FIX: Always use visible colors */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-2xl font-bold text-gradient-blue">
                    Serendib Explorer
                  </h1>
                  <p className="text-sm text-slate-600">
                    Discover Sri Lanka's Wonders
                  </p>
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Navigation Links */}
              <div className="flex items-center gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {item.scroll ? (
                      <button
                        onClick={scrollToExplore}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 group"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        <motion.div
                          className="h-0.5 rounded-full bg-blue-500"
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                          location.pathname === item.path
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        <motion.div
                          className="h-0.5 rounded-full bg-blue-500"
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button - FIX: Always use visible colors */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl text-slate-700 hover:bg-blue-50 transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white/95 backdrop-blur-xl z-50 lg:hidden border-l border-blue-100"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-lg border border-blue-100">
                      <img 
                        src={getImagePath("Sri-Lanka-logo.jpg")}
                        alt="Sri Lanka Logo"
                        className="w-10 h-10 object-cover rounded-lg"
                        onError={(e) => {
                          console.log('Mobile logo image failed to load:', e.target.src);
                          // Fallback
                          e.target.style.display = 'none';
                          e.target.parentElement.style.backgroundColor = '#1e40af';
                          e.target.parentElement.innerHTML = '<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg"></div>';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">Serendib Explorer</h3>
                      <p className="text-slate-600 text-sm">Discover Sri Lanka</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.scroll ? (
                        <button
                          onClick={() => {
                            scrollToExplore()
                            setIsMobileMenuOpen(false)
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-300 ${
                            location.pathname === item.path
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Horizontal Logo at Bottom */}
                <div className="pt-6 border-t border-slate-200">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center p-4 bg-white rounded-xl border border-blue-100"
                  >
                    <img 
                      src={getImagePath("text.png")}
                      alt="Serendib Explorer Logo"
                      className="h-12 object-contain"
                      onError={(e) => {
                        console.log('Horizontal logo image failed to load:', e.target.src);
                        // Fallback if horizontal logo doesn't exist
                        e.target.style.display = 'none';
                        const fallbackDiv = document.createElement('div');
                        fallbackDiv.className = 'flex items-center justify-center w-full h-12';
                        fallbackDiv.innerHTML = `
                          <div class="text-center">
                            <div class="font-bold text-lg text-blue-600">Serendib Explorer</div>
                            <div class="text-sm text-slate-600">Discover Sri Lanka</div>
                          </div>
                        `;
                        e.target.parentElement.appendChild(fallbackDiv);
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from being hidden under fixed nav */}
      <div className="h-20" />
    </>
  )
}