import React from 'react'
import Home from "./pages/Home";
import Hometop from './components/ribbion/Hometop';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <div className="min-h-screen">
      <Hometop />
            {/* nav */}
            <Navbar />
      <Home />
    </div>
  )
}

export default App