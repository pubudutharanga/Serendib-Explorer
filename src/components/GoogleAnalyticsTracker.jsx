// src/components/GoogleAnalyticsTracker.jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../utils/analytics'

export default function GoogleAnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    // Track page view when route changes
    trackPageView(window.location.href)
  }, [location])

  return null
}