"use client";

import React from 'react';

export function RocketIcon({ className }: { className?: string }) {
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
      <g filter="url(#icon-shadow)" transform="rotate(-45 50 50)">
        <path
          d="M65,10H35a5,5,0,0,0-5,5V40c0,13.8,11.2,25,25,25s25-11.2,25-25V15A5,5,0,0,0,65,10Z"
          fill="url(#icon-gradient)"
        />
        <path
          d="M50,65v25l-10-10h20Z"
          fill="#FBBF24"
        />
        <circle cx="50" cy="35" r="10" fill="#A7F3D0" />
        <path d="M30,45l-15,15a5,5,0,0,0,0,7l7,7a5,5,0,0,0,7,0L44,59" fill="#10B981" />
        <path d="M70,45l15,15a5,5,0,0,1,0,7l-7,7a5,5,0,0,1-7,0L56,59" fill="#10B981" />
      </g>
    </svg>
  );
}