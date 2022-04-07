import React, { useState, useEffect, useCallback } from "react";
import { useFrame } from "react-three-fiber";
import { useGLTF } from "@react-three/drei";
import Node from "../Node";

// import * as Styles from './flower.module.scss';
import useLayers from "../../utils/use-layers";

const Flower = ({
  map,
  id,
  name,
  glb,
  texture,
  section,
  matcap,
  layers,
  delay,
  contextValue,
  ...props
}) => {
  const { setCurrentSection, bloomInit, currentSection, setCurrentSubSection } =
    contextValue;
  const [hovered, setHover] = useState(false);
  const [bloomState, setBloomState] = useState(bloomInit);
  const [flowerDelay, setFlowerDelay] = useState(delay);

  useEffect(() => {
    setBloomState(bloomInit);
  }, [bloomInit]);

  useEffect(() => {
    setFlowerDelay(0);
    setBloomState(
      bloomInit && (currentSection === id || currentSection === 0)
        ? true
        : false
    );
  }, [currentSection]);

  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );
  const onClick = (event, value) => {
    //   e.preventDefault();
    event.stopPropagation();
    console.log("onclick flower", event);
    setCurrentSection(id === currentSection ? 0 : id);
    setCurrentSubSection(0);
  };


  const onPointerOver = useCallback(() => setHover(true), []);
  const onPointerOut = useCallback(() => setHover(false), []);
  const ref = useLayers(layers);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01 * props.rotationSpeed;
    }
  });

  const subArray = ["sdfsdaf", "afdsfsd", "afsddafs", "asdfsdfa", "afafsdsdfa"];
  const { nodes } = useGLTF(
    process.env.PUBLIC_URL + "/glb/" + (glb ? glb : "flower") + ".glb"
  );
  return (
    <group
      ref={ref}
      {...props}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={(e) => {
        onClick(e, section);
      }}
    >
      {Object.values(nodes).map((node, index) => {
        const meshGeometry = node.geometry;
        return meshGeometry ? (
          <Node
            key={index}
            node={node}
            index={index}
            delay={flowerDelay}
            bloomState={bloomState}
            hovered={hovered}
            contextValue={contextValue}
          />
        ) : null;
      })}
    </group>
  );
};

export default Flower;
