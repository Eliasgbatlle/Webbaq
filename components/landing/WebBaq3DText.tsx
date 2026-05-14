"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

function TextScene() {
  const textRef = useRef<any>();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (textRef.current) {
      // Rotación lenta en el eje Y
      textRef.current.rotation.y = Math.sin(time * 0.4) * 0.5;
      // Movimiento suave hacia arriba y abajo
      textRef.current.position.y = Math.sin(time * 0.8) * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-5, -5, 5]} intensity={800} color="#10b981" />
      
      <Text
        ref={textRef}
        fontSize={1.5}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
        // Usando la fuente por defecto (Inter) ya que no podemos cargar fuentes del proyecto fácilmente aquí
      >
        WebBAQ
      </Text>
    </>
  );
}

export function WebBaq3DText() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <TextScene />
    </Canvas>
  );
}