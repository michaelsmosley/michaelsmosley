import React, { useState } from "react";
import styles from "./menu.module.scss"; // Import css modules stylesheet as styles
import { sectionsData as sectionsData } from "../../data/data";

const Menu = ({ contextValue }) => {
  const { setCurrentSection, currentSection, setBloomInit, menuActive, setMenuActive } = contextValue;
  const onClick = () => {
    setMenuActive(!menuActive);
  };
  const clickSection = (value) => {
    if (currentSection !== value) {
      setCurrentSection(value);
      setMenuActive(false);
      setBloomInit(true);
    }
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

          {sectionsData.sections.map((section, index) => {
            return (
              <li
                className={currentSection === index + 1 ? styles.disable : null}
                onClick={() => clickSection(index + 1)}
              >
                <nobr>{section.section}</nobr>
              </li>
            );
          })}

          <li>
            <a
              href="http://google.com"
              target="_blank"
              onClick={() => console.log("clicked")}
            >
              Click me
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
