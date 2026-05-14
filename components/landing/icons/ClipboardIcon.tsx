"use client";

import React from 'react';

export function ClipboardIcon({ className }: { className?: string }) {
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
          d="M62.5,15H55V10a5,5,0,0,0-5-5H40a5,5,0,0,0-5,5v5H27.5A7.5,7.5,0,0,0,20,22.5v65A7.5,7.5,0,0,0,27.5,95h45A7.5,7.5,0,0,0,80,87.5V22.5A7.5,7.5,0,0,0,72.5,15Z"
          fill="url(#icon-gradient)"
        />
        <rect x="45" y="10" width="10" height="15" rx="2.5" fill="#10B981" />
        <line x1="35" y1="35" x2="65" y2="35" stroke="#A7F3D0" strokeWidth="4" strokeLinecap="round" />
        <line x1="35" y1="50" x2="65" y2="50" stroke="#A7F3D0" strokeWidth="4" strokeLinecap="round" />
        <line x1="35" y1="65" x2="55" y2="65" stroke="#A7F3D0" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}