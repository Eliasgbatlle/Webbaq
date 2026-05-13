"use client";

import * as THREE from 'three'
import React, { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useVideoTexture, OrbitControls } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { gsap } from 'gsap'

function Model({ videoPath, ...props }: { videoPath: string, [key: string]: any }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/3d/Macbook.glb')
  const { viewport } = useThree();
  
  const texture = useVideoTexture(videoPath, { loop: false, start: true, muted: true })
  texture.flipY = false

  const screenMaterial = useMemo(() => new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }), [texture]);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.name === 'VQmfhbMzfNAuKAD') {
        child.material = screenMaterial;
      }
    });
  }, [scene, screenMaterial]);

  useEffect(() => {
    const video = texture.source.data as HTMLVideoElement;
    if (!video || !groupRef.current) return;

    const onVideoEnd = () => {
      if (!groupRef.current) return;

      // --- LÓGICA DE ANIMACIÓN CON GSAP ---
      const tl = gsap.timeline({
        onComplete: () => {
          // Al terminar la animación, reinicia el video.
          video.currentTime = 0;
          video.play();
        }
      });

      // 1. Anticipación (retroceso)
      tl.to(groupRef.current.rotation, {
        y: "-=0.3", // Gira un poco hacia atrás
        duration: 0.4,
        ease: "power2.out"
      });

      // 2. Giro principal rápido con overshoot
      tl.to(groupRef.current.rotation, {
        y: `+=${Math.PI * 6 + 0.5}`, // 3 giros completos + un poco más
        duration: 1.6, // Más rápido
        ease: "power3.inOut" // Acelera y desacelera fuertemente
      }, "-=0.2"); // Empieza un poco antes de que termine la anterior

      // 3. Asentamiento (settle)
      tl.to(groupRef.current.rotation, {
        y: `-=0.2`, // Vuelve a la posición correcta
        duration: 0.5,
        ease: "elastic.out(1, 0.75)"
      });
    };

    video.addEventListener('ended', onVideoEnd);
    return () => video.removeEventListener('ended', onVideoEnd);
  }, [texture.source.data]);

  useFrame((state) => {
    if (groupRef.current && !gsap.isTweening(groupRef.current.rotation)) {
      // Animación suave de flotación cuando no está girando.
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.x = Math.sin(t * 2) * 0.015;
      groupRef.current.rotation.z = Math.cos(t * 3) * 0.01;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <primitive object={scene} />
    </group>
  );
}

export function MacbookScene() {
  const videoSrc = "/videos/Ejkpop.mp4";

  return (
    <Canvas 
      camera={{ position: [0, 0, 80], fov: 50 }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Suspense fallback={null}>
        <EffectComposer>
          <Model videoPath={videoSrc} position={[0, -10, 0]} scale={1.2} />
        </EffectComposer>
      </Suspense>
      <OrbitControls 
        enabled={false}
        enableZoom={false} 
        enablePan={false} 
        minPolarAngle={Math.PI / 2.3} 
        maxPolarAngle={Math.PI / 2.3} 
      />
    </Canvas>
  );
}

useGLTF.preload('/3d/Macbook.glb');