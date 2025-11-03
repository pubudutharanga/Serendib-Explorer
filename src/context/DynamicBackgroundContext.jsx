// src/context/DynamicBackgroundContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'

const DynamicBackgroundContext = createContext()

const natureGradients = [
  // Morning - Soft greens
  'rgb(236 253 245) 0%, rgb(240 253 250) 50%, rgb(204 251 241) 100%',
  'rgb(240 253 244) 0%, rgb(240 253 250) 50%, rgb(220 252 231) 100%',
  
  // Day - Vibrant nature
  'rgb(236 253 245) 0%, rgb(209 250 229) 50%, rgb(167 243 208) 100%',
  'rgb(209 250 229) 0%, rgb(167 243 208) 50%, rgb(110 231 183) 100%',
  
  // Evening - Warm tones
  'rgb(254 243 199) 0%, rgb(254 247 205) 50%, rgb(254 249 195) 100%',
  'rgb(254 215 170) 0%, rgb(253 186 116) 50%, rgb(251 146 60) 100%',
  
  // Sunset - Vibrant colors
  'rgb(254 202 202) 0%, rgb(253 164 175) 50%, rgb(251 113 133) 100%',
  'rgb(253 230 138) 0%, rgb(252 211 77) 50%, rgb(251 191 36) 100%',
  
  // Twilight - Cool tones
  'rgb(224 231 255) 0%, rgb(199 210 254) 50%, rgb(165 180 252) 100%',
  'rgb(219 234 254) 0%, rgb(191 219 254) 50%, rgb(147 197 253) 100%'
]

export function DynamicBackgroundProvider({ children }) {
  const [currentGradient, setCurrentGradient] = useState(natureGradients[0])
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Change background based on time of day
  useEffect(() => {
    const updateBackgroundByTime = () => {
      const hour = new Date().getHours()
      let gradientIndex

      if (hour >= 5 && hour < 10) gradientIndex = 0 // Morning
      else if (hour >= 10 && hour < 16) gradientIndex = 2 // Day
      else if (hour >= 16 && hour < 18) gradientIndex = 4 // Evening
      else if (hour >= 18 && hour < 20) gradientIndex = 6 // Sunset
      else gradientIndex = 8 // Night

      setCurrentGradient(natureGradients[gradientIndex])
    }

    updateBackgroundByTime()
    const interval = setInterval(updateBackgroundByTime, 300000) // Update every 5 minutes

    return () => clearInterval(interval)
  }, [])

  // Random background changes for dynamic feel
  useEffect(() => {
    const randomChange = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to change
        setIsTransitioning(true)
        const randomIndex = Math.floor(Math.random() * natureGradients.length)
        setCurrentGradient(natureGradients[randomIndex])
        
        setTimeout(() => setIsTransitioning(false), 1000)
      }
    }, 15000) // Check every 15 seconds

    return () => clearInterval(randomChange)
  }, [])

  const changeBackground = (gradientIndex) => {
    setIsTransitioning(true)
    setCurrentGradient(natureGradients[gradientIndex])
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  return (
    <DynamicBackgroundContext.Provider value={{
      currentGradient,
      isTransitioning,
      changeBackground,
      natureGradients
    }}>
      {children}
    </DynamicBackgroundContext.Provider>
  )
}

export const useDynamicBackground = () => {
  const context = useContext(DynamicBackgroundContext)
  if (!context) {
    throw new Error('useDynamicBackground must be used within DynamicBackgroundProvider')
  }
  return context
}