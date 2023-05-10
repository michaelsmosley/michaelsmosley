import React, { useState, useEffect } from "react";
import styles from "./subsection.module.scss"; // Import css modules stylesheet as styles
// import { sectionsData as sectionsData } from "../../data/data";
import hoverEffect from "hover-effect";
// import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
// import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";

const SubSection = (props) => {
  console.log("SubSection", props);
  const [title, setTitle] = useState(null);
  const [backCTA, setBackCTA] = useState(false);

  const [subtitle, setSubTitle] = useState(null);
  const [subtitle2, setSubTitle2] = useState(null);

  const [body, setBody] = useState(null);

  const { contextValue } = props;
  const {
    contentfulData,
    currentSection,
    currentSubSection,
    currentSubSectionContent,
    setCurrentSubSection,
  } = contextValue;
  // console.log("currentSubSection",currentSubSection)
  // console.log("-----------currentSubSectionContent",currentSubSectionContent)

  const mystyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    objectFit: "cover",
    overflow: "hidden",
    filter: `brightness(30%)`,
  // -webkit-filter: blur(8px)
    // padding: "100px"
  };

  const options = {
    renderText: (text) => {
      return text.split("\n").reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node) => {
        // eslint-disable-next-line react/jsx-no-target-blank
        return (
          <a href={node.data.uri} target="_blank">
            {node.content[0].value}
          </a>
        );
      },
    },
  };
  // const clickImage = () => {
  //   console.log("clickImage");

  //   // myAnimation.next();
  // };
  // useEffect(() => {
  //   console.log("useeffect subsection", currentSubSectionContent);
  // }, []);
  const onBack = (event, value) => {
    console.log("onBack currentSection", currentSection);

    console.log(contentfulData
              .filter((section) => section.sys.id === currentSection)[0]
              .title.toUpperCase())
      event.preventDefault();
    event.stopPropagation();
    setCurrentSubSection(0);
  };
  const getDate = (str) => {
    const date = new Date(str);
    const dateStr =
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      (-100 + date.getYear() + 2000);

    var now = new Date();
    if (date > now) {
      return "PRESENT";
    }
    return dateStr;
  };
  useEffect(() => {
    console.log(
      "useeffect .currentSubSectionContent",
      currentSubSectionContent
    );

    const elements = document.getElementsByClassName("content");
    if (elements[0] && elements[0].children.length > 0) {
      elements[0].removeChild(elements[0].children[0]);
    }

    // eslint-disable-next-line no-unused-vars
    var myAnimation = new hoverEffect({
      parent: document.querySelector(".content"),
      intensity: 0.2,
      imagesRatio: 512 / 768,
      image1:
        currentSubSectionContent && currentSubSectionContent.photo
          ? currentSubSectionContent.photo.image.url :
          currentSubSectionContent && currentSubSectionContent.project ?
          currentSubSectionContent.project.poster.url
          : "/img/dot.jpg",
      image2:
      currentSubSectionContent && currentSubSectionContent.photo
      ? currentSubSectionContent.photo.image.url :
      currentSubSectionContent && currentSubSectionContent.project ?
      currentSubSectionContent.project.poster.url
      : "/img/dot.jpg",
      displacementImage: "/img/dot.jpg",
    });

    setTitle(
      currentSubSectionContent
        ? currentSubSectionContent.project
          ? currentSubSectionContent.project.title
          : currentSubSectionContent.photo
          ? currentSubSectionContent.photo.image.title
          : currentSubSectionContent.skill
          ? currentSubSectionContent.skill.name
          : currentSubSectionContent.job
          ? currentSubSectionContent.job.company
          : null
        : null
    );
    setBackCTA(
      currentSubSectionContent
        ? currentSubSectionContent.project
          ? true
          : currentSubSectionContent.photo
          ? true
          : currentSubSectionContent.skill
          ? false
          : currentSubSectionContent.job
          ? false
          : false
        : false
    );
    setSubTitle(
      currentSubSectionContent
        ? currentSubSectionContent.project
          ? null
          : currentSubSectionContent.skill
          ? ""
          : currentSubSectionContent.job
          ? currentSubSectionContent.job.jobTitle
          : null
        : null
    );

    setBody(
      currentSubSectionContent
        ? currentSubSectionContent.project
          ? documentToReactComponents(
              currentSubSectionContent.project.description.json,
              options
            )
          : currentSubSectionContent.skill
          ? currentSubSectionContent.skill.description
          : currentSubSectionContent.job
          ? currentSubSectionContent.job.description.json.content[0].content[0]
              .value
          : null
        : null
    );
    setSubTitle2(
      currentSubSectionContent
        ? currentSubSectionContent.project
          ? null
          : currentSubSectionContent.skill
          ? ""
          : currentSubSectionContent.job
          ? currentSubSectionContent.job.startDate
            ? getDate(currentSubSectionContent.job.startDate) +
              "-" +
              getDate(currentSubSectionContent.job.endDate)
            : null
          : null
        : null
    );
  }, [currentSubSectionContent]);

  return (
    <div
      id={styles.subSection}
      className={currentSubSection === 0 ? styles.hide : `${styles.subSection}`}
    >
      {/* <div className={styles.content} onClick={clickImage}>
        {currentSubSectionContent && currentSubSectionContent.photo ? (
          <img src={currentSubSectionContent.photo.image.url} />
        ) : null}
      </div> */}

      {currentSubSectionContent && (currentSubSectionContent.photo || currentSubSectionContent.project) ? (
        <div className={`content ${currentSubSection}`} style={mystyle}></div>
      ) : null}

      <div
        className={
          currentSubSection === 0
            ? `${styles.overlay} ${styles.fadeOutText}`
            : `${styles.overlay} ${styles.fadeInText}`
        }
      >
        {/* SECTION TYPE :{" "}
        {currentSubSectionContent && currentSubSectionContent.photo
          ? "photo"
          : currentSubSectionContent && currentSubSectionContent.job
          ? "job" : "unknown"} */}
        <div className={styles.title}>{title ? title.toUpperCase() : null}</div>
        <div className={styles.subtitle}>
          {subtitle ? subtitle.toUpperCase() : null}
        </div>
        <div className={styles.subtitle2}>
          {subtitle2 ? subtitle2.toUpperCase() : null}
        </div>

        <div className={styles.body}>{body}</div>
        <div className={`${styles.backCTA} ${!backCTA ? styles.hide : null}`} onClick={onBack}>
          {backCTA && currentSection
            ? "BACK TO " +
              contentfulData
                .filter((section) => section.sys.id === currentSection)[0]
                .title.toUpperCase()
            : null}
        </div>
      </div>
    </div>
  );
};

export default SubSection;
