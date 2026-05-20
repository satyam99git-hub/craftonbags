import React from 'react'
import { Truck, Gift, RefreshCw, Search, ChevronDown, Heart, ShoppingCart, CircleUserRound } from 'lucide-react'
import hero_bg from '../../assets/images/hero_bg.png'
import Navbar from '../common/Navbar'

const Hero = () => {
    return (
        <div>
            <div className="Top-part">
                <div className="bg-black h-10 w-full pr-5 pl-5 flex items-center" >
                    <div className=" w-full flex justify-between">
                        <div className='text-amber-50 flex items-center '>
                            <div className='p-1.5 text-amber-300'><Truck strokeWidth={1} /></div>
                            <span className='text-sm'>Free Shipping on order above $50</span>
                        </div>
                        <div className='text-amber-50 flex items-center '>
                            <div className='p-1.5 text-amber-300'><Gift strokeWidth={1} /></div>
                            <span className='text-sm'>Get 10% Off on your first order | Use Code: CRAFT10</span>
                        </div>
                        <div className='text-amber-50 flex items-center '>
                            <div className='p-1.5 text-amber-300'><RefreshCw strokeWidth={1} /></div>
                            <span className='text-sm'>30-Day Easy Returns</span>
                        </div>
                    </div>

                </div>
                {/* nav */}
               <Navbar />
            </div>
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