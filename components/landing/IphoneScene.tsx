"use client";

import * as THREE from 'three';
import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei';

function Model(props: any) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/3d/iphone_12_pro.glb');

  const texture = useTexture('/images/Compuservicios.png');

  // CONFIGURACIÓN DE TEXTURA
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;
    texture.needsUpdate = true;

    texture.repeat.set(1, imageAspect / screenAspect);

    texture.offset.y = 1 - texture.repeat.y;

    texture.needsUpdate = true;
  }, [texture]);

  // MATERIAL IGUAL A MACBOOK
  const screenMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: texture,
        toneMapped: false,
      }),
    [texture]
  );

  // ASIGNAR MATERIAL
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
    const scrollSpeed = 0.02;
    const scrollRange = 1 - texture.repeat.y;

    if (scrollRange > 0) {
      texture.offset.y -= scrollSpeed * delta;

      if (texture.offset.y < 0) {
        texture.offset.y = scrollRange;
      }
    }

    if (groupRef.current) {
      groupRef.current.position.y =
        -50 + Math.sin(state.clock.elapsedTime * 0.5) * 5;

      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.015;

      groupRef.current.rotation.z =
        Math.cos(state.clock.elapsedTime * 0.5) * 0.01;
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
      dpr={[1, 1.5]}
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