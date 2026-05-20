import React from 'react'
import { Truck, Gift, RefreshCw, Search, ChevronDown, Heart, ShoppingCart, CircleUserRound } from 'lucide-react'
import hero_bg from '../../assets/images/hero_bg.png'

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
                <div className='bg-amber-50 h-20 w-full flex items-center pr-5 pl-5 gap-10'>
                    <div className='w-60 flex justify-center'>
                        <div className="text-3xl font-bold text-black">CRAFTON</div>
                    </div>

                    <div className='flex justify-center gap-8 pr-2 pl-2'>
                        <span className='flex '>SHOP<ChevronDown strokeWidth={1} /></span>
                        <span>COLLECTION</span>
                        <span>NEW ARRIVALS</span>
                        <span>BESTSELLERS</span>
                        <span>ABOUT US</span>
                    </div>

                    <div className="w-75 flex items-center border border-gray-300 rounded-full px-4 py-2">
                        <input
                            type="text"
                            placeholder='Search bags...'
                            className='outline-none ml-2 w-full'
                        />
                        <Search className='w-5 h-5 text-gray-500' />
                    </div>
                    <div className='w-50 flex justify-center gap-4 '>
                        <div className='font-extralight text-xs flex flex-col items-center'><Heart strokeWidth={1} />Wishlist</div>

                        <div className='font-extralight text-xs flex flex-col items-center'><ShoppingCart strokeWidth={1} />Wishlist</div>

                        <div className='font-extralight text-xs flex flex-col items-center'><CircleUserRound strokeWidth={1} />Wishlist</div>
                    </div>

                </div>

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