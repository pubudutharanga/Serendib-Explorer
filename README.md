SERENDIB EXPLORER - DISCOVER SRI LANKA
=======================================

A modern, high-performance React web application showcasing the breathtaking beauty of Sri Lanka. Explore ancient heritage sites, pristine beaches, and cultural treasures through an immersive digital experience.

FEATURES
========

CORE EXPERIENCE
---------------
- Interactive Destination Explorer - Browse 30+ handpicked Sri Lankan destinations
- Smart Search & Filtering - Find places by name, region, or category
- Seasonal Recommendations - AI-powered best-time-to-visit suggestions
- Favorites System - Save and manage your preferred destinations
- Category-Based Discovery - Adventure, Cultural, Nature, Beaches, Culinary, Photography

AI-POWERED ASSISTANT
--------------------
- Voice-Enabled Chat - Speak naturally to get travel recommendations
- Multi-Theme Interface - Sky, Luxury, Ocean, and Midnight themes
- Real-time Travel Advice - Get personalized itinerary suggestions
- OpenRouter AI Integration - Advanced language model capabilities

INTERACTIVE FEATURES
--------------------
- Leaflet Maps - Interactive location maps for every destination
- Image Galleries - High-quality photo collections with fullscreen view
- Video Integration - Embedded video tours and experiences
- Social Sharing - Share destinations across platforms

PREMIUM DESIGN
--------------
- Glassmorphism UI - Modern glass-effect design elements
- Smooth Animations - Framer Motion powered transitions
- Responsive Design - Flawless experience across all devices
- Light Blue Theme - Calming, travel-inspired color palette

QUICK START
===========

PREREQUISITES
-------------
- Node.js 18+
- npm or yarn
- Modern web browser

INSTALLATION
------------
1. Clone the repository:
   git clone https://github.com/pubudutharanga/Serendib-Explorer.git
   cd Serendib-Explorer

2. Install dependencies:
   npm install

3. Set up environment variables (Optional):
   Create .env file with:
   VITE_GA_ID=G-XXXXXXXXXX
   VITE_OPENROUTER_API_KEY=your_key_here

4. Start development server:
   npm run dev

5. Open your browser:
   http://localhost:5173

TECH STACK
==========

FRONTEND FRAMEWORK
------------------
- React 19.2.0
- Vite 7.2.1

STYLING & UI
------------
- TailwindCSS 3.4.14
- Framer Motion 11.18.2
- Lucide React
- Custom Glassmorphism

MAPS & MEDIA
------------
- React Leaflet
- React Player
- Vite Imagetools

AI & ANALYTICS
--------------
- OpenRouter API
- Google Analytics 4
- Web Speech API

DEPLOYMENT
----------
- GitHub Pages
- GitHub Actions

PROJECT STRUCTURE
=================

serendib-explorer/
├── public/
│   └── assets/
│       ├── images/
│       │   └── hero-backgrounds/
│       ├── Sri-Lanka-logo.jpg
│       └── text.png
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── ModernCard.jsx
│   │   │   ├── ModernButton.jsx
│   │   │   └── Input.jsx
│   │   ├── EnhancedNavigation.jsx
│   │   ├── ModernHero.jsx
│   │   ├── FeaturedDestinations.jsx
│   │   ├── ExperienceCategories.jsx
│   │   ├── SimpleDestinationGrid.jsx
│   │   └── ErrorBoundary.jsx
│   ├── pages/
│   │   ├── ModernDestinationDetail.jsx
│   │   ├── TrendingDestinations.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── Favorites.jsx
│   │   └── AITravelAssistant.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useFetch.js
│   ├── utils/
│   │   ├── analytics.js
│   │   └── dateUtils.js
│   ├── data/
│   │   └── destinations.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vite.config.js
├── package.json
├── index.html
└── README.md

AVAILABLE SCRIPTS
=================

