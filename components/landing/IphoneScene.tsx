"use client";

import * as THREE from 'three';
import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei';

function Model(props: any) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/3d/iphone_12_pro.glb');
  const { gl } = useThree(); // Obtener el renderer para acceder a sus capacidades

  const texture = useTexture('/images/Compuservicios.png');

  // CONFIGURACIÓN DE TEXTURA
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;
    texture.wrapT = THREE.RepeatWrapping; // Habilitar repetición de textura para el scroll
    
    // Mejorar la calidad de la textura con filtrado anisotrópico
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
    texture.anisotropy = maxAnisotropy;

    texture.needsUpdate = true;
  }, [texture, gl]);

  // MATERIAL
  const screenMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: texture,
        toneMapped: false,
      }),
    [texture]
  );

  // ASIGNAR MATERIAL A LA PANTALLA
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        if (child.name === 'Screen_Wallpaper_0') {
          child.material = screenMaterial;
        }
      }
    });
  }, [scene, screenMaterial]);

  // ANIMACIONES
  useFrame((state, delta) => {
    // Animación de scroll en la textura (contenido se mueve hacia arriba)
    texture.offset.y += delta * 0.05;
    if (texture.offset.y > 1) {
      texture.offset.y = 0;
    }

    if (groupRef.current) {
      // Animación sutil de flotación vertical
      groupRef.current.position.y =
        -50 + Math.sin(state.clock.elapsedTime * 0.5) * 5;
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
      dpr={[1, 2]} // Aumentar el device pixel ratio para mayor nitidez
      style={{ pointerEvents: 'none' }}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      <Suspense fallback={null}>
        <Model
          scale={1.2}
          position={[0, -50, 0]}
          rotation={[0, -0.2, 0]}
        />
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
useTexture.preload('/images/Compuservicios.png');