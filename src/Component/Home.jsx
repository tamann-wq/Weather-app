import React from 'react'
import Weather from './WeatherComponent/Weather'
import { motion } from 'framer-motion'

const Home = ({ setBackground }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Weather setBackground={setBackground}/>
    </motion.div>
  )
}

export default Home