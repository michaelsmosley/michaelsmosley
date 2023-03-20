import React, { useEffect } from "react";
// import * as Styles from './sections.module.scss';
// import Flower from '../Flower'
// import { sectionsData as sectionsData } from '../../data/data'
// import Context from '../../context';
import SubFlower from "../SubFlower";
import SectionTitle from "../SectionTitle";

const SubSections = (props) => {
  // const context = useContext(Context)
  const { position, thisSection, scale, contextValue, itemsCollection } = props;
  // console.log("itemsCollection",itemsCollection)
  const {currentSection, bloomInit,  setCurrentSubSection, currentSubSection,}= contextValue
  const subArray = ["one", "two", "three", "four", "five"];

  const layers = [0, 11];
  // useEffect(() => {
  //   console.log("bloominit updated", bloomInit)
  // }, [bloomInit]);

  const r = 10;
  const totalPoints = subArray.length;
  const theta = -1* (Math.PI ) / totalPoints;

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
      {itemsCollection.map((item, index) => {

// console.log("item",item)
// console.log("index",index)
        return (
          <group key={index}>
            <SectionTitle
              section={{
                ...item,
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
              capTexture={'04E804_04B504_04CB04_33FC33'}
              contextValue={contextValue}
            />
            <SubFlower
              key={index + 1}
              id={index + 1}
              name={item.job
                ? item.job.sys.id
                : item.project
                ? item.project.sys.id
                : item.skill
                ? item.skill.sys.id
                : item.photo ? item.photo.sys.id : 0}
              {...item}
              content={item}
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
          </group>
        );
      })}
    </group>
  );
};

export default SubSections;
