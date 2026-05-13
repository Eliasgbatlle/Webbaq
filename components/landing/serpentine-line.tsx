"use client";

import { useState, useEffect, useRef } from "react";

export function SerpentineLine() {
  const pathRef1 = useRef<SVGPathElement>(null);
  const pathRef2 = useRef<SVGPathElement>(null);
  const pathRef3 = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = [pathRef1.current, pathRef2.current, pathRef3.current];
    const svg = svgRef.current;
    if (!svg || paths.some(p => !p)) return;

    const lengths = paths.map(p => p!.getTotalLength());

    paths.forEach((path, i) => {
      path!.style.strokeDasharray = `${lengths[i]}`;
      path!.style.strokeDashoffset = `${lengths[i]}`;
    });

    const updateSvgHeight = () => {
      svg.style.height = `${document.documentElement.scrollHeight}px`;
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const scrollStart = innerHeight * 0.8; // Start animation a bit earlier
      const animationDistance = scrollHeight - scrollStart - (innerHeight * 0.8);

      const currentScroll = scrollY - scrollStart;
      let progress = currentScroll / animationDistance;
      progress = Math.max(0, Math.min(1, progress));

      paths.forEach((path, i) => {
        const newDashoffset = lengths[i] * (1 - progress);
        path!.style.strokeDashoffset = `${newDashoffset}`;
      });
    };

    updateSvgHeight();
    handleScroll();

    const resizeObserver = new ResizeObserver(() => {
      updateSvgHeight();
      handleScroll();
    });
    resizeObserver.observe(document.body);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 hidden lg:block">
      <svg 
        ref={svgRef}
        width="100%" 
        viewBox="0 0 1400 7000"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
            <stop offset="10%" stopColor="rgba(16, 185, 129, 0.4)" />
            <stop offset="90%" stopColor="rgba(16, 185, 129, 0.4)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
          </linearGradient>
        </defs>
        
        {/* Main Serpentine Line */}
        <path
          ref={pathRef1}
          d="M 250 1100 
             C 250 1300, 1150 1500, 1150 1700 
             S 250 1900, 250 2100
             C 250 2300, 1150 2500, 1150 2700
             S 250 2900, 250 3100
             C 250 3300, 1150 3500, 1150 3700
             S 250 3900, 250 4100
             C 250 4300, 1150 4500, 1150 4700
             S 250 4900, 250 5100
             C 250 5300, 1150 5500, 1150 5700
             S 250 5900, 250 6100
             L 250 7000"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Secondary, counter-point line */}
        <path
          ref={pathRef2}
          d="M 1150 1200
             C 1150 1400, 250 1600, 250 1800
             S 1150 2000, 1150 2200
             C 1150 2400, 250 2600, 250 2800
             S 1150 3000, 1150 3200
             C 1150 3400, 250 3600, 250 3800
             S 1150 4000, 1150 4200
             C 1150 4400, 250 4600, 250 4800
             S 1150 5000, 1150 5200
             C 1150 5400, 250 5600, 250 5800
             S 1150 6000, 1150 6200
             L 1150 7000"
          fill="none"
          stroke="rgba(16, 185, 129, 0.2)"
          strokeWidth="1"
        />

        {/* Central dashed line */}
        <path
          ref={pathRef3}
          d="M 700 1000 L 700 7000"
          fill="none"
          stroke="rgba(16, 185, 129, 0.15)"
          strokeWidth="1"
          strokeDasharray="5 15"
        />
      </svg>
    </div>
  );
}