DEVELOPMENT
-----------
npm run dev          # Start development server
npm run preview      # Preview production build

BUILD & DEPLOY
--------------
npm run build        # Create production build
npm run predeploy    # Build and prepare for deployment
npm run deploy       # Deploy to GitHub Pages

CONFIGURATION
=============

ENVIRONMENT VARIABLES
---------------------
# Optional: Google Analytics
VITE_GA_ID=G-XXXXXXXXXX

# Optional: AI Assistant (OpenRouter)
VITE_OPENROUTER_API_KEY=your_api_key_here

VITE CONFIGURATION
------------------
// Optimized for GitHub Pages
export default defineConfig({
  base: '/Serendib-Explorer/',
  plugins: [react(), imagetools()],
  optimizeDeps: {
    include: ['leaflet', 'react-leaflet']
  }
})

DATA STRUCTURE
==============

Destinations are managed through destinations.json:

{
  "destinations": [
    {
      "id": "sigiriya-rock-fortress",
      "name": "Sigiriya Rock Fortress",
      "description": "Ancient rock fortress and palace ruins",
      "region": "Central Province",
      "category": ["Cultural", "Adventure", "Photography"],
      "rating": 4.8,
      "visitors": 500000,
      "bestTime": "December to April",
      "images": ["/assets/destinations/sigiriya-1.jpg"],
      "location": { "lat": 7.9570, "lng": 80.7603 },
      "hotels": [...],
      "activities": [...],
      "videos": ["youtube-url"]
    }
  ]
}

DEPLOYMENT
==========

GITHUB PAGES (CURRENT)
----------------------
1. Repository named 'Serendib-Explorer'
2. Automatic deployment via GitHub Actions
3. Access at: https://pubudutharanga.github.io/Serendib-Explorer/

OTHER PLATFORMS
---------------
# Netlify
npm run build
# Deploy dist/ folder

# Vercel
npm run build
# Deploy dist/ folder

CUSTOMIZATION
=============

ADDING NEW DESTINATIONS
-----------------------
1. Edit src/data/destinations.json
2. Add high-quality images to public/assets/images/
3. Follow the existing JSON structure

MODIFYING CATEGORIES
--------------------
Update category configuration in:
- src/components/ExperienceCategories.jsx
- src/pages/CategoryPage.jsx

STYLING CHANGES
---------------
- Primary colors: src/index.css CSS variables
- Component styles: TailwindCSS classes
- Global styles: src/index.css

CONTRIBUTING
============

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: git checkout -b feature/amazing-feature
3. Commit changes: git commit -m 'Add amazing feature'
4. Push to branch: git push origin feature/amazing-feature
5. Open a Pull Request

DEVELOPMENT GUIDELINES
----------------------
- Use meaningful commit messages
- Follow existing code style
- Test on multiple devices
- Update documentation as needed

BROWSER SUPPORT
===============

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

TROUBLESHOOTING
===============

COMMON ISSUES
-------------

Images not loading:
- Check file paths in public/assets/
- Verify image filenames in destinations.json

AI Assistant not working:
- Verify VITE_OPENROUTER_API_KEY in environment variables
- Check browser console for API errors

Build failures:
- Clear node_modules: rm -rf node_modules && npm install
- Ensure Node.js version 18+

LICENSE
=======

This project is licensed under the MIT License.

ACKNOWLEDGMENTS
===============

- Sri Lanka Tourism for inspiration and content
- OpenRouter for AI API access
- Unsplash for beautiful photography
- React Community for excellent tools and libraries
- Vite Team for the fantastic build tool

DEVELOPER
=========

Pubudu Tharanga
- GitHub: @pubudutharanga
- LinkedIn: Pubudu Tharanga
- Facebook: Pubudu Tharanga

SUPPORT
=======

If you find this project helpful, please give it a star on GitHub!

---

Built with love for Sri Lanka Tourism

Experience the warmth of island hospitality
