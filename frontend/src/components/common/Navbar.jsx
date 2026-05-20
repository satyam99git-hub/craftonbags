// Renders the shared site navigation used across public pages.
import React from 'react'
import { Truck, Gift, RefreshCw, Search, ChevronDown, Heart, ShoppingCart, CircleUserRound } from 'lucide-react'

const Navbar = () => {

    const features = ["SHOP","COLLECTION","NEW ARRIVAL","BESTSELLERS","ABOUT US"];
  return (
     <div className='bg-amber-50 h-16 w-full flex items-center justify-between gap-8 px-5'>

                        <div className='flex justify-center'>
                            <div className="text-3xl font-bold text-black">CRAFTON</div>
                        </div>
    
                        <div className='flex text-sm justify-center items-center gap-8'>
                            {features.map((e)=>(
                                <button className='font-semibold cursor-pointer'>{e}</button>    
                            ))}
                        </div>
    
                        {/* search bar */}
                        <div className="w-72 flex items-center border border-gray-300 rounded-full px-4 py-2">
                            <input
                                type="text"
                                placeholder='Search bags...'
                                className='outline-none ml-2 w-full'
                            />
                            <Search className='w-5 h-5 text-gray-500' />
                        </div>

                        <div className=' flex justify-center gap-4'>
                            <div className='font-semibold text-xs flex flex-col items-center'><Heart strokeWidth={2} />Wishlist</div>
                            <div className='font-semibold text-xs flex flex-col items-center'><ShoppingCart strokeWidth={2} />Cart</div>
                            <div className='font-semibold text-xs flex flex-col items-center'><CircleUserRound strokeWidth={2} />Wishlist</div>
                        </div>
    
                    </div>
  )
}

export default Navbar