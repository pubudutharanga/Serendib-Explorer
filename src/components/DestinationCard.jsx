import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from './ui/ModernCard'
import { motion } from 'framer-motion'
import { trackEvent } from '../utils/analytics'

export default function DestinationCard({ dest }) {
  const handleCardClick = () => {
    trackEvent('card_click', 'Navigation', dest.name)
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <Link to={`/dest/${dest.id}`} aria-label={`View ${dest.name} details`}>
        <Card className="overflow-hidden">
          <img 
            src={dest.images[0]} 
            alt={`${dest.name} landscape`} 
            loading="lazy" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg">{dest.name}</h3>
            <p className="text-sm text-muted-foreground">{dest.region} · {dest.category.join(', ')}</p>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}