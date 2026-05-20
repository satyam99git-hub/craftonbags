// Renders the shared site navigation used across public pages.
import React from 'react'
import { Truck, Gift, RefreshCw, Search, ChevronDown, Heart, ShoppingCart, CircleUserRound } from 'lucide-react'

const Navbar = () => {
  return (
     <div className='bg-amber-50 h-20 w-full flex items-center pr-5 pl-5 gap-10'>
                        <div className='w-60 flex justify-center'>
                            <div className="text-3xl font-bold text-black">CRAFTON</div>
                        </div>
    
                        <div className='flex justify-center gap-8 pr-2 pl-2 text-sm'>
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
  )
}

export default Navbar