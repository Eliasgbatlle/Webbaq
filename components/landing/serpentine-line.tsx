"use client";

import { useState, useEffect, useRef } from "react";

export function SerpentineLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;

    // Set initial styles
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const updateSvgHeight = () => {
      svg.style.height = `${document.documentElement.scrollHeight}px`;
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Start animation after the hero section (100vh)
      const scrollStart = innerHeight;
      
      // The total distance over which the animation should occur
      const animationDistance = scrollHeight - scrollStart - (innerHeight * 0.5); // End a bit before the absolute bottom

      // Current scroll position relative to the animation's start point
      const currentScroll = scrollY - scrollStart;
      
      // Calculate progress, clamped between 0 and 1
      let progress = currentScroll / animationDistance;
      progress = Math.max(0, Math.min(1, progress));

      const newDashoffset = length * (1 - progress);
      path.style.strokeDashoffset = `${newDashoffset}`;
    };

    updateSvgHeight();
    handleScroll(); // Initial call

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
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30 hidden lg:block">
      <svg 
        ref={svgRef}
        width="100%" 
        viewBox="0 0 1400 7000" // A large viewBox to accommodate the full page height
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
        <path
          ref={pathRef}
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
      </svg>
    </div>
  );
}