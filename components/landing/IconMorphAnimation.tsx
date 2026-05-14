"use client";

import { useState, useEffect } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { SendIcon } from './icons/SendIcon';
import { PaletteIcon } from './icons/PaletteIcon';
import { RocketIcon } from './icons/RocketIcon';

const icons = [
  ClipboardIcon,
  SendIcon,
  PaletteIcon,
  RocketIcon,
];

export function IconMorphAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 2500); // Cambia el ícono cada 2.5 segundos

    return () => clearInterval(interval);
  }, []);

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
          <Icon
            className="w-48 h-48 lg:w-64 lg:h-64"
          />
        </div>
      ))}
    </div>
  );
}