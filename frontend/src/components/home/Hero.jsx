import React from 'react'
import { Truck, Gift, RefreshCw, Search, ChevronDown, Heart, ShoppingCart, CircleUserRound } from 'lucide-react'
import hero_bg from '../../assets/images/hero_bg.png'
import Navbar from '../common/Navbar'
import Hometop from '../ribbion/Hometop'

const Hero = () => {
    return (
        <div>
            <Hometop />
             {/* nav */}
               <Navbar />
            <div className="h-120 bg-cover bg-center pl-35 py-10 " style={{ backgroundImage: `url(${hero_bg})` }}>
                <div className='w-100 '>
                    <div className='w-full text-6xl font-extrabold'>Carry More,<br />Worry Less.</div>
                    <div className='w-full py-8 '>
                            Premium bags crafted for style,function and durability - for every journey.
                        s
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hero