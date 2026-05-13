"use client";

import * as THREE from 'three';
import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei';

function Model(props: any) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/3d/iphone_12_pro.glb');
  const { gl } = useThree();

  const texture = useTexture('/images/Compuservicios.png');

  // CONFIGURACIÓN DE TEXTURA
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
  }, [texture]);

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
    texture.offset.y += delta * 0.025; // Velocidad reducida
    if (texture.offset.y > 1) {
      texture.offset.y = 0;
    }

    if (groupRef.current) {
      // Animación sutil de flotación vertical con menor amplitud
      groupRef.current.position.y =
        -60 + Math.sin(state.clock.elapsedTime * 0.5) * 2;
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
      camera={{ position: [0, 0, 100], fov: 70 }}
      dpr={[1, 1.5]} // Optimizado
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
          position={[0, -60, 0]}
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