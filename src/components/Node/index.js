import React from "react";
// import { useFrame } from 'react-three-fiber'

// import { a } from "@react-spring/three";

import { animated, useSpring } from "@react-spring/three";

// import { useSpring } from "@react-spring/core";

import { useMatcapTexture } from "@react-three/drei";

const Node = (props) => {
  const { node, index, bloomState, delay, capTexture, contextValue, hovered } = props;
  console.log("contextValue",contextValue)
  const { currentSubSection } =
    contextValue;
  const [matcapTexture] = useMatcapTexture(
    capTexture ? capTexture : "2E763A_78A0B7_B3D1CF_14F209"
  );
  //   const { scale } = useSpring({ scale: bloomState ? node.scale: 10 })
  // const { spring } = useSpring({
  //     spring: bloomState,
  //     config: { mass: 5, tension: 400, friction: 50, precision: 0 },
  //   });

  //   const scale = spring.to([0, 1], [1, 5]);

  const spring = useSpring({
    from: { scale: [0, 0, 0] },
    to: {
      scale: [
        // bloomState ? node.scale.x * (hovered ? 1.15 : 1) : 0,
        // bloomState ? node.scale.y * (hovered ? 1.15 : 1) : 0,
        // bloomState ? node.scale.z * (hovered ? 1.15 : 1) : 0,

        currentSubSection ? 0 : bloomState ? node.scale.x * (hovered ? 1.15 : 1) : 0,
        currentSubSection ? 0 : bloomState ? node.scale.y * (hovered ? 1.15 : 1) : 0,
        currentSubSection ? 0 : bloomState ? node.scale.z * (hovered ? 1.15 : 1) : 0,
      ],
    },
    config: {
      friction: 10,
    },
    delay: delay,
  });

  // useFrame(() => {
  // })
  //scale-x={node.scale.x * scale} scale-y={node.scale.y * scale} scale-z={node.scale.z * scale}
  return (
    <animated.mesh
      {...spring}
      key={index}
      receiveShadow
      castShadow
      geometry={node.geometry}
      position={node.position}
      rotation={node.rotation}
    >
      {/* <meshStandardMaterial roughness={0.5} /> */}

      <meshMatcapMaterial matcap={matcapTexture} opacity={1} color="#14CEFF" />
    </animated.mesh>
  );
};

export default Node;
