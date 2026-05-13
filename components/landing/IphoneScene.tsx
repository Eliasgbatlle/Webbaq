"use client";

import * as THREE from 'three'
import React, { Suspense, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei'

function Model(props: any) {
  const groupRef = useRef<THREE.Group>(null);
  // Asumo que el modelo 3D está en la carpeta /public/3d/
  const { scene } = useGLTF('/3d/iphone_12_pro.glb')
  
  // Asumo que la imagen está en la carpeta /public/images/
  const texture = useTexture('/images/Compuservicios.png')
  texture.flipY = false;
  
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);

  const screenMaterial = useMemo(() => new THREE.MeshStandardMaterial({ map: texture, toneMapped: false }), [texture]);

  useEffect(() => {
    scene.traverse((child) => {
      // Buscamos el material de la pantalla por su nombre, 'Display' es común.
      if ((child as THREE.Mesh).isMesh && child.material.name === 'Display') {
        child.material = screenMaterial;
      }
    });
  }, [scene, screenMaterial]);

  useFrame((state, delta) => {
    // Animación de scroll en la textura
    texture.offset.y -= delta * 0.05; 
    if (texture.offset.y < -0.7) { 
        texture.offset.y = 0;
    }

    // Animación suave de flotación
    if (groupRef.current) {
        const t = state.clock.getElapsedTime();
        groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;
        groupRef.current.rotation.y = Math.cos(t * 0.3) * 0.1;
        groupRef.current.position.y = Math.sin(t * 0.7) * 0.2;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <primitive object={scene} />
    </group>
  );
}

export function IphoneScene() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 15], fov: 30 }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 5]} intensity={3} />
      <Suspense fallback={null}>
        <Model scale={1.2} />
      </Suspense>
      <OrbitControls 
        enabled={false}
        enableZoom={false} 
        enablePan={false} 
      />
    </Canvas>
  );
}

useGLTF.preload('/3d/iphone_12_pro.glb');