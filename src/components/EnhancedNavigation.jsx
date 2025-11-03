// src/components/EnhancedNavigation.jsx - Light Blue Theme
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { MapPin, Menu, X, Compass, TrendingUp, Heart } from 'lucide-react'
import { ModernButton } from './ui/ModernButton'
import { motion, AnimatePresence } from 'framer-motion'

export default function EnhancedNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { path: '/', label: 'Discover', icon: Compass },
    { path: '/trending', label: 'Trending', icon: TrendingUp },
    { path: '/favorites', label: 'Favorites', icon: Heart },
  ]

  return (
    <motion.header 
      className="sticky top-0 z-50 glass-premium border-b border-blue-100 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            <div>
              <h1 className="font-bold text-2xl text-gradient-blue">
                Serendib Explorer
              </h1>
              <p className="text-slate-600 text-sm">Discover Sri Lanka</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 group flex items-center gap-3 ${
                    location.pathname === item.path
                      ? 'text-blue-600 bg-blue-50 shadow-sm'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute bottom-2 left-1/2 w-4 h-0.5 bg-blue-500 rounded-full -translate-x-1/2"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <ModernButton
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="text-slate-600 hover:text-blue-600"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </ModernButton>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 glass-premium border-b border-blue-100 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col gap-2">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          location.pathname === item.path
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}