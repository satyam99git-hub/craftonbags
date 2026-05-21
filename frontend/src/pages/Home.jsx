// Renders the storefront homepage.
import React from 'react'
import Hero from '../components/home/Hero'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Categories from '../components/home/Categories'
import BackpackSection from '../components/home/BackpackSection'
import SchoolSection from '../components/home/SchoolSection'
import LuggageSection from '../components/home/LuggageSection'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <BackpackSection />
      <SchoolSection />
      <LuggageSection />
    </div>
  )
}

export default Home
