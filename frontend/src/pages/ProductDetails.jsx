import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductByIdOrSlug } from "../features/products/productAPI";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Core API States
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Custom High-End UX States
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specifications");
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Tan Brown");
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Zoom Physics Tracking Hooks
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const zoomContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 550);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProductByIdOrSlug(slug);
        setProduct(data);
        if (data) {
          setActiveImage(data.image || (data.images && data.images[0]));
        }
      } catch (error) {
        console.error("Critical component crash during data hydrate", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

  // Premium Magnifying Tracking Calculation
  const handleMouseMove = (e) => {
    if (!zoomContainerRef.current) return;
    const { left, top, width, height } = zoomContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: "block",
      backgroundImage: `url(${activeImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "220%"
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
        <div className="text-[10px] font-bold tracking-widest text-stone-400 uppercase animate-pulse">Initializing Luxury Canvas</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <button onClick={() => navigate(-1)} className="text-xs font-black tracking-widest uppercase border-b-2 border-black pb-1">Return to Grid</button>
      </div>
    );
  }

  const allImages = [product.image, ...(product.images || [])].filter(Boolean);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <section className="min-h-screen bg-[#F9F8F6] text-stone-900 font-sans antialiased selection:bg-stone-900 selection:text-white relative pb-24">
      
      {/* FEATURE 1: ULTRA-SMOOTH STICKY DESKTOP HEADER ACTION DOCK */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-100 px-8 py-3 flex items-center justify-between transition-all duration-500 ease-out ${
        showStickyBar ? "translate-y-0 opacity-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)]" : "-translate-y-full opacity-0 pointer-events-none"
      }`}>
        <div className="flex items-center gap-4">
          <img src={product.image} alt="" className="w-12 h-12 object-contain bg-stone-50 p-1 rounded-xl mix-blend-multiply" />
          <div>
            <h4 className="text-xs font-bold truncate max-w-[240px]">{product.title}</h4>
            <p className="text-xs font-medium text-stone-500">₹{product.price?.toLocaleString("en-IN")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">Only 5 left!</span>
          <button 
            onClick={() => setIsAdded(true)}
            className="bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl transition-transform active:scale-95"
          >
            {isAdded ? "Added to Bag ✓" : "Instant Secure Add"}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* CORE NAV BAR */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back
          </button>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"/> Fast Delivery</span>
          </div>
        </div>

        {/* COMPONENT LAYOUT MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* MEDIA PLATFORM ENGINE (LEFT) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-5">
            
            {/* Gallery Track Selector */}
            {allImages.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] scrollbar-none">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setActiveImage(img)}
                    className={`relative aspect-square w-16 xl:w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-white p-2 transition-all border ${
                      activeImage === img ? "border-stone-900 scale-95 shadow-sm" : "border-stone-200/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}

            {/* FEATURE 2: NORMALIZED ZOOM MATRIX CANVAS CONTAINER */}
            <div 
              ref={zoomContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="flex-1 relative aspect-square max-w-[500px] mx-auto w-full overflow-hidden rounded-[2rem] bg-white border border-stone-100 shadow-[0_12px_40px_rgba(0,0,0,0.02)] flex items-center justify-center p-8 cursor-zoom-in group"
            >
              <span className="absolute top-4 right-4 text-[9px] font-bold tracking-widest text-stone-400 border border-stone-200 px-2 py-1 rounded-full uppercase bg-white">Hover to inspect</span>
              <img
                src={activeImage}
                alt=""
                className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:opacity-0"
              />
              {/* Virtual Physics Zoom Overlay Window */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-[2rem]" 
                style={zoomStyle} 
              />
            </div>
          </div>

          {/* COMPILATION AND INTERACTIVES (RIGHT) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-[0.2em] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md uppercase">Live Inventory: Only 5 Left!</span>
                
                {/* FEATURE 3: SATISFYING WISHLIST HEART TOGGLE */}
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-rose-600 transition-colors"
                >
                  <span>Wishlist</span>
                  <svg className={`w-5 h-5 transition-transform active:scale-125 duration-300 ${isWishlisted ? "fill-rose-500 stroke-rose-500 scale-110" : "stroke-current fill-none group-hover:scale-105"}`} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-stone-900 leading-tight">{product.title}</h1>
              <p className="text-xs leading-relaxed text-stone-500">{product.description}</p>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 border-b border-stone-200/60 pb-5">
              <span className="text-3xl font-black">₹{product.price?.toLocaleString("en-IN")}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-stone-400 line-through">₹{product.originalPrice?.toLocaleString("en-IN")}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{discount}% Saved</span>
                </>
              )}
            </div>

            {/* FEATURE 4: DYNAMIC MULTI-COLOR SWATCH MATRIX */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold tracking-wider uppercase text-stone-400">
                <span>Selected Colorway</span>
                <span className="text-stone-900">{selectedColor}</span>
              </div>
              <div className="flex gap-3">
                {[
                  { name: "Tan Brown", hex: "#B47B59" },
                  { name: "Stealth Slate", hex: "#4A4E51" },
                  { name: "Carbon Midnight", hex: "#1A1C1E" }
                ].map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-8 h-8 rounded-full ring-offset-4 transition-all duration-300 transform hover:scale-110 ${
                      selectedColor === color.name ? "ring-2 ring-stone-900 scale-105" : "ring-1 ring-black/10"
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Stepper Engine */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Allocation Volume</label>
              <div className="flex items-center w-32 border border-stone-200 bg-white rounded-xl shadow-sm overflow-hidden p-0.5">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center font-bold text-stone-400 hover:text-stone-900 transition-colors">-</button>
                <span className="flex-1 text-center font-bold text-xs text-stone-800">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-9 h-9 flex items-center justify-center font-bold text-stone-400 hover:text-stone-900 transition-colors">+</button>
              </div>
            </div>

            {/* Premium Call to Action */}
            <button
              onClick={() => { setIsAdded(true); setTimeout(() => setIsAdded(false), 2000); }}
              className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md transform active:scale-98 ${
                isAdded ? "bg-emerald-600 text-white shadow-emerald-600/10" : "bg-stone-900 text-white hover:bg-stone-800 shadow-stone-900/10"
              }`}
            >
              {isAdded ? "Allocated To Bag ✓" : "Secure Selection & Add To Bag"}
            </button>

            {/* FEATURE 5: LIVE COMPARISON OVERLAY MATRIX */}
            <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-stone-500">
                <span>Product Comparison Matrix</span>
                <span className="text-[10px] text-stone-400 lowercase">Live updates</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-stone-100 shadow-sm">
                <img src={product.image} alt="" className="w-10 h-10 object-contain mix-blend-multiply bg-stone-50 rounded" />
                <div className="flex-1 text-[11px] leading-snug">
                  <p className="font-bold text-stone-800">Current Model (-30% Spec variant)</p>
                  <p className="text-stone-400">Includes advanced structural scaffolding & custom zipper lines</p>
                </div>
              </div>
            </div>

            {/* Luxury Modular Content Tabs */}
            <div className="border-t border-stone-200 pt-6">
              <div className="flex gap-6 border-b border-stone-100 pb-2">
                {["specifications", "customer stories", "sustainability"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-xs font-bold uppercase tracking-widest pb-2 relative transition-colors ${
                      activeTab === tab ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 rounded-full" />}
                  </button>
                ))}
              </div>
              <div className="mt-4 text-xs leading-relaxed text-stone-500 min-h-[50px]">
                {activeTab === "specifications" && <p>{product.description || "Assembled with high-density ballistic nylon and custom weather-sealed hardware components."}</p>}
                {activeTab === "customer stories" && <p>★ ★ ★ ★ ★ — "The weight distribution is phenomenal. Better than any premium traveler option I've used this year." - Kabir S.</p>}
                {activeTab === "sustainability" && <p>Crafted cleanly with 100% recycled lining textiles and zero carbon footprint offset shipping processes.</p>}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FEATURE 6: LIVE CHAT SUPPORT PORTAL FLOATER */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {showChat && (
          <div className="w-72 bg-white rounded-2xl border border-stone-200/80 shadow-2xl p-4 animate-fade-in-up">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-bold text-stone-800">Skyline Concierge Support</p>
            </div>
            <p className="text-xs text-stone-500">Hello! Looking for specific configurations on this build? Ask me anything.</p>
          </div>
        )}
        <button 
          onClick={() => setShowChat(!showChat)}
          className="bg-white hover:bg-stone-50 text-stone-900 border border-stone-200 rounded-full p-3.5 shadow-xl transition-transform hover:rotate-12 active:scale-95 flex items-center justify-center relative"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-bounce" />
        </button>
      </div>

    </section>
  );
};

export default ProductDetails;