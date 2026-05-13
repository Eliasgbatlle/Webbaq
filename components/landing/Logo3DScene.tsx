"use client";

import * as THREE from 'three';
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, OrbitControls } from '@react-three/drei';

function LogoText() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Center>
      <Text3D
        ref={ref}
        height={5}
        size={20}
        bevelEnabled
        bevelThickness={1}
        bevelSize={0.5}
      >
        WebBAQ
        <meshStandardMaterial
          color="#10b981"
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </Center>
  );
}

export function Logo3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 80], fov: 50 }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: 'none' }}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 5]} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#10b981" />

      <Suspense fallback={null}>
        <LogoText />
      </Suspense>

      <OrbitControls 
        enabled={false}
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}