"use client";

import { useState, useEffect } from 'react';

export function BackgroundVideo() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const featuresSection = document.getElementById('features');
    if (!featuresSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpacity(0.6);
        } else {
          // This will fade the video out if you scroll back up to the hero
          const heroSection = entry.boundingClientRect.y > 0;
          if (heroSection) {
            setOpacity(0);
          }
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    observer.observe(featuresSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      src="/videos/background.mp4"
      autoPlay
      loop
      muted
      className="fixed top-0 left-0 w-full h-full object-cover -z-10 transition-opacity duration-1000"
      style={{ opacity }}
    />
  );
}