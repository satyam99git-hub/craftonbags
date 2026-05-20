// Renders the shared site navigation used across public pages.
import React from 'react'
import { Truck, Gift, RefreshCw, Search, ChevronDown, Heart, ShoppingCart, CircleUserRound } from 'lucide-react'

const Navbar = () => {

    const features = ["SHOP","COLLECTION","NEW ARRIVAL","BESTSELLERS","ABOUT US"];
  return (
     <div className='bg-amber-50 h-16 w-full flex items-center justify-between gap-8 px-5'>

                        <div className='flex justify-center'>
                            <div className="text-3xl font-bold text-black">
                                <button className='cursor-pointer'>
                                    CRAFTON
                                </button>
                            </div>
                        </div>
    
                        <div className='flex text-sm justify-center items-center gap-8'>
    {features.map((e, index) => (
        <button 
            key={index} 
            className='relative font-medium text-gray-600 hover:text-black cursor-pointer py-1 transition-colors duration-200 group'
        >
            {e}
            {/* The expanding underline line */}
            <span className='absolute bottom-0 left-1/2 w-0 h-[2px] bg-black transition-all duration-300 ease-out -translate-x-1/2 group-hover:w-full' />
        </button>    
    ))}
</div>
    
                        {/* search bar */}
<div className="group w-72 flex items-center border border-gray-200 rounded-full px-4 py-2 bg-white shadow-sm hover:border-gray-400 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200 ease-in-out">
    <input
        type="text"
        placeholder='Search bags...'
        className='outline-none w-full text-sm text-gray-800 placeholder-gray-400 bg-transparent pr-2'
    />
    <Search className='w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200' />
</div>

                        <div className='flex justify-center gap-6'>
    {/* Wishlist */}
    <div className='group font-medium text-xs flex flex-col items-center gap-1 text-slate-600 hover:text-rose-600 cursor-pointer transition-all duration-300 ease-in-out'>
        <Heart 
            strokeWidth={2} 
            className='w-5 h-5 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:fill-rose-100' 
        />
        <span>Wishlist</span>
    </div>

    {/* Cart */}
    <div className='group font-medium text-xs flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 cursor-pointer transition-all duration-300 ease-in-out'>
        <ShoppingCart 
            strokeWidth={2} 
            className='w-5 h-5 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-translate-y-0.5' 
        />
        <span>Cart</span>
    </div>

    {/* Auth */}
    <div className='group font-medium text-xs flex flex-col items-center gap-1 text-slate-600 hover:text-emerald-600 cursor-pointer transition-all duration-300 ease-in-out'>
        <CircleUserRound 
            strokeWidth={2} 
            className='w-5 h-5 transition-transform duration-300 ease-in-out group-hover:scale-110' 
        />
        <span>Login</span>
    </div>
</div>
                    </div>
  )
}

export default Navbar