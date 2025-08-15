import React, { useState } from 'react';
import WeatherDescription from './WeatherDescription';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const WeatherForm = ({ setBackground }) => {
    const [inputCity, setInputCity] = useState('');
    const [weatherlistData, setWeatherListData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getData(cityName) {
        setIsLoading(true);
        try {
            const url = `http://api.weatherapi.com/v1/current.json?key=eb76c5bf3d014c95bea113058251408&q=${cityName}&aqi=no`;
            const response = await fetch(url);
            const data = await response.json();
            setWeatherListData(data);
            
            if (data.current && setBackground) {
                setBackground(null, data.current.condition.text);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleWeather = (event) => {
        event.preventDefault();
        if (inputCity.trim()) {
            getData(inputCity.trim());
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <div className="bg-gradient-to-br from-indigo-600/40 to-purple-600/40 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30">
                <motion.div
                    whileHover={{ x: -3 }}
                >
                    <Link 
                        to="/" 
                        className="flex items-center text-white/90 mb-4 hover:text-white"
                    >
                        <ArrowLeft className="mr-2" />
                        <span>Back</span>
                    </Link>
                </motion.div>
                
                <motion.form 
                    onSubmit={handleWeather} 
                    className="flex mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.input 
                        type="text" 
                        value={inputCity} 
                        onChange={(e) => setInputCity(e.target.value)} 
                        placeholder="Enter city name"
                        className="flex-1 bg-white/95 h-12 px-4 rounded-l-lg outline-none text-gray-800"
                        whileFocus={{ 
                            boxShadow: "0 0 0 2px rgba(129, 140, 248, 0.5)"
                        }}
                    />
                    <motion.button 
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r cursor-pointer from-amber-400 to-amber-500 text-gray-900 px-4 rounded-r-lg flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? (
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Search />
                            </motion.span>
                        ) : (
                            <Search />
                        )}
                    </motion.button>
                </motion.form>
                
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <WeatherDescription 
                        weatherData={weatherlistData} 
                        isLoading={isLoading} 
                    />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default WeatherForm;