// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { initGA } from './utils/analytics'

const GA_ID = import.meta.env.VITE_GA_ID || ''
if (GA_ID) initGA(GA_ID)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>  {/* ← And this */}
      <App />
    </HashRouter>
  </React.StrictMode>
)