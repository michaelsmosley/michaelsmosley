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
import Rotate from "../Rotate";

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
  const {
    setBloomInit,
    setCurrentSection,
    bloomInit,
    isMobile,
    setMenuActive,
    floorReady,
  } = contextValue;
  const TEXT_PROPS = {
    fontSize: isMobile ? 11 : 20,
    font: "https://fonts.gstatic.com/s/monoton/v10/5h1aiZUrOngCibe4TkHLRA.woff",
  };

  const TEXT_CLICK_PROPS = {
    fontSize: isMobile ? 0.35 : 0.75,
    font: "https://fonts.googleapis.com/css2?family=Lato:wght@100;300&family=Plus+Jakarta+Sans:wght@200&family=Raleway&display=swap",
  };
  const [hovered, setHover] = useState(false);
  // const group = useSlerp()
  const onClick = (e) => {
    console.log("click title", e);
    setBloomInit(true);
    setCurrentSection(0);
    setMenuActive(false);
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
    to: {
      position: [
        0,
        floorReady ? (isMobile ? 8 : 11) : -20,
        bloomInit ? -100 : 0,
      ],
    },
    config: {
      friction: 100,
    },
    // delay: bloomInit ? 0 : 2000,
  });

  const springClick = useSpring({
    from: { position: [0, -20, 70] },
    to: {
      position: [0, bloomInit ? -10 : isMobile ? 1 : 1, bloomInit ? -300 : 70],
    },
    config: {
      friction: 100,
    },
    delay: bloomInit ? 0 : 1000,
  });
  return (
    <group
      {...props}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* <animated.group {...springClick}>
        <AnimatedText
          name="text-clickme"
          depthTest={false}
          rotation={[0, Math.PI / 2, 0]}
          position={[-10, 0, 5]}
          {...TEXT_CLICK_PROPS}
        >
          ROTATE WORLD OR CLICK THE TEXT
          <meshPhysicalMaterial roughness={0} metalness={1} color="#FFFFFF" />
          <meshMatcapMaterial
            matcap={matcapTexture}
            opacity={floorReady ? 1 : 0}
            color="#14CEFF"
          />
          <meshPhysicalMaterial
            reflectivity={0.5}
            roughness={0.555}
            metalness={0.5}
            color={"#061296"}
          />
          <Rotate contextValue={contextValue} />
        </AnimatedText>
      </animated.group> */}
      <AnimatedText
        {...spring}
        name="text-olga"
        depthTest={false}
        {...TEXT_PROPS}
      >
        MICHAEL  MOSLEY
        {/* <meshPhysicalMaterial roughness={0} metalness={1} color="#FFFFFF" /> */}
        <meshMatcapMaterial
          matcap={matcapTexture}
          opacity={floorReady ? 1 : 0}
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
