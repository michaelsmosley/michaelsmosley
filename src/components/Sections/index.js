import React, { useEffect, useState } from "react";
// import * as Styles from './sections.module.scss';
import Flower from "../Flower";
import SubSections from "../SubSections";
import SectionTitle from "../SectionTitle";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { sectionsData as sectionsData } from "../../data/data";
// import Context from '../../context';

const Sections = (props) => {
  // const context = useContext(Context)
  const { bloomInit, contextValue, controlsRef } = props;
  const {
    currentSection,
    isMobile,
    currentSubSection,
  } = contextValue;
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      const callback = (event) => {
        console.log("event", event.type);
        setDragging(event.type === "start" ? true : false);
      };
      controls.addEventListener("start", callback);
      controls.addEventListener("end", callback);
      return () => {
        controls.removeEventListener("start", callback);
        controls.removeEventListener("end", callback);
      };
    }
  }, [controlsRef]);





  const layers = [0, 11];
  const defaultCameraProps = {
    cameraPosition: [0, 17, -25],
    cameraFOV: 100,
    cameraLookAt: [0, 0, 0],
  };
  const topCameraProps = {
    cameraPosition: [0, 0, -25],
    cameraFOV: 100,
    cameraLookAt: [0, 0, 0],
  };
  const initCameraProps = {
    cameraPosition: [0, 0, -25],
    cameraFOV: 100,
    cameraLookAt: [0, 0, 0],
  };
  useFrame((state) => {
    if (!dragging) {
      let sectionData = currentSubSection ? topCameraProps : currentSection
        ? sectionsData.sections[currentSection - 1]
        : bloomInit
        ? defaultCameraProps
        : initCameraProps;
      let v = new THREE.Vector3();
      state.camera.fov = THREE.MathUtils.lerp(
        state.camera.fov,
        sectionData.cameraFOV,
        0.05
      );
      state.camera.position.lerp(
        v.set(
          sectionData.cameraPosition[0],
          sectionData.cameraPosition[1],
          sectionData.cameraPosition[2]
        ),
        0.05
      );
      // state.camera.lookAt(sectionData.cameraLookAt);
      // state.camera.updateProjectionMatrix();
    }
  });

  return (
    <group name="sections">
      {sectionsData.sections.map((section, index) => {
        return (
          <group name="section">
            <SectionTitle
              section={section}
              currentSection={currentSection}
              thisSection={index + 1}
              bloomInit={bloomInit}
              contextValue={contextValue}
            />
            <Flower
              key={index + 1}
              id={index + 1}
              name={`flower-${index + 1}`}
              {...section}
              layers={layers}
              delay={index * 200}
              contextValue={contextValue}
            />
            <SubSections
              // currentSection={currentSection}
              // currentSubSection={currentSubSection}
              // setCurrentSubSection={setCurrentSubSection}
              {...section}
              thisSection={index + 1}
              // bloomInit={bloomInit}
              contextValue={contextValue}
            />
          </group>
        );
      })}
    </group>
  );
};

export default Sections;
