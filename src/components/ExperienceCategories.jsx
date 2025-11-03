// src/components/ExperienceCategories.jsx - Light Blue Theme
import React from 'react'
import { Link } from 'react-router-dom'
import { ModernCard } from './ui/ModernCard'
import { motion } from 'framer-motion'
import { Mountain, Castle, Trees, Waves, Utensils, Camera } from 'lucide-react'

export default function ExperienceCategories() {
  const categories = [
    {
      icon: Mountain,
      title: 'Adventure',
      description: 'Hiking, climbing, and outdoor adventures',
      count: '15+ destinations',
      color: 'from-blue-500 to-cyan-500',
      path: '/trending?category=adventure'
    },
    {
      icon: Castle,
      title: 'Cultural',
      description: 'Ancient sites and heritage locations',
      count: '12+ destinations',
      color: 'from-amber-500 to-orange-500',
      path: '/trending?category=cultural'
    },
    {
      icon: Trees,
      title: 'Nature',
      description: 'Forests, wildlife, and natural wonders',
      count: '20+ destinations',
      color: 'from-green-500 to-emerald-500',
      path: '/trending?category=nature'
    },
    {
      icon: Waves,
      title: 'Beaches',
      description: 'Coastal escapes and water activities',
      count: '8+ destinations',
      color: 'from-cyan-500 to-blue-500',
      path: '/trending?category=beaches'
    },
    {
      icon: Utensils,
      title: 'Culinary',
      description: 'Food tours and local cuisine experiences',
      count: '6+ destinations',
      color: 'from-red-500 to-pink-500',
      path: '/trending?category=culinary'
    },
    {
      icon: Camera,
      title: 'Photography',
      description: 'Picture-perfect spots and scenic views',
      count: '18+ destinations',
      color: 'from-purple-500 to-indigo-500',
      path: '/trending?category=photography'
    }
  ]

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
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your <span className="text-gradient-blue">Experience</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover Sri Lanka through different lenses - from adventure to relaxation
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={item}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={category.path}>
                <ModernCard variant="interactive" className="h-full group hover:shadow-xl transition-all duration-500">
                  <div className="p-6 text-center">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors text-slate-800">
                      {category.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-3 leading-relaxed">
                      {category.description}
                    </p>

                    <div className={`text-sm font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                      {category.count}
                    </div>

                    {/* Hover Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                  </div>
                </ModernCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}