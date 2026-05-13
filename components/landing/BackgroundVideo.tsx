"use client";

import { useState, useEffect, useRef } from 'react';

export function BackgroundVideo() {
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Calcula el progreso del scroll a través de la sección del héroe (de 0 a 1)
      const progress = Math.min(scrollY / heroHeight, 1);

      // La opacidad del vídeo va de 0 a 0.6
      setVideoOpacity(progress * 0.6);

      // La opacidad de la capa negra va de 1 a 0
      setOverlayOpacity(1 - progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Llama una vez al montar para establecer el estado inicial en caso de recarga
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      // Ralentiza el vídeo para un efecto más sutil
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <>
      {/* Capa de fundido desde negro */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-black"
        style={{ opacity: overlayOpacity, zIndex: -9 }}
      />
      {/* Vídeo de fondo */}
      <video
        ref={videoRef}
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover"
        style={{ opacity: videoOpacity, zIndex: -10 }}
      />
    </>
  );
}