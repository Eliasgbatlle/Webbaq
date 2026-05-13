"use client";

import React from 'react';

export function SerpentineLines() {
  return (
    <>
      <svg
        className="pointer-events-none fixed isolate z-10 opacity-20 mix-blend-plus-lighter"
        width="100%"
        height="100%"
      >
        <defs>
          <radialGradient
            id="line-gradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#line-gradient)" mask="url(#line-mask)" />
        <mask id="line-mask">
          <g>
            <path
              className="line-1"
              d="M-200 300 C 400 100, 800 700, 1200 500 S 1800 800, 2000 1200"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <path
              className="line-2"
              d="M2200 400 C 1800 600, 1400 200, 1000 400 S 400 100, 200 500"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          </g>
        </mask>
      </svg>
      <style jsx>{`
        @keyframes draw-line {
          to {
            stroke-dashoffset: 0;
          }
        }
        .line-1, .line-2 {
          stroke-dasharray: 3000;
          stroke-dashoffset: 3000;
          animation: draw-line 25s linear infinite;
        }
        .line-2 {
          animation-duration: 35s;
          animation-direction: reverse;
          animation-delay: -5s;
        }
      `}</style>
    </>
  );
}