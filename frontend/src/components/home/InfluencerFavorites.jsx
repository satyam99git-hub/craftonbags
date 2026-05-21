import React, { useRef } from "react";

const products = [
  { id: 1, title: "Skybags Swirl Blue", link: "https://skybags.co.in/collections/hard-luggage", videoSrc: "https://cdn.shopify.com/videos/c/o/v/2e485134761e443588d248101885f141.mp4" },
  { id: 2, title: "Skybags Ruby 01 Pink", link: "https://skybags.co.in/products/skybags-ruby-01-school-backpack-pink?variant=50328749605145", videoSrc: "https://cdn.shopify.com/videos/c/o/v/34854670c5094add92c262e6fb1b97e8.mp4" },
  { id: 3, title: "Skybags Sonic Pro 01", link: "https://skybags.co.in/products/skybags-sonic-pro-01-scbp-hot-box?variant=50232079221017", videoSrc: "https://cdn.shopify.com/videos/c/o/v/34df93aa735249bd8618679422eae3b9.mp4" },
  { id: 4, title: "Skybags Squad Plus - Yellow", link: "https://skybags.co.in/products/skybags-squad-plus-02-school-backpack-yellow?variant=45199805153561", videoSrc: "https://cdn.shopify.com/videos/c/o/v/1786b9cbfda04aa6b42192523971e6fb.mp4" },
  { id: 5, title: "Skybags Offroader NX Red", link: "https://skybags.co.in/products/skybags-offroader-nx-01-laptop-backpack-red?variant=44405070889241", videoSrc: "https://cdn.shopify.com/videos/c/o/v/dab6cababdf8467897f12f0d9c3ae496.mp4" },
  { id: 6, title: "Skybags Cityscape Black", link: "https://skybags.co.in/products/skybags-cityscape-black?variant=51238106726681", videoSrc: "https://cdn.shopify.com/videos/c/o/v/f8848f7cc3014e34b1afa09b5c111f98.mp4" },
];

const VideoCard = ({ product }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Playback prevented:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="w-[240px] md:w-[260px] flex-shrink-0 snap-start group relative py-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
      >
        {/* Dynamic Video Element */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={product.videoSrc} type="video/mp4" />
        </video>

        {/* Brand Ambient Dark Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

        {/* Product Title Display */}
        <div className="absolute bottom-0 left-0 w-full p-4 z-10">
          <h3 className="m-0 text-white text-xs md:text-sm font-semibold tracking-wide line-clamp-2 leading-snug group-hover:underline">
            {product.title}
          </h3>
        </div>
      </a>
    </div>
  );
};

const InfluencerSection = () => {
  return (
    <section className="bg-[#f5f5f5] px-4 py-20 md:px-8 lg:px-16 max-w-7xl mx-auto rounded-3xl my-6">  
      {/* ⚡ Header (Clean & Centered Title Only) */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-black tracking-wide text-gray-900 uppercase leading-none">
          INFLUENCER FAVORITES
        </h2>
      </div>

      {/* 🎒 Pure Native Scroll/Touchpad Runway Track */}
      <div className="skybags-custom-scrollbar mt-8 flex gap-5 overflow-x-auto pb-4 pr-4 md:pr-12 snap-x snap-mandatory overscroll-behavior-x-contain scroll-smooth">
        <style dangerouslySetInnerHTML={{__html: `
          .skybags-custom-scrollbar::-webkit-scrollbar {
            height: 4px;
          }
          .skybags-custom-scrollbar::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 2px;
          }
          .skybags-custom-scrollbar::-webkit-scrollbar-thumb {
            background: #111827;
            border-radius: 2px;
          }
        `}} />

        {products.map((product) => (
          <VideoCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
};

export default InfluencerSection;