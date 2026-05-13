"use client";

import * as THREE from 'three'
import React, { Suspense, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useVideoTexture, OrbitControls } from '@react-three/drei'

function Model({ videoPath, ...props }: { videoPath: string, [key: string]: any }) {
  const { scene } = useGLTF('/3d/Macbook.glb')
  
  const texture = useVideoTexture(videoPath)
  texture.flipY = false // Importante para modelos GLB

  const screenMaterial = useMemo(() => new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }), [texture]);

  useEffect(() => {
    scene.traverse((child) => {
      // Basado en tu captura, la malla de la pantalla es 'Cube_001'
      if ((child as THREE.Mesh).isMesh && child.name === 'Cube_001') {
        child.material = screenMaterial;
      }
    });
  }, [scene, screenMaterial]);

  // El objeto primitive renderizará todo el grafo de la escena
  return <primitive object={scene} {...props} />
}

export function MacbookScene() {
  // Asumo que la extensión del video es .mp4. Si es otra, hay que cambiarla aquí.
  const videoSrc = "/videos/Ejkpop.mp4";

  return (
    <Canvas camera={{ position: [0, 1.5, 12], fov: 35 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Suspense fallback={null}>
        <Model videoPath={videoSrc} position={[0, -1.2, 0]} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
    </Canvas>
  );
}

useGLTF.preload('/3d/Macbook.glb');