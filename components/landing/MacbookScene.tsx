"use client";

import * as THREE from 'three'
import React, { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useVideoTexture, OrbitControls } from '@react-three/drei'

function Model({ videoPath, ...props }: { videoPath: string, [key: string]: any }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/3d/Macbook.glb')
  const { viewport } = useThree();
  
  const texture = useVideoTexture(videoPath, { loop: false })
  texture.flipY = false

  const screenMaterial = useMemo(() => new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }), [texture]);

  // Usamos useRef para el estado de la animación para evitar re-renders en cada frame.
  const animationState = useRef({
    isRotating: false,
    startTime: 0,
    startRotation: 0,
  });

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.name === 'VQmfhbMzfNAuKAD') {
        child.material = screenMaterial;
      }
    });
  }, [scene, screenMaterial]);

  useEffect(() => {
    const video = texture.source.data as HTMLVideoElement;
    if (!video) return;

    const onVideoEnd = () => {
      if (groupRef.current) {
        // Inicia el estado de la animación
        animationState.current = {
          isRotating: true,
          startTime: performance.now(),
          startRotation: groupRef.current.rotation.y,
        };
      }
    };

    video.addEventListener('ended', onVideoEnd);
    return () => video.removeEventListener('ended', onVideoEnd);
  }, [texture.source.data]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Posiciona el modelo a la derecha en pantallas grandes
    const isDesktop = viewport.width > 4; // Aprox 768px
    groupRef.current.position.x = isDesktop ? viewport.width / 4.5 : 0;

    if (animationState.current.isRotating) {
      // --- NUEVA LÓGICA DE ANIMACIÓN CON ACELERACIÓN ---
      const animationDuration = 2000; // 2 segundos. Ajusta esto para cambiar la velocidad.
      const elapsedTime = performance.now() - animationState.current.startTime;
      let progress = elapsedTime / animationDuration;

      if (progress >= 1) {
        progress = 1;
        animationState.current.isRotating = false;
        
        // Cuando la animación termina, reinicia el video para el siguiente ciclo.
        const video = texture.source.data as HTMLVideoElement;
        video.currentTime = 0;
        video.play();
      }

      // Función de easing "ease-in-out": empieza lento, acelera y termina lento.
      const easedProgress = 0.5 * (1 - Math.cos(Math.PI * progress));
      
      const totalRotation = Math.PI * 6; // 3 giros completos
      groupRef.current.rotation.y = animationState.current.startRotation + totalRotation * easedProgress;

      // Mantiene las otras rotaciones estables durante el giro principal.
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;

    } else {
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
      // Optimizacion: Limitar el Device Pixel Ratio
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Suspense fallback={null}>
        <Model videoPath={videoSrc} position={[0, -10, 0]} scale={1.2} />
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