import React, { useEffect } from "react";
// import * as Styles from './sections.module.scss';
// import Flower from '../Flower'
// import { sectionsData as sectionsData } from '../../data/data'
// import Context from '../../context';
import SubFlower from "../SubFlower";
import SectionTitle from "../SectionTitle";

const SubSections = (props) => {
  // const context = useContext(Context)
  const { position, thisSection, scale, contextValue } = props;
  const {currentSection, bloomInit,  setCurrentSubSection, currentSubSection,}= contextValue
  const subArray = ["one", "two", "three", "four", "five"];

  const layers = [0, 11];
  console.log("subsections props", props);
  // useEffect(() => {
  //   console.log("bloominit updated", bloomInit)
  // }, [bloomInit]);

  const r = 10;
  const totalPoints = subArray.length;
  const theta = (Math.PI * 2) / totalPoints;

  const xPos = (currentPoint) => {
    var angle = theta * currentPoint;
    return r * Math.cos(angle);
  };

  const yPos = (currentPoint) => {
    var angle = theta * currentPoint;
    return r * Math.sin(angle);
  };

  return (
    <group name="subflowers">
      {subArray.map((item, index) => {
        return (
          <>
            <SectionTitle
              section={{
                section: item,
                position: [
                  xPos(index) + position[0],
                  position[1],
                  yPos(index) + position[2],
                ],
                scale: scale,
              }}
              currentSection={currentSection}
              thisSection={thisSection}
              bloomInit={bloomInit}
              height={4}
              hideIfNotCurrent={true}
              capTexture={'7A7A7A_D0D0D0_BCBCBC_B4B4B4'}
              contextValue={contextValue}
            />
            <SubFlower
              key={index + 1}
              id={index + 1}
              name={`subflower-${index + 1}`}
              {...item}
              layers={layers}
              position={[
                xPos(index) + position[0],
                position[1],
                yPos(index) + position[2],
              ]}
              subFlowerLength={subArray.length}
              currentSection={currentSection}
              thisSection={thisSection}
              currentSubSection={currentSubSection}
              setCurrentSubSection={setCurrentSubSection}
              contextValue={contextValue}
            />
          </>
        );
      })}
    </group>
  );
};

export default SubSections;
