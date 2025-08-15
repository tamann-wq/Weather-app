import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Component/Home';
import WeatherForm from './Component/WeatherComponent/WeatherForm';
import { AnimatePresence } from 'framer-motion';

const backgroundImages = {
  sunny: '/img/sunny-bg.jpg',
  rainy: '/img/rainy-bg.webp',
  cloudy: '/img/cloudy-bg.jpg',
  snowy: '/img/snowy-weather.jpg',
  default: '/img/weatherbackground.jpg',
  night: '/img/night-bg.jpg',
  storm: '/img/storm-bg-jpg'
};

function App() {
  const location = useLocation();
  const [background, setBackground] = useState(backgroundImages.default);
  const [prevBackground, setPrevBackground] = useState(backgroundImages.default);

  const changeBackground = (newBgKey, weatherCondition) => {
    if (!newBgKey && weatherCondition) {
      const condition = weatherCondition.toLowerCase();
      if (condition.includes('sunny')) newBgKey = 'sunny';
      else if (condition.includes('rain')) newBgKey = 'rainy';
      else if (condition.includes('cloud')) newBgKey = 'cloudy';
      else if (condition.includes('snow')) newBgKey = 'snowy';
      else if (condition.includes('storm')) newBgKey = 'storm';
      else if (condition.includes('clear')) newBgKey = 'night';
    }
    
    const newBg = backgroundImages[newBgKey] || backgroundImages.default;
    setPrevBackground(background);
    setBackground(newBg);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Previous Background (for smoother transitions) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${prevBackground})`,
          zIndex: 1,
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Current Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${background})`,
          zIndex: 2,
          filter: 'brightness(0.7)',
          opacity: background === prevBackground ? 1 : 0,
          animation: background !== prevBackground ? 'fadeIn 1s forwards' : 'none'
        }}
      />
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      
      <div className="relative z-10 min-h-screen w-full flex justify-center items-center p-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home setBackground={changeBackground} />} />
            <Route 
              path='/weather-form' 
              element={<WeatherForm setBackground={changeBackground} />} 
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;