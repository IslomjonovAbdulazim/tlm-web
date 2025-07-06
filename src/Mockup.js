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
      image: '/assets/marble-floor-2.png'
    },
    {
      id: 'marble3',
      name: 'Marble Luxury', 
      image: '/assets/marblefloor3.jpg'
    },
    {
      id: 'special',
      name: 'Special Pattern',
      image: '/assets/awfgazdgh.png'
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

  // Back Wall  
  const backWallStyle = {
    position: 'absolute',
    width: '300px',
    height: '200px',
    background: 'rgba(230, 230, 230, 0.4)',
    border: '2px solid rgba(255,255,255,0.6)',
    transform: 'translateZ(-150px) translateY(-100px)',
    transformOrigin: 'center top',
    bottom: '0px'
  };

  // Left Side Wall (full wall)
  const leftDoorFrameStyle = {
    position: 'absolute',
    width: '300px', // Full depth  
    height: '200px',
    background: 'rgba(220, 220, 220, 0.4)',
    border: '2px solid rgba(255,255,255,0.6)',
    transform: 'rotateY(-90deg) translateZ(150px) translateY(-100px)',
    transformOrigin: 'center top',
    bottom: '0px'
  };

  // Right Side Wall (full wall)
  const rightDoorFrameStyle = {
    position: 'absolute',
    width: '300px', // Full depth
    height: '200px', 
    background: 'rgba(220, 220, 220, 0.4)',
    border: '2px solid rgba(255,255,255,0.6)',
    transform: 'rotateY(90deg) translateZ(150px) translateY(-100px)',
    transformOrigin: 'center top',
    bottom: '0px'
  };

  // Front Left Door Frame (20% of front)
  const frontLeftDoorFrameStyle = {
    position: 'absolute',
    width: '60px', // 20% of 300px
    height: '200px',
    background: 'rgba(210, 210, 210, 0.4)',
    border: '2px solid rgba(255,255,255,0.6)',
    transform: 'translateZ(150px) translateY(-100px)',
    transformOrigin: 'center top',
    left: '0px',
    bottom: '0px'
  };

  // Front Right Door Frame (20% of front)
  const frontRightDoorFrameStyle = {
    position: 'absolute',
    width: '60px', // 20% of 300px
    height: '200px',
    background: 'rgba(210, 210, 210, 0.4)',
    border: '2px solid rgba(255,255,255,0.6)',
    transform: 'translateZ(150px) translateY(-100px)',
    transformOrigin: 'center top',
    right: '0px',
    bottom: '0px'
  };

  // Floor - Fixed to be at bottom of walls
  const floorStyle = {
    position: 'absolute',
    width: '300px',
    height: '300px',
    backgroundImage: `url(${selectedFloor})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transform: 'rotateX(-90deg) translateZ(52px)',
    transformOrigin: 'center center',
    border: '2px solid rgba(255,255,255,0.9)',
    boxShadow: '0 0 30px rgba(0,0,0,0.3)',
    borderRadius: '0px',
    bottom: '0px'
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
      
      {/* Elevator with Door Frame - Back wall + side walls + front door frames + floor */}
      <div style={liftStyle}>
        <div style={liftBoxStyle}>
          {/* Back Wall */}
          <div style={backWallStyle}></div>
          
          {/* Side Walls - full walls */}
          <div style={leftDoorFrameStyle}></div>
          <div style={rightDoorFrameStyle}></div>
          
          {/* Front Door Frames - 20% left + 20% right, 60% open door in center */}
          <div style={frontLeftDoorFrameStyle}></div>
          <div style={frontRightDoorFrameStyle}></div>
          
          {/* Floor - Main focus */}
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