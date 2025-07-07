import React, { useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

// Lift Interior Component
function LiftInterior() {
  const liftRef = useRef();
  
  // Load textures
  const floorTexture = useLoader(THREE.TextureLoader, '/assets/floor/awfgazdg.jpeg');
  const mirrorTexture = useLoader(THREE.TextureLoader, '/assets/mirror/mirror-2.jpg');
  const sideTexture = useLoader(THREE.TextureLoader, '/assets/side/side-1.jpg');
  
  // Configure texture properties
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(1, 1);
  
  mirrorTexture.wrapS = mirrorTexture.wrapT = THREE.RepeatWrapping;
  mirrorTexture.repeat.set(1, 1);
  
  sideTexture.wrapS = sideTexture.wrapT = THREE.RepeatWrapping;
  sideTexture.repeat.set(1, 1);

  // Create materials
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 0.3,
  });

  const mirrorMaterial = new THREE.MeshStandardMaterial({
    map: mirrorTexture,
    metalness: 0.8,
    roughness: 0.1,
  });

  const sideMaterial = new THREE.MeshStandardMaterial({
    map: sideTexture,
    roughness: 0.4,
  });

  return (
    <group ref={liftRef} position={[0, 0, 0]}>
      {/* Floor */}
      <Box args={[6, 0.1, 6]} position={[0, -2.95, 0]} material={floorMaterial} />

      {/* Ceiling (same texture as floor) */}
      <Box args={[6, 0.1, 6]} position={[0, 2.95, 0]} material={floorMaterial} />

      {/* Back Wall */}
      <group position={[0, 0, -3]}>
        {/* Steel side panels */}
        <Box args={[1, 6, 0.1]} position={[-2.5, 0, 0]} material={sideMaterial} />
        <Box args={[1, 6, 0.1]} position={[2.5, 0, 0]} material={sideMaterial} />
        
        {/* Mirror panels in 3x2 grid */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => 
          [1, -1].map((y, j) => (
            <Box 
              key={`back-mirror-${i}-${j}`}
              args={[0.9, 2.8, 0.05]} 
              position={[x, y * 1.4, 0.05]} 
              material={mirrorMaterial}
            />
          ))
        )}
      </group>

      {/* Right Wall */}
      <group position={[3, 0, 0]} rotation={[0, -Math.PI/2, 0]}>
        {/* Steel side panels */}
        <Box args={[1, 6, 0.1]} position={[-2.5, 0, 0]} material={sideMaterial} />
        <Box args={[1, 6, 0.1]} position={[2.5, 0, 0]} material={sideMaterial} />
        
        {/* Mirror panels */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => 
          [1, -1].map((y, j) => (
            <Box 
              key={`right-mirror-${i}-${j}`}
              args={[0.9, 2.8, 0.05]} 
              position={[x, y * 1.4, 0.05]} 
              material={mirrorMaterial}
            />
          ))
        )}
      </group>

      {/* Left Wall */}
      <group position={[-3, 0, 0]} rotation={[0, Math.PI/2, 0]}>
        {/* Steel side panels */}
        <Box args={[1, 6, 0.1]} position={[-2.5, 0, 0]} material={sideMaterial} />
        <Box args={[1, 6, 0.1]} position={[2.5, 0, 0]} material={sideMaterial} />
        
        {/* Mirror panels */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => 
          [1, -1].map((y, j) => (
            <Box 
              key={`left-mirror-${i}-${j}`}
              args={[0.9, 2.8, 0.05]} 
              position={[x, y * 1.4, 0.05]} 
              material={mirrorMaterial}
            />
          ))
        )}
      </group>

      {/* Front Wall - Open (door opening) */}
      <group position={[0, 0, 3]}>
        {/* Only door frame side panels */}
        <Box args={[1.2, 6, 0.1]} position={[-2.4, 0, 0]} material={sideMaterial} />
        <Box args={[1.2, 6, 0.1]} position={[2.4, 0, 0]} material={sideMaterial} />
        {/* Center is open for visibility */}
      </group>
    </group>
  );
}

export default function App() {
  const infoStyle = {
    position: 'absolute',
    bottom: '30px',
    left: '30px',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: '15px',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'monospace',
  };

  const titleStyle = {
    position: 'absolute',
    top: '30px',
    left: '30px',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Title */}
      <div style={titleStyle}>
        3D Lift Interior
      </div>

      {/* Controls Info */}
      <div style={infoStyle}>
        <div><strong>Controls:</strong></div>
        <div>🖱️ Drag: Rotate view</div>
        <div>🔍 Scroll: Zoom</div>
        <div>🎯 Right-click + drag: Pan</div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ 
          position: [8, 6, 10], 
          fov: 60 
        }}
      >
        {/* Basic lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.8} 
        />
        
        {/* Lift Model */}
        <LiftInterior />
        
        {/* Ground plane for reference */}
        <Plane args={[20, 20]} position={[0, -6, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <meshStandardMaterial color="#444" transparent opacity={0.3} />
        </Plane>
        
        {/* Orbit Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          dampingFactor={0.1}
          enableDamping={true}
          minDistance={5}
          maxDistance={25}
          maxPolarAngle={Math.PI * 0.75}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}