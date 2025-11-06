// src/pages/CategoryPage.jsx
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data/destinations.json';
import { ModernCard } from '../components/ui/ModernCard';
import { ModernButton } from '../components/ui/ModernButton';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Users, Calendar, ArrowLeft, Filter, Mountain, Castle, Trees, Waves, Utensils, Camera } from 'lucide-react';

// Category configuration matching ExperienceCategories
const categoryConfig = {
  adventure: {
    title: 'Adventure',
    description: 'Hiking, climbing, and outdoor adventures',
    icon: Mountain,
    color: 'from-blue-500 to-cyan-500',
    count: '15+ destinations'
  },
  cultural: {
    title: 'Cultural', 
    description: 'Ancient sites and heritage locations',
    icon: Castle,
    color: 'from-amber-500 to-orange-500',
    count: '12+ destinations'
  },
  nature: {
    title: 'Nature',
    description: 'Forests, wildlife, and natural wonders',
    icon: Trees,
    color: 'from-green-500 to-emerald-500',
    count: '20+ destinations'
  },
  beaches: {
    title: 'Beaches',
    description: 'Coastal escapes and water activities',
    icon: Waves,
    color: 'from-cyan-500 to-blue-500',
    count: '8+ destinations'
  },
  culinary: {
    title: 'Culinary',
    description: 'Food tours and local cuisine experiences',
    icon: Utensils,
    color: 'from-red-500 to-pink-500',
    count: '6+ destinations'
  },
  photography: {
    title: 'Photography',
    description: 'Picture-perfect spots and scenic views',
    icon: Camera,
    color: 'from-purple-500 to-indigo-500',
    count: '18+ destinations'
  }
};

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const category = categoryConfig[categoryName];

  // If category doesn't exist, show error
  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Category Not Found</h1>
          <p className="text-slate-600 mb-6">The category you're looking for doesn't exist.</p>
          <Link to="/">
            <ModernButton>Back to Home</ModernButton>
          </Link>
        </div>
      </div>
    );
  }

  const CategoryIcon = category.icon;

  // Filter destinations by category and search
  const filteredDestinations = useMemo(() => {
    let filtered = data.destinations.filter(dest => 
      dest.category.some(cat => 
        cat.toLowerCase() === categoryName.toLowerCase()
      )
    );

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(query) ||
        dest.region.toLowerCase().includes(query) ||
        dest.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'visitors':
          return b.visitors - a.visitors;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [categoryName, searchQuery, sortBy]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      {/* Header Section */}
      <section className="relative py-16 bg-gradient-to-r from-white to-blue-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            {/* Back Button */}
            <div className="flex justify-start mb-6">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>

            {/* Category Icon & Title */}
            <div className="flex flex-col items-center mb-6">
              <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                <CategoryIcon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gradient-blue mb-4">
                {category.title}
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{filteredDestinations.length} destinations</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>Highly Rated Experiences</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${category.title.toLowerCase()} destinations...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg shadow-sm"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg shadow-sm appearance-none"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="visitors">Sort by Popularity</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center mt-4">
              <p className="text-slate-600">
                Showing {filteredDestinations.length} of {data.destinations.filter(d => d.category.some(cat => cat.toLowerCase() === categoryName.toLowerCase())).length} {category.title.toLowerCase()} destinations
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredDestinations.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredDestinations.map((dest, index) => (
                <motion.div
                  key={dest.id}
                  variants={item}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ModernCard variant="interactive" className="h-full group">
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

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white text-xs font-bold backdrop-blur-sm border border-white/20`}>
                            {category.title}
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

                        {/* Additional Categories */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {dest.category.filter(cat => cat.toLowerCase() !== categoryName.toLowerCase()).slice(0, 2).map((cat, i) => (
                            <span
                              key={cat}
                              className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>

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
                              <Calendar className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-600">{dest.bestTime}</span>
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
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-800">
                No destinations found
              </h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                {searchQuery ? `No ${category.title.toLowerCase()} destinations match your search for "${searchQuery}".` : `No destinations found in the ${category.title.toLowerCase()} category.`}
              </p>
              <div className="flex gap-3 justify-center">
                {searchQuery && (
                  <ModernButton
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </ModernButton>
                )}
                <Link to="/">
                  <ModernButton variant="outline">
                    Back to Home
                  </ModernButton>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Explore Other Experiences
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Discover more amazing categories and experiences in Sri Lanka
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(categoryConfig)
              .filter(([key]) => key !== categoryName)
              .map(([key, cat]) => {
                const CatIcon = cat.icon;
                return (
                  <Link key={key} to={`/category/${key}`}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-4 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${cat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <CatIcon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-800 text-sm mb-1">
                        {cat.title}
                      </h3>
                      <p className="text-slate-600 text-xs">
                        {cat.count}
                      </p>
                    </motion.div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}