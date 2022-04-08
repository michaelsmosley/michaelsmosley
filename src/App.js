import React, { useState, useRef } from "react";
import { Canvas, extend } from "@react-three/fiber";
import Context from "./context";
// import { useSpring, animated } from "react-spring";
// import * as THREE from "three";

import Sections from "./components/Sections";
import Floor from "./components/Floor";
import Button from "./components/Button";
import Menu from "./components/Menu";

// import myFont from './fonts/font3.json'
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Title from "./components/Title";

// import useRenderTarget from './utils/use-render-target'
// import { ThinFilmFresnelMap } from './utils/ThinFilmFresnelMap'
// import useSlerp from './utils/use-slerp'

// import "./app.css";
//useMatcapTexture,

import { OrbitControls } from "@react-three/drei";
// import { CircleBufferGeometry } from 'three';
extend({ TextGeometry });

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentSubSection, setCurrentSubSection] = useState(0);

  const [bloomInit, setBloomInit] = useState(false);

  // const [toggle, set] = useState(0)
  // const props = useSpring({ to: { opacity: 1, color: 'red' } })

  // const [{ x }] = useSpring({ x: toggle, config: { mass: 5, tension: 1000, friction: 50, precision: 0.0001 } }, [toggle])

  // const styles = useSpring({
  //   to: async (next, cancel) => {
  //     await next({ opacity: 1, color: '#ffaaee' })
  //     await next({ opacity: 0, color: 'rgb(14,26,19)' })
  //   },
  //   from: { opacity: 0, color: 'red' },
  // })

  const contextValue = {
    setBloomInit: setBloomInit,
    bloomInit: bloomInit,
    currentSection: currentSection,
    setCurrentSection: setCurrentSection,
    currentSubSection: currentSubSection,
    setCurrentSubSection: setCurrentSubSection,
  };
  const controlsRef = useRef();

  return (
    <Context.Provider value={contextValue}>
      <div className="main">
      <div className="dom-container">
        <Menu />
      </div>
      <div className="canvas-container">
        {/* <SpringTest /> */}
        <Canvas shadows camera={{ position: [0, 6, -25], fov: 95 }}>
          <ambientLight intensity={0.1} />
          <directionalLight
            position={[-10, 20, -10]}
            intensity={1}
            castShadow
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
            shadow-camera-far={100}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
                    {/* <directionalLight
            position={[-10, -40, -30]}
            intensity={.5}
            castShadow

          /> */}
          {/* <mesh castShadow receiveShadow  position={[3, 2, 0]}>
          <boxGeometry args={[2, 2, 2]}/>
          <meshStandardMaterial />
        </mesh> */}

          <Sections
            bloomInit={bloomInit}
            contextValue={contextValue}
            controlsRef={controlsRef}
          />

          {/* <mesh receiveShadow castShadow renderOrder={2000} position={[10, 5, 10]} rotation={[0, 0, 0]}>
        <textGeometry args={['MICHAEL MOSLEY', { font, size: 20, height: 10 }]} />
        <meshNormalMaterial />
        </mesh> */}

          <group name="text" position={[0, 0, 60]} rotation={[0, -Math.PI, 0]}>
            <Title layers={[0]} name="title" contextValue={contextValue} />
          </group>
          <Button
            contextValue={contextValue}
            position={[0, 3, 0]}
            rotation={[-Math.PI/2, 0, 0]}
            physicalMaterial = {{color:"#71f604", reflectivity:.7, roughness:.2, metalness:0}}
          />
          <Floor contextValue={contextValue} />
          <OrbitControls
            ref={controlsRef}
            enableRotate={currentSubSection ? false : true}
            enableZoom={false}
            makeDefault
            maxPolarAngle={Math.PI / 2 - 0.1}
          />
        </Canvas>
      </div>
      </div>
    </Context.Provider>
  );
}
//autoRotate autoRotateSpeed={0.8}
export default App;
