import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplet, Wind, Gauge, Eye, Cloud, Compass } from 'lucide-react';

const WeatherDescription = ({ weatherData, isLoading }) => {
  const [activeTab, setActiveTab] = useState('current');
  
  if (isLoading) {
    return (
      <motion.div 
        className="flex justify-center items-center h-48"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-400"
        />
      </motion.div>
    );
  }

  if (!weatherData || !weatherData.location) {
    return (
      <motion.div 
        className="bg-gradient-to-br from-blue-600/30 to-cyan-500/30 backdrop-blur-md p-4 rounded-xl border border-white/30 text-center shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-lg text-white mb-2">Search for a city</p>
        <p className="text-white/90 text-sm">Enter a location to view weather</p>
      </motion.div>
    );
  }

  const currentStats = [
    { icon: <Thermometer size={18} />, value: `${weatherData.current.temp_c}°C`, label: "Temp" },
    { icon: <Droplet size={18} />, value: `${weatherData.current.humidity}%`, label: "Humidity" },
    { icon: <Wind size={18} />, value: `${weatherData.current.wind_kph} kph`, label: "Wind" },
    { icon: <Gauge size={18} />, value: `${weatherData.current.pressure_mb} mb`, label: "Pressure" },
  ];

  const additionalStats = [
    { icon: <Eye size={18} />, value: `${weatherData.current.vis_km} km`, label: "Visibility" },
    { icon: <Cloud size={18} />, value: `${weatherData.current.cloud}%`, label: "Clouds" },
    { icon: <Compass size={18} />, value: weatherData.current.wind_dir, label: "Wind Dir" },
    { icon: <Thermometer size={18} />, value: weatherData.current.uv, label: "UV Index" },
  ];

  return (
    <motion.div 
      className="bg-gradient-to-br from-blue-600/30 to-cyan-500/30 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Location Header */}
      <motion.div 
        className="p-3 border-b border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-bold text-white truncate">
          {weatherData.location.name}, {weatherData.location.country}
        </h2>
        <p className="text-white/90 text-xs">
          {new Date(weatherData.location.localtime).toLocaleString()}
        </p>
      </motion.div>

      {/* Condition Display */}
      <motion.div 
        className="flex items-center p-3 border-b border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.img 
          src={weatherData.current.condition.icon} 
          alt={weatherData.current.condition.text}
          className="w-12 h-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <div className="ml-3">
          <p className="text-sm text-white">{weatherData.current.condition.text}</p>
          <motion.p 
            className="text-2xl font-bold text-amber-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {weatherData.current.temp_c}°C
          </motion.p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex border-b border-white/20">
        <motion.button
          onClick={() => setActiveTab('current')}
          className={`flex-1 py-2 text-xs font-medium ${activeTab === 'current' ? 'text-white bg-white/10' : 'text-white/80 hover:text-white'}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Current
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('details')}
          className={`flex-1 py-2 text-xs font-medium ${activeTab === 'details' ? 'text-white bg-white/10' : 'text-white/80 hover:text-white'}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Details
        </motion.button>
      </div>

      {/* Tab Content */}
      <div className="p-2">
        {activeTab === 'current' && (
          <motion.div 
            className="grid grid-cols-2 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {currentStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 p-2 rounded-lg border border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center text-white/90 text-xs">
                  {stat.icon}
                  <span className="ml-1">{stat.label}</span>
                </div>
                <p className="text-lg font-semibold text-white mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'details' && (
          <motion.div 
            className="grid grid-cols-2 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {additionalStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 p-2 rounded-lg border border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center text-white/90 text-xs">
                  {stat.icon}
                  <span className="ml-1">{stat.label}</span>
                </div>
                <p className="text-lg font-semibold text-white mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WeatherDescription;