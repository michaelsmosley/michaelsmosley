import React from "react";
import { animated, useSpring } from "@react-spring/three";
import * as THREE from "three";

// import {useMatcapTexture } from '@react-three/drei'

export default function Floor(props) {
  const { contextValue } = props;
  const { currentSubSection, currentSection, setFloorReady } = contextValue;
  const spring = useSpring({
    from: { rotation: [-Math.PI, 0, 0] },
    to: {
      rotation: [
        currentSubSection && currentSection ? -Math.PI : -Math.PI / 2,
        0,
        0,
      ],

    },
    onRest: ()=>{setFloorReady(true)},
    config: {
      friction: 50,
    },
    delay: currentSubSection || currentSection ? 0 : 1000,
  });

  const planeStyle = useSpring({
    from: { color: "#049ef4" },
    to: {
      color: currentSubSection ? "#59b160" : "#049ef4",
    },
    config: {
      friction: 50,
    },
    delay: 0,
  });

  return (
    <animated.mesh
      {...spring}
      receiveShadow
      renderOrder={1000}
      // position={[0, 0, 3000]}
      // rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry
        attach="geometry"
        args={[2000, 2000]}
        side={THREE.DoubleSide}
      />
      <animated.meshPhysicalMaterial
        // color={"#336699"}
        {...planeStyle}
        reflectivity={1}
        roughness={0.555}
        metalness={1}
      />
      {/* <meshPhongMaterial attach="material" color="rgb(60, 70, 55)" /> */}
      {/* <meshMatcapMaterial matcap={matcapTexture} opacity={1} color="#14CEFF" /> */}
      {/* <meshStandardMaterial attach="material" color="orange" /> */}
      {/* <meshMatcapMaterial matcap={matcapTexture} opacity={1} color="#14CEFF" /> */}
      {/* <planeGeometry args={[500,100]} color={'blue'}/> */}
      {/* <shadowMaterial opacity={1} /> */}
    </animated.mesh>
  );
}
