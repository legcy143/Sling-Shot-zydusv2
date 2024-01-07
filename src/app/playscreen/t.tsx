import React, { useState, useEffect } from 'react';

const AccelerometerComponent = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
      return () => {
        window.removeEventListener('devicemotion', handleMotion);
      };
    } else {
      console.log('DeviceMotionEvent not supported');
    }
  }, []);

  const handleMotion = (event:any) => {
    const { accelerationIncludingGravity } = event;
    setAcceleration({
      x: accelerationIncludingGravity.x,
      y: accelerationIncludingGravity.y,
      z: accelerationIncludingGravity.z,
    });
  };

  return (
    <div>
      <h2>Accelerometer Data:</h2>
      <p>X-axis: {acceleration.x}</p>
      <p>Y-axis: {acceleration.y}</p>
      <p>Z-axis: {acceleration.z}</p>
    </div>
  );
};

export default AccelerometerComponent;