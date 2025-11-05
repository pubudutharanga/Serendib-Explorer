// src/components/GoogleAnalytics.jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function GoogleAnalytics() {
  const location = useLocation()

  useEffect(() => {
    // Inject the Google Analytics script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-42T4YGZF03'
    
    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-42T4YGZF03');
    `

    // Add scripts to head
    document.head.appendChild(script1)
    document.head.appendChild(script2)

    // Cleanup function
    return () => {
      if (document.head.contains(script1)) document.head.removeChild(script1)
      if (document.head.contains(script2)) document.head.removeChild(script2)
    }
  }, [])

  // Track page views on route changes
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-42T4YGZF03', {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])

  return null
}