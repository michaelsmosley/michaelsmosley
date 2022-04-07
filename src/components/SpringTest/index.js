// import React from "react";
// import { useSpring, animated } from "react-spring";
// export default function App() {
//   const props = useSpring({
//     to: async (next, cancel) => {
//       await next({ opacity: 1, color: "#ffaaee" });
//       await next({ opacity: 0, color: "rgb(14,26,19)" });
//     },
//     from: { opacity: 0, color: "red" }
//   });
//   return (
//     <>
//       <animated.div style={props}>i will fade</animated.div>
//     </>
//   );
// }

import React, { useState, useContext } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import { a, useSpring, useSprings } from '@react-spring/three'
import Context from '../../context';

export default function SpringTest() {
  const [mousedown, setMousedown] = useState(false)
  const [{ z }] = useSpring(() => ({ to: { z: mousedown ? 0 : -0.5 } }), [mousedown])
  const [springs] = useSprings(
    3,
    (i) => ({
      config: { mass: (1 + i) * 2, friction: (3 - i) * 10 },
      to: { position: [mousedown ? 0.5 : -0.5, i * 2 - 2 + 1, 0], 'material-color': mousedown ? '#272730' : 'hotpink' }
    }),
    [mousedown]
  )

    const context = useContext(Context)
  console.log("SpringTest context",context)
  
  return (
    <Canvas colorManagement invalidateFrameloop pixelRatio={window.devicePixelRatio} camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} color="red" />
      {springs.map((props, index) => (
        <a.mesh {...props} key={index}>
          <sphereBufferGeometry attach="geometry" args={[0.4, 20, 20]} />
          <meshPhysicalMaterial transmission={0.2} attach="material" clearcoat={1} clearcoatRoughness={0} />
        </a.mesh>
      ))}
      <a.mesh position-x={1} position-z={z} onPointerDown={(e) => setMousedown(true)} onPointerUp={(e) => setMousedown(false)}>
        <sphereBufferGeometry attach="geometry" args={[0.4, 20, 20]} />
        <meshPhysicalMaterial transmission={0.2} color={'red'} attach="material" />
      </a.mesh>
      <OrbitControls />
    </Canvas>
  )
}
