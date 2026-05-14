"use client";

import React from 'react';

export function SendIcon({ className }: { className?: string }) {
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
          d="M10,45 L90,10 L65,90 L45,55 Z"
          fill="url(#icon-gradient)"
          stroke="#A7F3D0"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M45,55 L90,10"
          stroke="#A7F3D0"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}