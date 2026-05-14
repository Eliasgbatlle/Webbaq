"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// A single animated letter
function AnimatedLetter({ char, index, totalLetters }: { char: string, index: number, totalLetters: number }) {
  const ref = useRef<any>();
  
  const initialPosition = useMemo(() => new THREE.Vector3(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 5,
    (Math.random() - 0.5) * 10
  ), []);

  const targetPosition = useMemo(() => new THREE.Vector3(
    (index - (totalLetters - 1) / 2) * 1.8,
    0,
    0
  ), [index, totalLetters]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();
    
    // Animate from initial to target position over time
    const settleTime = 2; // Time in seconds when animation starts to settle
    const settleDuration = 4; // Duration of settling
    
    let progress = 0;
    if (time > settleTime) {
      progress = Math.min((time - settleTime) / settleDuration, 1);
      progress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
    }

    if (progress < 1) {
      // Chaotic movement before settling
      const t = time * 0.5 + index * 0.8;
      const chaoticPos = new THREE.Vector3(
        initialPosition.x + Math.sin(t) * 2,
        initialPosition.y + Math.cos(t * 1.2) * 2,
        initialPosition.z + Math.sin(t * 1.5) * 2
      );
      
      const currentPos = new THREE.Vector3().lerpVectors(chaoticPos, targetPosition, progress);
      ref.current.position.lerp(currentPos, 0.1);

      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, Math.sin(t) * 0.5, 0.05);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, Math.cos(t) * 0.5, 0.05);

    } else {
      // Settle into final position
      ref.current.position.lerp(targetPosition, 0.1);
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0, 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0, 0.1);
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, 0, 0.1);
    }
  });

  return (
    <Text
      ref={ref}
      fontSize={1.5}
      anchorX="center"
      anchorY="middle"
      position={initialPosition}
    >
      {char}
      <meshStandardMaterial
        color="#10b981"
        metalness={0.8}
        roughness={0.2}
        emissive="#052e21"
        emissiveIntensity={0.5}
      />
    </Text>
  );
}

function TextScene() {
  const text = "WebBAQ";
  const letters = text.split('');

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={1.5} />
      <pointLight position={[-10, -10, 10]} intensity={300} color="#10b981" />
      <pointLight position={[10, 10, -5]} intensity={200} color="#ffffff" />
      
      <group>
        {letters.map((char, index) => (
          <AnimatedLetter key={index} char={char} index={index} totalLetters={letters.length} />
        ))}
      </group>
    </>
  );
}

export function WebBaq3DText() {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
      <TextScene />
    </Canvas>
  );
}