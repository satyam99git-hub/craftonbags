import React from 'react'
import Hometop from './components/ribbion/Hometop'
import Navbar from './components/common/Navbar'
import Hero from './components/home/Hero'


function App() {
  return (
    <div className="min-h-screen">
      <Hometop />
      <Navbar />
      <Hero />
    </div>
  )
}

export default App