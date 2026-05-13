"use client";

import * as THREE from 'three';
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei';

function Model(props: any) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/3d/iphone_12_pro.glb');
  
  // Cargar la textura de la pantalla con la imagen correcta
  const screenTexture = useTexture('/images/Compuservicios.png');
  screenTexture.flipY = false; // La textura GLB no necesita ser volteada
  screenTexture.wrapT = THREE.RepeatWrapping; // Permitir que la textura se repita verticalmente

  // Crear el material para la pantalla
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
    screenTexture.offset.y -= delta * 0.05;
    if (screenTexture.offset.y < -1) {
      screenTexture.offset.y = 0;
    }

    // Animación sutil de flotación
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
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
        <Model scale={1.2} position={[0, -50, 0]} rotation={[0.1, -0.2, 0.05]} />
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