import React from "react";
import {
  Truck,
  Gift,
  RefreshCw,
  Search,
  ChevronDown,
  Heart,
  ShoppingCart,
  CircleUserRound,
} from "lucide-react";
import hero_bg from "../../assets/images/hero_bg.png";
import Navbar from "../common/Navbar";
import Hometop from "../ribbion/Hometop";

const Hero = () => {
  return (
    <div>
      <Hometop />
      {/* nav */}
      <Navbar />
      <div
        className="relative w-full h-[540px] bg-cover bg-center flex items-center px-6 md:px-16 lg:px-24"
        style={{ backgroundImage: `url(${hero_bg})` }}
      >
        {/* Content Wrapper */}
        <div className="relative z-10 max-w-xl text-gray-900">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
            Carry More,
            <br />
            Worry Less.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-900 font-medium leading-relaxed max-w-md">
            Premium bags crafted for style, function, and durability—engineered
            for every journey.
          </p>

          {/* Elegant Interactive Shop Button */}
          <div className="mt-8">
            <button className="group relative inline-flex items-center justify-center bg-white text-black font-semibold text-sm px-8 py-3.5 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              <span className="relative z-10">Shop Collection</span>
              {/* Subtle sliding background hover layer */}
              <div className="absolute inset-0 bg-neutral-100 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
