# 🏝️ Serendib Explorer

<div align="center">

![React](https://icons8.com/icon/NfbyHexzVEDk/react)
![Vite](https://img.shields.io/badge/Vite-7.2.1-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css)

A modern, high-performance React web application showcasing the breathtaking beauty of Sri Lanka.  
Explore ancient heritage sites, pristine beaches, and cultural treasures through an immersive digital experience.

🌐 **Live Demo:** https://pubudutharanga.github.io/Serendib-Explorer/

</div>

---

## ✨ Features

### 🌟 Core Experience
- Interactive Destination Explorer — browse 30+ handpicked Sri Lankan destinations
- Smart Search & Filtering — by name, region, and category
- Seasonal Recommendations — best-time-to-visit insights
- Favorites System — save and revisit preferred places
- Category-Based Discovery — Adventure, Cultural, Nature, Beaches, Culinary, Photography

### 🤖 AI-Powered Assistant
- Voice-enabled chat interface
- Sky / Luxury / Ocean / Midnight theme modes
- Real-time personalized itinerary recommendations
- Integrated with OpenRouter advanced language models

### 🗺️ Interactive Features
- Leaflet maps for every destination
- High-resolution photo galleries (fullscreen)
- Video tour integration
- Social media sharing

### 🎨 Premium Design
- Glassmorphism UI components
- Framer Motion animations
- Mobile-first responsive layout
- Light-blue travel-inspired theme palette

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js **18+**
- npm or yarn
- Modern web browser

### **Local Development**
```bash
git clone https://github.com/pubudutharanga/Serendib-Explorer.git
cd Serendib-Explorer
npm install
npm run dev
```
Then open the browser:
http://localhost:5173

🔧 Advanced Setup
AI Assistant Configuration (Optional)
```bash
cp .env.example .env
Update .env:
env
VITE_GA_ID=G-XXXXXXXXXX
VITE_OPENROUTER_API_KEY=your_api_key_here
VITE_OPENROUTER_PROXY_URL=https://your-proxy.vercel.app/api/openrouter
```

Build for Production
```bash
npm run build
npm run preview
npm run deploy
```
📁 Project Structure
```bash
serendib-explorer/
├── public/
│   └── assets/
│       ├── images/
│       │   └── hero-backgrounds/
│       ├── Sri-Lanka-logo.jpg
│       └── text.png
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── data/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vite.config.js
└── package.json
```

🧪 Testing Checklist
Test Area	Status
Home page loads	✅
Navigation	✅
Search & filters	✅
Destination detail pages	✅
Favorites system	✅
Image galleries & maps	✅
AI Assistant	🔄

🎯 Usage Guide
Visiting Destinations
Search by category or name

Browse detailed travel guides

Access maps & galleries

Using AI Assistant
Ask travel-related questions

Receive itinerary & suggestions

Switch theme modes anytime

Saving Favorites
Click heart icon to save

View saved list in Favorites page

Stored locally — no login required

🔧 Configuration Overview
Variable	Description	Required
VITE_GA_ID	Google Analytics ID	No
VITE_OPENROUTER_API_KEY	AI API Key	No
VITE_OPENROUTER_PROXY_URL	Proxy server URL	No

🐛 Troubleshooting
Issue	Fix
Images not loading	Verify file paths & destinations.json
AI not responding	Check .env, proxy, console logs
Build failing	Delete node_modules → reinstall
Port conflict	Run npm run dev -- --port 3000

🤝 Contributing
```bash
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```
Follow:

Readable commit messages

Match project coding style

Test before PR submission

📄 License
Distributed under the MIT License.

👨‍💻 Developer
Pubudu Tharanga
GitHub: https://github.com/pubudutharanga
LinkedIn: https://www.linkedin.com/in/pubudutharanga
Facebook: https://www.facebook.com/share/1ai3Wtn4jc/

<div align="center">
If you like this project, please ⭐ the repository!

</div> 
