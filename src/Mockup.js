import React, { useState } from 'react';

const Mockup = () => {
  const [selectedFloor, setSelectedFloor] = useState('/assets/marble-floor-2.jpg');
  
  const floorOptions = [
    {
      id: 'marble1',
      name: 'Marble Classic',
      image: '/assets/marble-floor-2.jpg'
    },
    {
      id: 'marble2', 
      name: 'Marble Modern',
      image: '/assets/marble-floor-.jpeg'
    },
    {
      id: 'marble3',
      name: 'Marble Luxury', 
      image: '/assets/marblefloor3.jpg'
    },
    {
      id: 'special',
      name: 'Special Pattern',
      image: '/assets/awfgazdg.jpeg'
    }
  ];

  const liftStyle = {
    width: '350px',
    height: '350px',
    margin: '20px auto',
    position: 'relative',
    transform: 'perspective(1200px) rotateX(-35deg) rotateY(15deg)',
    transformStyle: 'preserve-3d'
  };

  const liftBoxStyle = {
    width: '300px',
    height: '300px',
    position: 'relative',
    transformStyle: 'preserve-3d'
  };

  // Base wall style for transparent walls
  const baseWallStyle = {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'rgba(230, 230, 230, 0.4)',
    border: '2px solid rgba(255,255,255,0.6)',
    transformOrigin: 'center top',
    bottom: '0px'
  };

  // Back Wall with steel base
  const backWallStyle = {
    ...baseWallStyle,
    transform: 'translateZ(-150px) translateY(-150px)',
    background: 'rgba(200, 200, 200, 0.8)'
  };

  // Steel side panels for back wall
  const backSteelPanelStyle = {
    position: 'absolute',
    width: '54px', // 18% of 300px
    height: '300px',
    backgroundImage: 'url(/assets/side.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  // Mirror panel style for back wall (6 mirrors in 3x2 grid)
  const mirrorPanelStyle = {
    position: 'absolute',
    width: '64px', // 192px / 3 = 64px each
    height: '150px', // 300px / 2 = 150px each
    backgroundImage: 'url(/assets/mirror.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '1px solid rgba(255,255,255,0.3)'
  };

  // Left Side Wall - transparent
  const leftWallStyle = {
    ...baseWallStyle,
    width: '300px',
    transform: 'rotateY(-90deg) translateZ(150px) translateY(-150px)'
  };

  // Right Side Wall with steel base
  const rightWallStyle = {
    ...baseWallStyle,
    width: '300px',
    transform: 'rotateY(90deg) translateZ(150px) translateY(-150px)',
    background: 'rgba(200, 200, 200, 0.8)',
    backgroundImage: 'url(/assets/side.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  // Steel panel elements for right wall
  const rightSteelPanelStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%', // Full height - stretched
    backgroundImage: 'url(/assets/side.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '1px solid rgba(255,255,255,0.2)'
  };

  // Front Left Door Frame - transparent
  const frontLeftDoorFrameStyle = {
    ...baseWallStyle,
    width: '60px',
    transform: 'translateZ(150px) translateY(-150px)',
    left: '0px'
  };

  // Front Right Door Frame - transparent
  const frontRightDoorFrameStyle = {
    ...baseWallStyle,
    width: '60px',
    transform: 'translateZ(150px) translateY(-150px)',
    right: '0px'
  };

  // Floor
  const floorStyle = {
    position: 'absolute',
    width: '300px',
    height: '300px',
    backgroundImage: `url(${selectedFloor})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transform: 'rotateX(-90deg) translateZ(0px)',
    transformOrigin: 'center center',
    border: '2px solid rgba(255,255,255,0.9)',
    boxShadow: '0 0 30px rgba(0,0,0,0.3)',
    borderRadius: '0px',
    bottom: '0px'
  };

  // Steel panel style for right wall
  const steelPanelStyle = {
    position: 'absolute',
    width: '100%',
    height: '100px', // 300px / 3 = 100px for 3 panels
    backgroundImage: 'url(/assets/side.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  const selectorStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '30px',
    flexWrap: 'wrap',
    perspective: '1000px'
  };

  const optionStyle = {
    padding: '10px 15px',
    borderRadius: '8px',
    border: '2px solid rgba(255,255,255,0.3)',
    background: 'rgba(255,255,255,0.9)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    minWidth: '120px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  };

  const selectedOptionStyle = {
    ...optionStyle,
    border: '2px solid #007bff',
    background: 'rgba(231, 243, 255, 0.95)',
    transform: 'scale(1.05) translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0,123,255,0.3)'
  };

  const previewStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '0 auto 8px',
    border: '2px solid #eee'
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: 'white',
        marginBottom: '60px',
        fontSize: '28px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        Lift Floor Customizer
      </h2>
      
      {/* Elevator Structure */}
      <div style={liftStyle}>
        <div style={liftBoxStyle}>
          {/* Back Wall with steel sides and 6 mirrors */}
          <div style={backWallStyle}>
            {/* Left steel panel */}
            <div style={{...backSteelPanelStyle, left: '0px'}}></div>
            
            {/* Right steel panel */}
            <div style={{...backSteelPanelStyle, right: '0px'}}></div>
            
            {/* 6 mirrors in 3x2 grid */}
            {/* Top row */}
            <div style={{...mirrorPanelStyle, top: '0px', left: '54px'}}></div>
            <div style={{...mirrorPanelStyle, top: '0px', left: '118px'}}></div>
            <div style={{...mirrorPanelStyle, top: '0px', left: '182px'}}></div>
            
            {/* Bottom row */}
            <div style={{...mirrorPanelStyle, top: '150px', left: '54px'}}></div>
            <div style={{...mirrorPanelStyle, top: '150px', left: '118px'}}></div>
            <div style={{...mirrorPanelStyle, top: '150px', left: '182px'}}></div>
          </div>
          
          {/* Left Side Wall - transparent */}
          <div style={leftWallStyle}></div>
          
          {/* Right Side Wall with steel base and 1 stretched panel */}
          <div style={rightWallStyle}>
            <div style={{...rightSteelPanelStyle, top: '0px'}}></div>
          </div>
          
          {/* Front Door Frames - transparent */}
          <div style={frontLeftDoorFrameStyle}></div>
          <div style={frontRightDoorFrameStyle}></div>
          
          {/* Floor */}
          <div style={floorStyle}></div>
        </div>
      </div>

      {/* Floor Selection */}
      <div style={selectorStyle}>
        {floorOptions.map((floor) => (
          <div
            key={floor.id}
            style={selectedFloor === floor.image ? selectedOptionStyle : optionStyle}
            onClick={() => setSelectedFloor(floor.image)}
          >
            <div 
              style={{
                ...previewStyle,
                backgroundImage: `url(${floor.image})`
              }}
            ></div>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {floor.name}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{
        textAlign: 'center',
        marginTop: '15px',
        color: 'white',
        fontSize: '14px'
      }}>
        Click on a floor style to see it applied to the lift
      </div>
    </div>
  );
};

export default Mockup;