import React from "react";
import { useGLTF, useMatcapTexture } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import useLayers from "../../utils/use-layers";

const Rotate = props => {
  const { nodes } = useGLTF(process.env.PUBLIC_URL + "/glb/rotate.glb");

  const [matcapTexture] = useMatcapTexture("2E763A_78A0B7_B3D1CF_14F209");
  const layers = [0, 11];
  const { contextValue } = props;
  const {
    floorReady,
  } = contextValue;
  const ref = useLayers(layers);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  return (
    <group
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 2, -4]}
      scale={[0.35, 0.35, 0.35]}
    >
      {Object.values(nodes).map((node, index) => {
        const meshGeometry = node.geometry;
        return meshGeometry ? (
          <mesh
            key={index}
            receiveShadow
            castShadow
            geometry={meshGeometry}
            //   position={node.position}
            //   rotation={[0, Math.PI,0]}
          >
            <meshMatcapMaterial
              matcap={matcapTexture}
              visible={floorReady ? 1 : 0}
              color="#336699"
            />{" "}
          </mesh>
        ) : null;
      })}
    </group>
  );
};

export default Rotate;
