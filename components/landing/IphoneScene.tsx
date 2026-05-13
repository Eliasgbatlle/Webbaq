"use client";

import * as THREE from 'three';
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei';

function Model(props: any) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/3d/iphone_12_pro.glb');
  
  const screenTexture = useTexture('/images/Compuservicios.png');

  // Set up texture properties for correct aspect ratio and scrolling
  useEffect(() => {
    const imageAspect = 390 / 9622;
    const screenAspect = 1170 / 2532; // iPhone 12 Pro screen aspect ratio

    screenTexture.flipY = false;
    // Use ClampToEdgeWrapping to prevent the texture from repeating at the edges.
    screenTexture.wrapS = THREE.ClampToEdgeWrapping;
    screenTexture.wrapT = THREE.ClampToEdgeWrapping;
    
    // To prevent distortion, the aspect ratio of the texture part we display
    // must match the aspect ratio of the screen mesh.
    // So, repeat.y = imageAspect / screenAspect.
    screenTexture.repeat.set(1, imageAspect / screenAspect);

    // Start the scroll from the top of the image.
    // The visible V-coordinates are from offset.y to offset.y + repeat.y.
    // To show the top part (V from 1-repeat.y to 1), offset.y must be 1-repeat.y.
    screenTexture.offset.y = 1 - screenTexture.repeat.y;

  }, [screenTexture]);

  // Create the material for the screen
  const screenMaterial = new THREE.MeshBasicMaterial({
    map: screenTexture,
    toneMapped: false,
  });

  // Asignar el material a la pantalla del modelo
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh && child.name === 'Screen_Wallpaper_0') {
      child.material = screenMaterial;
    }
  });

  // Animación de scroll en la textura y flotación del teléfono
  useFrame((state, delta) => {
    // Animación de scroll
    const scrollSpeed = 0.02;
    const scrollRange = 1 - screenTexture.repeat.y;
    
    if (scrollRange > 0) {
      // Decrease offset to scroll "down" the image (from top to bottom).
      screenTexture.offset.y -= scrollSpeed * delta;
      // When we scroll past the bottom (offset < 0), loop back to the top.
      if (screenTexture.offset.y < 0) {
        screenTexture.offset.y = scrollRange;
      }
    }

    // Animación sutil de flotación
    if (groupRef.current) {
      // La posición base es -50, y flota +/- 5 unidades
      groupRef.current.position.y = -50 + Math.sin(state.clock.elapsedTime * 0.5) * 5;
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
      camera={{ position: [0, 0, 150], fov: 70 }}
      dpr={[1, 2]}
      style={{ pointerEvents: 'none' }}
      gl={{ alpha: true }} // Habilitar canal alfa para transparencia
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)} // Establecer fondo transparente
    >
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 5]} intensity={3} />
      <Suspense fallback={null}>
        <Model scale={1.2} position={[0, -50, 0]} rotation={[0, -0.2,0]} />
      </Suspense>
      <OrbitControls 
        enabled={false}
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}

// Precargar los assets para una carga más rápida
useGLTF.preload('/3d/iphone_12_pro.glb');
useTexture.preload('/images/Compuservicios.png');