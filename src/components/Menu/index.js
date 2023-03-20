import React, { useState } from "react";
import styles from "./menu.module.scss"; // Import css modules stylesheet as styles

const Menu = ({ contextValue }) => {
  const { setCurrentSection, setCurrentSubSection, currentSection, setBloomInit, menuActive, setMenuActive, contentfulData } = contextValue;
  const onClick = () => {
    setMenuActive(!menuActive);
  };
  const clickSection = (value) => {
    // console.log("currentSection", currentSection);
    // if (currentSection !== value) {
      // setCurrentSubSectionContent(null);
      setCurrentSubSection(0);

      setCurrentSection(value);
      setMenuActive(false);
      setBloomInit(true);
    // }
  };
  return (
    <div id={styles.menu}>
      <div className={styles.hamburgericon} onClick={onClick} id="icon">
        <div
          className={`${styles.icon1} ${menuActive ? styles.a : null}`}
          id="a"
        ></div>
        <div
          className={`${styles.icon2} ${menuActive ? styles.c : null}`}
          id="b"
        ></div>
        <div
          className={`${styles.icon3} ${menuActive ? styles.b : null}`}
          id="c"
        ></div>
        <div className={styles.clear}></div>
      </div>

      <nav id="nav" className={`${menuActive ? styles.show : null}`}>
        <ul>
          <li
            className={currentSection === 0 ? styles.disable : null}
            onClick={() => clickSection(0)}
          >
            HOME
          </li>

          {contentfulData.map((section, index) => {
            return (
              <li key={index}
                className={currentSection === contentfulData[index].sys.id ? styles.disable : null}
                onClick={() => clickSection(contentfulData[index].sys.id)}
              >
                <nobr>{section.title}</nobr>
              </li>
            );
          })}

          <li>
            <a
              href="https://docs.google.com/document/d/11kjwoGzUeE2fdG-RVlZbNqDjqtAFp3ns9LjLX-H2EFc/edit"
              target="_blank"
              onClick={() => console.log("clicked")}
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>

      <div
        className={`${styles.darkblue} ${menuActive ? styles.slide : null}`}
        id="blue"
      ></div>
    </div>
  );
};

export default Menu;
