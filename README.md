<div align="center">

![Serendib Explorer](https://raw.githubusercontent.com/pubudutharanga/Serendib-Explorer/refs/heads/main/public/assets/readme.png)

# 🏝️ Serendib Explorer

### Discover the Pearl of the Indian Ocean

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=vercel)](https://pubudutharanga.github.io/Serendib-Explorer/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

[🚀 Live Demo](https://pubudutharanga.github.io/Serendib-Explorer/) • [📖 Documentation](#-documentation) • [🐛 Report Bug](https://github.com/pubudutharanga/Serendib-Explorer/issues) • [✨ Request Feature](https://github.com/pubudutharanga/Serendib-Explorer/issues)

</div>

---

## 🌟 What is Serendib Explorer?

**Serendib Explorer** is a modern, AI-powered travel companion that helps you discover the breathtaking beauty of Sri Lanka. Whether you're planning your first visit or exploring hidden gems, our interactive platform provides real-time weather updates, personalized recommendations, and an intelligent assistant to guide your journey.

### ✨ Why Choose Serendib Explorer?

- 🤖 **AI Travel Assistant** - Get personalized recommendations powered by advanced language models
- 🌤️ **Real-Time Weather** - Live weather updates for every destination
- 📍 **30+ Curated Destinations** - Handpicked locations from beaches to ancient temples
- 🗺️ **Interactive Maps** - Explore locations with integrated Leaflet maps
- 📱 **Mobile-First Design** - Seamless experience across all devices
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth animations

---
## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- A modern web browser (Chrome, Firefox, Safari, Edge)

### 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/pubudutharanga/Serendib-Explorer.git
cd Serendib-Explorer
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` with your API keys:
```env
# Google Analytics (Optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# OpenWeather API (Required for weather features)
VITE_OPENWEATHER_API_KEY=your_openweather_api_key

# OpenRouter API (Optional - for AI assistant)
VITE_OPENROUTER_PROXY_URL=your_proxy_url
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:5173](http://localhost:5173)

---

## 🔑 Getting API Keys

### OpenWeather API (Free Tier - Recommended)

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to **API Keys** section
4. Copy your API key
5. Add to `.env` file as `VITE_OPENWEATHER_API_KEY`

**Free Tier Limits:** 60 calls/minute, 1,000,000 calls/month

### Google Analytics (Optional)

1. Visit [Google Analytics](https://analytics.google.com/)
2. Create a new property
3. Copy the Measurement ID (starts with `G-`)
4. Add to `.env` file as `VITE_GA_MEASUREMENT_ID`

### OpenRouter API (Optional - For AI Features)

1. Visit [OpenRouter](https://openrouter.ai/)
2. Create an account and get your API key
3. Deploy the Vercel proxy function (see [AI Setup Guide](#-ai-assistant-setup))

---

## 📦 Build for Production
```bash
# Build the project
npm run build

# Preview the build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

The build output will be in the `dist/` directory.

---

## 🎨 Features Deep Dive

### 🏝️ Destination Explorer

Browse 30+ handpicked destinations across Sri Lanka:

- **Cultural Sites** - Ancient temples, UNESCO heritage sites
- **Natural Wonders** - National parks, waterfalls, tea plantations
- **Beach Escapes** - Pristine coastlines and surfing spots
- **Adventure Activities** - Hiking, wildlife safaris, water sports

Each destination includes:
- 📸 High-resolution photo galleries
- 🗺️ Interactive maps with markers
- 🌤️ Real-time weather forecasts
- ⭐ Ratings and visitor statistics
- 🏨 Hotel recommendations
- 📅 Best time to visit

### 🤖 AI Travel Assistant

Your intelligent travel companion powered by advanced language models:

- **Voice-Enabled Chat** - Speak your questions naturally
- **Personalized Recommendations** - Get suggestions based on your preferences
- **Multi-Theme Interface** - Choose from Sky, Luxury, Ocean, or Midnight themes
- **Real-Time Responses** - Instant answers to travel queries
- **Context-Aware** - Remembers conversation history

**Example Queries:**
- "What are the best beaches to visit in December?"
- "Recommend a 5-day itinerary for first-time visitors"
- "What's the weather like in Ella right now?"

### 🌤️ Smart Weather Integration

Real-time weather data for informed travel planning:

- **Current Conditions** - Temperature, humidity, wind speed
- **5-Day Forecast** - Plan ahead with confidence
- **UV Index** - Stay safe in the tropical sun
- **Sunrise/Sunset Times** - Perfect for photography planning
- **Precipitation Alerts** - Know when to carry an umbrella

### 🔍 Advanced Search & Filtering

Find your perfect destination quickly:

- Search by name, region, or category
- Filter by experience type (Adventure, Cultural, Nature, etc.)
- Sort by rating, popularity, or name
- Real-time result updates

### ❤️ Favorites System

Save and organize your dream destinations:

- One-click save to favorites
- Persistent storage (survives browser restarts)
- Quick access to saved locations
- Cross-tab synchronization

---

## 🏗️ Project Structure
```
serendib-explorer/
├── 📁 public/
│   └── assets/
│       ├── images/          # Destination images
│       ├── hero-backgrounds/ # Hero section backgrounds
│       ├── Sri-Lanka-logo.jpg
│       └── text.png
├── 📁 src/
│   ├── 📁 components/
│   │   ├── EnhancedNavigation.jsx
│   │   ├── ModernHero.jsx
│   │   ├── FeaturedDestinations.jsx
│   │   ├── ExperienceCategories.jsx
│   │   ├── SimpleDestinationGrid.jsx
│   │   ├── ExpandableWeather.jsx
│   │   ├── MiniWeatherBadge.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── 📁 ui/
│   │       ├── ModernButton.jsx
│   │       ├── ModernCard.jsx
│   │       └── Input.jsx
│   ├── 📁 pages/
│   │   ├── ModernDestinationDetail.jsx
│   │   ├── TrendingDestinations.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── Favorites.jsx
│   │   └── AITravelAssistant.jsx
│   ├── 📁 hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useWeather.js
│   │   └── useFetch.js
│   ├── 📁 utils/
│   │   ├── analytics.js
│   │   ├── weatherAPI.js
│   │   ├── dateUtils.js
│   │   └── openrouterProxy.js
│   ├── 📁 data/
│   │   └── destinations.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── 📁 api/                  # Vercel serverless functions
│   └── openrouter.js
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| ⚛️ React | 19.2.0 | UI Framework |
| ⚡ Vite | 7.2.1 | Build Tool & Dev Server |
| 🎨 Tailwind CSS | 3.4.14 | Styling |
| 🎭 Framer Motion | 11.18.2 | Animations |
| 🗺️ React Leaflet | 5.0.0 | Interactive Maps |
| 🎬 React Player | 2.12.0 | Video Playback |
| 🎯 React Router | 6.30.1 | Client-side Routing |
| 🎨 Lucide React | 0.552.0 | Icon Library |

### Backend & APIs

- 🌤️ **OpenWeather API** - Weather data
- 🤖 **OpenRouter API** - AI language models
- ☁️ **Vercel Serverless** - API proxy functions
- 📊 **Google Analytics 4** - User tracking

### Development Tools

- 🧪 **Vitest** - Unit testing
- 📝 **ESLint** - Code linting
- 🎨 **Prettier** - Code formatting
- 🚀 **GitHub Actions** - CI/CD pipeline

---

## 🤝 Contributing

We love contributions! Here's how you can help make Serendib Explorer even better:

### 🐛 Found a Bug?

1. Check if it's already reported in [Issues](https://github.com/pubudutharanga/Serendib-Explorer/issues)
2. If not, [create a new issue](https://github.com/pubudutharanga/Serendib-Explorer/issues/new) with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)

### ✨ Have a Feature Idea?

1. Open a [feature request](https://github.com/pubudutharanga/Serendib-Explorer/issues/new)
2. Describe the feature and its benefits
3. Wait for feedback before starting work

### 📝 Submitting Changes

1. **Fork the repository**
```bash
git clone https://github.com/YOUR_USERNAME/Serendib-Explorer.git
```

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**

- Write clean, readable code
- Follow existing code style
- Add comments where necessary
- Test thoroughly

4. **Commit your changes**
```bash
git commit -m "✨ Add amazing feature"
```

Use conventional commit messages:
- ✨ `feat:` New feature
- 🐛 `fix:` Bug fix
- 📚 `docs:` Documentation
- 🎨 `style:` Formatting
- ♻️ `refactor:` Code restructuring
- ⚡ `perf:` Performance improvement
- ✅ `test:` Adding tests

5. **Push to your fork**
```bash
git push origin feature/amazing-feature
```

6. **Open a Pull Request**

- Provide a clear description
- Link related issues
- Add screenshots for UI changes

---

## 🐛 Troubleshooting

### Issue: Images not loading

**Solution:**
```bash
# Verify file paths in destinations.json
# Ensure images exist in public/assets/images/
```

### Issue: Weather data not showing

**Solution:**
```bash
# Check .env file for VITE_OPENWEATHER_API_KEY
# Verify API key is valid on OpenWeatherMap
# Check browser console for error messages
```

### Issue: AI Assistant not responding

**Solution:**
```bash
# Verify VITE_OPENROUTER_PROXY_URL is set
# Check Vercel deployment logs
# Ensure proxy function is deployed correctly
```

### Issue: Build failing

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Try building again
npm run build
```

### Issue: Port already in use

**Solution:**
```bash
# Use a different port
npm run dev -- --port 3000
```

### Issue: Navigation not working after deployment

**Solution:**
- Verify `base` path in `vite.config.js` matches your GitHub repo name
- For GitHub Pages: `base: '/Serendib-Explorer/'`
- For custom domain: `base: '/'`

---

## 📚 Documentation

### Component Usage

#### Using ModernButton
```jsx
import { ModernButton } from './components/ui/ModernButton'

<ModernButton variant="default" size="lg">
  Click Me
</ModernButton>
```

**Variants:** `default`, `outline`, `ghost`, `glass`, `premium`  
**Sizes:** `sm`, `default`, `lg`, `icon`

#### Using ModernCard
```jsx
import { ModernCard } from './components/ui/ModernCard'

<ModernCard variant="interactive">
  <div className="p-6">
    Your content here
  </div>
</ModernCard>
```

**Variants:** `default`, `glass`, `gradient`, `interactive`

#### Using Weather Badge
```jsx
import MiniWeatherBadge from './components/MiniWeatherBadge'

<MiniWeatherBadge destination={destination} compact />
```

### Custom Hooks

#### useLocalStorage
```jsx
import useLocalStorage from './hooks/useLocalStorage'

const [favorites, setFavorites] = useLocalStorage('favorites', [])

// Add to favorites
setFavorites(prev => [...prev, newItem])

// Cross-tab synchronization included automatically
```

#### useWeather
```jsx
import { useWeather } from './hooks/useWeather'

const { weather, forecast, loading, error } = useWeather(destination)

if (loading) return <Skeleton />
if (error) return <Error message={error} />

return <WeatherDisplay data={weather} />
```

---

## 🔐 Security

### Reporting Security Issues

🚨 **DO NOT** open public issues for security vulnerabilities.

Instead, email security concerns to: [pubudu.dev@example.com](mailto:pubudu.dev@example.com)

We'll respond within 48 hours and work with you to resolve the issue.

### Security Best Practices

- ✅ API keys are stored in environment variables
- ✅ Sensitive operations are proxied through Vercel functions
- ✅ No API keys are committed to the repository
- ✅ CORS is configured for security
- ✅ User data is stored locally (privacy-first)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
```
MIT License

Copyright (c) 2025 Pubudu Tharanga

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## 🙏 Acknowledgments

### Technologies & Libraries

- [React](https://react.dev/) - The library for web and native interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library
- [Leaflet](https://leafletjs.com/) - Open-source JavaScript library for maps

### APIs & Services

- [OpenWeatherMap](https://openweathermap.org/) - Weather data provider
- [OpenRouter](https://openrouter.ai/) - AI model routing
- [Vercel](https://vercel.com/) - Deployment and serverless functions
- [GitHub Pages](https://pages.github.com/) - Free hosting

### Design Inspiration

- [Airbnb](https://www.airbnb.com/) - Travel platform UX patterns
- [Dribbble](https://dribbble.com/) - Design inspiration
- [Awwwards](https://www.awwwards.com/) - Web design excellence

### Special Thanks

- Sri Lanka Tourism Board for destination information
- The open-source community for amazing tools
- All contributors who help improve this project

---

## 👨‍💻 About the Developer

<div align="center">

### Pubudu Tharanga

**Full-Stack Developer | Undergraduate | AI Enthusiast**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)](https://github.com/pubudutharanga)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/pubudutharanga)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook)](https://www.facebook.com/share/1ai3Wtn4jc/)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://pubudutharanga.github.io)

</div>

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=pubudutharanga/Serendib-Explorer&type=Date)](https://star-history.com/#pubudutharanga/Serendib-Explorer&Date)

---

## 📬 Contact & Support

### Get Help

- 📖 [Documentation](#-documentation)
- 💬 [GitHub Discussions](https://github.com/pubudutharanga/Serendib-Explorer/discussions)
- 🐛 [Issue Tracker](https://github.com/pubudutharanga/Serendib-Explorer/issues)

### Connect With Me

- 📧 Email: pubudutharange@gmail.com
- 💼 LinkedIn: [linkedin.com/in/pubudutharanga](https://www.linkedin.com/in/pubudutharanga)

---

## 🗺️ Roadmap

### ✅ Current Features (v1.0)

- [x] 30+ curated destinations
- [x] Real-time weather integration
- [x] AI travel assistant
- [x] Interactive maps
- [x] Favorites system
- [x] Mobile-responsive design
- [x] Search and filtering
- [x] Analytics integration

### 🚧 In Development (v1.1)

- [ ] User authentication
- [ ] Review and rating system
- [ ] Destination comparison
- [ ] Offline mode (PWA)
- [ ] Multi-language support

### 🔮 Future Plans (v2.0)

- [ ] Mobile app (React Native)
- [ ] Booking integration
- [ ] Travel package builder
- [ ] Community features

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/pubudutharanga/Serendib-Explorer?style=social)
![GitHub forks](https://img.shields.io/github/forks/pubudutharanga/Serendib-Explorer?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/pubudutharanga/Serendib-Explorer?style=social)

![GitHub repo size](https://img.shields.io/github/repo-size/pubudutharanga/Serendib-Explorer)
![GitHub language count](https://img.shields.io/github/languages/count/pubudutharanga/Serendib-Explorer)
![GitHub top language](https://img.shields.io/github/languages/top/pubudutharanga/Serendib-Explorer)
![GitHub last commit](https://img.shields.io/github/last-commit/pubudutharanga/Serendib-Explorer)

</div>

---

<div align="center">

**Discover. Explore. Experience.**

[⬆ Back to Top](#-serendib-explorer)

</div>