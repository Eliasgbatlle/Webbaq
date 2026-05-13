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

  const animationState = useRef({
    phase: 'idle', // idle, anticipating, spinning, settling
    startTime: 0,
    startRotation: new THREE.Euler(),
  });
  
  const idleTime = useRef(0);
  const initialRotationY = useRef(props['rotation-y'] || 0); // Almacena la rotación inicial

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
        // Almacena la rotación exacta antes de que comience la animación
        initialRotationY.current = groupRef.current.rotation.y;
        animationState.current = {
          phase: 'anticipating',
          startTime: performance.now(),
          startRotation: groupRef.current.rotation.clone(),
        };
      }
    };

    video.addEventListener('ended', onVideoEnd);
    return () => video.removeEventListener('ended', onVideoEnd);
  }, [texture.source.data]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const { phase, startTime, startRotation } = animationState.current;
    const isDesktop = viewport.width > 4;
    groupRef.current.position.x = isDesktop ? viewport.width / 4.5 : 0;

    if (phase === 'idle') {
      idleTime.current += delta;
      const t = idleTime.current;
      // Usa la rotación inicial como centro para el balanceo
      groupRef.current.rotation.y = initialRotationY.current + Math.sin(t * 1.5) * 0.02;
      groupRef.current.rotation.x = Math.sin(t * 2) * 0.015;
      groupRef.current.rotation.z = Math.cos(t * 3) * 0.01;
      groupRef.current.scale.set(1, 1, 1);
      return;
    }

    const elapsedTime = performance.now() - startTime;

    const ANTICIPATION_DURATION = 300;
    const SPIN_DURATION = 1200;
    const SETTLE_DURATION = 500;
    const overshootAngle = 0.4;

    if (phase === 'anticipating') {
      const progress = Math.min(elapsedTime / ANTICIPATION_DURATION, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOut
      groupRef.current.rotation.y = startRotation.y - easedProgress * 0.3;

      if (progress >= 1) {
        animationState.current = {
          phase: 'spinning',
          startTime: performance.now(),
          startRotation: groupRef.current.rotation.clone(),
        };
      }
    } else if (phase === 'spinning') {
      const progress = Math.min(elapsedTime / SPIN_DURATION, 1);
      const easedProgress = 0.5 * (1 - Math.cos(Math.PI * progress)); // ease-in-out

      const totalRotation = Math.PI * 6;
      groupRef.current.rotation.y = startRotation.y + easedProgress * (totalRotation + overshootAngle);

      const velocity = Math.sin(Math.PI * progress);
      
      const deformFactor = velocity * 0.15;
      groupRef.current.scale.set(1 + deformFactor, 1 - deformFactor, 1 + deformFactor);

      if (progress >= 1) {
        animationState.current = {
          phase: 'settling',
          startTime: performance.now(),
          startRotation: groupRef.current.rotation.clone(),
        };
      }
    } else if (phase === 'settling') {
      const progress = Math.min(elapsedTime / SETTLE_DURATION, 1);
      // El objetivo es la rotación que guardamos antes de que comenzara la animación
      const targetRotationY = initialRotationY.current;
      
      const displacement = (startRotation.y - targetRotationY) * Math.exp(-progress * 5) * Math.cos(progress * Math.PI * 2.5);
      groupRef.current.rotation.y = targetRotationY + displacement;

      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);

      if (progress >= 1) {
        animationState.current = { phase: 'idle', startTime: 0, startRotation: new THREE.Euler() };
        groupRef.current.rotation.y = targetRotationY; // Asegura que la posición final sea exacta
        groupRef.current.scale.set(1, 1, 1);
        idleTime.current = 0; // Reinicia el temporizador de inactividad

        const video = texture.source.data as HTMLVideoElement;
        video.currentTime = 0;
        video.play();
      }
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
        <Model 
          videoPath={videoSrc} 
          position={[0, -10, 0]} 
          scale={1.2} 
          rotation-y={-0.4} // Rotación inicial cambiada
        />
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