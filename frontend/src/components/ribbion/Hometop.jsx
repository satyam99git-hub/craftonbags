import React from 'react'
import { Truck, Gift, RefreshCw } from 'lucide-react'

const Hometop = () => {
  return (
    <div className="w-full bg-neutral-900 border-b border-neutral-800 tracking-wide text-[13px] text-neutral-300 antialiased font-medium select-none">
      <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between">
        
        {/* Left Side: Store Promises */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 group cursor-default">
            <Truck size={15} className="text-amber-400 group-hover:translate-x-0.5 transition-transform duration-200" />
            <span>Free shipping over $50</span>
          </div>
          <div className="h-3 w-[1px] bg-neutral-700" /> {/* Clean Divider */}
          <div className="flex items-center gap-2 group cursor-default">
            <RefreshCw size={14} className="text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
            <span>30-day returns</span>
          </div>
        </div>

        {/* Center / Right: Direct Call To Action */}
        <div className="flex items-center gap-2 mx-auto md:mx-0 bg-neutral-800/50 px-3 py-1 rounded-full text-white text-xs border border-neutral-700/50">
          <Gift size={14} className="text-amber-400 animate-pulse" />
          <span>Get 10% Off your first order</span>
          <span className="font-bold text-amber-300 ml-1 tracking-wider bg-black/40 px-1.5 py-0.5 rounded border border-amber-500/20 select-all cursor-pointer" title="Click to copy code">
            CRAFT10
          </span>
        </div>

      </div>
    </div>
  )
}

export default Hometop