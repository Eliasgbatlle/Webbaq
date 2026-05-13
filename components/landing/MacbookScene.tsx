"use client";

import * as THREE from 'three'
import React, { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useVideoTexture, OrbitControls } from '@react-three/drei'
import { EffectComposer, MotionBlur } from '@react-three/postprocessing'

function Model({ videoPath, motionBlurRef, ...props }: { videoPath: string, motionBlurRef: React.RefObject<any>, [key: string]: any }) {
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

  useFrame((state) => {
    if (!groupRef.current || !motionBlurRef.current) return;

    const { phase, startTime, startRotation } = animationState.current;
    const isDesktop = viewport.width > 4;
    groupRef.current.position.x = isDesktop ? viewport.width / 4.5 : 0;

    if (phase === 'idle') {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.x = Math.sin(t * 2) * 0.015;
      groupRef.current.rotation.z = Math.cos(t * 3) * 0.01;
      motionBlurRef.current.intensity = 0;
      groupRef.current.scale.set(1, 1, 1);
      return;
    }

    const elapsedTime = performance.now() - startTime;

    const ANTICIPATION_DURATION = 300;
    const SPIN_DURATION = 1200;
    const SETTLE_DURATION = 500;

    if (phase === 'anticipating') {
      const progress = Math.min(elapsedTime / ANTICIPATION_DURATION, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOut
      groupRef.current.rotation.y = startRotation.y - easedProgress * 0.3; // Gira un poco hacia atrás

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
      const overshootAngle = 0.4;
      groupRef.current.rotation.y = startRotation.y + easedProgress * (totalRotation + overshootAngle);

      // Calcular velocidad para deformación y motion blur (derivada de la curva de easing)
      const velocity = Math.sin(Math.PI * progress);
      
      // Aplicar Motion Blur
      motionBlurRef.current.intensity = velocity * 2.5;

      // Aplicar deformación (Squash and Stretch)
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
      const finalRotationY = startRotation.y - overshootAngle;
      
      // Spring-like settle animation
      const displacement = (startRotation.y - finalRotationY) * Math.exp(-progress * 5) * Math.cos(progress * Math.PI * 2.5);
      groupRef.current.rotation.y = finalRotationY + displacement;

      // Resetear efectos
      motionBlurRef.current.intensity *= (1 - progress);
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);

      if (progress >= 1) {
        animationState.current = { phase: 'idle', startTime: 0, startRotation: new THREE.Euler() };
        groupRef.current.rotation.y = finalRotationY; // Asegurar posición final
        groupRef.current.scale.set(1, 1, 1);
        motionBlurRef.current.intensity = 0;

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
  const motionBlurRef = useRef<any>(null);

  return (
    <Canvas 
      camera={{ position: [0, 0, 80], fov: 50 }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Suspense fallback={null}>
        <EffectComposer>
          <Model 
            videoPath={videoSrc} 
            position={[0, -10, 0]} 
            scale={1.2} 
            rotation-y={0.4} // Rotación inicial hacia la izquierda
            motionBlurRef={motionBlurRef} 
          />
          <MotionBlur ref={motionBlurRef} intensity={0} />
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