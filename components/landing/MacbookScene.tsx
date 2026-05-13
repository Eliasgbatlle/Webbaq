"use client";

import * as THREE from 'three'
import React, { Suspense, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useVideoTexture, OrbitControls } from '@react-three/drei'

function Model({ videoPath, ...props }: { videoPath: string, [key: string]: any }) {
  const { scene } = useGLTF('/3d/Macbook.glb')
  
  const texture = useVideoTexture(videoPath)
  texture.flipY = false

  const screenMaterial = useMemo(() => {
    console.log("Creando material de video. Textura:", texture);
    return new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
  }, [texture]);

  useEffect(() => {
    let screenFound = false;
    console.log("Recorriendo la escena 3D para encontrar la pantalla...");
    scene.traverse((child) => {
      // Imprimimos cada parte del modelo para encontrar el nombre correcto de la pantalla
      console.log("Nodo encontrado:", child.name, "| Tipo:", child.type);
      if ((child as THREE.Mesh).isMesh && child.name === 'Cube_001') {
        console.log("¡PANTALLA ENCONTRADA! Aplicando material de video a:", child.name);
        child.material = screenMaterial;
        screenFound = true;
      }
    });
    if (!screenFound) {
      console.error("ERROR: No se encontró la malla de la pantalla con el nombre 'Cube_001'. Por favor, revisa la consola para ver la lista de nodos y encontrar el nombre correcto.");
    }
  }, [scene, screenMaterial]);

  return <primitive object={scene} {...props} />
}

export function MacbookScene() {
  const videoSrc = "/videos/Ejkpop.mp4";
  console.log("Intentando cargar video desde la ruta pública:", videoSrc);

  return (
    <Canvas camera={{ position: [0, 0, 14], fov: 30 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Suspense fallback={null}>
        <Model videoPath={videoSrc} position={[0, -1.4, 0]} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} minPolarAngle={Math.PI / 2.3} maxPolarAngle={Math.PI / 2.3} />
    </Canvas>
  );
}

useGLTF.preload('/3d/Macbook.glb');