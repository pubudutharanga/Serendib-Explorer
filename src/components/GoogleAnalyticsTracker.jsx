// src/components/GoogleAnalyticsTracker.jsx - UPDATED
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'

// Initialize Google Analytics 4
const TRACKING_ID = 'G-42T4YGZF03' // Replace with your actual Measurement ID

// Only initialize if we have a valid tracking ID and we're in production
if (TRACKING_ID && TRACKING_ID !== 'G-42T4YGZF03' && import.meta.env.PROD) {
  ReactGA.initialize(TRACKING_ID)
  console.log('🔍 Google Analytics initialized with ID:', TRACKING_ID)
} else if (import.meta.env.DEV) {
  console.log('🔍 Google Analytics would initialize in production')
}

export default function GoogleAnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    // Only track if GA is initialized
    if (TRACKING_ID && TRACKING_ID !== 'G-42T4YGZF03' && import.meta.env.PROD) {
      // Send pageview
      ReactGA.send({ 
        hitType: 'pageview', 
        page: location.pathname + location.search 
      })
      console.log('📊 GA Pageview:', location.pathname)
    } else if (import.meta.env.DEV) {
      console.log('📊 GA would track:', location.pathname)
    }
  }, [location])

  return null
}