"use client";

import React from 'react';

export function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <filter id="icon-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#059669" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#icon-shadow)">
        <path
          d="M85,30C85,16.2,73.8,5,60,5S35,16.2,35,30c0,7.3,3.2,13.8,8.2,18.2L15,76.5V85h8.5l28.3-28.3C56.2,59.8,62.7,63,70,63c13.8,0,25-11.2,25-25C95,34.7,90.9,30.9,85,30Z"
          fill="url(#icon-gradient)"
        />
        <circle cx="55" cy="25" r="7" fill="#A7F3D0" />
        <circle cx="70" cy="40" r="7" fill="#A7F3D0" />
      </g>
    </svg>
  );
}