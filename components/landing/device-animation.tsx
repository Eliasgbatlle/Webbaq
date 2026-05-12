"use client";

import { useEffect, useState } from "react";

const devices = [
  { type: "laptop", width: 400, height: 260 },
  { type: "mobile", width: 140, height: 280 },
  { type: "tablet", width: 240, height: 320 },
];

const screens = [
  "/mockups/screen-restaurant.svg",
  "/mockups/screen-salon.svg", 
  "/mockups/screen-tienda.svg",
];

export function DeviceAnimation() {
  const [deviceIndex, setDeviceIndex] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setDeviceIndex((prev) => (prev + 1) % devices.length);
        setScreenIndex((prev) => (prev + 1) % screens.length);
        setTimeout(() => setIsAnimating(false), 100);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const device = devices[deviceIndex];

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Glow effect */}
      <div 
        className={`absolute rounded-full bg-[#10b981]/20 blur-[80px] transition-all duration-700 ${
          isAnimating ? "opacity-50 scale-90" : "opacity-100 scale-100"
        }`}
        style={{
          width: device.width + 100,
          height: device.height + 100,
        }}
      />
      
      {/* Device frame */}
      <div
        className={`relative transition-all duration-700 ease-out ${
          isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
        style={{
          width: device.width,
          height: device.height,
        }}
      >
        {/* Device border/frame */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-2xl ${
            device.type === "mobile" ? "rounded-[28px]" : 
            device.type === "tablet" ? "rounded-[20px]" : "rounded-lg"
          }`}
        >
          {/* Screen bezel */}
          <div 
            className={`absolute bg-black overflow-hidden ${
              device.type === "laptop" 
                ? "inset-2 rounded-md" 
                : device.type === "mobile"
                ? "inset-[6px] rounded-[22px]"
                : "inset-[8px] rounded-[14px]"
            }`}
          >
            {/* Screen content - SVG mockup */}
            <div className="relative w-full h-full bg-white overflow-hidden">
              {/* Mockup screen content */}
              <MockupScreen type={device.type} screenIndex={screenIndex} />
            </div>
          </div>
          
          {/* Laptop base */}
          {device.type === "laptop" && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[110%] h-3 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-b-xl" />
          )}
          
          {/* Mobile notch */}
          {device.type === "mobile" && (
            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full" />
          )}
          
          {/* Tablet camera */}
          {device.type === "tablet" && (
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-600 rounded-full" />
          )}
        </div>
      </div>
      
      {/* Device label */}
      <div 
        className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-white/40 transition-all duration-500 ${
          isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {device.type === "laptop" ? "Desktop" : device.type === "mobile" ? "Móvil" : "Tablet"}
      </div>
    </div>
  );
}

function MockupScreen({ type, screenIndex }: { type: string; screenIndex: number }) {
  // Restaurant/Café mockup
  if (screenIndex === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-amber-50 to-orange-50 p-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="w-12 h-3 bg-amber-800 rounded" />
          <div className="flex gap-1">
            <div className="w-6 h-2 bg-amber-200 rounded" />
            <div className="w-6 h-2 bg-amber-200 rounded" />
          </div>
        </div>
        {/* Hero */}
        <div className="relative h-[35%] bg-amber-200 rounded mb-2 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-2 bg-amber-800 rounded mx-auto mb-1" />
              <div className="w-10 h-1.5 bg-amber-600 rounded mx-auto" />
            </div>
          </div>
        </div>
        {/* Menu items */}
        <div className="grid grid-cols-2 gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded p-1 shadow-sm">
              <div className="w-full h-6 bg-amber-100 rounded mb-1" />
              <div className="w-8 h-1.5 bg-amber-700 rounded" />
              <div className="w-6 h-1 bg-amber-400 rounded mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Salon/Spa mockup
  if (screenIndex === 1) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-pink-50 to-rose-50 p-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="w-10 h-3 bg-pink-600 rounded" />
          <div className="w-14 h-4 bg-pink-500 rounded-full" />
        </div>
        {/* Hero */}
        <div className="relative h-[30%] bg-gradient-to-r from-pink-200 to-rose-200 rounded-lg mb-2">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-2 bg-pink-700 rounded" />
          </div>
        </div>
        {/* Services */}
        <div className="space-y-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 bg-white rounded p-1.5 shadow-sm">
              <div className="w-6 h-6 bg-pink-100 rounded-full" />
              <div className="flex-1">
                <div className="w-12 h-1.5 bg-pink-600 rounded" />
                <div className="w-8 h-1 bg-pink-300 rounded mt-0.5" />
              </div>
              <div className="w-8 h-4 bg-pink-500 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Tienda/E-commerce mockup
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 p-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-3 bg-blue-700 rounded" />
        <div className="flex gap-1">
          <div className="w-8 h-3 bg-blue-100 rounded" />
          <div className="w-4 h-4 bg-blue-500 rounded-full" />
        </div>
      </div>
      {/* Categories */}
      <div className="flex gap-1 mb-2 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`px-2 py-0.5 rounded-full text-[6px] ${i === 0 ? 'bg-blue-500' : 'bg-blue-100'}`} />
        ))}
      </div>
      {/* Products grid */}
      <div className="grid grid-cols-2 gap-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded p-1 shadow-sm">
            <div className="w-full h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded mb-1" />
            <div className="w-10 h-1.5 bg-slate-700 rounded" />
            <div className="w-6 h-1.5 bg-blue-500 rounded mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
}
