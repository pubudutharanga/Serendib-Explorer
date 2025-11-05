// src/App.jsx - Premium Light Blue & White Theme
import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Heart, Star, Compass, Navigation } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import GoogleAnalytics from './components/GoogleAnalytics'

// Import components directly
import EnhancedNavigation from './components/EnhancedNavigation'
import SimpleDestinationGrid from './components/SimpleDestinationGrid'

// Lazy load heavy components
const ModernDestinationDetail = lazy(() => import('./pages/ModernDestinationDetail'))
const Favorites = lazy(() => import('./pages/Favorites'))
const ModernHero = lazy(() => import('./components/ModernHero'))
const FeaturedDestinations = lazy(() => import('./components/FeaturedDestinations'))
const ExperienceCategories = lazy(() => import('./components/ExperienceCategories'))

// Premium Loading component
function PremiumLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center glass-premium rounded-3xl p-12 border border-blue-100 shadow-2xl"
      >
        <motion.div
          className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-semibold text-slate-800"
        >
          Exploring Sri Lanka...
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-600 mt-2"
        >
          Loading beautiful destinations
        </motion.p>
      </motion.div>
    </div>
  )
}

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 text-slate-800">
      <GoogleAnalytics />
      <ScrollToTop />
      
      {/* Premium Enhanced Navigation */}
      <EnhancedNavigation />
      
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {/* Hero Section */}
                <Suspense fallback={
                  <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
                    <PremiumLoadingSpinner />
                  </div>
                }>
                  <ModernHero />
                </Suspense>
                
                {/* Featured Destinations */}
                <Suspense fallback={
                  <div className="py-32 bg-gradient-to-br from-blue-50/50 via-sky-50/50 to-cyan-50/50">
                    <PremiumLoadingSpinner />
                  </div>
                }>
                  <FeaturedDestinations />
                </Suspense>
                
                {/* Experience Categories */}
                <Suspense fallback={
                  <div className="py-32 bg-gradient-to-br from-sky-50/50 via-blue-50/50 to-cyan-50/50">
                    <PremiumLoadingSpinner />
                  </div>
                }>
                  <ExperienceCategories />
                </Suspense>
                
                {/* Simple Destination Grid */}
                <div id="explore-sri-lanka">
                  <SimpleDestinationGrid />
                </div>
              </>
            } 
          />
          
          <Route 
            path="/dest/:id" 
            element={
              <Suspense fallback={<PremiumLoadingSpinner />}>
                <ModernDestinationDetail />
              </Suspense>
            } 
          />
          
          <Route 
            path="/favorites" 
            element={
              <Suspense fallback={<PremiumLoadingSpinner />}>
                <Favorites />
              </Suspense>
            } 
          />

          {/* Trending Route */}
          <Route 
            path="/trending" 
            element={
              <Suspense fallback={<PremiumLoadingSpinner />}>
                <SimpleDestinationGrid 
                  title="Trending Destinations" 
                  subtitle="Most popular places in Sri Lanka right now"
                />
              </Suspense>
            } 
          />
        </Routes>
      </main>

      {/* Premium Glassmorphism Footer */}
      <footer className="relative overflow-hidden bg-white/80 backdrop-blur-xl border-t border-blue-100">
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
              {/* Brand Section - Replaced with 2:1 aspect ratio image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* 2:1 Aspect Ratio Image Container */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full aspect-[2/1] rounded-2xl overflow-hidden border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <img 
                    src="./assets/footer.jpg" 
                    alt="Serendib Explorer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold text-lg">Serendib Explorer</p>
                      <p className="text-sm opacity-90">Discover Sri Lanka</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Optional description below the image */}
                <p className="text-slate-600 leading-relaxed text-center">
                  Experience the warm smiles of island hospitality, savor aromatic spices that changed world history, and journey through eight UNESCO World Heritage sites in one extraordinary destination.
                </p>
              </motion.div>

              {/* Explore Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="font-bold text-xl mb-6 text-slate-800 flex items-center gap-3">
                  <Compass className="w-5 h-5 text-blue-500" />
                  Explore
                </h4>
                <ul className="space-y-3">
                  {[
                    { 
                      name: 'Destinations', 
                      path: '/#explore-sri-lanka',
                      scroll: true 
                    },
                    { name: 'Trending', path: '/trending' },
                    { name: 'Favorites', path: '/favorites' },
                    { 
                      name: 'Travel Guides', 
                      path: 'https://www.srilanka.travel/travel-guide',
                      external: true 
                    }
                  ].map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.external ? (
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 group"
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          {item.name}
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : item.scroll ? (
                        <a
                          href={item.path}
                          onClick={(e) => {
  e.preventDefault();
  const base = import.meta.env.BASE_URL || '/';
  // Normalize both sides for comparison (ensure trailing slash)
  const currentPath = window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/';
  const baseNormalized = base.endsWith('/') ? base : base + '/';

  if (currentPath === baseNormalized) {
    // We're already on the home route (respecting basename)
    const element = document.getElementById('explore-sri-lanka');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  } else {
    // navigate to home with hash so the page opens and scrolls
    // Use BASE_URL to build correct path on GitHub Pages
    const target = (base === '/' ? '/' : base) + '#explore-sri-lanka';
    window.location.href = target;
  }
}}

                          className="text-slate-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          to={item.path}
                          className="text-slate-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 group"
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          {item.name}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Connect Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="font-bold text-xl mb-6 text-slate-800">Connect With Me</h4>
                <div className="flex gap-3 mb-6">
                  {[
                    { 
                      name: 'Facebook', 
                      color: 'bg-blue-500 hover:bg-blue-600', 
                      icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      ),
                      url: 'https://web.facebook.com/PubuduTharange'
                    },
                    { 
                      name: 'LinkedIn', 
                      color: 'bg-blue-700 hover:bg-blue-800', 
                      icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      ),
                      url: 'https://www.linkedin.com/in/pubudutharanga/'
                    },
                    { 
                      name: 'GitHub', 
                      color: 'bg-gray-800 hover:bg-gray-900', 
                      icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      ),
                      url: 'https://github.com/pubudutharanga'
                    }
                  ].map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      aria-label={`Visit ${social.name}`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
                
                {/* Professional Info */}
                <div className="glass rounded-xl p-4 border border-blue-100">
                  <p className="text-slate-600 text-sm mb-2">
                    Developed by Pubudu Tharanga
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>React</span>
                    <span>•</span>
                    <span>Tailwind CSS</span>
                    <span>•</span>
                    <span>Framer Motion</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="pt-8 border-t border-blue-100 text-center"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <p className="text-slate-600">
                  © {new Date().getFullYear()} Serendib Explorer
                </p>
                <div className="flex items-center gap-4 text-slate-500 text-sm">
                  <span></span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg border border-white flex items-center justify-center text-white"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Navigation className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  )
}