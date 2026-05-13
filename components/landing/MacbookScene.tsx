"use client";

import * as THREE from 'three'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useVideoTexture, OrbitControls } from '@react-three/drei'

function Model({ videoPath, ...props }: { videoPath: string, [key: string]: any }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/3d/Macbook.glb')
  
  // Le quitamos el loop al video para que el evento 'ended' se dispare
  const texture = useVideoTexture(videoPath, { loop: false })
  texture.flipY = false

  const screenMaterial = useMemo(() => new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }), [texture]);

  // Estado para controlar la animación de rotación
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.name === 'VQmfhbMzfNAuKAD') {
        child.material = screenMaterial;
      }
    });
  }, [scene, screenMaterial]);

  // Hook para detectar el final del video
  useEffect(() => {
    const video = texture.source.data as HTMLVideoElement;
    if (!video) return;

    const onVideoEnd = () => {
      setIsRotating(true); // Inicia la rotación cuando el video termina
    };

    video.addEventListener('ended', onVideoEnd);
    return () => video.removeEventListener('ended', onVideoEnd);
  }, [texture.source.data]);

  // Hook para manejar las animaciones en cada frame
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isRotating) {
      // Lógica de rotación (3 vueltas)
      const rotationSpeed = Math.PI * 2; // 1 vuelta por segundo
      groupRef.current.rotation.y += rotationSpeed * delta;

      // Reseteamos el temblor
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;

      // Cuando completa las 3 vueltas (6 * PI)
      if (groupRef.current.rotation.y >= Math.PI * 6) {
        groupRef.current.rotation.y = 0; // Resetea la rotación
        setIsRotating(false); // Detiene la animación de rotación
        
        // Reinicia y reproduce el video
        const video = texture.source.data as HTMLVideoElement;
        video.currentTime = 0;
        video.play();
      }
    } else {
      // Lógica de temblor sutil (shake)
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.x = Math.sin(t * 2) * 0.015;
      groupRef.current.rotation.z = Math.cos(t * 3) * 0.01;
    }
  });

  // Envolvemos el modelo en un <group> para poder animarlo con el ref
  return (
    <group ref={groupRef} {...props}>
      <primitive object={scene} />
    </group>
  );
}

export function MacbookScene() {
  const videoSrc = "/videos/Ejkpop.mp4";

  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 50 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Suspense fallback={null}>
        <Model videoPath={videoSrc} position={[0, -1.4, 0]} />
      </Suspense>
      {/* Quitamos autoRotate y ajustamos los ángulos para que el usuario no pueda moverlo demasiado */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        minPolarAngle={Math.PI / 2.3} 
        maxPolarAngle={Math.PI / 2.3} 
      />
    </Canvas>
  );
}

useGLTF.preload('/3d/Macbook.glb');