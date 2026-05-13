"use client";

import React, { useRef, useEffect, useCallback } from 'react';

const ASCII_CHARS = '.:-+=*#%@';
const PARTICLE_COUNT = 2000; // Número de partículas en la niebla
const TEXT = "WebBAQ";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  color: string;
  homeX: number;
  homeY: number;
  isTextParticle: boolean;
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const textPixelsRef = useRef<{x: number, y: number}[]>([]);
  const animationFrameId = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRatioRef = useRef(0);

  const initTextPixels = useCallback((canvasWidth: number, canvasHeight: number) => {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    const scale = Math.min(canvasWidth / 800, 1);
    const fontSize = 120 * scale;
    tempCanvas.width = canvasWidth;
    tempCanvas.height = canvasHeight;

    tempCtx.fillStyle = 'white';
    tempCtx.font = `bold ${fontSize}px "Geist Mono", monospace`;
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    tempCtx.fillText(TEXT, canvasWidth / 2, canvasHeight / 2);

    const pixels = tempCtx.getImageData(0, 0, canvasWidth, canvasHeight).data;
    const newPixels = [];
    for (let y = 0; y < canvasHeight; y += 6) {
      for (let x = 0; x < canvasWidth; x += 6) {
        const index = (y * canvasWidth + x) * 4;
        if (pixels[index] > 128) {
          newPixels.push({ x, y });
        }
      }
    }
    textPixelsRef.current = newPixels;
  }, []);

  const initParticles = useCallback((width: number, height: number) => {
    const textPixels = textPixelsRef.current;
    particlesRef.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isTextParticle = i < textPixels.length;
      const home = isTextParticle ? textPixels[i] : { x: Math.random() * width, y: Math.random() * height };

      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        char: ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)],
        color: `hsl(${Math.random() * 60 + 120}, 100%, ${50 + Math.random() * 30}%)`,
        homeX: home.x,
        homeY: home.y,
        isTextParticle: isTextParticle,
      });
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    ctx.font = '12px "Geist Mono", monospace';

    const scroll = scrollRatioRef.current;
    const isFormingText = scroll > 0.4 && scroll < 0.6;
    const textFormationStrength = Math.max(0, 1 - Math.abs(scroll - 0.5) * 10);

    particlesRef.current.forEach(p => {
      // Mouse interaction
      const dx = p.x - mouseRef.current.x;
      const dy = p.y - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, (100 - dist) / 100);
      if (dist < 100) {
        p.vx += (dx / dist) * force * 0.5;
        p.vy += (dy / dist) * force * 0.5;
      }

      // State-based behavior
      if (isFormingText && p.isTextParticle) {
        // Move towards text position
        p.vx += (p.homeX - p.x) * 0.001 * textFormationStrength;
        p.vy += (p.homeY - p.y) * 0.001 * textFormationStrength;
      }

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Friction
      p.vx *= 0.96;
      p.vy *= 0.96;

      // Screen wrap
      if (p.x > width) p.x = 0;
      if (p.x < 0) p.x = width;
      if (p.y > height) p.y = 0;
      if (p.y < 0) p.y = height;

      // Draw
      ctx.fillStyle = p.color;
      ctx.fillText(p.char, p.x, p.y);
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.getContext('2d')?.scale(dpr, dpr);
      initTextPixels(rect.width, rect.height);
      initParticles(rect.width, rect.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleScroll = () => {
      scrollRatioRef.current = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate, initParticles, initTextPixels]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default InteractiveBackground;