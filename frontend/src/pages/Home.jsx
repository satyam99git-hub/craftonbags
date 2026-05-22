// Renders the storefront homepage.
import React from 'react'
import Hero from '../components/home/Hero'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Categories from '../components/home/Categories'
import BackpackSection from '../components/home/BackpackSection'
import SchoolSection from '../components/home/SchoolSection'
import LuggageSection from '../components/home/LuggageSection'
import Footer from '../components/common/Footer'
import InfluencerSection from '../components/influencer/InfluencerSection'

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <BackpackSection />
      <SchoolSection />
      <LuggageSection />
      <InfluencerSection />
    </div>
  )
}

export default Home
