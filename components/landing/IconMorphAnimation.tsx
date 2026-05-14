"use client";

import { useState, useEffect } from 'react';
import { ClipboardList, Send, Palette, Rocket } from 'lucide-react';

const icons = [
  { component: ClipboardList, color: 'text-emerald-400' },
  { component: Send, color: 'text-emerald-400' },
  { component: Palette, color: 'text-emerald-400' },
  { component: Rocket, color: 'text-emerald-400' },
];

export function IconMorphAnimation({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {icons.map((Icon, index) => (
        <div
          key={index}
          className="absolute transition-all duration-1000 ease-in-out"
          style={{
            opacity: activeIndex === index ? 1 : 0,
            transform: `scale(${activeIndex === index ? 1 : 0.8}) rotate(${activeIndex === index ? 0 : -20}deg)`,
            filter: `blur(${activeIndex === index ? 0 : '10px'})`,
          }}
        >
          <Icon.component
            className={`${Icon.color} w-48 h-48 lg:w-64 lg:h-64`}
            strokeWidth={0.5}
          />
        </div>
      ))}
    </div>
  );
}