// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      // Check if we're in browser environment
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(key)
        console.log(`Reading from localStorage key "${key}":`, raw)
        return raw ? JSON.parse(raw) : initialValue
      }
      return initialValue
    } catch (e) {
      console.warn('Error reading from localStorage:', e)
      return initialValue
    }
  })

  const setLocal = (value) => {
    try {
      // Check if we're in browser environment
      if (typeof window !== 'undefined') {
        const valueToStore = typeof value === 'function' ? value(state) : value
        console.log(`Setting localStorage key "${key}" to:`, valueToStore)
        setState(valueToStore)
        localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (e) {
      console.warn('Error setting localStorage:', e)
    }
  }

  // Listen for storage events to sync across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setState(JSON.parse(e.newValue))
        } catch (error) {
          console.warn('Error parsing storage event:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [state, setLocal]
}
