import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

// Loading component based on best practices
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        color: '#ffffff',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        background: 'rgba(0,0,0,0.8)',
        padding: '20px',
        borderRadius: '10px'
      }}>
        <div style={{
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #3498db',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 15px'
        }}></div>
        {Math.round(progress)}% loaded
      </div>
    </Html>
  );
}

// Merged model component - with better scaling and debug helpers
function Model() {
  const gltf = useGLTF('/assets/model.glb');
  
  // Debug: log model data and apply transformations
  React.useEffect(() => {
    if (gltf.scene) {
      console.log('Model loaded successfully:', gltf.scene);
      console.log('Model children:', gltf.scene.children.length);
      
      // Calculate bounding box for centering and scaling
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      
      console.log('Model dimensions:', size);
      console.log('Model center before adjustment:', center);
      console.log('Model size length:', size.length());
      
      // Better scaling logic - aim for size around 5-8 units
      const maxDimension = Math.max(size.x, size.y, size.z);
      console.log('Max dimension:', maxDimension);
      
      let scale = 1;
      if (maxDimension > 6) {
        scale = 8 / maxDimension;  // Target size of 8 units (bigger)
      } else if (maxDimension < 1) {
        scale = 5 / maxDimension;  // Make small models bigger
      }
      
      if (scale !== 1) {
        gltf.scene.scale.setScalar(scale);
        console.log('Applied scale:', scale);
        
        // Recalculate after scaling
        const newBox = new THREE.Box3().setFromObject(gltf.scene);
        const newCenter = newBox.getCenter(new THREE.Vector3());
        console.log('New center after scaling:', newCenter);
        
        // Center after scaling
        gltf.scene.position.set(-newCenter.x, -newCenter.y, -newCenter.z);
      } else {
        // Center without scaling
        gltf.scene.position.set(-center.x, -center.y, -center.z);
      }
      
      console.log('Model repositioned to center at origin');
      console.log('Final model position:', gltf.scene.position);
    }
  }, [gltf.scene]);
  
  return <primitive object={gltf.scene} />;
}

// Preload the model for better performance
useGLTF.preload('/assets/model.glb');

export default function App() {
  const [autoRotate, setAutoRotate] = useState(false);
  const controlsRef = useRef();

  const zoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.2);
      controlsRef.current.update();
    }
  };

  const zoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.2);
      controlsRef.current.update();
    }
  };

  const setCameraView = (position) => {
    if (controlsRef.current) {
      // Force target to center first
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.object.position.set(...position);
      controlsRef.current.object.lookAt(0, 0, 0);
      
      // Force update the view
      controlsRef.current.object.updateMatrixWorld();
      controlsRef.current.update();
    }
  };

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const buttonStyle = {
    background: 'rgba(255,255,255,0.9)',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    margin: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    transition: 'all 0.2s ease',
    minWidth: '50px',
    minHeight: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const activeButtonStyle = {
    ...buttonStyle,
    background: 'rgba(52, 152, 219, 0.9)',
    color: 'white'
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      fontFamily: 'Arial, sans-serif',
      background: '#1a1a1a'
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{
          color: 'white',
          margin: 0,
          fontSize: '28px',
          fontWeight: '300'
        }}>
          3D Model Viewer
        </h1>
      </div>

      {/* Control Panel */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* Zoom Controls */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '5px'
        }}>
          <button
            style={buttonStyle}
            onClick={zoomIn}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            title="Kattalashtirish"
          >
            🔍+
          </button>
          <button
            style={buttonStyle}
            onClick={zoomOut}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            title="Kichiklashtirish"
          >
            🔍-
          </button>
          <button
            style={buttonStyle}
            onClick={resetView}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            title="Boshlang'ich holat"
          >
            🏠
          </button>
        </div>
        
        {/* View Direction Controls */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '5px'
        }}>
          <button
            style={buttonStyle}
            onClick={() => setCameraView([0, 0, 10])}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            title="Old tomondan ko'rish"
          >
            ⬆️
          </button>
          <button
            style={buttonStyle}
            onClick={() => setCameraView([10, 0, 0])}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            title="O'ng tomondan ko'rish"
          >
            ➡️
          </button>
          <button
            style={buttonStyle}
            onClick={() => setCameraView([0, 0, -10])}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            title="Orqa tomondan ko'rish"
          >
            ⬇️
          </button>
          <button
            style={buttonStyle}
            onClick={() => setCameraView([-10, 0, 0])}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            title="Chap tomondan ko'rish"
          >
            ⬅️
          </button>
        </div>
        
        {/* Auto Rotate */}
        <button
          style={autoRotate ? activeButtonStyle : buttonStyle}
          onClick={() => setAutoRotate(!autoRotate)}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          title="Avtomatik aylantirish"
        >
          🔄
        </button>
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ 
          position: [15, 15, 15], 
          fov: 60 
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-10, 10, -5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[10, -10, 5]} intensity={0.5} />
        
        {/* Environment for realistic reflections */}
        <Environment preset="city" background={false} />
        
        {/* Model with Suspense loader */}
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
        
        {/* Orbit controls with panning enabled */}
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          dampingFactor={0.1}
          enableDamping={true}
          minDistance={2}
          maxDistance={100}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
          rotateSpeed={0.3}
          zoomSpeed={0.5}
          panSpeed={0.8}
          target={[0, 0, 0]}
        />
      </Canvas>

      {/* Controls info */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '14px',
        fontFamily: 'monospace'
      }}>
        <div>🖱️ Sudrab: Aylantirish</div>
        <div>🔍 Scroll: Zoom</div>
        <div>🖱️ Right-click + sudrab: Harakat</div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        body {
          margin: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

