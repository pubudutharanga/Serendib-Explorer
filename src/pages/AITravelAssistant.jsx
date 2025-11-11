// src/pages/AITravelAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ModernCard } from '../components/ui/ModernCard';
import { ModernButton } from '../components/ui/ModernButton';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot,
  User,
  Volume2,
  VolumeX,
  MapPin,
  Globe,
  Clock,
  RefreshCw,
  Mic,
  MicOff,
  Sparkles,
  Palette,
  Zap,
  Crown,
  Sun,
  Moon,
  Cloud,
  Droplets,
  Compass
} from 'lucide-react';

export default function AITravelAssistant() {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('sky');
  const messagesContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Hardcoded API Key for premium access
  const OPENROUTER_API_KEY = "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";
  const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

  // Enhanced Theme configurations with blue-white as default
  const themes = {
    sky: {
      bg: 'from-blue-50 via-sky-50 to-cyan-50',
      card: 'bg-white/95 backdrop-blur-xl border-blue-200/50',
      text: 'text-gray-800',
      accent: 'from-blue-500 to-cyan-500',
      secondary: 'bg-blue-50/80 border-blue-200/30',
      input: 'bg-white border-blue-300 text-gray-800',
      header: 'from-blue-100 to-cyan-100/80 border-blue-200',
      messageBot: 'bg-white border-blue-200 text-gray-800',
      messageUser: 'from-blue-500 to-cyan-500 text-white',
      headerText: 'text-gray-800',
      subheaderText: 'text-gray-600'
    },
    luxury: {
      bg: 'from-purple-900 via-indigo-900 to-blue-900',
      card: 'bg-white/10 backdrop-blur-2xl border-white/20',
      text: 'text-white',
      accent: 'from-purple-500 to-pink-500',
      secondary: 'bg-white/20 border-white/20',
      input: 'bg-white/5 border-white/30 text-white',
      header: 'from-white/5 to-white/10 border-white/10',
      messageBot: 'bg-white/10 border-white/10 text-white',
      messageUser: 'from-purple-500 to-pink-500 text-white',
      headerText: 'text-white',
      subheaderText: 'text-slate-300'
    },
    ocean: {
      bg: 'from-blue-900 via-cyan-900 to-teal-900',
      card: 'bg-gradient-to-br from-blue-800/20 to-cyan-800/20 border-cyan-500/30',
      text: 'text-white',
      accent: 'from-cyan-400 to-blue-500',
      secondary: 'bg-cyan-700/30 border-cyan-500/30',
      input: 'bg-blue-900/30 border-cyan-500/30 text-white',
      header: 'from-blue-800/20 to-cyan-800/20 border-cyan-500/30',
      messageBot: 'bg-blue-800/20 border-cyan-500/30 text-white',
      messageUser: 'from-cyan-400 to-blue-500 text-white',
      headerText: 'text-white',
      subheaderText: 'text-slate-300'

    },
    midnight: {
      bg: 'from-indigo-950 via-purple-950 to-blue-950',
      card: 'bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30',
      text: 'text-white',
      accent: 'from-indigo-400 to-purple-500',
      secondary: 'bg-indigo-900/30 border-indigo-500/30',
      input: 'bg-indigo-900/30 border-indigo-500/30 text-white',
      header: 'from-indigo-900/20 to-purple-900/20 border-indigo-500/30',
      messageBot: 'bg-indigo-900/20 border-indigo-500/30 text-white',
      messageUser: 'from-indigo-400 to-purple-500 text-white',
      headerText: 'text-white',
      subheaderText: 'text-slate-300'
    }
  };

  const currentTheme = themes[theme];

  // Initialize with welcome message
  useEffect(() => {
    setConversation([{
      id: 1,
      type: 'bot',
      content: `✨ **Sri Lanka Travel Experience** ✨\n\nWelcome to your exclusive travel companion! I'm here to provide you with unparalleled insights into Sri Lanka's wonders.\n\n**Features Available:**\n• Real-time AI-powered recommendations\n• Voice-first interaction experience\n• Personalized itinerary planning\n• Exclusive local insights\n• Weather-optimized suggestions\n\nHow may I assist with your luxury Sri Lankan journey today? 🌴`,
      timestamp: new Date()
    }]);
  }, []);

  // Enhanced speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setQuery(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setError('Voice input failed. Please try typing instead.');
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  // Auto-scroll with smooth behavior
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        const { scrollHeight, clientHeight } = messagesContainerRef.current;
        messagesContainerRef.current.scrollTo({
          top: scrollHeight - clientHeight,
          behavior: 'smooth'
        });
      }
    };

    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [conversation, isLoading]);

  // Enhanced AI API Integration
  const getAIResponse = async (userQuery) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Serendib Explorer'
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct:free',
          messages: [
            {
              role: 'system',
              content: `You are a Sri Lanka travel concierge with exclusive access to luxury experiences. Provide sophisticated, detailed insights about:

🌴 **Luxury Accommodations** - 5-star resorts, boutique hotels, private villas
🎯 **Exclusive Experiences** - Private tours, hidden gems, VIP access
🍽️ **Gourmet Dining** - Michelin-style restaurants, local delicacies
🚁 **Transport** - Private drivers, helicopter tours, luxury trains
🏄 **Adventure Activities** - Curated experiences with safety assurance

Always maintain an elegant, professional tone while being exceptionally helpful. Format with clear sections and use travel terminology.`
            },
            ...conversation.filter(msg => msg.type === 'user' || msg.type === 'bot').map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.content
            })),
            {
              role: 'user',
              content: userQuery
            }
          ],
          max_tokens: 1200,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      return { content: aiResponse };

    } catch (error) {
      console.error('AI API Error:', error);
      
      // Enhanced fallback responses
      const fallbackResponses = {
        'luxury': `✨ **Exclusive Sri Lankan Retreats** ✨\n\nWhile I reconnect to our network, here are some exceptional luxury experiences:\n\n🏨 **Ceylon Tea Trails** - Luxury bungalows in tea country\n🏨 **Wild Coast Tented Lodge** - Safari luxury in Yala\n🏨 **Cape Weligama** - Cliffside resort with private pools\n🏨 **Uga Jungle Beach** - Secluded coastal sanctuary\n\n*Private transfers and personalized butler service available.*`,
        'beach': `🏝️ **Beach Escapes** 🏝️\n\n**Mirissa Bay** - Private yacht charters & whale watching\n**Tangalle** - Secluded luxury resorts & spa treatments\n**Pasikuda** - Crystal waters with private beach access\n**Arugam Bay** - Surf luxury with professional instructors\n\n*Best visited December-April for optimal conditions.*`,
        'culture': `🏛️ **Cultural Excellence** 🛃\n\n**Sigiriya Rock Fortress** - Private early access tours available\n**Temple of the Sacred Tooth** - VIP cultural experiences\n**Anuradhapura** - Guided archaeological tours\n**Galle Fort** - Luxury stays within historic walls\n\n*Expert guides and private transportation recommended.*`
      };

      const lowerQuery = userQuery.toLowerCase();
      let fallbackResponse = `🌟 **Travel Service** 🌟\n\nI'm currently enhancing your travel experience. Sri Lanka offers unparalleled luxury experiences across its diverse landscapes.\n\nOur concierge service includes personalized itineraries, exclusive access, and 24/7 support.\n\nPlease try your request again for immediate assistance.`;

      for (const [key, response] of Object.entries(fallbackResponses)) {
        if (lowerQuery.includes(key)) {
          fallbackResponse = response;
          break;
        }
      }

      return { content: fallbackResponse };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (text = query) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage]);
    setQuery('');

    const aiResponse = await getAIResponse(text);
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: aiResponse.content,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, botMessage]);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
      setError('');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Voice settings
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      utterance.lang = 'en-US';

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const clearConversation = () => {
    setConversation([{
      id: 1,
      type: 'bot',
      content: `✨ **Session Renewed** ✨\n\nWelcome back to your exclusive travel concierge service. I'm ready to provide you with Sri Lankan travel insights.\n\nHow may I assist with your luxury journey today? 🌟`,
      timestamp: new Date()
    }]);
    setError('');
  };

  const cycleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  // Theme icons for better visual representation
  const themeIcons = {
    sky: <Cloud className="w-4 h-4" />,
    luxury: <Crown className="w-4 h-4" />,
    ocean: <Droplets className="w-4 h-4" />,
    midnight: <Moon className="w-4 h-4" />
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} backdrop-blur-2xl transition-all duration-500`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 max-w-6xl py-4 sm:py-8 relative z-10">
        {/* Header - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/*JPG logo */}
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 overflow-hidden">
                <img 
                  src="assets\Sri-Lanka-logo.jpg" 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-emerald-400 rounded-full border-4 border-white flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                AI Assistant
              </h1>
              <p className="text-gray-600 sm:text-slate-600 text-sm sm:text-lg">Your Traveling Partner</p>
              <div className="flex items-center justify-center gap-2 mt-1 sm:mt-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-gray-500 sm:text-slate-500 text-xs sm:text-sm">Online</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chat Container - Responsive */}
        <div className={`rounded-2xl sm:rounded-3xl ${currentTheme.card} border shadow-2xl shadow-black/20 sm:shadow-black/30 backdrop-blur-2xl overflow-hidden`}>
          {/* Enhanced Chat Header - Responsive */}
          <div className={`border-b ${currentTheme.header} p-4 sm:p-6 md:p-8`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Compass className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className={`font-bold ${currentTheme.headerText} text-lg sm:text-xl`}>
                    Travel Assistant
                  </h3>
                  <p className={`${currentTheme.subheaderText} text-xs sm:text-sm`}>
                    Real-time AI • Voice-Search • Open AI
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cycleTheme}
                  className={`p-2 sm:p-3 ${currentTheme === themes.sky ? 'bg-blue-100 text-blue-600' : 'bg-white/10 text-white'} rounded-xl sm:rounded-2xl transition-all duration-200 flex items-center gap-2`}
                >
                  {themeIcons[theme]}
                  <span className="text-xs sm:text-sm hidden sm:block">Theme</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearConversation}
                  className={`px-3 sm:px-6 py-2 sm:py-3 ${currentTheme === themes.sky ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' : 'bg-white/10 text-white hover:bg-white/20'} rounded-xl sm:rounded-2xl transition-all duration-200 font-medium flex items-center gap-2 sm:gap-3 text-sm sm:text-base`}
                >
                  <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:block">New Session</span>
                  <span className="sm:hidden">New</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Enhanced Messages Area - Responsive */}
          <div 
            ref={messagesContainerRef}
            className="h-[400px] sm:h-[500px] md:h-[600px] overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 bg-gradient-to-b from-transparent to-black/5"
          >
            <AnimatePresence>
              {conversation.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.type === 'user' ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex gap-3 sm:gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] ${message.type === 'user' ? 'order-first' : ''}`}>
                    <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-xl ${
                      message.type === 'user' 
                        ? `bg-gradient-to-r ${currentTheme.messageUser} shadow-lg shadow-blue-500/30` 
                        : `${currentTheme.messageBot} border shadow-lg`
                    }`}>
                      <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-[15px]">
                        {message.content}
                      </div>
                      
                      {/* Enhanced Message Actions */}
                      <div className={`flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 ${
                        message.type === 'user' ? 'border-blue-400/30' : 'border-gray-200 sm:border-white/10'
                      } border-t`}>
                        <span className={`text-xs ${
                          message.type === 'user' ? 'text-blue-100' : currentTheme === themes.sky ? 'text-gray-500' : 'text-slate-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        
                        {message.type === 'bot' && (
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => speakText(message.content)}
                              className={`p-1 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-200 ${
                                isSpeaking 
                                  ? 'bg-red-500/20 text-red-600' 
                                  : currentTheme === themes.sky 
                                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                                    : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                            >
                              {isSpeaking ? <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" /> : <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />}
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator - Responsive */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 sm:gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md-h-6 text-white" />
                  </div>
                </div>
                <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 ${currentTheme.messageBot} border max-w-[85%] sm:max-w-[80%] md:max-w-[75%]`}>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex space-x-1 sm:space-x-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                    <div className={currentTheme.text}>
                      <p className="font-medium text-sm sm:text-base">Accessing Travel Network</p>
                      <p className={`${currentTheme === themes.sky ? "text-gray-600" : "text-slate-300"} text-xs sm:text-sm`}>
                        Curating exclusive Sri Lankan experiences...
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center"
              >
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 max-w-md backdrop-blur-xl">
                  <p className={`text-red-600 text-sm text-center`}>{error}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area - Responsive */}
          <div className={`border-t ${currentTheme === themes.sky ? 'border-blue-200' : 'border-white/10'} bg-white/80 sm:bg-black/20 backdrop-blur-2xl p-4 sm:p-6 md:p-8`}>
            <div className="flex gap-3 sm:gap-4 items-end">
              {/* Enhanced Voice Input */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isListening ? stopListening : startListening}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 flex-shrink-0 ${
                  isListening 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' 
                    : currentTheme === themes.sky 
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> : <Mic className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
              </motion.button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about luxury resorts, exclusive experiences, or travel planning..."
                  className={`w-full px-4 sm:px-6 py-3 sm:py-4 ${currentTheme.input} rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-500 sm:placeholder-slate-400 resize-none backdrop-blur-xl text-sm sm:text-base`}
                  rows="1"
                  style={{ minHeight: '60px', maxHeight: '120px' }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  disabled={isLoading}
                />
                
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg"
                  >
                    🎤 Listening... Speak now
                  </motion.div>
                )}
              </div>

              {/* Send Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSubmit()}
                disabled={!query.trim() || isLoading}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 flex items-center gap-2 sm:gap-3 flex-shrink-0 text-sm sm:text-base ${
                  !query.trim() || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : `bg-gradient-to-r ${currentTheme.accent} text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40`
                }`}
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:block">Send</span>
              </motion.button>
            </div>

            {/* Helper Text */}
            <p className={`${currentTheme === themes.sky ? 'text-gray-500' : 'text-slate-400'} text-xs mt-3 text-center`}>
              © 2025 Serendib Explorer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}