"use client";

import * as THREE from 'three'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useVideoTexture, OrbitControls } from '@react-three/drei'

function Model({ videoPath, ...props }: { videoPath: string, [key: string]: any }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/3d/Macbook.glb')
  const { viewport } = useThree();
  
  const texture = useVideoTexture(videoPath, { loop: false })
  texture.flipY = false

  const screenMaterial = useMemo(() => new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }), [texture]);

  const [isRotating, setIsRotating] = useState(false);

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
      setIsRotating(true);
    };

    video.addEventListener('ended', onVideoEnd);
    return () => video.removeEventListener('ended', onVideoEnd);
  }, [texture.source.data]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Posiciona el modelo a la derecha en pantallas grandes
    const isDesktop = viewport.width > 4; // Aprox 768px
    groupRef.current.position.x = isDesktop ? viewport.width / 4.5 : 0;


    if (isRotating) {
      const rotationSpeed = Math.PI * 2;
      groupRef.current.rotation.y += rotationSpeed * delta;

      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;

      if (groupRef.current.rotation.y >= Math.PI * 6) {
        groupRef.current.rotation.y = 0;
        setIsRotating(false);
        
        const video = texture.source.data as HTMLVideoElement;
        video.currentTime = 0;
        video.play();
      }
    } else {
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
    <Canvas camera={{ position: [0, 0, 80], fov: 50 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Suspense fallback={null}>
        <Model videoPath={videoSrc} position={[0, -10, 0]} scale={1.2} />
      </Suspense>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        minPolarAngle={Math.PI / 2.3} 
        maxPolarAngle={Math.PI / 2.3} 
      />
    </Canvas>
  );
}

useGLTF.preload('/3d/Macbook.glb');