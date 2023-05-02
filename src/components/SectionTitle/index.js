// import * as THREE from "three";
import React from "react";
import { Text, useMatcapTexture } from "@react-three/drei";

import { animated, useSpring } from "@react-spring/three";

const TEXT_PROPS = {
  fontSize: 5,
  font: "https://fonts.gstatic.com/s/monoton/v10/5h1aiZUrOngCibe4TkHLRA.woff",
};
export default function SectionTitle(props) {
  const {
    section,
    thisSection,
    height,
    hideIfNotCurrent,
    capTexture,
    contextValue,
  } = props;
  const { currentSection, currentSubSection, bloomInit } = contextValue;
  const [matcapTexture] = useMatcapTexture(
    capTexture ? capTexture : "2E763A_78A0B7_B3D1CF_14F209"
  );

  const { position, scale } = section;

  const AnimatedText = animated(Text);
  const spring = useSpring({
    from: {
      position: [position[0], height ? height : 10, position[2]],
      scale: [0, 0, 0],
    },
    to: {
      position: [
        position[0],
        bloomInit &&
        (thisSection === currentSection ||
          (currentSection === 0 && !hideIfNotCurrent))
          ? height
            ? height
            : 15 * scale[0]
          : 10,
        position[2],
      ],
      scale: currentSubSection
        ? [0, 0, 0]
        : bloomInit &&
          (thisSection === currentSection ||
            (currentSection === 0 && !hideIfNotCurrent))
        ? [0.25, 0.25, 0.25]
        : [0, 0, 0],
    },
    config: {
      friction: 50,
    },
    delay: 0,
  });
  // position={position} position-y={15*scale[0]}
  console.log("section",section.photo ? section.photo.image :"no")
  return (
    <group {...props}>
      <AnimatedText
        {...spring}
        rotation={[0, 3.14, 0.0]}
        // scale={[0.25, 0.25, 0.25]}
        // position={[0,0,0]}
        name="text-section"
        depthTest={false}
        {...TEXT_PROPS}
      >
        {section.title
          ? section.title
          : section.job
          ? section.job.company
          : section.project
          ? section.project.title
          : section.skill
          ? section.skill.name
          : section.photo ? section.photo.image.title : "nope"}
        <meshMatcapMaterial
          matcap={matcapTexture}
          opacity={1}
          color="#14CEFF"
        />
      </AnimatedText>
    </group>
  );
}
