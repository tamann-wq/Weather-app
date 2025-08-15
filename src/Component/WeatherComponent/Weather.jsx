import React from 'react';
import { ArrowRight, CloudSun, CloudRain, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Weather = ({ setBackground }) => {
  const features = [
    { 
      icon: <Sun size={36} />, 
      text: "Real-time", 
      description: "Current conditions",
      color: "from-amber-400 to-amber-600",
      bg: "bg-gradient-to-br from-amber-500/30 to-amber-600/30"
    },
    { 
      icon: <CloudSun size={36} />, 
      text: "Forecasts", 
      description: "Precise predictions",
      color: "from-blue-400 to-blue-600",
      bg: "bg-gradient-to-br from-blue-500/30 to-blue-600/30"
    },
    { 
      icon: <CloudRain size={36} />, 
      text: "Global", 
      description: "Worldwide coverage",
      color: "from-purple-400 to-purple-600",
      bg: "bg-gradient-to-br from-purple-500/30 to-purple-600/30"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div 
        className="bg-gradient-to-br from-indigo-600/40 to-purple-600/40 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30"
        onMouseEnter={() => setBackground('default')}
      >
        <div className="text-center mb-6">
          <motion.h1 
            className="text-4xl font-bold mb-3"
            animate={{ 
              textShadow: "0 0 15px rgba(251, 191, 36, 0.5)"
            }}
            transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
              WeatherWise
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your premium weather companion
          </motion.p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                y: -5,
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
              }}
              className={`${feature.bg} p-3 rounded-xl border border-white/30 shadow-md`}
            >
              <div className={`text-center mb-2 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white text-center">
                {feature.text}
              </h3>
              <p className="text-white/90 text-sm text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link to='/weather-form'>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(245, 158, 11, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r cursor-pointer from-amber-400 to-amber-500 text-gray-900 py-3 px-6 rounded-xl font-semibold shadow-lg"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Weather;