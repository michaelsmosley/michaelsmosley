// import * as THREE from "three";
import React, {
  // useMemo,
  // useRef,
  // useLayoutEffect,
  useEffect,
  useState,
  useCallback,
  // useContext,
} from "react";
// import { extend, useLoader } from '@react-three/fiber'
import {
  Text,
  useMatcapTexture,
  // Octahedron,
  // useGLTFLoader,
  // FlyControls,
} from "@react-three/drei";
// import useSlerp from '../../utils/use-slerp'
// import Context from '../../context/Context';
import { animated, useSpring } from "@react-spring/three";

export default function Title(props) {
  // const context = useContext(Context)
  // console.log("context",context)
  // const { setBloomInit } = context
  const [matcapTexture] = useMatcapTexture("2E763A_78A0B7_B3D1CF_14F209");

  const AnimatedText = animated(Text);
  const { contextValue } = props;
  const { setBloomInit, setCurrentSection, bloomInit, isMobile, setMenuActive } = contextValue;
  const TEXT_PROPS = {
    fontSize: isMobile ? 11 : 20,
    font: "https://fonts.gstatic.com/s/monoton/v10/5h1aiZUrOngCibe4TkHLRA.woff",
  };
  const [hovered, setHover] = useState(false);
  // const group = useSlerp()
  const onClick = (e) => {
    console.log("click title", e);
    setBloomInit(true);
    setCurrentSection(0);
    setMenuActive(false)
    // setCurrentSubSection(0)
  };
  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );

  const onPointerOver = useCallback(() => setHover(true), []);
  const onPointerOut = useCallback(() => setHover(false), []);

  const spring = useSpring({
    from: { position: [0, -20, 0] },
    to: { position: [0, isMobile ? 8 : 11, bloomInit ? -100 : 0] },
    config: {
      friction: 100,
    },
    delay: bloomInit ? 0 : 2000,
  });
  return (
    <group
      {...props}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <AnimatedText
        {...spring}
        name="text-olga"
        depthTest={false}
        {...TEXT_PROPS}
      >
        HOT POTATO
        {/* <meshPhysicalMaterial roughness={0} metalness={1} color="#FFFFFF" /> */}
        <meshMatcapMaterial
          matcap={matcapTexture}
          opacity={1}
          color="#14CEFF"
        />
      </AnimatedText>
      {/* <Text name="text-olga" depthTest={false} position={[0, 10, 0]} {...TEXT_PROPS}>
        MOSLEY
        <meshPhysicalMaterial  roughness={0} metalness={1} color="#FFFFFF" />
      </Text> */}
    </group>
  );
}
