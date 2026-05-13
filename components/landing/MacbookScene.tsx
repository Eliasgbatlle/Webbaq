"use client";

import * as THREE from 'three'
import React, { Suspense, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useVideoTexture, OrbitControls } from '@react-three/drei'

function Model({ videoPath, ...props }: { videoPath: string, [key: string]: any }) {
  const { scene } = useGLTF('/3d/Macbook.glb')
  
  const texture = useVideoTexture(videoPath)
  texture.flipY = false

  const screenMaterial = useMemo(() => new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }), [texture]);

  useEffect(() => {
    scene.traverse((child) => {
      // Corregido: Usando el nombre correcto de la malla de la pantalla: 'VQmfhbMzfNAuKAD'
      if ((child as THREE.Mesh).isMesh && child.name === 'VQmfhbMzfNAuKAD') {
        child.material = screenMaterial;
      }
    });
  }, [scene, screenMaterial]);

  return <primitive object={scene} {...props} />
}

export function MacbookScene() {
  const videoSrc = "/videos/Ejkpop.mp4";

  return (
    <Canvas camera={{ position: [0, 0, 60], fov: 50 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Suspense fallback={null}>
        <Model videoPath={videoSrc} position={[0, -1.4, 0]} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} minPolarAngle={Math.PI / 2.3} maxPolarAngle={Math.PI / 2.3} />
    </Canvas>
  );
}

useGLTF.preload('/3d/Macbook.glb');