"use client";

import { useEffect, useRef } from 'react';

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) return;

    // Sin video para quien pide menos movimiento o ahorro de datos
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const skipVideo = reduceMotion || saveData;

    let loaded = false;
    let ticking = false;

    // El video empieza invisible, así que solo se descarga cuando el usuario hace scroll
    const loadVideo = () => {
      if (loaded || skipVideo) return;
      loaded = true;
      video.src = '/videos/background.mp4';
      video.playbackRate = 0.75;
      video.play().catch(() => {});
    };

    const update = () => {
      ticking = false;
      // Progreso del scroll a través de la sección del héroe (de 0 a 1)
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      if (progress > 0) loadVideo();
      // La opacidad del vídeo va de 0 a 0.6 y la capa negra de 1 a 0
      video.style.opacity = String(progress * 0.6);
      overlay.style.opacity = String(1 - progress);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Estado inicial en caso de recarga con scroll
    update();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Capa de fundido desde negro */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-black"
        style={{ opacity: 1, zIndex: -9 }}
      />
      {/* Vídeo de fondo */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full object-cover"
        style={{ opacity: 0, zIndex: -10 }}
      />
    </>
  );
}
