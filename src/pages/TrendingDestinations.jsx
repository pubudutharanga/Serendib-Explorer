// src/pages/TrendingDestinations.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import data from '../data/destinations.json';
import { ModernCard } from '../components/ui/ModernCard';
import { ModernButton } from '../components/ui/ModernButton';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, Users, TrendingUp, Clock } from 'lucide-react';
import { getCurrentMonth, getCurrentMonthName, parseBestTime } from '../utils/dateUtils';

export default function TrendingDestinations() {
  const currentMonth = getCurrentMonth();
  const currentMonthName = getCurrentMonthName();

  // Filter and score destinations based on current month
  const trendingDestinations = useMemo(() => {
    return data.destinations
      .map(dest => {
        const bestTime = parseBestTime(dest.bestTime);
        const isBestMonth = bestTime.months.includes(currentMonth);
        const isYearRound = bestTime.isYearRound;
        
        // Calculate score (0-100)
        let score = 0;
        
        // Base score for best month match
        if (isBestMonth) score += 60;
        if (isYearRound) score += 30;
        
        // Boost for high ratings
        score += (dest.rating - 3) * 10; // 4.5★ = +15 points
        
        // Small boost for popularity
        score += Math.min(dest.visitors / 50000, 10); // 500k visitors = +10 points
        
        return {
          ...dest,
          score,
          isBestMonth,
          isYearRound,
          matchType: isBestMonth ? 'perfect' : isYearRound ? 'good' : 'fair'
        };
      })
      .filter(dest => dest.score > 0) // Only include relevant destinations
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 9); // Top 9 destinations
  }, [currentMonth]);

  const getMatchBadge = (destination) => {
    if (destination.isBestMonth) {
      return {
        text: 'Perfect Time to Visit',
        color: 'from-green-500 to-emerald-500',
        icon: '⭐'
      };
    }
    if (destination.isYearRound) {
      return {
        text: 'Good Year-Round',
        color: 'from-blue-500 to-cyan-500', 
        icon: '📅'
      };
    }
    return {
      text: 'Fair Conditions',
      color: 'from-amber-500 to-orange-500',
      icon: '👍'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          
          
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-blue mb-4">
            Trending Destinations
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-blue-500" />
            <p className="text-xl text-slate-700 font-semibold">
              {currentMonthName} Recommendations
            </p>
          </div>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the best places to visit in Sri Lanka right now based on weather, seasons, and traveler preferences
          </p>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 sm:p-6 bg-white rounded-2xl shadow-lg border border-blue-100"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                Current Season: {currentMonthName}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                {trendingDestinations.length} perfect destinations
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <span className="text-xs text-slate-600">Perfect</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <span className="text-xs text-slate-600">Good</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <span className="text-xs text-slate-600">Fair</span>
            </div>
          </div>
        </motion.div>

        {/* Destinations Grid */}
        {trendingDestinations.length > 0 ? (
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
            {trendingDestinations.map((dest, index) => {
              const matchBadge = getMatchBadge(dest);
              
              return (
                <motion.div
                  key={dest.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TrendingDestinationCard 
                    destination={dest} 
                    matchBadge={matchBadge}
                    rank={index + 1}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
              <Calendar className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-slate-800">
              No Perfect Matches for {currentMonthName}
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Don't worry! Sri Lanka has amazing destinations year-round. 
              Check out all destinations for great options.
            </p>
            <Link to="/">
              <ModernButton size="lg">
                Explore All Destinations
              </ModernButton>
            </Link>
          </motion.div>
        )}

        {/* Enhanced Seasonal Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">
                        {currentMonthName} Travel Guide
                      </h3>
                      <p className="text-blue-100 text-sm">
                        Professional travel advice for optimal experiences
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {getSeasonalTips(currentMonth).map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                      >
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-blue-50 text-sm leading-relaxed flex-1">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center lg:text-right space-y-4">
                  <div className="inline-flex flex-col items-center lg:items-end gap-4">
                    <div className="w-20 h-20 md:w-32 md:h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mx-auto lg:mx-0">
                      <TrendingUp className="w-8 h-8 md:w-12 md:h-12 text-white" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-white font-semibold text-lg">
                        Optimal Travel Period
                      </p>
                      <div className="flex items-center justify-center lg:justify-end gap-2 text-blue-100 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Perfect conditions for exploration</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Weather Indicator */}
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center lg:justify-end gap-4 mt-6">
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                      <span className="text-sm">🌤️</span>
                      <span className="text-blue-50 text-sm">Mild & Pleasant</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                      <span className="text-sm">📷</span>
                      <span className="text-blue-50 text-sm">Photo Perfect</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20"
              >
                {[
                  { label: 'Weather', value: 'Ideal', icon: '☀️' },
                  { label: 'Crowds', value: 'Moderate', icon: '👥' },
                  { label: 'Prices', value: 'Reasonable', icon: '💰' },
                  { label: 'Experience', value: 'Premium', icon: '⭐' }
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-white font-semibold text-sm">{stat.value}</div>
                    <div className="text-blue-200 text-xs">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Enhanced getSeasonalTips function
function getSeasonalTips(month) {
  const tips = {
    1: [
      'Optimal conditions for west/south coast beach vacations',
      'Ideal weather for exploring cultural triangle sites',
      'Peak whale watching season in Mirissa and Kalpitiya',
      'Perfect for outdoor activities and temple visits'
    ],
    2: [
      'Excellent dry season for hiking and adventure sports',
      'Prime wildlife viewing in Yala and Udawalawe national parks',
      'Comfortable temperatures ideal for family travel',
      'Best photography conditions with clear skies'
    ],
    3: [
      'Superb conditions for hill country tea plantation tours',
      'Ideal for visiting ancient cities and archaeological sites',
      'Beginning of festival season with cultural events',
      'Perfect weather for train journeys through mountains'
    ],
    4: [
      'Experience traditional Sinhala & Tamil New Year celebrations',
      'Waterfalls at their most spectacular after initial rains',
      'Lush green landscapes perfect for nature photography',
      'Comfortable conditions for exploring coastal areas'
    ],
    5: [
      'Inter-monsoon period brings dramatic cloud formations',
      'Ideal for photography with dramatic lighting conditions',
      'Fewer crowds at popular UNESCO World Heritage sites',
      'Perfect temperatures for exploring historical monuments'
    ],
    6: [
      'East coast beaches like Arugam Bay at their prime',
      'Excellent surfing conditions with consistent waves',
      'Ideal for cultural tours with comfortable temperatures',
      'Great opportunity for authentic local experiences'
    ],
    7: [
      'Witness the spectacular Kandy Esala Perahera festival',
      'Perfect conditions for mountain region explorations',
      'Ideal for visiting ancient kingdoms and royal cities',
      'Comfortable weather for wildlife safaris and nature walks'
    ],
    8: [
      'Optimal wildlife spotting in national parks',
      'Comfortable climate across all regions for travel',
      'Perfect for family vacations and multi-generational trips',
      'Ideal conditions for beach and cultural combinations'
    ],
    9: [
      'Shoulder season offers excellent value and availability',
      'Perfect balance of beach weather and cultural exploration',
      'Beginning of pilgrimage season to sacred sites',
      'Ideal for both adventure and relaxation itineraries'
    ],
    10: [
      'Excellent conditions for outdoor activities and hiking',
      'National parks reopening with optimal wildlife viewing',
      'Perfect photography conditions with clear atmospheres',
      'Ideal for comprehensive island exploration tours'
    ],
    11: [
      'Transition to peak season with ideal weather conditions',
      'Perfect for beach holidays on southwest and southern coasts',
      'Excellent conditions for cultural site visits and photography',
      'Ideal time for combining multiple regions in one itinerary'
    ],
    12: [
      'Peak season conditions with optimal weather nationwide',
      'Perfect for festive celebrations and New Year travel',
      'Ideal for luxury beach resorts and family vacations',
      'Excellent conditions for wildlife safaris and eco-tourism'
    ]
  };
  
  return tips[month] || [
    'Favorable conditions for diverse travel experiences',
    'Opportunity for authentic cultural immersion',
    'Ideal for exploring both natural and historical attractions'
  ];
}

// Individual Destination Card Component
function TrendingDestinationCard({ destination, matchBadge, rank }) {
  return (
    <div className="relative group">
      {/* Ranking Badge - Outside the card to prevent clipping */}
      <div className="absolute -top-2 -left-2 z-20">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white">
          #{rank}
        </div>
      </div>
      
      <ModernCard variant="interactive" className="h-full">
        <Link to={`/dest/${destination.id}`} className="block h-full">
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-t-2xl">
            <motion.img
              src={destination.images[0]}
              alt={destination.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              whileHover={{ scale: 1.05 }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Match Badge */}
            <div className="absolute top-3 right-3">
              <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${matchBadge.color} text-white text-xs font-bold flex items-center gap-1 backdrop-blur-sm border border-white/20`}>
                <span className="text-[10px]">{matchBadge.icon}</span>
                <span className="hidden xs:inline">{matchBadge.text}</span>
                <span className="xs:hidden">Best</span>
              </div>
            </div>

            {/* Rating */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{destination.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-semibold text-xl mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors text-slate-800">
              {destination.name}
            </h3>
            
            <div className="flex items-center text-sm text-slate-600 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{destination.region}</span>
            </div>

            <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">
              {destination.description}
            </p>

            {/* Best Time Highlight */}
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg mb-4">
              <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-blue-700 truncate">Best Time</p>
                <p className="text-xs text-blue-600 truncate">{destination.bestTime}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600 hidden sm:inline">
                  {destination.visitors >= 1000 
                    ? `${(destination.visitors / 1000).toFixed(1)}k visitors`
                    : `${destination.visitors} visitors`
                  }
                </span>
                <span className="text-slate-600 sm:hidden">
                  {destination.visitors >= 1000 
                    ? `${(destination.visitors / 1000).toFixed(1)}k`
                    : destination.visitors
                  }
                </span>
              </div>
              
              <motion.div
                className="text-blue-600 font-semibold flex items-center gap-1"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="hidden sm:inline">Explore</span>
                <span className="sm:hidden">View</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </motion.div>
            </div>
          </div>
        </Link>
      </ModernCard>
    </div>
  );
}